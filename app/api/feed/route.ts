import { NextResponse } from "next/server";
import { getMarketplaceFeed } from "@/app/lib/marketplace/orchestrator/marketplaceOrchestrator";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const brandId = searchParams.get("brandId") || undefined;

    const modeParam = searchParams.get("mode");
    const forceMode = modeParam && modeParam !== "AUTO"
      ? (modeParam as any)
      : undefined;

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 10), 1),
      50
    );

    const cursor = Number(searchParams.get("cursor") || 0);

    /**
     * 🧠 ORCHESTRATOR CALL (25A CONTROLLED)
     */
    const result = getMarketplaceFeed({
      pathname: "/",
      brandId,
      forceMode,
    });

    /**
     * 🔒 SAFE FEED EXTRACTION
     */
    const safeFeed = Array.isArray(result?.data)
      ? result.data
      : [];

    const slice = safeFeed.slice(cursor, cursor + limit);

    /**
     * 📦 RESPONSE
     */
    return NextResponse.json({
      success: true,
      data: slice,
      nextCursor:
        cursor + limit < safeFeed.length ? cursor + limit : null,

      meta: {
        mode: result?.mode,
        source: result?.source,
        forced: Boolean(forceMode),
      },
    });
  } catch (e) {
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