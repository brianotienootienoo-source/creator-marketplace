import { FeedItem } from "@/app/lib/feedV2";
import { scoreStreamItem } from "./streamIntelligence";

/* -----------------------------
   MIXED STREAM MODE
   - blends both streams safely
------------------------------*/

export function buildMixedStream(feed: FeedItem[]) {
  const safe = Array.isArray(feed) ? feed : [];

  const ranked = [...safe].sort((a, b) => {
    return (
      scoreStreamItem(b, "forYou") +
      scoreStreamItem(b, "explore") -
      (scoreStreamItem(a, "forYou") + scoreStreamItem(a, "explore"))
    );
  });

  return ranked;
}