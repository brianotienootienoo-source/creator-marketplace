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
      <span className="font-medium text-gray-800">
        Category: {niche}
      </span>

      <span className="font-medium text-gray-800">
        Followers: {followers.toLocaleString()}
      </span>

      <span className="font-medium text-gray-800">
        Engagement: {(engagement || 0).toFixed(2)}
      </span>
    </div>
  );
}