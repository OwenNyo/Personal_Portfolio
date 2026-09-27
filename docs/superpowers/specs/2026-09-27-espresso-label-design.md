# Espresso Label portfolio

Date: 2026-09-27
Status: built and deployed 2026-09-27

## Goal

Replace the animated Astro cafe journey with a static one-page site in React. Same coffee world, no motion. The page has three full-screen sections: an introduction with links to GitHub, LinkedIn, and a resume; a skills section; and a projects section. A short footer repeats the links.

The audience is unchanged: peers and people who arrive from GitHub or LinkedIn.

## Decisions made

| Question | Decision |
|---|---|
| Stack | Vite with React. Plain HTML and CSS. No UI, state, or animation libraries. |
| Structure | One page, three sections each at least one viewport tall, plus a footer. Fixed nav with anchor links. |
| Motion | None beyond hover and focus states. No scroll snapping. |
| Visual direction | "The Espresso Label": the page reads as a printed coffee bag label. Dark roast ground, milk-foam text, one caramel accent. |
| Intro content | Name, role, education, one paragraph. No "open to roles" line. |
| Extras | Education entry on the intro. Open Graph share image and meta tags. |
| Resume | `public/resume.pdf`, supplied by Owen. The link is always rendered. |
| Contact | No form. GitHub and LinkedIn links. |
| Hosting | GitHub Pages at the current URL, built by GitHub Actions. |
| Old site | Removed in full. History keeps it. |

## Visual system

Palette, defined once as CSS custom properties:

| Token | Value | Use |
|---|---|---|
| `--roast` | `#2b1d16` | page ground |
| `--roast-2` | `#4a3327` | raised surfaces, card fill |
| `--foam` | `#f1e6d6` | text, outlines |
| `--foam-dim` | `rgb(241 230 214 / 0.6)` | secondary text |
| `--caramel` | `#c98b3e` | the one accent: primary button, field labels, bars, stamp |

Type: Bricolage Grotesque for the name and section titles, weight 800, tight letter spacing. IBM Plex Sans for everything else at 400 and 500. Both loaded from Google Fonts with `display=swap` and a system fallback stack. Body text stays under 70 characters per line.

Layout: left aligned, one content column of at most 64rem, side padding that scales with the viewport. Sections are separated by a perforated tear line (a dashed border in `--foam` at low opacity). The label metaphor comes from that tear line, the field blocks, and the stamp, not from illustration. There is no drawn cafe artwork.

## Sections

### Nav

Fixed to the top. Four links: Intro, Skills, Projects, Resume. Text only, small, in `--foam`. The current section is not highlighted (no scroll tracking, to keep it static). On phones the nav stays one row.

### Section 1: the label

- Name: "Owen Nyo" on two lines, display type, the largest thing on the page.
- Field block with two fields: "Roast" with the value "Software engineer", and "Origin" with the value "B.Eng. Software Engineering, Singapore Institute of Technology, 2023 to 2027, final year". Labels in `--caramel`, values in `--foam`.
- One paragraph, drafted from the current bio, for Owen to edit: "I build web apps end to end, with a soft spot for interfaces that feel good to use. Off the clock: coffee, side projects, and reading other people's code."
- Links row: Resume (filled `--caramel` pill), GitHub and LinkedIn (outlined pills). All open in a new tab except Resume, which opens the PDF in the same tab.
- A round stamp in the top right reading "roasted in Singapore 2026", rotated slightly, in `--caramel`. On phones it moves below the name.

### Section 2: tasting notes (skills)

Title "Tasting notes". Two groups with a group heading each:

- Front of house: React, Next.js, JavaScript, HTML, CSS
- Back of house: Python, SQL, C#, Drupal

Each row: skill name, a usage word on the right, and a strength bar underneath. Usage words and bar widths:

| Skill | Usage | Bar |
|---|---|---|
| React | daily | 95% |
| JavaScript | daily | 95% |
| HTML | daily | 95% |
| CSS | daily | 90% |
| Next.js | most days | 75% |
| Python | most days | 70% |
| SQL | most days | 65% |
| Drupal | most days | 60% |
| C# | on request | 45% |

The bar is a plain div with a width, no animation. Each row has an accessible label such as "React, daily".

### Section 3: the shelf (projects)

Title "On the shelf". A grid of label cards, two columns on desktop, one on phones. Each card: screenshot with alt text, project name in display type, stack line, year, one paragraph, GitHub link, and a live link only when the data has one. Cards have a 1.5px `--foam` outline and `--roast-2` fill. No hover lift.

Projects, same four as today:

| Project | Stack | Year | GitHub |
|---|---|---|---|
| Expense Tracker | MongoDB, Express, React, Node | 2025 | OwenNyo/Expense-Tracker |
| Unified AI Sandbox | React, Flask, SQL | 2025 | huisotong/ICT2214-ITP |
| ClearCare | C#, ASP.NET | 2024 | OwenNyo/ICT2112-Software-Design-SD |
| Ultimate Ride | Python, Flask | 2024 | OwenNyo/INF1008-DSA |

Years are a best guess from the current descriptions and are Owen's to correct in the data file.

### Footer

Tear line, then the three links again as plain text, then "© 2026 Owen Nyo".

## Architecture

```
index.html                    head: title, description, Open Graph tags, font link
vite.config.js                base: '/Personal_Portfolio/'
package.json                  react, react-dom, vite, @vitejs/plugin-react
src/
  main.jsx                    mounts App
  App.jsx                     Nav, Label, TastingNotes, Shelf, Footer in order
  components/
    Nav.jsx
    Label.jsx
    TastingNotes.jsx
    Shelf.jsx
    ProjectCard.jsx
    Footer.jsx
  data/
    skills.js                 two groups, each a list of { name, usage, level }
    projects.js               list of { name, stack, year, description, github, live?, image, imageAlt }
  styles/
    tokens.css                custom properties, font faces
    base.css                  reset, body, type scale, tear line, pill buttons
    sections.css              layout for each section
  assets/projects/*.png       the four screenshots
public/
  favicon.svg
  og.png                      1200 by 630 share image
  resume.pdf                  supplied by Owen
.github/workflows/deploy.yml  build with Node, upload dist, deploy-pages
```

Components take their content from the data files as props or imports. No component holds state. No routing.

The share image is rendered once from a static HTML copy of the label section with headless Chrome at 1200 by 630 and committed as `public/og.png`. It is regenerated by hand if the intro copy changes.

## What is removed

Astro, GSAP, the content collection, the five scene components, the motion script, and the `docs/superpowers` spec, plan, and verification folder for the cafe journey. Git history keeps all of it.

## Rollout

Work on a branch. Merge to `main` deploys through GitHub Actions. Rollback is a revert of the merge commit. Commits are one line each, one feature per commit, no trailers.

## Verification

- `npm run build` completes with no warnings.
- Lighthouse on the built site, desktop and mobile: performance and accessibility at 90 or above.
- At 390px wide: no horizontal scroll, nav on one row, stamp below the name, one-column project grid.
- Every link resolves. The resume link returns the PDF once the file exists. No empty anchors.
- Keyboard: Tab order is nav, then Resume, GitHub, LinkedIn, then each project's links, then footer links. Focus is visible on every link.
- Share preview: the Open Graph tags point at the committed image and it loads at the deployed URL.

No unit tests. The components render static data with no branching worth testing beyond "live link only when present", which the link audit covers.

## Out of scope

- Animation of any kind
- Blog or notes
- Contact form
- Dark and light theme toggle (the site is dark by design)
- Custom domain
