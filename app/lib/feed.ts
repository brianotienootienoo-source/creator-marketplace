import { creators } from "@/app/data/creators";

export function getFeaturedCreators() {
  return [...creators]
    .sort((a, b) => b.followers - a.followers)
    .slice(0, 6);
}

export function getTrendingCategories() {
  return [
    { name: "Music", trend: 92 },
    { name: "Comedy", trend: 78 },
    { name: "Influencers", trend: 88 },
    { name: "Brands", trend: 81 },
  ];
}

export function getBrandOpportunities() {
  return [
    {
      name: "Nike",
      desc: "Fitness + lifestyle creators wanted",
      demand: 95,
    },
    {
      name: "Spotify",
      desc: "Musicians for campaigns",
      demand: 89,
    },
    {
      name: "Netflix",
      desc: "Promo collaborations",
      demand: 85,
    },
  ];
}