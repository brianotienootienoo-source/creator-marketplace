import { FeedItem } from "@/app/lib/feedV2";
import { scoreMatch } from "./matchIntelligence";

/* -----------------------------
   GENERATE MATCH FEED ITEMS
------------------------------*/

export function generateMatches(feed: FeedItem[]) {
  const creators = feed.filter((f) => f?.type === "creator");
  const brands = feed.filter((f) => f?.type === "brand");

  const matches: FeedItem[] = [];

  for (const brand of brands) {
    let bestCreator: FeedItem | null = null;
    let bestScore = 0;

    for (const creator of creators) {
      const score = scoreMatch(creator, brand);

      if (score > bestScore) {
        bestScore = score;
        bestCreator = creator;
      }
    }

    if (bestCreator && bestScore > 0.5) {
      matches.push({
        id: `match-${brand.id}-${bestCreator.id}`,
        type: "match",
        name: `${bestCreator.name} × ${brand.name}`,
        category: brand.category,
        score: bestScore * 100,
        subtitle: "AI Match Recommendation",
      });
    }
  }

  return matches;
}