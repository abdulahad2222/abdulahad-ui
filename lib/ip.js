import crypto from "crypto";

/**
 * Extract authoritative client IP address from NextRequest or standard Request headers.
 * NEVER trusts client-supplied body values.
 *
 * @param {Request} request
 * @returns {string} Client IP address
 */
export function getClientIp(request) {
  if (!request) return "127.0.0.1";

  const headers = request.headers;
  
  // Header candidates in priority order
  const cfConnectingIp = headers.get("cf-connecting-ip");
  if (cfConnectingIp && isValidIp(cfConnectingIp.trim())) {
    return cfConnectingIp.trim();
  }

  const trueClientIp = headers.get("true-client-ip");
  if (trueClientIp && isValidIp(trueClientIp.trim())) {
    return trueClientIp.trim();
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp && isValidIp(xRealIp.trim())) {
    return xRealIp.trim();
  }

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",").map((ip) => ip.trim());
    for (const ip of ips) {
      if (isValidIp(ip) && !isPrivateIp(ip)) {
        return ip;
      }
    }
    // If all are private or only one is present
    if (ips[0] && isValidIp(ips[0])) {
      return ips[0];
    }
  }

  const fastlyClientIp = headers.get("fastly-client-ip");
  if (fastlyClientIp && isValidIp(fastlyClientIp.trim())) {
    return fastlyClientIp.trim();
  }

  const xClientIp = headers.get("x-client-ip");
  if (xClientIp && isValidIp(xClientIp.trim())) {
    return xClientIp.trim();
  }

  return "127.0.0.1";
}

/**
 * Determine if an IP is private/local loopback
 * @param {string} ip
 * @returns {boolean}
 */
export function isPrivateIp(ip) {
  if (!ip) return true;
  if (ip === "127.0.0.1" || ip === "::1" || ip === "localhost") return true;

  // IPv4 Private ranges
  if (
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    ip.startsWith("169.254.")
  ) {
    return true;
  }

  // 172.16.0.0 – 172.31.255.255
  if (ip.startsWith("172.")) {
    const parts = ip.split(".");
    if (parts.length >= 2) {
      const second = parseInt(parts[1], 10);
      if (second >= 16 && second <= 31) return true;
    }
  }

  // IPv6 loopback / unique local
  if (ip.startsWith("fc00:") || ip.startsWith("fe80:") || ip === "::") {
    return true;
  }

  return false;
}

/**
 * Validate IP address format (IPv4 or IPv6)
 * @param {string} ip
 * @returns {boolean}
 */
function isValidIp(ip) {
  if (!ip || typeof ip !== "string") return false;
  // Basic IPv4
  const ipv4Regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  // Basic IPv6
  const ipv6Regex = /^([0-9a-fA-F]{1,4}:){1,7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip) || ip === "::1" || ip === "127.0.0.1";
}

/**
 * Anonymize IP address for privacy-compliant reporting (e.g. 192.168.1.xxx or 2001:db8::xxxx)
 * @param {string} ip
 * @returns {string} Masked IP
 */
export function maskIp(ip) {
  if (!ip) return "Unknown";
  if (isPrivateIp(ip)) return "Localhost (Dev)";
  if (ip.includes(".")) {
    const parts = ip.split(".");
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.*.*`;
    }
  }
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return `${parts.slice(0, 2).join(":")}::****`;
  }
  return ip;
}

/**
 * Create a deterministic SHA-256 hash of the IP for aggregation without storing raw IP in logs
 * @param {string} ip
 * @returns {string}
 */
export function hashIp(ip) {
  const salt = process.env.ANALYTICS_SALT || "abdulahad-portfolio-salt-2026";
  return crypto.createHmac("sha256", salt).update(ip || "127.0.0.1").digest("hex");
}
