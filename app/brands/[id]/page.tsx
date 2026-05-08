"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBrandById } from "@/app/lib/brandUtils";
import { campaigns } from "@/app/data/campaigns";
import BrandCampaignCard from "@/app/components/ui/BrandCampaignCard";
import BrandActionCardClient from "@/app/components/client/BrandActionCardClient";
import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";
import Button from "@/app/components/ui/Button";
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
   ⭐ SAFE STAR SYSTEM (FINAL FIX)
   - prevents undefined / NaN → 0 issues
   - guarantees no empty stars
   - stable scaling across all creators
------------------------------*/
function getStarsFromScore(score: any) {
  const s = Number(score);

  // HARD SAFETY: never allow invalid values
  const safe = Number.isFinite(s) ? s : 0;

  const normalized = Math.max(0, Math.min(100, safe));

  const raw = (normalized / 100) * 5;

  const full = Math.floor(raw);
  const hasHalf = raw - full >= 0.5;

  const color =
    normalized >= 80 ? "#3b82f6" : // Blue (Viral)
    normalized >= 60 ? "#16a34a" : // Green (High)
    normalized >= 30 ? "#f59e0b" : // Yellow (Medium)
    "#7c4a1e";                     // Dark Brown (Low)

  return (
    <span style={{ display: "inline-flex", gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => {
        let opacity = 0.25;

        if (i < full) opacity = 1;
        else if (i === full && hasHalf) opacity = 0.6;

        return (
          <span
            key={i}
            style={{
              fontSize: 14,
              color,
              opacity,
              transition: "all 0.2s ease",
            }}
          >
            ★
          </span>
        );
      })}
    </span>
  );
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

  const brandCampaigns = campaigns.filter(
    (c) => c.brandId?.toLowerCase() === brand.id
  );

  return (
    <main style={{ padding: layout.pagePadding }}>

      {/* HERO */}
      <AnimatedCard>
        <section style={{
          display: "flex",
          justifyContent: "space-between",
          padding: spacing.lg,
          borderRadius: radius.md,
          background: "#fff",
          marginBottom: layout.cardGap,
          gap: spacing.lg,
          boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        }}>
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

          <div style={{
            width: 180,
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: 12, color: "#999", margin: 0 }}>
                Status
              </p>

              <span style={{
                display: "inline-block",
                marginTop: spacing.sm,
                padding: "4px 10px",
                borderRadius: radius.full,
                background: "#e7f9ee",
                color: "#16a34a",
                fontSize: 12,
                fontWeight: 700,
              }}>
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
      </AnimatedCard>

      {/* STATS */}
      <div style={{ marginTop: layout.cardGap }}>
        <BrandActionCardClient brandId={rawId} />
      </div>

      {/* CREATORS */}
      <section style={{ marginTop: layout.sectionGap }}>
        <h2>Top Creator Matches</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: layout.cardGap,
          marginTop: layout.cardGap,
        }}>
          {topCreators.map((item, index) => {
            const creator = item?.creator;
            if (!creator) return null;

            return (
              <AnimatedCard key={safeKey(creator.id, index)}>
                <CardShell>
                  <h4 style={{ margin: 0 }}>{creator.name}</h4>

                  <p style={{ fontSize: 12, color: "#666" }}>
                    {creator.category}
                  </p>

                  <p style={{ marginTop: spacing.sm }}>
                    {getStarsFromScore(item?.score)}
                  </p>
                </CardShell>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      {/* CAMPAIGNS */}
      <section style={{ marginTop: layout.sectionGap }}>
        <h2>Active Promotions</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: layout.cardGap,
          marginTop: layout.cardGap,
        }}>
          {brandCampaigns.map((c) => (
            <BrandCampaignCard
              key={c.id}
              title={c.title}
              niche={c.niche}
              budget={c.budget}
            />
          ))}
        </div>
      </section>

    </main>
  );
}