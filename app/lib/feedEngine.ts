import { creators } from "@/app/data/creators";
import { getBrandOpportunities } from "@/app/lib/feed";
import { getCreatorScore } from "./creatorIntelligence";
import { getEngagementBoost } from "./engagementMemory";

export function getFeed(brandId?: string) {
  const brands = getBrandOpportunities();
  const targetBrand = brands.find((b) => b.id === brandId);

  return creators
    .map((creator) => {
      const baseScore = getCreatorScore({
        id: creator.id,
        name: creator.name,
        category: creator.category,
        followers: creator.followers,
        engagementRate: creator.engagementRate,
      });

      let score = baseScore;

      if (targetBrand) {
        const creatorCategory = creator.category?.toLowerCase();
        const brandNiche = targetBrand.niche?.toLowerCase();

        if (
          creatorCategory &&
          brandNiche &&
          creatorCategory === brandNiche
        ) {
          score += 15;
        }

        const engagementBoost = getEngagementBoost(
          targetBrand.id,
          creator.id
        );

        score += engagementBoost;
      }

      return {
        id: creator.id,
        name: creator.name,
        category: creator.category,
        avatar: creator.avatar,
        followers: creator.followers,
        score: Math.round(score),
        reason: "stable feed",
      };
    })
    .sort((a, b) => b.score - a.score);
}