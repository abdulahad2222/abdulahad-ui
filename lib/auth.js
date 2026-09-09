import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

export const AUTH_COOKIE_NAME = "ahad_admin_session";
export const TOKEN_EXPIRY_HOURS = 24;

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ||
    "abdul-ahad-visitor-analytics-super-secure-jwt-secret-key-2026-production"
);

/**
 * Hash a plain-text password using bcrypt
 * @param {string} password
 * @returns {Promise<string>}
 */
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Verify a plain-text password against a bcrypt hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
export async function comparePassword(password, hash) {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
}

/**
 * Generate a signed JWT for an admin user session
 * @param {{ id: string, email: string, name?: string, role?: string }} user
 * @returns {Promise<string>} JWT string
 */
export async function signAdminToken(user) {
  return new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name || "Abdul Ahad",
    role: user.role || "admin",
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY_HOURS}h`)
    .sign(JWT_SECRET);
}

/**
 * Verify and decode an admin JWT token
 * @param {string} token
 * @returns {Promise<{ id: string, email: string, name: string, role: string } | null>}
 */
export async function verifyAdminToken(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (err) {
    return null;
  }
}

/**
 * Authorize an incoming NextRequest for admin-only APIs.
 * Checks HttpOnly cookie or Authorization header.
 *
 * @param {Request} request
 * @returns {Promise<{ authenticated: boolean, user: any, error?: string }>}
 */
export async function verifyAdminAuth(request) {
  let token = null;

  // 1. Check cookies
  if (request.cookies && typeof request.cookies.get === "function") {
    const cookie = request.cookies.get(AUTH_COOKIE_NAME);
    token = cookie ? cookie.value : null;
  } else {
    // Standard cookie header parsing
    const cookieHeader = request.headers.get("cookie") || "";
    const match = cookieHeader.match(new RegExp(`(?:^|; )${AUTH_COOKIE_NAME}=([^;]*)`));
    if (match) {
      token = decodeURIComponent(match[1]);
    }
  }

  // 2. Fallback to Authorization Header: Bearer <token>
  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7).trim();
    }
  }

  if (!token) {
    return { authenticated: false, user: null, error: "Unauthorized: No session token provided" };
  }

  const payload = await verifyAdminToken(token);
  if (!payload) {
    return { authenticated: false, user: null, error: "Unauthorized: Invalid or expired session token" };
  }

  return { authenticated: true, user: payload };
}
