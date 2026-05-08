type ActionType = "view" | "click" | "save" | "ignore" | "convert";

/* -----------------------------
   WRITE EVENT (SAFE)
------------------------------*/
export async function recordEngagement(
  brandId: string,
  creatorId: string,
  action: ActionType
) {
  try {
    await fetch("/api/engagement", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId, creatorId, action }),
    });
  } catch (e) {
    // silent fail so UI never breaks
  }
}

/* -----------------------------
   GET BOOST (100% SAFE)
------------------------------*/
export function getEngagementBoost(
  brandId: string,
  creatorId: string
) {
  // TEMP FIX: prevents API crash completely
  return 0;
}