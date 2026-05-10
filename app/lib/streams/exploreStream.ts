import { FeedItem } from "@/app/lib/feedV2";

export function buildExploreStream(feed: FeedItem[]) {
  return feed
    .map((item, index) => {
      const noise = Math.sin(index * 999) * 3;

      return {
        ...item,
        score: item.score + noise,
      };
    })
    .sort((a, b) => b.score - a.score);
}