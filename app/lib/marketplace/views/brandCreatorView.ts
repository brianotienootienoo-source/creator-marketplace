import { getCreatorProfile } from "../queries/creatorQueries";
import { buildProfileView } from "./profileViewContract";

/**
 * 🏷️ BRAND-SIDE CREATOR VIEW
 * Safe reuse layer for brands inspecting creators
 *
 * IMPORTANT:
 * - No UI logic here
 * - No duplication of profile rendering
 * - Only data shaping for dashboard consumption
 */

export function getBrandCreatorView(id: string) {
  const creator = getCreatorProfile(id);

  if (!creator) return null;

  const profile = buildProfileView(creator as any);

  const followers =
    creator.stats?.followers ??
    creator.followers ??
    0;

  const engagement =
    creator.stats?.engagementRate ??
    creator.engagementRate ??
    0;

  const rating =
    creator.ratingScore ?? 0;

  return {
    profile,

    brandInsights: {
      fitScore: creator.trustScore ?? 0,
      audienceMatch: engagement,
      opportunityModes: creator.opportunityModes ?? [],
    },

    quickStats: {
      followers,
      engagement,
      rating,
    },
  };
}