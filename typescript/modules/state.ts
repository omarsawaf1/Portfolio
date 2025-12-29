export type Mode = "frontend" | "cyber";

export let currentMode: Mode =
  (localStorage.getItem("portfolioMode") as Mode) || "frontend";

export const setModeState = (mode: Mode) => {
  currentMode = mode;
  localStorage.setItem("portfolioMode", mode);
};
