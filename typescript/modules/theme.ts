export const enableLightmode = () => {
  document.body.dataset.lightTheme = "true";
  localStorage.setItem("themeMode", "light");
};

export const disableLightmode = () => {
  document.body.dataset.lightTheme = "false";
  localStorage.setItem("themeMode", "dark");
};

export const initTheme = () => {
  const themeMode = localStorage.getItem("themeMode");
  if (themeMode === "light") enableLightmode();

  const themeSwitch = document.getElementById("themeSwitch");
  themeSwitch?.addEventListener("click", () => {
    const current = localStorage.getItem("themeMode");
    current !== "light" ? enableLightmode() : disableLightmode();
  });
};
