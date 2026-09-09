import { UAParser } from "ua-parser-js";

/**
 * Parse a User-Agent string into structured client metadata.
 *
 * @param {string|null} userAgentString
 * @returns {{
 *   deviceType: string,
 *   deviceVendor: string|null,
 *   deviceModel: string|null,
 *   browserName: string,
 *   browserVersion: string|null,
 *   osName: string,
 *   osVersion: string|null
 * }}
 */
export function parseUserAgent(userAgentString) {
  if (!userAgentString) {
    return {
      deviceType: "desktop",
      deviceVendor: null,
      deviceModel: null,
      browserName: "Unknown",
      browserVersion: null,
      osName: "Unknown",
      osVersion: null,
    };
  }

  const parser = new UAParser(userAgentString);
  const result = parser.getResult();

  // Device type normalization: desktop, mobile, tablet, bot
  let deviceType = result.device.type || "desktop";
  if (!result.device.type) {
    const ua = userAgentString.toLowerCase();
    if (ua.includes("mobile") || ua.includes("android") || ua.includes("iphone")) {
      deviceType = "mobile";
    } else if (ua.includes("ipad") || ua.includes("tablet")) {
      deviceType = "tablet";
    } else if (ua.includes("bot") || ua.includes("crawler") || ua.includes("spider")) {
      deviceType = "bot";
    } else {
      deviceType = "desktop";
    }
  }

  return {
    deviceType,
    deviceVendor: result.device.vendor || null,
    deviceModel: result.device.model || null,
    browserName: result.browser.name || "Unknown Browser",
    browserVersion: result.browser.version || null,
    osName: result.os.name || "Unknown OS",
    osVersion: result.os.version || null,
  };
}
