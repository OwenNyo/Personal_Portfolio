# Cafe portfolio implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-written portfolio page with an Astro static site that scrolls through four cafe scenes (door, counter, menu wall, table) animated by GSAP ScrollTrigger.

**Architecture:** One Astro page composed of four scene components, each rendering inline SVG plus text in its finished state. A single client script registers GSAP, splits behaviour by media query (desktop pinned scrub, mobile entrance reveals, reduced motion fades), and builds one scroll-scrubbed timeline per scene. Projects are a markdown content collection. GitHub Actions builds and deploys to GitHub Pages.

**Tech Stack:** Astro 6 (static output, content collections, fonts API, image optimisation), GSAP 3 with ScrollTrigger, TypeScript for the client script, GitHub Actions with `withastro/action`.

**Spec:** `docs/superpowers/specs/2026-09-13-cafe-portfolio-design.md`

## Global constraints

- Node 22 or newer. Local machine has Node 26.4 and npm 11.17.
- No UI framework. No React, no three.js. Only runtime dependency is `gsap`.
- Site URL `https://owennyo.github.io`, base path `/Personal_Portfolio`. Every internal asset and link must go through Astro's base handling or `import.meta.env.BASE_URL`.
- Fonts: Fraunces (display) and Inter (body), fetched at build time through Astro's fonts API. No runtime request to Google Fonts.
- Markup renders the finished state of every scene. Animations use `gsap.fromTo` with explicit start values so no-JS and reduced-motion visitors see the finished page.
- Desktop breakpoint is 768px. Below it there is no pinning.
- No empty anchors. Links render only when a URL exists.
- Contact is a mailto link to `owennyowy@gmail.com`. No form.
- Palette tokens, defined once in `src/styles/global.css` and used everywhere by name:
  - `--cream: #f6e7d3`, `--sand: #e9cfae`, `--terracotta: #c8643c`, `--wood: #7a4b2a`, `--dusk: #6b3f26`, `--espresso: #4a2c1c`, `--amber: #e0a94a`, `--roast: #1c1310`, `--paper: #fbf6ee`, `--chalk: #2f3a33`
- Scene backgrounds in order: door `--cream`, counter `--sand`, menu wall `--dusk`, table `--roast`.
- Every commit message ends with the line `Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs`.
- Work on branch `cafe-redesign`. Do not merge to `main` in this plan.

## File structure

```
astro.config.mjs                    site, base, fonts
package.json                        scripts and the two deps (astro, gsap) plus sharp
tsconfig.json                       extends astro/tsconfigs/strict
src/
  content.config.ts                 projects collection schema
  content/projects/*.md             four project files
  assets/projects/*.png             four screenshots (moved from assets/)
  layouts/Base.astro                html shell, head, fonts, global css, nav slot
  styles/global.css                 tokens, reset, type scale, shared scene rules
  components/
    Nav.astro                       hanging-sign nav
    ProjectCard.astro               flip card
    scenes/Door.astro
    scenes/Counter.astro
    scenes/MenuWall.astro
    scenes/Table.astro
  scripts/
    motion.ts                       GSAP setup and per-scene timelines
    cards.ts                        flip toggle for project cards
  pages/index.astro                 mounts nav and four scenes, loads both scripts
public/
  favicon.svg
  resume.pdf                        added later by Owen
.github/workflows/deploy.yml
```

Removed in Task 1: `index.html`, `style.css`, `app.js`, everything in `assets/` except the four screenshots that move.

---

### Task 1: Astro scaffold, config, layout, tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `astro.config.mjs`, `src/layouts/Base.astro`, `src/styles/global.css`, `src/pages/index.astro`, `public/favicon.svg`
- Move: `assets/Expense-tracker.png` → `src/assets/projects/expense-tracker.png`, `assets/AI_Sandbox.png` → `src/assets/projects/ai-sandbox.png`, `assets/ClearCare.png` → `src/assets/projects/clearcare.png`, `assets/UltimateRide.png` → `src/assets/projects/ultimate-ride.png`
- Delete: `index.html`, `style.css`, `app.js`, remaining files in `assets/`

**Interfaces:**
- Produces: `Base.astro` with props `{ title: string; description: string }` and a default slot. CSS custom properties listed in Global constraints. Utility class `.scene` (full-height section) and attribute `data-scene="door|counter|menu|table"` used by `motion.ts`.

- [ ] **Step 1: Move screenshots and delete the old site**

```bash
cd /Users/owen/RAS/Personal_Portfolio
mkdir -p src/assets/projects
git mv assets/Expense-tracker.png src/assets/projects/expense-tracker.png
git mv assets/AI_Sandbox.png src/assets/projects/ai-sandbox.png
git mv assets/ClearCare.png src/assets/projects/clearcare.png
git mv assets/UltimateRide.png src/assets/projects/ultimate-ride.png
git rm -q -r index.html style.css app.js assets .gitattributes
```

- [ ] **Step 2: Write package.json and tsconfig.json**

`package.json`:

```json
{
  "name": "personal-portfolio",
  "type": "module",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "astro": "^6.3.0",
    "gsap": "^3.13.0",
    "sharp": "^0.34.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.9.0"
  }
}
```

`tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

- [ ] **Step 3: Install**

Run: `npm install`
Expected: `package-lock.json` created, no errors. If npm reports a version of astro or gsap does not exist, run `npm view astro version` and `npm view gsap version` and use the printed versions.

- [ ] **Step 4: Write astro.config.mjs**

```js
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  site: 'https://owennyo.github.io',
  base: '/Personal_Portfolio',
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      weights: [400, 700],
      styles: ['normal', 'italic'],
      subsets: ['latin'],
    },
    {
      provider: fontProviders.google(),
      name: 'Inter',
      cssVariable: '--font-body',
      weights: [400, 600],
      styles: ['normal'],
      subsets: ['latin'],
    },
  ],
});
```

- [ ] **Step 5: Write src/styles/global.css**

```css
:root {
  --cream: #f6e7d3;
  --sand: #e9cfae;
  --terracotta: #c8643c;
  --wood: #7a4b2a;
  --dusk: #6b3f26;
  --espresso: #4a2c1c;
  --amber: #e0a94a;
  --roast: #1c1310;
  --paper: #fbf6ee;
  --chalk: #2f3a33;

  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-1: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --step-2: clamp(1.75rem, 1.4rem + 1.75vw, 3rem);
  --step-3: clamp(2.5rem, 1.8rem + 3.5vw, 5rem);

  --gutter: clamp(1rem, 4vw, 3rem);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  font-family: var(--font-body), system-ui, sans-serif;
  font-size: var(--step-0);
  line-height: 1.55;
  color: var(--espresso);
  background: var(--cream);
}

