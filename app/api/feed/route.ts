import { NextResponse } from "next/server";
import { getMarketplaceFeed } from "@/app/lib/marketplace/orchestrator/marketplaceOrchestrator";
import { getProposalRealtimeFeed } from "@/app/lib/workspace/proposals/proposalRealtimeFeed";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const brandId = searchParams.get("brandId") || undefined;

    const modeParam = searchParams.get("mode");
    const forceMode =
      modeParam && modeParam !== "AUTO"
        ? (modeParam as any)
        : undefined;

    const stream = searchParams.get("stream") || "marketplace";

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 10), 1),
      50
    );

    const cursor = Number(searchParams.get("cursor") || 0);

    // -----------------------------
    // STREAM ROUTING (SAFE EXTENSION)
    // -----------------------------
    const result =
      stream === "proposal"
        ? {
            data: getProposalRealtimeFeed("c1"),
            mode: "PROPOSAL_INTEL",
            source: "A2_REALTIME_PROPOSAL_STREAM",
          }
        : getMarketplaceFeed({
            pathname: "/",
            brandId,
            forceMode,
          });

    const safeFeed = Array.isArray(result?.data)
      ? result.data
      : [];

    const slice = safeFeed.slice(cursor, cursor + limit);

    return NextResponse.json({
      success: true,
      data: slice,
      nextCursor:
        cursor + limit < safeFeed.length ? cursor + limit : null,

      meta: {
        mode: result?.mode,
        source: result?.source,
        forced: Boolean(forceMode),
        stream, // 👈 NEW SAFE DEBUG FLAG
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