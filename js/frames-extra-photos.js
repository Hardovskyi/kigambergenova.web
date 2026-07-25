/* Optional extra Frames photos — fills the six placeholder slots per chapter.
 *
 * Slot order per chapter (10 frames total):
 *   01 = photo-01 (built-in)
 *   02 = EXTRA[0]  ← japan-05 / texas-05 / india-05
 *   03 = photo-02 (built-in)
 *   04 = EXTRA[1]
 *   05 = EXTRA[2]
 *   06 = photo-03 (built-in)
 *   07 = EXTRA[3]
 *   08 = photo-04 (built-in)
 *   09 = EXTRA[4]
 *   10 = EXTRA[5]
 *
 * 1. Drop image files into futureassets/ (e.g. japan-05.jpg)
 * 2. Add an object below for that chapter
 * 3. Refresh the page
 */
window.FRAMES_EXTRA_PHOTOS = {
  japan: [
    // Example (uncomment and edit):
    // {
    //   src: "futureassets/japan-05.jpg",
    //   alt: "Description of the photo",
    //   title: "Short caption title.",
    //   note: "One supporting sentence.",
    //   detail: "TAG / TAG / TAG",
    //   format: "portrait" // or "landscape"
    // },
  ],
  texas: [],
  india: []
};
