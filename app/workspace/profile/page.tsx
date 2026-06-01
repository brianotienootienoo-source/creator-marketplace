"use client";

import { creators } from "@/app/data/creators";
import { useRouter } from "next/navigation";

export default function CreatorProfilePage() {
  const router = useRouter();

  // TEMP: default creator (later this becomes dynamic via auth/session)
  const creator = creators[0];

  if (!creator) {
    return (
      <div className="p-6 text-sm text-neutral-500">
        No creator profile found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

      {/* HEADER */}
      <div className="rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">
              Creator Profile
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Identity + marketplace presence layer
            </p>
          </div>

          <button
            onClick={() => router.push("/workspace/dashboard")}
            className="rounded-xl border px-4 py-2 text-sm"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      {/* PROFILE CARD */}
      <div className="grid gap-6 lg:grid-cols-3">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <img
            src={creator.avatar}
            className="h-20 w-20 rounded-full object-cover"
          />

          <h2 className="mt-4 text-xl font-semibold">
            {creator.name}
          </h2>

          <p className="text-sm text-neutral-500">
            @{creator.slug}
          </p>

          <div className="mt-4 text-sm text-neutral-600">
            Category: {creator.category}
          </div>
        </div>

        {/* METRICS */}
        <div className="lg:col-span-2 rounded-2xl border bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-black">
            Creator Intelligence Snapshot
          </h3>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-[#fafafa] p-4 border">
              <p className="text-xs text-neutral-500">Followers</p>
              <p className="text-lg font-semibold">
                {creator.followers.toLocaleString()}
              </p>
            </div>

            <div className="rounded-xl bg-[#fafafa] p-4 border">
              <p className="text-xs text-neutral-500">
                Engagement Rate
              </p>
              <p className="text-lg font-semibold">
                {(creator.engagementRate * 100).toFixed(2)}%
              </p>
            </div>

            <div className="rounded-xl bg-[#fafafa] p-4 border">
              <p className="text-xs text-neutral-500">
                Brand Trust Score
              </p>
              <p className="text-lg font-semibold">
                {creator.pastBrandScore}
              </p>
            </div>

            <div className="rounded-xl bg-[#fafafa] p-4 border">
              <p className="text-xs text-neutral-500">
                Profile Status
              </p>
              <p className="text-lg font-semibold text-green-600">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* FUTURE EXTENSION AREA */}
      <div className="rounded-2xl border bg-white p-6 shadow-sm">
        <h3 className="font-semibold text-black">
          Marketplace Identity Layer
        </h3>

        <p className="mt-2 text-sm text-neutral-500">
          This section will later connect:
          proposals, campaigns, ranking signals, and brand visibility score.
        </p>

        <div className="mt-4 text-xs text-neutral-400">
          Placeholder for Phase 2–4 expansion
        </div>
      </div>
    </div>
  );
}