// app/lib/proposals.ts

export type Proposal = {
  id: string;
  creatorId: string;
  brandId: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: number;
};

/* -------------------------
   CREATE PROPOSAL (API ONLY)
--------------------------*/
export async function createProposal(input: {
  creatorId: string;
  brandId: string;
  message: string;
}) {
  try {
    const res = await fetch("/api/proposals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    return await res.json();
  } catch (err) {
    console.error("❌ createProposal failed:", err);
    return null;
  }
}