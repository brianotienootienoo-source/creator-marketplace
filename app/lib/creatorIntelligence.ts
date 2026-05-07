import { getCreatorMetrics } from "@/app/lib/creatorMetrics";

type EngagementLevel =
  | "Low Engagement"
  | "Moderate Engagement"
  | "High Engagement"
  | "Viral Engagement";

type CreatorInsight = {
  tier: EngagementLevel;
  label: string;
  color: "red" | "yellow" | "blue" | "purple";
  reason: string;
};

export function getCreatorIntelligence(creator: any): CreatorInsight {
  const metrics = getCreatorMetrics(creator.id);

  // -----------------------------
  // 🧠 BEHAVIOR SIGNALS
  // -----------------------------
  const isViral =
    metrics.engagementScore >= 85 && metrics.reliabilityScore >= 60;

  const isHigh =
    metrics.engagementScore >= 70 && !isViral;

  const isModerate =
    metrics.engagementScore >= 50 && metrics.engagementScore < 70;

  const isLow =
    metrics.engagementScore < 50;

  const strongBrandAffinity = metrics.brandFitScore >= 70;
  const consistentPerformance = metrics.reliabilityScore >= 70;

  const conversionLean = strongBrandAffinity && consistentPerformance;

  const audienceBrandResponsive =
    metrics.engagementScore >= 65 && metrics.brandFitScore >= 60;

  // -----------------------------
  // 🔥 VIRAL
  // -----------------------------
  if (isViral) {
    return {
      tier: "Viral Engagement",
      label: "🔥 Viral Engagement",
      color: "purple",
      reason:
        "Audience shows rapid engagement spikes and strong interaction velocity across content formats",
    };
  }

  // -----------------------------
  // 🔵 HIGH
  // -----------------------------
  if (isHigh) {
    return {
      tier: "High Engagement",
      label: "🔵 High Engagement",
      color: "blue",
      reason: conversionLean
        ? "Strong audience responsiveness to branded content with high conversion potential"
        : "Consistently strong audience interaction across organic and sponsored content",
    };
  }

  // -----------------------------
  // 🟡 MODERATE
  // -----------------------------
  if (isModerate) {
    return {
      tier: "Moderate Engagement",
      label: "🟡 Moderate Engagement",
      color: "yellow",
      reason: audienceBrandResponsive
        ? "Audience shows steady engagement with noticeable responsiveness to branded content"
        : "Stable engagement patterns with occasional interaction on brand-related content",
    };
  }

  // -----------------------------
  // 🟤 LOW
  // -----------------------------
  return {
    tier: "Low Engagement",
    label: "🟤 Low Engagement",
    color: "red",
    reason:
      "Limited audience interaction and low responsiveness to branded content",
  };
}