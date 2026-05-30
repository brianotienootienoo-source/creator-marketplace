"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Drawer from "@/app/components/ui/Drawer";

const opportunities = [
  {
    id: "nova-studios",
    brand: "Nova Studios",
    campaign: "Summer Lifestyle Campaign",
    budget: "$2,400",
    match: "High Match",
    description:
      "Lifestyle-focused summer campaign for creators in fashion and outdoor niches.",
  },
  {
    id: "pulse-energy",
    brand: "Pulse Energy",
    campaign: "Fitness Creator Partnership",
    budget: "$1,800",
    match: "Recommended",
    description:
      "Fitness product launch targeting active lifestyle creators.",
  },
  {
    id: "aether-fashion",
    brand: "Aether Fashion",
    campaign: "Streetwear Creator Feature",
    budget: "$3,100",
    match: "Trending",
    description:
      "Streetwear campaign for emerging fashion creators.",
  },
];

export default function OpportunitiesPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold text-black">
          Opportunities
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Discover brand campaigns and collaboration offers.
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {opportunities.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelected(item)}
            className="
              cursor-pointer rounded-2xl border border-[#e5e7eb]
              bg-white p-5 transition hover:shadow-sm
            "
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-[#f5f7fb] px-3 py-1 text-[11px] text-neutral-600">
                {item.match}
              </span>

              <span className="text-xs text-neutral-500">
                {item.brand}
              </span>
            </div>

            <h2 className="mt-2 text-base font-semibold text-black">
              {item.campaign}
            </h2>

            <p className="mt-1 text-sm text-neutral-500">
              {item.budget}
            </p>
          </div>
        ))}
      </div>

      {/* DRAWER */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <div className="space-y-6">
            {/* HERO */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-black px-3 py-1 text-[11px] font-medium text-white">
                  {selected.match}
                </span>

                <span className="rounded-full border border-[#e5e7eb] px-3 py-1 text-[11px] text-neutral-600">
                  Open Campaign
                </span>
              </div>

              <h2 className="mt-4 text-xl font-semibold text-black">
                {selected.campaign}
              </h2>

              <p className="mt-1 text-sm text-neutral-500">
                {selected.brand}
              </p>

              <p className="mt-4 text-sm leading-6 text-neutral-600">
                {selected.description}
              </p>
            </div>

            {/* CAMPAIGN SNAPSHOT */}
            <section className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <h3 className="text-sm font-semibold text-black">
                Campaign Snapshot
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                    Budget
                  </p>

                  <p className="mt-1 text-sm font-medium text-black">
                    {selected.budget}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                    Campaign Type
                  </p>

                  <p className="mt-1 text-sm font-medium text-black">
                    Sponsored Content
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                    Timeline
                  </p>

                  <p className="mt-1 text-sm font-medium text-black">
                    4 Weeks
                  </p>
                </div>

                <div>
                  <p className="text-[11px] uppercase tracking-wide text-neutral-400">
                    Location
                  </p>

                  <p className="mt-1 text-sm font-medium text-black">
                    Remote
                  </p>
                </div>
              </div>
            </section>

            {/* DELIVERABLES */}
            <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
              <h3 className="text-sm font-semibold text-black">
                Deliverables
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs">
                  Instagram Reel
                </span>

                <span className="rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs">
                  TikTok Video
                </span>

                <span className="rounded-full border border-[#e5e7eb] bg-white px-3 py-2 text-xs">
                  Story Set
                </span>
              </div>
            </section>

            {/* CREATOR FIT */}
            <section className="rounded-2xl border border-[#e5e7eb] bg-white p-4">
              <h3 className="text-sm font-semibold text-black">
                Why This Opportunity Fits You
              </h3>

              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li>• Strong alignment with your creator category.</li>
                <li>• Brand audience overlaps with your niche.</li>
                <li>• Campaign requirements match your content style.</li>
              </ul>
            </section>

            {/* ACTION AREA */}
            <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
              <p className="text-sm text-neutral-600">
                Review the full campaign details, requirements,
                media assets, and application instructions.
              </p>

              <div className="mt-4 space-y-3">
                <button
                  onClick={() =>
                    router.push(
                      `/workspace/opportunities/${selected.id}`
                    )
                  }
                  className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
                >
                  Explore Opportunity
                </button>

                <button
                  onClick={() => setSelected(null)}
                  className="w-full rounded-xl border border-[#e5e7eb] bg-white px-4 py-3 text-sm text-black"
                >
                  Close
                </button>
              </div>
            </section>
          </div>
        )}
      </Drawer>
    </div>
  );
}