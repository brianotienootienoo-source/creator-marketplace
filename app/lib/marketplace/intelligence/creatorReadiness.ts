import { Creator } from "../entities/creator";
import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";

export type ReadinessTier =
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "PREMIUM";

export function getCreatorReadiness(creator: Creator) {
  const signal = getUnifiedSignal(creator, {
    surface: "marketplace",
  });

  const score = signal.score;

  let tier: ReadinessTier = "LOW";

  if (score >= 75) tier = "PREMIUM";
  else if (score >= 55) tier = "HIGH";
  else if (score >= 35) tier = "MEDIUM";

  const bestFit =
    creator.opportunityModes?.[0] ?? "brand_deals";

  return {
    score,
    tier,
    bestFit,
  };
}