h1,
h2,
h3 {
  font-family: var(--font-display), Georgia, serif;
  line-height: 1.1;
  margin: 0;
}

a {
  color: inherit;
}

img,
svg {
  display: block;
  max-width: 100%;
}

.scene {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  padding: var(--gutter);
  display: grid;
  align-content: center;
  overflow: hidden;
}

.scene__inner {
  width: min(100%, 72rem);
  margin-inline: auto;
}

.scene--dark {
  color: var(--paper);
}

[data-scene='door'] {
  background: var(--cream);
}
[data-scene='counter'] {
  background: var(--sand);
}
[data-scene='menu'] {
  background: var(--dusk);
}
[data-scene='table'] {
  background: var(--roast);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

- [ ] **Step 6: Write src/layouts/Base.astro**

```astro
---
import { Font } from 'astro:assets';
import '../styles/global.css';

interface Props {
  title: string;
  description: string;
}

const { title, description } = Astro.props;
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href={`${base}/favicon.svg`} type="image/svg+xml" />
    <Font cssVariable="--font-display" preload />
    <Font cssVariable="--font-body" preload />
  </head>
  <body>
    <slot />
  </body>
</html>
```

- [ ] **Step 7: Write a placeholder src/pages/index.astro**

```astro
---
import Base from '../layouts/Base.astro';
---

<Base title="Owen Nyo" description="Owen Nyo, software engineer. A small cafe of projects.">
  <main>
    <section class="scene" data-scene="door">
      <div class="scene__inner"><h1>Owen's</h1></div>
    </section>
  </main>
</Base>
```

- [ ] **Step 8: Write public/favicon.svg**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#4a2c1c"/>
  <path d="M8 12h13v8a5 5 0 0 1-5 5h-3a5 5 0 0 1-5-5z" fill="#f6e7d3"/>
  <path d="M21 14h2a3 3 0 0 1 0 6h-2" fill="none" stroke="#f6e7d3" stroke-width="2"/>
  <path d="M12 9c0-2 2-2 2-4M17 9c0-2 2-2 2-4" fill="none" stroke="#e0a94a" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

- [ ] **Step 9: Build and check**

Run: `npm run build && npm run check`
Expected: `dist/index.html` exists, build prints no warnings, `astro check` reports 0 errors. Confirm fonts were bundled: `ls dist/_astro | grep -i -E 'fraunces|inter|woff2'` prints at least two font files.

- [ ] **Step 10: Add .gitignore entries and commit**

`.gitignore` already has `.superpowers/`, `node_modules/`, `dist/`, `.astro/`. Confirm with `cat .gitignore`, then:

```bash
git add -A
git commit -m "Scaffold Astro site, remove old static page

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 2: Projects content collection and ProjectCard

**Files:**
- Create: `src/content.config.ts`, `src/content/projects/expense-tracker.md`, `src/content/projects/ai-sandbox.md`, `src/content/projects/clearcare.md`, `src/content/projects/ultimate-ride.md`, `src/components/ProjectCard.astro`, `src/scripts/cards.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: collection `projects` with frontmatter `{ title: string; stack: string[]; github: string; live?: string; image: ImageMetadata; imageAlt: string; order: number }`. Body is the one-paragraph description.
- Produces: `ProjectCard.astro` with props `{ project: CollectionEntry<'projects'> }`. Root element `<article class="card" data-reveal>`. Toggling class `is-flipped` on the article shows the back face.
- Produces: `cards.ts` default side effect: click delegation on `.card__flip` buttons.

- [ ] **Step 1: Write src/content.config.ts**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      stack: z.array(z.string()).min(1),
      github: z.string().url(),
      live: z.string().url().optional(),
      image: image(),
      imageAlt: z.string(),
      order: z.number().int(),
    }),
});

export const collections = { projects };
```

- [ ] **Step 2: Write the four project files**

`src/content/projects/expense-tracker.md`:

```md
---
title: Expense Tracker
stack: [MongoDB, Express, React, Node]
github: https://github.com/OwenNyo/Expense-Tracker
image: ../../assets/projects/expense-tracker.png
imageAlt: Expense Tracker dashboard showing balance and recent transactions
order: 1
---

A MERN app for personal finances. Add, edit, and delete income and expenses, see a live balance, and read spending patterns off a dashboard. Sign-in and persistent storage included.
```

`src/content/projects/ai-sandbox.md`:

```md
---
title: Unified AI Sandbox
stack: [React, Flask, SQL]
github: https://github.com/huisotong/ICT2214-ITP
image: ../../assets/projects/ai-sandbox.png
imageAlt: Unified AI Sandbox chat interface with module bots listed on the left
order: 2
---

