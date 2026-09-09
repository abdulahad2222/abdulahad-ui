import { NextResponse } from "next/server";
import { notifyHighEngagement } from "@/lib/telegram";
import { updateExitDuration } from "@/lib/storage";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    service: "Abdul Ahad Analytics Page Exit Ingestion API",
    note: "This endpoint receives POST beacons on page exit. To view your visual analytics, visit /dashboard/analytics",
    dashboardUrl: "/dashboard/analytics",
  });
}

export async function POST(request) {
  try {
    let body = {};
    try {
      const text = await request.text();
      body = text ? JSON.parse(text) : {};
    } catch {
      body = {};
    }

    const {
      sessionId,
      visitorId,
      path = "/",
      activeSeconds = 0,
      durationSeconds = 0,
    } = body;

    if (!sessionId) {
      return NextResponse.json({ success: true, warning: "No sessionId provided" });
    }

    const activeSec = Math.max(0, Math.min(Math.round(Number(activeSeconds) || 0), 86400));
    const durationSec = Math.max(activeSec, Math.min(Math.round(Number(durationSeconds) || 0), 86400));

    const { session, isHighEngaged } = updateExitDuration(
      sessionId,
      visitorId,
      path,
      activeSec,
      durationSec
    );

    if (isHighEngaged && session) {
      notifyHighEngagement({
        country: session.country,
        countryCode: session.countryCode,
        city: session.city,
        deviceType: session.deviceType,
        activeSeconds: session.activeSeconds,
        pageCount: session.pageCount,
        visitedPages: [session.landingPage, path].filter(Boolean),
        reason: "High Active Attention (>2m or 4+ pages)",
      }).catch(() => {});
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics exit error:", error);
    return NextResponse.json({ success: true, error: "Exit handling processed" });
  }
}
