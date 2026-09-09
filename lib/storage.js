import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), ".analytics_store.json");

// In-memory cache for ultra-fast reads & writes
let memoryStore = {
  visitors: [],
  sessions: [],
  pageViews: [],
  events: [],
};

// Load from disk on startup if exists
try {
  if (fs.existsSync(DATA_FILE)) {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    if (raw) {
      memoryStore = JSON.parse(raw);
    }
  }
} catch (e) {
  console.warn("Storage load warning:", e.message);
}

// Debounced persist to disk
let saveTimeout = null;
function persistStore() {
  if (saveTimeout) clearTimeout(saveTimeout);
  saveTimeout = setTimeout(() => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(memoryStore, null, 2), "utf-8");
    } catch (err) {
      console.warn("Failed to persist analytics data to disk:", err.message);
    }
  }, 1000);
}

/**
 * Record or update a visitor
 */
export function saveVisitor(visitorData) {
  const existingIndex = memoryStore.visitors.findIndex(
    (v) => v.visitorId === visitorData.visitorId
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const v = memoryStore.visitors[existingIndex];
    v.lastSeenAt = now;
    v.deviceType = visitorData.deviceType || v.deviceType;
    v.browserName = visitorData.browserName || v.browserName;
    v.osName = visitorData.osName || v.osName;
    v.screenResolution = visitorData.screenResolution || v.screenResolution;
    v.preferredLanguage = visitorData.preferredLanguage || v.preferredLanguage;
    v.timeZone = visitorData.timeZone || v.timeZone;
    if (visitorData.country && visitorData.country !== "Unknown") v.country = visitorData.country;
    if (visitorData.countryCode && visitorData.countryCode !== "UN") v.countryCode = visitorData.countryCode;
    if (visitorData.city && visitorData.city !== "Unknown") v.city = visitorData.city;
    persistStore();
    return v;
  }

  const newVisitor = {
    id: "vis_" + Math.random().toString(36).substring(2, 9),
    visitorId: visitorData.visitorId,
    firstSeenAt: now,
    lastSeenAt: now,
    visitCount: 1,
    totalDuration: 0,
    deviceType: visitorData.deviceType || "desktop",
    deviceVendor: visitorData.deviceVendor || null,
    deviceModel: visitorData.deviceModel || null,
    browserName: visitorData.browserName || "Unknown",
    browserVersion: visitorData.browserVersion || null,
    osName: visitorData.osName || "Unknown",
    osVersion: visitorData.osVersion || null,
    screenResolution: visitorData.screenResolution || null,
    preferredLanguage: visitorData.preferredLanguage || "en",
    timeZone: visitorData.timeZone || "UTC",
    country: visitorData.country || "Localhost",
    countryCode: visitorData.countryCode || "DEV",
    region: visitorData.region || "Development",
    city: visitorData.city || "Local Dev",
    latitude: visitorData.latitude || null,
    longitude: visitorData.longitude || null,
    isp: visitorData.isp || "Local Network",
    ipHash: visitorData.ipHash || null,
  };

  memoryStore.visitors.unshift(newVisitor);
  persistStore();
  return newVisitor;
}

/**
 * Record or update a session
 */
export function saveSession(sessionData) {
  const existingIndex = memoryStore.sessions.findIndex(
    (s) => s.sessionId === sessionData.sessionId
  );

  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const s = memoryStore.sessions[existingIndex];
    s.lastActiveAt = now;
    s.pageCount = (s.pageCount || 1) + 1;
    persistStore();
    return { session: s, isNew: false };
  }

  // Increment visit count for returning visitor
  const visitor = memoryStore.visitors.find(
    (v) => v.visitorId === sessionData.visitorId
  );
  if (visitor) {
    visitor.visitCount = (visitor.visitCount || 1) + 1;
    visitor.lastSeenAt = now;
  }

  const newSession = {
    id: "sess_" + Math.random().toString(36).substring(2, 9),
    sessionId: sessionData.sessionId,
    visitorId: sessionData.visitorId,
    startedAt: now,
    endedAt: null,
    lastActiveAt: now,
    durationSeconds: 0,
    activeSeconds: 0,
    landingPage: sessionData.landingPage || "/",
    exitPage: null,
    referrer: sessionData.referrer || null,
    referrerDomain: sessionData.referrerDomain || (sessionData.referrer ? new URL(sessionData.referrer).hostname : "Direct"),
    utmSource: sessionData.utmSource || null,
    utmMedium: sessionData.utmMedium || null,
    utmCampaign: sessionData.utmCampaign || null,
    country: sessionData.country || "Localhost",
    countryCode: sessionData.countryCode || "DEV",
    region: sessionData.region || "Development",
    city: sessionData.city || "Local Dev",
    deviceType: sessionData.deviceType || "desktop",
    browserName: sessionData.browserName || "Unknown",
    osName: sessionData.osName || "Unknown",
    pageCount: 1,
    eventCount: 0,
    isEngaged: false,
    notifiedTelegram: false,
  };

  memoryStore.sessions.unshift(newSession);
  persistStore();
  return { session: newSession, isNew: true };
}

