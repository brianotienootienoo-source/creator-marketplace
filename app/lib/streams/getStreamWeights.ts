import { getEngagementLevel } from "@/app/lib/sessionSignals";
import { getSessionPersona } from "@/app/lib/sessionPersonality";

export type StreamWeights = {
  forYou: number;
  explore: number;
};

/**
 * Phase 5.4 — Stream Priority Engine
 *
 * Determines UI bias between:
 * - For You (personalized stream)
 * - Explore (discovery stream)
 *
 * Does NOT modify feed data.
 * Only influences rendering emphasis.
 */
export function getStreamWeights(): StreamWeights {
  const engagement = getEngagementLevel();
  const persona = getSessionPersona();

  let forYou = 50;
  let explore = 50;

  /* -----------------------------
     ENGAGEMENT SHIFT
  ------------------------------*/
  if (engagement === "HIGH") {
    forYou += 25;
    explore -= 10;
  }

  if (engagement === "MEDIUM") {
    forYou += 10;
  }

  if (engagement === "LOW") {
    explore += 30;
    forYou -= 15;
  }

  /* -----------------------------
     PERSONA SHIFT
  ------------------------------*/
  switch (persona?.mood) {
    case "focused":
      forYou += 15;
      explore -= 5;
      break;

    case "curious":
      explore += 15;
      forYou -= 5;
      break;

    case "explorative":
      explore += 20;
      break;
  }

  /* -----------------------------
     SAFE NORMALIZATION
  ------------------------------*/
  forYou = Math.max(5, forYou);
  explore = Math.max(5, explore);

  const total = forYou + explore;

  return {
    forYou: forYou / total,
    explore: explore / total,
  };
}