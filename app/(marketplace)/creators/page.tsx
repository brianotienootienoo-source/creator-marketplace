import CreatorCard from "@/app/components/ui/CreatorCard";
import { mockCreators } from "@/app/lib/marketplace/mock/mockCreators";
import { gridSystem } from "@/app/lib/design/gridSystem";

export default function CreatorsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Creators</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(auto-fill, minmax(${gridSystem.creators.min}px, ${gridSystem.creators.max}px))`,
          gap: gridSystem.gap,
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
              (creator.stats.engagementRate * 100) +
              (creator.stats.followers / 10000)
            )}
            compact={true}
          />
        ))}
      </div>
    </div>
  );
}