/**
 * Record a pageview
 */
export function savePageView(pageViewData) {
  const newPageView = {
    id: "pv_" + Math.random().toString(36).substring(2, 9),
    sessionId: pageViewData.sessionId,
    visitorId: pageViewData.visitorId,
    path: pageViewData.path || "/",
    title: pageViewData.title || "Abdul Ahad Portfolio",
    referrer: pageViewData.referrer || null,
    viewedAt: new Date().toISOString(),
    durationSeconds: 0,
    activeSeconds: 0,
    sequenceOrder: memoryStore.pageViews.filter((p) => p.sessionId === pageViewData.sessionId).length + 1,
  };

  memoryStore.pageViews.unshift(newPageView);
  persistStore();
  return newPageView;
}

/**
 * Update duration and active seconds on page exit
 */
export function updateExitDuration(sessionId, visitorId, path, activeSec, durationSec) {
  const now = new Date().toISOString();

  // 1. Update latest page view
  const pv = memoryStore.pageViews.find(
    (p) => p.sessionId === sessionId && p.path === path
  );
  if (pv) {
    pv.activeSeconds = (pv.activeSeconds || 0) + activeSec;
    pv.durationSeconds = (pv.durationSeconds || 0) + durationSec;
  }

  // 2. Update session
  let isHighEngaged = false;
  const session = memoryStore.sessions.find((s) => s.sessionId === sessionId);
  if (session) {
    session.lastActiveAt = now;
    session.exitPage = path;
    session.activeSeconds = (session.activeSeconds || 0) + activeSec;
    session.durationSeconds = (session.durationSeconds || 0) + durationSec;

    if (session.activeSeconds >= 120 || session.pageCount >= 4) {
      session.isEngaged = true;
      if (!session.notifiedTelegram) {
        isHighEngaged = true;
        session.notifiedTelegram = true;
      }
    }
  }

  // 3. Update visitor
  const visitor = memoryStore.visitors.find((v) => v.visitorId === visitorId);
  if (visitor) {
    visitor.totalDuration = (visitor.totalDuration || 0) + durationSec;
    visitor.lastSeenAt = now;
  }

  persistStore();
  return { session, isHighEngaged };
}

/**
 * Save custom interaction event
 */
export function saveEvent(eventData) {
  const newEvent = {
    id: "ev_" + Math.random().toString(36).substring(2, 9),
    sessionId: eventData.sessionId,
    visitorId: eventData.visitorId,
    eventType: eventData.eventType,
    eventCategory: eventData.eventCategory || "interaction",
    targetId: eventData.targetId || null,
    targetUrl: eventData.targetUrl || null,
    label: eventData.label || null,
    metadata: eventData.metadata || null,
    path: eventData.path || "/",
    timestamp: new Date().toISOString(),
  };

  memoryStore.events.unshift(newEvent);

  const session = memoryStore.sessions.find((s) => s.sessionId === eventData.sessionId);
  if (session) {
    session.eventCount = (session.eventCount || 0) + 1;
    session.lastActiveAt = new Date().toISOString();
  }

  persistStore();
  return { event: newEvent, session };
}

/**
 * Aggregate stats for Dashboard Overview
 */
