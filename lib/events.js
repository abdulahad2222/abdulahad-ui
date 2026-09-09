/**
 * Event Taxonomy & Validation for Abdul Ahad Portfolio
 */

export const ALLOWED_EVENT_TYPES = [
  "project_click",
  "resume_download",
  "contact_click",
  "email_click",
  "github_click",
  "linkedin_click",
  "social_click",
  "theme_toggle",
  "section_view",
  "external_link_click",
  "custom_interaction",
];

export const HIGH_VALUE_EVENTS = [
  "resume_download",
  "contact_click",
  "email_click",
  "project_click",
];

/**
 * Validate and sanitize an incoming event payload
 *
 * @param {object} payload
 * @returns {{ valid: boolean, error?: string, sanitized?: object }}
 */
export function validateEvent(payload) {
  if (!payload || typeof payload !== "object") {
    return { valid: false, error: "Event payload must be an object" };
  }

  const {
    sessionId,
    visitorId,
    eventType,
    eventCategory = "interaction",
    targetId = null,
    targetUrl = null,
    label = null,
    metadata = null,
    path = "/",
  } = payload;

  if (!sessionId || typeof sessionId !== "string") {
    return { valid: false, error: "Missing or invalid sessionId" };
  }

  if (!visitorId || typeof visitorId !== "string") {
    return { valid: false, error: "Missing or invalid visitorId" };
  }

  if (!eventType || typeof eventType !== "string" || !ALLOWED_EVENT_TYPES.includes(eventType)) {
    return { valid: false, error: `Invalid eventType: ${eventType}` };
  }

  // Sanitize strings and metadata
  const sanitizedMetadata = metadata
    ? typeof metadata === "string"
      ? metadata.slice(0, 2000)
      : JSON.stringify(metadata).slice(0, 2000)
    : null;

  return {
    valid: true,
    sanitized: {
      sessionId: sessionId.trim(),
      visitorId: visitorId.trim(),
      eventType: eventType.trim(),
      eventCategory: (eventCategory || "interaction").slice(0, 50),
      targetId: targetId ? String(targetId).slice(0, 100) : null,
      targetUrl: targetUrl ? String(targetUrl).slice(0, 500) : null,
      label: label ? String(label).slice(0, 200) : null,
      metadata: sanitizedMetadata,
      path: (path || "/").slice(0, 255),
    },
  };
}
