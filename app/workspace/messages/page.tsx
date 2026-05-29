const conversations = [
  {
    brand: "Nova Studios",
    message: "We’d love to discuss a campaign partnership.",
  },
  {
    brand: "Pulse Energy",
    message: "Your audience aligns with our next launch.",
  },
  {
    brand: "Aether Fashion",
    message: "Can we schedule a quick call?",
  },
];

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      {/* HUB HEADER */}
      <div className="space-y-1">
        <h1 className="text-[26px] font-bold text-black tracking-tight">
          Messages
        </h1>
        <p className="text-sm text-neutral-500">
          Communicate with brands and collaborators.
        </p>
      </div>

      {/* CONTENT */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="space-y-3">
            {conversations.map((chat) => (
              <div
                key={chat.brand}
                className="rounded-xl border border-[#f1f5f9] bg-[#fafafa] p-3"
              >
                <h3 className="text-xs font-semibold text-black">
                  {chat.brand}
                </h3>
                <p className="mt-1 text-xs text-neutral-500">
                  {chat.message}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-black">
            Nova Studios
          </h2>

          <div className="mt-4 space-y-3">
            <div className="max-w-md rounded-2xl bg-[#f5f7fb] p-3 text-xs text-black">
              We’d love to feature you in our summer campaign.
            </div>

            <div className="ml-auto max-w-md rounded-2xl bg-[#eaf2ff] p-3 text-xs text-black">
              Sounds great — tell me more.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}