import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { campaigns } from "@/app/data/campaigns";

/**
 * CREATOR METRICS (UNIFIED SOURCE)
 */
export function getCreatorMetrics(creatorId: string) {
  const creators = getCreatorUniverse();
  const creator = creators.find((c) => c.id === creatorId);

  // 🧠 1. SIMULATED APPLICATION COUNT (placeholder logic)
  const applications =
    campaigns.length * Math.floor(Math.random() * 3);

  // 📊 2. ENGAGEMENT QUALITY SCORE (derived safely)
  const baseQuality =
    (creator?.engagementRate ?? 0) * 100 +
    Math.min((creator?.followers ?? 0) / 1000, 30);

  const activityBoost = applications * 2;

  const reliabilityScore = Math.min(baseQuality + activityBoost, 100);

  // 🔥 3. BRAND FIT SCORE
  const nicheMatchFactor = creator?.category ? 15 : 5;

  const brandFitScore = Math.min(
    baseQuality + nicheMatchFactor,
    100
  );

  // 📡 4. ACTIVITY LEVEL
  let activityLevel: "Low" | "Medium" | "High" = "Low";

  if (applications > 8) activityLevel = "High";
  else if (applications > 4) activityLevel = "Medium";

  return {
    reliabilityScore,
    brandFitScore,
    applications,
    activityLevel,
  };
}