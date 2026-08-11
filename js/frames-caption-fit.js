/**
 * Frames of Practice — keep long captions from overlapping the active photo
 * by shifting the photo down (no caption scrolling).
 * Accounts for transform centering: `top` is the frame center, not its top edge.
 */
(function framesCaptionFit() {
  const root = document.getElementById("frames-of-practice-root");
  if (!root) return;

  const GAP = 56;
  const MIN_IMG = 26;
  const MAX_IMG = 46;

  function clearFit(frame) {
    if (!frame) return;
    frame.classList.remove("fit-adjusted");
    frame.style.removeProperty("--fit-frame-top");
    frame.style.removeProperty("--fit-img-max");
  }

  function fit() {
    const viewport = root.querySelector(".viewport");
    const caption = root.querySelector("article.caption");
    const frame = root.querySelector(".spatial-frame.active");
    if (!viewport || !caption || !frame) return;

    const isTop =
      caption.classList.contains("top-center") ||
      caption.classList.contains("left-top") ||
      caption.classList.contains("right-top");
    const isBottom =
      caption.classList.contains("bottom-center") ||
      caption.classList.contains("left-bottom") ||
      caption.classList.contains("right-bottom");

    if (!isTop && !isBottom) {
      clearFit(frame);
      return;
    }

    const mobile = window.matchMedia("(width <= 760px)").matches;
    if (mobile) {
      frame.classList.add("fit-adjusted");
      frame.style.setProperty("--fit-frame-top", "38%");
      frame.style.setProperty("--fit-img-max", "38svh");
      return;
    }

    const vRect = viewport.getBoundingClientRect();
    const cRect = caption.getBoundingClientRect();
    const vh = vRect.height || 1;

    if (isTop) {
      const clearTop = cRect.bottom - vRect.top + GAP;
      const available = Math.max(140, vh - clearTop - 40);
      const imgMaxVh = Math.max(MIN_IMG, Math.min(MAX_IMG, (available / vh) * 100));
      // Estimate frame height from img max (portrait frames are taller than landscape)
      const isPortrait = frame.classList.contains("portrait");
      const estimatedH = isPortrait
        ? Math.min(available, (imgMaxVh / 100) * vh)
        : Math.min(available, (imgMaxVh / 100) * vh * 0.85);
      // `top` positions the center of the frame
      let centerPx = clearTop + estimatedH / 2;
      const maxCenter = vh - estimatedH / 2 - 28;
      centerPx = Math.min(centerPx, maxCenter);
      const topPct = Math.min(80, Math.max(56, (centerPx / vh) * 100));

      frame.classList.add("fit-adjusted");
      frame.style.setProperty("--fit-frame-top", `${topPct}%`);
      frame.style.setProperty("--fit-img-max", `${imgMaxVh}svh`);
      return;
    }

    const roomAbove = cRect.top - vRect.top - GAP;
    const imgMaxVh = Math.max(MIN_IMG, Math.min(MAX_IMG, (roomAbove / vh) * 100));
    const estimatedH = Math.min(roomAbove, (imgMaxVh / 100) * vh);
    const centerPx = Math.max(estimatedH / 2 + 24, roomAbove - estimatedH / 2);
    const topPct = Math.min(48, Math.max(30, (centerPx / vh) * 100));
    frame.classList.add("fit-adjusted");
    frame.style.setProperty("--fit-frame-top", `${topPct}%`);
    frame.style.setProperty("--fit-img-max", `${imgMaxVh}svh`);
  }

  let scheduled = 0;
  function schedule() {
    cancelAnimationFrame(scheduled);
    scheduled = requestAnimationFrame(() => {
      requestAnimationFrame(fit);
    });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(root, {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["class"],
  });

  window.addEventListener("resize", schedule, { passive: true });
  window.addEventListener("scroll", schedule, { passive: true });
  schedule();
})();
