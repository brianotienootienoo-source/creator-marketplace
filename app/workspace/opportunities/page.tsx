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
              <span className="text-[11px] text-neutral-600 bg-[#f5f7fb] px-3 py-1 rounded-full">
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
          <div className="space-y-5">

            {/* TOP INFO */}
            <div>
              <h2 className="text-lg font-semibold text-black">
                {selected.campaign}
              </h2>

              <p className="text-sm text-neutral-500">
                {selected.brand}
              </p>

              <p className="mt-3 text-sm text-neutral-600">
                {selected.description}
              </p>
            </div>

            {/* KEY INFO */}
            <div className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-4">
              <p className="text-sm">
                Budget:{" "}
                <span className="text-black font-medium">
                  {selected.budget}
                </span>
              </p>

              <p className="text-sm mt-2">
                Match:{" "}
                <span className="text-black font-medium">
                  {selected.match}
                </span>
              </p>
            </div>

            {/* ACTIONS */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() =>
                  router.push(`/workspace/opportunities/${selected.id}`)
                }
                className="w-full rounded-xl bg-black px-4 py-3 text-sm font-medium text-white"
              >
                Explore Opportunity
              </button>

              <button
                onClick={() => setSelected(null)}
                className="w-full rounded-xl border border-[#e5e7eb] px-4 py-3 text-sm text-black"
              >
                Close
              </button>
            </div>

          </div>
        )}
      </Drawer>
    </div>
  );
}