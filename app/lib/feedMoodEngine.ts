import { PersonaMood } from "./personaDrift";

export interface MoodWeights {
  randomness: number;
  discovery: number;
  stability: number;
  engagement: number;
  momentum: number;
}

export function getMoodWeights(
  mood: PersonaMood
): MoodWeights {
  switch (mood) {
    case "EXPLORE":
      return {
        randomness: 1.4,
        discovery: 1.6,
        stability: 0.6,
        engagement: 0.8,
        momentum: 0.9,
      };

    case "FOCUSED":
      return {
        randomness: 0.5,
        discovery: 0.6,
        stability: 1.6,
        engagement: 1.2,
        momentum: 1.3,
      };

    case "FATIGUED":
      return {
        randomness: 0.3,
        discovery: 0.4,
        stability: 1.8,
        engagement: 0.7,
        momentum: 0.6,
      };

    case "ENGAGED":
    default:
      return {
        randomness: 1.0,
        discovery: 1.0,
        stability: 1.0,
        engagement: 1.4,
        momentum: 1.1,
      };
  }
}