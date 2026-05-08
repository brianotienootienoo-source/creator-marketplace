import { creators } from "@/app/data/creators";
import { getBrandOpportunities } from "@/app/lib/feed";
import { defaultUserProfile } from "./userProfile";

type Match = {
  creator: any;
  brand: any;
  score: number;
  rating: string;
  reason: string;
  evidence: string[];
};

/* =========================
   PURE SCORING ENGINE
========================= */
function matchScore(creator: any, brand: any) {
  const profile = defaultUserProfile;

  let score = 0;

  const interestWeight =
    profile.interests?.[creator.category] ?? 0.3;

  score += interestWeight * 50;

  if (creator.category === "Music" && brand.name.includes("Spotify")) {
    score += 45;
  }

  if (creator.category === "Fitness" && brand.name === "Nike") {
    score += 50;
  }

  if (creator.category === "Comedy" && brand.name.includes("Netflix")) {
    score += 35;
  }

  const followerScore = Math.min((creator.followers || 0) / 10000, 30);
  score += followerScore;

  score += (brand.demand || 0) / 2;

  return Math.round(score);
}

/* =========================
   INTERNAL EXPLANATION (NO UI LOGIC)
========================= */
function explainMatch(creator: any, brand: any) {
  const evidence: string[] = [];

  if (creator.category === "Music" && brand.name.includes("Spotify")) {
    evidence.push("Music content aligns with streaming audience behavior");
  }

  if (creator.category === "Fitness" && brand.name === "Nike") {
    evidence.push("Fitness audience overlaps with performance buyers");
  }

  if (creator.category === "Comedy") {
    evidence.push("High engagement entertainment content improves reach");
  }

  if ((creator.followers || 0) > 50000) {
    evidence.push("Large audience increases campaign visibility");
  }

  if ((brand.demand || 0) > 70) {
    evidence.push("High brand demand increases match probability");
  }

  return {
    summary:
      evidence.length > 0
        ? "Strong alignment across audience + content signals"
        : "Basic audience compatibility detected",
    evidence,
  };
}

/* =========================
   MATCH BUILDER (PURE OUTPUT)
========================= */
export function buildMatches(brandId?: string): Match[] {
  const brands = getBrandOpportunities();
  const creatorsList = creators;

  const targetBrands = brandId
    ? brands.filter((b) => b.id === brandId)
    : brands;

  const matches: Match[] = [];

  for (const c of creatorsList) {
    for (const b of targetBrands) {
      const score = matchScore(c, b);

      if (score > 25) {
        const explanation = explainMatch(c, b);

        matches.push({
          creator: c,
          brand: b,
          score,
          rating: "", // UI removed responsibility
          reason: explanation.summary,
          evidence: explanation.evidence,
        });
      }
    }
  }

  return matches.sort((a, b) => b.score - a.score);
}