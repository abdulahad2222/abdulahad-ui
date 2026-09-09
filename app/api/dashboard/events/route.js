import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getEventsList } from "@/lib/storage";

export async function GET(request) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "50", 10)));
    const type = searchParams.get("type") || "";

    const events = getEventsList(type, limit);
    return NextResponse.json({ events });
  } catch (error) {
    console.error("Dashboard events error:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
