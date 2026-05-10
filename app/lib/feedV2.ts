import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandOpportunities } from "@/app/lib/feed";
import { buildMatches } from "@/app/lib/matchEngine";
import { getTrendLabel } from "@/app/lib/trendLabel";

import { getCooldownPenalty, markSeen } from "@/app/lib/feedExposureStore";

import { applyFeedPersonality } from "@/app/lib/feedPersonality";
import { getRouteFeedMode } from "@/app/lib/routeFeedBehavior";

import { getCreatorAffinity } from "@/app/lib/creatorAffinity";
import { getNicheAffinity } from "@/app/lib/nicheAffinity";
import { getEngagementLevel } from "@/app/lib/sessionSignals";

import { trackEngagement } from "@/app/lib/engagementTracker";
import { startInteractionDecay } from "@/app/lib/interactionDecay";
import { balanceRecommendations } from "@/app/lib/recommendationBalancer";

import {
  getSessionPersona,
  registerSessionInteraction,
} from "@/app/lib/sessionPersonality";

import { getMoodWeights } from "@/app/lib/feedMoodEngine";

import {
  updateCreatorMemory,
  updateNicheMemory,
} from "@/app/lib/crossSessionMemory";

import {
  getPersistentCreatorAffinity,
} from "@/app/lib/tastePersistence";

import {
  getResurfacingBoost,
} from "@/app/lib/resurfacingEngine";

import { applyFeedStabilityBoost } from "@/app/lib/feedStability";

import { runCommand } from "@/app/lib/engine/commandRuntime";

/* -----------------------------
   TYPES
------------------------------*/
type CreatorDTO = {
  type: "creator";
  id: string;
  name: string;
  category: string;
  avatar: string;
  score: number;
  trend?: string;
  trendColor?: string;
};

type BrandDTO = {
  type: "brand";
  id: string;
  name: string;
  subtitle: string;
  score: number;
};

type MatchDTO = {
  type: "match";
  id: string;
  name: string;
  subtitle: string;
  score: number;
};

type FeedItem = CreatorDTO | BrandDTO | MatchDTO;

type RankedCreator = CreatorDTO & {
  _rank: number;
};

interface FeedBuildOptions {
  pathname?: string;
  isBrandView?: boolean;
  isCreatorView?: boolean;
}

/* -----------------------------
   UTILS
------------------------------*/
const clampScore = (n: number) =>
  Math.max(0, Math.min(100, Number(n) || 0));

function clampMomentum(n: number) {
  return Math.max(-10, Math.min(10, Number(n) || 0));
}

function getJitter(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 5) - 2;
}

function getTimeDrift(index: number) {
  const t = Date.now();
  return Math.sin(t / 15000 + index * 0.7) * 5;
}

function getRefreshSeed() {
  return Math.floor(Date.now() / 5000);
}

function seededRandom(seed: number, index: number) {
  const x = Math.sin(seed + index * 9999) * 10000;
  return x - Math.floor(x);
}

/* -----------------------------
   SAFE COMMAND WRAPPER
------------------------------*/
function safeRunCommand(feed: FeedItem[], seed: number): FeedItem[] {
  try {
    const result = runCommand("FEED.BUILD", { feed });

    if (Array.isArray(result)) return result;

    return feed;
  } catch {
    return feed;
  }
}

