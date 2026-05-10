import {
  boostCreatorAffinity,
} from "./creatorAffinity";

import {
  boostNicheAffinity,
} from "./nicheAffinity";

import {
  trackInteraction,
  trackCreatorView,
  trackNicheInteraction,
} from "./sessionSignals";

/* -----------------------------
   TYPES
------------------------------*/
type EngagementType =
  | "CREATOR_VIEW"
  | "CREATOR_REVISIT"
  | "NICHE_CLICK"
  | "BRAND_CLICK"
  | "MATCH_CLICK";

/* -----------------------------
   CORE TRACKER
------------------------------*/
export function trackEngagement(
  type: EngagementType,
  payload: {
    creatorId?: string;
    niche?: string;
    intensity?: number;
  }
) {
  const intensity =
    payload.intensity ?? 1;

  trackInteraction(intensity);

  switch (type) {
    case "CREATOR_VIEW":
      if (payload.creatorId) {
        boostCreatorAffinity(
          payload.creatorId,
          1 * intensity
        );

        trackCreatorView(false);
      }
      break;

    case "CREATOR_REVISIT":
      if (payload.creatorId) {
        boostCreatorAffinity(
          payload.creatorId,
          2 * intensity
        );

        trackCreatorView(true);
      }
      break;

    case "NICHE_CLICK":
      if (payload.niche) {
        boostNicheAffinity(
          payload.niche,
          1.5 * intensity
        );

        trackNicheInteraction();
      }
      break;

    case "BRAND_CLICK":
      trackInteraction(1.2 * intensity);
      break;

    case "MATCH_CLICK":
      trackInteraction(1.5 * intensity);
      break;
  }
}