A React and Flask platform where instructors configure a chatbot per module and students get on-demand academic help. Handles users, credits, and the instructor workflows around them.
```

`src/content/projects/clearcare.md`:

```md
---
title: ClearCare
stack: [C#, ASP.NET]
github: https://github.com/OwenNyo/ICT2112-Software-Design-SD
image: ../../assets/projects/clearcare.png
imageAlt: ClearCare scheduling screen for pre-discharge services
order: 3
---

Coordinates and schedules pre-discharge services for hospital patients. Role-based access for providers, one place for patient data, service scheduling, and home safety assessments, split into three modules.
```

`src/content/projects/ultimate-ride.md`:

```md
---
title: Ultimate Ride
stack: [Python, Flask]
github: https://github.com/OwenNyo/INF1008-DSA
image: ../../assets/projects/ultimate-ride.png
imageAlt: Ultimate Ride route map from the airport to hotels
order: 4
---

Plans shuttle routes from the airport to hotels, minimising time, cost, distance, and CO2. Commuters book a seat and register through the app.
```

- [ ] **Step 3: Write src/components/ProjectCard.astro**

```astro
---
import { Image } from 'astro:assets';
import { render, type CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { Content } = await render(project);
const { title, stack, github, live, image, imageAlt } = project.data;
---

<article class="card" data-reveal>
  <div class="card__face card__face--front">
    <Image src={image} alt={imageAlt} width={640} class="card__img" />
    <h3 class="card__title">{title}</h3>
    <p class="card__stack">{stack.join(' · ')}</p>
    <button type="button" class="card__flip" aria-expanded="false">Details</button>
  </div>
  <div class="card__face card__face--back" inert>
    <h3 class="card__title">{title}</h3>
    <div class="card__body"><Content /></div>
    <p class="card__links">
      <a href={github} target="_blank" rel="noopener">GitHub</a>
      {live && <a href={live} target="_blank" rel="noopener">Live site</a>}
    </p>
    <button type="button" class="card__flip" aria-expanded="true">Back</button>
  </div>
</article>

<style>
  .card {
    position: relative;
    display: grid;
    perspective: 1200px;
  }

  .card__face {
    grid-area: 1 / 1;
    background: var(--paper);
    color: var(--espresso);
    border-radius: 0.5rem;
    padding: 1rem;
    box-shadow: 0 8px 24px rgb(0 0 0 / 0.25);
    backface-visibility: hidden;
    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .card__face--back {
    transform: rotateY(180deg);
  }

  .card.is-flipped .card__face--front {
    transform: rotateY(180deg);
  }

  .card.is-flipped .card__face--back {
    transform: rotateY(360deg);
  }

  .card:hover {
    z-index: 1;
  }

  .card:hover .card__face--front {
    transform: translateY(-6px);
  }

  .card.is-flipped:hover .card__face--front {
    transform: rotateY(180deg);
  }

  .card__img {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 10;
    object-fit: cover;
    border-radius: 0.25rem;
  }

  .card__title {
    font-size: var(--step-1);
  }

  .card__stack {
    margin: 0;
    font-size: 0.9em;
    color: var(--wood);
  }

  .card__body {
    flex: 1;
    font-size: 0.95em;
  }

  .card__body :global(p) {
    margin: 0;
  }

  .card__links {
    margin: 0;
    display: flex;
    gap: 1rem;
    font-weight: 600;
  }

  .card__flip {
    align-self: flex-start;
    font: inherit;
    font-weight: 600;
    padding: 0.4rem 0.9rem;
    border: 2px solid var(--espresso);
    border-radius: 999px;
    background: transparent;
    color: inherit;
    cursor: pointer;
  }

  .card__flip:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .card__face {
      transition: none;
    }
  }
</style>
```

- [ ] **Step 4: Write src/scripts/cards.ts**

```ts
document.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.card__flip');
  if (!button) return;
  const card = button.closest<HTMLElement>('.card');
  if (!card) return;

  const flipped = card.classList.toggle('is-flipped');
  const front = card.querySelector<HTMLElement>('.card__face--front');
  const back = card.querySelector<HTMLElement>('.card__face--back');
  if (!front || !back) return;

  front.toggleAttribute('inert', flipped);
  back.toggleAttribute('inert', !flipped);
  (flipped ? back : front).querySelector<HTMLButtonElement>('.card__flip')?.focus();
});
```

- [ ] **Step 5: Render the cards in index.astro to check the collection**

Replace `src/pages/index.astro` with:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import ProjectCard from '../components/ProjectCard.astro';

const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
---

<Base title="Owen Nyo" description="Owen Nyo, software engineer. A small cafe of projects.">
  <main>
    <section class="scene scene--dark" data-scene="menu">
      <div class="scene__inner" style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
        {projects.map((project) => <ProjectCard project={project} />)}
      </div>
    </section>
  </main>
</Base>

<script src="../scripts/cards.ts"></script>
```

- [ ] **Step 6: Build and verify in the browser**

Run: `npm run build && npm run check`
Expected: 0 errors. `ls dist/_astro | grep -c -E '\.(png|webp)$'` prints 4 or more (optimised images).

Run: `npm run preview` in the background, then open `http://localhost:4321/Personal_Portfolio/` with the Chrome DevTools MCP `navigate_page` tool and `take_snapshot`.
Expected: four cards in order Expense Tracker, Unified AI Sandbox, ClearCare, Ultimate Ride. Each card has exactly one "Details" button. Click a "Details" button with the `click` tool, then `take_snapshot`: the card now shows the description, a GitHub link, no "Live site" link, and a "Back" button. Press Tab and confirm focus lands on the "Back" button, not on hidden front-face content.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "Add projects collection and flip card

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 3: Scene 1, the door

**Files:**
- Create: `src/components/scenes/Door.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="scene" data-scene="door" id="door">`. Elements `motion.ts` targets by class: `.door__sign`, `.door__tagline`, `.door__cue`, `.door__panel`, `.door__open`, `.door__closed`, `.door__steam path`, `.door__sun`. All render in the finished state (door open, OPEN sign showing).

- [ ] **Step 1: Write src/components/scenes/Door.astro**

