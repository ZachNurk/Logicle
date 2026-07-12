/**
 * Global color theme. Import once (e.g. in main.tsx) then use var(--color-name) in any stylesheet.
 *
 * W   = white
 * B   = black
 * DP  = dark pink
 * MP  = medium pink
 * LP  = light pink
 * BG  = page background (cozy warm gray)
 * S1  = surface level 1 — cards, modals
 * S2  = surface level 2 — recessed elements (calendar cells, secondary buttons)
 */

export const Colors = {
  white: "#ffffff",
  black: "#000000",
  background: "#f0ede8",
  surface1: "#e8e4de",
  surface2: "#e4e0da",
  darkPink: "#ff7aad",
  mediumPink: "#ff9bc5",
  lightPink: "#ffcfe3",
  gray: "#abb3ad",
};

/** Starter 1–4: red, yellow, green, blue. */
export const StarterNodePalette = [
  { base: "#ef4444", depth1: "#dc2626", depth2: "#991b1b", text: "#ffffff" },
  { base: "#facc15", depth1: "#ca8a04", depth2: "#854d0e", text: "#000000" },
  { base: "#22c55e", depth1: "#16a34a", depth2: "#14532d", text: "#ffffff" },
  { base: "#3b82f6", depth1: "#2563eb", depth2: "#1e3a8a", text: "#ffffff" },
] as const;
