"use client";

import { useState } from "react";
import "@/app/dashboard/dashboard.css";

export default function SettingsAndExportPage() {
  const [retentionDays, setRetentionDays] = useState("90");
  const [cleaning, setCleaning] = useState(false);
  const [cleanMessage, setCleanMessage] = useState(null);

  const handleRetentionCleanup = async () => {
    if (!confirm(`Are you sure you want to delete all analytics records older than ${retentionDays} days? This action cannot be undone.`)) {
      return;
    }

    setCleaning(true);
    setCleanMessage(null);

    try {
      const res = await fetch("/api/dashboard/retention", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ days: parseInt(retentionDays, 10) }),
      });

      const data = await res.json();
      if (res.ok) {
        setCleanMessage({
          success: true,
          text: `Cleanup successful: Removed ${data.deleted?.sessions || 0} sessions, ${data.deleted?.pageViews || 0} pageviews, and ${data.deleted?.events || 0} events.`,
        });
      } else {
        setCleanMessage({ success: false, text: data.error || "Cleanup failed" });
      }
    } catch (err) {
      setCleanMessage({ success: false, text: "Network error during cleanup." });
    } finally {
      setCleaning(false);
    }
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
          System Settings & Exports
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Configure Telegram alerts, export telemetry datasets, and manage data retention policies
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CSV Data Export Hub */}
        <div className="dash-card p-6 bg-[#0e121a]/85 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-lg">
              📄
            </div>
            <div>
              <h2 className="text-base font-bold text-white">CSV Data Export Hub</h2>
              <p className="text-xs text-slate-400">Download raw telemetry datasets for offline analysis</p>
            </div>
          </div>

          <div className="space-y-2.5 pt-2">
            <a
              href="/api/dashboard/export?type=visitors"
              download
              className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all group">
              <div className="text-xs">
                <div className="font-bold text-emerald-400">Visitors Dataset (.csv)</div>
                <div className="text-[11px] text-slate-400">Profiles, device specs, geography, visit counts</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>

            <a
              href="/api/dashboard/export?type=sessions"
              download
              className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all group">
              <div className="text-xs">
                <div className="font-bold text-emerald-400">Sessions Dataset (.csv)</div>
                <div className="text-[11px] text-slate-400">Duration, active time, referrers, entry/exit pages</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>

            <a
              href="/api/dashboard/export?type=events"
              download
              className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 hover:border-emerald-500/50 text-slate-200 hover:text-white transition-all group">
              <div className="text-xs">
                <div className="font-bold text-emerald-400">Interactions & Events (.csv)</div>
                <div className="text-[11px] text-slate-400">Button clicks, CV downloads, email clicks, custom events</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-emerald-400 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </div>
            </a>
          </div>
        </div>

        {/* Telegram Instant Alerts */}
        <div className="dash-card p-6 bg-[#0e121a]/85 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold text-lg">
              ✈️
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Telegram Instant Alerts</h2>
              <p className="text-xs text-slate-400">Real-time alerts on new visitors and deep engagements</p>
            </div>
          </div>

          <div className="space-y-3 text-xs pt-2">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Alert Dispatcher:</span>
                <span className="font-semibold text-blue-400">Real-Time Ingestion Hook</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Configured Triggers:</span>
                <span className="text-slate-200">New Arrivals, Active &gt; 2m, CV Downloads</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-800/40 text-blue-200 space-y-1">
              <div className="font-semibold text-blue-300">How to configure Telegram Bot:</div>
              <ol className="list-decimal list-inside space-y-1 text-[11px] text-blue-200/80">
                <li>Create a bot on Telegram via <code className="bg-blue-900/50 px-1 py-0.5 rounded text-white">@BotFather</code> and copy token</li>
                <li>Send <code className="bg-blue-900/50 px-1 py-0.5 rounded text-white">/start</code> to your bot</li>
                <li>Add <code className="bg-blue-900/50 px-1 py-0.5 rounded text-white">TELEGRAM_BOT_TOKEN</code> and <code className="bg-blue-900/50 px-1 py-0.5 rounded text-white">TELEGRAM_CHAT_ID</code> to your <code className="bg-blue-900/50 px-1 py-0.5 rounded text-white">.env</code></li>
              </ol>
            </div>
          </div>
        </div>

        {/* Data Retention & Maintenance */}
        <div className="dash-card p-6 bg-[#0e121a]/85 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center font-bold text-lg">
              🗑️
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Data Retention Policy</h2>
              <p className="text-xs text-slate-400">Prune historic telemetry records to save storage</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <select
                value={retentionDays}
                onChange={(e) => setRetentionDays(e.target.value)}
                className="dash-input flex-1 py-2.5 px-3 text-xs">
                <option value="30">Delete data older than 30 days</option>
                <option value="60">Delete data older than 60 days</option>
                <option value="90">Delete data older than 90 days</option>
                <option value="180">Delete data older than 180 days</option>
                <option value="365">Delete data older than 1 year</option>
              </select>

              <button
                onClick={handleRetentionCleanup}
                disabled={cleaning}
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors disabled:opacity-50 cursor-pointer">
                {cleaning ? "Cleaning..." : "Run Cleanup"}
              </button>
            </div>

            {cleanMessage && (
              <div
                className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  cleanMessage.success
                    ? "bg-emerald-950/40 border border-emerald-800/40 text-emerald-300"
                    : "bg-red-950/40 border border-red-800/40 text-red-300"
                }`}>
                <span>{cleanMessage.text}</span>
              </div>
            )}
          </div>
        </div>

        {/* Security & Privacy Specs */}
        <div className="dash-card p-6 bg-[#0e121a]/85 space-y-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center font-bold text-lg">
              🛡️
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Privacy & Security Engine</h2>
              <p className="text-xs text-slate-400">Server-side protections and anonymization standards</p>
            </div>
          </div>

          <div className="space-y-2 text-xs pt-2">
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">IP Handling</span>
              <span className="text-emerald-400 font-bold">Authoritative Server-Derived</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">Authentication</span>
              <span className="text-emerald-400 font-bold">Bcrypt + HttpOnly JWT</span>
            </div>
            <div className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between">
              <span className="text-slate-400">Rate Limiting</span>
              <span className="text-emerald-400 font-bold">Sliding Window Protection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
