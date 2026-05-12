type Creator = {
  id: string;
  name: string;
  category?: string;
  stats?: {
    engagementRate?: number;
    growthRate?: number;
  };
};

type Brand = {
  id: string;
  name: string;
  niche?: string;
  demand?: number;
};

type Campaign = {
  id: string;
  title?: string;
  niche?: string;
  budget?: string;
};

/* -----------------------------
   CREATOR MATCH SCORE
------------------------------*/
export function getCreatorMatchScore(
  creator: Creator,
  brand: Brand
): number {
  let score = 50;

  if (!creator || !brand) return score;

  // niche alignment
  if (
    creator.category?.toLowerCase() === brand.niche?.toLowerCase()
  ) {
    score += 25;
  }

  // engagement boost
  score += Math.min((creator.stats?.engagementRate || 0) * 10, 20);

  // brand demand influence
  score += Math.min((brand.demand || 0) * 2, 10);

  return Math.min(100, Math.max(0, score));
}

/* -----------------------------
   CAMPAIGN RELEVANCE SCORE
------------------------------*/
export function getCampaignRelevanceScore(
  campaign: Campaign,
  creator: Creator
): number {
  let score = 40;

  if (!campaign || !creator) return score;

  if (
    campaign.niche?.toLowerCase() === creator.category?.toLowerCase()
  ) {
    score += 40;
  }

  return Math.min(100, score);
}

/* -----------------------------
   LABEL SYSTEM (UI FRIENDLY)
------------------------------*/
export function getCardInsightLabel(score: number): string {
  if (score >= 80) return "🔥 High Match";
  if (score >= 60) return "⚡ Strong Match";
  if (score >= 40) return "👍 Moderate Match";
  return "Low Match";
}