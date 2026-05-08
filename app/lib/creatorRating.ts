export function normalizeScore(score: any) {
  const s = Number(score);

  // 🔥 HARD GUARD: prevents undefined → 0 fallback explosion
  if (!Number.isFinite(s)) return 0;

  return Math.max(0, Math.min(100, s));
}

export function getStars(score: any) {
  const s = normalizeScore(score);

  const raw = (s / 100) * 5;

  const full = Math.floor(raw);
  const hasHalf = raw - full >= 0.5;

  return Array.from({ length: 5 }).map((_, i) => {
    if (i < full) return "full";
    if (i === full && hasHalf) return "half";
    return "empty";
  });
}

export function getStarColor(score: any) {
  const s = normalizeScore(score);

  if (s >= 80) return "#3b82f6"; // viral (blue)
  if (s >= 60) return "#22c55e"; // high (green)
  if (s >= 40) return "#facc15"; // medium (yellow)
  if (s >= 20) return "#f97316"; // low (orange)
  return "#8B5A2B"; // dark brown (low)
}