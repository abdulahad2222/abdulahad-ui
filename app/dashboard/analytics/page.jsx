"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@/app/dashboard/dashboard.css";

function formatSeconds(sec = 0) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

function getFlagEmoji(countryCode) {
  if (!countryCode || countryCode.length !== 2 || countryCode === "UN" || countryCode === "DEV") {
    return "🌐";
  }
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default function AnalyticsOverviewPage() {
  const [period, setPeriod] = useState("7d");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async (selectedPeriod = period) => {
    try {
      setRefreshing(true);
      const res = await fetch(`/api/dashboard/stats?period=${selectedPeriod}`);
      if (res.ok) {
        const stats = await res.json();
        setData(stats);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats(period);
  }, [period]);

  const overview = data?.overview || {
    totalVisitors: 0,
    totalSessions: 0,
    totalPageViews: 0,
    avgActiveDuration: 0,
    bounceRate: 0,
    engagedSessions: 0,
  };

  const timeline = data?.timeline || [];
  const maxTimelineViews = Math.max(...timeline.map((t) => t.pageViews || 0), 1);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Visitor Intelligence
            </h1>
            <span className="dash-badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Real-Time Active
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Real-time analytics, session telemetry, and audience engagement
          </p>
        </div>

        {/* Date Filter & Refresh */}
        <div className="flex items-center gap-2.5">
          <div className="bg-[#0e121a] border border-white/10 p-1 rounded-xl flex items-center shadow-inner">
            {[
              { id: "24h", label: "24H" },
              { id: "7d", label: "7D" },
              { id: "30d", label: "30D" },
              { id: "all", label: "All" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => setPeriod(p.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  period === p.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}>
                {p.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchStats(period)}
            disabled={refreshing}
            title="Refresh Data"
            className="p-2.5 rounded-xl bg-[#0e121a] border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer disabled:opacity-50">
            <svg className={`w-4 h-4 ${refreshing ? "animate-spin text-blue-400" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Total Unique Visitors */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Visitors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {overview.totalVisitors.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Unique audiences</span>
        </div>

        {/* Total Sessions */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Sessions</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {overview.totalSessions.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Total visits</span>
        </div>

        {/* Page Views */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Page Views</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {overview.totalPageViews.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Telemetry views</span>
        </div>

        {/* Avg Active Duration */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Avg Active Time</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {formatSeconds(overview.avgActiveDuration)}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">Engaged attention</span>
        </div>

        {/* Bounce Rate */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Bounce Rate</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {overview.bounceRate}%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">1-page sessions</span>
        </div>

        {/* Engaged Visitors */}
        <div className="dash-card dash-card-glow p-5 relative overflow-hidden bg-[#0e121a]/80">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Engaged</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 text-rose-400 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {overview.engagedSessions.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">&gt;2m or key action</span>
        </div>
      </div>

      {/* Traffic Trend Chart */}
      <div className="dash-card p-6 md:p-8 bg-[#0e121a]/80">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-base font-bold text-white">Traffic & Page Views Timeline</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Breakdown of page requests and visitor sessions
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-blue-500 shadow-sm shadow-blue-500/50" />
              <span className="text-slate-300 font-medium">Page Views</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded bg-indigo-400 shadow-sm shadow-indigo-400/50" />
              <span className="text-slate-300 font-medium">Sessions</span>
            </div>
          </div>
        </div>

        {/* Bar Chart Container */}
        <div className="h-48 w-full flex items-end gap-2 pt-6 pb-2">
          {timeline.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-xs text-slate-500">
              No traffic recorded in this period yet.
            </div>
          ) : (
            timeline.map((point, index) => {
              const heightPercent = maxTimelineViews > 0
                ? Math.max(8, (point.pageViews / maxTimelineViews) * 100)
                : 8;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-1 h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 bg-[#07090e] text-white text-[11px] px-2.5 py-1 rounded-lg border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    <span className="font-semibold text-blue-400">{point.label}</span>:{" "}
                    {point.pageViews} views, {point.sessions} sessions
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className="w-full max-w-[28px] rounded-t-lg bg-gradient-to-t from-blue-600/60 to-blue-500 group-hover:from-blue-500 group-hover:to-cyan-400 transition-all cursor-pointer relative">
                    {point.sessions > 0 && (
                      <div
                        style={{
                          height: `${Math.min(
                            100,
                            (point.sessions / Math.max(1, point.pageViews)) * 100
                          )}%`,
                        }}
                        className="w-full absolute bottom-0 rounded-t-md bg-indigo-400/80 pointer-events-none"
                      />
                    )}
                  </div>
                  {/* Label */}
                  <span className="text-[10px] text-slate-500 group-hover:text-slate-300 truncate max-w-full">
                    {point.label}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Grid Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="dash-card p-6 bg-[#0e121a]/80 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3>Top Pages Visited</h3>
          </div>
          <div className="space-y-2.5">
            {(!data?.topPages || data.topPages.length === 0) ? (
              <p className="text-xs text-slate-500 py-4 text-center">No page views recorded yet</p>
            ) : (
              data.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-white/5 last:border-0">
                  <div className="truncate max-w-[180px] font-mono text-slate-300">
                    {page.path}
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-slate-400 text-[11px]">{formatSeconds(page.avgDuration)}</span>
                    <span className="font-semibold text-white bg-white/10 px-2 py-0.5 rounded-md">
                      {page.views} views
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Countries & Geolocation */}
        <div className="dash-card p-6 bg-[#0e121a]/80 space-y-4">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3>Top Countries</h3>
          </div>
          <div className="space-y-3">
            {(!data?.countries || data.countries.length === 0) ? (
              <p className="text-xs text-slate-500 py-4 text-center">No geo data recorded yet</p>
            ) : (
              data.countries.map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 flex items-center gap-2 truncate">
                      <span>{getFlagEmoji(c.countryCode)}</span>
                      <span>{c.country}</span>
                    </span>
                    <span className="text-slate-400 text-[11px] font-medium">
                      {c.count} ({c.percentage}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      style={{ width: `${c.percentage}%` }}
                      className="h-full bg-emerald-500 rounded-full"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Devices & Referrers */}
        <div className="space-y-6">
          {/* Device Breakdown */}
          <div className="dash-card p-6 bg-[#0e121a]/80">
            <h3 className="text-white font-bold text-sm mb-4">Device Breakdown</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold text-white">{data?.devices?.desktop || 0}</div>
                <div className="text-[10px] text-slate-400 mt-1">Desktop</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold text-white">{data?.devices?.mobile || 0}</div>
                <div className="text-[10px] text-slate-400 mt-1">Mobile</div>
              </div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                <div className="text-xs font-bold text-white">{data?.devices?.tablet || 0}</div>
                <div className="text-[10px] text-slate-400 mt-1">Tablet</div>
              </div>
            </div>
          </div>

          {/* Top Referrers */}
          <div className="dash-card p-6 bg-[#0e121a]/80">
            <div className="flex items-center gap-2 mb-3 text-white font-bold text-sm">
              <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <h3>Traffic Sources</h3>
            </div>
            <div className="space-y-2">
              {(!data?.topReferrers || data.topReferrers.length === 0) ? (
                <p className="text-xs text-slate-500 text-center py-2">No referrer data</p>
              ) : (
                data.topReferrers.slice(0, 4).map((r, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1">
                    <span className="text-slate-300 truncate font-mono text-[11px]">{r.domain}</span>
                    <span className="text-slate-400 font-semibold">{r.count}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Visitor Sessions Table */}
      <div className="dash-card p-6 md:p-8 bg-[#0e121a]/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Recent Visitor Sessions</h3>
            <p className="text-xs text-slate-400">Latest activity on your portfolio</p>
          </div>
          <Link
            href="/dashboard/analytics/visitors"
            className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5 transition-colors">
            View All Visitors
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

        <div className="overflow-x-auto dash-custom-scrollbar">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Location</th>
                <th>Device / Browser</th>
                <th>Landing Page</th>
                <th>Active Duration</th>
                <th>Time</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {(!data?.recentSessions || data.recentSessions.length === 0) ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    No sessions recorded in this period yet.
                  </td>
                </tr>
              ) : (
                data.recentSessions.map((s) => (
                  <tr key={s.id}>
                    <td className="text-slate-200">
                      <div className="flex items-center gap-2">
                        <span>{getFlagEmoji(s.countryCode)}</span>
                        <span>{s.city || "Unknown"}, {s.countryCode || "UN"}</span>
                      </div>
                    </td>
                    <td className="text-slate-300">
                      <span className="capitalize">{s.deviceType || "desktop"}</span> • {s.browserName || "Browser"}
                    </td>
                    <td className="font-mono text-slate-400">
                      {s.landingPage}
                    </td>
                    <td className="text-emerald-400 font-semibold">
                      {formatSeconds(s.activeSeconds)}
                    </td>
                    <td className="text-slate-400">
                      {new Date(s.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/dashboard/analytics/visitor/${s.visitorId}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-semibold text-xs transition-colors">
                        Inspect
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
