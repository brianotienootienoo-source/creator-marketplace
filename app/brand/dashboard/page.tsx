"use client";

import { useEffect, useState } from "react";
import { campaigns } from "@/app/data/campaigns";
import { getBrandCreatorView } from "@/app/lib/marketplace/views/brandCreatorView";
import { BrandIntelligencePanel } from "./components/BrandIntelligencePanel";

type Proposal = {
  id: string;
  creatorId: string;
  brandId: string;
  campaignId?: string;
  message: string;
  status: string;
  createdAt: string;
};

function normalize(text: string) {
  return text?.toLowerCase().trim();
}

export default function BrandDashboard() {
  const brandId = normalize("nike");

  const [proposals, setProposals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    try {
      const res = await fetch("/api/proposals", {
        cache: "no-store",
      });

      const data = await res.json();
      const all: Proposal[] = data?.proposals || [];

      const filtered = all.filter(
        (p) => normalize(p.brandId) === brandId
      );

      const enriched = filtered.map((p) => {
        const campaign =
          campaigns.find((c) => c.id === p.campaignId) ||
          campaigns.find(
            (c) =>
              normalize(c.brandId) === normalize(p.brandId)
          ) ||
          campaigns.find(
            (c) =>
              normalize(c.title) === normalize(p.campaignId || "")
          );

        const brandCreator = getBrandCreatorView(p.creatorId);

        // -----------------------------
        // SAFE INTELLIGENCE INPUT LAYER
        // (no UI interpretation here)
        // -----------------------------

        const matchScore =
          brandCreator?.brandInsights?.fitScore ?? 0;

        const trendScore =
          brandCreator?.brandInsights?.audienceMatch ?? 0;

        const rating =
          brandCreator?.quickStats?.rating ?? 0;

        return {
          ...p,

          campaignTitle:
            campaign?.title || p.campaignId || "Campaign Pending",

          campaignBudget: campaign?.budget || "TBD",

          creatorName:
            brandCreator?.profile?.displayName ||
            brandCreator?.profile?.username ||
            p.creatorId,

          // -----------------------------
          // INTELLIGENCE (RAW SIGNALS ONLY)
          // -----------------------------
          matchScore,
          trendScore,
          rating,
        };
      });

      setProposals(enriched);
    } catch (err) {
      console.error("Failed to load:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, []);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>
      <section style={{ marginBottom: 30 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          Brand Dashboard
        </h1>
        <p style={{ color: "#666", marginTop: 8 }}>
          Manage creator applications and campaign requests
        </p>
      </section>

      <section>
        <h2>Incoming Proposals</h2>

        <div style={{ marginTop: 12 }}>
          {loading ? (
            <p>Loading...</p>
          ) : proposals.length === 0 ? (
            <p style={{ color: "#888" }}>No proposals yet</p>
          ) : (
            proposals.map((p) => (
              <div
                key={p.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                  background: "#fff",
                }}
              >
                <p style={{ fontWeight: 700 }}>
                  Campaign: {p.campaignTitle}
                </p>

                <p style={{ fontSize: 12, color: "#666" }}>
                  Budget: {p.campaignBudget}
                </p>

                <hr style={{ margin: "10px 0" }} />

                <p style={{ fontWeight: 700 }}>
                  Creator: {p.creatorName}
                </p>

                {/* SAFE INTELLIGENCE PANEL */}
                <BrandIntelligencePanel
                  matchScore={p.matchScore ?? 0}
                  trendScore={p.trendScore ?? 0}
                  rating={p.rating ?? 0}
                />

                <p style={{ marginTop: 6 }}>{p.message}</p>

                <p
                  style={{
                    fontSize: 11,
                    color: "#999",
                    marginTop: 8,
                  }}
                >
                  Status: {p.status}
                </p>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}