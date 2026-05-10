export type StreamWeights = {
  ENGAGEMENT: number;
  STABILITY: number;
  DISCOVERY: number;
  TREND: number;
};

/* -----------------------------
   SINGLE SOURCE OF TRUTH
------------------------------*/
export function getStreamWeights(): StreamWeights {
  return {
    ENGAGEMENT: 1,
    STABILITY: 0.8,
    DISCOVERY: 1,
    TREND: 0.7,
  };
}