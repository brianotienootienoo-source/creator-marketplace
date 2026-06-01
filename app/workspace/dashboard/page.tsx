"use client";

import { useRouter } from "next/navigation";
import { getProposalIntelligence } from "@/app/lib/workspace/proposals/proposalIntelligenceBridge";
import { getCreatorThreads } from "@/app/lib/messages/getThreads";

const stats = [
  { label: "Profile Views", value: "12.4K", change: "+18%" },
  { label: "Campaign Invites", value: "28", change: "+6%" },
  { label: "Engagement Rate", value: "5.8%", change: "+1.2%" },
  { label: "Saved By Brands", value: "94", change: "+12%" },
];

export default function DashboardPage() {
  const router = useRouter();

  const intelligence = getProposalIntelligence("creator-1");
  const threads = getCreatorThreads("creator-1");

  const opportunities = intelligence.recommendations;
  const activity = intelligence.recentActivity;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-black">
              Dashboard
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              Monitor your creator activity and marketplace presence.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-[#f5f7fb] px-4 py-2 text-xs text-neutral-700">
              {intelligence.summary.totalOpportunities} Total Opportunities
            </span>

            <span className="rounded-full bg-[#f5f7fb] px-4 py-2 text-xs text-neutral-700">
              {intelligence.summary.strongMatches} Strong Matches
            </span>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            <p className="text-xs text-neutral-500">{stat.label}</p>

            <div className="mt-3 flex items-end justify-between">
              <h2 className="text-2xl font-bold text-black">
                {stat.value}
              </h2>
              <span className="text-xs text-neutral-500">
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
        {/* PERFORMANCE */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Performance Snapshot
          </h3>

          <div className="mt-6 flex h-64 items-end gap-3">
            {[35, 55, 40, 75, 60, 90, 70].map((h, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-2xl bg-black/80"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[10px] text-neutral-500">
                  W{i + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* QUICK ACTIONS (NOW CLICKABLE) */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Quick Actions
          </h3>

          <div className="mt-4 space-y-3">
            <button
              onClick={() => router.push("/workspace/opportunities")}
              className="w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-left text-sm hover:bg-[#f9fafb]"
            >
              Browse Opportunities
            </button>

            <button
              onClick={() => router.push("/workspace/messages")}
              className="w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-left text-sm hover:bg-[#f9fafb]"
            >
              Open Messages
            </button>

            <button
              onClick={() => router.push("/workspace/profile")}
              className="w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-left text-sm hover:bg-[#f9fafb]"
            >
              Update Creator Profile
            </button>
          </div>
        </div>
      </div>

      {/* PROPOSAL ANALYTICS */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <h3 className="text-base font-semibold text-black">
          Proposal Overview
        </h3>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4">
            <p className="text-xs text-neutral-500">Total Opportunities</p>
            <p className="mt-2 text-xl font-semibold text-black">
              {intelligence.summary.totalOpportunities}
            </p>
          </div>

          <div className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4">
            <p className="text-xs text-neutral-500">Strong Matches</p>
            <p className="mt-2 text-xl font-semibold text-black">
              {intelligence.summary.strongMatches}
            </p>
          </div>

          <div className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4">
            <p className="text-xs text-neutral-500">Warm Matches</p>
            <p className="mt-2 text-xl font-semibold text-black">
              {intelligence.summary.warmMatches}
            </p>
          </div>
        </div>
      </div>

      {/* OPPORTUNITY INTELLIGENCE */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-black">
            Opportunity Intelligence
          </h3>

          <span className="rounded-full bg-[#f5f7fb] px-3 py-1 text-xs text-neutral-700">
            {intelligence.proposalHealth.label}
          </span>
        </div>

        <div className="mt-4 grid gap-3">
          {intelligence.topSignals.length ? (
            intelligence.topSignals.map((item) => (
              <div
                key={item.campaignId}
                className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-black">{item.title}</p>

                  <span className="text-xs text-neutral-500">
                    {item.signal.relevanceScore}%
                  </span>
                </div>

                <div className="mt-2 flex gap-4 text-xs text-neutral-500">
                  <span>
                    Conversion: {item.signal.conversionProbability}%
                  </span>
                  <span>
                    Confidence: {item.signal.confidence}%
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.signal.reasons.map((reason) => (
                    <span
                      key={reason}
                      className="rounded-full border border-[#e5e7eb] bg-white px-2 py-1 text-[11px] text-neutral-600"
                    >
                      {reason}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-sm text-neutral-500">
              No opportunities detected yet
            </div>
          )}
        </div>
      </div>

      {/* WORKSPACE PANELS */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* OPPORTUNITIES */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Active Opportunities
          </h3>

          <div className="mt-4 space-y-3">
            {opportunities.map((item) => (
              <div
                key={item.campaignId}
                className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-3"
              >
                <p className="text-sm font-medium text-black">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  Relevance {item.relevanceScore}% • Conversion{" "}
                  {item.conversionProbability}%
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MESSAGES (NOW CLICKABLE) */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Recent Messages
          </h3>

          <div className="mt-4 space-y-3">
            {threads.map((thread) => (
              <div
                key={thread.id}
                onClick={() =>
                  router.push(`/workspace/messages/${thread.id}`)
                }
                className="cursor-pointer rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-3 hover:bg-[#f5f5f5]"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-black">
                    Brand: {thread.brandId}
                  </p>

                  {thread.unreadCount > 0 && (
                    <span className="rounded-full bg-black px-2 py-0.5 text-xs text-white">
                      {thread.unreadCount}
                    </span>
                  )}
                </div>

                <p className="mt-1 text-xs text-neutral-600">
                  {thread.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h3 className="text-base font-semibold text-black">
            Recent Activity
          </h3>

          <div className="mt-4 space-y-3">
            {activity.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-3"
              >
                <p className="text-sm text-neutral-700">
                  {item.title}
                </p>

                <p className="mt-1 text-xs text-neutral-500">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}