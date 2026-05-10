export function getStreamWeights(context: {
  engagementLevel: "HIGH" | "MEDIUM" | "LOW";
}) {
  if (context.engagementLevel === "HIGH") {
    return { forYou: 0.7, explore: 0.3 };
  }

  if (context.engagementLevel === "LOW") {
    return { forYou: 0.4, explore: 0.6 };
  }

  return { forYou: 0.5, explore: 0.5 };
}