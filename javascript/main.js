"use strict";
console.log(`  
     █████╗ ████████╗██╗
    ██╔══██║╚══██╔══╝██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██║░░██║░░░██║░░░██║░░░░░
    ██╚══██║░░░██║░░░███████╗
    ╚█████╝ ░░░╚═╝░░░╚══════╝
`);
// ------- Lightmode -------
let themeMode = localStorage.getItem("themeMode");
const themeSwitch = document.getElementById("themeSwitch");
const enableLightmode = () => {
    document.body.dataset.lightTheme = "true";
    localStorage.setItem("themeMode", "light");
};
const disableLightmode = () => {
    document.body.dataset.lightTheme = "false";
    localStorage.setItem("themeMode", "dark");
};
if (themeMode === "light")
    enableLightmode();
themeSwitch === null || themeSwitch === void 0 ? void 0 : themeSwitch.addEventListener("click", () => {
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
    const isOpen = mobileNav === null || mobileNav === void 0 ? void 0 : mobileNav.classList.toggle("active");
    hamburger === null || hamburger === void 0 ? void 0 : hamburger.classList.toggle("active");
    hamburger === null || hamburger === void 0 ? void 0 : hamburger.setAttribute("aria-expanded", String(isOpen));
    mobileNav === null || mobileNav === void 0 ? void 0 : mobileNav.setAttribute("aria-hidden", String(!isOpen));
    if (isOpen) {
        document.body.style.overflow = "hidden"; // Prevent scrolling
        main === null || main === void 0 ? void 0 : main.addEventListener("click", toggleMenu);
        document.addEventListener("keydown", handleEscape);
    }
    else {
        document.body.style.overflow = ""; // Restore scrolling
        main === null || main === void 0 ? void 0 : main.removeEventListener("click", toggleMenu);
        document.removeEventListener("keydown", handleEscape);
    }
}
hamburger === null || hamburger === void 0 ? void 0 : hamburger.addEventListener("click", toggleMenu);
// close when a link is clicked
navLinks === null || navLinks === void 0 ? void 0 : navLinks.forEach((link) => {
    link.addEventListener("click", toggleMenu);
});
// click outside to close
// main?.addEventListener("click", toggleMenu);
// close on Escape
function handleEscape(e) {
    if (e.key === "Escape")
        toggleMenu();
}
// ------- End of Hamburger Menu -------
// ------- Background Buttons -------
const education = document.getElementById("education");
const skill = document.getElementById("skill");
const work = document.getElementById("work");
function openTab(tabName) {
    var _a;
    const tabs = [education, skill, work];
    tabs.forEach((tab) => tab === null || tab === void 0 ? void 0 : tab.classList.remove("activeTab"));
    (_a = document.getElementById(tabName)) === null || _a === void 0 ? void 0 : _a.classList.add("activeTab");
}
const backgroundBtn = document.querySelectorAll(".backgroundButton");
backgroundBtn === null || backgroundBtn === void 0 ? void 0 : backgroundBtn.forEach((btn) => {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
        backgroundBtn === null || backgroundBtn === void 0 ? void 0 : backgroundBtn.forEach((btn) => {
            btn.classList.remove("active");
        });
        btn.classList.add("active");
    });
});
// ------- End of Background Buttons -------
// ------- DOM adding projects -------
const projectList = document.getElementById("projectList");
fetch("/Portfolio/assets/projects.json")
    .then((response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
})
    .then((projects) => {
    projects.forEach((project) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const projectImg = document.createElement("div");
        projectImg.classList.add("projectImg");
        card.appendChild(projectImg);
        project.images.forEach((image) => {
            const img = document.createElement("img");
            img.src = image;
            img.loading = "lazy";
            img.alt = project.name;
            projectImg.appendChild(img);
        });
        const title = document.createElement("h3");
        title.textContent = project.name;
        card.appendChild(title);
        const description = document.createElement("p");
        description.classList.add("projectDescription");
        description.textContent = project.description;
        card.appendChild(description);
        const button = document.createElement("button");
        button.classList.add("viewButton");
        button.textContent = "View";
        button.addEventListener("click", () => {
            window.open(project.link, "_blank");
        });
        card.appendChild(button);
        projectList === null || projectList === void 0 ? void 0 : projectList.appendChild(card);
    });
})
    .catch((error) => {
    console.error("Error fetching projects:", error);
});
// ------- End of projects DOM -------
// ------- Carousel -------
const projectCarousel = document.querySelectorAll(".projectImg");
// async function updateCarousel() {
//   for (let i = 0; i < projectCarousel.length; i++) {
//     projectCarousel[i].src = `./images/${i}.png`;
//   }
// }
// ------- End of Carousel -------
