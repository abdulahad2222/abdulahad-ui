"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getVisitorId, getSessionId } from "@/lib/analytics-client";

/**
 * High-precision Client-Side Visitor Tracker
 *
 * Tracks:
 * - Route navigation & page views
 * - Active engagement duration (pauses on blur / tab hidden)
 * - Screen resolution, language, timezone, UTM parameters
 * - Safe asynchronous beacon flushes on tab exit or route change
 */
export default function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSecondsRef = useRef(0);
  const totalSecondsRef = useRef(0);
  const isVisibleRef = useRef(true);
  const lastActiveTimestampRef = useRef(Date.now());
  const currentPathRef = useRef(pathname);

  // Helper to send exit beacon
  const flushExitBeacon = (path, activeSec, durationSec) => {
    if (activeSec <= 0 && durationSec <= 0) return;

    try {
      const visitorId = getVisitorId();
      const sessionId = getSessionId();

      const payload = {
        visitorId,
        sessionId,
        path: path || window.location.pathname || "/",
        activeSeconds: activeSec,
        durationSeconds: durationSec,
      };

      const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });

      if (navigator.sendBeacon && navigator.sendBeacon("/api/analytics/exit", blob)) {
        return;
      }

      fetch("/api/analytics/exit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    } catch {
      // Fail silently
    }
  };

  // 1. Initial Page View Tracking & Route Change Handler
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (pathname?.startsWith("/dashboard")) return;

    // Flush telemetry of previous page before tracking new page
    if (currentPathRef.current && currentPathRef.current !== pathname) {
      flushExitBeacon(
        currentPathRef.current,
        activeSecondsRef.current,
        totalSecondsRef.current
      );
      activeSecondsRef.current = 0;
      totalSecondsRef.current = 0;
    }

    currentPathRef.current = pathname;
    const visitorId = getVisitorId();
    const sessionId = getSessionId();

    // Parse UTM parameters
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");
    const utmTerm = searchParams.get("utm_term");
    const utmContent = searchParams.get("utm_content");

    // Client metadata
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const preferredLanguage = navigator.language || "en";
    let timeZone = "UTC";
    try {
      timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {}

    const payload = {
      visitorId,
      sessionId,
      path: pathname || "/",
      title: document.title || "Abdul Ahad Portfolio",
      referrer: document.referrer || null,
      utmSource,
      utmMedium,
      utmCampaign,
      utmTerm,
      utmContent,
      screenResolution,
      preferredLanguage,
      timeZone,
    };

    const scheduleTrack =
      typeof window !== "undefined" && "requestIdleCallback" in window
        ? (cb) => window.requestIdleCallback(cb, { timeout: 2000 })
        : (cb) => setTimeout(cb, 100);

    scheduleTrack(() => {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    });
  }, [pathname, searchParams]);

  // 2. High-Precision Active Time Tracker
  useEffect(() => {
    if (typeof window === "undefined") return;

    isVisibleRef.current = document.visibilityState === "visible";
    lastActiveTimestampRef.current = Date.now();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        isVisibleRef.current = false;
        flushExitBeacon(
          currentPathRef.current,
          activeSecondsRef.current,
          totalSecondsRef.current
        );
      } else {
        isVisibleRef.current = true;
        lastActiveTimestampRef.current = Date.now();
      }
    };

    const handleActivity = () => {
      lastActiveTimestampRef.current = Date.now();
    };

    const handleBeforeUnload = () => {
      flushExitBeacon(
        currentPathRef.current,
        activeSecondsRef.current,
        totalSecondsRef.current
      );
    };

    // 1-second interval timer
    const interval = setInterval(() => {
      totalSecondsRef.current += 1;

      // Active only if tab is visible and had user activity in last 45s
      const idleTime = Date.now() - lastActiveTimestampRef.current;
      if (isVisibleRef.current && idleTime < 45000) {
        activeSecondsRef.current += 1;
      }
    }, 1000);

    // 30-second periodic heartbeat flush to sync active time
    const heartbeat = setInterval(() => {
      if (isVisibleRef.current && activeSecondsRef.current > 5) {
        flushExitBeacon(
          currentPathRef.current,
          activeSecondsRef.current,
          totalSecondsRef.current
        );
        // Reset after incremental flush
        activeSecondsRef.current = 0;
        totalSecondsRef.current = 0;
      }
    }, 30000);

    // Event listeners
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handleBeforeUnload);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("mousemove", handleActivity, { passive: true });
    window.addEventListener("keydown", handleActivity, { passive: true });
    window.addEventListener("scroll", handleActivity, { passive: true });
    window.addEventListener("touchstart", handleActivity, { passive: true });

    return () => {
      clearInterval(interval);
      clearInterval(heartbeat);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleBeforeUnload);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("scroll", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
    };
  }, []);

  return null;
}
