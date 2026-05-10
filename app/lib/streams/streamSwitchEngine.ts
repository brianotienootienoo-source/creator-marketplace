import { getEngagementLevel } from "@/app/lib/sessionSignals";
import { getSessionPersona } from "@/app/lib/sessionPersonality";
import { getStreamState } from "./streamStateEngine";
import { getFeedEmotion } from "./feedEmotionEngine";

export type StreamMode = "forYou" | "explore" | "mixed";

interface SwitchContext {
  scrollDepth?: number;
  sessionTime?: number;
  lastInteractionGap?: number;
}

/* -----------------------------
   STREAM MODE ENGINE (6.7 LOCK)
   - ONLY decides stream mode
   - NO scoring ownership
   - NO weights ownership
------------------------------*/
export function getActiveStreamMode(
  ctx: SwitchContext = {}
): StreamMode {
  const engagement = getEngagementLevel();
  const persona = getSessionPersona();
  const state = getStreamState();
  const emotion = getFeedEmotion();

  const scroll = ctx.scrollDepth ?? state.scrollDepth ?? 0.5;
  const idle = ctx.lastInteractionGap ?? 10;

  let forYouBias = 50;
  let exploreBias = 50;

  /* -----------------------------
     ENGAGEMENT SIGNALS
  ------------------------------*/
  if (engagement === "HIGH") {
    forYouBias += 25;
    exploreBias -= 10;
  }

  if (engagement === "LOW") {
    exploreBias += 30;
    forYouBias -= 15;
  }

  /* -----------------------------
     SCROLL SIGNALS
  ------------------------------*/
  if (scroll > 0.7) {
    forYouBias += 10;
  }

  if (scroll < 0.3) {
    exploreBias += 10;
  }

  /* -----------------------------
     SESSION FATIGUE
  ------------------------------*/
  if (idle > 45) {
    exploreBias += 20;
  }

  if (idle < 10) {
    forYouBias += 15;
  }

  /* -----------------------------
     PERSONA SIGNALS
  ------------------------------*/
  if (persona.mood === "curious") {
    exploreBias += 15;
  }

  if (persona.mood === "focused") {
    forYouBias += 15;
  }

  /* -----------------------------
     EMOTION SIGNALS
  ------------------------------*/
  if (emotion === "focused") {
    forYouBias += 20;
  }

  if (emotion === "curious") {
    exploreBias += 15;
    forYouBias += 5;
  }

  if (emotion === "bored") {
    exploreBias += 25;
  }

  if (emotion === "overwhelmed") {
    forYouBias += 10;
    exploreBias += 10;
  }

  if (emotion === "drifting") {
    exploreBias += 20;
  }

  /* -----------------------------
     FINAL DECISION
  ------------------------------*/
  if (Math.abs(forYouBias - exploreBias) < 10) {
    return "mixed";
  }

  return forYouBias > exploreBias
    ? "forYou"
    : "explore";
}