```astro
---
---

<section class="scene" data-scene="door" id="door" aria-labelledby="door-title">
  <div class="scene__inner door">
    <div class="door__copy">
      <p class="door__eyebrow" data-reveal>Now open</p>
      <h1 class="door__sign" id="door-title" data-reveal>Owen's</h1>
      <p class="door__tagline" data-reveal>
        Software engineer. Final-year student at Singapore Institute of Technology. Come in, it's warm.
      </p>
      <a class="door__cue" href="#counter" data-reveal>Step inside ↓</a>
    </div>

    <svg class="door__art" viewBox="0 0 400 420" role="img" aria-label="A small cafe storefront at golden hour with the door open">
      <circle class="door__sun" cx="330" cy="70" r="38" fill="var(--amber)" />
      <rect x="40" y="120" width="320" height="300" rx="8" fill="var(--terracotta)" />
      <rect x="40" y="120" width="320" height="28" fill="var(--espresso)" />
      <g class="door__awning">
        <rect x="24" y="148" width="352" height="34" fill="var(--paper)" />
        <rect x="24" y="148" width="44" height="34" fill="var(--terracotta)" />
        <rect x="112" y="148" width="44" height="34" fill="var(--terracotta)" />
        <rect x="200" y="148" width="44" height="34" fill="var(--terracotta)" />
        <rect x="288" y="148" width="44" height="34" fill="var(--terracotta)" />
      </g>
      <rect x="70" y="210" width="120" height="110" rx="6" fill="var(--paper)" />
      <g class="door__steam" fill="none" stroke="var(--espresso)" stroke-width="3" stroke-linecap="round">
        <path d="M110 300c-8-12 8-18 0-30" />
        <path d="M130 305c-8-12 8-18 0-30" />
        <path d="M150 300c-8-12 8-18 0-30" />
      </g>
      <rect x="100" y="300" width="60" height="14" rx="3" fill="var(--espresso)" />
      <g class="door__frame">
        <rect x="230" y="200" width="100" height="220" fill="var(--espresso)" />
        <rect x="238" y="208" width="84" height="212" fill="var(--roast)" />
        <g class="door__panel">
          <rect x="238" y="208" width="84" height="212" fill="var(--wood)" />
          <rect x="250" y="222" width="60" height="70" rx="4" fill="var(--paper)" />
          <circle cx="312" cy="330" r="4" fill="var(--amber)" />
        </g>
      </g>
      <g class="door__signboard">
        <rect x="254" y="236" width="52" height="24" rx="3" fill="var(--paper)" stroke="var(--espresso)" stroke-width="2" />
        <text class="door__open" x="280" y="253" text-anchor="middle" font-size="12" font-weight="700" fill="var(--espresso)">OPEN</text>
        <text class="door__closed" x="280" y="253" text-anchor="middle" font-size="12" font-weight="700" fill="var(--espresso)" opacity="0">CLOSED</text>
      </g>
    </svg>
  </div>
</section>

<style>
  .door {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    align-items: center;
  }

  @media (min-width: 768px) {
    .door {
      grid-template-columns: 1.1fr 1fr;
    }
  }

  .door__eyebrow {
    margin: 0 0 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-size: 0.8em;
    color: var(--terracotta);
    font-weight: 600;
  }

  .door__sign {
    font-size: var(--step-3);
    font-weight: 700;
  }

  .door__tagline {
    font-size: var(--step-1);
    max-width: 26ch;
    margin: 1rem 0 1.5rem;
  }

  .door__cue {
    display: inline-block;
    padding: 0.6rem 1.2rem;
    border-radius: 999px;
    background: var(--espresso);
    color: var(--cream);
    text-decoration: none;
    font-weight: 600;
  }

  .door__cue:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 2px;
  }

  .door__art {
    width: min(100%, 26rem);
    margin-inline: auto;
  }

  .door__panel {
    transform-box: fill-box;
    transform-origin: left center;
    transform: scaleX(0.18);
  }
</style>
```

- [ ] **Step 2: Mount it in index.astro**

Replace the `<main>` contents in `src/pages/index.astro` so the file reads:

```astro
---
import { getCollection } from 'astro:content';
import Base from '../layouts/Base.astro';
import ProjectCard from '../components/ProjectCard.astro';
import Door from '../components/scenes/Door.astro';

const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
---

<Base title="Owen Nyo" description="Owen Nyo, software engineer. A small cafe of projects.">
  <main>
    <Door />
    <section class="scene scene--dark" data-scene="menu">
      <div class="scene__inner" style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(16rem,1fr))">
        {projects.map((project) => <ProjectCard project={project} />)}
      </div>
    </section>
  </main>
</Base>

<script src="../scripts/cards.ts"></script>
```

- [ ] **Step 3: Build and check in the browser**

Run: `npm run build && npm run check`, then preview and load the page in Chrome DevTools MCP. `take_screenshot`.
Expected: cream first screen, "Owen's" headline, tagline, "Step inside" button, storefront illustration with a narrow (open) door panel and "OPEN" visible. `resize_page` to 390 wide and screenshot: copy stacks above the illustration, nothing overflows horizontally.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add door scene

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 4: Scene 2, the counter

**Files:**
- Create: `src/components/scenes/Counter.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="scene" data-scene="counter" id="counter">`. Targets: `.counter__line` (bio lines), `.jar` (skill jars), `.jar__glow`, `.counter__barista`.

- [ ] **Step 1: Write src/components/scenes/Counter.astro**

