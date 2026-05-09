import { getFeedSeed } from "@/app/lib/feedSeed";

/**
 * Returns a small deterministic score variation
 * Range: -2 to +2
 */
export function getFeedJitter(itemId: string, sessionId?: string) {
  const seed = getFeedSeed(sessionId + itemId);

  // convert seed into small bounded number
  const normalized = (seed % 5) - 2; // -2, -1, 0, +1, +2

  return normalized;
}