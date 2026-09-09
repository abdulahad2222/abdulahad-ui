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

export default function RealTimeLivePage() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchLive = async () => {
    try {
      const res = await fetch("/api/dashboard/stats?period=24h");
      if (res.ok) {
        const data = await res.json();
        setSessions(data.recentSessions || []);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLive();
    const timer = setInterval(fetchLive, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Real-Time Live Stream
            </h1>
            <span className="dash-badge-live">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              LIVE PULSE
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400">
            Streaming active audience presence and live engagements across your portfolio
          </p>
        </div>

        <div className="flex items-center gap-2.5 text-xs text-slate-400 bg-[#0e121a] px-3.5 py-2 rounded-xl border border-white/10">
          <span className="text-emerald-400 font-semibold">Auto-polling 5s</span>
          <span className="text-slate-600">•</span>
          <span>Updated {lastUpdated.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Live Stream Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-500">
            Connecting to live telemetry feed...
          </div>
        ) : sessions.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-500 dash-card bg-[#0e121a]/80">
            No live visitors detected in this snapshot. Open your portfolio in another tab to see real-time updates!
          </div>
        ) : (
          sessions.map((s) => (
            <div
              key={s.id}
              className="dash-card p-5 bg-[#0e121a]/85 hover:border-blue-500/50 transition-all duration-200 space-y-4 group">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{getFlagEmoji(s.countryCode)}</span>
                  <div>
                    <h3 className="font-bold text-sm text-white">
                      {s.city || "Unknown"}, {s.country || "Unknown"}
                    </h3>
                    <div className="text-[11px] text-slate-500 font-mono">
                      {s.visitorId}
                    </div>
                  </div>
                </div>
                {s.isEngaged && (
                  <span className="dash-badge-engaged shrink-0">
                    🔥 Engaged
                  </span>
                )}
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-slate-300">
                  <span className="text-slate-500">Device</span>
                  <span className="capitalize">{s.deviceType || "desktop"} • {s.browserName || "Browser"}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-slate-300">
                  <span className="text-slate-500">Current / Entry Page</span>
                  <code className="text-blue-400 font-mono text-[11px]">{s.landingPage}</code>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5 text-slate-300">
                  <span className="text-slate-500">Active Attention</span>
                  <span className="text-emerald-400 font-bold">{formatSeconds(s.activeSeconds)}</span>
                </div>
                <div className="flex items-center justify-between py-1 text-slate-300">
                  <span className="text-slate-500">Traffic Source</span>
                  <span className="text-slate-400 font-mono text-[11px]">{s.referrerDomain || "Direct"}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/dashboard/analytics/visitor/${s.visitorId}`}
                  className="dash-btn-primary w-full py-2.5 px-3 flex items-center justify-center gap-1.5 text-xs">
                  <span>Inspect Visitor Journey</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
