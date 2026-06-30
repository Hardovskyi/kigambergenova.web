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
     SELECTED WORK — horizontal gallery: drag + wheel to scroll
     ========================================================= */
  (function workGallery() {
    var track = document.getElementById("workTrack");
    if (!track) return;

    document.querySelectorAll(".work-card__media img").forEach(function (img) {
      wirePlaceholder(img, ".work-card__media");
    });

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
     FRAMES OF PRACTICE — scene reveals, active chapter, parallax
     ========================================================= */
  (function frames() {
    var framesSection = document.getElementById("frames");
    var scenes = document.querySelectorAll(".scene");
    if (!framesSection || !scenes.length) return;
    var railItems = document.querySelectorAll(".rail__item");
    var readouts = document.querySelectorAll(".readout");
    var progress = document.getElementById("railProgress");

    document.querySelectorAll(".frame-img .frame-photo").forEach(function (img) {
      wirePlaceholder(img, ".frame-img");
    });

    function setActive(id) {
      railItems.forEach(function (it) {
        it.classList.toggle("is-active", it.getAttribute("data-target") === id);
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

    if (!("IntersectionObserver" in window)) {
      scenes.forEach(function (s) { s.classList.add("is-in"); });
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
