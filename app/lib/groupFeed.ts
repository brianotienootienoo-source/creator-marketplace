import { creators } from "@/app/data/creators";
import {
  getTrendingCategories,
  getBrandOpportunities,
} from "@/app/lib/feed";

export function buildGroupedFeed() {
  const topCreators = creators
    .map((c) => ({
      ...c,
      score: c.followers || 0,
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