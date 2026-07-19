const projects = [
  {
    id: "01",
    slug: "community-room",
    title: "Community Room",
    location: "Maharashtra, India",
    year: "2024",
    node: "absence of shared public space",
    role: "Design-build team · site coordination",
    output: "Built pavilion + construction drawings",
    skill: "Constructability & rapid redesign",
    tags: ["Design-build", "Built", "India"],
    image: "futureassets/community-room.webp",
    alt: "Black-and-white photograph of the built Community Room pavilion in Maharashtra",
    focus: { x: 52, y: 58 },
    tint: "#f1ede3",
    framesHref: "#frame-india",
    showRecord: true,
  },
  {
    id: "02",
    slug: "the-cove",
    title: "The Cove",
    location: "Chicago, Illinois",
    year: "2023",
    node: "disconnected circulation across urban levels",
    role: "Individual designer · academic studio",
    output: "Civic roofscape + sectional studies",
    skill: "Sectional circulation & public ground",
    tags: ["Academic", "Civic", "Chicago"],
    image: "futureassets/the-cove.webp",
    alt: "Axonometric view of The Cove with folded ramps and planted civic terraces",
    focus: { x: 50, y: 62 },
    tint: "#e4ebe1",
  },
  {
    id: "03",
    slug: "village-in-the-city",
    title: "Village in the City",
    location: "Bangkok, Thailand",
    year: "2025",
    node: "vertical density separating generations",
    role: "Graduate studio · individual project",
    output: "Intergenerational tower proposal",
    skill: "Vertical programming & social systems",
    tags: ["Graduate", "Tower", "Bangkok"],
    image: "futureassets/village-in-the-city.webp",
    alt: "Rendering of Village in the City with three towers connected by inhabited bridges",
    focus: { x: 52, y: 42 },
    tint: "#e8e6ef",
  },
  {
    id: "04",
    slug: "the-wave",
    title: "The Wave",
    location: "Chicago, Illinois",
    year: "2022",
    node: "a fieldhouse without a conventional field",
    role: "Individual designer · academic studio",
    output: "Neighborhood fieldhouse proposal",
    skill: "Public thresholds & sectional light",
    tags: ["Academic", "Civic", "Chicago"],
    image: "futureassets/the-wave.webp",
    alt: "Rendering of The Wave fieldhouse and its broad stepped public terrace",
    focus: { x: 60, y: 60 },
    tint: "#f2ddc2",
  },
];

const story = document.querySelector(".work-story");
const stage = document.querySelector(".story-stage");
const field = document.querySelector("#project-field");
const mobileStations = document.querySelector("#mobile-stations");
const threadDrawing = document.querySelector("#thread-drawing");
const threadHalo = document.querySelector("#thread-halo");
const threadLine = document.querySelector("#thread-line");
const threadActive = document.querySelector("#thread-active");

