"use client";

import { useState, useEffect, use } from "react";
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

export default function VisitorJourneyPage({ params }) {
  const unwrappedParams = use(params);
  const visitorId = unwrappedParams?.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!visitorId) return;

    fetch(`/api/dashboard/visitor/${visitorId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Visitor not found");
        return res.json();
      })
      .then((json) => {
        setData(json);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [visitorId]);

  const copyId = () => {
    if (visitorId) {
      navigator.clipboard.writeText(visitorId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 text-center text-slate-500">
        Loading visitor journey...
      </div>
    );
  }

  if (!data || !data.visitor) {
    return (
      <div className="max-w-5xl mx-auto space-y-4">
        <Link
          href="/dashboard/analytics/visitors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white">
          &larr; Back to Visitors
        </Link>
        <div className="dash-card p-8 text-center bg-[#0e121a]/80">
          <h2 className="text-lg font-bold text-white mb-1">Visitor Not Found</h2>
          <p className="text-xs text-slate-400">
            No analytics records matching ID &quot;{visitorId}&quot; were located.
          </p>
        </div>
      </div>
    );
  }

  const { visitor, sessions, timeline } = data;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back Button */}
      <div>
        <Link
          href="/dashboard/analytics/visitors"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-3.5 py-2 rounded-xl">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Visitors Directory
        </Link>
      </div>

      {/* Visitor Profile Header Card */}
      <div className="dash-card dash-card-glow p-6 md:p-8 bg-[#0e121a]/85 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl">{getFlagEmoji(visitor.countryCode)}</span>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
                {visitor.city || "Unknown"}, {visitor.country || "Unknown"}
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>{visitor.visitorId}</span>
              <button
                onClick={copyId}
                title="Copy Visitor ID"
                className="text-slate-500 hover:text-blue-400 transition-colors cursor-pointer">
                {copied ? (
                  <span className="text-emerald-400 font-semibold text-[10px]">Copied!</span>
                ) : (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-4 bg-black/40 border border-white/10 px-5 py-3.5 rounded-xl shrink-0">
            <div className="text-center px-2">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Visits</div>
              <div className="text-xl font-bold text-white">{visitor.visitCount}</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Active Time</div>
              <div className="text-xl font-bold text-emerald-400">
                {formatSeconds(visitor.totalDuration)}
              </div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div className="text-center px-2">
              <div className="text-[11px] text-slate-400 uppercase font-bold">Sessions</div>
              <div className="text-xl font-bold text-indigo-400">
                {visitor.sessionCount || sessions.length}
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Device</div>
            <div className="font-semibold text-white capitalize">{visitor.deviceType || "Desktop"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Browser</div>
            <div className="font-semibold text-white truncate">{visitor.browserName || "Unknown"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Operating System</div>
            <div className="font-semibold text-white truncate">{visitor.osName || "Unknown"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Screen</div>
            <div className="font-semibold text-white">{visitor.screenResolution || "Unknown"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Language</div>
            <div className="font-semibold text-white uppercase">{visitor.preferredLanguage || "EN"}</div>
          </div>

          <div className="p-3.5 rounded-xl bg-black/30 border border-white/5">
            <div className="text-slate-500 mb-1 text-[11px] font-bold">Timezone</div>
            <div className="font-semibold text-white truncate">{visitor.timeZone || "UTC"}</div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Chronological Journey Timeline */}
      <div className="dash-card p-6 md:p-8 bg-[#0e121a]/85 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">Chronological Journey Timeline</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Step-by-step visitor progression through sessions, pages, and interactive events
          </p>
        </div>

        <div className="relative pl-6 space-y-6 before:absolute before:left-[11px] before:top-3 before:bottom-3 before:w-0.5 before:bg-white/10">
          {timeline.length === 0 ? (
            <p className="text-xs text-slate-500 py-4">No chronological events found.</p>
          ) : (
            timeline.map((item, idx) => {
              const date = new Date(item.timestamp);
              const timeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
              const dateString = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

              if (item.type === "session_start") {
                return (
                  <div key={item.id || idx} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-blue-600 border-4 border-[#07090e] flex items-center justify-center text-white shadow-lg text-[10px]">
                      🚀
                    </div>
                    <div className="p-4 rounded-xl bg-black/40 border border-blue-500/30 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-blue-400 flex items-center gap-2">
                          <span>Session Started</span>
                          <span className="font-mono text-slate-500 text-[10px]">
                            ({item.sessionId})
                          </span>
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {dateString} at {timeString}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300">
                        Traffic Source: <code className="text-blue-300 bg-blue-950/60 px-1.5 py-0.5 rounded">{item.details?.referrer || "Direct"}</code> &rarr;{" "}
                        Landing: <code className="text-emerald-300 bg-emerald-950/60 px-1.5 py-0.5 rounded">{item.title}</code>
                      </div>
                    </div>
                  </div>
                );
              }

              if (item.type === "page_view") {
                return (
                  <div key={item.id || idx} className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-cyan-600 border-4 border-[#07090e] flex items-center justify-center text-white shadow-lg text-[10px]">
                      👁️
                    </div>
                    <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-200 font-mono">
                          {item.details?.path}
                        </span>
                        <span className="text-slate-400 text-[11px]">
                          {timeString}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        {item.details?.activeSeconds > 0 && (
                          <span className="text-emerald-400 font-medium">
                            Active Time: {formatSeconds(item.details.activeSeconds)}
                          </span>
                        )}
                        <span>Sequence #{item.details?.sequence || 1}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Custom Interaction Event
              return (
                <div key={item.id || idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-6 h-6 rounded-full bg-rose-600 border-4 border-[#07090e] flex items-center justify-center text-white shadow-lg text-[10px]">
                    🎯
                  </div>
                  <div className="p-4 rounded-xl bg-black/50 border border-rose-500/40 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-rose-400">
                        {item.title}
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        {timeString}
                      </span>
                    </div>
                    {item.details?.metadata && (
                      <pre className="text-[11px] font-mono bg-black/50 p-2.5 rounded-lg text-slate-300 overflow-x-auto border border-white/5">
                        {JSON.stringify(item.details.metadata, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
