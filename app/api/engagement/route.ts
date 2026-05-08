import { NextResponse } from "next/server";
import { db } from "@/app/lib/db";

type ActionType = "view" | "click" | "save" | "ignore" | "convert";

/* -----------------------------
   WEIGHT SYSTEM
------------------------------*/
function getWeight(action: ActionType) {
  switch (action) {
    case "view":
      return 1;
    case "click":
      return 3;
    case "save":
      return 6;
    case "ignore":
      return -3;
    case "convert":
      return 10;
    default:
      return 0;
  }
}

/* -----------------------------
   GET ALL EVENTS
------------------------------*/
export async function GET() {
  const data = await db.engagement.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({
    success: true,
    data,
  });
}

/* -----------------------------
   WRITE EVENT
------------------------------*/
export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.engagement.create({
      data: {
        brandId: body.brandId,
        creatorId: body.creatorId,
        action: body.action,
        weight: getWeight(body.action),
      },
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false },
      { status: 400 }
    );
  }
}