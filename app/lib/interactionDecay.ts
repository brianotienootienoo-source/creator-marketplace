import {
  decayCreatorAffinity,
} from "./creatorAffinity";

import {
  decayNicheAffinity,
} from "./nicheAffinity";

/* -----------------------------
   DECAY CONFIG
------------------------------*/
const DECAY_INTERVAL = 60 * 1000; // 1 min

let intervalStarted = false;

/* -----------------------------
   CORE DECAY ENGINE
------------------------------*/
export function startInteractionDecay() {
  if (intervalStarted) return;

  intervalStarted = true;

  setInterval(() => {
    decayCreatorAffinity();
    decayNicheAffinity();
  }, DECAY_INTERVAL);
}

/* -----------------------------
   MANUAL TRIGGER (optional)
------------------------------*/
export function runDecayTick() {
  decayCreatorAffinity();
  decayNicheAffinity();
}