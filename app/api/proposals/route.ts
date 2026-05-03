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
   POST
------------------------*/
export async function POST(req: Request) {
  const body = await req.json();

  const proposals = readProposals();

  const newProposal = {
    id: Date.now().toString(),
    creatorId: body.creatorId,
    brandId: body.brandId,
    message: body.message,
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