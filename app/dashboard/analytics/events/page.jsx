"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "@/app/dashboard/dashboard.css";

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

export default function EventsFeedPage() {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchEvents = async (type = filterType) => {
    setLoading(true);
    try {
      const url = type ? `/api/dashboard/events?type=${type}&limit=50` : `/api/dashboard/events?limit=50`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setEvents(data.events || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(filterType);
  }, [filterType]);

  const eventFilters = [
    { id: "", label: "All Events" },
    { id: "resume_download", label: "📄 CV Downloads" },
    { id: "project_click", label: "💼 Project Clicks" },
    { id: "contact_click", label: "📞 Contact Clicks" },
    { id: "email_click", label: "✉️ Email Clicks" },
    { id: "github_click", label: "🐙 GitHub Links" },
    { id: "linkedin_click", label: "💼 LinkedIn Links" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Interactions & Events Telemetry
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time telemetry of button clicks, CV downloads, project views, and high-intent actions
          </p>
        </div>

        <button
          onClick={() => fetchEvents(filterType)}
          className="p-2.5 rounded-xl bg-[#0e121a] border border-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 dash-custom-scrollbar">
        {eventFilters.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              filterType === tab.id
                ? "bg-blue-600 text-white shadow-md shadow-blue-600/30 border border-blue-400/30"
                : "dash-btn-secondary"
            }`}>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Events Table */}
      <div className="dash-card overflow-hidden bg-[#0e121a]/80">
        <div className="overflow-x-auto dash-custom-scrollbar">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Event Type</th>
                <th>Action Label / Target</th>
                <th>Location & Device</th>
                <th>Page Path</th>
                <th>Timestamp</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    Loading interaction events...
                  </td>
                </tr>
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No events recorded in this category yet.
                  </td>
                </tr>
              ) : (
                events.map((e) => (
                  <tr key={e.id}>
                    <td>
                      <span className="font-semibold px-2 py-0.5 rounded-md bg-blue-950/60 text-blue-400 border border-blue-800/40 font-mono text-[11px]">
                        {e.eventType}
                      </span>
                    </td>
                    <td className="text-slate-200">
                      <div className="font-medium">{e.label || e.eventType}</div>
                      {e.targetUrl && (
                        <div className="text-[10px] text-slate-500 truncate max-w-xs">{e.targetUrl}</div>
                      )}
                    </td>
                    <td className="text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <span>{getFlagEmoji(e.session?.countryCode)}</span>
                        <span>{e.session?.city || "Unknown"}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize">
                        {e.session?.deviceType || "desktop"} • {e.session?.browserName || "Browser"}
                      </div>
                    </td>
                    <td className="font-mono text-slate-400">
                      {e.path}
                    </td>
                    <td>
                      <div className="text-slate-300 font-medium whitespace-nowrap">
                        {new Date(e.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-[11px] text-slate-500 whitespace-nowrap">
                        {new Date(e.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                      </div>
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/dashboard/analytics/visitor/${e.visitorId}`}
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
