"use client";

/**
 * Client-side Analytics Dispatcher for Abdul Ahad Portfolio
 *
 * Provides resilient event tracking using navigator.sendBeacon
 * and keepalive fetch to ensure 100% telemetry capture without blocking UI.
 */

const STORAGE_VISITOR_KEY = "ahad_analytics_visitor_id";
const STORAGE_SESSION_KEY = "ahad_analytics_session_id";

/**
 * Get or generate a stable visitor ID from localStorage
 */
export function getVisitorId() {
  if (typeof window === "undefined") return null;
  try {
    let visitorId = localStorage.getItem(STORAGE_VISITOR_KEY);
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem(STORAGE_VISITOR_KEY, visitorId);
    }
    return visitorId;
  } catch (err) {
    return "vis_anonymous";
  }
}

/**
 * Get or generate a session ID from sessionStorage
 */
export function getSessionId() {
  if (typeof window === "undefined") return null;
  try {
    let sessionId = sessionStorage.getItem(STORAGE_SESSION_KEY);
    if (!sessionId) {
      sessionId = "sess_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      sessionStorage.setItem(STORAGE_SESSION_KEY, sessionId);
    }
    return sessionId;
  } catch (err) {
    return "sess_anonymous";
  }
}

/**
 * Track a custom user interaction event
 *
 * @param {string} eventType (e.g. 'project_click', 'resume_download', 'contact_click')
 * @param {object} [metadata]
 * @param {object} [options]
 * @param {string} [options.targetId]
 * @param {string} [options.targetUrl]
 * @param {string} [options.label]
 * @param {string} [options.category]
 */
export function trackEvent(eventType, metadata = {}, options = {}) {
  if (typeof window === "undefined") return;

  try {
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    const payload = {
      visitorId,
      sessionId,
      eventType,
      eventCategory: options.category || "interaction",
      targetId: options.targetId || null,
      targetUrl: options.targetUrl || null,
      label: options.label || null,
      metadata: typeof metadata === "object" ? metadata : { value: metadata },
      path: window.location.pathname || "/",
      timestamp: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });

    // 1. Try sendBeacon for non-blocking asynchronous transmission
    if (navigator.sendBeacon && navigator.sendBeacon("/api/analytics/event", blob)) {
      return;
    }

    // 2. Fallback to fetch with keepalive
    fetch("/api/analytics/event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Fail silently
    });
  } catch (err) {
    // Fail silently without disrupting user experience
  }
}
