import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyAdminAuth } from "@/lib/auth";

/**
 * Helper to escape CSV values
 */
function escapeCsv(value) {
  if (value === null || value === undefined) return '""';
  const stringVal = String(value).replace(/"/g, '""');
  return `"${stringVal}"`;
}

export async function GET(request) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const exportType = searchParams.get("type") || "visitors";
    const dateStr = new Date().toISOString().split("T")[0];

    if (exportType === "sessions") {
      const sessions = await prisma.session.findMany({
        orderBy: { startedAt: "desc" },
        take: 5000,
      });

      const headers = [
        "Session ID",
        "Visitor ID",
        "Started At",
        "Active Seconds",
        "Total Duration",
        "Landing Page",
        "Exit Page",
        "Referrer",
        "Country",
        "City",
        "Device",
        "Browser",
        "OS",
        "Page Count",
        "Event Count",
        "Engaged",
      ];

      const rows = sessions.map((s) => [
        escapeCsv(s.sessionId),
        escapeCsv(s.visitorId),
        escapeCsv(s.startedAt.toISOString()),
        escapeCsv(s.activeSeconds),
        escapeCsv(s.durationSeconds),
        escapeCsv(s.landingPage),
        escapeCsv(s.exitPage),
        escapeCsv(s.referrerDomain),
        escapeCsv(s.country),
        escapeCsv(s.city),
        escapeCsv(s.deviceType),
        escapeCsv(s.browserName),
        escapeCsv(s.osName),
        escapeCsv(s.pageCount),
        escapeCsv(s.eventCount),
        escapeCsv(s.isEngaged ? "Yes" : "No"),
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="portfolio-sessions-${dateStr}.csv"`,
        },
      });
    }

    if (exportType === "events") {
      const events = await prisma.event.findMany({
        orderBy: { timestamp: "desc" },
        take: 5000,
      });

      const headers = [
        "Event ID",
        "Session ID",
        "Visitor ID",
        "Timestamp",
        "Event Type",
        "Category",
        "Target ID",
        "Target URL",
        "Label",
        "Path",
        "Metadata",
      ];

      const rows = events.map((e) => [
        escapeCsv(e.id),
        escapeCsv(e.sessionId),
        escapeCsv(e.visitorId),
        escapeCsv(e.timestamp.toISOString()),
        escapeCsv(e.eventType),
        escapeCsv(e.eventCategory),
        escapeCsv(e.targetId),
        escapeCsv(e.targetUrl),
        escapeCsv(e.label),
        escapeCsv(e.path),
        escapeCsv(e.metadata),
      ]);

      const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

      return new NextResponse(csvContent, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="portfolio-events-${dateStr}.csv"`,
        },
      });
    }

    // Default: Visitors export
    const visitors = await prisma.visitor.findMany({
      orderBy: { lastSeenAt: "desc" },
      take: 5000,
    });

    const headers = [
      "Visitor ID",
      "First Seen",
      "Last Seen",
      "Total Visits",
      "Total Duration (s)",
      "Country",
      "City",
      "Device",
      "Browser",
      "OS",
      "Screen Resolution",
      "Preferred Language",
      "Timezone",
    ];

    const rows = visitors.map((v) => [
      escapeCsv(v.visitorId),
      escapeCsv(v.firstSeenAt.toISOString()),
      escapeCsv(v.lastSeenAt.toISOString()),
      escapeCsv(v.visitCount),
      escapeCsv(v.totalDuration),
      escapeCsv(v.country),
      escapeCsv(v.city),
      escapeCsv(v.deviceType),
      escapeCsv(v.browserName),
      escapeCsv(v.osName),
      escapeCsv(v.screenResolution),
      escapeCsv(v.preferredLanguage),
      escapeCsv(v.timeZone),
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    return new NextResponse(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="portfolio-visitors-${dateStr}.csv"`,
      },
    });
  } catch (error) {
    console.error("CSV Export error:", error);
    return NextResponse.json({ error: "Failed to generate CSV export" }, { status: 500 });
  }
}
