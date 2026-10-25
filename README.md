# Owen Nyo, personal portfolio

A one-page site with a coffee shop identity: hero with a polaroid, about tabs with a loyalty stamp card, work shifts, projects as menu tags, and a contact counter. React with Vite, plain CSS.

Live: https://owennyo.com

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

The site is a Cloudflare Worker that serves the built `dist/` folder, configured in `wrangler.jsonc`, with owennyo.com and www.owennyo.com as custom domains.

    npm run build
    npx wrangler deploy

The old GitHub Pages address, owennyo.github.io/Personal_Portfolio, now only redirects to owennyo.com. `.github/workflows/deploy.yml` publishes the redirect page from `github-pages-redirect/`.

## Design

Spec: `docs/superpowers/specs/2026-10-21-dark-roast-design.md`
