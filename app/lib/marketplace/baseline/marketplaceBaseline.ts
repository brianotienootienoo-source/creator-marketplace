export const MARKETPLACE_BASELINE_25A = {
  version: "25A_STABLE_1",
  modes: [
    "AUTO",
    "PREMIUM_STABLE",
    "ENGAGEMENT_HEAVY",
    "TREND_HEAVY",
  ],

  requiredFeedItemShape: {
    type: ["creator", "brand", "match"],
    requiredFields: ["id", "name", "score"],
  },

  contracts: {
    creator: ["id", "name", "category", "avatar", "score"],
    brand: ["id", "name", "subtitle", "score"],
    match: ["id", "name", "subtitle", "score"],
  },
};