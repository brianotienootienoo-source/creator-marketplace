import { updatePersonaDrift } from "./personaDrift";
import { getEngagementLevel } from "./sessionSignals";

let interactionCount = 0;

/* -----------------------------
   TRACK SESSION ACTIVITY
------------------------------*/
export function registerSessionInteraction() {
  interactionCount++;
}

/* -----------------------------
   GET CURRENT SESSION DRIFT
------------------------------*/
export function getSessionPersona() {
  const engagementLevel = getEngagementLevel();

  return updatePersonaDrift(
    engagementLevel,
    interactionCount
  );
}

/* -----------------------------
   RESET SESSION (optional)
------------------------------*/
export function resetSessionPersona() {
  interactionCount = 0;
}