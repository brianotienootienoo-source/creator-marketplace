import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandOpportunities } from "@/app/lib/feed";
import { buildMatches } from "@/app/lib/matchEngine";
import { getTrendLabel } from "@/app/lib/trendLabel";
import {
  getCooldownPenalty,
  markSeen,
} from "@/app/lib/feedExposureStore";

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

/* -----------------------------
   INTERNAL CREATOR TYPE
------------------------------*/
type RankedCreator = CreatorDTO & {
  _rank: number;
};

/* -----------------------------
   NORMALIZER
------------------------------*/
const clampScore = (n: number) =>
  Math.max(0, Math.min(100, Number(n) || 0));

/* -----------------------------
   HELPERS
------------------------------*/

/** deterministic jitter */
function getJitter(id: string) {
  let hash = 0;

  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
    hash |= 0;
  }

  return (Math.abs(hash) % 5) - 2;
}

/** time drift */
function getTimeDrift(index: number) {
  const t = Date.now();

  // 🔥 faster visible movement
  return Math.sin((t / 15000) + index * 0.7) * 5;
}

/** momentum clamp */
function clampMomentum(n: number) {
  return Math.max(-10, Math.min(10, Number(n) || 0));
}

/** refresh seed */
function getRefreshSeed() {
  // 🔥 faster seed rotation for visible refresh changes
  return Math.floor(Date.now() / 5000);
}

function seededRandom(seed: number, index: number) {
  const x = Math.sin(seed + index * 9999) * 10000;
  return x - Math.floor(x);
}

/* -----------------------------
   FEED ENGINE (PHASE 3 COMPLETE)
------------------------------*/
export function buildFeedV2(): FeedItem[] {
  const creators = getCreatorUniverse();
  const brands = getBrandOpportunities();
  const matches = buildMatches();

  const feed: FeedItem[] = [];

  const isSmallDataset = creators.length <= 6;
  const seed = getRefreshSeed();

  /* -----------------------------
     CREATORS
  ------------------------------*/
  const enrichedCreators: RankedCreator[] = creators.map(
    (c, index) => {
      const trend = getTrendLabel(
        c.score,
        c.momentum ?? 0
      );

      const momentum = clampMomentum(
        c.momentum ?? 0
      );

      const momentumBoost =
        momentum * (isSmallDataset ? 1.2 : 0.5);

      const jitter = getJitter(c.id);

      const drift = getTimeDrift(index);

      // 🔥 stronger visible movement for tiny datasets
      const noise = isSmallDataset
        ? seededRandom(seed, index) * 14 - 7
        : seededRandom(seed, index) * 4 - 2;

      // 🔥 exposure cooldown
      const cooldown = getCooldownPenalty(c.id);

      const rawScore =
        c.score +
        momentumBoost +
        jitter +
        drift +
        noise -
        cooldown * 4;

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
    }
  );

  /* -----------------------------
     SORT CORE
  ------------------------------*/
  let sortedCreators = enrichedCreators.sort(
    (a, b) => b._rank - a._rank
  );

  /* -----------------------------
     SMALL DATASET DISCOVERY LAYER
  ------------------------------*/
  if (isSmallDataset) {
    for (
      let i = sortedCreators.length - 1;
      i > 0;
      i--
    ) {
      const shouldSwap =
        seededRandom(seed, i) > 0.45;

      if (shouldSwap) {
        const j = Math.floor(
          seededRandom(seed, i + 99) * (i + 1)
        );

        [sortedCreators[i], sortedCreators[j]] = [
          sortedCreators[j],
          sortedCreators[i],
        ];
      }
    }
  }

  feed.push(...sortedCreators);

  /* -----------------------------
     MARK AS SEEN
  ------------------------------*/
  sortedCreators.forEach((c) => {
    markSeen(c.id);
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
        Math.round(
          b.demand * 10 +
            seededRandom(seed, b.name.length) * 4
        )
      ),
    });
  }

  /* -----------------------------
     MATCHES
  ------------------------------*/
  for (const m of matches) {
    feed.push({
      type: "match",
      id: `${m.creator.slug}-${m.brand.id}`,
      name: `${m.creator.name} × ${m.brand.name}`,
      subtitle: m.reason,
      score: clampScore(
        Math.round(m.score + 10)
      ),
    });
  }

  return feed.slice(0, 40);
}