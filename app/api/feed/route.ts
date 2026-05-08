import { NextResponse } from "next/server";
import { getFeed } from "@/app/lib/feedEngine";

/* -----------------------------
   CURSOR-BASED FEED API (HARDENED)
------------------------------*/
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const brandId = searchParams.get("brandId") || undefined;

    const limitRaw = Number(searchParams.get("limit") || 10);
    const limit = Math.min(Math.max(limitRaw, 1), 50);

    const cursorRaw = Number(searchParams.get("cursor") || 0);
    const cursor = Number.isFinite(cursorRaw) ? cursorRaw : 0;

    const fullFeed = getFeed(brandId) || [];

    // 🔥 HARD GUARD: ensures score is ALWAYS a number
    const safeFeed = fullFeed.map((item) => ({
      creator: item?.creator,
      score: Number.isFinite(item?.score) ? item.score : 0,
      reason: item?.reason ?? "AI-ranked adaptive model",
    }));

    const slice = safeFeed.slice(cursor, cursor + limit);

    const nextCursor =
      cursor + limit < safeFeed.length ? cursor + limit : null;

    return NextResponse.json({
      success: true,
      data: slice,
      nextCursor,
      hasMore: nextCursor !== null,
    });
  } catch (error) {
    console.error("Feed API error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "FEED_FAILED",
        data: [],
      },
      { status: 500 }
    );
  }
}