"use client";

type Creator = {
  name: string;
  slug: string;
  niche: string;
  followers: string;
  rating: string;
  avatar: string;
};

type Props = {
  creator: Creator;
  isFollowing: boolean;
  onToggleFollow: (slug: string) => void;
};

export default function CreatorCard({
  creator,
  isFollowing,
  onToggleFollow,
}: Props) {
  return (
    <div className="group border border-gray-200/60 rounded-2xl p-6 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

      <div className="flex items-center gap-4 mb-5">

        <img
          src={creator.avatar}
          alt={creator.name}
          className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
        />

        <div>
          <h2 className="font-semibold text-lg group-hover:text-black transition">
            {creator.name}
          </h2>
          <p className="text-sm text-gray-500">
            {creator.niche}
          </p>
        </div>

      </div>

      <div className="flex justify-between text-sm text-gray-500 mb-6">
        <span>★ {creator.rating}</span>
        <span>{creator.followers} followers</span>
      </div>

      <div className="flex gap-3">

        <a
          href={`/creator/${creator.slug}`}
          className="flex-1 text-center py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition"
        >
          View Profile
        </a>

        <button
          onClick={() => onToggleFollow(creator.slug)}
          className={`flex-1 py-2 rounded-xl transition ${
            isFollowing
              ? "bg-gray-200 text-black"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {isFollowing ? "Following" : "Follow"}
        </button>

      </div>

    </div>
  );
}