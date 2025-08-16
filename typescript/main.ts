console.log(`  
     █████╗ ████████╗██╗
    ██╔══██║╚══██╔══╝██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██╚══██║░░░██║░░░███████╗
    ╚█████╝ ░░░╚═╝░░░╚══════╝
`);

// ------- Responsive Navigation -------

// const navButton = document.querySelectorAll("navMain");

// ------- Lightmode -------
let lightmode: string | null = localStorage.getItem("lightmode");
const themeSwitch = document.getElementById("theme-switch");

const enableLightmode = () => {
  document.body.dataset.lightTheme = "true";
  localStorage.setItem("lightmode", "active");
};

const disableLightmode = () => {
  document.body.dataset.lightTheme = "false";
  localStorage.setItem("lightmode", "notActive");
};

if (lightmode === "active") enableLightmode();

themeSwitch?.addEventListener("click", () => {
  lightmode = localStorage.getItem("lightmode");
  lightmode !== "active" ? enableLightmode() : disableLightmode();
});
