type IntelligenceInput = {
  matchScore?: number;
  trendScore?: number;
  ratingScore?: number;
};

export type IntelligenceTone = "strong" | "good" | "neutral";

export type FormattedIntelligence = {
  matchScore: number;
  trendScore: number;
  ratingScore: number;
  tone: IntelligenceTone;
  label: string;
};

/**
 * Shared formatter for ALL intelligence panels
 * Used by:
 * - creator profile page
 * - brand dashboard
 * - future feed cards
 */
export function formatIntelligence(
  input?: IntelligenceInput
): FormattedIntelligence {
  const match = input?.matchScore ?? 0;
  const trend = input?.trendScore ?? 0;
  const rating = input?.ratingScore ?? 0;

  // unified scoring baseline
  const composite = (match * 0.6) + (trend * 0.25) + (rating * 0.15);

  let tone: IntelligenceTone = "neutral";
  let label = "Low Signal Match";

  if (composite >= 70) {
    tone = "strong";
    label = "High Confidence Match";
  } else if (composite >= 40) {
    tone = "good";
    label = "Moderate Match Signal";
  }

  return {
    matchScore: match,
    trendScore: trend,
    ratingScore: rating,
    tone,
    label,
  };
}