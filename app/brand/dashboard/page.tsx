"use client";

import { useEffect, useState } from "react";

type Proposal = {
  id: string;
  creatorId: string;
  brandId: string;
  message: string;
  status: string;
  createdAt: string;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

export default function BrandDashboard() {
  const brandId = normalize("Nike");

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProposals = async () => {
    try {
      const res = await fetch("/api/proposals", {
        cache: "no-store",
      });

      if (!res.ok) {
        console.error("❌ API ERROR:", res.status);
        return;
      }

      const data = await res.json();
      const all = data?.proposals || [];

      const filtered = all.filter((p: Proposal) => {
        return normalize(p.brandId) === brandId;
      });

      setProposals(filtered);
    } catch (err) {
      console.error("❌ Failed to load:", err);
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
                <p style={{ fontWeight: 600 }}>
                  Creator: {p.creatorId}
                </p>

                <p style={{ marginTop: 6 }}>
                  {p.message}
                </p>

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