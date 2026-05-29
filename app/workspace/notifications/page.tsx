const notifications = [
  {
    text: "A brand saved your profile",
    time: "2 mins ago",
  },
  {
    text: "New campaign opportunities available",
    time: "12 mins ago",
  },
  {
    text: "Your visibility increased this week",
    time: "1 hour ago",
  },
  {
    text: "Nova Studios messaged you",
    time: "3 hours ago",
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      {/* HUB HEADER */}
      <div className="space-y-1">
        <h1 className="text-[26px] font-bold text-black tracking-tight">
          Notifications
        </h1>
        <p className="text-sm text-neutral-500">
          Platform and brand updates.
        </p>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        {notifications.map((item) => (
          <div
            key={item.text}
            className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm hover:shadow-md transition"
          >
            <p className="text-sm font-medium text-black">
              {item.text}
            </p>
            <p className="mt-1 text-xs text-neutral-500">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}