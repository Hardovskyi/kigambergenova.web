/**
 * ============================================================
 * FRAMES OF PRACTICE — all photo paths in one place
 * ============================================================
 *
 * FILE TO EDIT:  js/frames-photos.js   ← you are here
 * Loaded from:   index.html  (before frames-of-practice.js)
 *
 * Each chapter has 10 sheets in display order (01 → 10).
 *   - Sheets with a photo object = visible image
 *   - null = IMAGE PENDING placeholder (fill in when ready)
 *
 * Current layout (matches the site):
 *   01, 03, 06, 08  → built-in photos (paths already set)
 *   02, 04, 05, 07, 09, 10 → placeholders (null — add objects here)
 *
 * To add a placeholder photo, replace null with:
 *   {
 *     src: "futureassets/japan-05.jpg",
 *     alt: "Short description for accessibility",
 *     title: "Short caption title.",
 *     note: "One supporting sentence.",
 *     detail: "TAG / TAG / TAG",
 *     format: "portrait"   // or "landscape"
 *   }
 *
 * Image files live in:  futureassets/
 * ============================================================
 */
window.FRAMES_PHOTOS = {
  japan: [
    /* 01 — built-in */
    {
      src: "futureassets/japan-01.jpg",
      alt: "Timber ceiling installation above a stair and railway platform in Japan",
      title: "Structure made atmosphere visible.",
      note: "A ceiling could be read as material, rhythm, shadow, and movement at once.",
      detail: "TIMBER / SHADOW / DESCENT",
      format: "portrait",
    },
    /* 02 — placeholder */
    null,
    /* 03 — built-in */
    {
      src: "futureassets/japan-02.jpg",
      alt: "Architectural library lined with books and reflected in a glass table",
      title: "An archive became an interior.",
      note: "Knowledge was not stored behind the space; it formed the space itself.",
      detail: "ARCHIVE / ENCLOSURE / REFLECTION",
      format: "portrait",
    },
    /* 04 — placeholder */
    null,
    /* 05 — placeholder */
    null,
    /* 06 — built-in */
    {
      src: "futureassets/japan-03.jpg",
      alt: "Open workshop hall organized by a fine structural grid",
      title: "Making occupied the whole room.",
      note: "A generous frame allowed tools, people, plants, and unfinished work to coexist.",
      detail: "STRUCTURE / USE / CHANGE",
      format: "landscape",
    },
    /* 07 — placeholder */
    null,
    /* 08 — built-in */
    {
      src: "futureassets/japan-04.jpg",
      alt: "Two people seated beneath a long opening framing trees",
      title: "The quietest space held the strongest encounter.",
      note: "A single opening brought scale, landscape, light, and occupation into one gesture.",
      detail: "OPENING / LIGHT / OCCUPATION",
      format: "portrait",
    },
    /* 09 — placeholder */
    null,
    /* 10 — placeholder */
    null,
  ],

  texas: [
    /* 01 — built-in */
    {
      src: "futureassets/texas-01.jpg",
      alt: "Community renovation team gathered inside a house",
      title: "The project began as a collective.",
      note: "Before any task, the room was already shaped by the people willing to contribute.",
      detail: "TEAM / EXISTING ROOM",
      format: "landscape",
    },
    /* 02 — placeholder */
    null,
    /* 03 — built-in */
    {
      src: "futureassets/texas-02.jpg",
      alt: "Team members investigating a damaged bathroom wall during renovation",
      title: "The wall revealed the real problem.",
      note: "Useful work began with looking closely, asking questions, and accepting what the site exposed.",
      detail: "OPEN WALL / SITE EVIDENCE",
      format: "portrait",
    },
    /* 04 — placeholder */
    null,
    /* 05 — placeholder */
    null,
    /* 06 — built-in */
    {
      src: "futureassets/texas-03.jpg",
      alt: "Community renovation volunteers working together outside a house",
      title: "The work moved through many hands.",
      note: "Coordination was not separate from the project; it was the project’s operating structure.",
      detail: "MEASURE / REPAIR / COORDINATE",
      format: "landscape",
    },
    /* 07 — placeholder */
    null,
    /* 08 — built-in */
    {
      src: "futureassets/texas-04.jpg",
      alt: "Renovation team portrait in the completed room",
      title: "Completion belonged to everyone.",
      note: "The final room recorded shared labor more clearly than individual authorship.",
      detail: "ROOM / SHARED LABOR",
      format: "landscape",
    },
    /* 09 — placeholder */
    null,
    /* 10 — placeholder */
    null,
  ],

  india: [
    /* 01 — built-in */
    {
      src: "futureassets/india-01.jpg",
      alt: "Builder using a plumb line on a rural construction site in India",
      title: "The site was measured before it was drawn again.",
      note: "Lines, levels, and local judgment turned abstraction into a physical agreement.",
      detail: "PLUMB / LEVEL / GROUND",
      format: "portrait",
    },
    /* 02 — placeholder */
    null,
    /* 03 — built-in */
    {
      src: "futureassets/india-02.jpg",
      alt: "Two design-build participants setting out dimensions on timber",
      title: "Dimensions became shared decisions.",
      note: "Full scale made every assumption visible—and every correction collaborative.",
      detail: "SET-OUT / FULL SCALE",
      format: "portrait",
    },
    /* 04 — placeholder */
    null,
    /* 05 — placeholder */
    null,
    /* 06 — built-in */
    {
      src: "futureassets/india-03.jpg",
      alt: "Team constructing a steel frame on a rural site in India",
      title: "The drawing became a frame.",
      note: "Sequence, access, weather, labor, and tolerance entered the design simultaneously.",
      detail: "STEEL / SEQUENCE / ASSEMBLY",
      format: "landscape",
    },
    /* 07 — placeholder */
    null,
    /* 08 — built-in */
    {
      src: "futureassets/india-04.jpg",
      alt: "Design-build participant welding a steel connection",
      title: "The joint made the idea accountable.",
      note: "The architectural intention survived by adapting to material, tools, and the people building it.",
      detail: "WELD / CONNECTION / INTENT",
      format: "portrait",
    },
    /* 09 — placeholder */
    null,
    /* 10 — placeholder */
    null,
  ],
};

/* Keep legacy name working — extras are no longer needed when FRAMES_PHOTOS is set */
window.FRAMES_EXTRA_PHOTOS = window.FRAMES_EXTRA_PHOTOS || { japan: [], texas: [], india: [] };
