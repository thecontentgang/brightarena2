# Phase 1 – Image Optimisation and Responsive Delivery

Status: **complete** (2026-11-14). Baseline: [LIGHTHOUSE_BASELINE.md](LIGHTHOUSE_BASELINE.md).

## Problem
The production homepage transferred about 29 MB, and Services about 22 MB. Lighthouse estimated 17–21 MB of image savings per page. On mobile, decoding those images showed up as huge "unattributable" main-thread tasks (services 9.4 s, portfolio 6.1 s, location 3.9 s).

## Root cause
- Every image was a plain `<img src>` pointing at the full original: 4,000–8,192 px wide, several PNGs of 2–14 MB (e.g. `vp-img15.png`, 7680×4319, 14.4 MB), displayed at ≤ 900 CSS px.
- `next/image` was not used, and there was no `srcset`/`sizes`, so every device downloaded the desktop-plus original.
- Below-the-fold images were not lazy-loaded. React 19 then emitted a `<link rel=preload>` for each early eager `<img>`, including all 15 marquee logos and the About-section photos.
- The Services homepage track holds four 100%-wide cards that a pinned GSAP ScrollTrigger slides in horizontally. All four originals, including the 14 MB PNG on card 4, downloaded at page load. *(Corrected in Phase 3: an earlier version of this document said the track's animation was empty and cards 2–4 were never shown. That was wrong; the ScrollTrigger works.)*
- The 360° panorama loaded an 8192×4096 JPEG (2.2 MB) as a WebGL texture on every device.
- Placeholder `width`/`height` values (1600×900, 800×560, 1200×800) on the Luxury and Top pages did not match the real files.

## Change made
1. **`scripts/build-responsive-images.mjs`** (new) – sharp-based, runs before `next build`.
   - Scans every PNG/JPEG/WebP in `public/` (except `public/_img` and `public/font`). Originals are never modified.
   - Writes WebP variants at 256 / 480 / 828 / 1200 / 1920 / 2560 px, capped at the source width (never upscaled) and always including the source width when it is smaller than 2560.
   - Encoder: WebP q82, effort 5, smart subsampling. The existing pipeline used q80, so the new files are not lower quality than what was there. Fully opaque "alpha" channels are dropped, and EXIF rotation is respected.
   - Content-hashed names: `/_img/<dir>/<name>.<sha1(source + settings)>.w<width>.webp`. A changed image or setting always produces a new URL; unchanged images are never re-encoded.
   - Manifest: `src/data/responsive-images.json` (103 entries, 8.7 KB, 2.0 KB gzipped) stores `[width, height, hash, widths]` per source.
   - Incremental: 55 s for a full generation (548 files, 4 workers, local) and 0.3 s when nothing changed. Stale variants are pruned. `--check` mode is part of `pnpm images:check`.
   - Panorama override: 2048 / 4096 / 8192 px at q85.
2. **`src/lib/responsiveImage.ts`** (new) – `responsiveImage(src, sizes)` returns `{ src, srcSet, sizes, width, height }`.
   - It is spread onto the existing `<img>` / `motion.img`, with no wrapper element, so DOM structure, classes, crops, `object-position` and Framer Motion props are unchanged.
   - Unknown or external sources (Unsplash, YouTube, missing `/images/*` location heroes, SVG logos) fall back to the original `src` untouched.
   - `imageVariants()` is used by the panorama.
3. **Loading policy**
   - Above the fold, the LCP candidate stays eager:
     - About hero: keeps `fetchPriority="high"`.
     - Project and service-detail heroes: `fetchPriority="high"`.
     - Blog hero: `fetchPriority="high"`.
     - Portfolio and Designs first cards: keep their existing `isPriority` logic.
     - First Services-page card: eager + high. It was `loading="lazy"` even though it is the mobile LCP element.
   - Below the fold: `loading="lazy"` + `decoding="async"`.
   - **Clipped / transformed content:** native lazy-loading can fail to trigger for content clipped by overflow or moved by transforms, which would show as late pop-in. Those images stay eager at `fetchPriority="low"`:
     - ProjectShowcase cards (pinned section, cards transformed off-screen).
     - Marquee logos (row 2 starts half off-screen).
   - Homepage Services cards are lazy. Cards 2–4 slide in horizontally through a transformed, clipped track. Phase 3 tested whether that delays them on a 9 Mbps connection, desktop and mobile, 2 runs each: cards 2–4 were already loaded the first time any part of them became visible in every run. Card 1 enters vertically like any other below-the-fold image.
4. **`sizes`** – derived from each slot's actual CSS (container max-widths, grid columns, padding). Heroes animated at `scale: 1.1` use `min(110vw, 1760px)` so they are never upscaled.
5. **Intrinsic `width`/`height`** come from the manifest (real dimensions). The invented values on LuxuryPage and TopInteriorDesignerPage were removed.
6. **Panorama** – picks the largest variant the GPU supports: 8192 px on desktop (≥ 1024 px viewport and `maxTextureSize ≥ 8192`), otherwise 4096, otherwise 2048. Desktop keeps full resolution.
7. **AVIF evaluated, not adopted.** Over 10 representative samples, AVIF (q60) saved 21% more than WebP (e.g. 30 KB → 25 KB at 828 px) but took 3.2× longer to encode (7.0 s vs 2.2 s). Serving it would need a `<picture>` wrapper, which is a DOM change, and AVIF decodes more slowly on low-end phones. The absolute savings are small now that payloads are already about 95% smaller.

## Files modified
- New: `scripts/build-responsive-images.mjs`, `src/lib/responsiveImage.ts`, `src/data/responsive-images.json` (generated), `public/_img/**` (generated, 548 files, 44 MB on disk; each page downloads only one variant per image).
- Changed:
  - `package.json`: `build` runs the generator first; `images:check` also checks variants; new `images:responsive` script.
  - `scripts/optimize-images.mjs`: skips `public/_img`.
  - `next.config.ts`: optional `NEXT_DIST_DIR`; default `.next` unchanged.
  - `.gitignore`, `eslint.config.mjs`: ignore `.next-perf/`.
  - Sections: `AboutSection`, `ProjectShowcase`, `ServicesSection`, `TrustBy`, `PanoromaSection`.
  - Components: `Navbar`, `Footer`, `PageTransitionLayout`, `blog/BlogHeroImage`, `blog/BlogContentBlock`.
  - Views: `AboutPage`, `BlogPage`, `DesignsPage`, `DesignDetails`, `ProjectsPage`, `ProjectDetails`, `ServicesPage`, `ServiceDetails`, `LuxuryPage`, `TopInteriorDesignerPage`, `WhitefieldsInteriorDesignerPage`.
- Not changed, as instructed: founder photo URLs (AboutPage), the missing Gachibowli/Hitec City/Kondapur/Madhapur heroes, the original images in `public/`, and the Vite app.

## Measured result
Lighthouse 13.6.0, same runner and settings as the baseline, production build (`next start`).

**Single-run variance:** About mobile scored 84 in run A and 74 in run B on identical About-page code. Both runs are shown as "A / B". Run B is the final Phase 1 code (run A lacked only the eager first Services card and the 110vw hero `sizes`).

| Page | FF | Perf before → after | LCP s before → after | TBT ms before → after | Payload KiB before → after |
|---|---|---|---|---|---|
| Home | mobile | 35 → **51 / 51** | 22.54 → 6.95 / 6.88 | 6385 → 930 / 999 | 29,165 → 6,268 / **4,668** |
| Home | desktop | 42 → **66 / 91** | 4.12 → 1.41 / 0.76 | 853 → 659 / 199 | 29,316 → 7,574 / **5,253** |
| Services | mobile | 38 → **82 / 82** | 39.78 → 4.89 / 4.96 | 9838 → 48 / 59 | 22,186 → **712** |
| Services | desktop | 97 → 99 / 99 | 1.27 → 0.97 / 0.99 | 0 → 0 | 22,233 → **756** |
| Portfolio | mobile | 43 → **82 / 82** | 6.24 → 5.05 / 5.05 | 6198 → 23 / 28 | 6,791 → **777** |
| Portfolio | desktop | 93 → 98 / 98 | 1.72 → 1.09 / 1.17 | 21 → 0 | 6,835 → **857** |
| Contact | mobile | 73 → 80 / 92 | 7.29 → 5.31 / 3.35 | 147 → 59 / 26 | 1,149 → 1,082 |
| About | mobile | 82 → 84 / 74 | 4.75 → 4.59 / 4.60 | 80 → 45 / 378 | 3,472 → **606** |
| About | desktop | 98 → 98 / 98 | 1.14 → 1.11 / 1.15 | 0 → 0 | 3,552 → **746** |
| Location | mobile | 52 → **84 / 85** | 4.04 → 4.36 / 4.29 | 4319 → 93 / 122 | 614 → 527 |
| Project | mobile | 77 → 80 / 80 | 6.31 → 5.35 / 5.35 | 28 → 53 / 58 | 1,469 → **864** |
| Project | desktop | 97 → 98 / 98 | 1.32 → 1.15 / 1.15 | 0 → 0 | 1,613 → **854** |

The "unattributable" long tasks are gone (services mobile: one 9,352 ms task → none over 250 ms). This confirms they were decoding oversized images.

**Image bytes actually transferred in a real browser** (Performance API after loading and scrolling each page; original Vite site vs Next.js after Phase 1, headless Chromium, DPR 1):

| Page | Vite original | Next.js Phase 1 |
|---|---|---|
| Home (desktop / mobile) | 25,780 / 25,789 KB | 2,985 / 1,284 KB |
| Services | 21,935 KB | 167 / 42 KB |
| Portfolio | 6,567 KB | 148 / 3 KB* |
| About | 3,252 KB | 127 / 1 KB* |
| Service detail | 7,798 KB | 243 / 19 KB* |

\* Mobile figures for lazy pages include only what was scrolled into view. Real phones (DPR 2–3) choose the 828–1200 px variants, which is still about 95% below the originals.

## What remains on the homepage (next phases)
- `bright-hero-video.mp4`: 3–4 MB downloaded at load (`preload="auto"`) → Phase 5.
- Panorama texture (1.4 MB desktop / 482 KB mobile) and three.js load at first paint → Phase 2.
- `/bright-logo.webp` (144 KB, 1536×1024) is still requested as the **favicon** (`layout.tsx` metadata). Swapping it for a small icon is a Phase 8 candidate, since it touches head metadata.
- YouTube `maxresdefault` thumbnails (~470 KB, third-party) → Phase 6.
- The mobile homepage TBT (~1 s) is now pure JavaScript (react-dom, framer-motion, three.js) → Phases 2–4 and 7.
- Inner-page mobile LCP (4.3–5.4 s) is now almost entirely "element render delay": the hero headline waits for Framer Motion to fade it in after hydration. This is animation and JS work for Phases 2–7, not images.

## Regression tests
- Visual: screenshot comparison against the original Vite build (`../dist`) at the same scroll positions. Desktop 1440×900 and mobile 390×844 for Home (9 positions), Services, Portfolio, About, Project, Luxury, Top, Service detail and Blog. Crops, positions, aspect ratios and layout match. Document height is identical (18,180 px on home desktop). Differences found were video frame timing and pre-existing content differences (see below).
- Every generated variant referenced by the pages returns HTTP 200. No new console errors or failed requests; only the pre-existing ones remain (poster 404, one YouTube 404, the Services SVG path error, founder Unsplash URLs, missing Gachibowli hero).
- `pnpm typecheck`, `pnpm lint` (0 errors; the 37 `no-img-element` warnings existed before), `pnpm test:contact` (pass), `pnpm images:check` (pass).
- `validate-seo` against the production build: 38 pages, sitemaps, internal links and 71 redirects checked. All SEO metadata, canonicals and structured data pass. 4 redirect failures exist that **pre-date this phase** (see below).

## Remaining issues / notes
- **Portfolio content difference (not caused by this phase):** `src/views/ProjectsData.ts` currently lists 6 projects. The Vite site lists 11. The file was last saved 2026-11-14 14:52, before this phase's first build, which already generated 6 portfolio pages. As a result, 4 legacy redirects (`/our_portfolio/mr-nageswara-rao/`, `/sammys-villa/`, `/rakesh-bhupathi/`, `/praveen-aparna-zenith-nallagandla/`) point to portfolio pages that return 404. Needs the owner's decision.
- **`pnpm build` into `.next` fails while `next dev` is running** (Turbopack panic: a PostCSS worker process exits immediately). The identical code builds cleanly into a separate folder (`NEXT_DIST_DIR=.next-perf`), so this is a conflict over the shared `.next` folder, not a code error. Measurements in this phase used `.next-perf`. Stop `next dev` before running `pnpm verify` / `pnpm build`.
- `next build` with `NEXT_DIST_DIR=.next-perf` adds `.next-perf/types/**/*.ts` entries to `tsconfig.json`'s `include`. They are harmless and will be removed at the end of the work.
- Deployment: Vercel installs devDependencies (sharp) and runs `pnpm build`, which generates any missing variants. If `public/_img` and `src/data/responsive-images.json` are committed, the Vercel step takes under 1 s. If they are not committed, Vercel generates all 548 files during the build (about 1–2 min on Vercel's build machines, estimated from the 55 s local time with 4 workers).
