type MemoryEntry = {
  id: string;
  score: number;
  lastSeen: number;
  strength: number;
};

const creatorMemory: Record<string, MemoryEntry> = {};
const nicheMemory: Record<string, MemoryEntry> = {};

/* -----------------------------
   CREATOR MEMORY
------------------------------*/
export function updateCreatorMemory(
  creatorId: string,
  interactionStrength: number
) {
  const now = Date.now();

  const existing = creatorMemory[creatorId];

  if (!existing) {
    creatorMemory[creatorId] = {
      id: creatorId,
      score: interactionStrength,
      lastSeen: now,
      strength: interactionStrength,
    };
    return;
  }

  existing.score += interactionStrength * 0.8;
  existing.strength = Math.min(10, existing.strength + interactionStrength);
  existing.lastSeen = now;
}

/* -----------------------------
   NICHE MEMORY
------------------------------*/
export function updateNicheMemory(
  niche: string,
  interactionStrength: number
) {
  const now = Date.now();

  const existing = nicheMemory[niche];

  if (!existing) {
    nicheMemory[niche] = {
      id: niche,
      score: interactionStrength,
      lastSeen: now,
      strength: interactionStrength,
    };
    return;
  }

  existing.score += interactionStrength * 0.6;
  existing.strength = Math.min(10, existing.strength + interactionStrength);
  existing.lastSeen = now;
}

/* -----------------------------
   GETTERS
------------------------------*/
export function getCreatorMemoryScore(id: string) {
  return creatorMemory[id]?.score ?? 0;
}

export function getNicheMemoryScore(niche: string) {
  return nicheMemory[niche]?.score ?? 0;
}

/* -----------------------------
   FULL SNAPSHOT
------------------------------*/
export function getFullMemorySnapshot() {
  return {
    creators: creatorMemory,
    niches: nicheMemory,
  };
}