import { getThreadsForCreator } from "./messageEngine";

export function getCreatorThreads(creatorId: string) {
  return getThreadsForCreator(creatorId).map((thread) => ({
    id: thread.id,
    brandId: thread.brandId,
    lastMessage: thread.lastMessage,
    updatedAt: thread.updatedAt,
    unreadCount: thread.messages.filter((m) => !m.read).length,
  }));
}