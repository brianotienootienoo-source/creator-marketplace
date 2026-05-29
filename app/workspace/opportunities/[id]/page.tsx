"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { getOpportunityById } from "@/app/lib/opportunities/getOpportunityById";
import { createProposal } from "@/app/lib/workspace/proposals/proposalStore";

export default function OpportunityDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const data = getOpportunityById(id);

  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!data) {
    return (
      <div className="p-6 text-sm text-neutral-500">
        Opportunity not found.
      </div>
    );
  }

  const { opportunity, media, instructions, context } = data;

  const handleApply = () => {
    if (loading || applied) return;

    setLoading(true);
    setError(null);

    const res = createProposal({
      opportunityId: id,
      brandId: opportunity.brandId,
      creatorId: "creator-1",
      message: "Hey! I’d love to collaborate on this opportunity.",
    });

    setLoading(false);

    if (!res.ok) {
      setError(res.message || "Something went wrong");
      return;
    }

    setApplied(true);
  };

  return (
    <div className="space-y-6">

      {/* TOP SUMMARY BAR */}
      <div className="sticky top-0 z-10 rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-lg font-semibold text-black">
              {opportunity.title}
            </h1>

            <p className="text-xs text-neutral-500">
              {opportunity.brandId}
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs text-neutral-600">
            <span className="rounded-full bg-[#f5f7fb] px-3 py-1">
              {opportunity.category}
            </span>

            <span>{opportunity.budgetMin ?? opportunity.budgetMax}</span>

            <span>{opportunity.location}</span>
          </div>

          {/* APPLY BUTTON (REAL) */}
          <button
            onClick={handleApply}
            disabled={loading || applied}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
          >
            {applied
              ? "Applied"
              : loading
              ? "Applying..."
              : "Apply"}
          </button>
        </div>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* DESCRIPTION */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-sm font-semibold text-black">
          Campaign Brief
        </h2>

        <p className="mt-2 text-sm text-neutral-600">
          {opportunity.description}
        </p>

        <div className="mt-4 text-sm text-neutral-600">
          <p>Timeline: {opportunity.timeline}</p>
          <p>Deliverables: {opportunity.deliverables.join(", ")}</p>
        </div>
      </section>

      {/* MEDIA */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-sm font-semibold text-black">
          Media / Files
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-3">
          {media.map((m) => (
            <img
              key={m.id}
              src={m.url}
              className="h-28 w-full rounded-xl object-cover"
            />
          ))}
        </div>
      </section>

      {/* BRAND CONTEXT */}
      {context && (
        <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
          <h2 className="text-sm font-semibold text-black">
            Brand Context
          </h2>

          <p className="mt-2 text-sm text-neutral-600">
            {context.brandStory}
          </p>
        </section>
      )}

      {/* INSTRUCTIONS */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-white p-5">
        <h2 className="text-sm font-semibold text-black">
          Creator Guidelines
        </h2>

        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
          {instructions.map((i) => (
            <li key={i.id}>• {i.text}</li>
          ))}
        </ul>
      </section>

      {/* FINAL ACTION */}
      <section className="rounded-2xl border border-[#e5e7eb] bg-[#fafafa] p-5">
        <p className="text-sm text-neutral-600">
          Ready to apply for this opportunity?
        </p>

        <button
          onClick={handleApply}
          disabled={loading || applied}
          className="mt-4 rounded-xl bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {applied
            ? "Applied"
            : loading
            ? "Applying..."
            : "Apply for this Opportunity"}
        </button>
      </section>
    </div>
  );
}