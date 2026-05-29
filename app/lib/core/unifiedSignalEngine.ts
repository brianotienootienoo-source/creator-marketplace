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
 * SINGLE SOURCE OF TRUTH FOR ALL RANKING + MATCHING
 */
export function getUnifiedSignal(
  entity: Creator | Brand | Campaign,
  context: Context
): UnifiedSignal {
  const baseQuality = getQualityScore(entity);
  const trend = getTrendScore(entity);
  const affinity = getAffinityScore(entity, context);
  const contextBoost = getContextBoost(context);

  const score =
    baseQuality * 0.4 +
    trend * 0.25 +
    affinity * 0.25 +
    contextBoost * 0.1;

  return {
    score: clamp(score),
    trend,
    affinity,
    quality: baseQuality,
    confidence: computeConfidence(baseQuality, trend, affinity),
    reasons: generateReasons(baseQuality, trend, affinity, context),
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
  return entity?.trendScore ?? Math.random() * 60;
}

function getAffinityScore(entity: any, context: Context): number {
  const base = entity?.nicheAffinity ?? 50;

  if (context.surface === "feed") return base * 1.1;
  if (context.surface === "marketplace") return base * 1.3;

  return base;
}

function getContextBoost(context: Context): number {
  const hour = context.timeOfDay ?? new Date().getHours();

  // simple attention curve
  if (hour >= 18 && hour <= 23) return 15;
  if (hour >= 9 && hour <= 12) return 10;

  return 5;
}

/* ---------------- HELPERS ---------------- */

function clamp(value: number): number {
  return Math.max(0, Math.min(100, value));
}

function computeConfidence(q: number, t: number, a: number): number {
  const variance = Math.abs(q - t) + Math.abs(t - a);
  return clamp(100 - variance);
}

function generateReasons(
  q: number,
  t: number,
  a: number,
  context: Context
): string[] {
  const reasons: string[] = [];

  if (q > 70) reasons.push("High quality signal");
  if (t > 65) reasons.push("Rising trend momentum");
  if (a > 60) reasons.push("Strong niche alignment");

  reasons.push(`Context: ${context.surface}`);

  return reasons;
}