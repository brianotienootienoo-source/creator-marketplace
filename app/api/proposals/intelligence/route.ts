import { NextResponse } from "next/server";
import { getProposalIntelligence } from "@/app/lib/workspace/proposals/proposalIntelligenceBridge";
import { getProposalRealtimeFeed } from "@/app/lib/workspace/proposals/proposalRealtimeFeed";

/**
 * 🧠 A2 PROPOSAL INTELLIGENCE API
 * Single entry point for dashboard + future feed UI
 */

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const creatorId = searchParams.get("creatorId") || "creator-1";
    const mode = searchParams.get("mode") || "intelligence";

    // CORE INTELLIGENCE LAYER (always computed)
    const intelligence = getProposalIntelligence(creatorId);

    // OPTIONAL REALTIME FEED LAYER
    const feed =
      mode === "feed"
        ? getProposalRealtimeFeed(creatorId)
        : undefined;

    return NextResponse.json({
      success: true,
      mode,

      data: {
        intelligence,
        feed: feed ?? null,
      },

      meta: {
        source: "A2_PROPOSAL_INTELLIGENCE_CORE",
        creatorId,
        timestamp: Date.now(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "PROPOSAL_INTELLIGENCE_API_FAILED",
        data: {
          intelligence: null,
          feed: null,
        },
      },
      { status: 500 }
    );
  }
}