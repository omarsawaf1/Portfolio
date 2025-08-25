console.log(`  
     █████╗ ████████╗██╗
    ██╔══██║╚══██╔══╝██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██╚══██║░░░██║░░░███████╗
    ╚█████╝ ░░░╚═╝░░░╚══════╝
`);

// ------- Lightmode -------
let themeMode: string | null = localStorage.getItem("themeMode");
const themeSwitch = document.getElementById("themeSwitch");

const enableLightmode = () => {
  document.body.dataset.lightTheme = "true";
  localStorage.setItem("themeMode", "light");
};

const disableLightmode = () => {
  document.body.dataset.lightTheme = "false";
  localStorage.setItem("themeMode", "dark");
};

if (themeMode === "light") enableLightmode();

themeSwitch?.addEventListener("click", () => {
  themeMode = localStorage.getItem("themeMode");
  themeMode !== "light" ? enableLightmode() : disableLightmode();
});

// ------- End of Lightmode -------

// ------- Hamburger Menu -------

const hamburger = document.getElementById("mobileNavBtn");
const mobileNav = document.getElementById("navLinks");
const navLinks = document.querySelectorAll(".navMain");
const main = document.getElementById("main");
const body = document.body;

function toggleMenu() {
  const isOpen = mobileNav?.classList.toggle("active");
  hamburger?.classList.toggle("active");
  hamburger?.setAttribute("aria-expanded", String(isOpen));
  mobileNav?.setAttribute("aria-hidden", String(!isOpen));

  if (isOpen) {
    document.addEventListener("keydown", handleEscape);
  } else {
    document.removeEventListener("keydown", handleEscape);
  }
}

hamburger?.addEventListener("click", toggleMenu);

// close when a link is clicked
navLinks?.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

// click outside to close
main?.addEventListener("click", toggleMenu);

// close on Escape
function handleEscape(e: KeyboardEvent) {
  if (e.key === "Escape") toggleMenu();
}

// ------- End of Hamburger Menu -------

// ------- Background Buttons -------

const education = document.getElementById("education");
const skill = document.getElementById("skill");
const work = document.getElementById("work");

function openTab(tabName: string) {
  const tabs = [education, skill, work];
  tabs.forEach((tab) => tab?.classList.remove("activeTab"));
  document.getElementById(tabName)?.classList.add("activeTab");
}

const backgroundBtn =
  document.querySelectorAll<HTMLButtonElement>(".backgroundButton");

backgroundBtn?.forEach((btn: HTMLButtonElement | null) => {
  btn?.addEventListener("click", () => {
    backgroundBtn?.forEach((btn) => {
      btn.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

// ------- End of Background Buttons -------
