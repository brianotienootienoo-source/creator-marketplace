import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import {
  getTrendingCategories,
  getBrandOpportunities,
} from "@/app/lib/feed";

import type { SmartFeed } from "./feedSchema";

/* -----------------------------
   SAFE HELPERS
------------------------------*/
const safeArray = <T,>(input: T[] | undefined | null): T[] => {
  return Array.isArray(input) ? input : [];
};

/* -----------------------------
   SCORING SYSTEM (STABLE)
------------------------------*/
function scoreCreator(c: any) {
  return (
    (c?.followers ?? 0) +
    (c?.engagementRate ?? 0) * 1000 +
    Math.random() * 500
  );
}

function scoreBrand(b: any) {
  return (b?.demand ?? 0) * 10 + Math.random() * 50;
}

/* -----------------------------
   MARKET SNAPSHOT
------------------------------*/
function buildMarket(): SmartFeed["market"] {
  return [
    {
      title: "Trending Niches",
      subtitle: "Fashion, Music, Comedy, DJs",
    },
    {
      title: "Active Campaigns",
      subtitle: "12 live deals",
    },
  ];
}

/* -----------------------------
   MAIN SMART FEED
------------------------------*/
export function buildSmartFeed(): SmartFeed {
  const creators = getCreatorUniverse();

  const rawCategories = safeArray(getTrendingCategories());
  const rawBrands = safeArray(getBrandOpportunities());

  // SORTED CREATORS
  const creatorsSorted = creators
    .map((c) => ({
      ...c,
      score: scoreCreator(c),
    }))
    .sort((a, b) => b.score - a.score);

  // SORTED BRANDS
  const brandsSorted = rawBrands
    .map((b) => ({
      ...b,
      score: scoreBrand(b),
    }))
    .sort((a, b) => b.score - a.score);

  return {
    creators: creatorsSorted,
    brands: brandsSorted,
    categories: rawCategories,
    market: buildMarket(),
  };
}