```astro
---
const skills = ['React', 'JavaScript', 'Python', 'Flask', 'C#', 'SQL', 'HTML', 'CSS'];
const bio = [
  "I'm Owen, 25, a final-year software engineering student at Singapore Institute of Technology.",
  'I build web apps end to end, with a soft spot for interfaces that feel good to use.',
  'Off the clock: coffee, side projects, and reading other people’s code.',
];
---

<section class="scene" data-scene="counter" id="counter" aria-labelledby="counter-title">
  <div class="scene__inner counter">
    <div class="counter__shelf" aria-label="Skills">
      <h2 class="visually-hidden">Skills</h2>
      <ul class="counter__jars">
        {
          skills.map((skill) => (
            <li class="jar" data-reveal>
              <svg viewBox="0 0 60 80" aria-hidden="true">
                <rect class="jar__glow" x="6" y="18" width="48" height="58" rx="8" fill="var(--amber)" opacity="0.9" />
                <rect x="6" y="18" width="48" height="58" rx="8" fill="none" stroke="var(--espresso)" stroke-width="3" />
                <rect x="14" y="6" width="32" height="14" rx="3" fill="var(--espresso)" />
              </svg>
              <span class="jar__label">{skill}</span>
            </li>
          ))
        }
      </ul>
    </div>

    <div class="counter__front">
      <svg class="counter__barista" viewBox="0 0 160 200" role="img" aria-label="Owen behind the counter, drawn flat">
        <circle cx="80" cy="60" r="34" fill="var(--paper)" />
        <path d="M46 56c4-30 64-30 68 0-10-14-58-14-68 0z" fill="var(--espresso)" />
        <rect x="40" y="96" width="80" height="80" rx="18" fill="var(--terracotta)" />
        <rect x="56" y="110" width="48" height="60" rx="8" fill="var(--paper)" />
        <circle cx="70" cy="60" r="3" fill="var(--espresso)" />
        <circle cx="90" cy="60" r="3" fill="var(--espresso)" />
        <path d="M70 74q10 8 20 0" fill="none" stroke="var(--espresso)" stroke-width="3" stroke-linecap="round" />
      </svg>

      <div class="counter__board" data-reveal>
        <h2 class="counter__title" id="counter-title">About the barista</h2>
        {bio.map((line) => <p class="counter__line">{line}</p>)}
      </div>
    </div>
  </div>
</section>

<style>
  .counter {
    display: grid;
    gap: 2rem;
  }

  .counter__jars {
    list-style: none;
    margin: 0;
    padding: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(4.5rem, 1fr));
    gap: 1rem;
    background: var(--wood);
    border-radius: 0.5rem;
    box-shadow: inset 0 -12px 0 var(--espresso);
  }

  .jar {
    display: grid;
    justify-items: center;
    gap: 0.25rem;
    color: var(--paper);
    font-size: 0.8em;
    font-weight: 600;
  }

  .jar svg {
    width: 3.5rem;
  }

  .counter__front {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.5rem;
    align-items: end;
  }

  .counter__barista {
    width: clamp(6rem, 18vw, 10rem);
  }

  .counter__board {
    background: var(--chalk);
    color: var(--paper);
    padding: 1.5rem;
    border-radius: 0.5rem;
    border: 6px solid var(--wood);
  }

  .counter__title {
    font-size: var(--step-2);
    margin-bottom: 0.75rem;
  }

  .counter__line {
    margin: 0 0 0.5rem;
    max-width: 52ch;
  }

  @media (max-width: 767px) {
    .counter__front {
      grid-template-columns: 1fr;
    }
  }
</style>
```

- [ ] **Step 2: Mount it after `<Door />` in index.astro**

Add `import Counter from '../components/scenes/Counter.astro';` and `<Counter />` directly after `<Door />`.

- [ ] **Step 3: Build and check**

Run: `npm run build && npm run check`, preview, load in Chrome DevTools MCP, scroll to `#counter` with `navigate_page` to `http://localhost:4321/Personal_Portfolio/#counter`, screenshot.
Expected: sand background, a wooden shelf with eight labelled jars, the barista figure, a dark chalkboard with the "About the barista" heading and three lines. At 390px the barista stacks above the board.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add counter scene

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 5: Scene 3, the menu wall

**Files:**
- Create: `src/components/scenes/MenuWall.astro`
- Modify: `src/pages/index.astro` (remove the temporary menu section from Task 2)

**Interfaces:**
- Consumes: `ProjectCard.astro` from Task 2.
- Produces: `<section class="scene scene--dark" data-scene="menu" id="menu">`. Targets: `.lamp__glow`, `.card` (from ProjectCard), `.menu__title`.

- [ ] **Step 1: Write src/components/scenes/MenuWall.astro**

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from '../ProjectCard.astro';

const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
---

<section class="scene scene--dark" data-scene="menu" id="menu" aria-labelledby="menu-title">
  <div class="menu__lamps" aria-hidden="true">
    {
      [0, 1, 2].map(() => (
        <svg class="lamp" viewBox="0 0 80 120">
          <line x1="40" y1="0" x2="40" y2="30" stroke="var(--espresso)" stroke-width="3" />
          <path d="M14 56 L40 30 L66 56 Z" fill="var(--espresso)" />
          <ellipse class="lamp__glow" cx="40" cy="80" rx="38" ry="40" fill="var(--amber)" opacity="0.35" />
        </svg>
      ))
    }
  </div>

  <div class="scene__inner">
    <h2 class="menu__title" id="menu-title" data-reveal>Today's menu</h2>
    <ul class="menu__cards">
      {
        projects.map((project) => (
          <li>
            <ProjectCard project={project} />
          </li>
        ))
      }
    </ul>
  </div>
</section>

<style>
  .menu__lamps {
    position: absolute;
    inset: 0 0 auto 0;
    display: flex;
    justify-content: space-around;
    pointer-events: none;
  }

  .lamp {
    width: clamp(3rem, 8vw, 5rem);
  }

  .menu__title {
    font-size: var(--step-2);
    margin: 4rem 0 1.5rem;
    color: var(--cream);
  }

  .menu__cards {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  }
</style>
```

- [ ] **Step 2: Rewrite index.astro to use MenuWall**

```astro
---
import Base from '../layouts/Base.astro';
import Door from '../components/scenes/Door.astro';
import Counter from '../components/scenes/Counter.astro';
import MenuWall from '../components/scenes/MenuWall.astro';
---

<Base title="Owen Nyo" description="Owen Nyo, software engineer. A small cafe of projects.">
  <main>
    <Door />
    <Counter />
    <MenuWall />
  </main>
</Base>

<script src="../scripts/cards.ts"></script>
```

- [ ] **Step 3: Build and check**

Run: `npm run build && npm run check`, preview, load `#menu`, screenshot.
Expected: dusk background, three lamps along the top with amber glow, "Today's menu" heading, four cards. Flip still works (click "Details", snapshot shows the back face).

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add menu wall scene

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 6: Scene 4, your table

**Files:**
- Create: `src/components/scenes/Table.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<section class="scene scene--dark" data-scene="table" id="table">`. Targets: `.receipt`, `.receipt__line`, `.table__steam path`, `.table__light`.
- Resume link renders only if `public/resume.pdf` exists at build time.

- [ ] **Step 1: Write src/components/scenes/Table.astro**

