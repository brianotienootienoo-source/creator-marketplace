import { NextResponse } from "next/server";
import { addApplication } from "@/app/lib/applicationsStore";

export async function POST(req: Request) {
  const body = await req.json();

  const { brandId, creatorId, message } = body;

  if (!brandId || !creatorId) {
    return NextResponse.json(
      { error: "Missing fields" },
      { status: 400 }
    );
  }

  const app = addApplication({
    brandId,
    creatorId,
    message: message || "No message provided",
  });

  return NextResponse.json(app);
}