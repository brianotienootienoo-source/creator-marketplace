type Creator = any;
type Brand = any;
type Campaign = any;

type Context = {
  surface: "feed" | "marketplace" | "profile";
  sessionBias?: number;
  timeOfDay?: number;
};

export type UnifiedSignal = {
  score: number;
  trend: number;
  affinity: number;
  quality: number;
  confidence: number;
  reasons: string[];
};

/**
 * SINGLE SOURCE OF TRUTH FOR ALL INTELLIGENCE SCORING
 * Used by:
 * - feed ranking
 * - marketplace matching
 * - campaign scoring
 * - creator ranking
 */
export function getUnifiedSignal(
  entity: Creator | Brand | Campaign,
  context: Context
): UnifiedSignal {
  const quality = getQualityScore(entity);
  const trend = getTrendScore(entity);
  const affinity = getAffinityScore(entity, context);
  const contextBoost = getContextBoost(context);

  const nQuality = normalize(quality);
  const nTrend = normalize(trend);
  const nAffinity = normalize(affinity);
  const nContext = normalize(contextBoost);

  const score =
    nQuality * 0.4 +
    nTrend * 0.25 +
    nAffinity * 0.25 +
    nContext * 0.1;

  return {
    score: clamp(score),
    trend: nTrend,
    affinity: nAffinity,
    quality: nQuality,
    confidence: computeConfidence(nQuality, nTrend, nAffinity),
    reasons: generateReasons(nQuality, nTrend, nAffinity, context),
  };
}

/* ---------------- CORE SIGNALS ---------------- */

function getQualityScore(entity: any): number {
  return (
    (entity?.ratingScore ?? 50) +
    (entity?.metrics?.engagement ?? 0) * 10
  );
}

function getTrendScore(entity: any): number {
  return entity?.trendScore ?? 50;
}

function getAffinityScore(entity: any, context: Context): number {
  const base = entity?.nicheAffinity ?? 50;

  if (context.surface === "feed") return base * 1.05;
  if (context.surface === "marketplace") return base * 1.15;

  return base;
}

function getContextBoost(context: Context): number {
  const hour = context.timeOfDay ?? new Date().getHours();

  if (hour >= 18 && hour <= 23) return 15;
  if (hour >= 9 && hour <= 12) return 10;

  return 5;
}

/* ---------------- NORMALIZATION ---------------- */

function normalize(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/* ---------------- CONFIDENCE ---------------- */

function computeConfidence(q: number, t: number, a: number): number {
  const variance = Math.abs(q - t) + Math.abs(t - a);
  return clamp(100 - variance);
}

/* ---------------- REASONS ---------------- */

function generateReasons(
  q: number,
  t: number,
  a: number,
  context: Context
): string[] {
  const reasons: string[] = [];

  if (q > 70) reasons.push("High quality signal");
  if (t > 65) reasons.push("Strong trend momentum");
  if (a > 60) reasons.push("Strong niche alignment");

  reasons.push(`Surface: ${context.surface}`);

  return reasons;
}