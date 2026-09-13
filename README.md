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
