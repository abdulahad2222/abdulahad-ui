import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";
import { getVisitorsList } from "@/lib/storage";

export async function GET(request) {
  try {
    const auth = await verifyAdminAuth(request);
    if (!auth.authenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));
    const query = searchParams.get("q") || "";
    const device = searchParams.get("device") || "";
    const engaged = searchParams.get("engaged") === "true";

    const result = getVisitorsList({ page, limit, query, device, engaged });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Dashboard visitors error:", error);
    return NextResponse.json({ error: "Failed to load visitors list" }, { status: 500 });
  }
}
