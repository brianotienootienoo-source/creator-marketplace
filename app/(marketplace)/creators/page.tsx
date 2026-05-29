import CreatorCard from "@/app/components/ui/CreatorCard";
import { mockCreators } from "@/app/lib/marketplace/mock/mockCreators";
import { gridSystem } from "@/app/lib/design/gridSystem";

export default function CreatorsPage() {
  return (
    <div
      style={{
        width: "100%",
        padding: gridSystem.pagePadding,
        maxWidth: gridSystem.pageMaxWidth,
        margin: "0 auto",
      }}
    >
      <h1 className="text-2xl font-bold mb-6">Creators</h1>

      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: `repeat(auto-fill, minmax(${gridSystem.creators.min}px, ${gridSystem.creators.max}px))`,
          gap: gridSystem.gap,
          alignItems: "stretch",
        }}
      >
        {mockCreators.map((creator) => (
          <CreatorCard
            key={creator.id}
            creator={{
              id: creator.id,
              name: creator.displayName,
              category: creator.niche,
              avatar: creator.avatar,
            }}
            score={Math.round(
              creator.stats.engagementRate * 100 +
                creator.stats.followers / 10000
            )}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
}