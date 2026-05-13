import { creators as legacyCreators } from "@/app/data/creators";
import { adaptLegacyCreators } from "@/app/lib/marketplace/adapters/legacyCreatorsAdapter";

export default async function CreatorProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const creators = adaptLegacyCreators(legacyCreators);

  const creator = creators.find((c) => c.id === id);

  if (!creator) {
    return (
      <div className="p-6">
        Creator not found
        <br />
        <span className="text-sm text-gray-500">
          Looking for ID: {id}
        </span>
      </div>
    );
  }

  const avatarSrc =
    creator.avatar || `https://i.pravatar.cc/150?u=${creator.id}`;

  const bannerSrc =
    creator.bannerImage ||
    `https://picsum.photos/1200/400?random=${creator.id}`;

  return (
    <div className="max-w-4xl mx-auto pb-10">

      {/* ===================== */}
      {/* BANNER SECTION */}
      {/* ===================== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 260,
        }}
      >
        <img
          src={bannerSrc}
          alt="creator banner"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            borderRadius: 16,
          }}
        />

        {/* AVATAR OVERLAY */}
        <div
          style={{
            position: "absolute",
            bottom: -18,
            left: 6,
            width: 92,
            height: 92,
            borderRadius: "9999px",
            overflow: "hidden",
            border: "4px solid white",
            background: "#eee",
            boxShadow: "0 6px 16px rgba(0,0,0,0.18)",
            flexShrink: 0,
          }}
        >
          <img
            src={avatarSrc}
            alt={creator.displayName}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              borderRadius: "9999px",
            }}
          />
        </div>
      </div>

      {/* ===================== */}
      {/* PROFILE IDENTITY */}
      {/* ===================== */}
      <div
        style={{
          paddingTop: 44,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            margin: 0,
            lineHeight: 1.05,
          }}
        >
          {creator.displayName}
        </h1>

        <p
          style={{
            color: "#666",
            marginTop: 2,
            fontSize: 15,
          }}
        >
          @{creator.username}
        </p>

        <p
          style={{
            marginTop: 12,
            color: "#555",
            lineHeight: 1.6,
          }}
        >
          Content creator in the {creator.niche} space.
        </p>

        <div
          style={{
            marginTop: 16,
            color: "#777",
            fontSize: 14,
            display: "flex",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span>Category: {creator.niche}</span>
          <span>
            Followers: {creator.stats.followers.toLocaleString()}
          </span>
        </div>
      </div>

    </div>
  );
}