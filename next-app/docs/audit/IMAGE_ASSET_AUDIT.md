# Image and Asset Audit

Every image, video, poster, CSS background, font and icon was checked three ways:
1. **Static scan.** Every string literal in `src/**` that ends in an asset extension, plus every path produced by actually evaluating the data modules (so `Array.from(...)` gallery paths expand to real filenames). Existence is checked **case-sensitively** against `public/`, because Vercel runs on Linux.
2. **Browser load.** All 44 routes were loaded in Chromium against the production build, each page was scrolled top to bottom so lazy images fired, and the script waited for every `<img>` to complete before reading `naturalWidth`. Network responses were recorded.
3. **Comparison with Vite.** The same measurement was run on the Vite build. A failure is only called a regression if the Vite site loads that asset.

## Summary

| Check | Result |
|---|---|
| `<img>` elements rendered across 44 routes | 447 |
| Distinct asset URLs (static + runtime) | 129 |
| Distinct URLs requested by the browser | 119: **112 loaded**, 7 failed |
| Failures that are **new** in Next.js | **0** (every failure also fails in Vite) |
| Case-sensitivity mismatches (would break on Linux) | **0** |
| Distorted images (`object-fit: fill` with a rendered aspect ratio more than 3% off the natural one) | **0** |
| `object-fit` in use | contain: 195, cover: 252 |
| Images without an `alt` attribute / with empty alt | 0 / 0 |
| `loading="lazy"` images | 142, **none above the fold** (no delayed LCP images) |
| Optimised files vs the Vite production output | 104/104 byte-identical (`pnpm images:check` passes) |
| Fonts | OrangeAvenue ("TT Bakers") and Inter load (200, self-hosted by next/font). TT Bakers Bold is mapped but used by no component (preload removed, F8) |
| Hero video `/bright-hero-video.mp4` | 206 partial content, readyState 4, 1280×720, autoplay + muted (same as Vite) |
| Panorama texture `/Panorama.jpeg` (loaded by Three.js, not an `<img>`) | 200, rendered in a WebGL canvas |
| Favicon `/bright-logo.webp` | 200 |
| Apple touch icon `/apple-touch-icon.png` | **missing** (pre-existing, N5) |

## Failing assets (all pre-existing, identical in the Vite site)

| Asset | Referenced by | Exists | Browser loaded | Status |
|---|---|---|---|---|
| `/images/hitec-city-interior-hero.jpg` | src/views/HitecCityInteriorDesignerPage.tsx | no | no (404) | FAIL (pre-existing): needs a real photo (N2) |
| `/images/gachibowli-interior-hero.jpg` | src/views/GachibowliInteriorDesignerPage.tsx | no | no (404) | FAIL (pre-existing) (N2) |
| `/images/kondapur-interior-hero.jpg` | src/views/KondapurInteriorDesignerPage.tsx | no | no (404) | FAIL (pre-existing) (N2) |
| `/images/madhapur-interior-hero.jpg` | src/views/MadhapurInteriorDesignerPage.tsx | no | no (404) | FAIL (pre-existing) (N2) |
| `https://images.unsplash.com/photo-` (founder A) | src/views/AboutPage.tsx | truncated URL | no (ORB blocked) | FAIL (pre-existing) (N3) |
| `https://images.unsplash.c` (founder B) | src/views/AboutPage.tsx | truncated URL | no (DNS) | FAIL (pre-existing) (N3) |
| `/video-fallback-poster.jpg` (video poster) | src/sections/HeroSection.tsx | no | no (404) | FAIL (pre-existing): cosmetic, the video itself plays (N4) |
| `/apple-touch-icon.png` | src/app/layout.tsx (was index.html) | no | not requested by desktop Chromium | FAIL (pre-existing) (N5) |
| YouTube `maxresdefault.jpg` for video `ztyqShdYSEY` | src/sections/TestimonialSection.tsx, src/views/TestimonialPage.tsx | external | 404, then the code's `onError` falls back to `hqdefault` | PASS (handled by design) |

Missing files referenced only by code that **never runs**: `/placeholder-service.jpg` (fallback used only when a service has no images; every service has images), and `/projectsImg/Villa/villa-img8.jpg`, `/projectsImg/forest-edge/FE-img7.jpg`, `/projectsImg/rajapushpa/RP-img7.jpg` (only in the unused `ProjectsSection.tsx`).

## Unreferenced files in public/

- `/bright-arena-logo.webp`
- `/bright-arena-logo1.png`
- `/bright-logo.jpg`
- `/font/OrangeAvenueDEMO-Regular.otf`
- `/font/TT_Bakers_Trial_Bold.ttf`
- `/font/TT_Bakers_Trial_Regular.ttf`
- `/llms.txt`
- `/logos/candeur-40.jpg`
- `/logos/epil-carnerstone.jpg`
- `/logos/hallmark-skyrena.jpg`

Notes: the fonts are referenced from `src/app/fonts.ts` through relative paths (next/font), not by URL. `/bright-logo.jpg` is the og:image (built from a template string). `/llms.txt` is a crawler file. The rest look unused (N16), so confirm before deleting.

## Full reference table

