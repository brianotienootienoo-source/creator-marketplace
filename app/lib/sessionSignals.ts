type SessionSignalState = {
  totalInteractions: number;
  creatorViews: number;
  creatorRevisits: number;
  nicheInteractions: number;
  engagementIntensity: number;
};

const sessionSignals: SessionSignalState = {
  totalInteractions: 0,
  creatorViews: 0,
  creatorRevisits: 0,
  nicheInteractions: 0,
  engagementIntensity: 0,
};

export function trackInteraction(
  intensity = 1
) {
  sessionSignals.totalInteractions += 1;

  sessionSignals.engagementIntensity += intensity;
}

export function trackCreatorView(
  revisit = false
) {
  sessionSignals.creatorViews += 1;

  if (revisit) {
    sessionSignals.creatorRevisits += 1;
  }
}

export function trackNicheInteraction() {
  sessionSignals.nicheInteractions += 1;
}

export function getSessionSignals() {
  return {
    ...sessionSignals,
  };
}

export function getEngagementLevel() {
  const intensity =
    sessionSignals.engagementIntensity;

  if (intensity > 80) {
    return "HIGH";
  }

  if (intensity > 35) {
    return "MEDIUM";
  }

  return "LOW";
}