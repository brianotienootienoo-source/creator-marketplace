import { creators } from "@/app/data/creators";
import {
  getTrendingCategories,
  getBrandOpportunities,
} from "@/app/lib/feed";

import type { SmartFeed } from "./feedSchema";

/* -----------------------------
   SAFE HELPERS (ANTI-CRASH)
------------------------------*/
const safeArray = <T,>(input: T[] | undefined | null): T[] => {
  return Array.isArray(input) ? input : [];
};

/* -----------------------------
   SCORING SYSTEM (STABLE)
------------------------------*/
function scoreCreator(c: any) {
  return (c?.followers ?? 0) + Math.random() * 1000;
}

function scoreBrand(b: any) {
  return (b?.demand ?? 0) * 10 + Math.random() * 50;
}

/* -----------------------------
   MARKET SNAPSHOT (GUARANTEED)
------------------------------*/
function buildMarket(): SmartFeed["market"] {
  return [
    {
      title: "Trending Niches",
      subtitle: "Fashion, Music, Comedy",
    },
    {
      title: "Active Campaigns",
      subtitle: "12 live deals",
    },
  ];
}

/* -----------------------------
   MAIN SMART FEED (HARD LOCK)
------------------------------*/
export function buildSmartFeed(): SmartFeed {
  // ALWAYS SAFE INPUTS
  const rawCreators = safeArray(creators);
  const rawCategories = safeArray(getTrendingCategories());
  const rawBrands = safeArray(getBrandOpportunities());

  // SORTED CREATORS
  const creatorsSorted = rawCreators
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

  // FINAL GUARANTEED RETURN (NO EXCEPTIONS)
  return {
    creators: creatorsSorted,
    brands: brandsSorted,
    categories: rawCategories,
    market: buildMarket(),
  };
}