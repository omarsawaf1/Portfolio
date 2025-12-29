export interface Project {
  name: string;
  description: string;
  images: string[];
  link: string;
}

const projectList = document.getElementById("projectList");

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

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) clearInterval(timer);
    else resetTimer();
  });

  showSlide(0);
  timer = window.setInterval(next, 10000);
}

function buildProjectCard(project: Project) {
  if (!projectList) return;

  const card = document.createElement("div");
  card.className = "card";

  const carouselContainer = document.createElement("div");
  carouselContainer.className = "carouselContainer";
  card.appendChild(carouselContainer);

  const slidesWrapper = document.createElement("div");
  slidesWrapper.className = "projectImg";
  carouselContainer.appendChild(slidesWrapper);

  const navDots = document.createElement("div");
  navDots.className = "carouselNav";

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

  project.images.forEach((url, i) => {
    const img = document.createElement("img");
    img.src = url;
    img.loading = "lazy";
    img.alt = project.name + " screenshot";
    slidesWrapper.appendChild(img);

    const dot = document.createElement("button");
    dot.className = "carouselDot";
    dot.setAttribute("aria-label", `View slide ${i + 1}`);
    navDots.appendChild(dot);
  });

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

  initCarousel(slidesWrapper, leftArrow, rightArrow, navDots);
}

export async function loadProjects() {
  try {
    const res = await fetch("/Portfolio/assets/projects.json");
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const projects: Project[] = await res.json();
    projects.forEach(buildProjectCard);
  } catch (err) {
    console.error("Error loading projects:", err);
  }
}
