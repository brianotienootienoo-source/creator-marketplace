import { getMarketplaceFeed } from "@/app/lib/marketplace/orchestrator/marketplaceOrchestrator";
import CreatorCard from "@/app/components/ui/CreatorCard";
import BrandCampaignCard from "@/app/components/ui/BrandCampaignCard";
import CreatorSignalCard from "@/app/components/ui/CreatorSignalCard";
import FeedModeSwitcher from "./components/FeedModeSwitcher";
import Text from "@/app/components/ui/Text";

import { getFeedVisualStyle } from "@/app/lib/marketplace/feed/feedVisualStyle";

type Props = {
  searchParams?: {
    mode?: string;
    brandId?: string;
  };
};

export default function FeedPage({ searchParams }: Props) {
  const result = getMarketplaceFeed({
    pathname: "/feed",
    brandId: searchParams?.brandId,
    forceMode: searchParams?.mode as any,
  });

  const creators = result.data.filter((i: any) => i.type === "creator");
  const brands = result.data.filter((i: any) => i.type === "brand");

  const visual = getFeedVisualStyle(result.mode as any);

  function getCardEmphasis(mode: string, index: number) {
    switch (mode) {
      case "TREND_HEAVY":
        return index < 3 ? 1.03 : 1;

      case "ENGAGEMENT_HEAVY":
        return index < 5 ? 1.01 : 1;

      case "DISCOVERY_HEAVY":
        return 1;

      case "PREMIUM_STABLE":
        return 1;

      default:
        return 1;
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: 24,
      }}
    >
      {/* HERO */}
      <div style={{ marginBottom: 18 }}>
        <Text size="2xl" weight={700}>
          Marketplace Feed
        </Text>

        <div style={{ marginTop: 6 }}>
          <Text size="sm" muted>
            Mode: <b>{result.mode}</b> | Source: <b>{result.source}</b>
          </Text>
        </div>

        <div style={{ marginTop: 12 }}>
          <FeedModeSwitcher />
        </div>
      </div>

      {/* DEBUG STRIP */}
      <div
        style={{
          marginBottom: 18,
          padding: "10px 14px",
          border: "1px solid #eee",
          borderRadius: 10,
          background: "#fafafa",
        }}
      >
        <Text size="xs" muted>
          Total Items: {result.data.length} | Creators: {creators.length} | Brands: {brands.length}
        </Text>
      </div>

      {/* CREATORS */}
      <div style={{ marginBottom: 28 }}>
        <Text size="md" weight={600} style={{ marginBottom: 10 }}>
          Creators
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: visual.gap,
          }}
        >
          {creators.map((item: any, index: number) => {
            const scale = getCardEmphasis(result.mode, index);

            if (item.intelligence) {
              return (
                <div
                  key={item.id}
                  style={{
                    transform: `scale(${scale})`,
                    transition: "transform 0.2s ease",
                  }}
                >
                  <CreatorSignalCard
                    creator={{
                      id: item.id,
                      name: item.name,
                      avatar: item.avatar,
                      category: item.category,
                    }}
                    intelligence={{
                      matchScore: item.intelligence?.matchScore ?? 0,
                      trendScore: item.intelligence?.trendScore ?? 0,
                      ratingScore:
                        item.intelligence?.ratingScore ?? item.score ?? 0,
                      readinessTier: item.intelligence?.readinessTier ?? "C",
                      reason: item.intelligence?.reason,
                    }}
                  />
                </div>
              );
            }

            return (
              <div
                key={item.id}
                style={{
                  transform: `scale(${scale})`,
                  transition: "transform 0.2s ease",
                }}
              >
                <CreatorCard
                  creator={{
                    id: item.id,
                    name: item.name,
                    category: item.category,
                    avatar: item.avatar,
                  }}
                  score={item.score}
                  compact
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* BRANDS */}
      <div>
        <Text size="md" weight={600} style={{ marginBottom: 10 }}>
          Brands
        </Text>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: visual.gap,
          }}
        >
          {brands.map((item: any) => (
            <BrandCampaignCard
              key={item.id}
              title={item.name}
              niche={item.subtitle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}