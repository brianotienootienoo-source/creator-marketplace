"use client";

import CardShell from "@/app/components/ui/CardShell";
import { workspaceTypography as t } from "@/app/lib/design/workspaceTypography";
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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        <CardShell hover={false}>
          <h4 className={t.sectionTitle}>Total Campaigns</h4>
          <p className={t.body}>{metrics?.totalCampaigns ?? 0}</p>
        </CardShell>

        <CardShell hover={false}>
          <h4 className={t.sectionTitle}>Active Campaigns</h4>
          <p className={t.body}>{metrics?.activeCampaigns ?? 0}</p>
        </CardShell>

        <CardShell hover={false}>
          <h4 className={t.sectionTitle}>Estimated Budget</h4>
          <p className={t.body}>${metrics?.estimatedBudget ?? 0}</p>
        </CardShell>
      </div>

      <div style={{ marginTop: 12 }}>
        <CardShell hover={false}>
          <h4 className={t.sectionTitle}>Brand Intelligence</h4>

          <p className={t.body}>
            Competition: <strong>{intelligence?.competitionLevel}</strong>
          </p>

          <p className={t.body}>
            Attractiveness: <strong>{intelligence?.brandAttractiveness}</strong>
          </p>

          <p className={t.body}>
            Top Niche: <strong>{intelligence?.topNiche}</strong>
          </p>

          <p className={t.body}>
            Creator Density: <strong>{intelligence?.creatorDensity}</strong>
          </p>

          <p className={t.body}>
            Avg Fit Score: <strong>{intelligence?.avgFitScore}</strong>
          </p>

          <p className={t.meta}>
            Saturation Index: {intelligence?.saturationIndex}
          </p>
        </CardShell>
      </div>

      <div style={{ marginTop: 12 }}>
        <CardShell hover={false}>
          <h4 className={t.sectionTitle}>Activity Snapshot</h4>

          <p className={t.body}>
            {metrics?.activeCampaigns > 0
              ? `${metrics.activeCampaigns} active campaigns currently running`
              : "No active campaigns currently running"}
          </p>

          <p className={t.body}>
            {appStats?.pending > 0
              ? `${appStats.pending} pending creator applications`
              : "No pending applications"}
          </p>
        </CardShell>
      </div>
    </div>
  );
}