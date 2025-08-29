"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const projectList = document.getElementById("projectList");
function loadProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch("/Portfolio/assets/projects.json");
            if (!res.ok)
                throw new Error(`Fetch failed: ${res.status}`);
            const projects = yield res.json();
            projects.forEach(buildProjectCard);
        }
        catch (err) {
            console.error("Error loading projects:", err);
        }
    });
}
loadProjects();
// ------- Card + Carousel Builder -------
function buildProjectCard(project) {
    if (!projectList)
        return;
    // Card wrapper
    const card = document.createElement("div");
    card.className = "card";
    // Carousel container
    const carouselContainer = document.createElement("div");
    carouselContainer.className = "carouselContainer";
    card.appendChild(carouselContainer);
    // Slides wrapper
    const slidesWrapper = document.createElement("div");
    slidesWrapper.className = "projectImg";
    carouselContainer.appendChild(slidesWrapper);
    // Navigation dots container
    const navDots = document.createElement("div");
    navDots.className = "carouselNav";
    // Arrows
    const createArrow = (dir) => {
        const btn = document.createElement("button");
        btn.classList.add("carouselArrow", dir + "Arrow");
        btn.setAttribute("aria-label", dir === "left" ? "Previous slide" : "Next slide");
        const img = document.createElement("img");
        img.className = "carouselArrowImg";
        img.src = `/Portfolio/assets/svg/${dir}_arrow.svg`;
        img.alt = dir === "left" ? "◀" : "▶";
        btn.appendChild(img);
        return btn;
    };
    const leftArrow = createArrow("left");
    const rightArrow = createArrow("right");
    carouselContainer.append(leftArrow, slidesWrapper, rightArrow, navDots);
    // Slide images & dots
    project.images.forEach((url, i) => {
        // Slide
        const img = document.createElement("img");
        img.src = url;
        img.loading = "lazy";
        img.alt = project.name + " screenshot";
        slidesWrapper.appendChild(img);
        // Dot
        const dot = document.createElement("button");
        dot.className = "carouselDot";
        dot.setAttribute("aria-label", `View slide ${i + 1}`);
        navDots.appendChild(dot);
    });
    // Title, description, button
    const title = document.createElement("h3");
    title.textContent = project.name;
    const desc = document.createElement("p");
    desc.className = "projectDescription";
    desc.textContent = project.description;
    const cta = document.createElement("button");
    cta.className = "viewButton";
    cta.textContent = "View";
    cta.addEventListener("click", () => window.open(project.link, "_blank"));
    card.append(title, desc, cta);
    projectList.appendChild(card);
    // Initialize this carousel’s behavior
    initCarousel(slidesWrapper, leftArrow, rightArrow, navDots);
}
// ------- Carousel Logic per Container -------
function initCarousel(slidesWrapper, leftBtn, rightBtn, navDots) {
    const slides = Array.from(slidesWrapper.querySelectorAll("img"));
    const dots = Array.from(navDots.querySelectorAll("button"));
    let current = 0;
    let timer;
    function showSlide(idx) {
        slides.forEach((s, i) => {
            s.style.display = i === idx ? "block" : "none";
            if (dots && dots[i]) {
                dots[i].classList.toggle("active", i === idx);
            }
        });
        current = idx;
    }
    function next() {
        showSlide((current + 1) % slides.length);
    }
    function prev() {
        showSlide((current - 1 + slides.length) % slides.length);
    }
    function resetTimer() {
        clearInterval(timer);
        timer = window.setInterval(next, 10000);
    }
    // Wire up controls
    leftBtn.addEventListener("click", () => {
        prev();
        resetTimer();
    });
    rightBtn.addEventListener("click", () => {
        next();
        resetTimer();
    });
    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
            resetTimer();
        });
    });
    // Pause when tab is hidden
    document.addEventListener("visibilitychange", () => {
        if (document.hidden)
            clearInterval(timer);
        else
            resetTimer();
    });
    // Start
    showSlide(0);
    timer = window.setInterval(next, 10000);
}
// ------- End of Carousel -------
