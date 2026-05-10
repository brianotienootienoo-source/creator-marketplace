import { FeedItem } from "@/app/lib/feedV2";
import { getStreamWeights } from "./getStreamWeights";

/**
 * STREAM BLENDER (PHASE 5.5 CORE)
 * - merges ForYou + Explore
 * - dynamically weighted
 */
export function blendStreams(streams: {
  forYou: FeedItem[];
  explore: FeedItem[];
}) {
  const weights = getStreamWeights();

  const forYou = streams.forYou || [];
  const explore = streams.explore || [];

  const blended: FeedItem[] = [];

  const forYouCount = Math.floor(forYou.length * weights.forYou);
  const exploreCount = Math.floor(explore.length * weights.explore);

  // 🎯 Interleave instead of hard split
  let i = 0;

  while (blended.length < forYouCount + exploreCount) {
    if (forYou[i]) blended.push(forYou[i]);
    if (explore[i]) blended.push(explore[i]);
    i++;
  }

  // 🧠 fallback safety
  return blended.length ? blended : [...forYou, ...explore];
}