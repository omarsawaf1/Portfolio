import { typewriterEffect } from "./effects.js";
import { enableLightmode, disableLightmode } from "./theme.js";
const frontendMain = document.getElementById("frontend-version");
const cyberMain = document.getElementById("cyber-version");
const cyberBtn = document.getElementById("cyberModeBtn");
const navHeaders = document.querySelectorAll(".navHeader");
const mainTitle = document.getElementById("mainTitle");
export const updateNavLinks = (mode) => {
    const isCyber = mode === "cyber";
    const links = document.querySelectorAll("#navLinks a");
    const targets = isCyber
        ? [
            "#cyber-home",
            "#cyber-about",
            "#cyber-experience",
            "#cyber-skills",
            "#cyber-projects",
            "#cyber-contact",
        ]
        : ["#home", "#about", "#background", "#service", "#project", "#contact"];
    links.forEach((a, i) => {
        a.setAttribute("href", targets[i] || "#");
    });
    if (isCyber) {
        navHeaders.forEach((el, i) => {
            const cyberNavText = [
                "Intel",
                "Mission",
                "Logs",
                "Arsenal",
                "Ops",
                "Comms",
            ];
            el.textContent = cyberNavText[i] || "";
        });
        const cTitle = document.querySelector(".cyber-title");
        if (cTitle)
            cTitle.setAttribute("data-text", "CYBER SECURITY");
        if (cTitle)
            cTitle.textContent = "CYBER SECURITY";
    }
    else {
        navHeaders.forEach((el, i) => {
            const frontendNavText = [
                "Home",
                "About",
                "Background",
                "Services",
                "Projects",
                "Contact",
            ];
            el.textContent = frontendNavText[i] || "";
        });
        if (mainTitle)
            mainTitle.innerHTML =
                "Welcome to <br /> My <span id='portfolioWord'>Portfolio</span>";
        // Additional content updates can go here if needed
        const bgTitle = document.querySelector("#background .title");
        if (bgTitle)
            bgTitle.textContent = "My Background";
        const servTitle = document.querySelector("#service .title");
        if (servTitle)
            servTitle.textContent = "Frontend Development";
        const projTitle = document.querySelector("#project .title");
        if (projTitle)
            projTitle.textContent = "Projects";
        const contTitle = document.querySelector("#contact .title");
        if (contTitle)
            contTitle.textContent = "Contact Me";
    }
};
export const updateModeIcon = (mode) => {
    if (!cyberBtn)
        return;
    if (mode === "cyber") {
        // Brush Icon
        cyberBtn.setAttribute("aria-label", "Switch to Frontend Mode");
        cyberBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34c-.39-.39-1.02-.39-1.41 0L9 11.25 12.75 15l8.96-8.96c.39-.39.39-1.02 0-1.41z"/></svg>`;
    }
    else {
        // Shield Icon
        cyberBtn.setAttribute("aria-label", "Switch to Cybersecurity Mode");
        cyberBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-80q-137-56-228.5-177T160-520v-240l320-120 320 120v240q0 144-91.5 265T480-80Zm0-84q103-53 171.5-144T720-520v-188l-240-90-240 90v188q0 102 68.5 193T480-164Zm0-276Z"/></svg>`;
    }
};
export const applyMode = (mode) => {
    if (mode === "cyber") {
        frontendMain.style.display = "none";
        cyberMain.style.display = "block";
        document.body.classList.add("cyber-active");
        document.body.style.background = "";
        const subtitle = document.querySelector(".cyber-subtitle");
        if (subtitle) {
            typewriterEffect(subtitle, "BLUE TEAM | SOC ANALYST | FORENSICS");
        }
    }
    else {
        frontendMain.style.display = "block";
        cyberMain.style.display = "none";
        document.body.classList.remove("cyber-active");
        document.body.style.background = "";
    }
    const isLight = localStorage.getItem("themeMode") === "light";
    if (isLight)
        enableLightmode();
    else
        disableLightmode();
    updateNavLinks(mode);
    updateModeIcon(mode);
};
export function initMobileNav() {
    const hamburger = document.getElementById("mobileNavBtn");
    const mobileNav = document.getElementById("navLinks");
    const navLinksItems = document.querySelectorAll(".navMain");
    function toggleMenu() {
        const isOpen = mobileNav?.classList.toggle("active");
        hamburger?.classList.toggle("active");
        hamburger?.setAttribute("aria-expanded", String(isOpen));
        mobileNav?.setAttribute("aria-hidden", String(!isOpen));
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleEscape);
        }
        else {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", handleEscape);
        }
    }
    function handleEscape(e) {
        if (e.key === "Escape")
            toggleMenu();
    }
    hamburger?.addEventListener("click", toggleMenu);
    navLinksItems?.forEach((link) => {
        link.addEventListener("click", toggleMenu);
    });
}
