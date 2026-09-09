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

export default function VisitorsListPage() {
  const [visitors, setVisitors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [searchQuery, setSearchQuery] = useState("");
  const [deviceFilter, setDeviceFilter] = useState("");
  const [engagedFilter, setEngagedFilter] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVisitors = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "20",
      });
      if (searchQuery) params.set("q", searchQuery);
      if (deviceFilter) params.set("device", deviceFilter);
      if (engagedFilter) params.set("engaged", "true");

      const res = await fetch(`/api/dashboard/visitors?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setVisitors(data.visitors || []);
        setPagination(data.pagination || { page: 1, limit: 20, total: 0, totalPages: 1 });
      }
    } catch (err) {
      console.error("Failed to load visitors", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisitors(1);
  }, [searchQuery, deviceFilter, engagedFilter]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          Audience Directory
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Browse, search, and analyze individual visitor profiles and navigation journeys
        </p>
      </div>

      {/* Search & Filters */}
      <div className="dash-card p-4 flex flex-col md:flex-row items-center gap-3 bg-[#0e121a]/80">
        {/* Search */}
        <div className="relative flex-1 w-full">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by Visitor ID, Country, City, Browser, OS, Referrer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="dash-input pl-10 pr-4 py-2.5 text-xs md:text-sm"
          />
        </div>

        {/* Device Filter */}
        <select
          value={deviceFilter}
          onChange={(e) => setDeviceFilter(e.target.value)}
          className="dash-input w-full md:w-44 py-2.5 px-3 text-xs md:text-sm">
          <option value="">All Devices</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
          <option value="tablet">Tablet</option>
        </select>

        {/* Engaged Toggle */}
        <button
          onClick={() => setEngagedFilter(!engagedFilter)}
          className={`w-full md:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            engagedFilter
              ? "bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-sm"
              : "dash-btn-secondary"
          }`}>
          <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
          </svg>
          Engaged Only
        </button>
      </div>

      {/* Visitors Table */}
      <div className="dash-card overflow-hidden bg-[#0e121a]/80">
        <div className="overflow-x-auto dash-custom-scrollbar">
          <table className="dash-table">
            <thead>
              <tr>
                <th>Visitor</th>
                <th>Location</th>
                <th>Device & OS</th>
                <th>Visits</th>
                <th>Total Time</th>
                <th>First Seen</th>
                <th>Last Active</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    Loading visitors...
                  </td>
                </tr>
              ) : visitors.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-500">
                    No visitors matching criteria found.
                  </td>
                </tr>
              ) : (
                visitors.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="font-mono text-blue-400 font-semibold truncate max-w-[140px]">
                        {v.visitorId}
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {v.sessionCount || 1} session(s) • {v.pageViewCount || 1} view(s)
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2 text-slate-200">
                        <span>{getFlagEmoji(v.countryCode)}</span>
                        <span>{v.city || "Unknown"}, {v.countryCode || "UN"}</span>
                      </div>
                    </td>
                    <td className="text-slate-300">
                      <div className="capitalize font-medium">
                        {v.deviceType || "desktop"}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {v.browserName} • {v.osName}
                      </div>
                    </td>
                    <td className="font-bold text-white">
                      {v.visitCount}
                    </td>
                    <td className="text-emerald-400 font-semibold">
                      {formatSeconds(v.totalDuration)}
                    </td>
                    <td className="text-slate-400">
                      {new Date(v.firstSeenAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="text-slate-300">
                      {new Date(v.lastSeenAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="text-right">
                      <Link
                        href={`/dashboard/analytics/visitor/${v.visitorId}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 font-semibold text-xs transition-colors">
                        Journey
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

        {/* Pagination Bar */}
        <div className="p-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 bg-black/20">
          <div>
            Showing {(pagination.page - 1) * pagination.limit + 1} to{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} visitors
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchVisitors(pagination.page - 1)}
              disabled={pagination.page <= 1}
              className="dash-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
              Prev
            </button>
            <span className="px-2 font-bold text-white">
              {pagination.page} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchVisitors(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="dash-btn-secondary px-3 py-1.5 text-xs disabled:opacity-40 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
