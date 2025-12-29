export let currentMode = localStorage.getItem("portfolioMode") || "frontend";
export const setModeState = (mode) => {
    currentMode = mode;
    localStorage.setItem("portfolioMode", mode);
};
