import { NextResponse } from "next/server";
import { getFeed } from "@/app/lib/feedEngine";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const brandId = searchParams.get("brandId") || undefined;

    const limit = Math.min(
      Math.max(Number(searchParams.get("limit") || 10), 1),
      50
    );

    const cursor = Number(searchParams.get("cursor") || 0);

    const fullFeed = getFeed(brandId) || [];

    /* -----------------------------
       UNIFIED DTO NORMALISATION
    ------------------------------*/
    const safeFeed = fullFeed.map((item) => {
      if (item.type !== "creator") {
        return {
          ...item,
          score: Number(item.score || 0),
        };
      }

      const c = item.creator;

      return {
        type: "creator",
        creator: {
          id: c.id,
          name: c.name,
          category: c.category,
          avatar: c.avatar,
          followers: c.followers,
          engagementRate: c.engagementRate,
          pastBrandScore: c.pastBrandScore,
          score: c.score,
          trend: c.trend,
          trendColor: c.trendColor,
        },
        score: c.score,
      };
    });

    const slice = safeFeed.slice(cursor, cursor + limit);

    return NextResponse.json({
      success: true,
      data: slice,
      nextCursor: cursor + limit < safeFeed.length ? cursor + limit : null,
    });
  } catch (e) {
    return NextResponse.json(
      { success: false, error: "FEED_FAILED", data: [] },
      { status: 500 }
    );
  }
}