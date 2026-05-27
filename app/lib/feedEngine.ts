import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { getCreatorScore } from "./creatorIntelligence";
import { getEngagementBoost } from "./engagementMemory";

type FeedItem =
  | {
      type: "creator";
      id: string;
      name: string;
      category: string;
      avatar: string;
      followers: number;
      score: number;
      reason: string;
    }
  | {
      type: "brand";
      id: string;
      name: string;
      subtitle: string;
      score: number;
    };

export function getFeed(brandId?: string): FeedItem[] {
  const brands = getBrandUniverse();
  const targetBrand = brands.find((b) => b.id === brandId);

  const creators = getCreatorUniverse();

  const creatorFeed: FeedItem[] = creators.map((creator) => {
    const baseScore = getCreatorScore({
      id: creator.id,
      name: creator.name,
      category: creator.category,
      followers: creator.followers,
      engagementRate: creator.engagementRate,
    });

    let score = baseScore;

    if (targetBrand) {
      const creatorNiche = creator.category?.toLowerCase();
      const brandNiche = targetBrand.niche?.toLowerCase();

      if (creatorNiche && brandNiche && creatorNiche === brandNiche) {
        score += 15;
      }

      const engagementBoost = getEngagementBoost(
        targetBrand.id,
        creator.id
      );

      score += engagementBoost;
    }

    return {
      type: "creator",
      id: creator.id,
      name: creator.name,
      category: creator.category,
      avatar: creator.avatar,
      followers: creator.followers,
      score: Math.round(score),
      reason: "stable feed",
    };
  });

  const brandFeed: FeedItem[] = brands.map((brand) => ({
    type: "brand",
    id: brand.id,
    name: brand.name,
    subtitle: brand.description ?? "Brand opportunity",
    score: Math.round((brand.demandScore ?? 1) * 10),
  }));

  return [...creatorFeed, ...brandFeed].sort((a, b) => b.score - a.score);
}