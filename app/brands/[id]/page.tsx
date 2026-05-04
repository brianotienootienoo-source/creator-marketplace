"use client";

import { useParams } from "next/navigation";
import { getBrandOpportunities } from "@/app/lib/feed";
import { campaigns } from "@/app/data/campaigns";
import BrandCampaignCard from "@/app/components/ui/BrandCampaignCard";

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function BrandPage() {
  const params = useParams();

  const rawId = (params?.id as string | undefined)?.toLowerCase() || "";

  const brands = getBrandOpportunities();
  const brand = brands.find((b) => b.id === rawId);

  if (!rawId || !brand) {
    return (
      <main style={{ padding: 40, fontFamily: "sans-serif" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>
          Brand not found
        </h1>

        <p style={{ marginTop: 10, color: "#666" }}>
          This brand profile does not exist or has no active signals yet.
        </p>

        <p style={{ marginTop: 6, fontSize: 12, color: "#999" }}>
          Requested ID: {rawId}
        </p>
      </main>
    );
  }

  const brandCampaigns = campaigns.filter(
    (c) => c.brandId?.toLowerCase() === brand.id
  );

  const brandName = titleCase(brand.name);

  return (
    <main style={{ padding: 40, fontFamily: "sans-serif" }}>

      {/* HERO CARD */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 20,
          border: "1px solid #eee",
          borderRadius: 16,
          maxWidth: 800,
          background: "#fff",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
            {brandName}
          </h1>

          {/* FIXED: title-cased description */}
          <p style={{ marginTop: 6, color: "#555" }}>
            {titleCase(brand.desc)}
          </p>

          <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
            <div>
              <p style={{ fontSize: 12, color: "#999" }}>ID</p>
              <p style={{ fontWeight: 600 }}>
                {brandName}
              </p>
            </div>

            <div>
              <p style={{ fontSize: 12, color: "#999" }}>Demand</p>
              <p style={{ fontWeight: 600 }}>{brand.demand}</p>
            </div>
          </div>

          <button
            style={{
              marginTop: 16,
              padding: "10px 14px",
              borderRadius: 10,
              border: "none",
              background: "#000",
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Apply to Brand
          </button>
        </div>

        {/* RIGHT PANEL */}
        <div
          style={{
            width: 160,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            textAlign: "right",
          }}
        >
          {/* STATUS BADGE */}
          <div>
            <p style={{ fontSize: 12, color: "#999" }}>Status</p>

            <span
              style={{
                display: "inline-block",
                marginTop: 4,
                padding: "4px 10px",
                borderRadius: 999,
                background: "#e7f9ee",
                color: "#16a34a",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ● Active
            </span>
          </div>

          {/* BUDGET */}
          <div>
            <p style={{ fontSize: 12, color: "#999" }}>Budget</p>
            <p style={{ fontWeight: 700 }}>
              ${brand.demand * 10}+
            </p>
          </div>
        </div>
      </section>

      {/* ACTIVE PROMOTIONS GRID */}
      <section style={{ marginTop: 30 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          Active Promotions
        </h2>

        {brandCampaigns.length === 0 ? (
          <p style={{ marginTop: 10, color: "#777" }}>
            No active campaigns for this brand yet.
          </p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 12,
              marginTop: 12,
            }}
          >
            {brandCampaigns.map((c) => (
              <BrandCampaignCard
                key={c.id}
                title={c.title}
                niche={c.niche}
                budget={c.budget}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}