import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth";

export async function GET(request) {
  const auth = await verifyAdminAuth(request);
  if (!auth.authenticated) {
    return NextResponse.json({ authenticated: false, error: auth.error }, { status: 401 });
  }

  return NextResponse.json({
    authenticated: true,
    user: auth.user,
  });
}
