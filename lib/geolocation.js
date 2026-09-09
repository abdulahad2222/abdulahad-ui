import { isPrivateIp } from "./ip";

// In-memory cache for geolocation results (24 hours TTL)
const geoCache = new Map();
const CACHE_TTL_MS = 24 * 60 * 60 * 1000;

/**
 * Resolve IP address to geolocation metadata.
 * Uses in-memory cache and resilient fallbacks.
 *
 * @param {string} ip
 * @returns {Promise<{
 *   country: string,
 *   countryCode: string,
 *   region: string,
 *   city: string,
 *   latitude: number|null,
 *   longitude: number|null,
 *   isp: string|null
 * }>}
 */
export async function getGeolocation(ip) {
  if (!ip || isPrivateIp(ip)) {
    return {
      country: "Localhost",
      countryCode: "DEV",
      region: "Development",
      city: "Local Dev",
      latitude: 0.0,
      longitude: 0.0,
      isp: "Local Network",
    };
  }

  // Check in-memory cache
  const cached = geoCache.get(ip);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
    return cached.data;
  }

  try {
    // Primary Provider: ip-api.com
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,lat,lon,isp`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data.status === "success") {
        const result = {
          country: data.country || "Unknown",
          countryCode: data.countryCode || "UN",
          region: data.regionName || "Unknown",
          city: data.city || "Unknown",
          latitude: typeof data.lat === "number" ? data.lat : null,
          longitude: typeof data.lon === "number" ? data.lon : null,
          isp: data.isp || "Unknown",
        };

        geoCache.set(ip, { timestamp: Date.now(), data: result });
        return result;
      }
    }
  } catch (err) {
    // Silently fall back to secondary provider or default
    // console.warn("Primary geo lookup failed for IP:", ip, err.message);
  }

  try {
    // Secondary Provider: ipwho.is
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}`,
      { signal: controller.signal }
    );
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      if (data.success) {
        const result = {
          country: data.country || "Unknown",
          countryCode: data.country_code || "UN",
          region: data.region || "Unknown",
          city: data.city || "Unknown",
          latitude: typeof data.latitude === "number" ? data.latitude : null,
          longitude: typeof data.longitude === "number" ? data.longitude : null,
          isp: data.connection?.isp || "Unknown",
        };

        geoCache.set(ip, { timestamp: Date.now(), data: result });
        return result;
      }
    }
  } catch (err) {
    // Fall back to safe unknown
  }

  const fallback = {
    country: "Unknown",
    countryCode: "UN",
    region: "Unknown",
    city: "Unknown",
    latitude: null,
    longitude: null,
    isp: null,
  };

  geoCache.set(ip, { timestamp: Date.now(), data: fallback });
  return fallback;
}
