import { creators as legacyCreators } from "@/app/data/creators";
import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";

import {
  getTrendingCategories,
  getBrandOpportunities,
} from "@/app/lib/feed";

export function buildGroupedFeed() {
  const creators = adaptLegacyCreators(legacyCreators);

  const topCreators = creators
    .map((c) => ({
      id: c.id,
      displayName: c.displayName,
      username: c.username,
      avatar: c.avatar,
      niche: c.niche,
      followers: c.stats?.followers ?? 0,
      score: c.stats?.followers ?? 0,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);

  return {
    categories: getTrendingCategories(),
    creators: topCreators,
    brands: getBrandOpportunities(),
    market: [
      {
        title: "Trending Niches",
        subtitle: "Fashion, Music, Comedy",
      },
      {
        title: "Active Campaigns",
        subtitle: "12 live deals",
      },
    ],
  };
}