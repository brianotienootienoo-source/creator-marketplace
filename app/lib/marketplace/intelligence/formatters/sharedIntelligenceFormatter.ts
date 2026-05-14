type RawIntelligenceInput = {
  matchScore?: number;
  trendScore?: number;
  ratingScore?: number;
};

export type FormattedIntelligence = {
  label: string;
  tone: "strong" | "good" | "neutral" | "weak";
  matchScore: number;
  trendScore: number;
  ratingScore: number;
};

/**
 * 🧠 SINGLE SOURCE OF TRUTH FOR INTELLIGENCE DISPLAY
 * Used by:
 * - Creator Profile
 * - Brand Dashboard
 * - Campaign Engine UI
 */
export function formatIntelligence(
  input: RawIntelligenceInput
): FormattedIntelligence {
  const matchScore = input.matchScore ?? 0;
  const trendScore = input.trendScore ?? 0;
  const ratingScore = input.ratingScore ?? 0;

  const avg = (matchScore + trendScore + ratingScore) / 3;

  let tone: FormattedIntelligence["tone"] = "neutral";
  let label = "Why This Creator Is Shown";

  if (avg >= 70) {
    tone = "strong";
    label = "High Match Creator";
  } else if (avg >= 40) {
    tone = "good";
    label = "Relevant Creator";
  } else if (avg > 0) {
    tone = "neutral";
    label = "Low Confidence Match";
  } else {
    tone = "weak";
    label = "Insufficient Signal Data";
  }

  return {
    label,
    tone,
    matchScore,
    trendScore,
    ratingScore,
  };
}