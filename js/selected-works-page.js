/**
 * Full Selected Works page (work.html) — project media lives HERE.
 *
 * To show a real picture, add src (and optional alt) on any media item:
 *   { code: "CR-01", type: "Drawing", title: "...", shape: "drawing",
 *     src: "assets/selected-works/images/cr-01.jpg",
 *     alt: "Site plan of the community room" }
 *
 * Put image files in assets/selected-works/images/ (or futureassets/).
 * Use site-relative paths only — not C:/Users/...
 * Leave src off to keep the gray "Image" placeholder.
 */
const projects = [
  {
    no: "01",
    id: "community-room",
    title: "Community Room",
    subtitle: "From proposal to built adaptation",
    meta: "Design-Build · Maharashtra, India · 2024",
    node: "Absence of shared public space",
    thesis:
      "A simple communal pavilion transforms the lack of shared public space into an open, shaded room for gathering, learning, and everyday use.",
    accent: "#ef5a45",
    materialCount: "3 content groups · 30+ images and drawings",
    sections: [
      {
        id: "cr-competition",
        step: "Phase 01",
        title: "Competition Proposal",
        note:
          "Establish the site, social absence, and early formal strategies that shaped the competition proposal.",
        layout: "grid-3",
        media: [
          { code: "CR-01", type: "Drawing", title: "Aerial view", shape: "drawing", src: "assets/selected-works/images/community room/competition_render_exterior.jpg" },
          { code: "CR-02", type: "Photography", title: "Site plan + anticipated circulation", shape: "landscape" , src: "assets/selected-works/images/community room/site.png" },
          { code: "CR-03", type: "Photography", title: "Existing site condition 01", shape: "landscape" , src: "assets/selected-works/images/community room/IMG_8948.jpeg" },
          { code: "CR-04", type: "Photography", title: "Existing site condition 02", shape: "landscape" , src: "assets/selected-works/images/community room/IMG_8956.jpeg" },
          { code: "CR-05", type: "Diagram set", title: "Form and organizational strategies", shape: "landscape", src: "assets/selected-works/images/community room/form diagram.png"  },
          { code: "CR-07", type: "Drawing", title: "Floor plan", shape: "drawing", src: "assets/selected-works/images/community room/floor plan.png"  },
          { code: "CR-08", type: "Drawing", title: "Structural assembly", shape: "drawing" , src: "assets/selected-works/images/community room/axon.png" },
          { code: "CR-08", type: "Drawing", title: "Sections A-A", shape: "drawing" , src: "assets/selected-works/images/community room/section A-A.png" },
          { code: "CR-09", type: "Axonometric", title: "Section B-B", shape: "portrait" , src: "assets/selected-works/images/community room/section B-B.png" },
          { code: "CR-10", type: "Drawing set", title: "South elevation", shape: "drawing" , src: "assets/selected-works/images/community room/elevation south.png" },
          { code: "CR-11", type: "Phase 01", title: "North elevation", shape: "landscape" , src: "assets/selected-works/images/community room/elevation north.png" },
          { code: "CR-14", type: "Diagram", title: "East elevation", shape: "panorama" , src: "assets/selected-works/images/community room/elevation east.png" },
          { code: "CR-15", type: "Map", title: "West elevation", shape: "drawing" , src: "assets/selected-works/images/community room/elevation west.png" },
          { code: "CR-16", type: "Map", title: "Interior View", shape: "drawing" , src: "assets/selected-works/images/community room/competition_render_interior.jpg" },
          { code: "CR-17", type: "Map", title: "Interior View", shape: "drawing" , src: "assets/selected-works/images/community room/interior.png" },
        ],
      },
      {
        id: "cr-development",
        step: "Phase 02",
        title: "Design Development",
        note:
          "Construction documents from the CD full set — drawing sheets in sequence as the project moves toward a buildable room.",
        layout: "grid-3",
        media: [
          { code: "CR-DD-00", type: "Render", title: "Path to community room", shape: "landscape", src: "assets/selected-works/images/community room/path to community room.png", alt: "Path to community room" },
          { code: "CR-DD-01", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 01", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 1.png", alt: "Community Room CD Full Set sheet 1" },
          { code: "CR-DD-02", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 02", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 2.png", alt: "Community Room CD Full Set sheet 2" },
          { code: "CR-DD-03", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 03", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 3.png", alt: "Community Room CD Full Set sheet 3" },
          { code: "CR-DD-04", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 04", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 4.png", alt: "Community Room CD Full Set sheet 4" },
          { code: "CR-DD-05", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 05", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 5.png", alt: "Community Room CD Full Set sheet 5" },
          { code: "CR-DD-06", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 06", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 6.png", alt: "Community Room CD Full Set sheet 6" },
          { code: "CR-DD-07", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 07", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 7.png", alt: "Community Room CD Full Set sheet 7" },
          { code: "CR-DD-08", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 08", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 8.png", alt: "Community Room CD Full Set sheet 8" },
          { code: "CR-DD-09", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 09", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 9.png", alt: "Community Room CD Full Set sheet 9" },
          { code: "CR-DD-10", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 10", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 10.png", alt: "Community Room CD Full Set sheet 10" },
          { code: "CR-DD-11", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 11", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 11.png", alt: "Community Room CD Full Set sheet 11" },
          { code: "CR-DD-12", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 12", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 12.png", alt: "Community Room CD Full Set sheet 12" },
          { code: "CR-DD-13", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 13", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 13.png", alt: "Community Room CD Full Set sheet 13" },
          { code: "CR-DD-14", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 14", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 14.png", alt: "Community Room CD Full Set sheet 14" },
          { code: "CR-DD-15", type: "CD Sheet", title: "CD Full Set 5-13 · Sheet 15", shape: "drawing", src: "assets/selected-works/images/community room/CD Full Set 5-13 15.png", alt: "Community Room CD Full Set sheet 15" },
        ],
      },
      {
        id: "cr-built",
        step: "Phase 03",
        title: "Built Adaptation",
        note:
          "Document the built adaptation through construction sequence and the completed communal room.",
        layout: "grid-4",
        media: [
          { code: "CR-13", type: "Phase 03", title: "Built adaptation", shape: "landscape" , src: "assets/selected-works/images/community room/cm31.png" },
          { code: "CR-25", type: "Process", title: "Site reset + layout", shape: "portrait" , src: "assets/selected-works/images/community room/cm32.jpg"},
          { code: "CR-26", type: "Process", title: "Footings + sub-bases", shape: "portrait", src: "assets/selected-works/images/community room/cm33.jpg"},
          { code: "CR-27", type: "Process", title: "Retaining + infill walls", shape: "portrait" , src: "assets/selected-works/images/community room/cm34.jpg"},
          { code: "CR-28", type: "Process", title: "Rebar + grade beams", shape: "portrait" , src: "assets/selected-works/images/community room/cm35.png"},
          { code: "CR-29", type: "Process", title: "Brick walls + steel frame", shape: "portrait" , src: "assets/selected-works/images/community room/cm36.jpg"},
          { code: "CR-30", type: "Process", title: "Roof + final completion", shape: "portrait" , src: "assets/selected-works/images/community room/cm37.jpg"},
        ],
      },
    ],
  },
  {
    no: "02",
    id: "the-cove",
    title: "The Cove",
    subtitle: "Universal space + urban connector",
    meta: "Civic / Universal Space · Chicago, USA",
    node: "Disconnection between urban levels",
    thesis:
      "A continuous public surface reconnects Upper and Lower Wacker, transforming a leftover void into a civic roofscape and a flexible universal space below.",
    accent: "#4266d5",
    materialCount: "6 content groups · 35+ images and drawings",
    sections: [
      {
        id: "cove-node",
        step: "Context",
        title: "The urban node",
        note:
          "Begin with the discontinuous ground between levels, then locate the project within the wider pedestrian, transit, and visual systems.",
        layout: "feature",
        media: [
          { code: "CV-01", type: "Site axon", title: "Aerial view", shape: "hero" , src: "assets/selected-works/images/THE COVE/birdseye-edited.png"},
          { code: "CV-02", type: "Context image", title: "DISCONTINUOUS GROUND BETWEEN LEVELS", shape: "landscape"  , src: "assets/selected-works/images/THE COVE/COLLAGE FINAL bw.png"},
        ],
      },
      {
        id: "cove-analysis",
        step: "Analysis",
        title: "Movement + environment",
        note:
          "Keep each analytical family distinct so circulation, wind, shadow, and sight lines can be read without competing annotations.",
        layout: "grid-3",
        media: [
          { code: "CV-04", type: "Analysis", title: "Foot traffic", shape: "drawing" , src: "assets/selected-works/images/THE COVE/FINAL SITE NARRATIVE-30.png"},
          { code: "CV-05", type: "Context strip", title: "Public transit routes", shape: "drawing" , src: "assets/selected-works/images/THE COVE/public transit routes.png"},
          { code: "CV-06", type: "Context strip", title: "Site historical context", shape: "drawing" , src: "assets/selected-works/images/THE COVE/historical context.png"},
          { code: "CV-07", type: "Analysis", title: "Sight lines", shape: "drawing" , src: "assets/selected-works/images/THE COVE/Sight Lines.png"},
          { code: "CV-08", type: "Analysis", title: "Site views · notable landmarks", shape: "drawing" , src: "assets/selected-works/images/THE COVE/views.png"},
          { code: "CV-09", type: "Analysis", title: "Wind Speeds from September to February", shape: "drawing" , src: "assets/selected-works/images/THE COVE/FINAL SITE NARRATIVE-35.png"},
          { code: "CV-10", type: "Analysis", title: "Wind Speeds from March to August", shape: "drawing" , src: "assets/selected-works/images/THE COVE/FINAL SITE NARRATIVE-34.png"},
          { code: "CV-11", type: "Analysis set", title: "Seasonal shadow studies", shape: "drawing" , src: "assets/selected-works/images/THE COVE/shadow analysis.png"},
          { code: "CV-12", type: "Analysis", title: "Noise intensity", shape: "drawing" , src: "assets/selected-works/images/THE COVE/noise intensity.png"},
        ],
      },
      {
        id: "cove-strategy",
        step: "Strategy",
        title: "Continuous public ground",
        note:
          "A five-step massing sequence leads into the longitudinal section and the circulation diagram, making the spatial argument explicit before the program options.",
        layout: "grid-2",
        media: [
          { code: "CV-13", type: "Diagram sequence", title: "Five massing operations", shape: "panorama" , src: "assets/selected-works/images/THE COVE/form diagram.png"},
          { code: "CV-14", type: "Drawing", title: "Longitudinal section", shape: "panorama" , src: "assets/selected-works/images/THE COVE/section long.png"},
          { code: "CV-15", type: "Axonometric", title: "Cross-section", shape: "panorama" , src: "assets/selected-works/images/THE COVE/section short.png"},
          { code: "CV-16", type: "Diagram", title: "Circulation by level", shape: "portrait" , src: "assets/selected-works/images/THE COVE/circulation.png"},
        ],
      },
      {
        id: "cove-program",
        step: "Space",
        title: "Universal space scenarios",
        note:
          "Organize flexibility as a clear matrix: what remains fixed, what changes, and how the interior supports gallery, market, and fieldhouse configurations.",
        layout: "grid-3",
        media: [
          { code: "CV-16", type: "Plan", title: "Gallery/Theater Program", shape: "drawing" , src: "assets/selected-works/images/THE COVE/art gallery.png"},
          { code: "CV-17", type: "Diagram", title: "Market/Soup kitchen Program", shape: "drawing" , src: "assets/selected-works/images/THE COVE/market.png"},
          { code: "CV-18", type: "Diagram", title: "Athletic center/bike depot Program", shape: "drawing" , src: "assets/selected-works/images/THE COVE/fieldhouse.png"},
          { code: "CV-19", type: "Proposal", title: "Art gallery", shape: "landscape" , src: "assets/selected-works/images/THE COVE/museum1.jpg"},
          { code: "CV-20", type: "Proposal", title: "Market", shape: "landscape" , src: "assets/selected-works/images/THE COVE/market1.jpg"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/fieldhouse1.jpg"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/museum2.png"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/market2.png"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/fieldhouse2.jpg"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/museum3.png"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/market3.png"},
          { code: "CV-21", type: "Proposal", title: "Fieldhouse", shape: "landscape" , src: "assets/selected-works/images/THE COVE/fieldhouse3.png"},
        ],
      },
      {
        id: "cove-tectonic",
        step: "Tectonic",
        title: "Envelope + roofscape system",
        note:
          "Give the wall section a full reading column, with daylight comparison and roof landscape studies in a parallel evidence column.",
        layout: "feature",
        media: [
          { code: "CV-20", type: "Technical drawing", title: "Wall section", shape: "portrait" , src: "assets/selected-works/images/THE COVE/system section.png"},
          { code: "CV-21", type: "Technical drawing", title: "Envelope Assembly", shape: "portrait" , src: "assets/selected-works/images/THE COVE/envelope.png"},
          { code: "CV-22", type: "Analysis", title: "Light intensity", shape: "square" , src: "assets/selected-works/images/THE COVE/light intensity.png"},
          { code: "CV-23", type: "Analysis", title: "Section perspective", shape: "square" , src: "assets/selected-works/images/THE COVE/DETAILED SECTION.jpg"},
          { code: "CV-24", type: "System diagram", title: "Roof landscape layers", shape: "drawing" , src: "assets/selected-works/images/THE COVE/Final.Landscape.png"},
        ],
      },
      {
        id: "cove-outcome",
        step: "Outcome",
        title: "Four spatial conditions",
        note:
          "Conclude with four equal outcome frames and the sectional model: connection, threshold, quiet courtyard, and open roofscape.",
        layout: "grid-4",
        media: [
          { code: "CV-24", type: "Outcome", title: "Lower Wacker connection", shape: "portrait" , src: "assets/selected-works/images/THE COVE/lower connection-edited.png"},
          { code: "CV-25", type: "Outcome", title: "Upper Wacker main entrance", shape: "portrait" , src: "assets/selected-works/images/THE COVE/entrance-edited.png"},
          { code: "CV-26", type: "Outcome", title: "Quiet courtyard", shape: "portrait" , src: "assets/selected-works/images/THE COVE/courtyard-edited 1.png"},
          { code: "CV-27", type: "Outcome", title: "Public roofscape", shape: "portrait" , src: "assets/selected-works/images/THE COVE/roof-edited 1.png"},
          {
            code: "CV-28",
            type: "Model",
            title: "Sectional model",
            shape: "panorama",
            src: "assets/selected-works/images/THE COVE/kamilavidwebsite.mp4",
            alt: "Animated sectional model of The Cove",
          },
        ],
      },
    ],
  },
  {
    no: "03",
    id: "village-in-the-city",
    title: "Village in the City",
    subtitle: "A vertical village connecting park, city + generations",
    meta: "Bangkok Studio · Vertical Urbanism",
    node: "Social isolation in vertical living",
    thesis:
      "An intergenerational tower reconnects park, city, and community through shared terraces, collective programs, and social streets in the sky.",
    accent: "#45a66b",
    materialCount: "3 content groups · 20+ images and drawings",
    sections: [
      {
        id: "village-context",
        step: "Context",
        title: "Bangkok: city + climate",
        note:
          "Frame the tower through its park edge, high-rise history, prevailing wind, and hot-humid comfort conditions.",
        layout: "grid-3",
        media: [
          { code: "VC-01", type: "Drawing", title: "Site diagram", shape: "panorama" , src: "assets/selected-works/images/bangkok/site plan diagram.png"},
          { code: "VC-01", type: "Drawing", title: "Urban context section", shape: "panorama" , src: "assets/selected-works/images/bangkok/SITE CONTEXT SECTION.png"},
          { code: "VC-02", type: "Timeline", title: "Bangkok tall buildings", shape: "panorama" , src: "assets/selected-works/images/bangkok/historical timeline.png"},
          { code: "VC-03", type: "Climate", title: "Wind rose", shape: "square" , src: "assets/selected-works/images/bangkok/wind rose.png"},
          { code: "VC-04", type: "Climate", title: "Psychrometric chart + PMV", shape: "landscape" , src: "assets/selected-works/images/bangkok/chart.png"},
        ],
      },
      {
        id: "village-program",
        step: "Strategy + Space",
        title: "From village to vertical community",
        note:
          "Connect the conceptual transformation to a legible program and user system, then zoom into student, elder, and family unit types.",
        layout: "grid-3",
        media: [
          { code: "VC-05", type: "Diagram sequence", title: "Concept · elements", shape: "panorama" , src: "assets/selected-works/images/bangkok/concept.png"},
          { code: "VC-06", type: "User diagram", title: "Massing", shape: "drawing" , src: "assets/selected-works/images/bangkok/massing.png"},
          { code: "VC-07", type: "Program", title: "Users", shape: "portrait" , src: "assets/selected-works/images/bangkok/users.png"},
          { code: "VC-08", type: "Unit type", title: "Student living", shape: "drawing" , src: "assets/selected-works/images/bangkok/students.png"},
          { code: "VC-09", type: "Unit type", title: "Elder living", shape: "drawing" , src: "assets/selected-works/images/bangkok/elder.png"},
          { code: "VC-10", type: "Unit type", title: "Family living", shape: "drawing" , src: "assets/selected-works/images/bangkok/family.png"},
        ],
      },
      {
        id: "village-outcome",
        step: "Tectonic + Outcome",
        title: "Environmental terraces",
        note:
          "Treat the terraces as both social and environmental devices, pairing airflow evidence with final spatial outcomes.",
        layout: "grid-3",
        media: [
          { code: "VC-11", type: "Diagram", title: "Wind distribution concept", shape: "drawing" , src: "assets/selected-works/images/bangkok/External Airflow-Concept Idea.png"},
          { code: "VC-12", type: "Simulation", title: "External air movement", shape: "square" , src: "assets/selected-works/images/bangkok/External Airflow Simulation- Result.jpg"},
          { code: "VC-13", type: "Simulation", title: "Vertical air movement", shape: "portrait" , src: "assets/selected-works/images/bangkok/External Airflow Simulation- Elevation.jpg"},
          { code: "VC-14", type: "Outcome", title: "Terrace landscape", shape: "landscape" , src: "assets/selected-works/images/bangkok/landscape.png"},
          { code: "VC-15", type: "Outcome", title: "Terrace courtyard", shape: "landscape" , src: "assets/selected-works/images/bangkok/garden.png"},
          { code: "VC-16", type: "Outcome", title: "View from Lumphini Park", shape: "portrait" , src: "assets/selected-works/images/bangkok/exterior.png"},
          { code: "VC-17", type: "Outcome", title: "Steam bath area", shape: "landscape" , src: "assets/selected-works/images/bangkok/steam bath.png"},
        ],
      },
    ],
  },
  {
    no: "04",
    id: "the-wave",
    title: "The Wave",
    subtitle: "Fieldhouse without the field",
    meta: "Neighborhood Civic · Chicago",
    node: "Public life dispersed across everyday thresholds",
    thesis:
      "The fieldhouse is organized as a gradient of public life, moving from open civic gathering above to quieter, more intimate wellness spaces below.",
    accent: "#e8a82f",
    materialCount: "3 content groups · 12+ images and drawings",
    sections: [
      {
        id: "wave-node",
        step: "Context",
        title: "Porch culture as civic infrastructure",
        note:
          "Use the neighborhood elevation and everyday threshold study to establish the social logic before introducing the building.",
        layout: "grid-2",
        media: [
          { code: "WV-01", type: "Context drawing", title: "Everyday life at the porch", shape: "panorama" },
          { code: "WV-02", type: "Hero image", title: "Fieldhouse exterior", shape: "hero" },
        ],
      },
      {
        id: "wave-space",
        step: "Strategy + Space",
        title: "A gradient from public to intimate",
        note:
          "The experiential section is the chapter’s anchor. Bright, active, and dark conditions are then shown as independent spatial frames.",
        layout: "feature",
        media: [
          { code: "WV-03", type: "Drawing", title: "Experiential section", shape: "hero" },
          { code: "WV-04", type: "Diagram", title: "Bright · public · social", shape: "portrait" },
          { code: "WV-05", type: "Diagram", title: "Active · semi-public · support", shape: "portrait" },
          { code: "WV-06", type: "Diagram", title: "Dark · intimate · calm", shape: "portrait" },
          { code: "WV-07", type: "Interior", title: "Public room", shape: "landscape" },
          { code: "WV-08", type: "Interior", title: "Wellness threshold", shape: "landscape" },
          { code: "WV-09", type: "Interior", title: "Low-light recovery", shape: "landscape" },
        ],
      },
      {
        id: "wave-plans",
        step: "Resolution",
        title: "Program by level",
        note:
          "End with three equally weighted plans so the visitor can compare how the experiential gradient is translated into program.",
        layout: "grid-3",
        media: [
          { code: "WV-10", type: "Plan", title: "Basement · wellness + recovery", shape: "drawing" , src: "assets/selected-works/images/the wave/basement.png"},
          { code: "WV-11", type: "Plan", title: "First floor · active support", shape: "drawing" , src: "assets/selected-works/images/the wave/ground floor.png"},
          { code: "WV-12", type: "Plan", title: "Second floor · civic gathering", shape: "drawing" , src: "assets/selected-works/images/the wave/second floor plan.png"},
        ],
      },
    ],
  },
];

