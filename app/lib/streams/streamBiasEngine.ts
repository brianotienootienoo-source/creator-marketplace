import { getStreamState } from "./streamStateEngine";

export type StreamBiasSignals = {
  engagementBoost: number;
  explorationBoost: number;
};

export function getStreamBiasSignals(): StreamBiasSignals {
  const state = getStreamState();

  const inactivity = Date.now() - state.lastInteractionTime;

  let engagementBoost = 0;
  let explorationBoost = 0;

  // heavy engagement → favor forYou
  if (state.clickIntensity > 0.7) {
    engagementBoost += 0.3;
  }

  // deep scrolling → stable engagement
  if (state.scrollDepth > 0.7) {
    engagementBoost += 0.2;
  }

  // drift → curiosity / exploration
  if (state.driftFactor > 0.6) {
    explorationBoost += 0.4;
  }

  // inactivity → exploration push
  if (inactivity > 1000 * 60 * 2) {
    explorationBoost += 0.3;
  }

  // low engagement → exploration fallback
  if (state.clickIntensity < 0.2) {
    explorationBoost += 0.2;
  }

  return {
    engagementBoost,
    explorationBoost,
  };
}