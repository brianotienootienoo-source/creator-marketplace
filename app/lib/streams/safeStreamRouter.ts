import { FeedItem } from "@/app/lib/feedV2";
import { routeFeedStreams } from "./streamRouter";

/**
 * SAFE STREAM LAYER
 * - NEVER throws
 * - ALWAYS returns usable fallback
 */
export function safeRouteFeedStreams(feed: FeedItem[]) {
  try {
    if (!Array.isArray(feed)) {
      return fallbackStreams([]);
    }

    const streams = routeFeedStreams(feed);

    return {
      forYou: Array.isArray(streams?.forYou) ? streams.forYou : [],
      explore: Array.isArray(streams?.explore) ? streams.explore : [],
    };
  } catch (err) {
    console.warn("Stream router failed, using fallback:", err);
    return fallbackStreams(feed);
  }
}

/**
 * Fallback = system never dies
 */
function fallbackStreams(feed: FeedItem[]) {
  const creators = feed.filter((f) => f?.type === "creator");
  const brands = feed.filter((f) => f?.type === "brand");

  return {
    forYou: [...creators, ...brands],
    explore: [...brands, ...creators],
  };
}