Generated from the measurements. "NOT REQUESTED" means the asset exists and is referenced, but no audited page requested it during the test (for example, the panorama texture, which Three.js fetches directly; its 200 response was confirmed separately above).

| Asset | Referenced by | Exists | Browser loaded | Status |
|---|---|---|---|---|
| `/Luxurious%20Hyderabad%20Open-Plan%20Living%20Space.webp`  | src/views/LuxuryPage.tsx, src/views/TopInteriorDesignerPage.tsx | yes | yes (5 pages) | PASS |
| `/Panorama.jpeg`  | src/sections/HomePage.tsx, src/sections/PanoromaSection.tsx | yes | not requested | NOT REQUESTED |
| `/apple-touch-icon.png`  | src/app/layout.tsx | **no** | not requested | NOT USED at runtime (missing) |
| `/bright-hero-video.mp4` video | src/sections/HeroSection.tsx | yes | yes (1 page) | PASS |
| `/bright-logo.webp`  | src/app/layout.tsx, src/components/Footer.tsx | yes | yes (45 pages) | PASS |
| `/bright-logo1.png`  | src/components/Navbar.tsx, src/components/PageTransitionLayout.tsx | yes | yes (45 pages) | PASS |
| `/home-interiors.webp`  | src/sections/ServicesSection.tsx, src/views/TopInteriorDesignerPage.tsx | yes | yes (3 pages) | PASS |
| `/images/gachibowli-interior-hero.jpg`  | src/views/GachibowliInteriorDesignerPage.tsx | **no** | **no** | FAIL (pre-existing) |
| `/images/hitec-city-interior-hero.jpg`  | src/views/HitecCityInteriorDesignerPage.tsx | **no** | **no** | FAIL (pre-existing) |
| `/images/kondapur-interior-hero.jpg`  | src/views/KondapurInteriorDesignerPage.tsx | **no** | **no** | FAIL (pre-existing) |
| `/images/madhapur-interior-hero.jpg`  | src/views/MadhapurInteriorDesignerPage.tsx | **no** | **no** | FAIL (pre-existing) |
| `/logos/aparna-zenon.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/asbl-spire.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/auro-regent.svg`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/avani-tulasi-vanam.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/candeur-40.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/dsr-park-ridge.jpg`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/elegance-emperia.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/epil-carnerstone.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/gem-nakshtra.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/hallmark-skyrena.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/indus-peblcity.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/my-home-sayuk.jpg`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/nyla-tema4.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/tripura-lm-3.jpg`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/logos/vaishnavi-oasis.png`  | src/sections/TrustBy.tsx | yes | yes (1 page) | PASS |
| `/modular-kitchen.png`  | src/views/blogs/meta/ModularKitchenCostInHyderabadCompleteGuide2026.meta.ts, src/views/blogsData.ts +1 | yes | yes (2 pages) | PASS |
| `/office-spaces.webp`  | src/sections/ServicesSection.tsx, src/views/TopInteriorDesignerPage.tsx | yes | yes (3 pages) | PASS |
| `/placeholder-service.jpg`  | src/views/ServicesPage.tsx | **no** | not requested | NOT USED at runtime (missing) |
| `/projectsImg/Villa/villa-img8.jpg`  | src/sections/ProjectsSection.tsx | **no** | not requested | NOT USED at runtime (missing) |
| `/projectsImg/banali/bf-img1.png`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (1 page) | PASS |
| `/projectsImg/banali/bf-img2.png`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/banali/bf-img3.png`  | src/sections/ServicesSection.tsx, src/views/data/servicesData.ts +2 | yes | yes (3 pages) | PASS |
| `/projectsImg/banali/bf-img4.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/banali/bf-img5.png`  | src/views/data/servicesData.ts, src/views/ProjectsData.ts +2 | yes | yes (4 pages) | PASS |
| `/projectsImg/etna/sr-img1.webp`  | src/sections/ProjectShowcase.tsx, src/views/ProjectsData.ts +1 | yes | yes (5 pages) | PASS |
| `/projectsImg/etna/sr-img10.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img12.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/etna/sr-img13.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img14.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img16.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/etna/sr-img3.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/etna/sr-img4.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/etna/sr-img5.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img6.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img7.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/etna/sr-img9.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/FE-img7.jpg`  | src/sections/ProjectsSection.tsx | **no** | not requested | NOT USED at runtime (missing) |
| `/projectsImg/forest-edge/fe-img1.webp`  | src/sections/ProjectShowcase.tsx, src/views/ProjectsData.ts +1 | yes | yes (7 pages) | PASS |
| `/projectsImg/forest-edge/fe-img10.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/fe-img2.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (3 pages) | PASS |
| `/projectsImg/forest-edge/fe-img3.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/fe-img4.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/fe-img5.webp`  | src/views/AboutPage.tsx, src/views/ProjectsData.ts (data) | yes | yes (2 pages) | PASS |
| `/projectsImg/forest-edge/fe-img6.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/forest-edge/fe-img7.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/fe-img8.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/forest-edge/fe-img9.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img1.webp`  | src/views/designsData.ts, src/views/ProjectsData.ts +2 | yes | yes (7 pages) | PASS |
| `/projectsImg/kollur/kl-img10.webp`  | src/views/data/servicesData.ts, src/views/designsData.ts +3 | yes | yes (3 pages) | PASS |
| `/projectsImg/kollur/kl-img11.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img12.webp`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img13.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img14.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img15.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img2.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img3.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img4.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/kollur/kl-img5.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img6.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img7.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img8.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/kollur/kl-img9.webp`  | src/views/designsData.ts, src/views/designsData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/rajapushpa/RP-img7.jpg`  | src/sections/ProjectsSection.tsx | **no** | not requested | NOT USED at runtime (missing) |
| `/projectsImg/rajapushpa/rp-img1.webp`  | src/sections/ProjectShowcase.tsx, src/views/ProjectsData.ts +1 | yes | yes (7 pages) | PASS |
| `/projectsImg/rajapushpa/rp-img10.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img11.webp`  | src/sections/AboutSection.tsx, src/views/ProjectsData.ts (data) | yes | yes (2 pages) | PASS |
| `/projectsImg/rajapushpa/rp-img12.webp`  | src/sections/AboutSection.tsx, src/views/ProjectsData.ts (data) | yes | yes (2 pages) | PASS |
| `/projectsImg/rajapushpa/rp-img13.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img14.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img15.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img2.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img3.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img4.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img5.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img6.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img7.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img8.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/rajapushpa/rp-img9.webp`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img1.png`  | src/sections/ProjectShowcase.tsx, src/views/data/servicesData.ts +5 | yes | yes (11 pages) | PASS |
| `/projectsImg/varaprasad/vp-img10.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img11.png`  | src/views/AboutPage.tsx, src/views/data/servicesData.ts +2 | yes | yes (5 pages) | PASS |
| `/projectsImg/varaprasad/vp-img12.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img13.png`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/varaprasad/vp-img14.png`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (3 pages) | PASS |
| `/projectsImg/varaprasad/vp-img15.png`  | src/sections/ServicesSection.tsx, src/views/data/servicesData.ts +2 | yes | yes (6 pages) | PASS |
| `/projectsImg/varaprasad/vp-img16.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img2.png`  | src/views/ProjectsData.ts, src/views/ProjectsData.ts (data) | yes | yes (6 pages) | PASS |
| `/projectsImg/varaprasad/vp-img3.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img4.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img5.png`  | src/views/data/servicesData.ts, src/views/data/servicesData.ts (data) +1 | yes | yes (2 pages) | PASS |
| `/projectsImg/varaprasad/vp-img6.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img7.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img8.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/projectsImg/varaprasad/vp-img9.png`  | src/views/ProjectsData.ts (data) | yes | yes (1 page) | PASS |
| `/review1.png`  | src/sections/TestimonialSection.tsx, src/views/TestimonialPage.tsx | yes | yes (2 pages) | PASS |
| `/review2.png`  | src/sections/TestimonialSection.tsx, src/views/TestimonialPage.tsx | yes | yes (2 pages) | PASS |
| `/small-house-interior-designs.png`  | src/views/blogs/meta/SmallHomeInteriorDesignIdeas.meta.ts, src/views/blogsData.ts +1 | yes | yes (2 pages) | PASS |
| `/video-fallback-poster.jpg` poster | src/sections/HeroSection.tsx | **no** | **no** | FAIL (pre-existing) |
| `https://i.pravatar.cc/150?img=11`  | /testimonials/ | external | yes (1 page) | PASS |
| `https://images.unsplash.c/`  | /about/ | external | **no** | FAIL (pre-existing) |
| `https://images.unsplash.com/photo-`  | src/views/AboutPage.tsx | external | **no** | FAIL (pre-existing) |
| `https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80`  | src/views/AboutPage.tsx | external | yes (1 page) | PASS |
| `https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fi…`  | src/views/blogs/meta/MasteringLightingInvisibleArchitecture.meta.ts, src/views/blogsData.ts +1 | external | yes (2 pages) | PASS |
| `https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2000&auto=format&fi…`  | src/views/blogs/meta/LivingRoomInteriorDesignIdeas.meta.ts, src/views/blogsData.ts +1 | external | yes (2 pages) | PASS |
| `https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fi…`  | src/views/blogs/meta/HowToChooseTheBestInteriorDesignerInHyderabad.meta.ts, src/views/blogsData.ts +1 | external | yes (2 pages) | PASS |
| `https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fi…`  | src/views/ContactPage.tsx | external | yes (1 page) | PASS |
| `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fi…`  | src/views/blogs/MasteringLightingInvisibleArchitecture.tsx | external | yes (1 page) | PASS |
| `https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000&auto=format&fi…`  | src/views/blogs/meta/BedroomInteriorDesignIdeas.meta.ts, src/views/blogsData.ts +1 | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/Dhx2CLR350Y/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/K38FUJ3IPhQ/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/_NQ_TWdarSk/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/aZq2QRwiYsE/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/fc27D9buInM/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
| `https://img.youtube.com/vi/ztyqShdYSEY/maxresdefault.jpg`  | /, /testimonials/ | external | yes (2 pages) | PASS |
