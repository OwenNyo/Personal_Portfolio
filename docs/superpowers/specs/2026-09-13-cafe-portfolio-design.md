# Cafe portfolio redesign

Date: 2026-09-13
Status: approved 2026-09-13

## Goal

Rebuild the personal portfolio at https://owennyo.github.io/Personal_Portfolio/ as a static site that walks the visitor through a small cafe. The audience is peers and people who find Owen through GitHub or LinkedIn. The site should read as a personal brand page, not a job application.

The current site is a single hand-written HTML page with jQuery loaded and unused, an EmailJS contact form with a hardcoded public key, stale bio text, and several dead links. It is replaced in full.

## Decisions made

| Question | Decision |
|---|---|
| Scope | Full rebuild, new structure and design |
| Audience | Peers and personal brand |
| Posts | None now. The structure must allow a posts section later without a rewrite. |
| Tooling | Build step is fine. Astro with static output. |
| Animation | GSAP with ScrollTrigger. 2D only, no three.js, no React. |
| Theme | Full cafe metaphor, presented as a user journey through the cafe |
| Visual style | Flat illustration. Palette shifts from golden hour to evening as the visitor scrolls. |
| Fonts | Fraunces for display, Inter for body, self-hosted via Astro's fonts API |
| Contact | mailto link and social links. No form, no third-party email service. |
| Resume | PDF in the repo, linked from the last scene. Owen provides the file later; the link ships once the file exists. |
| Projects | Four: Expense Tracker, Unified AI Sandbox, ClearCare, Ultimate Ride |
| Hosting | GitHub Pages at the current URL, built by GitHub Actions |

## The journey

The page is four scenes in a fixed order. On desktop each scene pins for one viewport of scroll and its animation is driven by scroll position. A small hanging-sign nav (Counter, Menu, Your table) lets a visitor jump ahead.

### Scene 1: the door

Storefront at golden hour. Cream background, striped awning, warm sun. A sign reads "Owen's". Below it, one line: software engineer, final-year student at Singapore Institute of Technology. As the visitor starts scrolling the door swings open and an OPEN sign flips. A "step inside" cue points down.

### Scene 2: the counter

Late afternoon, terracotta and long shadows. Owen as a flat illustration behind the counter. A chalk A-frame carries the bio in three or four lines: age 25, final-year student at SIT, what he builds and what he cares about. Skills are labelled jars on the shelf behind the counter. Each jar lights up as it enters the viewport.

Bio copy is drafted during implementation and Owen edits it in review.

### Scene 3: the menu wall

Dusk. Wall lamps switch on as the scene pins. Four project cards pinned to a dark wood wall. Each card shows the project name, the stack listed as ingredients, and links to GitHub and to a live site where one exists. Hover lifts a card. Click flips it to show a one-paragraph description.

Projects and their existing links:

| Project | Stack | GitHub | Live |
|---|---|---|---|
| Expense Tracker | MongoDB, Express, React, Node | OwenNyo/Expense-Tracker | none (deployment is down) |
| Unified AI Sandbox | React, Flask, SQL | huisotong/ICT2214-ITP | none |
| ClearCare | C#, ASP.NET | OwenNyo/ICT2112-Software-Design-SD | none |
| Ultimate Ride | Python, Flask | OwenNyo/INF1008-DSA | none |

Descriptions start from the current site's text and are tightened during implementation. No project has a live link today, so every card shows only the GitHub link. The frontmatter keeps an optional live field for when one comes back. No empty anchors.

### Scene 4: your table

Evening. Dark room, one pool of amber light on a table with a cup. A receipt prints out line by line: GitHub, LinkedIn, email as a mailto link, resume PDF. The last line reads "Thanks for stopping by". The receipt is also the footer, with the copyright line.

## Motion

GSAP core plus the ScrollTrigger plugin, installed from npm, loaded once from a single client script.

Desktop, 768px and wider:

- Each scene pins for 100vh of scroll. Its timeline is scrubbed by scroll progress, so scrolling back reverses the animation.
- The page background and a light overlay interpolate across the whole page, from cream in scene 1 to dark roast in scene 4.
- Illustrations are inline SVG built from flat shapes. Every moving part (door, steam, jars, cards, receipt lines) is its own element with an id or class so GSAP can target it.

Below 768px:

- No pinning. Scenes stack as normal sections.
- Each scene plays a short entrance animation once when it enters the viewport.
- The palette still shifts by section, as plain background colours rather than a continuous interpolation.

Reduced motion:

- If `prefers-reduced-motion: reduce` is set, ScrollTrigger is not initialised. Scenes render in their end state. The only motion is opacity fades on entrance.

Known ceiling: code-built SVG looks geometric. If Owen later wants hand-drawn artwork, a designer's SVG replaces the inline shapes in the same scene components, and the GSAP targets are re-pointed at the new element ids.

## Architecture

Astro, static output, no UI framework.

```
src/
  pages/index.astro          the single page, mounts the four scenes
  layouts/Base.astro         html shell, fonts, meta, global css
  components/
    Nav.astro                hanging-sign nav
    scenes/Door.astro
    scenes/Counter.astro
    scenes/MenuWall.astro
    scenes/Table.astro
    ProjectCard.astro
  scripts/motion.ts          GSAP setup, per-scene timelines, breakpoint and reduced-motion checks
  styles/global.css          palette tokens, type scale, reset
  content/projects/*.md      one file per project, frontmatter: title, stack, github, live, image, order
  content.config.ts          projects collection schema
  assets/projects/*.png      screenshots, run through Astro image optimisation
public/
  resume.pdf                 provided by Owen
  favicon.svg
astro.config.mjs             site: https://owennyo.github.io, base: /Personal_Portfolio
.github/workflows/deploy.yml withastro/action then actions/deploy-pages
```

Fonts go through Astro's fonts API with the Google provider. Astro downloads the font files at build time and serves them from the site's own assets. No Google Fonts request at runtime.

The `base` setting is required because the site lives at a sub-path of the GitHub Pages domain. Every internal link and asset path goes through Astro's base handling. A missed base path is the most likely deploy bug.

Adding posts later means one new content collection and one new page. No scene changes.

## What is removed

- jQuery, Font Awesome, EmailJS, and all CDN scripts and styles.
- The contact form and modal.
- Hotlinked skill logos from Wikipedia and iconscout. Skill jars are drawn inline.
- The dark theme toggle. The palette shift replaces it.
- Space Adventure and Library from the project list. They remain in git history.

## Rollout

Work happens on a branch in `~/RAS/Personal_Portfolio`. The old site stays live on `main` until the new site is verified. Merge to `main` triggers the Actions deploy. Rollback is a revert of the merge commit, which redeploys the old files.

GitHub Pages must be switched from "deploy from branch" to "GitHub Actions" in the repo settings. Owen does this once, before the first merge.

## Verification

Build:

- `npm run build` completes with no warnings.

Automated, against the built site served locally:

- Lighthouse via Chrome DevTools, mobile and desktop. Performance and accessibility both at 90 or above.

Manual, in Chrome via DevTools MCP, with screenshots kept:

- Each scene pins and releases cleanly on desktop. Scrolling back reverses the animation.
- At 390px width, scenes stack and entrance animations play once.
- With reduced motion emulated, every scene is readable with no scroll-driven motion.
- All links resolve. The resume downloads. No empty anchors.
- Keyboard: nav links and project cards are reachable with Tab and the card flip works with Enter.

No unit tests. The only logic is GSAP wiring, which the manual checks cover.

## Out of scope

- Posts or blog section
- Contact form
- Custom domain
- Analytics
- Three.js or any WebGL
