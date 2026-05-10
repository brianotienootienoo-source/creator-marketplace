import { FeedItem } from "@/app/lib/feedV2";
import { getMemoryPenalty } from "@/app/lib/streams/feedMemoryStore";

/* -----------------------------
   CREATOR INTELLIGENCE SCORE
   - replaces naive score system
------------------------------*/

export function scoreCreator(item: FeedItem): number {
  if (item.type !== "creator") return item.score ?? 0;

  const base = item.score ?? 0;

  /* -----------------------------
     MEMORY PENALTY (recency fatigue)
  ------------------------------*/
  const memoryPenalty = getMemoryPenalty(item.id ?? "");

  /* -----------------------------
     MOMENTUM BOOST
     (high scoring creators amplify over time)
  ------------------------------*/
  const momentum =
    (item.score ?? 0) > 70
      ? 0.15
      : (item.score ?? 0) > 40
      ? 0.08
      : 0;

  /* -----------------------------
     CATEGORY STABILITY BONUS
  ------------------------------*/
  const categoryStrength =
    item.category === "entertainment"
      ? 0.1
      : item.category === "education"
      ? 0.12
      : item.category === "lifestyle"
      ? 0.08
      : 0.05;

  /* -----------------------------
     FINAL INTELLIGENCE SCORE
  ------------------------------*/
  return (
    base +
    base * momentum +
    categoryStrength * 10 -
    memoryPenalty * 15
  );
}