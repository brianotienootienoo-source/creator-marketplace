import { creators } from "@/app/data/creators";
import {
  getBrandOpportunities,
} from "@/app/lib/feed";

import { defaultUserProfile } from "./userProfile";

/* -----------------------------
   TYPES (LIGHTWEIGHT MATCHING)
------------------------------*/
type Match = {
  creator: any;
  brand: any;
  score: number;
  reason: string;
};

/* -----------------------------
   PERSONALIZED MATCH SCORE (UPGRADED)
------------------------------*/
function matchScore(creator: any, brand: any) {
  const profile = defaultUserProfile;

  let score = 0;

  // 1. CATEGORY PERSONALIZATION BOOST
  const interestWeight =
    profile.interests?.[creator.category] ?? 0.3;

  score += interestWeight * 50;

  // 2. STRONG DOMAIN ALIGNMENT RULES
  if (creator.category === "Music" && brand.name.includes("Spotify")) {
    score += 45;
  }

  if (creator.category === "Fitness" && brand.name === "Nike") {
    score += 50;
  }

  if (creator.category === "Comedy" && brand.name.includes("Netflix")) {
    score += 35;
  }

  // 3. AUDIENCE SCALE
  const followerScore = Math.min((creator.followers || 0) / 10000, 30);
  score += followerScore;

  // 4. BRAND DEMAND SIGNAL
  score += (brand.demand || 0) / 2;

  return Math.round(score);
}

/* -----------------------------
   REASON GENERATOR (IMPROVED)
------------------------------*/
function explainMatch(creator: any, brand: any) {
  const category = creator.category;

  if (category === "Music" && brand.name.includes("Spotify")) {
    return "High-impact music × streaming platform alignment";
  }

  if (category === "Fitness" && brand.name === "Nike") {
    return "Strong fitness audience + sports brand synergy";
  }

  if (category === "Comedy") {
    return "Entertainment audience matches brand engagement goals";
  }

  return "Audience overlap + engagement compatibility";
}

/* -----------------------------
   BUILD MATCHES ENGINE
------------------------------*/
export function buildMatches(): Match[] {
  const brands = getBrandOpportunities();
  const creatorsList = creators;

  const matches: Match[] = [];

  for (const c of creatorsList) {
    for (const b of brands) {
      const score = matchScore(c, b);

      if (score > 25) {
        matches.push({
          creator: c,
          brand: b,
          score,
          reason: explainMatch(c, b),
        });
      }
    }
  }

  return matches
    .sort((a, b) => b.score - a.score)
    .slice(0, 25);
}