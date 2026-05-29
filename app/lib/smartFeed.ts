import { getFeedV2 } from "./feedV2";

/**
 * 🧊 LEGACY SMART FEED (REDIRECTED)
 *
 * This file is now a compatibility wrapper only.
 * All intelligence, ranking, and logic lives in feedV2.
 *
 * DO NOT add logic here.
 * DO NOT modify scoring here.
 * DO NOT extend this file.
 */

export function getSmartFeed(input?: any) {
  return getFeedV2(input);
}

export function smartFeed(input?: any) {
  return getFeedV2(input);
}

export default getSmartFeed;