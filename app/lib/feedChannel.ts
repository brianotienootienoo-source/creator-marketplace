const CHANNEL_NAME = "creator_feed_channel";

let channel: BroadcastChannel | null = null;

export function getChannel() {
  if (typeof window === "undefined") return null;

  if (!channel) {
    channel = new BroadcastChannel(CHANNEL_NAME);
  }

  return channel;
}

/**
 * Broadcast feed update to all tabs
 */
export function broadcastFeedUpdate() {
  const ch = getChannel();
  if (!ch) return;

  ch.postMessage({
    type: "FEED_UPDATE",
    timestamp: Date.now(),
  });
}

/**
 * Listen for feed updates
 */
export function subscribeToFeedUpdates(callback: () => void) {
  const ch = getChannel();
  if (!ch) return;

  ch.onmessage = (event) => {
    if (event.data?.type === "FEED_UPDATE") {
      callback();
    }
  };
}