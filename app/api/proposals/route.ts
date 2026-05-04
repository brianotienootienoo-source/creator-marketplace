import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "proposals.json");

/* -----------------------
   READ FILE
------------------------*/
function readProposals() {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch {
    return [];
  }
}

/* -----------------------
   WRITE FILE
------------------------*/
function writeProposals(data: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

/* -----------------------
   GET
------------------------*/
export async function GET() {
  const proposals = readProposals();
  return NextResponse.json({ proposals });
}

/* -----------------------
   POST (FIXED CORE LOGIC)
------------------------*/
export async function POST(req: Request) {
  const body = await req.json();

  const proposals = readProposals();

  // 🔒 1. BASIC VALIDATION (prevents garbage entries)
  if (!body.creatorId || !body.brandId) {
    return NextResponse.json(
      { success: false, error: "Missing creatorId or brandId" },
      { status: 400 }
    );
  }

  const creatorId = String(body.creatorId).toLowerCase().trim();
  const brandId = String(body.brandId).toLowerCase().trim();

  // 🔒 2. DUPLICATE GUARD (THIS FIXES YOUR SPAM ISSUE)
  const existing = proposals.find(
    (p: any) =>
      p.creatorId === creatorId &&
      p.brandId === brandId &&
      p.status === "pending"
  );

  if (existing) {
    return NextResponse.json({
      success: true,
      proposal: existing,
      deduped: true,
    });
  }

  // 🔥 3. CREATE CLEAN PROPOSAL OBJECT
  const newProposal = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    creatorId,
    brandId,
    message: body.message || "",
    campaignId: body.campaignId || null, // IMPORTANT for fixing "Unknown Campaign"
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  proposals.push(newProposal);
  writeProposals(proposals);

  return NextResponse.json({
    success: true,
    proposal: newProposal,
  });
}