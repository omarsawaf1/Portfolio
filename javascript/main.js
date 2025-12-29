import { currentMode, setModeState } from "./modules/state.js";
import { initTheme } from "./modules/theme.js";
import { applyMode, initMobileNav } from "./modules/navigation.js";
import { loadProjects } from "./modules/projects.js";
console.log(`  
     █████╗ ████████╗██╗
    ██╔══██║╚══██╔══╝██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██╚══██║░░░██║░░░███████╗
    ╚█████╝ ░░░╚═╝░░░╚══════╝
`);
// Init App
initTheme();
initMobileNav();
loadProjects();
applyMode(currentMode);
// Tab Function for Global Scope (Background Section)
const education = document.getElementById("education");
const skill = document.getElementById("skill");
const work = document.getElementById("work");
window.openTab = function (tabName) {
    const tabs = [education, skill, work];
    tabs.forEach((tab) => tab?.classList.remove("activeTab"));
    document.getElementById(tabName)?.classList.add("activeTab");
};
const backgroundBtn = document.querySelectorAll(".backgroundButton");
backgroundBtn?.forEach((btn) => {
    btn?.addEventListener("click", () => {
        backgroundBtn?.forEach((btn) => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});
// Mode Toggle Listener
const cyberBtn = document.getElementById("cyberModeBtn");
cyberBtn?.addEventListener("click", () => {
    const newMode = currentMode === "frontend" ? "cyber" : "frontend";
    setModeState(newMode);
    applyMode(newMode);
});
