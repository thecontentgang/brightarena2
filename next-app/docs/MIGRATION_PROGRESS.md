# Migration Progress

Status: **complete**. Validated on 2026-11-12 with Next.js 16.4.6, React 19.3.1 and pnpm 10.28.0.

| Task | Status | Evidence |
|---|---|---|
| Source audit and docs | ✅ | MIGRATION_AUDIT.md, ROUTE_MAPPING.md, COMPONENT_MAPPING.md, SEO_MIGRATION_PLAN.md |
| Independent app (`package.json`, lockfile, `pnpm-workspace.yaml`, configs) | ✅ | own lockfile; Turbopack root pinned to the app folder |
| All 43 pages + 404 + 4 static files | ✅ | `next build`: 49 static outputs |
| Dynamic routes via `generateStaticParams` (4 services, 11 projects, 3 designs) | ✅ | `dynamicParams = false`, unknown slug → 404 |
| Shared shell, transition, breadcrumb, social bar, modal | ✅ | browser QA below |
| SEO metadata / JSON-LD / H1 parity | ✅ | `pnpm seo:compare`: 0 differences on 43 pages |
| 71 redirects + trailingSlash + cleanUrls | ✅ | `pnpm seo:check`: all 308 → correct destination |
| Sitemaps + robots | ✅ | byte-identical to the Vite output |
| Public assets (109 files) and fonts | ✅ | copied; generated sitemap/robots files excluded |
| Image optimisation | ✅ | 104/104 images byte-identical to Vite `dist/` |
| Typecheck (strict) | ✅ | `tsc --noEmit`: 0 errors |
| Lint | ✅ | 0 errors, 37 warnings (`no-img-element`, intentional) |
| Portability | ✅ | copied outside the repo: frozen install, build and `seo:check` all pass |
| Vite app untouched | ✅ | `git status`: only `next-app/` added (the pre-existing root `package.json` edit is not from this work) |

## Browser QA (production server, headless Chromium)

- All 44 URLs loaded: no uncaught exceptions and no hydration warnings. The only console errors are the pre-existing missing assets listed in MIGRATION_AUDIT.md.
- Client navigation ran the five-tile transition, reset scroll to 0 and caused no full reload. Back and forward worked.
- Refreshing a dynamic route (`/portfolio/kollur-…/`) worked.
- The project modal (EmailJS form, 3 fields) opened from the navbar CTA and locked body scroll.
- The mobile menu (390 px) opened and navigated to `/contact/`.
- The Three.js panorama renders (WebGL canvas).
- Pixel comparison with the Vite build: 8 pages × 3 viewports, 0.00% difference.

## Not verified here

- A live EmailJS submission (it would send a real email). The env wiring was checked; the send itself should be tested by submitting the form once on a preview deployment.
- Visual comparison of the home and about pages, which use autoplay video, WebGL and parallax and so cannot be compared pixel-for-pixel. They were checked by screenshot.
