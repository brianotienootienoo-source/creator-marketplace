import { StreamWeights } from "./streamSwitchEngine";

export function mergeStreams(params: {
  streams: {
    TREND: any[];
    ENGAGEMENT: any[];
    DISCOVERY: any[];
    STABILITY: any[];
    MEMORY: any[];
  };
  weights: StreamWeights;
}) {
  const { streams, weights } = params;

  const result: any[] = [];

  const pushWeighted = (arr: any[], weight: number) => {
    const limit = Math.floor(weight * 40);

    result.push(...arr.slice(0, limit));
  };

  pushWeighted(streams.TREND, weights.TREND);
  pushWeighted(streams.ENGAGEMENT, weights.ENGAGEMENT);
  pushWeighted(streams.DISCOVERY, weights.DISCOVERY);
  pushWeighted(streams.STABILITY, weights.STABILITY);
  pushWeighted(streams.MEMORY, weights.MEMORY);

  return result;
}