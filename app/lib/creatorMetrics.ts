import { creators } from "@/app/data/creators";
import { campaigns } from "@/app/data/campaigns";

export function getCreatorMetrics(creatorId: string) {
  const creator = creators.find((c) => c.id === creatorId);

  // 🧠 1. SIMULATED APPLICATION COUNT (placeholder logic for now)
  const applications = campaigns.length * Math.floor(Math.random() * 3);

  // 📊 2. ENGAGEMENT QUALITY SCORE (mock but structured)
  const baseQuality = creator?.qualityScore || 70;

  const activityBoost = applications * 2;

  const reliabilityScore = Math.min(baseQuality + activityBoost, 100);

  // 🔥 3. BRAND FIT SCORE (how well creator matches brands)
  const nicheMatchFactor = creator?.niche ? 15 : 5;

  const brandFitScore = Math.min(
    baseQuality + nicheMatchFactor,
    100
  );

  // 📡 4. ACTIVITY LEVEL
  let activityLevel: "Low" | "Medium" | "High" = "Low";

  if (applications > 8) {
    activityLevel = "High";
  } else if (applications > 4) {
    activityLevel = "Medium";
  }

  return {
    reliabilityScore,
    brandFitScore,
    applications,
    activityLevel,
  };
}