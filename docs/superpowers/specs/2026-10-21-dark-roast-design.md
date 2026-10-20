# Dark Roast portfolio

Date: 2026-10-21
Status: approved by mockup, building section by section

## Intent

Rebuild the one-page portfolio in the structure and voice of clarissateo.com, with a coffee shop identity instead of hers. Same React + Vite repo, same GitHub Pages URL. The previous "Espresso Label" site is replaced in full.

Audience is unchanged: peers and recruiters arriving from GitHub or LinkedIn.

## Decisions made (Owen's, from the mockup session)

| Question | Decision |
|---|---|
| Structure | Five full-height sections in order: hero, about, work, projects, contact with footer. Scroll snapping on desktop. Each section ends with a small "next section" hint. |
| Palette | Mocha. Page `#5a3e2d`, text `#f3e7d3`, accent `#e8a96e`. Cream panels and cards `#f3e7d3` with espresso text `#2a1a12`. One background for every section, no separate band for projects. |
| Type | Fraunces (display, regular weight, italic for the rotating line). IBM Plex Sans body. IBM Plex Mono for dates, eyebrows, tags. Google Fonts. |
| Voice | Lowercase, casual. |
| Nav | Fixed. Brand "@owennyowy" in Fraunces italic. Links: about, work, menu, say hi ↗. |
| Hero | Eyebrow "singapore / year 4 software engineering / SIT". "hi! i'm Owen,". Rotating italic line "i'm also …" cycling "a coffee lover", "a baker", "a gamer" with a typewriter effect. "welcome to my portfolio, freshly brewed." Polaroid on the right with tape, caption "me, post-coffee ☕", click cycles photos. Photo not yet supplied: show a coffee cup placeholder. Hint: "pull up a chair, you are in for a ride". |
| About | Title "the guy behind the counter". Four pill tabs: software engineer, off the clock, mentor, baker. Software engineer: Owen's paragraph, a mono line of certs and papers, and a cafe loyalty card: every skill is a tilted stamp, six empty slots for what's next, one slot reads "next skill: free coffee". Off the clock: short blurb, a numbered list of fun facts, and a Spotify playlist embed. Mentor: blurb on teaching and mentoring plus tappable module pills, each revealing a one-line note. Baker: short blurb plus three photo slots (photos to come). |
| Work | Title "shifts i've worked". Three rows from the resume: Red Airship, SIT, Alexis Alliance. Company and role left, ☕ bullets middle, dates right in mono. |
| Projects | Title "today's menu". Same four projects. Cream paper tags with a punched hole, alternating tilt. Each: number and year, screenshot (Unified AI Sandbox uses a drawn SVG of a tutor robot instead), name, "brewed with" stack, one paragraph, github link, live link only if present. |
| Contact | "the counter's open" eyebrow, "say hello ↗" with hello in accent italic, blurb, pills: email me (filled, mailto owennyowy@gmail.com), github, linkedin, resume. Footer line "© 2026 owen · made with love and one too many flat whites" and "back to top ↑". |
| Resume | `public/resume.pdf`, the file Owen supplied, published as is. |
| Share image | Regenerate `public/og.png` from the new hero. |
| Hosting | GitHub Pages via the existing Actions workflow. |

## Content owned by Owen (edit in `src/data/`)

- Hero taglines, about blurbs for "off the clock" and "baker" (drafted by Claude), work bullets (from the resume), project blurbs.
- Spotify playlist URL, hero photos, bake photos: pending, placeholders render until supplied.

## Architecture

```
index.html                  title, description, Open Graph, font link
src/
  main.jsx
  App.jsx                   Nav, Hero, About, Work, Menu, Contact
  components/
    Nav.jsx
    Hero.jsx                typewriter + polaroid
    About.jsx               tabs (useState)
    LoyaltyCard.jsx         stamp grid from skills.js
    Work.jsx
    Menu.jsx
    Contact.jsx             includes footer
  data/
    profile.js              name, handle, eyebrow, taglines, intro, caption, photos, links
    about.js                tab blurbs, certs line, playlist url
    skills.js               stamp labels with a tint key
    work.js
    projects.js             unchanged shape
  styles/
    tokens.css  base.css  sections.css
public/
  favicon.svg  og.png  resume.pdf
```

No routing, no global state, no dependencies beyond React. Reduced motion: typewriter shows the first tagline static.

## Verification

- `npm run build` clean.
- Lighthouse on the built site, desktop and mobile: performance and accessibility 90 or above.
- 390px wide: no horizontal scroll, sections stack, polaroid below the text, tags one column.
- Every link resolves. Resume returns the PDF.
- Keyboard: tabs reachable and switchable, focus visible everywhere.

## Out of scope

Blog, contact form, theme toggle, custom domain, 3D project carousel.
