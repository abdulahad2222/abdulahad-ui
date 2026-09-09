// In-memory sliding window rate limiter

const rateLimitMap = new Map();

// Periodic cleanup every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}, 5 * 60 * 1000).unref?.();

/**
 * Check rate limit for a specific key
 *
 * @param {string} key Unique identifier (e.g. `track:${ip}` or `login:${ip}`)
 * @param {number} maxRequests Maximum allowed requests in the time window
 * @param {number} windowMs Time window in milliseconds
 * @returns {{ allowed: boolean, remaining: number, resetInMs: number }}
 */
export function checkRateLimit(key, maxRequests = 60, windowMs = 60 * 1000) {
  const now = Date.now();
  let record = rateLimitMap.get(key);

  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    rateLimitMap.set(key, record);
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetInMs: windowMs,
    };
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetInMs: Math.max(0, record.resetAt - now),
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInMs: Math.max(0, record.resetAt - now),
  };
}

/**
 * Rate limit check for analytics ingestion endpoints
 * Default: 120 requests per minute
 */
export function checkTrackingRateLimit(ip) {
  return checkRateLimit(`track:${ip || "unknown"}`, 120, 60 * 1000);
}

/**
 * Rate limit check for admin login attempts
 * Default: 5 attempts per 15 minutes
 */
export function checkLoginRateLimit(ip) {
  return checkRateLimit(`login:${ip || "unknown"}`, 5, 15 * 60 * 1000);
}

/**
 * Reset login attempts upon successful login
 */
export function resetLoginAttempts(ip) {
  rateLimitMap.delete(`login:${ip || "unknown"}`);
}
