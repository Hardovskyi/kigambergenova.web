(() => {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const openingPage = document.getElementById("opener") || document.getElementById("opening-page");
  const mapStage = document.getElementById("map-stage");
  const svg = document.getElementById("connection-field");
  const navigation = document.getElementById("map-navigation");
  const skipButton = document.getElementById("skip-intro");
  const enterWebsiteButton = document.getElementById("enter-website");
  const openerFill = document.getElementById("openerFill");
  const INTRO_MS = 7800;

  if (!openingPage || !mapStage || !svg || !navigation) return;

  /* Map massing ids → real homepage section ids */
  const sectionTargets = {
    work: "selected-work",
    record: "record",
    frames: "frames-of-practice",
    background: "background",
    contact: "contact",
  };

  const sections = [
    { id: "work", number: "01", title: "Selected Works", x: 28, y: 33, align: "right" },
    { id: "record", number: "02", title: "Record", x: 76, y: 42, align: "left" },
    { id: "frames", number: "03", title: "Frames of Practice", x: 35, y: 23, align: "right" },
    { id: "background", number: "04", title: "Background", x: 39.5, y: 7, align: "right" },
    { id: "contact", number: "05", title: "Contact", x: 82, y: 2.5, align: "left" },
  ];

  const projectionScale = 1.15;
  const projectionOffset = [130, -55];
  const elevatedViewHeightScale = 1;
  let activeId = null;
  let enteredId = null;
  let introComplete = false;
  let dismissed = false;
  let walkingField = null;
  let massingField = null;
  let leadersField = null;
  const peopleFrontIds = new Set(["work", "background"]);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function projectPlanPoint([x, y]) {
    const projectedX = (0.896050532 * x) + (1.35075374 * y) - 1038.82181;
    const projectedY = (-0.472393428 * x) + (0.654943217 * y) + 536.261748;
    return [
      projectionOffset[0] + (projectedX * projectionScale),
      projectionOffset[1] + (projectedY * projectionScale),
    ];
  }

  const projectPlanPolygon = (rawPoints) => rawPoints.map(projectPlanPoint);
  const translate = (sourcePoints, dx, dy) =>
    sourcePoints.map(([x, y]) => [x + dx, y + dy]);
  const pointString = (sourcePoints) =>
    sourcePoints.map(([x, y]) => `${x},${y}`).join(" ");

  const massings = [
    {
      id: "work",
      drop: 250,
      height: 105,
      footprint: projectPlanPolygon([
        [461.4, 649.3], [565.6, 683.2], [509.2, 773.9], [397.7, 725.3],
      ]),
    },
    {
      id: "record",
      drop: 190,
      height: 105,
      footprint: projectPlanPolygon([
        [626.3, 730.1], [722.6, 772], [643.4, 915.6], [532.1, 876.9],
      ]),
    },
    {
      id: "frames",
      drop: 210,
      height: 120,
      footprint: projectPlanPolygon([
        [717.4, 656.1], [781, 649.3], [831.5, 721.9], [723.4, 743.2],
      ]),
    },
    {
      id: "background",
      drop: 230,
      height: 105,
      footprint: projectPlanPolygon([
        [804.8, 521.6], [891.1, 551.8], [857.6, 616.5], [758.3, 574.9],
      ]),
    },
    {
      id: "contact",
      drop: 230,
      height: 110,
      footprint: projectPlanPolygon([
        [1008.8, 574.5], [1113.1, 610.9], [1076, 698.3], [987.1, 676.4],
      ]),
    },
  ];

  const roadBoundary = projectPlanPolygon([
    [302, 694], [397.7, 725.3], [509.2, 773.9], [615, 622.8],
    [758.3, 574.9], [857.6, 616.5], [938.5, 485.9], [1227, 574],
    [1181, 623], [1113.1, 610.9], [1008.8, 574.5], [987.1, 676.4],
    [974, 694.8], [856.3, 743.5], [831.5, 721.9], [781, 649.3],
    [717.4, 656.1], [723.4, 743.2], [722.6, 772], [626.3, 730.1],
    [532.1, 876.9], [255, 759],
  ]);

  const routePoints = projectPlanPolygon([
    [283.7, 731.9], [443.5, 793.4], [525.5, 793.4], [705.8, 625.3],
    [902.5, 633.5], [980.4, 555.7], [1058.3, 555.7], [1197.6, 592.6],
  ]);

  function routePath(route, cornerRadius = 34) {
    if (route.length < 3) {
      return route
        .map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`)
        .join(" ");
    }
    const commands = [`M ${route[0][0]} ${route[0][1]}`];
    for (let index = 1; index < route.length - 1; index += 1) {
      const previous = route[index - 1];
      const current = route[index];
      const next = route[index + 1];
      const incomingLength = Math.hypot(
        current[0] - previous[0],
        current[1] - previous[1],
      );
      const outgoingLength = Math.hypot(
        next[0] - current[0],
        next[1] - current[1],
      );
      const radius = Math.min(
        cornerRadius,
        incomingLength * 0.28,
        outgoingLength * 0.28,
      );
      const before = [
        current[0] - ((current[0] - previous[0]) / incomingLength) * radius,
        current[1] - ((current[1] - previous[1]) / incomingLength) * radius,
      ];
      const after = [
        current[0] + ((next[0] - current[0]) / outgoingLength) * radius,
        current[1] + ((next[1] - current[1]) / outgoingLength) * radius,
      ];
      commands.push(`L ${before[0]} ${before[1]}`);
      commands.push(
        `Q ${current[0]} ${current[1]} ${after[0]} ${after[1]}`,
      );
    }
    const last = route[route.length - 1];
    commands.push(`L ${last[0]} ${last[1]}`);
    return commands.join(" ");
  }

  function routeTerminalPath(tip, neighbor) {
    const length = Math.hypot(tip[0] - neighbor[0], tip[1] - neighbor[1]);
    const outward = [
      (tip[0] - neighbor[0]) / length,
      (tip[1] - neighbor[1]) / length,
    ];
    const perpendicular = [-outward[1], outward[0]];
    const base = [
      tip[0] - (outward[0] * 44),
      tip[1] - (outward[1] * 44),
    ];
    const upper = [
      base[0] + (perpendicular[0] * 15),
      base[1] + (perpendicular[1] * 15),
    ];
    const lower = [
      base[0] - (perpendicular[0] * 15),
      base[1] - (perpendicular[1] * 15),
    ];
    const upperControl = [
      tip[0] - (outward[0] * 19) + (perpendicular[0] * 6),
      tip[1] - (outward[1] * 19) + (perpendicular[1] * 6),
    ];
    const lowerControl = [
      tip[0] - (outward[0] * 19) - (perpendicular[0] * 6),
      tip[1] - (outward[1] * 19) - (perpendicular[1] * 6),
    ];
    return [
      `M ${upper[0]} ${upper[1]}`,
      `Q ${upperControl[0]} ${upperControl[1]} ${tip[0]} ${tip[1]}`,
      `Q ${lowerControl[0]} ${lowerControl[1]} ${lower[0]} ${lower[1]}`,
      `M ${base[0]} ${base[1]} L ${tip[0]} ${tip[1]}`,
    ].join(" ");
  }

  function convexHull(sourcePoints) {
    const sorted = [...sourcePoints].sort(
      ([ax, ay], [bx, by]) => ax - bx || ay - by,
    );
    if (sorted.length <= 3) return sorted;
    const cross = ([ox, oy], [ax, ay], [bx, by]) =>
      (ax - ox) * (by - oy) - (ay - oy) * (bx - ox);
    const lower = [];
    sorted.forEach((point) => {
      while (
        lower.length >= 2 &&
        cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0
      ) {
        lower.pop();
      }
      lower.push(point);
    });
    const upper = [];
    [...sorted].reverse().forEach((point) => {
      while (
        upper.length >= 2 &&
        cross(upper[upper.length - 2], upper[upper.length - 1], point) <= 0
      ) {
        upper.pop();
      }
      upper.push(point);
    });
    return [...lower.slice(0, -1), ...upper.slice(0, -1)];
  }

  function svgElement(tag, attributes = {}) {
    const element = document.createElementNS(SVG_NS, tag);
    Object.entries(attributes).forEach(([name, value]) => {
      element.setAttribute(name, String(value));
    });
    return element;
  }

  function append(parent, tag, attributes = {}) {
    const element = svgElement(tag, attributes);
    parent.appendChild(element);
    return element;
  }

  const mainRoute = routePath(routePoints);
  const reverseMainRoute = routePath([...routePoints].reverse());
  const walkers = [
    [mainRoute, "-1s", "34s", 1],
    [mainRoute, "-5.2s", "34s", 0.92],
    [mainRoute, "-9.4s", "34s", 1.08],
    [mainRoute, "-13.6s", "34s", 0.96],
    [mainRoute, "-17.8s", "34s", 1.04],
    [mainRoute, "-22s", "34s", 0.9],
    [mainRoute, "-26.2s", "34s", 1.05],
    [mainRoute, "-30.4s", "34s", 0.94],
    [reverseMainRoute, "-7s", "37s", 0.9],
    [reverseMainRoute, "-19s", "37s", 1],
    [reverseMainRoute, "-31s", "37s", 0.95],
  ];
  const labelLeaders = [
    "M 392 350 H 413 Q 419 350 419 356 V 445",
    "M 1065 440 V 599 Q 1065 607 1057 607 H 1021",
    "M 490 250 V 352 Q 490 360 498 360 H 680 L 694 336",
    "M 553 90 V 176 Q 553 182 559 182 H 575",
    "M 1148 45 V 157 Q 1148 163 1142 163 H 1129",
  ];
  const massingRenderOrder = ["contact", "background", "frames", "work", "record"];

  function drawDefinitions() {
    const defs = append(svg, "defs");
    const gradientA = append(defs, "linearGradient", {
      id: "face-shade-a", x1: 0, y1: 0, x2: 1, y2: 0,
    });
    append(gradientA, "stop", { offset: 0, "stop-color": "#e6e6e6" });
    append(gradientA, "stop", { offset: 0.56, "stop-color": "#f6f6f6" });
    append(gradientA, "stop", { offset: 1, "stop-color": "#ffffff" });

    const gradientB = append(defs, "linearGradient", {
      id: "face-shade-b", x1: 0, y1: 0, x2: 0.9, y2: 0.8,
    });
    append(gradientB, "stop", { offset: 0, "stop-color": "#ffffff" });
    append(gradientB, "stop", { offset: 0.62, "stop-color": "#f7f7f7" });
    append(gradientB, "stop", { offset: 1, "stop-color": "#dddddd" });

    const roadShade = append(defs, "linearGradient", {
      id: "road-edge-shade", x1: 0, y1: 0, x2: 0, y2: 1,
    });
    append(roadShade, "stop", { offset: 0, "stop-color": "#e1e1e1" });
    append(roadShade, "stop", { offset: 1, "stop-color": "#bdbdbd" });

    const mask = append(defs, "mask", {
      id: "road-footprint-clearance",
      maskUnits: "userSpaceOnUse",
    });
    append(mask, "rect", {
      x: -100, y: -100, width: 1600, height: 1200, fill: "white",
    });
    massings.forEach((massing) => {
      append(mask, "polygon", {
        fill: "black",
        points: pointString(massing.footprint),
      });
    });

    const glow = append(defs, "filter", {
      id: "bulb-glow",
      x: "-130%",
      y: "-130%",
      width: "360%",
      height: "360%",
    });
    append(glow, "feGaussianBlur", {
      in: "SourceAlpha", stdDeviation: 3.5, result: "blur-core",
    });
    append(glow, "feGaussianBlur", {
      in: "SourceAlpha", stdDeviation: 12, result: "blur-halo",
    });
    append(glow, "feGaussianBlur", {
      in: "SourceAlpha", stdDeviation: 26, result: "blur-bloom",
    });
    append(glow, "feFlood", {
      "flood-color": "#fffdf6", "flood-opacity": 0.98, result: "tint-core",
    });
    append(glow, "feFlood", {
      "flood-color": "#fff4d4", "flood-opacity": 0.68, result: "tint-halo",
    });
    append(glow, "feFlood", {
      "flood-color": "#fff8e6", "flood-opacity": 0.4, result: "tint-bloom",
    });
    append(glow, "feComposite", {
      in: "tint-core", in2: "blur-core", operator: "in", result: "glow-core",
    });
    append(glow, "feComposite", {
      in: "tint-halo", in2: "blur-halo", operator: "in", result: "glow-halo",
    });
    append(glow, "feComposite", {
      in: "tint-bloom", in2: "blur-bloom", operator: "in", result: "glow-bloom",
    });
    const merge = append(glow, "feMerge");
    append(merge, "feMergeNode", { in: "glow-bloom" });
    append(merge, "feMergeNode", { in: "glow-halo" });
    append(merge, "feMergeNode", { in: "glow-core" });
    append(merge, "feMergeNode", { in: "SourceGraphic" });
  }

  function drawMassing(parent, massing) {
    const base = translate(massing.footprint, 0, -massing.drop);
    const top = translate(
      base,
      0,
      -(massing.height * elevatedViewHeightScale),
    );
    const outline = convexHull([...top, ...base]);
    const frontCornerIndex = base.reduce(
      (frontIndex, point, index) =>
        point[1] > base[frontIndex][1] ? index : frontIndex,
      0,
    );
    const prism = append(parent, "g", { class: "irregular-prism" });
    base.forEach((point, index) => {
      const nextIndex = (index + 1) % base.length;
      append(prism, "polygon", {
        class: `massing-face massing-face-${index % 3}`,
        points: pointString([top[index], top[nextIndex], base[nextIndex], point]),
      });
    });
    append(prism, "polygon", {
      class: "massing-top",
      points: pointString(top),
    });
    append(prism, "polygon", {
      class: "massing-outline",
      points: pointString(outline),
    });
    append(prism, "line", {
      class: "massing-front-edge",
      x1: top[frontCornerIndex][0],
      y1: top[frontCornerIndex][1],
      x2: base[frontCornerIndex][0],
      y2: base[frontCornerIndex][1],
    });
  }

  function renderMap() {
    drawDefinitions();

    const construction = append(svg, "g", { class: "construction-field" });
    [
      "M 110 900 L 1190 360",
      "M 215 930 L 1295 390",
      "M 315 950 L 1345 435",
      "M 355 900 L 1215 470",
      "M 560 900 L 1265 548",
    ].forEach((d) => append(construction, "path", { d }));

    const ground = append(svg, "g", {
      class: "shared-ground",
      mask: "url(#road-footprint-clearance)",
    });
    append(ground, "polygon", {
      class: "road-top-shape",
      points: pointString(roadBoundary),
    });
    append(ground, "path", { class: "ground-line", d: mainRoute });
    append(ground, "path", {
      class: "route-arrow-wing",
      d: routeTerminalPath(routePoints[0], routePoints[1]),
    });
    append(ground, "path", {
      class: "route-arrow-wing",
      d: routeTerminalPath(
        routePoints[routePoints.length - 1],
        routePoints[routePoints.length - 2],
      ),
    });

    const projections = append(svg, "g", { class: "projection-field" });
    massings.forEach((massing) => {
      massing.footprint.forEach(([x, y]) => {
        append(projections, "line", {
          "data-section": massing.id,
          x1: x,
          y1: y - massing.drop,
          x2: x,
          y2: y,
        });
      });
    });

    const footprints = append(svg, "g", { class: "footprints" });
    massings.forEach((massing) => {
      append(footprints, "polygon", {
        "data-section": massing.id,
        points: pointString(massing.footprint),
      });
    });

    /* Default: people behind massings. For 01/04 we raise people above massings. */
    walkingField = append(svg, "g", { class: "walking-field" });
    massingField = append(svg, "g", { class: "massing-field" });

    walkers.forEach(([route, begin, duration, scale]) => {
      const walker = append(walkingField, "g", { class: "walker" });
      const figure = append(walker, "g", {
        transform: `scale(${scale * 4})`,
      });
      append(figure, "circle", {
        class: "walker-head", cx: 0, cy: -12.6, r: 2.15,
      });
      append(figure, "path", {
        class: "walker-body", d: "M 0 -10.1 L 0 -2",
      });
      append(figure, "path", {
        class: "walker-arm walker-arm-a", d: "M 0 -8.6 L -3.2 -3.4",
      });
      append(figure, "path", {
        class: "walker-arm walker-arm-b", d: "M 0 -8.6 L 3.2 -3.4",
      });
      append(figure, "path", {
        class: "walker-leg walker-leg-a", d: "M 0 -2 L -2.7 5.2",
      });
      append(figure, "path", {
        class: "walker-leg walker-leg-b", d: "M 0 -2 L 2.7 5.2",
      });
      append(walker, "animateMotion", {
        path: route,
        dur: duration,
        begin,
        repeatCount: "indefinite",
        rotate: 0,
        calcMode: "linear",
      });
    });

    massingRenderOrder.forEach((id) => {
      const massing = massings.find((item) => item.id === id);
      const section = sections.find((item) => item.id === id);
      const base = translate(massing.footprint, 0, -massing.drop);
      const top = translate(base, 0, -massing.height);
      const control = append(massingField, "g", {
        class: "massing-control",
        "data-section": id,
        role: "button",
        tabindex: -1,
        "aria-label": `Open ${section.title}`,
      });
      append(control, "polygon", {
        class: "massing-hit-target",
        points: pointString(convexHull([...top, ...base])),
      });
      const movingMassing = append(control, "g", {
        class: `massing massing-${id}`,
        "data-section": id,
        style: `--drop-y:${(massing.drop / 1000) * 100}%`,
      });
      drawMassing(movingMassing, massing);
      bindInteractiveControl(control, id);
    });

    leadersField = append(svg, "g", { class: "label-leaders" });
    labelLeaders.forEach((d, index) => {
      append(leadersField, "path", {
        "data-section": sections[index].id,
        d,
      });
    });
  }

  function syncWalkerDepth(selected) {
    if (!walkingField || !massingField || !leadersField) return;
    /* Raise people above buildings for 01/04 without reparenting massings
       (reparenting was killing the fall transition and click targets). */
    if (peopleFrontIds.has(selected)) {
      svg.insertBefore(walkingField, leadersField);
    } else {
      svg.insertBefore(walkingField, massingField);
    }
  }

  function bindInteractiveControl(element, id) {
    element.addEventListener("pointerenter", () => {
      activeId = id;
      updateSelection();
    });
    element.addEventListener("pointerleave", () => {
      if (activeId === id) activeId = null;
      updateSelection();
    });
    element.addEventListener("focus", () => {
      activeId = id;
      updateSelection();
    });
    element.addEventListener("blur", () => {
      if (activeId === id) activeId = null;
      updateSelection();
    });
    element.addEventListener("click", () => enterSection(id));
    element.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        enterSection(id);
      }
    });
  }

  function renderNavigation() {
    sections.forEach((section) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `section-label align-${section.align}`;
      button.dataset.section = section.id;
      button.style.setProperty("--label-x", `${section.x}%`);
      button.style.setProperty("--label-y", `${section.y}%`);
      button.setAttribute("aria-label", `${section.number} ${section.title}`);
      button.tabIndex = -1;
      button.innerHTML = `
        <span>${section.number}</span>
        <strong>${section.title}</strong>
        <em>Enter</em>
      `;
      bindInteractiveControl(button, section.id);
      navigation.appendChild(button);
    });
  }

  function selectedId() {
    return enteredId || activeId;
  }

  function updateSelection() {
    const selected = selectedId();
    openingPage.querySelectorAll("[data-section]").forEach((element) => {
      const isSelected = element.dataset.section === selected;
      if (
        element.matches(
          ".massing, .section-label, .label-leaders path, .projection-field line, .footprints polygon",
        )
      ) {
        element.classList.toggle("is-selected", isSelected);
        if (element.classList.contains("section-label")) {
          element.classList.toggle("is-active", isSelected);
        }
      }
    });
    syncWalkerDepth(selected);
  }

  function goToSiteSection(sectionId, instant) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    /* Jump without a visible scroll animation (CSS scroll-behavior: smooth
       can still animate native scrolls — force an immediate offset jump). */
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto";
    const top =
      target.getBoundingClientRect().top +
      window.pageYOffset -
      (parseFloat(getComputedStyle(target).scrollMarginTop) || 0);

    if (instant || reduceMotion) {
      window.scrollTo(0, Math.max(0, top));
      requestAnimationFrame(function () {
        html.style.scrollBehavior = previous;
      });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
      html.style.scrollBehavior = previous;
    }
  }

  function removeOpener() {
    document.body.classList.remove("opener-lock");
    openingPage.classList.add("is-gone");
    window.setTimeout(() => {
      openingPage.setAttribute("hidden", "");
    }, 760);
  }

  function enterSection(id) {
    if (!introComplete || dismissed) return;
    dismissed = true;
    enteredId = id;
    updateSelection();

    const siteSection = sectionTargets[id] || id;
    const control = openingPage.querySelector(`.massing-control[data-section="${id}"]`);

    if (reduceMotion) {
      document.body.classList.remove("opener-lock");
      openingPage.setAttribute("hidden", "");
      goToSiteSection(siteSection, true);
      return;
    }

    const beginZoom = () => {
      /* Zoom toward the fallen lit massing, then flood into the real section */
      if (control && mapStage) {
        const stageRect = mapStage.getBoundingClientRect();
        const massEl = control.querySelector(".massing") || control;
        const massRect = massEl.getBoundingClientRect();
        const massCx = massRect.left + massRect.width / 2;
        const massCy = massRect.top + massRect.height / 2;
        const originX = ((massCx - stageRect.left) / Math.max(1, stageRect.width)) * 100;
        const originY = ((massCy - stageRect.top) / Math.max(1, stageRect.height)) * 100;
        const viewCx = window.innerWidth / 2;
        const viewCy = window.innerHeight * 0.48;
        const scale = 3.55;
        const enterTx = (viewCx - massCx) * 0.92;
        const enterTy = (viewCy - massCy) * 0.92;

        mapStage.style.transformOrigin = `${originX}% ${originY}%`;
        openingPage.style.setProperty("--enter-scale", String(scale));
        openingPage.style.setProperty("--enter-tx", `${enterTx.toFixed(1)}px`);
        openingPage.style.setProperty("--enter-ty", `${enterTy.toFixed(1)}px`);

        if (openerFill) {
          openerFill.style.left = `${massCx}px`;
          openerFill.style.top = `${massCy}px`;
        }
      }

      openingPage.classList.add("is-entering");

      window.setTimeout(() => {
        openingPage.classList.add("is-filling");
      }, 520);

      window.setTimeout(() => {
        /* Unlock + jump while the opener still covers the viewport,
           so the destination change is not seen as a scroll. */
        document.body.classList.remove("opener-lock");
        goToSiteSection(siteSection, true);
        requestAnimationFrame(() => {
          goToSiteSection(siteSection, true);
          removeOpener();
        });
      }, 1180);
    };

    /* Let the fall settle so zoom aims at the landed building */
    window.setTimeout(beginZoom, 580);
  }

  function completeIntro() {
    if (introComplete) return;
    introComplete = true;
    openingPage.classList.remove("is-intro");
    openingPage.classList.add("is-ready");
    mapStage.setAttribute("aria-hidden", "false");
    if (skipButton) {
      const fill = skipButton.querySelector(".skip-intro__fill");
      if (fill) fill.style.animationPlayState = "paused";
      skipButton.remove();
    }
    document
      .querySelectorAll(".massing-control, .section-label")
      .forEach((element) => {
        element.tabIndex = 0;
      });
  }

  function enterWebsite() {
    if (!introComplete || dismissed) return;
    dismissed = true;

    if (reduceMotion) {
      document.body.classList.remove("opener-lock");
      openingPage.setAttribute("hidden", "");
      goToSiteSection("top", true);
      return;
    }

    if (openerFill) {
      openerFill.style.left = `${window.innerWidth / 2}px`;
      openerFill.style.top = `${window.innerHeight / 2}px`;
    }

    openingPage.classList.add("is-entering-site");

    window.setTimeout(() => {
      openingPage.classList.add("is-filling");
    }, 180);

    window.setTimeout(() => {
      document.body.classList.remove("opener-lock");
      goToSiteSection("top", true);
      requestAnimationFrame(() => {
        goToSiteSection("top", true);
        removeOpener();
      });
    }, 880);
  }

  function dismissForDeepLink() {
    dismissed = true;
    introComplete = true;
    document.body.classList.remove("opener-lock");
    openingPage.setAttribute("hidden", "");
  }

  /* Lock page scroll while the opener is up */
  if (!location.hash || location.hash.length <= 1) {
    document.body.classList.add("opener-lock");
  } else {
    dismissForDeepLink();
  }

  renderMap();
  renderNavigation();
  if (skipButton) skipButton.addEventListener("click", completeIntro);
  if (enterWebsiteButton) {
    enterWebsiteButton.addEventListener("click", enterWebsite);
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !dismissed) {
      if (!introComplete) completeIntro();
      else enterWebsite();
    }
  });

  window.setTimeout(completeIntro, reduceMotion ? 0 : INTRO_MS);
})();
