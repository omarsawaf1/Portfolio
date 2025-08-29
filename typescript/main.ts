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
    document.body.style.overflow = "hidden"; // Prevent scrolling
    main?.addEventListener("click", toggleMenu);
    document.addEventListener("keydown", handleEscape);
  } else {
    document.body.style.overflow = ""; // Restore scrolling
    main?.removeEventListener("click", toggleMenu);
    document.removeEventListener("keydown", handleEscape);
  }
}

hamburger?.addEventListener("click", toggleMenu);

// close when a link is clicked
navLinks?.forEach((link) => {
  link.addEventListener("click", toggleMenu);
});

// click outside to close
// main?.addEventListener("click", toggleMenu);

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

// ------- DOM & Data Loading -------

interface Project {
  name: string;
  description: string;
  images: string[];
  link: string;
}

const projectList = document.getElementById("projectList");

async function loadProjects() {
  try {
    const res = await fetch("/Portfolio/assets/projects.json");
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const projects: Project[] = await res.json();
    projects.forEach(buildProjectCard);
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}

loadProjects();

// ------- Card + Carousel Builder -------

function buildProjectCard(project: Project) {
  if (!projectList) return;

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
  const createArrow = (dir: "left" | "right") => {
    const btn = document.createElement("button");
    btn.classList.add("carouselArrow", dir + "Arrow");
    btn.setAttribute(
      "aria-label",
      dir === "left" ? "Previous slide" : "Next slide"
    );
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

function initCarousel(
  slidesWrapper: HTMLElement,
  leftBtn: HTMLElement,
  rightBtn: HTMLElement,
  navDots: HTMLElement
) {
  const slides = Array.from(slidesWrapper.querySelectorAll("img"));
  const dots = Array.from(navDots.querySelectorAll("button"));

  let current = 0;
  let timer: number;

  function showSlide(idx: number) {
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
    if (document.hidden) clearInterval(timer);
    else resetTimer();
  });

  // Start
  showSlide(0);
  timer = window.setInterval(next, 10000);
}

// ------- End of Carousel -------