```astro
---
import { existsSync } from 'node:fs';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
const hasResume = existsSync(new URL('../../../public/resume.pdf', import.meta.url));
const year = new Date().getFullYear();

const lines = [
  { label: 'GitHub', href: 'https://github.com/OwenNyo', text: 'github.com/OwenNyo' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/owen-nyo/', text: 'linkedin.com/in/owen-nyo' },
  { label: 'Email', href: 'mailto:owennyowy@gmail.com', text: 'owennyowy@gmail.com' },
  ...(hasResume ? [{ label: 'Resume', href: `${base}/resume.pdf`, text: 'resume.pdf' }] : []),
];
---

<section class="scene scene--dark" data-scene="table" id="table" aria-labelledby="table-title">
  <div class="table__light" aria-hidden="true"></div>

  <div class="scene__inner table">
    <svg class="table__cup" viewBox="0 0 200 160" role="img" aria-label="A cup of coffee on a table under a lamp">
      <ellipse cx="100" cy="140" rx="90" ry="14" fill="var(--wood)" />
      <g class="table__steam" fill="none" stroke="var(--cream)" stroke-width="3" stroke-linecap="round" opacity="0.8">
        <path d="M80 70c-10-14 10-22 0-36" />
        <path d="M100 66c-10-14 10-22 0-36" />
        <path d="M120 70c-10-14 10-22 0-36" />
      </g>
      <path d="M50 80h100v30a30 30 0 0 1-30 30H80a30 30 0 0 1-30-30z" fill="var(--paper)" />
      <path d="M150 90h12a14 14 0 0 1 0 28h-12" fill="none" stroke="var(--paper)" stroke-width="8" />
      <ellipse cx="100" cy="80" rx="50" ry="8" fill="var(--espresso)" />
    </svg>

    <footer class="receipt" data-reveal>
      <h2 class="receipt__title" id="table-title">Your receipt</h2>
      <p class="receipt__line receipt__meta">Owen's · table for one · {year}</p>
      <ul class="receipt__list">
        {
          lines.map((line) => (
            <li class="receipt__line">
              <span>{line.label}</span>
              <a href={line.href} target={line.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener">
                {line.text}
              </a>
            </li>
          ))
        }
      </ul>
      <p class="receipt__line receipt__thanks">Thanks for stopping by.</p>
      <p class="receipt__line receipt__copy">© {year} Owen Nyo</p>
    </footer>
  </div>
</section>

<style>
  .table__light {
    position: absolute;
    left: 50%;
    top: -10%;
    width: 70vmin;
    height: 70vmin;
    transform: translateX(-50%);
    background: radial-gradient(closest-side, rgb(224 169 74 / 0.35), transparent);
    pointer-events: none;
  }

  .table {
    display: grid;
    gap: 2rem;
    justify-items: center;
    position: relative;
  }

  .table__cup {
    width: clamp(10rem, 30vw, 16rem);
  }

  .receipt {
    width: min(100%, 26rem);
    background: var(--paper);
    color: var(--espresso);
    padding: 1.5rem 1.25rem 2rem;
    font-family: ui-monospace, 'SF Mono', Menlo, monospace;
    font-size: 0.9em;
    box-shadow: 0 16px 40px rgb(0 0 0 / 0.5);
    clip-path: polygon(0 0, 100% 0, 100% calc(100% - 8px), 95% 100%, 90% calc(100% - 8px), 85% 100%, 80% calc(100% - 8px), 75% 100%, 70% calc(100% - 8px), 65% 100%, 60% calc(100% - 8px), 55% 100%, 50% calc(100% - 8px), 45% 100%, 40% calc(100% - 8px), 35% 100%, 30% calc(100% - 8px), 25% 100%, 20% calc(100% - 8px), 15% 100%, 10% calc(100% - 8px), 5% 100%, 0 calc(100% - 8px));
  }

  .receipt__title {
    font-family: inherit;
    font-size: 1.1em;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-align: center;
    margin-bottom: 0.5rem;
  }

  .receipt__meta,
  .receipt__thanks,
  .receipt__copy {
    text-align: center;
    margin: 0.5rem 0;
  }

  .receipt__list {
    list-style: none;
    margin: 1rem 0;
    padding: 1rem 0;
    border-top: 1px dashed var(--wood);
    border-bottom: 1px dashed var(--wood);
  }

  .receipt__list .receipt__line {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    margin: 0.4rem 0;
  }

  .receipt a {
    color: var(--terracotta);
    font-weight: 600;
  }

  .receipt a:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 2px;
  }
</style>
```

- [ ] **Step 2: Mount it after `<MenuWall />` in index.astro**

Add `import Table from '../components/scenes/Table.astro';` and `<Table />` after `<MenuWall />`.

- [ ] **Step 3: Build and check**

Run: `npm run build && npm run check`, preview, load `#table`, screenshot and snapshot.
Expected: dark background, amber light pool, cup with steam, receipt with three link lines (GitHub, LinkedIn, Email) and no Resume line. `grep -c resume.pdf dist/index.html` prints 0.

Then: `touch public/resume.pdf && npm run build && grep -c resume.pdf dist/index.html` prints 1. Remove the placeholder: `rm public/resume.pdf`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add table scene with receipt footer

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 7: Hanging-sign nav

**Files:**
- Create: `src/components/Nav.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Produces: `<nav class="nav">` fixed top-right with links to `#counter`, `#menu`, `#table`. Root has class `.nav` for `motion.ts` to leave alone.

- [ ] **Step 1: Write src/components/Nav.astro**

