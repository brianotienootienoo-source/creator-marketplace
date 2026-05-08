export type DensityMode = "compact" | "default" | "expanded";

export const uiState = {
  density: "default" as DensityMode,

  interaction: {
    hoverLift: -4,
    pressScale: 0.98,
  },

  animation: {
    spring: {
      type: "spring",
      stiffness: 260,
      damping: 18,
    },
  },
};