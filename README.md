# Kamila Igambergenova — Architecture as Connection

A portfolio website for architectural designer **Kamila Igambergenova**, structured as a hiring funnel: design proof first, then the professional record, then the field experiences that shaped her judgment.

## Homepage structure (`index.html`)

1. **Opener** — full-page architectural key-plan navigation (rooms + orange threads). Choosing a room floods the page and lands on that section.
2. **Hero** (`#top`) — name, professional positioning, dual CTAs (Selected Work + Résumé PDF).
3. **Selected Work** (`#selected-work`) — one featured project (Community Room) + three supporting projects, with quiet cross-references where needed.
4. **Record** (`#record`) — factual professional ledger with A / B / C classification (Architectural / Adjacent / Operations + Service). Sticky legend on desktop.
5. **Frames of Practice** (`#frames-of-practice`) — Japan · Observe → Texas · Contribute → India · Build. Sticky chapter index on desktop.
6. **What I Bring to Practice** (`#what-i-bring`) — quiet text-led synthesis for hiring teams.
7. **Background** (`#background`) — education + technical toolkit + strengths only (no duplicate Experience).
8. **Contact** (`#contact`) — conversion footer with email, LinkedIn, Résumé and Portfolio PDFs.

Knots appear only at meaningful transitions (hero title, Frames opening, Contact resolution). Thread seams connect chapters.

## Pages

| File | Purpose |
| --- | --- |
| `index.html` | Guided-scroll homepage |
| `work.html` | Selected Works detail — anchors `#community-room`, `#the-cove`, `#village-in-the-city`, `#the-wave` (aliases `#p01`–`#p04`) |
| `contact.html` | Standalone contact page |

## Structure

```
kamilawebsite/
├── index.html
├── work.html
├── contact.html
├── css/style.css
├── js/main.js
├── assets/              # Resume + Portfolio PDFs
├── futureassets/        # photos
├── .nojekyll
└── README.md
```

## Run locally

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Publish on GitHub Pages

Deploy from `main` / root. The `.nojekyll` file is included so GitHub Pages serves all files as-is.

## Design notes

- **Type:** Fraunces (display), Space Grotesk (sans), Space Mono (labels).
- **Palette:** bone `#f1ece1`, ink `#181512`, terracotta `#c1572f`, sand `#d8cbb2`.
- **Motion:** opener flood sequence, dock untangle states, seam draw-ins, Frames reveals, restrained progressive reveals. Respects `prefers-reduced-motion`.

## Photos — `futureassets/`

Drop matching JPGs into `futureassets/` (filenames in `data-file` attributes). Until then, placeholders show the expected path.

**Selected Work:** `work-community-room.jpg`, `work-the-cove.jpg`, `work-village.jpg`, `work-the-wave.jpg`

**Frames:** `japan-hero.jpg` + `japan-01…03`; `texas-hero.jpg` + stills; `india-hero.jpg` + stills.

## Documents

Place PDFs in `assets/` as:

- `Resume_Kamila_Igambergenova.pdf`
- `Portfolio_Kamila_Igambergenova.pdf`
