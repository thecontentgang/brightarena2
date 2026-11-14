# Full Audit Report: Bright Arena Interiors (Next.js)

**Date:** 2026-11-13
**App:** `next-app/` (Next.js 16.4.6, React 19.3.1)
**Baseline:** the original Vite build (`../dist`, served with `vite preview`). The Vite app was not modified.

## Executive summary

The Next.js app is a faithful migration. Every comparison run against the Vite build came back the same: all 43 pages have identical metadata, structured data, H1s, visible text, internal links and image URLs. 153 of 170 screenshot pairs are pixel-identical, and every remaining difference was traced to animation timing. All 71 redirects, all four sitemap and robots files, and every dynamic route behave correctly. There are no runtime errors, hydration errors or horizontal overflow at any of the five viewports.

The audit found **2 migration regressions**, both low severity and both fixed:
- F1: the 404 page's breadcrumb pointed at Next.js's internal `/_not-found/` path.
- F8: an unused 190 KB font was preloaded on every page.

It also fixed **6 pre-existing accessibility gaps** without visual change:
- reduced-motion support;
- the modal's Escape key and focus trap;
- breadcrumb list semantics;
- unlabeled pagination buttons;
- heading hierarchy.

The site is **not fully audit-ready**, because of defects it inherited from the Vite site, which this migration did not cause and must not paper over:
- the **Contact page form submitted nowhere**. This is now implemented (F9), but it cannot deliver email until you create its EmailJS template and approve a real test send;
- **4 location pages and the About page show broken images** (missing or truncated asset paths);
- a few cosmetic missing assets (video poster, apple-touch-icon).

Each needs a business decision or real assets (see ISSUES_AND_FIXES.md, N1–N5).

**Overall status: PASS for migration fidelity.** FAIL (pre-existing) on 2 acceptance criteria that depend on assets you need to supply (images, colour contrast), and NEEDS REVIEW on 1 (Contact form delivery: implemented, awaiting the EmailJS template and test approval).

## Scope and totals

| Item | Count |
|---|---|
| Routes tested (43 pages + 2 intentional 404 URLs) | **45**, on the production build, plus all 44 on the dev server |
| Viewports for visual regression | 5 (1920, 1440, 768, 390, 360) × 17 key pages × 2 builds = **340 screenshots** (170 pairs) |
| Component modules reviewed | **49** migrated + 3 added (`SEO`, `JsonLd`, `MotionProvider`). Shell: Navbar, mobile menu, Footer, Breadcrumb, social bar, page transition. Sections: hero, about, trusted-by marquee, services, philosophy, panorama, showcase, testimonials. Pages: 25 views + 6 blog articles. Shared: ProjectModal, blog components |
| Image elements checked in the browser | **447** `<img>` across 45 routes; **129** distinct asset URLs (static + runtime); 104 optimised files compared byte-for-byte with production |
| Redirects verified over HTTP | **71** (+ 71 slashless variants) |
| Lighthouse runs | 20 with simulated throttling + 12 with real (devtools) throttling |
| axe-core accessibility scans | 45 routes × 3 runs (Vite, Next before fixes, Next after fixes) |

## Validation scripts (actually run on the final build)

| Script | Result |
|---|---|
| `pnpm typecheck` (`next typegen && tsc --noEmit`, strict) | **PASS**: 0 errors |
| `pnpm lint` | **PASS**: 0 errors; 37 warnings, all `@next/next/no-img-element` (deliberate, N14). A warning is not a pass, so this is reported as **WARNING** for the lint category |
| `pnpm images:check` | **PASS**: 104/104 optimised, 258.8 MB → 89.1 MB |
| `pnpm build` | **PASS**: 49 static outputs |
| `pnpm seo:check` (HTTP: redirects, sitemaps, canonicals, 404s, duplicates) | **PASS**: 43 pages, 34 internal link targets, 71 redirects |
| `pnpm seo:compare` (parity with Vite) | **PASS**: 0 unintended differences. Since F9 there is 1 **intended** difference: the /contact/ label "Project Details" became "Project Details *" (the message is now required) |
| `pnpm test:contact` (Contact form validation, 7 unit tests) | **PASS**: 7/7 |
| `pnpm verify` (typecheck, lint, test:contact, images:check, build, seo:check) | **PASS** (exit 0, re-run after F9) |
| Portability (copy outside the repo → `pnpm install --frozen-lockfile` → build → seo:check) | **PASS**. No script exists for this, so it was run manually |
| Vite app untouched (`git status` / `git diff` on src, public, configs, scripts) | **PASS** |

## SEO results

**PASS.** See SEO_AUDIT.md for detail.
- Metadata is identical to Vite.
- 41 unique titles, descriptions and canonicals across 43 pages; the 2 shared values are the intended aliases.
- One canonical per page.
- JSON-LD is valid with its required properties: LocalBusiness ×36, BreadcrumbList ×42, BlogPosting ×7, FAQPage ×4.
- The sitemaps are byte-identical to Vite's.
- The noindex policy is preserved for `/blogs/art-of-biophilic-design/` only.
- All 71 redirects return 308 with no chains or loops.
- Lighthouse SEO score is **100** on every page tested, on both builds.