const behindPaperWalls = [
  {
    code: "01",
    title: "The first line",
    src: "assets/selected-works/images/01-first-line.jpg",
    alt: "Close view of an architecture student drawing in a sketchbook beside a phone and cutting mat",
  },
  {
    code: "02",
    title: "Searching for direction",
    src: "assets/selected-works/images/02-search.jpg",
    alt: "Architecture student reading a book about the architectural design process",
  },
  {
    code: "03",
    title: "Testing form",
    src: "assets/selected-works/images/03-testing-form.jpg",
    alt: "Architecture student arranging study models and drawings at a studio desk",
  },
  {
    code: "04",
    title: "Revision",
    src: "assets/selected-works/images/04-revision.jpg",
    alt: "Architecture student surrounded by drawings and discarded crumpled sketches",
  },
  {
    code: "05",
    title: "Evaluating the model",
    src: "assets/selected-works/images/05-evaluation.jpg",
    alt: "Architecture student closely examining a white physical model",
  },
  {
    code: "06",
    title: "Fatigue",
    src: "assets/selected-works/images/06-fatigue.jpg",
    alt: "Architecture student asleep at a desk beside physical study models",
    orientation: "landscape",
  },
  {
    code: "07",
    title: "Time",
    src: "assets/selected-works/images/07-time.jpg",
    alt: "Close view of a digital watch, coffee cup, drawings and cutting mat at a studio desk",
  },
  {
    code: "08",
    title: "Reset",
    src: "assets/selected-works/images/08-reset.jpg",
    alt: "Architecture student washing her face during a long studio work session",
  },
  {
    code: "09",
    title: "Returning to the desk",
    src: "assets/selected-works/images/09-return.jpg",
    alt: "Architecture student working alone in a studio late at night",
  },
  {
    code: "10",
    title: "From paper to production",
    src: "assets/selected-works/images/10-production.jpg",
    alt: "Architecture student collecting a large-format drawing from a plotter",
  },
];

