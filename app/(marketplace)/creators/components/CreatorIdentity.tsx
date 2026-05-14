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
      <h1 className="text-2xl font-bold">{name}</h1>

      <p className="text-gray-500 text-sm">@{username}</p>

      <p className="mt-3 text-gray-600 leading-relaxed">
        {bio || `Content creator in the ${niche} space.`}
      </p>
    </div>
  );
}