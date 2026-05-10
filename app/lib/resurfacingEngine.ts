import {
  getCreatorMemoryScore,
} from "./crossSessionMemory";

/* -----------------------------
   RESURFACING LOGIC
------------------------------*/
export function getResurfacingBoost(
  creatorId: string
) {
  const memory = getCreatorMemoryScore(creatorId);

  const decayFactor = getDecay(memory);

  const probability = memory * decayFactor;

  return Math.min(10, probability);
}

/* -----------------------------
   MEMORY DECAY MODEL
------------------------------*/
function getDecay(memory: number) {
  if (memory > 8) return 0.95;
  if (memory > 4) return 0.75;
  if (memory > 1) return 0.4;
  return 0.1;
}