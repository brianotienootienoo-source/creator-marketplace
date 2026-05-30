import { MessageThread } from "./types/messageTypes";

export const messageThreads: MessageThread[] = [
  {
    id: "thread-1",
    creatorId: "creator-1",
    brandId: "brand-1",
    proposalId: "proposal-123",
    opportunityId: "opp-001",
    lastMessage: "We’d like to proceed with your proposal.",
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "m1",
        threadId: "thread-1",
        sender: "brand",
        content: "Hi, we saw your profile and liked your content.",
        createdAt: new Date().toISOString(),
        read: true,
      },
      {
        id: "m2",
        threadId: "thread-1",
        sender: "creator",
        content: "Thanks! Happy to collaborate.",
        createdAt: new Date().toISOString(),
        read: true,
      },
      {
        id: "m3",
        threadId: "thread-1",
        sender: "brand",
        content: "We’d like to proceed with your proposal.",
        createdAt: new Date().toISOString(),
        read: false,
      },
    ],
  },
];