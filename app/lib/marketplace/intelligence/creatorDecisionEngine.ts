import { Creator } from "@/app/lib/marketplace/entities/creator";
import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";

export function getCreatorDecisionEngine(creator: Creator) {
  const signal = getUnifiedSignal(creator, {
    surface: "marketplace",
  });

  let priority: "HIGH" | "MEDIUM" | "LOW" = "LOW";

  if (signal.score >= 70) priority = "HIGH";
  else if (signal.score >= 40) priority = "MEDIUM";

  const recommended =
    priority === "HIGH";

  return {
    creatorId: creator.id,
    priority,
    recommended,
    decisionScore: Math.round(signal.score),
    signals: signal,
    campaigns: [],
    meta: {
      reason: signal.reasons,
    },
  };
}