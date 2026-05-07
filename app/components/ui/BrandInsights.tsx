"use client";

import CardShell from "@/app/components/ui/CardShell";
import { getBrandApplicationStats } from "@/app/lib/applicationsStore";
import { getBrandMetrics } from "@/app/lib/brandMetrics";
import { getBrandIntelligence } from "@/app/lib/brandIntelligence";

type Props = {
  brandId: string;
};

export default function BrandInsights({ brandId }: Props) {
  const metrics = getBrandMetrics(brandId);
  const appStats = getBrandApplicationStats(brandId);
  const intelligence = getBrandIntelligence(brandId);

  return (
    <div style={{ marginTop: 12 }}>

      {/* 📊 CORE METRICS GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        <CardShell hover={false}>
          <h4>Total Campaigns</h4>
          <p>{metrics?.totalCampaigns ?? 0}</p>
        </CardShell>

        <CardShell hover={false}>
          <h4>Active Campaigns</h4>
          <p>{metrics?.activeCampaigns ?? 0}</p>
        </CardShell>

        <CardShell hover={false}>
          <h4>Estimated Budget</h4>
          <p>${metrics?.estimatedBudget ?? 0}</p>
        </CardShell>
      </div>

      {/* 🧠 INTELLIGENCE */}
      <div style={{ marginTop: 12 }}>
        <CardShell hover={false}>
          <h4>Brand Intelligence</h4>

          <p>
            Competition:{" "}
            <strong>
              {intelligence?.competitionLevel ?? "Uncalculated"}
            </strong>
          </p>

          <p>
            Attractiveness:{" "}
            <strong>
              {intelligence?.brandAttractiveness ?? "Uncalculated"}
            </strong>
          </p>

          <p>
            Top Niche:{" "}
            <strong>
              {intelligence?.topNiche ?? "Unclassified"}
            </strong>
          </p>

          <p>
            Creator Density:{" "}
            <strong>{intelligence?.creatorDensity ?? 0}</strong>
          </p>

          <p>
            Avg Fit Score:{" "}
            <strong>{intelligence?.avgFitScore ?? 0}</strong>
          </p>

          <p style={{ marginTop: 8, fontSize: 12, color: "#666" }}>
            Saturation Index:{" "}
            {intelligence?.saturationIndex ?? 0}
          </p>
        </CardShell>
      </div>

      {/* 📡 ACTIVITY SNAPSHOT */}
      <div style={{ marginTop: 12 }}>
        <CardShell hover={false}>
          <h4>Activity Snapshot</h4>

          <p>
            {metrics?.activeCampaigns > 0
              ? `${metrics.activeCampaigns} active campaigns currently running`
              : "No active campaigns currently running"}
          </p>

          <p>
            {appStats?.pending > 0
              ? `${appStats.pending} pending creator applications`
              : "No pending applications"}
          </p>
        </CardShell>
      </div>
    </div>
  );
}