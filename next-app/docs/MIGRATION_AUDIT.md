# Migration Audit: Vite + React → Next.js

Source audited: the Vite app at the repository root (commit `8bc27da`, branch `migration/vite-to-nextjs`). The Vite app was not modified. Its `package.json` already had an uncommitted `packageManager` line before this work, and that line was left as it was.

## Source application

| Area | Vite implementation |
|---|---|
| Build | `tsx scripts/generate-sitemaps.ts && tsc -b && vite build && vite build --ssr src/entry-server.tsx && node scripts/prerender.js` |
| Routing | `react-router-dom` 7, `<Routes>` in `src/App.tsx`, every page `React.lazy` + `<Suspense>` |
| Prerender | `scripts/prerender.js` renders 43 routes + `/404.html` with `renderToPipeableStream`, then moves Helmet tags into `<head>` marked `data-ssg` (removed again on boot by `src/main.tsx`) |
| SEO | `src/components/SEO.tsx` (react-helmet-async) + registry `src/data/pages.ts`; Breadcrumb, LuxuryPage and TopInteriorDesignerPage add extra JSON-LD through Helmet |
| Sitemaps | `scripts/generate-sitemaps.ts` writes `public/sitemap.xml`, `blog-sitemap.xml`, `image-sitemap.xml`, `robots.txt` before the build |
| Redirects | `vercel.json`: 71 permanent redirects, `trailingSlash: true`, `cleanUrls: true`, immutable cache header on `/assets/(.*)` |
| Images | `vite-plugin-image-optimizer` (PNG/JPEG/WebP/AVIF at quality 80, SVGO) on `public/` → `dist/`, plus `vite-plugin-compression2` |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), `src/index.css` with Google Fonts Inter + two local `@font-face` rules |
| Env | `VITE_EMAILJS_SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY` (`import.meta.env`) |

## Baseline (re-run during the audit)

```
node scripts/validate-seo.mjs
Target: dist/
Checked 43 pages, 34 internal link targets, 71 redirects.
All SEO checks passed.
```

## Browser API audit

| File | APIs | Where | Next.js status |
|---|---|---|---|
| `components/BreadCrumb.tsx` | `window.scrollY`, scroll listener | `useEffect` | safe; client component |
| `components/SocialMediaBar.tsx` | `window.innerHeight/scrollY/scrollTo` | `useEffect` / handlers, with a `typeof window` guard | safe |
| `components/PageTransitionLayout.tsx` | `window.scrollTo` | GSAP callback | safe |
| `components/ProjectModal.tsx` | `document.body.style` | `useEffect` | safe |
| `sections/HeroSection.tsx` | Lenis, `window.innerWidth`, `IntersectionObserver` | `useEffect` | safe |
| `sections/ProjectShowcase.tsx` | Lenis, GSAP ScrollTrigger | `useEffect` | safe |
| `sections/PanoromaSection.tsx` | Three.js WebGL, `ResizeObserver`, `requestAnimationFrame`, pointer listeners | `useEffect` | safe; verified in a browser (WebGL canvas 1374×718) |
| `sections/ProjectsSection.tsx` | OGL WebGL, `requestAnimationFrame`, resize | class created in `useEffect` | safe. **Not used anywhere in the Vite app either**; migrated as-is |
| `sections/TestimonialSection.tsx` | `document.body.style` | `useEffect` | safe |
| `views/ProjectDetails.tsx` | `window.scrollTo` | `useEffect` | safe |
| `window.__IS_PRERENDERING__` (Hero, ProjectShowcase, Panorama) | prerender flag | `useEffect` | never set in Next.js; typed in `src/global.d.ts`. Behaviour in the browser is unchanged (it was always unset after hydration) |

None of these APIs run at module scope or during render, so no `ssr: false` dynamic imports were needed. SSR stays enabled everywhere.

## Notable findings

1. **The page transition's delayed swap never took effect.** `PageTransitionLayout` cloned its child with a `location` prop, but that child was `<Suspense>`, not `<Routes>`, so the prop was ignored and the new page always rendered immediately under the tiles. The port keeps that observable behaviour (see COMPONENT_MAPPING.md).
2. **Streaming order.** The Vite prerender put each lazy page body after the footer in a hidden `<div id="S:0">`, which an inline script swapped into place. Next.js renders the content in place, so crawlers now get it in reading order with identical text.
3. **`designsData.oldSlug` equals `slug` for every design.** The client-side legacy-slug redirect in `DesignDetails` therefore never fires. It was ported faithfully anyway.
4. **Unused code that was migrated anyway:** `components/PageTransisitions.tsx` and `sections/ProjectsSection.tsx`. `react-zoom-pan-pinch` is a dependency in both apps but no component imports it.
5. **Assets that were already missing** in the Vite app's `public/` (they 404 in both apps): `/images/{hitec-city,gachibowli,kondapur,madhapur}-interior-hero.jpg`, `/video-fallback-poster.jpg` and `/apple-touch-icon.png`. YouTube `maxresdefault.jpg` thumbnails 404 for one video, and the code falls back to `hqdefault`.
6. **Malformed SVG path** in `ServicesPage.tsx` (`d="…15 15h2.25…"`). The browser logs `<path> attribute d: Expected number`. This came from the Vite source and was kept unchanged.
7. **Root `pnpm lint`** already failed before this work, with 6 `no-explicit-any` errors in `src/entry-server.tsx`.
