"use client";

import { useEffect, useState } from "react";
import { campaigns } from "@/app/data/campaigns";
import { creators } from "@/app/data/creators"; // 🔥 ADD THIS

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
        // -------------------------
        // CAMPAIGN ENRICHMENT
        // -------------------------
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

        // -------------------------
        // CREATOR ENRICHMENT 🔥 NEW
        // -------------------------
        const creator = creators.find(
          (c) =>
            normalize(c.slug) === normalize(p.creatorId) ||
            normalize(c.id) === normalize(p.creatorId)
        );

        return {
          ...p,
          campaignTitle: campaign?.title || p.campaignId || "Campaign Pending",
          campaignBudget: campaign?.budget || "TBD",

          // 🔥 FIXED CREATOR DISPLAY
          creatorName: creator?.name || p.creatorId,
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

                {/* 🔥 FIXED CREATOR NAME */}
                <p style={{ fontWeight: 600 }}>
                  Creator: {p.creatorName}
                </p>

                <p style={{ marginTop: 6 }}>{p.message}</p>

                <p style={{ fontSize: 11, color: "#999", marginTop: 8 }}>
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