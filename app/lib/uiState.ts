export type DensityMode = "compact" | "default" | "expanded";
export type ViewMode = "normal" | "signal";

export const uiState = {
  density: "default" as DensityMode,
  viewMode: "normal" as ViewMode,

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