# Owen Nyo, personal portfolio

A one-page site with a coffee shop identity: hero with a polaroid, about tabs with a loyalty stamp card, work shifts, projects as menu tags, and a contact counter. React with Vite, plain CSS.

Live: https://owennyo.github.io/Personal_Portfolio/

## Develop

    npm install
    npm run dev

`npm run build` writes the static site to `dist/`.

## Content

- Hero text, taglines, photos, links: `src/data/profile.js`
- About tab blurbs, certs line, Spotify playlist link, bake photos: `src/data/about.js`
- Skill stamps: `src/data/skills.js`
- Work history: `src/data/work.js`
- Projects: `src/data/projects.js`, screenshots in `src/assets/projects/`
- Resume: `public/resume.pdf`
- Share image: `public/og.png`, 1200 by 630, a screenshot of the hero

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The repository's Pages source must be set to GitHub Actions.

## Design

Spec: `docs/superpowers/specs/2026-10-21-dark-roast-design.md`
