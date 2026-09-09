import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getOverviewStats } from "@/lib/storage";

export async function GET(request) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get("period") || "7d";

    const stats = getOverviewStats(period);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Dashboard stats error:", error);
    return NextResponse.json({ error: "Failed to generate analytics stats" }, { status: 500 });
  }
}
