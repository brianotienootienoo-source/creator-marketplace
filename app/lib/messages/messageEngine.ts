import { messageThreads } from "./messageStore";

export function getThreadsForCreator(creatorId: string) {
  return messageThreads.filter(
    (t) => t.creatorId === creatorId
  );
}

export function getThreadById(threadId: string) {
  return messageThreads.find((t) => t.id === threadId);
}

export function getUnreadCount(threadId: string) {
  const thread = getThreadById(threadId);
  if (!thread) return 0;

  return thread.messages.filter((m) => !m.read).length;
}