// app/lib/ratingSystem.ts

/**
 * 🚨 7.8 RATING SYSTEM — LOCKED CONTRACT
 * Single source of truth for creator rating display
 */

export function getLabel(score: number): string {
  const normalized = normalizeScore(score);

  if (normalized >= 80) return "High Performer";
  if (normalized >= 60) return "Growing Creator";
  if (normalized >= 40) return "Emerging Creator";
  return "New Creator";
}

/**
 * Normalize ALL inputs to 0–100 scale
 * Fixes your /creators bug (0–1 vs 0–100 mismatch)
 */
function normalizeScore(score: number): number {
  if (score <= 1) return Math.round(score * 100);
  return Math.max(0, Math.min(100, score));
}

/**
 * Returns filled stars (0–5)
 */
export function getFilledStars(score: number): number {
  const normalized = normalizeScore(score);
  return Math.round((normalized / 100) * 5);
}

/**
 * ALWAYS returns full 5-star string
 * Ensures empty stars are visible
 */
export function getStars(score: number): string {
  const filled = getFilledStars(score);
  const empty = 5 - filled;

  return "★".repeat(filled) + "☆".repeat(empty);
}

/**
 * Single design color for stars
 */
export function getStarColor(): string {
  return "#f5b301";
}

export const RATING_SYSTEM_VERSION = "7.8-locked";