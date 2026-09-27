# Owen Nyo, personal portfolio

A one-page static site styled as a coffee bag label: an introduction with resume, GitHub, and LinkedIn links; skills as tasting notes; projects on the shelf. React with Vite, plain CSS, no animation.

Live: https://owennyo.github.io/Personal_Portfolio/

## Develop

    npm install
    npm run dev

`npm run build` writes the static site to `dist/`.

## Content

- Intro text and links: `src/data/profile.js`
- Skills, usage words, and bar levels: `src/data/skills.js`
- Projects: `src/data/projects.js`, screenshots in `src/assets/projects/`
- Resume: put the PDF at `public/resume.pdf`
- Share image: `public/og.png`, 1200 by 630

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes it to GitHub Pages. The repository's Pages source must be set to GitHub Actions.

## Design

Spec: `docs/superpowers/specs/2026-09-27-espresso-label-design.md`