const app = document.querySelector("#app");

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

/**
 * Media surface for project galleries.
 * - If item.src is set → show image or video (by file extension)
 * - If item.src is missing → show the "Image" placeholder
 *
 * Paths should be relative to the site root, e.g.:
 *   "assets/selected-works/images/cr-01.jpg"
 *   "assets/selected-works/images/THE COVE/kamilavidwebsite.mp4"
 * Do NOT use Windows paths like "C:/Users/..."
 */
function isVideoSrc(src) {
  return /\.(mp4|webm|ogg)(\?|$)/i.test(src || "");
}

function isPdfSrc(src) {
  return /\.pdf(\?|#|$)/i.test(src || "");
}

/** Encode spaces/special chars for web URLs; keep slashes intact. */
function mediaUrl(src) {
  return encodeURI(src.replace(/\\/g, "/"));
}

function mediaSurface(item, compact = false) {
  if (item.src) {
    const label = escapeHtml(item.alt || item.title || item.code);
    const url = mediaUrl(item.src);
    const safeUrl = escapeHtml(url);
    if (isVideoSrc(item.src)) {
      return `
        <div class="media-photo media-video ${compact ? "compact" : ""}">
          <video
            src="${safeUrl}"
            ${compact ? "" : "controls"}
            muted
            playsinline
            loop
            preload="metadata"
            aria-label="${label}"
          ></video>
        </div>
      `;
    }
    if (isPdfSrc(item.src)) {
      const pdfSrc = escapeHtml(`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`);
      return `
        <div class="media-photo media-pdf ${compact ? "compact" : ""}">
          <iframe
            src="${pdfSrc}"
            title="${label}"
            loading="lazy"
          ></iframe>
        </div>
      `;
    }
    return `
      <div class="media-photo ${compact ? "compact" : ""}">
        <img
          src="${safeUrl}"
          alt="${label}"
          loading="lazy"
        />
      </div>
    `;
  }
  return `
    <div class="placeholder ${compact ? "compact" : ""}">
      <span class="placeholder-code">${escapeHtml(item.code)}</span>
      <span class="placeholder-format">${escapeHtml(item.type)}</span>
      <span class="placeholder-word">Image</span>
    </div>
  `;
}

function mediaCard(item) {
  return `
    <figure class="media-card shape-${item.shape || "landscape"}">
      ${mediaSurface(item)}
      <figcaption>
        <span>${escapeHtml(item.code)}</span>
        <span>${escapeHtml(item.type)}</span>
        <strong>${escapeHtml(item.title)}</strong>
      </figcaption>
    </figure>
  `;
}

function projectChapter(project) {
  return `
    <article class="project-chapter" id="${escapeHtml(project.id)}" style="--accent:${escapeHtml(project.accent)}">
      <header class="chapter-cover">
        <div class="chapter-number">${escapeHtml(project.no)}</div>
        <div class="chapter-title">
          <p>${escapeHtml(project.meta)}</p>
          <h2>${escapeHtml(project.title)}</h2>
          <strong>${escapeHtml(project.subtitle)}</strong>
        </div>
        <div class="chapter-statement">
          <div><span>Major node</span><p>${escapeHtml(project.node)}</p></div>
          <div><span>Thesis</span><p>${escapeHtml(project.thesis)}</p></div>
        </div>
      </header>

      <div class="chapter-body">
        <aside class="project-rail">
          <div class="rail-sticky">
            <span>Chapter ${escapeHtml(project.no)}</span>
            <strong>${escapeHtml(project.title)}</strong>
            <p>${escapeHtml(project.materialCount)}</p>
            <nav aria-label="${escapeHtml(project.title)} contents">
              ${project.sections.map((section, index) => `
                <button type="button" class="${index === 0 ? "active" : ""}" data-group="${index}">
                  <span>${String(index + 1).padStart(2, "0")}</span>
                  ${escapeHtml(section.title)}
                </button>
              `).join("")}
            </nav>
            <a class="back-link" href="#work-index">Back to index ↑</a>
          </div>
        </aside>
        <section class="project-gallery" aria-live="polite"></section>
      </div>
    </article>
  `;
}

function galleryMarkup(project, groupIndex, imageIndex) {
  const group = project.sections[groupIndex];
  const active = group.media[imageIndex];
  return `
    <header class="gallery-header">
      <div class="gallery-code">${project.no}.${String(groupIndex + 1).padStart(2, "0")}</div>
      <div><p>${escapeHtml(group.step)}</p><h3>${escapeHtml(group.title)}</h3></div>
      <p>${escapeHtml(group.note)}</p>
    </header>
    <div class="gallery-stage">
      <div class="active-frame shape-${active.shape || "landscape"}">
        ${mediaSurface(active)}
      </div>
      <div class="stage-caption">
        <span>${escapeHtml(active.code)}</span>
        <span>${escapeHtml(active.type)}</span>
        <strong>${escapeHtml(active.title)}</strong>
        <span>${String(imageIndex + 1).padStart(2, "0")} / ${String(group.media.length).padStart(2, "0")}</span>
      </div>
      <div class="stage-controls">
        <button type="button" data-step="-1" aria-label="Previous image">←</button>
        <button type="button" data-step="1" aria-label="Next image">→</button>
      </div>
    </div>
    <div class="filmstrip" role="tablist" aria-label="${escapeHtml(group.title)} images">
      ${group.media.map((item, index) => `
        <button
          type="button"
          role="tab"
          aria-selected="${imageIndex === index}"
          class="film-card shape-${item.shape || "landscape"} ${imageIndex === index ? "active" : ""}"
          data-image="${index}"
        >
          ${mediaSurface(item, true)}
          <span>${escapeHtml(item.code)}</span>
          <strong>${escapeHtml(item.title)}</strong>
        </button>
      `).join("")}
    </div>
    <p class="scroll-hint">Scroll horizontally to review the complete image group →</p>
  `;
}

function practiceChapter({ id, number, eyebrow, title, description, items, dark = false }) {
  return `
    <section class="practice-chapter ${dark ? "dark" : ""}" id="${escapeHtml(id)}">
      <header>
        <span>${escapeHtml(number)}</span>
        <div><p>${escapeHtml(eyebrow)}</p><h2>${escapeHtml(title)}</h2></div>
        <p>${escapeHtml(description)}</p>
      </header>
      <div class="practice-grid practice-matrix">
        ${items.map(mediaCard).join("")}
      </div>
    </section>
  `;
}

function photographyChapter() {
  return `
    <section class="practice-chapter photography-chapter dark" id="photography">
      <header>
        <span>A.02</span>
        <div><p>Observation · Photo essay</p><h2>Photography</h2></div>
        <div class="photo-thesis">
          <p class="photo-kicker">Behind Paper Walls · 10 photographs</p>
          <h3>Behind Paper Walls</h3>
          <p>Most of us experience architecture as something already complete: a warm room, a familiar object, a place that quietly supports everyday life. Rarely do we consider the labor behind that comfort.</p>
          <p>Every building begins on paper, through nights of searching, testing, revising, and discarding ideas. Eventually, one imperfect sketch leaves the page and becomes a real place—one in which another person may spend much of their life.</p>
          <p>This photographic essay follows the invisible work between the first line and the inhabited room: concentration, repetition, uncertainty, fatigue, and the gradual transformation of an idea into form.</p>
        </div>
      </header>
      <div class="photo-grid">
        ${behindPaperWalls.map((item) => `
          <figure class="photo-card ${item.orientation === "landscape" ? "landscape" : ""}">
            <img src="${escapeHtml(item.src)}" alt="${escapeHtml(item.alt)}" loading="lazy">
            <figcaption><span>${escapeHtml(item.code)}</span><strong>${escapeHtml(item.title)}</strong></figcaption>
          </figure>
        `).join("")}
        <div class="photo-endnote">
          <span>01—10</span>
          <p>One studio cycle, recorded from the first uncertain mark to the final printed sheet.</p>
        </div>
      </div>
    </section>
  `;
}

app.innerHTML = `
  <header class="site-header">
    <a class="identity" href="index.html"><strong>Kamila Igambergenova</strong><span>Selected Works</span></a>
    <nav aria-label="Primary navigation">
      <a href="index.html">Index</a>
      <a href="#work-index">Projects</a>
      <a href="#systems">Grasshopper</a>
      <a href="#photography">Photography</a>
      <a href="#models">Models</a>
      <a href="#portfolio">Portfolio PDF</a>
    </nav>
  </header>

  <section class="work-index" id="work-index">
    <header>
      <p>Architecture as connection</p>
      <h1>Selected<br>Works</h1>
      <span>Four projects, each presented as its own chapter with a clear sequence from node to outcome.</span>
    </header>
    <div class="index-table">
      ${projects.map((project) => `
        <a href="#${escapeHtml(project.id)}" style="--accent:${escapeHtml(project.accent)}">
          <span class="index-no">${escapeHtml(project.no)}</span>
          <div><strong>${escapeHtml(project.title)}</strong><span>${escapeHtml(project.meta)}</span></div>
          <p>${escapeHtml(project.node)}</p>
          <span class="index-count">${escapeHtml(project.materialCount)}</span>
          <span class="index-arrow">↘</span>
        </a>
      `).join("")}
    </div>
  </section>

  ${projects.map(projectChapter).join("")}

  <section class="practice-index">
    <p>Additional practice</p>
    <h2>Three independent bodies of work</h2>
    <div>
      <a href="#systems">01 / Systems + Grasshopper</a>
      <a href="#photography">02 / Observation + Photography</a>
      <a href="#models">03 / Making + Physical Models</a>
    </div>
  </section>

  ${practiceChapter({
    id: "systems",
    number: "A.01",
    eyebrow: "Systems",
    title: "Grasshopper",
    description: "Computational studies are presented as a complete process: the spatial question, the rule set, tested variations, and the selected architectural output.",
    items: [
      { code: "GH-01", type: "Problem", title: "Design input + spatial question", shape: "landscape" },
      { code: "GH-02", type: "Definition", title: "Grasshopper logic", shape: "panorama" },
      { code: "GH-03", type: "Study", title: "Variation matrix", shape: "drawing" },
      { code: "GH-04", type: "Output", title: "Selected system", shape: "hero" },
    ],
  })}

  ${photographyChapter()}

  ${practiceChapter({
    id: "models",
    number: "A.03",
    eyebrow: "Making",
    title: "Physical Models",
    description: "Each model is shown through process, scale, material, assembly, and final outcome, making model-making a standalone form of architectural thinking.",
    items: [
      { code: "MD-01", type: "Process", title: "Material preparation", shape: "square" },
      { code: "MD-02", type: "Process", title: "Assembly sequence", shape: "square" },
      { code: "MD-03", type: "Detail", title: "Joint + material study", shape: "portrait" },
      { code: "MD-04", type: "Final model", title: "Complete physical model", shape: "hero" },
    ],
  })}

  <section class="portfolio-doc" id="portfolio">
    <div class="portfolio-doc__head">
      <div>
        <p class="portfolio-doc__kicker">The full document</p>
        <h2>Portfolio — drawings, models &amp; renders.</h2>
      </div>
      <div class="portfolio-doc__actions">
        <a class="btn btn--clay" href="assets/Portfolio_Kamila_Igambergenova.pdf" target="_blank" rel="noopener">Open Portfolio ↗</a>
        <a class="btn" href="assets/Portfolio_Kamila_Igambergenova.pdf" download>Download PDF</a>
      </div>
    </div>
    <object class="pdf-frame" data="assets/Portfolio_Kamila_Igambergenova.pdf#view=FitH" type="application/pdf">
      <iframe class="pdf-frame" src="assets/Portfolio_Kamila_Igambergenova.pdf" title="Kamila Igambergenova Portfolio"></iframe>
    </object>
    <p class="portfolio-doc__note">If the document doesn’t load inline, use “Open Portfolio ↗” above. Best viewed on desktop.</p>
  </section>

  <footer>
    <strong>Kamila Igambergenova</strong>
    <span>Architecture as Connection</span>
    <a href="mailto:igambergenovak@gmail.com">igambergenovak@gmail.com</a>
    <a href="index.html">Back to main site ↑</a>
  </footer>
`;

const galleryState = new Map();

/** Step across images and into the next/previous subsection within the same project. */
function advanceGallery(article, project, groupIndex, imageIndex, step) {
  let g = groupIndex;
  let i = imageIndex + step;
  const sections = project.sections;

  if (step > 0) {
    while (i >= sections[g].media.length) {
      if (g >= sections.length - 1) {
        i = sections[g].media.length - 1;
        break;
      }
      i -= sections[g].media.length;
      g += 1;
    }
  } else if (step < 0) {
    while (i < 0) {
      if (g <= 0) {
        i = 0;
        break;
      }
      g -= 1;
      i = sections[g].media.length + i;
    }
  }

  renderGallery(article, project, g, i);
}

function renderGallery(article, project, groupIndex = 0, imageIndex = 0) {
  const group = project.sections[groupIndex];
  if (!group || !group.media.length) return;
  const safeImageIndex = Math.max(0, Math.min(imageIndex, group.media.length - 1));
  galleryState.set(project.id, { groupIndex, imageIndex: safeImageIndex });

  article.querySelectorAll("[data-group]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.group) === groupIndex);
  });

  const gallery = article.querySelector(".project-gallery");
  gallery.innerHTML = galleryMarkup(project, groupIndex, safeImageIndex);

  gallery.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      advanceGallery(article, project, groupIndex, safeImageIndex, Number(button.dataset.step));
    });
  });

  gallery.querySelectorAll("[data-image]").forEach((button) => {
    button.addEventListener("click", () => {
      renderGallery(article, project, groupIndex, Number(button.dataset.image));
    });
  });
}

