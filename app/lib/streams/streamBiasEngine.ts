import { getStreamState } from "./streamStateEngine";

/* -----------------------------
   LEGACY MODE SIGNAL (6.6 LOCK)
   - kept only as fallback/debug layer
------------------------------*/

export function getDynamicStreamMode():
  | "forYou"
  | "explore"
  | "mixed" {
  const state = getStreamState();

  const inactivity = Date.now() - state.lastInteractionTime;

  if (state.clickIntensity > 0.75) return "forYou";
  if (state.scrollDepth > 0.75) return "mixed";
  if (inactivity > 1000 * 60 * 2) return "explore";

  return "forYou";
}