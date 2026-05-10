import { FeedItem } from "@/app/lib/feedV2";
import { getMemoryPenalty } from "@/app/lib/streams/feedMemoryStore";
import { getMatchQuality } from "./matchFeedbackStore";

/* -----------------------------
   MATCH INTELLIGENCE ENGINE
   - scores creator ↔ brand compatibility
------------------------------*/

export function scoreMatch(creator: FeedItem, brand: FeedItem): number {
  if (!creator || !brand) return 0;

  /* -----------------------------
     CATEGORY ALIGNMENT
  ------------------------------*/
  const categoryMatch =
    creator.category === brand.category
      ? 0.6
      : isAdjacentCategory(creator.category, brand.category)
      ? 0.3
      : 0;

  /* -----------------------------
     BASE ENGAGEMENT SIGNAL
  ------------------------------*/
  const creatorScore = creator.score ?? 0;
  const brandScore = brand.score ?? 0;

  const baseAffinity =
    (creatorScore + brandScore) / 200; // normalize

  /* -----------------------------
     MEMORY PENALTY (avoid repeated weak matches)
  ------------------------------*/
  const memoryPenalty =
    getMemoryPenalty(`${creator.id}-${brand.id}`);

  /* -----------------------------
     FEEDBACK BOOST (NEW)
     learns from user behavior
  ------------------------------*/
  const feedbackBoost = getMatchQuality(
    `${creator.id}-${brand.id}`
  );

  /* -----------------------------
     FINAL MATCH SCORE
  ------------------------------*/
  return baseAffinity + categoryMatch + feedbackBoost - memoryPenalty;
}

/* -----------------------------
   SIMPLE CATEGORY RELATION MAP
------------------------------*/
function isAdjacentCategory(a?: string, b?: string): boolean {
  if (!a || !b) return false;

  const map: Record<string, string[]> = {
    entertainment: ["lifestyle", "music"],
    education: ["tech", "productivity"],
    lifestyle: ["fashion", "wellness"],
    tech: ["education", "gaming"],
  };

  return (map[a] ?? []).includes(b);
}