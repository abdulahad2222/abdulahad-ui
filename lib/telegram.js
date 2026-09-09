/**
 * Telegram Notification System for Abdul Ahad Portfolio
 *
 * Sends formatted instant alerts for:
 * 1. New Visitor arrivals (location, device, referrer, landing page)
 * 2. High Engagement alerts (time spent >= 2m, visited >= 4 pages, clicked resume/contact)
 */

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const ALERTS_ENABLED = process.env.TELEGRAM_ALERTS_ENABLED !== "false";

/**
 * Country code to Emoji flag converter
 * @param {string} countryCode (e.g. "IN", "US", "ID")
 * @returns {string} Emoji flag
 */
function getCountryFlag(countryCode) {
  if (!countryCode || countryCode.length !== 2 || countryCode === "UN" || countryCode === "DEV") {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Format duration in seconds to human-readable string (e.g. "2m 15s" or "45s")
 * @param {number} totalSeconds
 * @returns {string}
 */
function formatDuration(totalSeconds = 0) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`;
  }
  return `${seconds}s`;
}

/**
 * Send raw HTML-formatted Telegram message
 * @param {string} htmlMessage
 * @returns {Promise<boolean>}
 */
export async function sendTelegramMessage(htmlMessage) {
  if (!ALERTS_ENABLED || !BOT_TOKEN || !CHAT_ID) {
    return false;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: htmlMessage,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text();
      console.warn("Telegram API response error:", res.status, errText);
      return false;
    }
    return true;
  } catch (err) {
    // Fail silently without blocking analytics
    console.warn("Telegram notification send failed:", err.message);
    return false;
  }
}

/**
 * Send alert for a newly landed visitor session
 *
 * @param {object} params
 * @param {string} params.country
 * @param {string} params.countryCode
 * @param {string} params.city
 * @param {string} params.deviceType
 * @param {string} params.browserName
 * @param {string} params.osName
 * @param {string} params.referrerDomain
 * @param {string} params.landingPage
 * @param {string} params.utmSource
 */
export async function notifyNewVisitor({
  country = "Unknown",
  countryCode = "UN",
  city = "Unknown",
  deviceType = "desktop",
  browserName = "Unknown",
  osName = "Unknown",
  referrerDomain = "Direct",
  landingPage = "/",
  utmSource = null,
}) {
  const flag = getCountryFlag(countryCode);
  const sourceText = utmSource ? `${referrerDomain || "Direct"} (utm: ${utmSource})` : referrerDomain || "Direct";
  const timeString = new Date().toLocaleTimeString("en-US", { hour12: false });

  const message = [
    `🚀 <b>New Visitor on Portfolio</b>`,
    ``,
    `📍 <b>Location:</b> ${city}, ${country} ${flag}`,
    `💻 <b>Device:</b> ${deviceType} • ${browserName} on ${osName}`,
    `🔗 <b>Traffic Source:</b> ${sourceText}`,
    `📄 <b>Landing Page:</b> <code>${landingPage}</code>`,
    `🕒 <b>Time:</b> ${timeString} UTC`,
  ].join("\n");

  return sendTelegramMessage(message);
}

/**
 * Send alert for a high-engagement visitor session
 * Trigger conditions:
 * - Active duration >= 120s (2m)
 * - Page views >= 4
 * - Triggered high-intent action (CV download, Contact clicked, etc.)
 *
 * @param {object} params
 */
export async function notifyHighEngagement({
  country = "Unknown",
  countryCode = "UN",
  city = "Unknown",
  deviceType = "desktop",
  activeSeconds = 0,
  pageCount = 1,
  visitedPages = [],
  highlightEvents = [],
  reason = "High Active Duration",
}) {
  const flag = getCountryFlag(countryCode);
  const durationText = formatDuration(activeSeconds);

  let pagesListText = visitedPages.slice(0, 5).map(p => `• <code>${p}</code>`).join("\n");
  if (!pagesListText) pagesListText = `• <code>${pageCount} pages</code>`;

  let eventsListText = "";
  if (highlightEvents.length > 0) {
    eventsListText = `\n🎯 <b>Key Actions:</b>\n` + highlightEvents.map(e => `• <b>${e}</b>`).join("\n");
  }

  const message = [
    `🔥 <b>High Engagement Visitor Alert!</b>`,
    `⭐ <i>${reason}</i>`,
    ``,
    `📍 <b>Location:</b> ${city}, ${country} ${flag} (${deviceType})`,
    `⏱️ <b>Active Time:</b> <b>${durationText}</b>`,
    `📄 <b>Pages Visited (${pageCount}):</b>\n${pagesListText}`,
    eventsListText,
  ].filter(Boolean).join("\n");

  return sendTelegramMessage(message);
}