projects.forEach((project) => {
  const article = document.getElementById(project.id);
  article.querySelectorAll("[data-group]").forEach((button) => {
    button.addEventListener("click", () => {
      renderGallery(article, project, Number(button.dataset.group), 0);
    });
  });
  renderGallery(article, project);
});

/* =========================================================
   Custom cursor — architectural registration / crop mark
   ========================================================= */
(function customCursor() {
  if (!window.matchMedia("(pointer: fine)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.documentElement.classList.add("has-custom-cursor");

  const el = document.createElement("div");
  el.className = "site-cursor";
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `
    <span class="site-cursor__arm site-cursor__arm--v"></span>
    <span class="site-cursor__arm site-cursor__arm--h"></span>
    <span class="site-cursor__corner site-cursor__corner--tl"></span>
    <span class="site-cursor__corner site-cursor__corner--tr"></span>
    <span class="site-cursor__corner site-cursor__corner--bl"></span>
    <span class="site-cursor__corner site-cursor__corner--br"></span>
    <span class="site-cursor__core"></span>
  `;
  document.body.appendChild(el);

  let x = 0;
  let y = 0;
  let tx = 0;
  let ty = 0;
  let hovering = false;

  window.addEventListener("mousemove", (event) => {
    tx = event.clientX;
    ty = event.clientY;
    el.classList.add("is-on");
  }, { passive: true });

  document.addEventListener("mouseleave", () => el.classList.remove("is-on"));
  document.addEventListener("mouseenter", () => el.classList.add("is-on"));

  document.addEventListener("mouseover", (event) => {
    const target = event.target.closest("a, button, [role='button'], input, textarea, label, .film-card, .media-card");
    hovering = !!target;
    el.classList.toggle("is-hover", hovering);
  }, true);

  function tick() {
    x += (tx - x) * 0.28;
    y += (ty - y) * 0.28;
    el.style.transform = `translate(${x}px, ${y}px)`;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
