import { NextResponse } from "next/server";
import { getClientIp } from "@/lib/ip";
import { checkTrackingRateLimit } from "@/lib/rate-limit";
import { validateEvent, HIGH_VALUE_EVENTS } from "@/lib/events";
import { notifyHighEngagement } from "@/lib/telegram";
import { saveEvent } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Abdul Ahad Analytics Event Ingestion API",
    note: "This endpoint receives POST requests from the website tracker. To view your visual analytics, visit /dashboard/analytics",
    dashboardUrl: "/dashboard/analytics",
  });
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkTrackingRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    let rawBody = {};
    try {
      const text = await request.text();
      rawBody = text ? JSON.parse(text) : {};
    } catch {
      rawBody = {};
    }

    const { valid, error, sanitized } = validateEvent(rawBody);
    if (!valid) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Save to storage
    const { session } = saveEvent({
      sessionId: sanitized.sessionId,
      visitorId: sanitized.visitorId,
      eventType: sanitized.eventType,
      eventCategory: sanitized.eventCategory,
      targetId: sanitized.targetId,
      targetUrl: sanitized.targetUrl,
      label: sanitized.label,
      metadata: sanitized.metadata,
      path: sanitized.path,
    });

    // If high-value action, trigger Telegram notification
    if (HIGH_VALUE_EVENTS.includes(sanitized.eventType) && session && !session.notifiedTelegram) {
      session.isEngaged = true;
      session.notifiedTelegram = true;

      notifyHighEngagement({
        country: session.country,
        countryCode: session.countryCode,
        city: session.city,
        deviceType: session.deviceType,
        activeSeconds: session.activeSeconds,
        pageCount: session.pageCount,
        visitedPages: [session.landingPage, sanitized.path].filter(Boolean),
        highlightEvents: [sanitized.label || sanitized.eventType],
        reason: `High Intent Action: ${sanitized.label || sanitized.eventType}`,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics event error:", error);
    return NextResponse.json({ error: "Internal event error" }, { status: 500 });
  }
}
