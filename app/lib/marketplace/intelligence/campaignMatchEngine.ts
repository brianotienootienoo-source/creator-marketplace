import { Creator } from "../entities/creator";
import { campaigns } from "@/app/data/campaigns";
import { getUnifiedSignal } from "@/app/lib/core/unifiedSignalEngine";

export function getCampaignMatches(creator: Creator) {
  const signal = getUnifiedSignal(creator, {
    surface: "marketplace",
  });

  return campaigns
    .map((c) => {
      let score = signal.affinity;
      const reason: string[] = [];

      const niche = creator.niche?.toLowerCase?.() ?? "";
      const title = c.title?.toLowerCase?.() ?? "";

      if (title.includes(niche)) {
        score += 25;
        reason.push("niche match");
      }

      if (signal.trend > 60) {
        score += 10;
        reason.push("trend alignment boost");
      }

      return {
        id: c.id,
        title: c.title,
        brandId: c.brandId,
        budget: c.budget,
        score,
        reason: reason.join(", "),
      };
    })
    .filter((c) => c.score > 20)
    .sort((a, b) => b.score - a.score);
}