import { getEngagementLevel } from "@/app/lib/sessionSignals";
import { getSessionPersona } from "@/app/lib/sessionPersonality";
import { getStreamState } from "./streamStateEngine";
import { getFeedEmotion } from "./feedEmotionEngine";
import { getStreamBiasSignals } from "./streamBiasEngine";

export type StreamMode = "forYou" | "explore" | "mixed";

interface SwitchContext {
  scrollDepth?: number;
  sessionTime?: number;
  lastInteractionGap?: number;
}

/* -----------------------------
   ✅ CANONICAL WEIGHTS (SINGLE SOURCE OF TRUTH)
------------------------------*/
export function getStreamWeights() {
  return {
    ENGAGEMENT: 1,
    STABILITY: 0.8,
    DISCOVERY: 1,
    TREND: 0.7,
  };
}

/* -----------------------------
   STREAM MODE ENGINE
------------------------------*/
export function getActiveStreamMode(
  ctx: SwitchContext = {}
): StreamMode {
  const engagement = getEngagementLevel();
  const persona = getSessionPersona();
  const state = getStreamState();
  const emotion = getFeedEmotion();

  const bias = getStreamBiasSignals();

  const scroll = ctx.scrollDepth ?? state.scrollDepth ?? 0.5;
  const idle = ctx.lastInteractionGap ?? 10;

  let forYouBias = 50;
  let exploreBias = 50;

  /* -----------------------------
     CORE SIGNALS
  ------------------------------*/
  if (engagement === "HIGH") {
    forYouBias += 25;
    exploreBias -= 10;
  }

  if (engagement === "LOW") {
    exploreBias += 30;
    forYouBias -= 15;
  }

  if (scroll > 0.7) forYouBias += 10;
  if (scroll < 0.3) exploreBias += 10;

  if (idle > 45) exploreBias += 20;
  if (idle < 10) forYouBias += 15;

  if (persona.mood === "curious") exploreBias += 15;
  if (persona.mood === "focused") forYouBias += 15;

  /* -----------------------------
     EMOTION LAYER
  ------------------------------*/
  if (emotion === "focused") forYouBias += 20;

  if (emotion === "curious") {
    exploreBias += 15;
    forYouBias += 5;
  }

  if (emotion === "bored") exploreBias += 25;

  if (emotion === "overwhelmed") {
    forYouBias += 10;
    exploreBias += 10;
  }

  if (emotion === "drifting") exploreBias += 20;

  /* -----------------------------
     🧠 6.8C BIAS SIGNAL LAYER (NEW)
  ------------------------------*/
  forYouBias += bias.engagementBoost * 100;
  exploreBias += bias.explorationBoost * 100;

  /* -----------------------------
     FINAL DECISION
  ------------------------------*/
  if (Math.abs(forYouBias - exploreBias) < 10) {
    return "mixed";
  }

  return forYouBias > exploreBias ? "forYou" : "explore";
}