import { getStreamState } from "./streamStateEngine";

export type FeedEmotion =
  | "bored"
  | "curious"
  | "focused"
  | "overwhelmed"
  | "drifting";

export function getFeedEmotion(): FeedEmotion {
  const state = getStreamState();

  const scroll = state.scrollDepth;
  const clicks = state.clickIntensity;
  const idle =
    Date.now() - state.lastInteractionTime;

  /* -----------------------------
     OVERWHELMED (fast interaction loop)
  ------------------------------*/
  if (clicks > 0.75 && scroll > 0.6) {
    return "overwhelmed";
  }

  /* -----------------------------
     FOCUSED (deep + stable engagement)
  ------------------------------*/
  if (scroll > 0.7 && clicks > 0.4) {
    return "focused";
  }

  /* -----------------------------
     CURIOUS (exploration behavior)
  ------------------------------*/
  if (scroll > 0.4 && clicks > 0.2) {
    return "curious";
  }

  /* -----------------------------
     BORED (low everything)
  ------------------------------*/
  if (scroll < 0.3 && clicks < 0.2) {
    return "bored";
  }

  /* -----------------------------
     DRIFTING (inactive but not dead)
  ------------------------------*/
  if (idle > 60_000) {
    return "drifting";
  }

  return "curious";
}