if (!story || !stage || !field || !mobileStations || !threadDrawing || !threadHalo || !threadLine || !threadActive) {
  // Section not present on this page
} else {
  let scrollIndex = 0;
  let focusedIndex = null;
  let activeIndex = 0;
  let stationElements = [];
  let nodeElements = [];
  let imageElements = [];
  let measurementFrame = 0;
  let scrollFrame = 0;

  const smoothPath = (points) => {
    if (points.length < 2) return "";

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let index = 0; index < points.length - 1; index += 1) {
      const p0 = points[Math.max(0, index - 1)];
      const p1 = points[index];
      const p2 = points[index + 1];
      const p3 = points[Math.min(points.length - 1, index + 2)];
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  };

  const captionLinks = (project) => {
    const parts = [];
    if (project.showRecord) {
      parts.push(`<span>→ Full record in <a href="#record">Record</a></span>`);
    }
    if (project.framesHref) {
      parts.push(`<span>How it changed practice in <a href="${project.framesHref}">Frames</a></span>`);
    }
    parts.push(`<span>View project in <a href="work.html#${project.slug}">portfolio</a></span>`);
    return parts.join('<i aria-hidden="true">·</i>');
  };

  const captionMarkup = (project) => `
  <div class="station-caption" aria-live="polite">
    <div class="caption-title">
      <h3>${project.title}</h3>
      <p>Node — ${project.node}</p>
    </div>
    <dl class="caption-facts">
      <div><dt>Role</dt><dd>${project.role}</dd></div>
      <div><dt>Output</dt><dd>${project.output}</dd></div>
      <div><dt>Skill</dt><dd>${project.skill}</dd></div>
    </dl>
    <div class="caption-meta">
      <div class="caption-tags" aria-label="Project classifications">
        ${project.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
      <p class="caption-links">
        ${captionLinks(project)}
      </p>
    </div>
  </div>
`;

  const stationMarkup = (project, index) => `
  <article
    class="project-station${index === activeIndex ? " is-active" : ""}"
    data-index="${index}"
    style="--focus-x:${project.focus.x}%; --focus-y:${project.focus.y}%"
  >
    <button class="station-trigger" type="button" aria-label="Open ${project.title}">
      <span class="station-head">
        <span>Project ${project.id}</span>
        <strong>${project.year}</strong>
      </span>
      <span class="station-image">
        <img src="${project.image}" alt="${index === activeIndex ? project.alt : ""}" loading="lazy" />
        <span class="thread-node"><i aria-hidden="true"></i></span>
        <span class="station-short-title">${project.title}</span>
      </span>
    </button>
    ${index === activeIndex ? captionMarkup(project) : ""}
  </article>
`;

  const createStations = () => {
    projects.forEach((project, index) => {
      field.insertAdjacentHTML("beforeend", stationMarkup(project, index));
      mobileStations.insertAdjacentHTML(
        "beforeend",
        `<button type="button" data-index="${index}"${index === activeIndex ? ' class="is-active"' : ""}><span>${project.id}</span>${project.title}</button>`,
      );
    });

    stationElements = Array.from(field.querySelectorAll(".project-station"));
    nodeElements = stationElements.map((station) => station.querySelector(".thread-node"));
    imageElements = stationElements.map((station) => station.querySelector(".station-image"));

    stationElements.forEach((station, index) => {
      const trigger = station.querySelector(".station-trigger");
      trigger.addEventListener("click", () => chooseProject(index));
      trigger.addEventListener("focus", () => {
        focusedIndex = index;
        setActive(index);
      });
      trigger.addEventListener("blur", () => {
        focusedIndex = null;
        setActive(scrollIndex);
      });
    });

    Array.from(mobileStations.querySelectorAll("button")).forEach((button, index) => {
      button.addEventListener("click", () => chooseProject(index));
    });
  };

  const setActive = (index) => {
    if (index === activeIndex && stationElements[index]?.classList.contains("is-active")) return;
    activeIndex = index;
    story.dataset.active = String(index);
    story.style.setProperty("--project-tint", projects[index].tint);

    stationElements.forEach((station, stationIndex) => {
      const isActive = stationIndex === index;
      station.classList.toggle("is-active", isActive);
      station.querySelector("img").alt = isActive ? projects[stationIndex].alt : "";
      station.querySelector(".station-caption")?.remove();
      if (isActive) station.insertAdjacentHTML("beforeend", captionMarkup(projects[stationIndex]));
    });

    Array.from(mobileStations.querySelectorAll("button")).forEach((button, buttonIndex) => {
      button.classList.toggle("is-active", buttonIndex === index);
    });

    requestMeasure();
    window.setTimeout(measureThread, 760);
  };

  const chooseProject = (index) => {
    scrollIndex = index;
    focusedIndex = null;
    setActive(index);

    if (window.matchMedia("(max-width: 900px)").matches) return;
    const rect = story.getBoundingClientRect();
    const storyTop = window.scrollY + rect.top;
    const travel = Math.max(0, rect.height - window.innerHeight);
    window.scrollTo({
      top: storyTop + travel * ((index + 0.2) / projects.length),
      behavior: "smooth",
    });
  };

  const measureThread = () => {
    const fieldRect = field.getBoundingClientRect();
    const points = nodeElements.map((node) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - fieldRect.left,
        y: rect.top + rect.height / 2 - fieldRect.top,
      };
    });

    if (!points.every((point) => point.x > 0)) return;

    const completePoints = [
      { x: -8, y: points[0].y },
      ...points,
      { x: fieldRect.width + 8, y: points[points.length - 1].y },
    ];
    const activeSegmentPoints = activeIndex === 0
      ? [{ x: -8, y: points[0].y }, points[0]]
      : [points[activeIndex - 1], points[activeIndex]];

    threadDrawing.setAttribute("viewBox", `0 0 ${fieldRect.width} ${fieldRect.height}`);
    const completePath = smoothPath(completePoints);
    threadHalo.setAttribute("d", completePath);
    threadLine.setAttribute("d", completePath);
    threadActive.setAttribute("d", smoothPath(activeSegmentPoints));
    measurementFrame = 0;
  };

  const requestMeasure = () => {
    if (!measurementFrame) measurementFrame = window.requestAnimationFrame(measureThread);
  };

  const updateFromScroll = () => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      scrollFrame = 0;
      return;
    }
    const rect = story.getBoundingClientRect();
    const travel = Math.max(1, rect.height - window.innerHeight);
    const progress = Math.min(1, Math.max(0, -rect.top / travel));
    const nextIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
    scrollIndex = nextIndex;
    if (focusedIndex === null) setActive(nextIndex);
    scrollFrame = 0;
  };

  const requestScrollUpdate = () => {
    if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateFromScroll);
  };

  createStations();
  story.style.setProperty("--project-tint", projects[0].tint);

  const resizeObserver = new ResizeObserver(requestMeasure);
  resizeObserver.observe(field);
  imageElements.forEach((image) => resizeObserver.observe(image));

  window.addEventListener("scroll", requestScrollUpdate, { passive: true });
  window.addEventListener("resize", () => {
    requestScrollUpdate();
    requestMeasure();
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    stage.addEventListener("pointermove", (event) => {
      const rect = stage.getBoundingClientRect();
      const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 9;
      const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 7;
      stage.style.setProperty("--render-x", `${dx.toFixed(2)}px`);
      stage.style.setProperty("--render-y", `${dy.toFixed(2)}px`);
    });
    stage.addEventListener("pointerleave", () => {
      stage.style.setProperty("--render-x", "0px");
      stage.style.setProperty("--render-y", "0px");
    });
  }

  window.addEventListener("load", () => {
    measureThread();
    window.setTimeout(measureThread, 300);
  });
}
