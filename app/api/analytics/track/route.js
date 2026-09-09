import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp, hashIp } from "@/lib/ip";
import { getGeolocation } from "@/lib/geolocation";
import { parseUserAgent } from "@/lib/ua";
import { checkTrackingRateLimit } from "@/lib/rate-limit";
import { notifyNewVisitor } from "@/lib/telegram";
import { saveVisitor, saveSession, savePageView } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Abdul Ahad Analytics Tracking API",
    note: "This endpoint receives POST requests from the website tracker. To view your visual analytics, visit /dashboard/analytics",
    dashboardUrl: "/dashboard/analytics",
  });
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);

    // Rate limit check
    const rateLimit = checkTrackingRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded" },
        { status: 429, headers: { "Retry-After": "60" } }
      );
    }

    // Read payload
    const body = await request.json().catch(() => ({}));
    const {
      visitorId,
      sessionId,
      path = "/",
      title = "Abdul Ahad - Portfolio",
      referrer = null,
      referrerDomain = null,
      utmSource = null,
      utmMedium = null,
      utmCampaign = null,
      utmTerm = null,
      utmContent = null,
      screenResolution = null,
      preferredLanguage = null,
      timeZone = null,
    } = body;

    if (!visitorId || !sessionId) {
      return NextResponse.json(
        { error: "Missing visitorId or sessionId" },
        { status: 400 }
      );
    }

    const userAgentString = request.headers.get("user-agent") || "";
    const uaMeta = parseUserAgent(userAgentString);
    const ipHashed = hashIp(ip);
    const geo = await getGeolocation(ip);

    // 1. Guaranteed Local Embedded Storage Write
    saveVisitor({
      visitorId,
      deviceType: uaMeta.deviceType,
      deviceVendor: uaMeta.deviceVendor,
      deviceModel: uaMeta.deviceModel,
      browserName: uaMeta.browserName,
      browserVersion: uaMeta.browserVersion,
      osName: uaMeta.osName,
      osVersion: uaMeta.osVersion,
      screenResolution,
      preferredLanguage,
      timeZone,
      country: geo.country,
      countryCode: geo.countryCode,
      region: geo.region,
      city: geo.city,
      latitude: geo.latitude,
      longitude: geo.longitude,
      isp: geo.isp,
      ipHash: ipHashed,
    });

    const { isNew: isNewSession } = saveSession({
      sessionId,
      visitorId,
      landingPage: path,
      referrer,
      referrerDomain: referrerDomain || (referrer ? new URL(referrer).hostname : "Direct"),
      utmSource,
      utmMedium,
      utmCampaign,
      country: geo.country,
      countryCode: geo.countryCode,
      region: geo.region,
      city: geo.city,
      deviceType: uaMeta.deviceType,
      browserName: uaMeta.browserName,
      osName: uaMeta.osName,
    });

    savePageView({
      sessionId,
      visitorId,
      path,
      title,
      referrer,
    });

    // 2. Telegram Alert for new sessions
    if (isNewSession) {
      notifyNewVisitor({
        country: geo.country,
        countryCode: geo.countryCode,
        city: geo.city,
        deviceType: uaMeta.deviceType,
        browserName: uaMeta.browserName,
        osName: uaMeta.osName,
        referrerDomain: referrerDomain || (referrer ? new URL(referrer).hostname : "Direct"),
        landingPage: path,
        utmSource,
      }).catch(() => {});
    }

    // 3. Optional Prisma write if DB is configured
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("localhost:5432")) {
        await prisma.visitor.upsert({
          where: { visitorId },
          update: { lastSeenAt: new Date() },
          create: {
            visitorId,
            deviceType: uaMeta.deviceType,
            browserName: uaMeta.browserName,
            osName: uaMeta.osName,
            country: geo.country,
            countryCode: geo.countryCode,
            city: geo.city,
          },
        }).catch(() => {});
      }
    } catch {}

    return NextResponse.json({
      success: true,
      sessionId,
      visitorId,
    });
  } catch (error) {
    console.error("Analytics track error:", error);
    return NextResponse.json(
      { error: "Internal tracking error" },
      { status: 500 }
    );
  }
}
