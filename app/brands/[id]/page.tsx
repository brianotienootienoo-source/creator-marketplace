"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBrandById } from "@/app/lib/brandUtils";
import { campaigns } from "@/app/data/campaigns";
import BrandCampaignCard from "@/app/components/ui/BrandCampaignCard";
import BrandActionCardClient from "@/app/components/client/BrandActionCardClient";
import Button from "@/app/components/ui/Button";
import CreatorCard from "@/app/components/ui/CreatorCard";
import { layout, spacing, radius } from "@/app/lib/designTokens";

/* -----------------------------
   SAFE KEY
------------------------------*/
function safeKey(id: unknown, index: number) {
  if (typeof id !== "string" || !id) return `fallback-${index}`;
  return `${id}-${index}`;
}

/* -----------------------------
   TEXT FORMATTER
------------------------------*/
function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* -----------------------------
   MAIN PAGE
------------------------------*/
export default function BrandPage() {
  const params = useParams();
  const rawId = (params?.id as string | undefined)?.toLowerCase() || "";

  const brand = getBrandById(rawId);
  const [topCreators, setTopCreators] = useState<any[]>([]);

  useEffect(() => {
    async function loadFeed() {
      if (!rawId) return;

      try {
        const res = await fetch(`/api/feed?brandId=${rawId}&limit=10`);
        const json = await res.json();

        setTopCreators(json?.data || []);
      } catch (err) {
        console.error("Feed load failed:", err);
        setTopCreators([]);
      }
    }

    loadFeed();
  }, [rawId]);

  if (!brand) {
    return (
      <main style={{ padding: layout.pagePadding }}>
        <h1>Brand not found</h1>
      </main>
    );
  }

  const brandCampaigns = (campaigns || []).filter(
    (c) => c?.brandId?.toLowerCase?.() === brand.id
  );

  return (
    <main style={{ padding: layout.pagePadding }}>

      {/* HERO */}
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: spacing.lg,
          borderRadius: radius.md,
          background: "#fff",
          marginBottom: layout.cardGap,
          gap: spacing.lg,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
            {titleCase(brand.name)}
          </h1>

          <p style={{ marginTop: spacing.sm, color: "#555" }}>
            {titleCase(brand.desc)}
          </p>

          <Button style={{ marginTop: spacing.lg }}>
            Apply to Brand
          </Button>
        </div>

        <div
          style={{
            width: 180,
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
              Status
            </p>

            <span
              style={{
                display: "inline-block",
                marginTop: spacing.sm,
                padding: "4px 10px",
                borderRadius: radius.full,
                background: "#e7f9ee",
                color: "#16a34a",
                fontSize: 12,
                fontWeight: 700,
              }}
            >
              ● Active
            </span>
          </div>

          <div style={{ marginTop: spacing.lg }}>
            <p style={{ fontSize: 13, color: "#666", margin: 0 }}>
              Budget
            </p>

            <p style={{ fontSize: 13, fontWeight: 600, margin: 0 }}>
              ${(brand.demand ?? 1) * 10}+
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{ marginTop: layout.cardGap }}>
        <BrandActionCardClient brandId={rawId} />
      </div>

      {/* CREATORS */}
      <section style={{ marginTop: layout.sectionGap }}>
        <h2>Top Creator Matches</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: layout.cardGap,
            marginTop: layout.cardGap,
          }}
        >
          {topCreators
            .filter(Boolean)
            .map((item, index) => (
              <CreatorCard
                key={safeKey(item?.id, index)}
                creator={{
                  id: item?.id ?? `creator-${index}`,
                  name: item?.name ?? "Unknown Creator",
                  category: item?.category ?? "General",
                  avatar: item?.avatar,
                  trend: item?.trend,
                  trendColor: item?.trendColor,
                }}
                score={item?.score ?? 0}
              />
            ))}
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section style={{ marginTop: layout.sectionGap }}>
        <h2>Active Promotions</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: layout.cardGap,
            marginTop: layout.cardGap,
          }}
        >
          {brandCampaigns
            .filter(Boolean)
            .map((c, index) => (
              <BrandCampaignCard
                key={c?.id ?? `campaign-${index}`}
                title={c?.title ?? "Untitled Campaign"}
                niche={c?.niche ?? "General"}
                budget={c?.budget ?? "N/A"}
                image={c?.image}
              />
            ))}
        </div>
      </section>

    </main>
  );
}