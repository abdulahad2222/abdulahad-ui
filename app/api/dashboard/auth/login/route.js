import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getClientIp } from "@/lib/ip";
import { checkLoginRateLimit, resetLoginAttempts } from "@/lib/rate-limit";
import { comparePassword, hashPassword, signAdminToken, AUTH_COOKIE_NAME, TOKEN_EXPIRY_HOURS } from "@/lib/auth";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const rateLimit = checkLoginRateLimit(ip);

    if (!rateLimit.allowed) {
      const minutesRemaining = Math.ceil(rateLimit.resetInMs / (60 * 1000));
      return NextResponse.json(
        { error: `Too many login attempts. Please try again in ${minutesRemaining} minutes.` },
        { status: 429 }
      );
    }

    const { email, password } = await request.json().catch(() => ({}));

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // Fallback/Default admin credentials support
    const envAdminEmail = (process.env.ADMIN_EMAIL || "admin@abdulahad.my.id").toLowerCase();
    const envAdminPassword = process.env.ADMIN_PASSWORD || "Admin@2026!";

    let user = null;

    try {
      user = await prisma.admin.findUnique({
        where: { email: cleanEmail },
      });
    } catch (dbErr) {
      console.warn("DB findAdmin warning:", dbErr.message);
    }

    // Auto-seed default admin if no admin exists in DB and env matches
    if (!user && cleanEmail === envAdminEmail) {
      const passwordMatch = password === envAdminPassword;
      if (passwordMatch) {
        try {
          const passwordHash = await hashPassword(envAdminPassword);
          user = await prisma.admin.upsert({
            where: { email: envAdminEmail },
            update: { passwordHash, lastLoginAt: new Date() },
            create: {
              email: envAdminEmail,
              passwordHash,
              name: "Abdul Ahad",
              role: "admin",
              lastLoginAt: new Date(),
            },
          });
        } catch {
          // If DB write fails, construct temporary in-memory auth object
          user = {
            id: "admin-master",
            email: envAdminEmail,
            name: "Abdul Ahad",
            role: "admin",
          };
        }
      }
    }

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password if user exists from DB
    if (user.passwordHash) {
      const isValid = await comparePassword(password, user.passwordHash);
      if (!isValid) {
        return NextResponse.json(
          { error: "Invalid email or password" },
          { status: 401 }
        );
      }
    }

    // Update lastLoginAt if DB is connected
    try {
      if (user.id && user.id !== "admin-master") {
        await prisma.admin.update({
          where: { id: user.id },
          data: { lastLoginAt: new Date() },
        });
      }
    } catch {}

    resetLoginAttempts(ip);

    // Generate JWT token
    const token = await signAdminToken({
      id: user.id,
      email: user.email,
      name: user.name || "Abdul Ahad",
      role: user.role || "admin",
    });

    const isProduction = process.env.NODE_ENV === "production";
    const maxAgeSeconds = TOKEN_EXPIRY_HOURS * 3600;

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name || "Abdul Ahad",
        role: user.role || "admin",
      },
    });

    // Set HttpOnly JWT cookie
    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax",
      path: "/",
      maxAge: maxAgeSeconds,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json({ error: "Internal authentication error" }, { status: 500 });
  }
}
