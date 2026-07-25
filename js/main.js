/* =========================================================
   Kamila Igambergenova — interactions
   ========================================================= */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var docEl = document.documentElement;
  if (reduceMotion) docEl.classList.add("no-motion");
  else docEl.classList.add("has-motion");

  /* ---- current year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById("navMenu");
  var links = document.querySelector(".nav__links");
  if (menuBtn && links) {
    menuBtn.addEventListener("click", function () {
      links.classList.toggle("open");
      menuBtn.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { links.classList.remove("open"); menuBtn.classList.remove("open"); }
    });
  }

  /* ---- scroll progress thread (under nav) ---- */
  var scrollThread = document.getElementById("scrollThread");
  function updateProgress() {
    if (!scrollThread) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    var pct = max > 0 ? (h.scrollTop || window.pageYOffset) / max : 0;
    scrollThread.style.width = (pct * 100).toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  /* ---- solid nav tint matched to the active section ---- */
  (function navTheme() {
    var nav = document.getElementById("nav");
    if (!nav) return;
    var map = [
      { id: "top", key: "top" },
      { id: "selected-work", key: "selected-work" },
      { id: "record", key: "record" },
      { id: "frames-of-practice", key: "frames" },
      { id: "what-i-bring", key: "bring" },
      { id: "background", key: "background" },
      { id: "contact", key: "contact" },
    ];
    var linkMap = {
      "selected-work": "#selected-work",
      record: "#record",
      frames: "#frames-of-practice",
      background: "#background",
      contact: "#contact",
    };

    function setNav(key) {
      document.body.setAttribute("data-nav", key);
      var href = linkMap[key];
      document.querySelectorAll(".nav__links a").forEach(function (a) {
        var match = href && a.getAttribute("href") === href;
        a.classList.toggle("is-active", !!match);
      });
    }

    setNav("top");
    if (!("IntersectionObserver" in window)) return;

    var ratios = {};
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ratios[entry.target.id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        });
        var best = "top";
        var bestRatio = 0;
        map.forEach(function (item) {
          var r = ratios[item.id] || 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = item.key;
          }
        });
        if (bestRatio > 0) setNav(best);
      },
      { rootMargin: "-12% 0px -55% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] }
    );
    map.forEach(function (item) {
      var el = document.getElementById(item.id);
      if (el) io.observe(el);
    });
  })();

  /* ---- generic reveal-on-scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- shared placeholder fallback for any image with a sibling label ---- */
  function wirePlaceholder(img, frameSelector) {
    function fail() {
      var f = img.closest(frameSelector);
      if (f) f.classList.add("is-empty");
    }
    if (img.complete && img.naturalWidth === 0) fail();
    img.addEventListener("error", fail);
  }

  /* =========================================================
     MANIFESTO — words light up as the statement scrolls through
     ========================================================= */
  (function manifesto() {
    var el = document.querySelector("[data-reveal-words]");
    if (!el) return;
    var accentWords = { "knot": 1, "disconnection": 1, "shared": 1, "people": 1 };
    var text = el.textContent.trim();
    if (reduceMotion || !("IntersectionObserver" in window)) { return; }

    // split into word spans (single source of truth stays in the DOM text)
    el.textContent = "";
    var words = text.split(/\s+/).map(function (w) {
      var span = document.createElement("span");
      span.className = "word";
      var clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
      if (accentWords[clean]) span.className += " accent";
      span.textContent = w;
      el.appendChild(span);
      el.appendChild(document.createTextNode(" "));
      return span;
    });
    el.classList.add("is-split");

    function update() {
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight;
      // progress: 0 when top hits 80% of viewport, 1 when bottom passes 40%
      var start = vh * 0.85, end = vh * 0.35;
      var p = (start - r.top) / (start - end + r.height * 0.4);
      p = Math.max(0, Math.min(1, p));
      var lit = Math.round(p * words.length);
      for (var i = 0; i < words.length; i++) {
        words[i].classList.toggle("lit", i < lit);
      }
    }
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  })();

  /* =========================================================
     THE PATH — sticky media; active image swaps with active step
     ========================================================= */
  (function path() {
    var steps = document.querySelectorAll(".path__step");
    var imgs = document.querySelectorAll(".path__img");
    if (!steps.length || !imgs.length) return;

    document.querySelectorAll(".path__img img").forEach(function (img) {
      wirePlaceholder(img, ".path__img");
    });

    function activate(idx) {
      steps.forEach(function (s) { s.classList.toggle("is-active", s.getAttribute("data-step") === idx); });
      imgs.forEach(function (f) { f.classList.toggle("is-active", f.getAttribute("data-step") === idx); });
    }

    if (!("IntersectionObserver" in window)) { return; }
    var stepIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) activate(e.target.getAttribute("data-step"));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    steps.forEach(function (s) { stepIO.observe(s); });
  })();

  /* =========================================================
     SELECTED WORK — placeholders + optional horizontal gallery
     ========================================================= */
  (function workGallery() {
    document.querySelectorAll(".work-card__media img, .work-feat__media img, .work-sup__media img").forEach(function (img) {
      var sel = img.closest(".work-feat__media") ? ".work-feat__media"
        : img.closest(".work-sup__media") ? ".work-sup__media"
        : ".work-card__media";
      wirePlaceholder(img, sel);
    });

    var track = document.getElementById("workTrack");
    if (!track) return;

    // translate vertical wheel into horizontal scroll while hovering the track
    track.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // already horizontal
      var max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      var atStart = track.scrollLeft <= 0;
      var atEnd = track.scrollLeft >= max - 1;
      // only hijack when there is room to move in that direction
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      e.preventDefault();
      track.scrollLeft += e.deltaY;
    }, { passive: false });

    // pointer drag-to-scroll
    var down = false, startX = 0, startLeft = 0, moved = 0;
    track.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      down = true; moved = 0;
      startX = e.clientX; startLeft = track.scrollLeft;
      track.classList.add("is-dragging");
    });
    track.addEventListener("pointermove", function (e) {
      if (!down) return;
      var dx = e.clientX - startX;
      moved += Math.abs(dx);
      track.scrollLeft = startLeft - dx;
    });
    function endDrag() {
      if (!down) return;
      down = false; track.classList.remove("is-dragging");
    }
    track.addEventListener("pointerup", endDrag);
    track.addEventListener("pointercancel", endDrag);
    track.addEventListener("pointerleave", endDrag);
    // prevent a drag from triggering the card link
    track.addEventListener("click", function (e) {
      if (moved > 8) { e.preventDefault(); }
    }, true);
  })();

  /* =========================================================
     FRAMES image strips — drag + wheel to scroll (per chapter)
     ========================================================= */
  (function frameStrips() {
    var strips = document.querySelectorAll(".strip");
    if (!strips.length) return;

    strips.forEach(function (strip) {
      strip.addEventListener("wheel", function (e) {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        var max = strip.scrollWidth - strip.clientWidth;
        if (max <= 0) return;
        var atStart = strip.scrollLeft <= 0;
        var atEnd = strip.scrollLeft >= max - 1;
        if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
        e.preventDefault();
        strip.scrollLeft += e.deltaY;
      }, { passive: false });

      var down = false, startX = 0, startLeft = 0, moved = 0;
      strip.addEventListener("pointerdown", function (e) {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        down = true; moved = 0;
        startX = e.clientX; startLeft = strip.scrollLeft;
        strip.classList.add("is-dragging");
        strip.setPointerCapture && strip.setPointerCapture(e.pointerId);
      });
      strip.addEventListener("pointermove", function (e) {
        if (!down) return;
        var dx = e.clientX - startX;
        moved += Math.abs(dx);
        strip.scrollLeft = startLeft - dx;
      });
      function endDrag() {
        if (!down) return;
        down = false; strip.classList.remove("is-dragging");
      }
      strip.addEventListener("pointerup", endDrag);
      strip.addEventListener("pointercancel", endDrag);
      strip.addEventListener("pointerleave", endDrag);
      // block image drag ghost while dragging the strip
      strip.addEventListener("dragstart", function (e) { e.preventDefault(); });
    });
  })();

  /* =========================================================
     KEY-PLAN NAV — unravel-to-thread, corner dock, untangle states
     ========================================================= */
  (function keyplanNav() {
    var heroEl = document.getElementById("top");
    var dock = document.getElementById("kpDock");

    function goTo(sectionId, instant) {
      if (!sectionId) return;
      var t = document.getElementById(sectionId);
      if (t) t.scrollIntoView({ behavior: instant || reduceMotion ? "auto" : "smooth" });
    }

    /* Opener entry is handled by js/connection-nav.js (axonometric map).
       Dock still jumps to sections once the site is visible. */

    /* the corner marker (dock) appears once you leave the hero */
    if (dock && heroEl && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { dock.classList.toggle("show", !e.isIntersecting); });
      }, { threshold: 0 }).observe(heroEl);
    }

    /* dock nodes jump to their section */
    document.querySelectorAll(".kp-node[data-section]").forEach(function (el) {
      var sec = el.getAttribute("data-section");
      el.addEventListener("click", function () { goTo(sec); });
      el.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); goTo(sec); }
      });
    });

    /* dock nodes untangle: tangled → active (highlight) → passed (resolved dot) */
    var order = ["selected-work", "record", "frames-of-practice", "background", "contact"];
    var dockNodes = {};
    document.querySelectorAll(".kp-node[data-section]").forEach(function (n) {
      dockNodes[n.getAttribute("data-section")] = n;
    });
    if (Object.keys(dockNodes).length && "IntersectionObserver" in window) {
      var secObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          var activeIdx = order.indexOf(e.target.id);
          order.forEach(function (id, i) {
            var n = dockNodes[id];
            if (!n) return;
            n.classList.toggle("is-active", i === activeIdx);
            n.classList.toggle("is-passed", i < activeIdx);
          });
        });
      }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
      order.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) secObs.observe(el);
      });
    }

    /* reveal inter-section seams + section knots as they enter */
    var seamEls = document.querySelectorAll(".seam, .knot--section, .knot--resolved");
    if ("IntersectionObserver" in window && !reduceMotion) {
      var seamIO = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); seamIO.unobserve(e.target); }
        });
      }, { threshold: 0.35 });
      seamEls.forEach(function (el) { seamIO.observe(el); });
    } else {
      seamEls.forEach(function (el) { el.classList.add("is-in"); });
    }
  })();

  /* =========================================================
     FRAMES OF PRACTICE — scene reveals, active chapter, parallax
     ========================================================= */
  (function frames() {
    var framesSection = document.getElementById("frames-of-practice");
    var scenes = document.querySelectorAll(".scene");
    if (!framesSection || !scenes.length) return;
    var railItems = document.querySelectorAll(".frames-index__item, .rail__item");
    var readouts = document.querySelectorAll(".readout");
    var progress = document.getElementById("railProgress");

    document.querySelectorAll(".frame-img .frame-photo").forEach(function (img) {
      wirePlaceholder(img, ".frame-img");
    });

    function setActive(id) {
      railItems.forEach(function (it) {
        var target = it.getAttribute("data-target");
        it.classList.toggle("is-active", target === id);
      });
      readouts.forEach(function (r) {
        r.classList.toggle("is-active", r.getAttribute("data-for") === id);
      });
    }

    function updateRailProgress() {
      if (!progress) return;
      var r = framesSection.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = r.height - vh;
      var pct = total > 0 ? (-r.top) / total : 0;
      pct = Math.max(0, Math.min(1, pct));
      progress.style.height = (pct * 100).toFixed(2) + "%";
    }
    window.addEventListener("scroll", updateRailProgress, { passive: true });
    updateRailProgress();

    var connectors = framesSection.querySelectorAll(".scene__connector");

    if (!("IntersectionObserver" in window)) {
      scenes.forEach(function (s) { s.classList.add("is-in"); });
      connectors.forEach(function (c) { c.classList.add("is-in"); });
      return;
    }

    var revealIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); revealIO.unobserve(e.target); }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -5% 0px" }
    );
    scenes.forEach(function (s) { revealIO.observe(s); });
    connectors.forEach(function (c) { revealIO.observe(c); });

    scenes.forEach(function (s) {
      var r = s.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > window.innerHeight * 0.1) {
        s.classList.add("is-in");
      }
    });

    var activeIO = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    scenes.forEach(function (s) { activeIO.observe(s); });

    if (reduceMotion) return;
    var heroes = Array.prototype.slice.call(document.querySelectorAll(".frame-img--hero img"));
    if (!heroes.length) return;
    var ticking = false;
    function applyParallax() {
      var vh = window.innerHeight;
      heroes.forEach(function (img) {
        var r = img.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var rel = (r.top + r.height / 2 - vh / 2) / vh;
        img.style.setProperty("--py", (rel * -22).toFixed(1) + "px");
      });
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(applyParallax); }
    }, { passive: true });
    applyParallax();
  })();

  /* =========================================================
     THE THREAD — flowing knot line, CONFINED to the hero
     ========================================================= */
  var canvas = document.getElementById("thread-canvas");
  var hero = document.getElementById("top");
  if (!canvas || !hero || reduceMotion) return;
  var ctx = canvas.getContext("2d");
  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0;
  var mouse = { x: 0.5, y: 0.5, active: false };
  var heroVisible = true;

  function resize() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize();
  window.addEventListener("resize", resize);

  // only animate while the hero is on screen
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      heroVisible = entries[0].isIntersecting;
    }, { threshold: 0 }).observe(hero);
  }

  hero.addEventListener("mousemove", function (e) {
    var r = hero.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / W;
    mouse.y = (e.clientY - r.top) / H;
    mouse.active = true;
  });
  hero.addEventListener("mouseleave", function () { mouse.active = false; });

  // parallel threads: drift = phase speed (rad/s); knotSpeed = travel/s
  var threads = [
    { amp: 0.16, freq: 1.4, drift: 0.10, knotSpeed: 0.012, off: 0.0, color: "rgba(193,87,47,0.34)", width: 1.4, yBase: 0.52 },
    { amp: 0.10, freq: 2.1, drift: 0.14, knotSpeed: 0.016, off: 2.1, color: "rgba(193,87,47,0.18)", width: 1.0, yBase: 0.44 },
    { amp: 0.13, freq: 1.0, drift: 0.08, knotSpeed: 0.009, off: 4.2, color: "rgba(58,74,82,0.14)",  width: 1.0, yBase: 0.62 }
  ];
  var mInfluence = 0;

  function threadY(t, p, phase) {
    var wave =
      Math.sin(p * Math.PI * t.freq + phase + t.off) * t.amp +
      Math.sin(p * Math.PI * t.freq * 2.3 + phase * 0.6 + t.off) * (t.amp * 0.3);
    return (t.yBase + wave + mInfluence) * H;
  }

  function drawThread(t, secs) {
    var steps = 60;
    var phase = secs * t.drift;
    ctx.beginPath();
    ctx.lineWidth = t.width;
    ctx.strokeStyle = t.color;
    ctx.lineCap = "round";
    for (var i = 0; i <= steps; i++) {
      var p = i / steps;
      var x = p * W;
      var y = threadY(t, p, phase);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.stroke();
    var knots = 3;
    for (var k = 0; k < knots; k++) {
      var kp = (secs * t.knotSpeed + k / knots) % 1;
      var kx = kp * W;
      var ky = threadY(t, kp, phase);
      ctx.beginPath();
      ctx.arc(kx, ky, t.width * 1.8, 0, Math.PI * 2);
      ctx.fillStyle = t.color;
      ctx.fill();
    }
  }

  function loop(time) {
    requestAnimationFrame(loop);
    if (!heroVisible) return;
    var secs = time * 0.001;
    var target = mouse.active ? (mouse.y - 0.5) * 0.12 : 0;
    mInfluence += (target - mInfluence) * 0.04;
    ctx.clearRect(0, 0, W, H);
    for (var i = 0; i < threads.length; i++) drawThread(threads[i], secs);
  }
  requestAnimationFrame(loop);
})();
