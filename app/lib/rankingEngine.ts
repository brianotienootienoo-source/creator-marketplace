type Item = {
  id: string;
  score: number;
};

/* =========================
   GLOBAL RANKING SYSTEM
========================= */

export function rankItems<T extends Item>(items: T[]) {
  return [...items].sort((a, b) => b.score - a.score);
}

/* optional normalization for future scaling */
export function normalizeScore(score: number) {
  return Math.max(0, Math.min(100, score));
}