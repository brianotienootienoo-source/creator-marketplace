import {
  getCreatorMemoryScore,
  getNicheMemoryScore,
} from "./crossSessionMemory";

/* -----------------------------
   LONG-TERM WEIGHTING
------------------------------*/
export function getPersistentCreatorAffinity(
  creatorId: string,
  niche: string
) {
  const creatorScore =
    getCreatorMemoryScore(creatorId);

  const nicheScore =
    getNicheMemoryScore(niche);

  return creatorScore * 0.7 + nicheScore * 0.3;
}

/* -----------------------------
   NORMALIZED BOOST
------------------------------*/
export function getTasteBoost(value: number) {
  return Math.min(12, Math.max(0, value));
}