"use client";

import { useState } from "react";

const conversations = [
  {
    brand: "Nova Studios",
    status: "Active",
    message: "We’d love to discuss a campaign partnership.",
  },
  {
    brand: "Pulse Energy",
    status: "Unread",
    message: "Your audience aligns with our next launch.",
  },
  {
    brand: "Aether Fashion",
    status: "New",
    message: "Can we schedule a quick call?",
  },
];

export default function MessagesPage() {
  const [selected, setSelected] = useState(conversations[0]);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <h1 className="text-[26px] font-bold tracking-tight text-black">
          Messages
        </h1>

        <p className="text-sm text-neutral-500">
          Communicate with brands and collaborators.
        </p>
      </div>

      {/* LAYOUT */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* CONVERSATION LIST */}
        <div className="rounded-2xl border border-[#e5e7eb] bg-white p-4 shadow-sm">
          <div className="mb-4">
            <input
              placeholder="Search conversations..."
              className="
                w-full rounded-xl border border-[#e5e7eb]
                px-3 py-2 text-sm outline-none
              "
            />
          </div>

          <div className="space-y-3">
            {conversations.map((chat) => {
              const active =
                selected.brand === chat.brand;

              return (
                <button
                  key={chat.brand}
                  onClick={() => setSelected(chat)}
                  className={`
                    w-full rounded-xl border p-3 text-left transition
                    ${
                      active
                        ? "border-black bg-[#fafafa]"
                        : "border-[#f1f5f9] bg-white"
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold text-black">
                      {chat.brand}
                    </h3>

                    <span className="text-[10px] text-neutral-500">
                      {chat.status}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-neutral-500">
                    {chat.message}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONVERSATION VIEW */}
        <div className="flex min-h-[600px] flex-col rounded-2xl border border-[#e5e7eb] bg-white shadow-sm">
          {/* CHAT HEADER */}
          <div className="border-b border-[#e5e7eb] px-5 py-4">
            <h2 className="text-base font-semibold text-black">
              {selected.brand}
            </h2>

            <p className="mt-1 text-xs text-neutral-500">
              Collaboration Conversation
            </p>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 space-y-4 p-5">
            <div className="max-w-md rounded-2xl bg-[#f5f7fb] p-3 text-sm text-black">
              We’d love to feature you in our next campaign.
            </div>

            <div className="max-w-md rounded-2xl bg-[#f5f7fb] p-3 text-sm text-black">
              Are you available to discuss deliverables?
            </div>

            <div className="ml-auto max-w-md rounded-2xl bg-[#eaf2ff] p-3 text-sm text-black">
              Absolutely. I’m interested in learning more.
            </div>
          </div>

          {/* COMPOSER */}
          <div className="border-t border-[#e5e7eb] p-4">
            <div className="flex gap-3">
              <input
                placeholder="Type a message..."
                className="
                  flex-1 rounded-xl border border-[#e5e7eb]
                  px-4 py-3 text-sm outline-none
                "
              />

              <button
                className="
                  rounded-xl bg-black px-5 py-3
                  text-sm font-medium text-white
                "
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}