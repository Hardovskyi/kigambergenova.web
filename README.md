# Kamila Igambergenova — Architecture as Connection

A cinematic portfolio website for architectural designer **Kamila Igambergenova**.

The whole site is built around the unifying idea from her portfolio:
**"Untangling spatial, social, and urban knots."** Every project — and her own
journey from the Kazakh steppe to the Chicago skyline — is told as a single
continuous *thread*, traced through her six-stage method:

> **Node → Context → Strategy → Space → Tectonic → Outcome**

## Homepage structure (`index.html`)

A single guided scroll, sequenced like a film — each "wow" interaction appears
once, tied to its content:

1. **Hero** — name + "Architecture as Connection". The animated **thread/knot
   canvas lives here only**.
2. **Manifesto** — a statement whose words light up as you scroll through it.
3. **The Path** — biography with a **pinned image that swaps** through her five
   places (Kazakhstan → Chicago → Japan → India → Bangkok) as the story scrolls.
4. **Selected Work** — a **horizontal gallery** of projects (drag / scroll / swipe).
5. **Frames of Practice** — sequenced image storytelling with a sticky chapter
   rail: Japan → Texas → India → synthesis.
6. **Background** — education, experience, and toolkit (recruiter facts).
7. **Contact** — footer with all links.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | The full guided-scroll homepage (structure above) |
| `work.html` | Selected Works — 4 projects + the embedded 22-page portfolio PDF |
| `contact.html` | Contact — email, phone, LinkedIn, résumé |

## Structure

```
kamilawebsite/
├── index.html
├── work.html
├── contact.html
├── css/style.css        # full design system
├── js/main.js           # thread canvas, scroll reveals, manifesto, path, work, frames
├── assets/              # Resume + Portfolio PDFs
├── futureassets/        # photos (see Photos section below)
├── .nojekyll
└── README.md
```

## Run locally

It's a static site — just open `index.html` in a browser. For the PDF viewer and
fonts to behave exactly like production, serve it locally:

```bash
# Python 3
python -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages

1. Create a new repository on GitHub (e.g. `kamila-portfolio`).
2. Push this folder:

   ```bash
   git init
   git add .
   git commit -m "Portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo>.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
   branch → `main` / `root`.**
4. Your site goes live at `https://<your-username>.github.io/<repo>/`.

> The `.nojekyll` file is included so GitHub Pages serves all files as-is.

## Design notes

- **Type:** Fraunces (display serif), Space Grotesk (sans), Space Mono (labels).
- **Palette:** bone `#f1ece1`, ink `#181512`, terracotta accent `#c1572f`, warm
  sand `#d8cbb2`.
- **Motion (deliberately restrained, one technique per section):** the thread
  canvas in the hero only; word-by-word reveal in the manifesto; pinned
  image-swap in The Path; horizontal drag/scroll in Selected Work; frame-reveal
  galleries in Frames of Practice. All motion respects `prefers-reduced-motion`
  and the site is fully readable with JavaScript disabled.

## Photos — `futureassets/` folder

Every image is a labeled placeholder until you drop a real file in
`futureassets/` with the matching name (any size; they appear automatically — no
code changes needed). To change a name/path, edit the `src` + `data-file`
attributes (each marked with a `PHOTO:` comment in `index.html`).

**The Path (bio):** `path-kazakhstan.jpg`, `path-chicago.jpg`, `path-japan.jpg`,
`path-india.jpg`, `path-bangkok.jpg`

**Selected Work (home preview):** `work-community-room.jpg`, `work-the-cove.jpg`,
`work-village.jpg`, `work-the-wave.jpg`

**Frames of Practice** (story order Japan → Texas → India, then synthesis):

| Chapter | Establishing image | Supporting stills |
| --- | --- | --- |
| 01 Japan (observe) | `japan-hero.jpg` | `japan-01.jpg` … `japan-06.jpg` |
| 02 Texas (serve) | `texas-hero.jpg` | `texas-01.jpg` … `texas-06.jpg` |
| 03 India (build) | `india-hero.jpg` | `india-01.jpg` … `india-06.jpg` |

You said you have ~10 photos per place — there's no limit. To add more stills,
copy a `<figure class="frame-img frame-img--still">…</figure>` block inside that
chapter's `.stills` container and point it at the next filename. Mix in
`still--tall` / `still--wide` modifier classes for rhythm.

## Editing content

All copy is plain HTML — edit the text directly in `index.html`, `work.html`, and
`contact.html`. To swap the résumé or portfolio, replace the files in `assets/`
keeping the same filenames.
