import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getVisitorJourney } from "@/lib/storage";

export async function GET(request, { params }) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    if (!id) {
      return NextResponse.json({ error: "Visitor ID required" }, { status: 400 });
    }

    const result = getVisitorJourney(id);
    if (!result) {
      return NextResponse.json({ error: "Visitor not found" }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Dashboard visitor detail error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
