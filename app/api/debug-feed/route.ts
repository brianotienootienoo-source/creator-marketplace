import { NextResponse } from "next/server";
import { getCreatorUniverse } from "@/app/lib/creatorUniverse";
import { getBrandUniverse } from "@/app/lib/brandUniverse";
import { buildFeedV2 } from "@/app/lib/feedV2";
import { getMarketplaceFeed } from "@/app/lib/marketplace/orchestrator/marketplaceOrchestrator";

export async function GET() {
  const creators = getCreatorUniverse();
  const brands = getBrandUniverse();
  const v2 = buildFeedV2();
  const orchestrated = getMarketplaceFeed({ pathname: "/" });

  return NextResponse.json({
    creatorsCount: creators?.length ?? 0,
    brandsCount: brands?.length ?? 0,
    v2Count: v2?.length ?? 0,
    orchestratedCount: orchestrated?.length ?? 0,
    sampleCreator: creators?.[0] ?? null,
    sampleBrand: brands?.[0] ?? null,
  });
}