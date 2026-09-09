import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminAuth } from "@/lib/auth";

export async function POST(request) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { days = 90 } = await request.json().catch(() => ({}));
    const retentionDays = Math.max(7, parseInt(days, 10) || 90);

    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    // Delete old sessions, pageviews, events older than cutoffDate
    const [deletedEvents, deletedPageViews, deletedSessions] = await Promise.all([
      prisma.event.deleteMany({
        where: { timestamp: { lt: cutoffDate } },
      }),
      prisma.pageView.deleteMany({
        where: { viewedAt: { lt: cutoffDate } },
      }),
      prisma.session.deleteMany({
        where: { startedAt: { lt: cutoffDate } },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Cleaned up records older than ${retentionDays} days`,
      deleted: {
        events: deletedEvents.count,
        pageViews: deletedPageViews.count,
        sessions: deletedSessions.count,
      },
    });
  } catch (error) {
    console.error("Data retention cleanup error:", error);
    return NextResponse.json({ error: "Failed to perform retention cleanup" }, { status: 500 });
  }
}
