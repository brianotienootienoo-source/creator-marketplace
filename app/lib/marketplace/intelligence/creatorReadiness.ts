import { Creator } from "../entities/creator";

/**
 * 🧠 CREATOR OPPORTUNITY READINESS ENGINE
 * Converts existing universe signals into actionable tiers
 */

export type ReadinessTier =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "PREMIUM";

export function getCreatorReadiness(creator: Creator) {
  const followers = creator.stats?.followers ?? 0;
  const engagement = creator.stats?.engagementRate ?? 0;
  const rating = creator.ratingScore ?? 0;

  // -------------------------
  // BASIC SCORING MODEL
  // -------------------------
  let score = 0;

  // reach weight
  if (followers > 100000) score += 30;
  else if (followers > 50000) score += 20;
  else if (followers > 10000) score += 10;
  else score += 5;

  // engagement weight
  if (engagement > 5) score += 30;
  else if (engagement > 2) score += 20;
  else score += 10;

  // trust/rating weight
  if (rating > 80) score += 30;
  else if (rating > 50) score += 20;
  else score += 10;

  // -------------------------
  // TIER MAPPING
  // -------------------------
  let tier: ReadinessTier = "LOW";

  if (score >= 75) tier = "PREMIUM";
  else if (score >= 55) tier = "HIGH";
  else if (score >= 35) tier = "MEDIUM";

  // -------------------------
  // OPPORTUNITY SUGGESTION
  // -------------------------
  const bestFit =
    creator.opportunityModes?.length > 0
      ? creator.opportunityModes[0]
      : "brand_deals";

  return {
    score,
    tier,
    bestFit,
  };
}