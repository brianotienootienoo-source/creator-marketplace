export type MessageSender = "creator" | "brand";

export interface Message {
  id: string;
  threadId: string;
  sender: MessageSender;
  content: string;
  createdAt: string;
  read: boolean;
}

export interface MessageThread {
  id: string;

  creatorId: string;
  brandId: string;

  // Optional marketplace context
  proposalId?: string;
  opportunityId?: string;

  lastMessage?: string;
  updatedAt: string;

  messages: Message[];
}