Warnings (all pre-existing):
- orphan location pages;
- long titles and descriptions;
- no `datePublished` in BlogPosting;
- the same og:image on every page.

## Performance results

Lighthouse 13.6 ran against local production servers. Two methods were used: simulated throttling (Lighthouse's default modelling) and real devtools throttling (the actual throttled page load, which is closer to real users).

**Real throttling (devtools).** Mobile unless noted.

| Page | Perf Vite → Next | FCP Vite → Next | LCP Vite → Next | TBT Vite → Next | CLS |
|---|---|---|---|---|---|
| `/` (desktop, 2 runs) | 61–64 → **67–68** | 0.58–0.59 → 0.58–0.62 s | 0.68–0.73 → **0.58–0.62 s** | 818–1217 → **558–613 ms** | 0.02 both |
| `/services/home-…/` (2 runs) | 59 → **63** | 2.73 → **2.37 s** | 29.6 → 30.2 s | 178 → **58 ms** | 0 |
| `/portfolio/forest-edge-…/` (2 runs) | 69–70 → **74** | 2.76 → **2.26 s** | 6.8–7.4 → **6.35 s** | 75 → 71 ms | 0 |
| `/contact/` (1 run) | 72 → **75** | 2.81 → **2.23 s** | 5.61 → 5.83 s | 114 → **75 ms** | 0 |
| `/blogs/how-to-choose-…/` (1 run) | 72 → **73** | 2.79 → **2.28 s** | 5.61 → 5.92 s | 109 → **79 ms** | 0 |

**Simulated throttling (default Lighthouse).**
- **Desktop:** Next 69 / 78 / 96 / 98 / 95 vs Vite 80 / 98 / 98 / 98 / 96 for home, services, portfolio, blog and contact.
- **Mobile:** Next 37 / 74 / 78 / 81 / 76 vs Vite 43 / 80 / 84 / 86 / 79. Next's simulated LCP is far worse, for example services 25.2 s vs 4.5 s.
- **Observed values in the same reports:** the gaps are the opposite. Services desktop LCP was 1.83 s in Next vs 2.02 s in Vite, and FCP was lower in Next on 9 of 10 runs (the exception was home on mobile: 618 vs 538 ms).

That mobile gap was investigated. In the Next HTML the hero paragraph becomes visible only after hydration, and Lighthouse's simulation (Lantern) then charges every image download that started before it, multi-MB PNGs included, to the LCP. The real-throttling runs above do not reproduce the gap: Next is equal or faster on FCP and TBT, and LCP is within ±5%.

**Conclusion: no performance regression from the migration.** The dominant cost is inherited and identical in both builds:
- about 30 MB of images on the home page (25.7 MB of it images);
- a 3.4 MB PNG hero on the services pages, which gives a ~30 s LCP on throttled mobile.

Converting those heroes to WebP would be the biggest win, but it changes the delivered images, so it is a recommendation, not a fix. The 190 KB unused-font preload added by the migration was removed (F8).

| Other measurements | Next.js | Vite |
|---|---|---|
| JS transferred per page (Lighthouse, mobile) | 257–690 KB | 207–643 KB (Next adds about 40–50 KB of framework runtime and RSC payload) |
| CSS | 16 KB gz (1 file) | 15 KB gz |
| Fonts | self-hosted: Inter woff2 (48 KB) + OrangeAvenue (42 KB) preloaded | Google Fonts CSS + woff2, OrangeAvenue |
| Three.js (3D panorama) | separate lazy chunk, loaded on the home page only | same |
| CLS | 0–0.022 | 0–0.026 |
| INP | not measurable in lab tests (needs real user interaction data) → **NOT TESTED**. TBT, its lab proxy, is lower in Next on every page |
| Heap after 32 client-side navigations | plateaus at ~10.7 MB | keeps rising, 7.5 → 9.7 MB |

## Accessibility results

| Check | Before fixes | After fixes | Status |
|---|---|---|---|
| axe `button-name` (critical) | 1 page / 2 nodes | 0 | **PASS** |
| axe `list` (serious) | 43 pages | 0 | **PASS** |
| axe `color-contrast` (serious) | 44 pages | 44 pages (same in Vite; brand colours) | **FAIL (pre-existing, design decision)** |
| axe `link-in-text-block` | ~38 pages | unchanged (design) | **WARNING (pre-existing)** |
| axe `label-content-name-mismatch` | 4–6 pages (varies with animation timing; same elements in Vite) | unchanged | **WARNING (pre-existing)** |
| Images with alt / meaningful | 447/447 have alt | | **PASS** |
| Keyboard: skip link first, visible focus indicator on each of the first 14 tab stops | yes | yes | **PASS** |
| Modal: focus moves in / Tab trapped / Escape closes | no / no / no | **yes / yes / yes** | **PASS** (fixed) |
| Mobile menu `aria-expanded` toggles | yes | yes | **PASS** |
| `prefers-reduced-motion` | ignored | honoured by Framer Motion (transforms) and the page transition; Lenis/GSAP scroll effects still run (N13) | **PASS** with a note |
| Heading hierarchy | h2→h4 skips | fixed | **PASS** |
| Lighthouse accessibility score | Vite 87–94 | **Next 95–96** | **PASS** |
| Screen-reader walkthrough | not performed (no screen reader available in this environment) | | **NOT TESTED** |

## Functional results

See FUNCTIONAL_TEST_REPORT.md.

**PASS:**
- navigation: navbar, logo, footer, back/forward, refresh, direct loads, mobile menu;
- the project modal with EmailJS mocked: validation, sending state, success, server error, close paths;
- dynamic routes: every slug renders, invalid slugs return a real 404;
- the page transition, panorama (drag and zoom), testimonial filters, video embeds, logo marquee and back-to-top.

**Contact page form (F9, implemented 2026-11-13):** every validation, success, failure and unconfigured path passes with EmailJS mocked, and the Talk Now popup is unaffected. Real delivery is **NOT TESTED** until you create the Contact template and approve one test send.

**WARNING (pre-existing):** Escape does not close the testimonial modal (N17).

**NOT TESTED:**
- real EmailJS delivery (it would send a real email);
- outbound fetches of external sites.

## Final acceptance criteria

| Criterion | Status | Notes |
|---|---|---|
| All expected pages are accessible | **PASS** | 43/43 return 200; unknown URLs return 404 |
| All original content is preserved | **PASS** | Visible text identical to Vite on 43/43 pages |
| All expected components render | **PASS** | No missing or duplicated sections; intentional hidden states only |
| All required images load | **FAIL (pre-existing)** | 7 broken references: 4 location heroes, 2 founder photos, 1 video poster. They fail identically in Vite. 0 migration regressions |
| No unexpected broken links | **PASS** | 34 internal targets all 200; redirect destinations all 200 |
| All major interactions work | **NEEDS REVIEW** | Everything works. The Contact page form is implemented and passes all mocked tests (F9), but it cannot send email until you create the EmailJS Contact template and set `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`; real delivery is awaiting your approval |
| Dynamic routes work | **PASS** | |
| No critical runtime errors | **PASS** | 0 page errors (production and development) |
| No unexpected hydration errors | **PASS** | 0 in dev mode across 44 routes |
| All original redirects are preserved | **PASS** | 71/71 |
| SEO metadata is correct | **PASS** | |
| Structured data is valid | **PASS** | Recommendation: add `datePublished` |
| Sitemaps and robots files are correct | **PASS** | Byte-identical to Vite |
| Mobile and desktop layouts work | **PASS** | 0 overflow at 5 viewports; pixel parity |
| Production build succeeds | **PASS** | |
| TypeScript checks pass | **PASS** | |
| Existing validation scripts pass | **PASS** | `pnpm verify` exit 0; lint has 37 warnings |
| Accessibility (WCAG AA colour contrast) | **FAIL (pre-existing)** | Brand colours; design decision |

## Outstanding decisions

The three remaining FAIL (pre-existing) items need input before they can be fixed. They are documented in **OUTSTANDING_DECISIONS.md**:

- **Contact form (N1 → F9): implemented.** Needs your EmailJS dashboard setup (a new template with the same To Email as Talk Now, Subject `{{subject}}`, Reply-To `{{reply_to}}`), the template ID in `NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID` (local and Vercel), a rebuild, and your approval for one real test send.
- **Location heroes (N2) and founder photos (N3): kept unchanged by your decision.** Waiting for 6 approved original photos with publishing rights, and the hero format choice (keep `.jpg` paths, or WebP with an extension-only `src` change). Founder photos will go to `public/founders/*.webp`.

## Tools and limitations

- **Browser:** headless Chromium 1248, driven through Playwright's API (patchright). Playwright is not a project dependency and nothing was added to the project. Lighthouse 13.6.0 and axe-core 4.14.0 were installed in a temporary tools folder outside the repository.
- **Browsers covered:** Chromium only. Firefox and Safari were **NOT TESTED**.
- **Environment:** all measurements were taken on local production servers, not on Vercel. Network timing on the real CDN will differ.
- **Animation timing:** animations make screenshot comparison sensitive to timing. Every flagged pair was re-captured on an idle machine before being classified.
- **Raw evidence** (JSON results, 340 full-resolution screenshots, Lighthouse reports) was written to a temporary directory and not committed because of its size (about 400 MB). The compressed screenshot set is in `docs/audit/screenshots/`.