```astro
---
const links = [
  { href: '#counter', label: 'Counter' },
  { href: '#menu', label: 'Menu' },
  { href: '#table', label: 'Your table' },
];
---

<nav class="nav" aria-label="Jump to a part of the cafe">
  <span class="nav__chain" aria-hidden="true"></span>
  <ul class="nav__list">
    {links.map((link) => <li><a class="nav__link" href={link.href}>{link.label}</a></li>)}
  </ul>
</nav>

<style>
  .nav {
    position: fixed;
    top: 0;
    right: var(--gutter);
    z-index: 10;
    display: grid;
    justify-items: center;
  }

  .nav__chain {
    width: 2px;
    height: 1.25rem;
    background: var(--espresso);
  }

  .nav__list {
    list-style: none;
    margin: 0;
    padding: 0.5rem 0.75rem;
    display: flex;
    gap: 1rem;
    background: var(--paper);
    color: var(--espresso);
    border: 3px solid var(--espresso);
    border-radius: 0.5rem;
    box-shadow: 0 6px 16px rgb(0 0 0 / 0.2);
    font-size: 0.9em;
    font-weight: 600;
  }

  .nav__link {
    text-decoration: none;
    padding: 0.25rem 0.25rem;
  }

  .nav__link:hover {
    text-decoration: underline;
  }

  .nav__link:focus-visible {
    outline: 3px solid var(--amber);
    outline-offset: 2px;
  }

  @media (max-width: 767px) {
    .nav {
      right: 50%;
      transform: translateX(50%);
    }
  }
</style>
```

- [ ] **Step 2: Mount it as the first child of `<Base>`, before `<main>`**

Add `import Nav from '../components/Nav.astro';` and `<Nav />` before `<main>`.

- [ ] **Step 3: Build and check**

Run: `npm run build && npm run check`, preview, load the page. `take_snapshot`: nav has three links. Click "Menu" with the `click` tool and `evaluate_script` returning `location.hash`: expected `#menu`. Press Tab from page load: first focus lands on "Counter".

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add hanging-sign nav

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 8: Motion

**Files:**
- Create: `src/scripts/motion.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: selectors listed in Tasks 3 to 6 and the `data-reveal` attribute on any element that should fade in on mobile.
- Produces: side-effect module. No exports.

Behaviour summary from the spec: desktop pins each scene for one viewport and scrubs its timeline; body background interpolates across the page; mobile plays one entrance reveal per scene; reduced motion gets no ScrollTrigger and opacity-only fades.

- [ ] **Step 1: Write src/scripts/motion.ts**

```ts
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SCENE_BG: Record<string, string> = {
  door: '#f6e7d3',
  counter: '#e9cfae',
  menu: '#6b3f26',
  table: '#1c1310',
};

const scenes = gsap.utils.toArray<HTMLElement>('[data-scene]');

function pinned(scene: HTMLElement) {
  return gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: scene,
      start: 'top top',
      end: '+=100%',
      pin: true,
      scrub: true,
    },
  });
}

function door(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.door__panel', { scaleX: 1 }, { scaleX: 0.18, duration: 0.5 }, 0)
    .fromTo('.door__closed', { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0.3)
    .fromTo('.door__open', { opacity: 0 }, { opacity: 1, duration: 0.1 }, 0.35)
    .fromTo('.door__steam path', { y: 12, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.3 }, 0.2)
    .fromTo('.door__sun', { y: 40 }, { y: 0, duration: 0.6 }, 0)
    .fromTo(
      scene.querySelectorAll('[data-reveal]'),
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.3 },
      0.1,
    );
}

function counter(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.counter__barista', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.3 }, 0)
    .fromTo('.counter__board', { autoAlpha: 0, scaleY: 0, transformOrigin: 'top center' }, { autoAlpha: 1, scaleY: 1, duration: 0.3 }, 0.1)
    .fromTo('.counter__line', { autoAlpha: 0, x: -12 }, { autoAlpha: 1, x: 0, stagger: 0.1, duration: 0.2 }, 0.3)
    .fromTo('.jar__glow', { opacity: 0 }, { opacity: 0.9, stagger: 0.05, duration: 0.15 }, 0.4);
}

function menu(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.lamp__glow', { opacity: 0 }, { opacity: 0.35, stagger: 0.1, duration: 0.3 }, 0)
    .fromTo('.menu__title', { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.2 }, 0.2)
    .fromTo('.card', { autoAlpha: 0, y: 80, rotation: -2 }, { autoAlpha: 1, y: 0, rotation: 0, stagger: 0.1, duration: 0.4 }, 0.3);
}

function table(scene: HTMLElement) {
  const tl = pinned(scene);
  tl.fromTo('.table__light', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0)
    .fromTo('.table__steam path', { y: 16, opacity: 0 }, { y: 0, opacity: 0.8, stagger: 0.05, duration: 0.3 }, 0.2)
    .fromTo('.receipt', { scaleY: 0, transformOrigin: 'top center' }, { scaleY: 1, duration: 0.3 }, 0.3)
    .fromTo('.receipt__line', { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.06, duration: 0.15 }, 0.5);
}

const BUILDERS: Record<string, (scene: HTMLElement) => void> = { door, counter, menu, table };

function backgroundShift() {
  scenes.forEach((scene, i) => {
    const next = scenes[i + 1];
    if (!next) return;
    gsap.fromTo(
      document.body,
      { backgroundColor: SCENE_BG[scene.dataset.scene!] },
      {
        backgroundColor: SCENE_BG[next.dataset.scene!],
        ease: 'none',
        scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top', scrub: true },
      },
    );
  });
  // Scenes paint their own background in CSS; make them transparent so the body shows through.
  gsap.set(scenes, { backgroundColor: 'transparent' });
}

const mm = gsap.matchMedia();

