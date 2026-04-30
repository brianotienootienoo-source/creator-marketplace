const CHANNEL_NAME = "creator_feed_channel";

let channel: BroadcastChannel | null = null;

/* =========================================================
   📡 EVENT TYPES (C16 STEP 4)
=========================================================*/

export type FeedEventType =
  | "FEED_UPDATE"
  | "POST_CREATED"
  | "POST_LIKED"
  | "COMMENT_ADDED"
  | "CREATOR_UPDATED"
  | "FOLLOW_UPDATED";

/**
 * Base event structure
 */
export interface FeedEvent {
  type: FeedEventType;
  timestamp: number;
  payload?: any;
}

/* =========================================================
   🧠 CHANNEL INIT
=========================================================*/

export function getChannel() {
  if (typeof window === "undefined") return null;

  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }

  return channel;
}

/* =========================================================
   📤 EVENT EMITTER
=========================================================*/

/**
 * Emit any event to all open tabs
 */
export function emitEvent(type: FeedEventType, payload?: any) {
  const ch = getChannel();
  if (!ch) return;

  const event: FeedEvent = {
    type,
    timestamp: Date.now(),
    payload,
  };

  ch.postMessage(event);
}

/* =========================================================
   🔁 LEGACY COMPATIBILITY (DO NOT BREAK UI)
=========================================================*/

/**
 * Old function still used in your system
 */
export function broadcastFeedUpdate() {
  emitEvent("FEED_UPDATE");
}

/* =========================================================
   👂 SUBSCRIPTION SYSTEM
=========================================================*/

export function subscribeToFeedUpdates(callback: () => void) {
  const ch = getChannel();
  if (!ch) return;

  ch.onmessage = (event) => {
    const data: FeedEvent = event.data;

    if (!data?.type) return;

    // Keep old behaviour working
    if (data.type === "FEED_UPDATE") {
      callback();
    }

    // Future-ready hooks (optional expansion)
    if (
      data.type === "POST_CREATED" ||
      data.type === "POST_LIKED" ||
      data.type === "COMMENT_ADDED" ||
      data.type === "FOLLOW_UPDATED"
    ) {
      callback();
    }
  };
}