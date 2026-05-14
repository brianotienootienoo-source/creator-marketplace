import { Creator } from "../entities/creator";
import { campaigns } from "@/app/data/campaigns";

/**
 * 🎯 CAMPAIGN MATCH SUGGESTION ENGINE
 * Links creators to relevant campaigns based on:
 * - niche
 * - audience fit
 * - opportunity mode alignment
 */

type CampaignMatch = {
  id: string;
  title: string;
  brandId: string;
  budget?: string;
  score: number;
  reason: string;
};

export function getCampaignMatches(creator: Creator): CampaignMatch[] {
  const creatorNiche = creator.niche?.toLowerCase?.() ?? "";

  return campaigns
    .map((c) => {
      let score = 0;
      let reason = [];

      const campaignTitle = c.title?.toLowerCase?.() ?? "";
      const campaignBrand = c.brandId?.toLowerCase?.() ?? "";
      const campaignDesc = (c.description ?? "").toLowerCase?.();

      // -------------------------
      // NICHE MATCH
      // -------------------------
      if (campaignTitle.includes(creatorNiche)) {
        score += 30;
        reason.push("niche match");
      }

      if (campaignDesc.includes(creatorNiche)) {
        score += 20;
        reason.push("audience alignment");
      }

      // -------------------------
      // OPPORTUNITY MODE MATCH
      // -------------------------
      if (creator.opportunityModes?.includes("brand_deals")) {
        score += 10;
        reason.push("brand deal compatibility");
      }

      if (creator.opportunityModes?.includes("live_performance")) {
        if (campaignTitle.includes("event") || campaignTitle.includes("live")) {
          score += 25;
          reason.push("live performance fit");
        }
      }

      // -------------------------
      // DEFAULT BOOST (SAFETY)
      // -------------------------
      score += Math.min(10, (creator.ratingScore ?? 0) / 10);

      return {
        id: c.id,
        title: c.title,
        brandId: c.brandId,
        budget: c.budget,
        score,
        reason: reason.join(", "),
      };
    })
    .filter((c) => c.score > 20)
    .sort((a, b) => b.score - a.score);
}