import { Creator } from "../entities/creators";

/**
 * Converts legacy creator format (app/data/creators.ts)
 * into new marketplace Creator entity format.
 */
export function adaptLegacyCreator(legacy: any): Creator {
  return {
    id: legacy.id,
    slug: legacy.slug,

    displayName: legacy.name,
    username: legacy.slug,

    bio: legacy.bio ?? "",

    niche: legacy.category ?? "General",
    tags: legacy.tags ?? [],

    creatorTypes: inferCreatorTypes(legacy.category),
    opportunityModes: inferOpportunityModes(legacy.category),

    platforms: [],

    verified: false,

    avatar: legacy.avatar,
    bannerImage: legacy.avatar,

    stats: {
      followers: legacy.followers ?? 0,
      engagementRate: legacy.engagementRate ?? 0,
      averageViews: 0,
      averageLikes: 0,
    },

    platformFollowers: undefined,

    ratingScore: legacy.pastBrandScore ?? 0,

    audience: {
      primaryAgeRange: "18-34",
      topLocations: [],
      interests: [],
    },

    portfolio: [],

    booking: undefined,

    matchScore: undefined,
    trendScore: undefined,

    createdAt: new Date().toISOString(),
  };
}

/**
 * Bulk adapter for legacy arrays
 */
export function adaptLegacyCreators(list: any[]): Creator[] {
  return list.map(adaptLegacyCreator);
}

/**
 * Simple heuristics (temporary until real onboarding exists)
 */
function inferCreatorTypes(category: string): Creator["creatorTypes"] {
  switch ((category ?? "").toLowerCase()) {
    case "music":
      return ["musician"];
    case "comedy":
      return ["comedian"];
    case "influencer":
      return ["influencer"];
    default:
      return ["influencer"];
  }
}

function inferOpportunityModes(category: string): Creator["opportunityModes"] {
  switch ((category ?? "").toLowerCase()) {
    case "music":
      return ["live_performance", "bookings"];
    case "comedy":
      return ["live_performance", "bookings"];
    default:
      return ["brand_deals"];
  }
}