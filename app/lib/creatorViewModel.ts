import { getCreatorScore, getCreatorLabel, getCreatorColor } from "./creatorIntelligence";

type Creator = {
  id: string;
  name: string;
  category?: string;
  followers?: number;
  engagementRate?: number;
};

export function normalizeCreator(creator: Creator) {
  const score = getCreatorScore(creator);

  return {
    id: creator.id,
    name: creator.name ?? "Unknown Creator",
    category: creator.category ?? "Uncategorized",

    score,
    stars: "★★★★★".slice(0, Math.max(1, Math.round(score / 20))) +
           "☆☆☆☆☆".slice(Math.max(0, Math.round(score / 20))),

    label: getCreatorLabel(score),
    color: getCreatorColor(score),
  };
}