export type PersonaMood =
  | "EXPLORE"
  | "FOCUSED"
  | "FATIGUED"
  | "ENGAGED";

type DriftState = {
  mood: PersonaMood;
  volatility: number;
  curiosity: number;
  fatigue: number;
  stability: number;
};

const state: DriftState = {
  mood: "EXPLORE",
  volatility: 0.5,
  curiosity: 0.7,
  fatigue: 0.2,
  stability: 0.5,
};

export function getPersonaState() {
  return { ...state };
}

/* -----------------------------
   CORE DRIFT UPDATE
------------------------------*/
export function updatePersonaDrift(
  engagementLevel: "HIGH" | "MEDIUM" | "LOW",
  interactionCount: number
) {
  // fatigue increases over time
  state.fatigue += interactionCount * 0.01;

  // curiosity shifts depending on engagement
  if (engagementLevel === "HIGH") {
    state.curiosity += 0.05;
  } else if (engagementLevel === "LOW") {
    state.curiosity -= 0.05;
  }

  // clamp values
  state.fatigue = clamp01(state.fatigue);
  state.curiosity = clamp01(state.curiosity);

  // derive mood
  state.mood = deriveMood();
  state.volatility = deriveVolatility();
  state.stability = 1 - state.volatility;

  return { ...state };
}

/* -----------------------------
   MOOD LOGIC
------------------------------*/
function deriveMood(): PersonaMood {
  if (state.fatigue > 0.7) return "FATIGUED";
  if (state.curiosity > 0.7) return "EXPLORE";
  if (state.stability > 0.7) return "FOCUSED";
  return "ENGAGED";
}

/* -----------------------------
   VOLATILITY
------------------------------*/
function deriveVolatility() {
  return clamp01(
    state.curiosity * 0.6 + state.fatigue * 0.4
  );
}

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}