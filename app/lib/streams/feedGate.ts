let isReady = false;

export function setFeedReady(value: boolean) {
  isReady = value;
}

export function getFeedReady() {
  return isReady;
}