/* -----------------------------
   FEED ENGINE
------------------------------*/
export function buildFeedV2(options: FeedBuildOptions = {}): FeedItem[] {
  startInteractionDecay();

  const creators = getCreatorUniverse();
  const brands = getBrandOpportunities();
  const matches = buildMatches();

  const feed: FeedItem[] = [];

  const seed = getRefreshSeed();
  const isSmallDataset = creators.length <= 6;

  const mode = getRouteFeedMode({
    pathname: options.pathname,
    isBrandView: options.isBrandView,
    isCreatorView: options.isCreatorView,
  });

  const persona = getSessionPersona();
  const moodWeights = getMoodWeights(persona.mood);

  /* -----------------------------
     CREATORS
  ------------------------------*/
  const enrichedCreators: RankedCreator[] = creators.map((c, index) => {
    registerSessionInteraction();

    const trend = getTrendLabel(c.score, c.momentum ?? 0);
    const momentum = clampMomentum(c.momentum ?? 0);

    const momentumBoost = momentum * (isSmallDataset ? 1.2 : 0.5);
    const jitter = getJitter(c.id);
    const drift = getTimeDrift(index);

    const randomness = isSmallDataset
      ? seededRandom(seed, index) * 14 - 7
      : seededRandom(seed, index) * 4 - 2;

    const discoveryScore = seededRandom(seed + 77, index) * 10;
    const stabilityScore = c.score > 75 ? 8 : 2;
    const engagementScore = Math.max(0, momentum) * 1.4;

    const creatorAffinity = getCreatorAffinity(c.id);
    const nicheAffinity = getNicheAffinity(c.category ?? "");
    const engagementLevel = getEngagementLevel();

    const sessionBoost =
      engagementLevel === "HIGH"
        ? 8
        : engagementLevel === "MEDIUM"
        ? 4
        : 1;

    const cooldown = getCooldownPenalty(c.id);

    updateCreatorMemory(c.id, Math.abs(c.momentum ?? 0) * 0.5);
    updateNicheMemory(c.category ?? "unknown", Math.abs(c.momentum ?? 0) * 0.3);

    const persistentAffinity = getPersistentCreatorAffinity(
      c.id,
      c.category ?? ""
    );

    const resurfacingBoost = getResurfacingBoost(c.id);

    const rawScore = applyFeedPersonality(mode, {
      baseScore: c.score,

      momentumScore: momentumBoost * moodWeights.momentum,
      discoveryScore: discoveryScore * moodWeights.discovery,
      stabilityScore: stabilityScore * moodWeights.stability,

      randomnessScore:
        (randomness + jitter + drift) * moodWeights.randomness,

      exposurePenalty: cooldown,

      engagementScore:
        (engagementScore +
          creatorAffinity * 1.8 +
          nicheAffinity * 1.2 +
          sessionBoost +
          persistentAffinity * 0.9 +
          resurfacingBoost * 1.4) *
        moodWeights.engagement,
    });

    return {
      type: "creator",
      id: c.id,
      name: c.name,
      category: c.category ?? "Creator",
      avatar: c.avatar,
      score: clampScore(rawScore),
      _rank: rawScore,
      trend: trend.label,
      trendColor: trend.color,
    };
  });

  let sortedCreators = enrichedCreators.sort((a, b) => b._rank - a._rank);

  if (isSmallDataset) {
    for (let i = sortedCreators.length - 1; i > 0; i--) {
      if (seededRandom(seed, i) > 0.45) {
        const j = Math.floor(seededRandom(seed, i + 99) * (i + 1));
        [sortedCreators[i], sortedCreators[j]] = [
          sortedCreators[j],
          sortedCreators[i],
        ];
      }
    }
  }

  feed.push(...sortedCreators);

  /* -----------------------------
     ENGAGEMENT TRACKING
  ------------------------------*/
  sortedCreators.forEach((c) => {
    markSeen(c.id);

    trackEngagement("CREATOR_VIEW", {
      creatorId: c.id,
      intensity: 0.25,
    });
  });

  /* -----------------------------
     BRANDS
  ------------------------------*/
  for (const b of brands) {
    feed.push({
      type: "brand",
      id: b.id,
      name: b.name,
      subtitle: b.desc,
      score: clampScore(
        Math.round(b.demand * 10 + seededRandom(seed, b.name.length) * 4)
      ),
    });
  }

  /* -----------------------------
     MATCHES
  ------------------------------*/
  for (const m of matches) {
    trackEngagement("MATCH_CLICK", { intensity: 0.7 });

    feed.push({
      type: "match",
      id: `${m.creator.slug}-${m.brand.id}`,
      name: `${m.creator.name} × ${m.brand.name}`,
      subtitle: m.reason,
      score: clampScore(Math.round(m.score + 10)),
    });
  }

  /* -----------------------------
     FINAL PIPELINE
------------------------------*/
  const balanced = balanceRecommendations(feed.slice(0, 40));
  const stabilized = applyFeedStabilityBoost(balanced, seed);

  return safeRunCommand(stabilized, seed);
}