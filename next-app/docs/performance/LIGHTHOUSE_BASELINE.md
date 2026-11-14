# Lighthouse Baseline (before optimisation)

Date: 2026-11-14 · Lighthouse 13.6.0 · Headless Chrome (`--headless=new`) · Next.js 16.4.6 production build (`next build` + `next start -p 3100`)

- **Mobile** = Lighthouse default (Moto G-class emulation, simulated slow 4G, 4× CPU slowdown).
- **Desktop** = `--preset=desktop` (1350×940, simulated fast connection, no CPU slowdown).
- One run per page per form factor. Raw JSON is kept outside the repo (session scratchpad). Every "after" run will use the same runner script and settings.

## 1. The original report came from the dev server

The report you supplied (Performance 75, 505 KiB minification savings, two BFCache failures) matches `next dev` on port 3000, not a production build:

| Evidence | `next dev` (:3000) | `next start` (:3100) |
|---|---|---|
| Document `Cache-Control` | `no-store` | `s-maxage=31536000` (prerendered) |
| Unused JS (home, desktop) | 503 KiB | 114 KiB |
| Unminified JS audit | fails | passes |
| BFCache failure reasons | `cache-control:no-store`, `WebSocket used` (HMR) | none on mobile; desktop: `CacheLimitPrunedOnCriticalMemoryPressure` |

So the "minification" and BFCache findings are dev-mode artefacts. The image, main-thread and TBT problems are real in production, and they are worse there than the dev report suggests.

## 2. Production scores

| Page | FF | Perf | A11y | BP | SEO | FCP s | LCP s | TBT ms | CLS | SI s | Payload KiB | Image savings KiB | Main thread ms |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Home `/` | mobile | **35** | 96 | 96 | 100 | 1.14 | 22.54 | 6385 | 0.000 | 40.47 | 29165 | 21033 | 76104 |
| Home `/` | desktop | **42** | 96 | 96 | 100 | 0.29 | 4.12 | 853 | 0.016 | 3.82 | 29316 | 17297 | 4523 |
| Services `/services/` | mobile | **38** | 95 | 96 | 100 | 0.93 | 39.78 | 9838 | 0.000 | 7.16 | 22186 | 21475 | 14007 |
| Services | desktop | 97 | 95 | 96 | 100 | 0.26 | 1.27 | 0 | 0.019 | 1.01 | 22233 | 21390 | 1325 |
| Portfolio `/portfolio/` | mobile | **43** | 95 | 100 | 100 | 0.92 | 6.24 | 6198 | 0.000 | 5.69 | 6791 | 6186 | 10135 |
| Portfolio | desktop | 93 | 95 | 100 | 100 | 0.25 | 1.72 | 21 | 0.018 | 0.97 | 6835 | 6250 | 1089 |
| Contact `/contact/` | mobile | 73 | 95 | 100 | 100 | 1.98 | 7.29 | 147 | 0.000 | 2.96 | 1149 | 267 | 3325 |
| Contact | desktop | 90 | 95 | 100 | 100 | 0.85 | 1.94 | 0 | 0.018 | 0.97 | 1203 | 286 | 1050 |
| About `/about/` | mobile | 82 | 95 | 100 | 100 | 0.92 | 4.75 | 80 | 0.000 | 2.09 | 3472 | 2469 | 3470 |
| About | desktop | 98 | 95 | 96 | 100 | 0.26 | 1.14 | 0 | 0.017 | 0.75 | 3552 | 2763 | 1154 |
| Location `/interior-designer-gachibowli/` | mobile | **52** | 95 | 96 | 100 | 1.15 | 4.04 | 4319 | 0.000 | 6.22 | 614 | 98 | 7543 |
| Location | desktop | 97 | 95 | 96 | 100 | 0.28 | 0.91 | 98 | 0.018 | 1.27 | 652 | 98 | 1475 |
| Project `/portfolio/forest-edge-…/` | mobile | 77 | 95 | 100 | 100 | 1.39 | 6.31 | 28 | 0.000 | 1.99 | 1469 | 933 | 2951 |
| Project | desktop | 97 | 95 | 100 | 100 | 0.25 | 1.32 | 0 | 0.018 | 0.65 | 1613 | 1092 | 883 |

## 3. Homepage findings (production)

### Largest transfers (desktop run)

