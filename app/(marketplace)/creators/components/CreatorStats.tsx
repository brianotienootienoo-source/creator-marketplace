export function CreatorStats({
  niche,
  followers,
  engagement,
}: {
  niche?: string;
  followers: number;
  engagement?: number;
}) {
  return (
    <div className="mt-6 px-4 flex gap-6 text-sm text-gray-600 flex-wrap">
      <span>Category: {niche}</span>

      <span>Followers: {followers.toLocaleString()}</span>

      <span>
        Engagement: {(engagement || 0).toFixed(2)}
      </span>
    </div>
  );
}