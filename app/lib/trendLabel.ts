export function getTrendLabel(score: number, momentum: number) {
  const s = Math.max(0, Math.min(100, score));
  const m = Math.max(-10, Math.min(10, momentum));

  // Top tier (rare, high momentum + high score)
  if (s >= 78 && m >= 4) {
    return {
      label: "Breakout",
      color: "#7c3aed",
    };
  }

  // Strong performers (more reachable than before)
  if (s >= 62 && m >= 1.5) {
    return {
      label: "Trending",
      color: "#16a34a",
    };
  }

  // Active growth (broader capture zone)
  if (s >= 50 && m >= 0.3) {
    return {
      label: "Rising",
      color: "#f97316",
    };
  }

  // Baseline creators (most of your dataset lands here naturally)
  if (s >= 45) {
    return {
      label: "Stable",
      color: "#6b7280",
    };
  }

  // Entry level
  return {
    label: "New",
    color: "#9ca3af",
  };
}