import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { getCreatorScore } from "./creatorIntelligence";
import { getEngagementBoost } from "./engagementMemory";

/**
 * 🧊 LEGACY FEED ENGINE (FROZEN)
 *
 * IMPORTANT ARCHITECTURE RULE:
 * --------------------------------
 * This module is now frozen.
 *
 * - DO NOT extend scoring logic here
 * - DO NOT add new ranking rules here
 * - DO NOT evolve business logic here
 *
 * ALL FUTURE DEVELOPMENT GOES TO:
 *   feedV2.ts
 *
 * This file exists only for:
 * - backward compatibility
 * - orchestrator fallback mode
 * - gradual migration safety
 */

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

/**
 * 🧊 LEGACY ENTRY POINT (FROZEN LOGIC)
 * ------------------------------------
 * Kept for compatibility only.
 * Future systems should NOT call this directly.
 */
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
      reason: "legacy feedEngine (frozen)",
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

/**
 * 🧊 LEGACY ALIAS (DO NOT USE FOR NEW DEVELOPMENT)
 */
export function feedEngine(brandId?: string): FeedItem[] {
  return getFeed(brandId);
}