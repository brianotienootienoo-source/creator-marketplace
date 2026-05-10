import { FeedItem } from "@/app/lib/feedV2";
import { getUnifiedScore } from "./unifiedScoringEngine";
import { getMemoryPenalty, updateMemory } from "./feedMemoryStore";
import { buildMixedStream } from "./streamMixer";
import {
  getActiveStreamMode,
  getStreamWeights,
} from "./streamSwitchEngine";

export function routeFeedStreams(feed: FeedItem[]) {
  const safeFeed = Array.isArray(feed) ? feed : [];

  const mode = getActiveStreamMode({
    scrollDepth: 0.5,
    lastInteractionGap: 15,
    sessionTime: 0,
  });

  const weights = getStreamWeights();

  if (mode === "mixed") {
    const mixed = buildMixedStream(safeFeed);
    return {
      forYou: mixed,
      explore: mixed,
    };
  }

  const forYou = buildStream(safeFeed, "forYou", weights);
  const explore = buildStream(safeFeed, "explore", weights);

  return {
    forYou: forYou.length ? forYou : safeFeed,
    explore: explore.length ? explore : safeFeed,
  };
}

function buildStream(
  feed: FeedItem[],
  stream: "forYou" | "explore",
  weights: ReturnType<typeof getStreamWeights>
) {
  const filtered = feed.filter(
    (item) => getMemoryPenalty(item.id ?? "") < 0.85
  );

  const scored = filtered.map((item) => {
    updateMemory(item.id ?? "", 0.01);

    return {
      ...item,
      _score: getUnifiedScore(item, {
        stream,
        weights,
      }),
    };
  });

  return scored.sort((a, b) => (b._score ?? 0) - (a._score ?? 0));
}