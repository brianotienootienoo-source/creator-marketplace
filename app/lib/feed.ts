import { creators } from "@/app/data/creators";

/* -----------------------------
   CREATORS
------------------------------*/
export function getFeaturedCreators() {
  return [...creators]
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);
}

/* -----------------------------
   TRENDS
------------------------------*/
export function getTrendingCategories() {
  return [
    { name: "Music", trend: 92 },
    { name: "Comedy", trend: 78 },
    { name: "Influencers", trend: 88 },
    { name: "Brands", trend: 81 },
  ];
}

/* -----------------------------
   🔥 FIXED BRAND SOURCE OF TRUTH
   (IMPORTANT: normalized IDs added)
------------------------------*/
export function getBrandOpportunities() {
  return [
    {
      id: "nike",
      name: "Nike",
      desc: "Fitness + lifestyle creators wanted",
      demand: 95,
    },
    {
      id: "spotify",
      name: "Spotify",
      desc: "Musicians for campaigns",
      demand: 89,
    },
    {
      id: "netflix",
      name: "Netflix",
      desc: "Promo collaborations",
      demand: 85,
    },
  ];
}