type StreamState = {
  scrollDepth: number;
  lastInteractionTime: number;
  clickIntensity: number;
  currentBias: "forYou" | "explore" | "mixed";

  liveEngagement: number;
  driftFactor: number;
};

const state: StreamState = {
  scrollDepth: 0,
  lastInteractionTime: Date.now(),
  clickIntensity: 0,
  currentBias: "forYou",

  liveEngagement: 0,
  driftFactor: 0,
};

/* -----------------------------
   SCROLL TRACKING
------------------------------*/
export function updateScrollDepth(depth: number) {
  state.scrollDepth = Math.max(0, Math.min(1, depth));

  state.liveEngagement =
    state.liveEngagement * 0.9 + state.scrollDepth * 0.1;
}

/* -----------------------------
   INTERACTION TRACKING
------------------------------*/
export function registerInteraction(intensity: number = 0.2) {
  state.lastInteractionTime = Date.now();

  state.clickIntensity = Math.min(
    1,
    state.clickIntensity + intensity
  );

  state.driftFactor = Math.min(
    1,
    state.driftFactor + intensity * 0.6
  );
}

/* -----------------------------
   DECAY SYSTEM
------------------------------*/
setInterval(() => {
  state.clickIntensity = Math.max(0, state.clickIntensity - 0.03);
  state.liveEngagement = Math.max(0, state.liveEngagement - 0.01);
  state.driftFactor = Math.max(0, state.driftFactor - 0.02);
}, 3000);

/* -----------------------------
   STATE ACCESS
------------------------------*/
export function getStreamState() {
  return state;
}