export function getOverviewStats(period = "7d") {
  const now = new Date();
  let cutoff = new Date();

  if (period === "24h") cutoff.setHours(now.getHours() - 24);
  else if (period === "7d") cutoff.setDate(now.getDate() - 7);
  else if (period === "30d") cutoff.setDate(now.getDate() - 30);
  else if (period === "90d") cutoff.setDate(now.getDate() - 90);
  else cutoff = new Date(0); // All time

  const filteredSessions = memoryStore.sessions.filter(
    (s) => new Date(s.startedAt) >= cutoff
  );

  const filteredVisitors = memoryStore.visitors.filter(
    (v) => new Date(v.lastSeenAt) >= cutoff
  );

  const filteredPageViews = memoryStore.pageViews.filter(
    (p) => new Date(p.viewedAt) >= cutoff
  );

  const totalSessions = filteredSessions.length;
  const totalVisitors = filteredVisitors.length;
  const totalPageViews = filteredPageViews.length;

  let totalActive = 0;
  let singlePageCount = 0;
  let engagedCount = 0;

  const deviceMap = { desktop: 0, mobile: 0, tablet: 0 };
  const browserMap = {};
  const osMap = {};
  const countryMap = {};
  const referrerMap = {};

  for (const s of filteredSessions) {
    totalActive += s.activeSeconds || 0;
    if ((s.pageCount || 1) <= 1) singlePageCount += 1;
    if (s.isEngaged || (s.activeSeconds || 0) >= 120) engagedCount += 1;

    const dev = s.deviceType || "desktop";
    deviceMap[dev] = (deviceMap[dev] || 0) + 1;

    const b = s.browserName || "Unknown";
    browserMap[b] = (browserMap[b] || 0) + 1;

    const os = s.osName || "Unknown";
    osMap[os] = (osMap[os] || 0) + 1;

    const cCode = s.countryCode || "DEV";
    if (!countryMap[cCode]) {
      countryMap[cCode] = {
        country: s.country || "Localhost",
        countryCode: cCode,
        count: 0,
      };
    }
    countryMap[cCode].count += 1;

    const ref = s.referrerDomain || "Direct";
    referrerMap[ref] = (referrerMap[ref] || 0) + 1;
  }

  const avgActiveDuration = totalSessions > 0 ? Math.round(totalActive / totalSessions) : 0;
  const bounceRate = totalSessions > 0 ? Math.round((singlePageCount / totalSessions) * 100) : 0;

  // Top Pages
  const pageMap = {};
  for (const pv of filteredPageViews) {
    if (!pageMap[pv.path]) pageMap[pv.path] = { path: pv.path, views: 0, totalActive: 0 };
    pageMap[pv.path].views += 1;
    pageMap[pv.path].totalActive += pv.activeSeconds || 0;
  }

  const topPages = Object.values(pageMap)
    .map((p) => ({
      path: p.path,
      views: p.views,
      avgDuration: p.views > 0 ? Math.round(p.totalActive / p.views) : 0,
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Top Referrers
  const topReferrers = Object.entries(referrerMap)
    .map(([domain, count]) => ({ domain, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Breakdown formatters
  const formatBreakdown = (map, total) =>
    Object.entries(map)
      .map(([name, count]) => ({
        name,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }))
      .sort((a, b) => b.count - a.count);

  const browserBreakdown = formatBreakdown(browserMap, totalSessions).slice(0, 5);
  const osBreakdown = formatBreakdown(osMap, totalSessions).slice(0, 5);
  const countryBreakdown = Object.values(countryMap)
    .map((c) => ({
      ...c,
      percentage: totalSessions > 0 ? Math.round((c.count / totalSessions) * 100) : 0,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Timeline points
  const count = period === "24h" ? 24 : period === "30d" ? 30 : 7;
  const timeline = [];

  if (period === "24h") {
    for (let i = 23; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 3600 * 1000);
      const hourStr = d.getHours().toString().padStart(2, "0") + ":00";
      const sCount = filteredSessions.filter((s) => {
        const sd = new Date(s.startedAt);
        return sd.getHours() === d.getHours() && sd.toDateString() === d.toDateString();
      }).length;
      const pCount = filteredPageViews.filter((pv) => {
        const pvd = new Date(pv.viewedAt);
        return pvd.getHours() === d.getHours() && pvd.toDateString() === d.toDateString();
      }).length;
      timeline.push({ key: hourStr, label: hourStr, sessions: sCount, pageViews: pCount });
    }
  } else {
    for (let i = count - 1; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
      const dateKey = d.toISOString().split("T")[0];
      const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
      const sCount = filteredSessions.filter((s) => s.startedAt.split("T")[0] === dateKey).length;
      const pCount = filteredPageViews.filter((pv) => pv.viewedAt.split("T")[0] === dateKey).length;
      timeline.push({ key: dateKey, label, sessions: sCount, pageViews: pCount });
    }
  }

  // Recent Sessions
  const recentSessions = filteredSessions.slice(0, 10);

  return {
    period,
    overview: {
      totalVisitors,
      totalSessions,
      totalPageViews,
      avgActiveDuration,
      bounceRate,
      engagedSessions: engagedCount,
    },
    timeline,
    topPages,
    topReferrers,
    devices: deviceMap,
    browsers: browserBreakdown,
    operatingSystems: osBreakdown,
    countries: countryBreakdown,
    recentSessions,
  };
}

/**
 * Get paginated visitors list with search and filters
 */
export function getVisitorsList({ page = 1, limit = 20, query = "", device = "", engaged = false } = {}) {
  let filtered = [...memoryStore.visitors];

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (v) =>
        v.visitorId.toLowerCase().includes(q) ||
        (v.country && v.country.toLowerCase().includes(q)) ||
        (v.city && v.city.toLowerCase().includes(q)) ||
        (v.browserName && v.browserName.toLowerCase().includes(q)) ||
        (v.osName && v.osName.toLowerCase().includes(q))
    );
  }

  if (device) {
    filtered = filtered.filter((v) => v.deviceType === device);
  }

  if (engaged) {
    const engagedVisitorIds = new Set(
      memoryStore.sessions.filter((s) => s.isEngaged).map((s) => s.visitorId)
    );
    filtered = filtered.filter((v) => engagedVisitorIds.has(v.visitorId));
  }

  const total = filtered.length;
  const start = (page - 1) * limit;
  const paged = filtered.slice(start, start + limit).map((v) => {
    const userSessions = memoryStore.sessions.filter((s) => s.visitorId === v.visitorId);
    const userPageViews = memoryStore.pageViews.filter((p) => p.visitorId === v.visitorId);
    const userEvents = memoryStore.events.filter((e) => e.visitorId === v.visitorId);

    return {
      ...v,
      sessionCount: userSessions.length || 1,
      pageViewCount: userPageViews.length || 1,
      eventCount: userEvents.length || 0,
      latestSession: userSessions[0] || null,
    };
  });

  return {
    visitors: paged,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
}

/**
 * Get complete visitor profile and chronological timeline
 */
export function getVisitorJourney(visitorId) {
  const visitor = memoryStore.visitors.find(
    (v) => v.visitorId === visitorId || v.id === visitorId
  );

  if (!visitor) return null;

  const userSessions = memoryStore.sessions.filter(
    (s) => s.visitorId === visitor.visitorId
  );
  const userPageViews = memoryStore.pageViews.filter(
    (p) => p.visitorId === visitor.visitorId
  );
  const userEvents = memoryStore.events.filter(
    (e) => e.visitorId === visitor.visitorId
  );

  const timeline = [];

  for (const s of userSessions) {
    timeline.push({
      id: `sess_${s.id}`,
      sessionId: s.sessionId,
      type: "session_start",
      timestamp: s.startedAt,
      title: `Session Initialized (${s.landingPage})`,
      details: {
        referrer: s.referrerDomain || "Direct",
        device: `${s.deviceType} • ${s.browserName}`,
        city: s.city,
        country: s.country,
      },
    });
  }

  for (const pv of userPageViews) {
    timeline.push({
      id: `pv_${pv.id}`,
      sessionId: pv.sessionId,
      type: "page_view",
      timestamp: pv.viewedAt,
      title: `Visited ${pv.path}`,
      details: {
        path: pv.path,
        activeSeconds: pv.activeSeconds,
        durationSeconds: pv.durationSeconds,
        sequence: pv.sequenceOrder,
      },
    });
  }

  for (const ev of userEvents) {
    let meta = null;
    try {
      meta = typeof ev.metadata === "string" ? JSON.parse(ev.metadata) : ev.metadata;
    } catch {
      meta = ev.metadata;
    }

    timeline.push({
      id: `ev_${ev.id}`,
      sessionId: ev.sessionId,
      type: "event",
      timestamp: ev.timestamp,
      title: `Action: ${ev.label || ev.eventType}`,
      details: {
        eventType: ev.eventType,
        label: ev.label,
        targetUrl: ev.targetUrl,
        metadata: meta,
        path: ev.path,
      },
    });
  }

  // Sort newest first
  timeline.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return {
    visitor: {
      ...visitor,
      sessionCount: userSessions.length,
    },
    sessions: userSessions,
    timeline,
  };
}

/**
 * Get events list
 */
export function getEventsList(type = "", limit = 50) {
  let filtered = [...memoryStore.events];
  if (type) {
    filtered = filtered.filter((e) => e.eventType === type);
  }

  return filtered.slice(0, limit).map((e) => {
    const session = memoryStore.sessions.find((s) => s.sessionId === e.sessionId);
    return {
      ...e,
      session: session
        ? {
            country: session.country,
            countryCode: session.countryCode,
            city: session.city,
            deviceType: session.deviceType,
            browserName: session.browserName,
          }
        : null,
    };
  });
}
