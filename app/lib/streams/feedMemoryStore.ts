type MemoryRecord = {
  id: string;
  penalty: number;
  lastUpdated: number;
  interactions: number;
};

const MEMORY_KEY = "feed_memory_store_v1";

let memory: Record<string, MemoryRecord> = {};

/* -----------------------------
   HYDRATION (cross-session load)
------------------------------*/
if (typeof window !== "undefined") {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    if (raw) memory = JSON.parse(raw);
  } catch {}
}

/* -----------------------------
   SAVE MEMORY
------------------------------*/
function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(MEMORY_KEY, JSON.stringify(memory));
}

/* -----------------------------
   UPDATE MEMORY PENALTY
------------------------------*/
export function updateMemory(id: string, delta: number = 0.1) {
  const now = Date.now();

  const existing = memory[id] ?? {
    id,
    penalty: 0,
    lastUpdated: now,
    interactions: 0,
  };

  existing.penalty = Math.min(1, existing.penalty + delta);
  existing.lastUpdated = now;
  existing.interactions += 1;

  memory[id] = existing;
  persist();
}

/* -----------------------------
   GET MEMORY PENALTY
------------------------------*/
export function getMemoryPenalty(id: string): number {
  const record = memory[id];

  if (!record) return 0;

  const decay =
    (Date.now() - record.lastUpdated) / (1000 * 60 * 60); // hours

  const decayedPenalty = record.penalty - decay * 0.02;

  return Math.max(0, decayedPenalty);
}

/* -----------------------------
   RESET (debug only)
------------------------------*/
export function clearMemory() {
  memory = {};
  persist();
}