| Transfer | Resource | Intrinsic size | Where it is used |
|---|---|---|---|
| 14,381 KiB | `/projectsImg/varaprasad/vp-img15.png` | 7680×4319 PNG, no alpha | ServicesSection card |
| 3,418 KiB | `/projectsImg/varaprasad/vp-img1.png` | 4029×2266 PNG, no alpha | ProjectShowcase card, Services |
| 3,072 KiB | `/bright-hero-video.mp4` | 4.9 MB file, `preload="auto"` | Hero video (LCP area) |
| 2,207 KiB | `/Panorama.jpeg` | 8192×4096 | Three.js panorama texture |
| 872 KiB | `/projectsImg/banali/bf-img3.png` | PNG | Services |
| 795 KiB | `/projectsImg/etna/sr-img1.webp` | 6144×3456 | ProjectShowcase |
| 680 / 603 / 422 KiB | `rp-img11/rp-img1/rp-img12.webp` | ~4000×2266 | About section, ProjectShowcase |
| 344 / 257 KiB | `office-spaces.webp`, `home-interiors.webp` | 3168×1344 | Services |
| 144 KiB | `/bright-logo.webp` | 1536×1024 | Footer logo (displayed ~100 px tall) |
| ~936 KiB total | `/logos/*` (18 files) | PNG/JPG/SVG | TrustedBy marquee; every logo is preloaded via the `Link` header |

Every image is a plain `<img>`; `next/image` is not used anywhere. Display slots are at most ~900 CSS px wide, so most files are 4–8× wider than they need to be.

### Long tasks / JavaScript (homepage)

| Chunk | Contents | Desktop scripting | Mobile scripting |
|---|---|---|---|
| `0hp3hft7rrrk6.js` (223 KiB) | react-dom | 1,805 ms (854 ms long task) | 68,022 ms (one 10,000 ms long task) |
| `0ng99zdmnlwea.js` (519 KiB raw / 130 KiB gz) | **three.js** (PanoramaSection) | 1,914 ms | 3,829 ms |
| `33ykpkv3cjkls.js` (117 KiB) | framer-motion | 952 ms long task | 1,809 ms long task |

- Main-thread breakdown, home mobile: script evaluation is 72.8 s of the 76.1 s total.
- Other pages have large **unattributable** long tasks: services 9.4 s, portfolio 6.1 s, location 3.9 s (mobile). Unattributable tasks are typically image decode, style or layout. The cause will be confirmed with a DevTools performance trace in Phase 4/5.
- Shared on **every** route: GSAP + ScrollTrigger (68 KiB, used by the page transition), framer-motion (117 KiB) and EmailJS (Navbar → ProjectModal).

### Other homepage issues
- **Lenis is created twice** (HeroSection and ProjectShowcase), each with its own `gsap.ticker` callback.
- The **Three.js render loop never stops**: it runs `requestAnimationFrame` continuously, even when the panorama is offscreen.
- The `React.lazy` sections still render during SSR and hydrate immediately, so three.js is downloaded and executed on first load anyway.

## 4. Console errors / Best Practices

| Error | Route(s) | Cause |
|---|---|---|
| 404 `/video-fallback-poster.jpg` | home | File does not exist in next-app or the Vite repo |
| 404 `img.youtube.com/vi/ztyqShdYSEY/maxresdefault.jpg` | home | That one video has no maxres thumbnail (hq/sd exist). TestimonialSection has no fallback; TestimonialPage does. |
| 404 `/images/gachibowli-interior-hero.jpg` | location | Known outstanding asset (see `docs/audit/OUTSTANDING_DECISIONS.md`) |
| SVG `<path d>` parse error | services | Malformed phone icon path in `src/views/ServicesPage.tsx:117` (`8.284 6.716 15 15h…` is missing an arc segment) |

## 5. Cache findings
- The "351 KiB cache savings" consists entirely of **YouTube thumbnails** (`img.youtube.com`, 2-hour TTL set by YouTube). It is not caused by our server.
- Own assets: `/_next/static/*` is already `public, max-age=31536000, immutable`. `public/` files are `public, max-age=0` with an ETag, so they revalidate on every visit (304 responses). These filenames are not versioned, so they must not be made immutable as-is.

## 6. Unsized images
`/bright-logo.webp` (Footer) and `/bright-logo1.png` (Navbar, page-transition overlay) have no `width`/`height`. CLS is currently 0–0.02, but these images are flagged.
