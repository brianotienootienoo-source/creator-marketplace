"use client";

import { useParams } from "next/navigation";
import { getBrandById } from "@/app/lib/brandUtils";
import { campaigns } from "@/app/data/campaigns";
import BrandCampaignCard from "@/app/components/ui/BrandCampaignCard";
import BrandActionCardClient from "@/app/components/client/BrandActionCardClient";
import AnimatedCard from "@/app/components/ui/AnimatedCard";
import CardShell from "@/app/components/ui/CardShell";
import { buildMatches } from "@/app/lib/matchEngine";
import { getCreatorMetrics } from "@/app/lib/creatorMetrics";

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function getEngagementFromIndex(index: number) {
  const demoScores = [35, 55, 72, 92];
  return demoScores[index] ?? 50;
}

function getEngagementColor(score: number) {
  if (score >= 80) return "#3b82f6";
  if (score >= 65) return "#22c55e";
  if (score >= 45) return "#d4aa00";
  return "#8B5A2B";
}

function renderStars(score: number, color: string) {
  const full = Math.round(score / 20);

  return (
    <span style={{ letterSpacing: 1 }}>
      {"★★★★★".split("").map((_, i) => (
        <span key={i} style={{ color: i < full ? color : "#ddd" }}>
          ★
        </span>
      ))}
    </span>
  );
}

/* ================= UNIFIED SPACING CONTRACT ================= */
const SPACING = {
  sectionGap: 24,
  cardGap: 16,
  buttonHeight: 44,
  buttonMinWidth: 140,
  radius: 14,
};

export default function BrandPage() {
  const params = useParams();
  const rawId = (params?.id as string | undefined)?.toLowerCase() || "";

  const brand = getBrandById(rawId);

  if (!rawId || !brand) {
    return (
      <main style={{ padding: 32, fontFamily: "sans-serif" }}>
        <h1>Brand not found</h1>
      </main>
    );
  }

  const brandCampaigns = campaigns.filter(
    (c) => c.brandId?.toLowerCase() === brand.id
  );

  const brandName = titleCase(brand.name);
  const topCreators = buildMatches(rawId)?.slice(0, 4) || [];

  return (
    <main style={{ padding: 32, fontFamily: "sans-serif" }}>

      {/* ================= BRAND HERO ================= */}
      <AnimatedCard>
        <section
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: 20,
            border: "1px solid #eee",
            borderRadius: SPACING.radius,
            background: "#fff",
            marginBottom: SPACING.cardGap,
            gap: 24,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <h1 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
              {brandName}
            </h1>

            <p style={{ color: "#555", marginTop: 6 }}>
              {titleCase(brand.desc)}
            </p>

            <div style={{ display: "flex", gap: 24, marginTop: 14 }}>
              <div>
                <p style={{ fontSize: 12, color: "#999" }}>ID</p>
                <p style={{ fontWeight: 600 }}>{brand.id}</p>
              </div>

              <div>
                <p style={{ fontSize: 12, color: "#999" }}>Demand</p>
                <p style={{ fontWeight: 600 }}>{brand.demand}</p>
              </div>
            </div>

            <button
              style={{
                marginTop: 16,
                height: SPACING.buttonHeight,
                minWidth: SPACING.buttonMinWidth,
                padding: "0 14px",
                borderRadius: 10,
                border: "none",
                background: "#000",
                color: "#fff",
                fontWeight: 600,
                fontSize: 14,
                lineHeight: 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              Apply to Brand
            </button>
          </div>

          <div style={{ width: 160, textAlign: "right" }}>
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

            <div style={{ marginTop: 14 }}>
              <p style={{ fontSize: 12, color: "#999" }}>Budget</p>
              <p style={{ fontWeight: 700 }}>
                ${brand.demand * 10}+
              </p>
            </div>
          </div>
        </section>
      </AnimatedCard>

      {/* ================= KEY STATS ================= */}
      <div style={{ marginTop: SPACING.cardGap }}>
        <BrandActionCardClient brandId={rawId} />
      </div>

      {/* ================= CREATOR MATCHES ================= */}
      <section style={{ marginTop: SPACING.sectionGap }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          Top Creator Matches
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(220px, 1fr))",
            gap: SPACING.cardGap,
            marginTop: SPACING.cardGap,
          }}
        >
          {topCreators.map((item, index) => {
            const metrics = getCreatorMetrics(item.creator.id);
            const score = getEngagementFromIndex(index);
            const color = getEngagementColor(score);

            return (
              <AnimatedCard key={`${item.creator.id}-${index}`}>
                <CardShell>
                  <h4 style={{ margin: 0 }}>{item.creator.name}</h4>

                  <p style={{ fontSize: 12, color: "#666" }}>
                    {item.creator.category}
                  </p>

                  <p style={{ marginTop: 6, fontWeight: 700 }}>
                    Rating:&nbsp;
                    {renderStars(score, color)}
                  </p>

                  <p style={{ fontSize: 12, color: "#666" }}>
                    {score >= 80
                      ? "Viral Engagement"
                      : score >= 65
                      ? "High Engagement"
                      : score >= 45
                      ? "Moderate Engagement"
                      : "Low Engagement"}
                  </p>

                  <p style={{ fontSize: 11, color: "#777" }}>
                    {score >= 80
                      ? "Viral responsiveness to branded content"
                      : score >= 65
                      ? "Strong engagement with consistent interaction"
                      : score >= 45
                      ? "Moderate engagement with occasional interaction"
                      : "Low engagement with limited brand response"}
                  </p>
                </CardShell>
              </AnimatedCard>
            );
          })}
        </div>
      </section>

      {/* ================= CAMPAIGNS ================= */}
      <section style={{ marginTop: SPACING.sectionGap }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>
          Active Promotions
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(220px, 1fr))",
            gap: SPACING.cardGap,
            marginTop: SPACING.cardGap,
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
      </section>
    </main>
  );
}