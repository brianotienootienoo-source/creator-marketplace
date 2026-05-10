import { FeedItem } from "@/app/lib/feedV2";
import { getCreatorAffinity } from "@/app/lib/creatorAffinity";
import { getResurfacingBoost } from "@/app/lib/resurfacingEngine";

export function buildForYouStream(feed: FeedItem[]) {
  return feed
    .map((item) => {
      if (item.type !== "creator") return item;

      const affinity = getCreatorAffinity(item.id);
      const resurfacing = getResurfacingBoost(item.id);

      return {
        ...item,
        score: item.score + affinity * 2 + resurfacing * 1.5,
      };
    })
    .sort((a, b) => b.score - a.score);
}