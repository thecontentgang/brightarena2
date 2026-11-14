# Visual Regression Report

## Method

- **Builds compared:** Vite `dist/` (`vite preview`, port 4173) and the Next.js production build (`next start`, port 3210), both on the same machine in the same headless Chromium.
- **Viewports:** 1920×1080, 1440×900, 768×1024, 390×844 and 360×800.
- **Pages (17):** `/`, `/about/`, `/services/`, `/services/home-interior-designs-hyderabad/`, `/portfolio/`, `/portfolio/forest-edge-…/`, `/designs/`, `/designs/living-room-…/`, `/testimonials/`, `/blogs/`, `/blogs/how-to-choose-…/`, `/contact/`, `/privacy-policy/`, `/interior-designer-gachibowli/`, `/luxury-interior-designers-in-hyderabad/`, `/top-interior-designer-in-hyderabad/`, and the 404 page.
- **Per page and viewport:**
  - a top-of-page screenshot after fonts load and 3 s of settling;
  - then a full-page screenshot after scrolling the whole page (so scroll-triggered animations have run) and waiting for every image.
  - `<video>` and `<canvas>` are hidden identically on both builds, because frame timing would otherwise dominate the diff.
- **Diff:** a pixel counts as different when its summed RGB difference exceeds 30. Page height and horizontal overflow (`scrollWidth − innerWidth`) were recorded each time.
- **Total:** 170 screenshot pairs (340 images).

## Results

| Viewport | Pairs | Pixel-identical | ≤ 0.5 % different |
|---|---|---|---|
| 1920 | 34 | 29 | 31 |
| 1440 | 34 | 30 | 32 |
| 768 | 34 | 33 | 34 |
| 390 | 34 | 32 | 33 |
| 360 | 34 | 29 | 29 |
| **All** | **170** | **153** | **159** |

- **Horizontal overflow:** 0 px on every page at every viewport, on both builds.
- **Page heights:** equal on 82 of 85 page/viewport combinations. The 3 exceptions are listed below.
- **Typography:** the same font files. The self-hosted next/font Inter matched the Google-hosted Inter pixel-for-pixel in the identical pairs.

### The 11 flagged pairs and what they turned out to be

Each flagged pair was re-captured on an otherwise idle machine, alternating Vite and Next, with a slower scroll and a 6 s settle. The first pass ran Next and Vite at the same time, and the CPU contention slowed some animations.

| Pair | First pass | Re-capture | Classification |
|---|---|---|---|
| 360 `/services/home-…` top | 48.7 % | 0 % | Timing: the Vite shot caught the hero fade-in mid-animation |
| 360 `/about/` full | 34.2 %, +24 px | 0 %, equal height | Timing: the stats block had not finished its `whileInView` reveal |
| 360 `/` full | 10.6 %, −24 px | 0.41 %, equal height | Timing |
| 360 `/designs/` top | 0.85 % | 0 % | Timing |
| 360 / 390 `/portfolio/` full | 4.3 % / 8.2 % | 0 % | Timing |
| 1920 `/` full, `/portfolio/` full, `/services/home-…` full | 0.5–6.7 % | 0.52 % / 0 % / 0 % | Timing (marquee and animated cards) |
| 1440 `/` full | 3.4 %, −8 px | 0.38 %, equal height | Timing |
| 1440 `/portfolio/` full | 4.1 % | 39 % (−8 px) | **Both builds behave identically.** Each measures 4669 px before scrolling and 4661 px once an animated footer logo settles (measured 3× per build). The screenshot difference depends on which state was captured |

**Genuine migration regressions found: 0.** No browser rendering differences, and no issues in the original Vite version were detected visually. The defects that are visible on screen (missing hero images, founder photos) exist in both builds; see IMAGE_ASSET_AUDIT.md.

## Post-fix check

After fixes F1–F7 (F2, F3 and F5 touch rendered markup), the 1440 and 390 sets were captured again. F8, which came later, only removes the preload hint for a font that no element uses, so it cannot change rendering. The final build was then re-verified by the full deep audit (45 routes) and `pnpm seo:compare`:

- 68 pairs: **61 pixel-identical, 65 within 0.5 %**.
- The 3 flagged pairs are the same animation-timing cases as above (home 1440 full, portfolio 1440/390 full).
- The breadcrumb, footer and testimonial cards (changed by F3/F5) are pixel-identical to Vite. F2 (reduced motion) and F7 (modal focus) change nothing for visitors who use a mouse and do not ask for reduced motion.

## Animations and transitions (visual behaviour)

| Behaviour | Result |
|---|---|
| Five-tile page transition | PASS. Tiles mid-sweep at 450 ms with staggered `scaleX`, the logo pulses, it uncovers to the new page, and `scrollY` is 0 afterwards |
| Header on scroll | PASS. Same collapse/expand behaviour (the diffs above include scrolled states) |
| Breadcrumb fade on scroll | PASS. It fades out after 50 px in both builds |
| Scroll-reveal sections (Framer Motion `whileInView`) | PASS. After a full scroll nothing is stuck invisible except intentional states (the transition logo, the GSAP-pinned project stack, and hover-only captions), in both builds |
| Mobile menu | PASS. It opens and closes at 390 px, links navigate, and the screenshot matches Vite |

## Screenshots

`docs/audit/screenshots/` holds the Next.js top-of-page screenshot for every audited page at every viewport: 85 files, `<viewport>_<route>.webp`, resized to at most 960 px wide. The full-resolution PNG pairs (Vite and Next, top and full page) and the diff masks were produced in a temporary directory and were not committed, because they total 330 MB.
