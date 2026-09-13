# Verification report, cafe portfolio

Date: 2026-09-13. Branch `cafe-redesign`, re-run after the decorations commit. Built with Astro 7.3.2 and GSAP 3.15.0 on Node 26.4. Served with `astro preview` at `http://localhost:4321/Personal_Portfolio/`.

## Build

`npm run build`: 0 warnings. `astro check`: 0 errors, 0 warnings, 2 hints. Client JavaScript bundle: 115 KB (GSAP core and ScrollTrigger, minified).

## Lighthouse (CLI, headless Chrome, performance and accessibility categories)

| Device | Performance | Accessibility | LCP | TBT | CLS |
|---|---|---|---|---|---|
| Desktop | 100 | 100 | 450 ms | 0 ms | 0 |
| Mobile | 99 | 100 | 2031 ms | 0 ms | 0 |

Before the fixes below, mobile accessibility was 95 because the "Now open" eyebrow (terracotta on cream) failed contrast. It and the receipt links now use the wood tone.

Remaining sub-90 audits are informational insights (render-blocking stylesheet, unused JavaScript in the GSAP bundle) and do not move the category scores.

## Motion, desktop 1280 x 800

Sampled with instant scrolling. Four pin spacers present. Body background moves monotonically from `rgb(246, 231, 211)` at the top to `rgb(28, 19, 16)` at the bottom. Door panel scaleX goes from 1 to 0.18 across the first pin. Cards go from opacity 0 to 1 in the menu scene. Receipt goes from scaleY 0 to 1 in the table scene. Scrolling back to the top returns the door panel to scaleX 1 and the background to cream.

## Mobile, 390 x 844

Zero pin spacers. Document width equals viewport width (no horizontal scroll). Menu title and cards go from opacity 0 to 1 once the scene is scrolled into view.

## Reduced motion

Tested by stubbing `window.matchMedia` before scripts run so `(prefers-reduced-motion: reduce)` matches. Zero pin spacers. Door renders open with the OPEN sign at opacity 1. Headline at opacity 1 with no transform. Receipt visible at scaleY 1. Scene backgrounds come from CSS.

## Links

Eleven anchors. Hash links are exactly `#counter`, `#menu`, `#table` (nav) plus `#counter` (Step inside). External links all start with `https://` or `mailto:`. No empty or `#` hrefs. No live-site links because no project has a live deployment; the Resume line is absent because `public/resume.pdf` does not exist yet. Adding the file and rebuilding adds the line (checked with a placeholder file, then removed).

## Keyboard

Tab order from load: Counter, Menu, Your table, Step inside, Details x4, github.com/OwenNyo, linkedin.com/in/owen-nyo, owennyowy@gmail.com. Focusing into a pinned scene scrolls to that scene's finished state so the focused element is visible. Enter on a Details button flips the card, marks the front face inert, and moves focus to Back.

## Deviations from the spec

- Spec said fonts would be woff2 files in `public/fonts`. They are fetched at build time through Astro's fonts API and served from the build output. Same result (no runtime request to Google), less to maintain.
- Spec said ScrollTrigger is not initialised under reduced motion. It is initialised for opacity-only, run-once fades. Nothing moves.
- Spec said hero copy fades in. It is visible at load so the first frame has text and the Step inside link is focusable. The illustration still animates.
- Reveals use opacity rather than visibility so hidden content stays in the accessibility tree and focusable.
- Astro 7.3.2 instead of the planned 6.x, because 6.x was no longer the current release when installing.

## Decorations pass

After the plan's ten tasks Owen asked for more decoration. Added in one commit: paper grain overlay, coffee-ring marks, clouds, awning bulbs, plant and sidewalk sign (door); tiled backsplash, espresso machine, props and pendant lamp (counter); plank wall, string lights, pins and card tilt (menu wall); night window, candle, cookie and Wi-Fi note (table); nav sway on hover. Ambient loops stop under reduced motion. Lighthouse re-run after this pass gave the same scores as the table above.

Also fixed in that commit: at load the closed door panel sat 195px left of its frame, over the window. GSAP parsed the CSS "open" transform (scaleX 0.18 about the left edge) into a translation and kept it while animating back to scaleX 1. The tween now sets `x: 0` and `transformOrigin: 'left center'` explicitly. Verified: panel transform at scroll 0 is `matrix(1, 0, 0, 1, 0, 0)`.

## Skills as roast bags, shorter pins

Owen found the jar shelf plain. Skills are now nine coffee bags on three planks, each with its own shape (sack, tin-tie, burlap) and colour (kraft, paper, espresso, terracotta stripe), a bean window, a hanging label with bag type, skill name, a four-bean roast meter, and two to four words of notes. Loose beans and a brass scale sit on the planks. Next.js and Drupal were added and Flask removed at Owen's request. Each scene now pins for 60% of a viewport instead of 100%, so a full run through the page is about a third shorter. Bags drop onto the shelves and beans scatter on scroll; the bag drop uses opacity so the labels stay focusable and readable. Checked at 1280 wide (three columns, stripes render through an SVG pattern) and 390 wide (two columns, no horizontal overflow).

## Five scenes

Owen asked for the about text and the skills to be separate stops. The counter scene now holds only the barista, the espresso machine, cups, a tip jar, and the chalkboard bio on a wooden bar. A new roasts scene holds the bags, with its own palette step (`--latte`, between sand and dusk) and a "Roasts" nav link. Scene order: door, counter, roasts, menu, table. Five pin spacers on desktop; body background steps through all five colours.

## Screenshots

`desktop-door-start.png`, `desktop-door-mid.png`, `desktop-door-end.png`, `desktop-counter-end.jpg`, `desktop-roasts-end.jpg`, `mobile-counter.jpg`, `desktop-menu-mid.png`, `desktop-menu-end.png`, `desktop-table-end.png`, `mobile-full.jpg`, `reduced-motion-door.png`. The door-mid and menu-mid shots predate the decorations pass; the rest are current.