mm.add(
  {
    desktop: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    mobile: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    reduce: '(prefers-reduced-motion: reduce)',
  },
  (context) => {
    const { desktop, mobile, reduce } = context.conditions!;

    if (desktop) {
      scenes.forEach((scene) => BUILDERS[scene.dataset.scene!]?.(scene));
      backgroundShift();
    }

    if (mobile) {
      scenes.forEach((scene) => {
        gsap.from(scene.querySelectorAll('[data-reveal]'), {
          autoAlpha: 0,
          y: 24,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: { trigger: scene, start: 'top 70%', once: true },
        });
      });
    }

    if (reduce) {
      scenes.forEach((scene) => {
        gsap.from(scene.querySelectorAll('[data-reveal]'), {
          autoAlpha: 0,
          duration: 0.4,
          scrollTrigger: { trigger: scene, start: 'top 80%', once: true },
        });
      });
    }
  },
);
```

Note on the spec: it says ScrollTrigger is not initialised under reduced motion. A `once: true` trigger that only fades opacity is the smallest way to get "fades on entrance" without a second observer implementation, and it never moves anything. Keep it.

- [ ] **Step 2: Load the script in index.astro**

Add after the existing `<script src="../scripts/cards.ts"></script>`:

```astro
<script src="../scripts/motion.ts"></script>
```

- [ ] **Step 3: Build and check desktop pinning**

Run: `npm run build && npm run check`. Expected 0 errors. `ls -la dist/_astro/*.js` shows the bundled scripts; the largest should be under 120 KB (GSAP core plus ScrollTrigger, minified).

Preview and load the page in Chrome DevTools MCP at 1280 x 800 (`resize_page`). Then, using `evaluate_script`, scroll and sample:

```js
async () => {
  const out = [];
  for (const y of [0, 400, 800, 1200, 1600, 2400, 3200, 4800]) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 250));
    out.push({ y, bg: getComputedStyle(document.body).backgroundColor, pinned: document.querySelector('.pin-spacer') !== null });
  }
  return out;
}
```

Expected: `pinned` is true at every sample; `bg` starts at `rgb(246, 231, 211)` and ends at `rgb(28, 19, 16)`, changing monotonically darker. Take a screenshot at y=400 (door mid-swing, panel wider than final) and at y=2400 (menu wall, cards partially risen).

- [ ] **Step 4: Check scroll reversal**

`evaluate_script`: scroll to 4800, wait 300ms, scroll to 0, wait 300ms, return `getComputedStyle(document.querySelector('.door__panel')).transform`. Expected: a matrix whose first value is 1 (door closed at the top of the page while the desktop timeline is at progress 0). This confirms scrub reverses.

- [ ] **Step 5: Check mobile and reduced motion**

`resize_page` to 390 x 844, reload. `evaluate_script`: return `document.querySelectorAll('.pin-spacer').length`. Expected 0. Screenshot after scrolling to `#menu`: cards fully visible.

`emulate` with `prefers-reduced-motion: reduce` at 1280 x 800, reload. Same query for `.pin-spacer` count: expected 0. Screenshot at `#door`: door open, OPEN sign visible, text readable.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "Add GSAP scroll motion with desktop, mobile, and reduced-motion paths

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 9: Deploy workflow and README

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

- [ ] **Step 1: Write .github/workflows/deploy.yml**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: withastro/action@v6

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 2: Rewrite README.md**

```md
# Owen Nyo, personal portfolio

A static site that walks the visitor through a small cafe: the door, the counter, the menu wall, and a table with a receipt. Built with Astro and GSAP.

Live: https://owennyo.github.io/Personal_Portfolio/

## Develop

    npm install
    npm run dev

## Content

- Projects: one markdown file each in `src/content/projects/`. Frontmatter holds title, stack, GitHub URL, optional live URL, screenshot, and order.
- Bio and skills: `src/components/scenes/Counter.astro`.
- Links on the receipt: `src/components/scenes/Table.astro`. The resume line appears when `public/resume.pdf` exists.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The repository's Pages source must be set to "GitHub Actions".

## Design

Spec: `docs/superpowers/specs/2026-09-13-cafe-portfolio-design.md`
```

- [ ] **Step 3: Validate the workflow file**

Run: `npx --yes action-validator .github/workflows/deploy.yml` if available; otherwise `node -e "require('node:fs'); console.log('yaml ok')"` is not a check. Use: `python3 -c "import yaml,sys; yaml.safe_load(open('.github/workflows/deploy.yml')); print('yaml ok')"`.
Expected: `yaml ok`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Add GitHub Pages deploy workflow and rewrite README

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

---

### Task 10: Verification pass

**Files:**
- Create: `docs/superpowers/verification/2026-09-13-cafe-portfolio/` with screenshots and a `report.md`

- [ ] **Step 1: Clean build**

Run: `rm -rf dist && npm run build 2>&1 | tee /tmp/build.log; grep -i -c warn /tmp/build.log`
Expected: build succeeds and the warning count is 0. If not 0, fix the warnings before continuing and record what they were in the report.

- [ ] **Step 2: Lighthouse**

Start `npm run preview`. In Chrome DevTools MCP, navigate to `http://localhost:4321/Personal_Portfolio/` and run `lighthouse_audit` twice, once with mobile emulation and once desktop. Record performance and accessibility scores.
Expected: both scores 90 or above on both runs. If a score is below 90, list the top three audit failures in the report and fix the ones that are code changes in this repo (missing alt text, contrast, unsized images, unused JavaScript). Re-run until the target is met or the remaining failures are outside this repo.

- [ ] **Step 3: Screenshots**

At 1280 x 800 with motion enabled, screenshot each scene at its pinned midpoint and its end. At 390 x 844, screenshot each scene. With reduced motion emulated at 1280 x 800, screenshot each scene. Save them under `docs/superpowers/verification/2026-09-13-cafe-portfolio/` named `desktop-door-mid.png`, `desktop-door-end.png`, and so on.

- [ ] **Step 4: Links and keyboard**

`evaluate_script`:

```js
() => [...document.querySelectorAll('a')].map((a) => ({ text: a.textContent.trim(), href: a.getAttribute('href') }))
```

Expected: no `href` is empty or `#`. Every external link starts with `https://` or `mailto:`. Hash links are `#counter`, `#menu`, `#table`, exactly.

Keyboard: reload, press Tab repeatedly with `press_key` and `take_snapshot` after each. Expected order: Counter, Menu, Your table, Step inside, then each card's Details button, then receipt links. Press Enter on a Details button: the card flips and focus is on Back.

- [ ] **Step 5: Write the report and commit**

`report.md` lists: build warning count, Lighthouse scores (a two-row table), the link audit result, the keyboard order observed, and any deviation from the spec with the reason.

```bash
git add -A
git commit -m "Add verification report and screenshots

Claude-Session: https://claude.ai/code/session_01Khh5cEYm3QmCcjfMfNbRTs"
```

- [ ] **Step 6: Hand back**

Do not merge. Report to Owen: branch `cafe-redesign` is ready, GitHub Pages source must be switched to "GitHub Actions" before merging, and `public/resume.pdf` is still missing.
