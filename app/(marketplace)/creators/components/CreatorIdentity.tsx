export function CreatorIdentity({
  name,
  username,
  bio,
  niche,
}: {
  name: string;
  username: string;
  bio?: string;
  niche?: string;
}) {
  return (
    <div className="pt-14 px-4">
      {/* Name */}
      <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
        {name}
      </h1>

      {/* Username */}
      <p className="text-sm text-gray-500 mt-1">
        @{username}
      </p>

      {/* Bio */}
      <p className="mt-3 text-sm text-gray-700 leading-relaxed max-w-xl">
        {bio || `Content creator in the ${niche} space.`}
      </p>
    </div>
  );
}