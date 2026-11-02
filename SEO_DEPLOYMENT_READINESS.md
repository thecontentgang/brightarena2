# SEO Deployment Readiness

Review date: 2 November 2026. Branch `ssg-migration`, 41 modified files plus 4 new docs and `scripts/validate-seo.mjs`. Nothing is committed or deployed.

## Decision

**Approved for deployment, subject to two sign-offs.** Neither needs any further engineering:

1. **Approve the new title and description** for `/top-interior-designer-in-hyderabad/` (§5). This is client-facing copy.
2. **Decide on the one-line hidden-content fix** (§2.2). It is recommended for this deploy, has been tested in a scratch copy, and is not yet applied.

No technical blocker was found. TypeScript, the production build and the SEO validator all pass. The current changes don't introduce any lint error, regression or metadata problem.

### Every remaining issue, classified

| # | Issue | Class | Evidence / reason |
|---|---|---|---|
| 1 | Approve the new copy on `/top-interior-designer-in-hyderabad/` | **Must fix before deployment** (sign-off) | Copy written during the audit to replace a verbatim duplicate of the homepage |
| 2 | Deploy to a Vercel preview and run `validate-seo.mjs --base=<preview>` before promoting | **Must fix before deployment** (process) | Confirms Vercel's redirect and trailing-slash handling on the real platform; local checks emulate it |
| 3 | Main content prerendered inside `<div hidden>` with a spinner in its place | **Recommended before deployment** | §2.2. One option in `src/entry-server.tsx`, verified in a scratch build |
| 4 | 7 old blog URLs have a same-topic article and should redirect to it, not to the blog index or a gallery page | **Recommended before deployment** (needs approval) | §3. Exact topic matches only |
| 5 | Hydration mismatch (React error #418) blocks `hydrateRoot` | Can be addressed after deployment | §2.1. Keep `createRoot` until the mismatch is fixed |
| 6 | Image weight (homepage 23.6 MB, project page 59 MB) | Can be addressed after deployment (high priority) | §4. Separate, visually reviewed release |
| 7 | 42 old blog URLs: restore or let them 404 | Can be addressed after deployment | §3. Needs Search Console data |
| 8 | Top Interior Designer page competes with the homepage | Can be addressed after deployment | §5. Decide after 4–6 weeks of Search Console data |
| 9 | `pages.ts` controls only 14 of its 39 entries | Can be addressed after deployment | §1. Refactor, no SEO output change |
| 10 | 6 lint errors in `src/entry-server.tsx` | Can be addressed after deployment | §6. Pre-existing, unrelated |
| 11 | Hidden (`sr-only`) H1s, a site-wide H2 rendered before the H1, nested `<main>`, "JavaScript is Required" `<noscript>` text, `apple-touch-icon.png` 404, YouTube thumbnail 404 on the homepage, long titles and descriptions | Can be addressed after deployment | Low impact |

---

## 1. Final architecture assessment

**Rendering pipeline:**
1. `generate-sitemaps.ts`
2. `tsc -b`
3. client build
4. SSR build of `src/entry-server.tsx`
5. `scripts/prerender.js` renders 44 routes to static HTML in `dist/`
6. Vercel serves `dist/` with `cleanUrls` and `trailingSlash: true`

There is no server runtime and no database.

| Area | State | Verified by |
|---|---|---|
| Canonical generation | One output point (`SEO.tsx`) normalises every canonical to `https://www.` + path + `/`. A slashless canonical can no longer be emitted from any source. | Validator: 43 pages, every canonical self-referencing (aliases → primary) and returning 200 |
| Metadata generation | Title, description, canonical, OG and Twitter tags are rendered by Helmet at prerender, moved into `<head>` with `data-ssg`, removed by `main.tsx` on boot and re-rendered by React. Final DOM: exactly 1 title, 1 description, 1 canonical. | Raw HTML (validator) and rendered DOM (Edge, 10 pages) |
| Single source of truth | **Partial.** Component `<SEO>` props override `src/data/pages.ts`. Live output comes from props for 25 of the 39 `pages.ts` entries; `pages.ts` is in effect only for `/`, the 5 location pages, the Top Interior Designer page, the noindex placeholder and 5 old portfolio pages. The overridden entries are dead data but cause no wrong output. | Comparison of `pages.ts` titles with built titles |
| Routes | Every static route in `App.tsx` is prerendered. Every sitemap URL is prerendered. Prerendered but not in the sitemap: only the 2 alias URLs and the noindex placeholder, which is correct. | Script cross-check of `App.tsx`, `prerender.js` and sitemaps |
| Sitemaps / robots.txt | 34 + 6 URLs, all 200, all trailing slash, no noindex or redirected URLs, every image URL 200, no fake `lastmod`. robots.txt allows everything and lists 3 sitemaps. | Validator |
| Structured data | `/`: `LocalBusiness`. 31 pages: `BreadcrumbList` + `LocalBusiness` (one stable `@id`). 6 posts: `BreadcrumbList` + `BlogPosting` with `headline`. 4 luxury/top pages: adds `FAQPage`. All JSON-LD parses. | Built HTML |
| Redirects | 71 permanent redirects. No chains, no duplicates, none shadowing a page, every destination a built page. 41 still point at `/blogs/` (see §3). | Validator, `vercel.json` |
| Internal links | 34 distinct targets, all 200, no redirects | Validator |
| Indexability | Only `/blogs/art-of-biophilic-design/` is noindex (placeholder). No `X-Robots-Tag`. | Validator |

**Recommendation:** deploy the architecture as it is. Making `pages.ts` the single source means either deleting the 25 dead entries, or moving the props into `pages.ts` and having pages call `<SEO />` with no arguments. That is a refactor with no SEO output change, best done after deployment with `seo:check` guarding it.

## 2. Hydration investigation

### 2.1 The October 13 change
- **Commit:** `2ee5131`, 13 Oct 2026 18:23 IST: "feat: add Whitefields interior designer landing page, main entry point, and sitemaps". The message doesn't mention hydration.
- **Before** (`b85530c` 7 Oct, `ac1b53d` 12 Oct): `if (rootElement.hasChildNodes()) hydrateRoot(...) else createRoot(...).render(...)`.
- **After:** `createRoot(rootElement).render(...)` only.

**Test:** I built the current code twice in a scratch copy, identical except for `hydrateRoot` vs `createRoot`. The prerendered HTML was byte-identical apart from asset hashes. I served both locally and measured in headless Edge, tagging every element created by the HTML parser so I could tell whether React kept or replaced it.

| Page | `createRoot` (current) | `hydrateRoot` (previous) |
|---|---|---|
| `/` | 0 of 697 prerendered nodes kept, no errors | **React error #418 (hydration mismatch)**; 143 of 735 nodes kept |
| `/about/` | 0/290 kept, no errors | **#418**; 0/290 kept |
| `/services/home-interior-designs-hyderabad/` | 0/446 kept, no errors | **#418**; 0/446 kept |
| `/blogs/bedroom-interior-design-ideas/` | 0/296 kept, no errors | **#418**; 0/296 kept |

Across 8 pages in both builds:
- **Final metadata:** identical (1 title, 1 description, correct canonical, same JSON-LD count, 1 H1).
- **Layout shift:** 0.000 in all runs.
- **Text:** the same word count.
- **Timing:** FCP and LCP were within run-to-run noise.

**Findings:**
- **Is hydration deterministic?** No. Server and client output don't match on every page tested, so React throws #418 and rebuilds the page on the client. Restoring `hydrateRoot` would bring back an uncaught error on every page view without keeping the server HTML. That explains why it was removed, even though the commit doesn't say so.
- **Does the current setup preserve prerendered HTML?** For crawlers, yes: every route's full HTML is what Googlebot downloads. In the browser, no: `createRoot` replaces the prerendered DOM with an identical client-rendered copy. Content is replaced, not duplicated.
- **Does metadata change after boot?** It is removed and re-added with the same values. No page shows different metadata before and after.
- **Does Googlebot get the right initial HTML?** Yes for metadata. Content has the caveat in §2.2.
- **SEO/performance cost of `createRoot`:** extra main-thread work and a brief swap. CLS was 0 and LCP didn't change measurably in these tests. Field data isn't available.

**Recommendation:** keep `createRoot`. After deployment, find the #418 source by running the development build and reading the full mismatch message. Likely candidates are values that differ between prerender and browser, such as `window.__IS_PRERENDERING__` branches, state initialised from `window` or time, and animation initial styles. Restore `hydrateRoot` only once a page hydrates with zero errors.

### 2.2 Main content hidden in the prerendered HTML (new finding)
- **What happens:** on every prerendered page, React's streaming renderer writes the routed page content into `<div hidden id="S:0">`. A full-screen spinner sits in its place inside `<!--$?--><template id="B:0">`. An inline `$RC` script moves the content into place when JavaScript runs.
- **Scale:** on `/about/`, 606 of 750 words are inside the hidden block. The homepage has 2 such blocks.
- **Cause:** React 19.3's server renderer (`react-dom-server.node.production.js`) outlines a completed Suspense boundary whenever the bytes flushed so far plus the boundary exceed `progressiveChunkSize`, which defaults to 12,800 bytes. Every page's content sits in the `<Suspense>` around `<Routes>` in `App.tsx`, so it always crosses that limit.
- **Impact:**
  - Googlebot renders JavaScript, so its rendered DOM is correct. That's why this hasn't shown up as a metadata problem.
  - Crawlers and tools that don't run JavaScript (some other search engines, AI crawlers, link-preview bots, accessibility tools) see a spinner and hidden text.
  - The page heading only becomes visible after the swap script runs.
- **Proposed fix (not applied):** one option in `src/entry-server.tsx`:

```diff
       {
+        progressiveChunkSize: Infinity,
         onAllReady() {
```

- **Scratch-build verification** (current code + this option):
  - 0 hidden segments, 0 `<template>` placeholders, 0 swap scripts and 0 spinners in the HTML (previously 1–2 of each per page).
  - Identical word counts (about 750, home-interior service page 4,736, homepage 527).
  - `validate-seo.mjs`: all checks pass.
  - The page heading is visible about 55–180 ms after navigation, versus about 600–900 ms now (6 paired unthrottled runs per build).
  - FCP and LCP unchanged within noise.
- **Risk:** low. It changes only how already-complete HTML is laid out in the file. It doesn't touch client code or metadata.

## 3. Historical blog content recovery

**Sources:** the Internet Archive (CDX index and archived page copies) for titles, publish dates and word counts, plus live HTTP checks. Titles are quoted from archived copies; **no content has been written or invented**.

**Totals:** 54 old `/blog/*` URLs.
- **Archive copies:** 29 have one (title recoverable). 25 have none: these are known only from `vercel.json`, and 2 of the 25 are only in the archive index without a stored copy.
- **Current status:** 40 redirect to `/blogs/` (the blog index), 9 to a related page, 5 return 404.

**What needs Search Console** (Performance and Links reports filtered to `/blog/`, before June 2026): every "restore" decision, and the priority order. The archive capture count below is only a weak proxy for visibility. There is no traffic or backlink data in this audit.

**Policy:**
1. **Same-topic article exists:** permanent redirect to that article. 7 URLs, listed first.
2. **Related page already redirected:** keep (3 URLs).
3. **No equivalent, archive copy exists:** restore from the archive copy if Search Console shows clicks, impressions or external links. Otherwise let it return 404.
4. **No equivalent and no archive copy:** restore only if the client has the original (a WordPress export or database backup). Otherwise 404.
5. **The 40 blanket redirects to `/blogs/`:** Google treats these as soft 404s, so they pass nothing. After the Search Console review, each should become a restored article, a same-topic redirect, or a 404. None should go to the homepage.

**Ask the client:** for a WordPress export or database backup. It would allow faithful restoration of all 54 posts, including the 25 with no archive copy. The list of 62 old URLs in `vercel.json` (added 4 Oct) came from somewhere, possibly a Search Console export, which would also answer the priority question.

**Key:** "Captures" is the number of Internet Archive snapshots. "308→" means Vercel's permanent redirect.

| Old URL | Original title (archived) | Published | Words | Captures | Now | Recommendation |
|---|---|---|---|---|---|---|
| /blog/timeless-design-inspiration-for-the-modern-home/ | Timeless Design Inspiration for the Modern Home | 2023-10-23 | 811 | 10 | 404 | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/luxury-living-room-interior-design-ideas-with-bright-arena-interiors/ | Luxury Living Room Interior Design Ideas with Bright Arena Interiors | 2023-07-07 | 583 | 9 | 308→/designs/living-room-interior-design-hyderabad/ | Change redirect to /blogs/living-room-interior-design-ideas/ (closer article) |
| /blog/maximizing-small-spaces-innovative-solutions-from-interior-design-experts/ | Maximizing Small Spaces: Innovative Solutions from Interior Design Experts | 2023-12-04 | 1055 | 7 | 308→/blogs/ (index) | Redirect to /blogs/small-home-interior-design-ideas/ (same topic) |
| /blog/discovering-the-artistry-of-top-interior-designers-in-hyderabad/ | Discovering the Artistry of Top Interior Designers in Hyderabad | 2023-11-30 | 953 | 7 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/space-saving-hacks-for-urban-indian-apartments/ | Space Saving Hacks for Urban Indian Apartments | 2023-10-20 | 1070 | 7 | 404 | Redirect to /blogs/small-home-interior-design-ideas/ (same topic) |
| /blog/refreshing-interior-design-and-home-decor-ideas/ | Refreshing Interior Design and Home Decor Ideas | 2023-07-03 | 586 | 7 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/developments-in-the-world-of-interior-design/ | Trends to Watch Exciting Developments in the World of Interior Design | 2023-05-02 | 578 | 7 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/navigating-the-design-process-an-insiders-guide-to-collaborating-with-bright-arena-interiors/ | Navigating the Design Process: An Insider's Guide to Collaborating with Bright Arena Interiors | 2023-04-14 | 665 | 7 | 404 | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/top-5-things-to-keep-in-mind-for-interior-decoration/ | Top 5 things To Keep In Mind For Interior Decoration | 2024-04-25 | 891 | 6 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/luxury-living-elevating-your-home-with-high-end-interior-design-services/ | Luxury Living - Elevate your home with high-end interior design | 2024-03-27 | 537 | 6 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/glow-up-your-bedroom-15-must-try-lighting-design-concepts/ | 15 Must-Try Lighting Design Concepts to Glow Up Your Bedroom | 2024-01-25 | 756 | 6 | 308→/blogs/mastering-lighting-invisible-architecture/ | Keep redirect (related page) |
| /blog/the-art-of-personalization-how-bright-arena-interiors-creates-spaces-that-reflect-your-unique-style/ | Art of Personalization - Bright Arena Interiors Creates Spaces that Reflect Your Style | 2023-04-20 | 573 | 6 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/how-to-design-a-modern-kitchen/ | How to design a modern kitchen | 2024-10-10 | 1114 | 5 | 308→/designs/kitchen-interior-design-hyderabad/ | Keep redirect (related page) |
| /blog/feel-the-touch-of-luxury-in-your-home-with-interior-design-services/ | Feel The Touch Of Luxury with Interior Design Services | 2024-05-31 | 655 | 5 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/sustainable-design-solutions/ | Sustainable Design Solutions by Bright Arena for Eco-friendly Interiors | 2023-04-25 | 589 | 5 | 404 | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/transforming-spaces-with-interior-design/ | Transforming Spaces: The Impact of Interior Design on Well-being and Productivity | 2023-04-10 | 614 | 5 | 404 | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/top-10-beautiful-ideas-to-elevate-the-luxury-of-your-home-interiors/ | Top 10 Beautiful Ideas To Elevate The Luxury Of Your Home Interiors | 2024-07-15 | 819 | 4 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/interior-design-tips-to-make-your-home-from-basic-to-luxurious/ | Interior design tips to make your home from basic to luxurious | 2024-11-27 | 919 | 3 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/how-to-choose-the-best-colors-for-bedroom-living-room-and-kitchen/ | How to Choose the Best Colors for Bedroom, Living Room, and Kitchen? | 2025-07-03 | 1040 | 2 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/beyond-the-fifth-wall-trending-interior-ceiling-designs-in-2025/ | Beyond the Fifth Wall! Trending Interior Ceiling Designs in 2025 | 2025-03-13 | 1157 | 2 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/beyond-ordinary-stunning-interior-design-concepts-for-a-stylish-living-space/ | Stunning Interior Design Concepts for a Stylish Living Space | 2025-01-31 | 671 | 2 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/top-5-living-room-design-ideas/ | Top 5 Living Room Design Ideas | 2025-01-20 | 585 | 2 | 308→/designs/living-room-interior-design-hyderabad/ | Change redirect to /blogs/living-room-interior-design-ideas/ (closer article) |
| /blog/how-to-plan-your-budget-for-3bhk-4bhk-villas-best-planing/ | 3BHK/4BHK Villa Budget Guide Hyderabad | Smart Cost Planning | 2025-11-24 | 1055 | 1 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/how-to-choose-the-right-interior-designer-for-your-villa3bhk-4bhk-expert-tips-precautions/ | How to Choose the Best Interior Designer for Your Villa | 2025-11-19 | 1349 | 1 | 308→/blogs/ (index) | Redirect to /blogs/how-to-choose-the-best-interior-designer-in-hyderabad/ (same topic) |
| /blog/a-complete-guide-to-planning-interiors-during-house-construction/ | Plan Interiors During Construction | Expert Guide by Bright Arena Hyderabad | 2025-10-30 | 902 | 1 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/you-could-be-wasting-lakhs-on-interiors-if-you-dont-know-these-hidden-facts/ | 10 Hidden Interior Design Facts That Can Save You Lakhs | Bright Arena Interiors Hyderabad | 2025-10-27 | 1377 | 1 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/how-to-choose-the-perfect-furniture-for-every-roomvillas-3bhk-4bhk/ | How to Choose the Perfect Furniture for Every Room | Bright Arena | 2025-10-17 | 1336 | 1 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/top-10-features-that-define-a-luxury-villa-in-2025/ | Top 10 Features That Define a Luxury Villa in 2025 | 2025-05-30 | 1094 | 1 | 308→/blogs/ (index) | Restore from archive if GSC shows clicks/links; else 404 |
| /blog/top-10-kitchen-design-trends-for-2025/ | Top 10 Kitchen Design Trends for 2025 | 2025-03-21 | 1065 | 1 | 308→/designs/kitchen-interior-design-hyderabad/ | Keep redirect (related page) |
| /blog/best-ideas-for-office-interior-designs-2025/ | _not archived_ |  |  | 0 | 308→/services/office-interior-designers-in-hyderabad/ | Keep redirect (related page) |
| /blog/interior-design-elements-that-instantly-bring-a-villas-value/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-bright-arena-became-one-of-the-top-10-best-interior-designers-in-hyderabad/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/interior-design-secrets-used-in-high-end-gated-villa-communities/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/know-why-3d-interior-visualization-matters-when-planning-a-luxury-villa/ | _not archived_ |  |  | 0 | 308→/services/2d-3d-interior-design-services-in-hyderabad/ | Keep redirect (related page) |
| /blog/avoid-these-typical-mistakes-in-apartment-2bhk-3bhk-interior-designing/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/best-tips-for-interior-woodwork-bright-arena-interiors/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/top-hybrid-interior-trends-for-3bhk-4bhk-luxury-villas-in-2026/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-smart-interiors-are-redefining-urban-living-spaces-in-2025/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/common-mistakes-to-avoid-when-choosing-home-interiors-in-hyderabad/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/the-best-luxury-villa-designers-in-hyderabad3bhk-4bhk-bright-arena/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/independent-villas-vs-gated-community-villa-interiors-3bhk-4bhk-in-hyderabad/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/major-living-room-design-trends-for-2025/ | _not archived_ |  |  | 0 | 308→/designs/living-room-interior-design-hyderabad/ | Change redirect to /blogs/living-room-interior-design-ideas/ (closer article) |
| /blog/best-2bhk-3bhk-4bhk-villa-interior-design-tips-in-2025/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/did-you-know-these-budget-saving-interior-design-tips-for-luxury-villas/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/why-some-villas-look-luxurious-without-expensive-interiors/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-to-plan-villa-interior-design-for-maximum-resale-value-in-hyderabad/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-to-save-money-while-designing-a-3bhk-4bhk-villa-interior/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/empty-villa-to-dream-home-best-interior-design-process-for-3bhk-4bhk-villas/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-bright-arena-interiors-turnkey-projects-simplify-your-interior-design-journey/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/10-core-factors-to-consider-before-choosing-the-best-home-automation-services-in-hyderabad/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/why-3d-visualisation-is-important-for-clients-before-choosing-any-interior-designing/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/top-trending-3bhk-4bhk-villa-interior-designs-in-2026-complete-guide/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/10-classic-interior-design-trends-that-never-go-out-of-style/ | _not archived_ |  |  | 0 | 308→/blogs/ (index) | Restore only if client has the original; else 404 |
| /blog/how-to-choose-the-best-bedroom-interior-designs-in-2025/ | _not archived_ |  |  | 0 | 308→/designs/bedroom-interior-design-hyderabad/ | Change redirect to /blogs/bedroom-interior-design-ideas/ (closer article) |

**Summary of recommendations:**
- **Same-topic redirect (7 URLs, recommended for this deploy, needs approval):**
  - `maximizing-small-spaces…`, `space-saving-hacks…` → `/blogs/small-home-interior-design-ideas/`
  - `how-to-choose-the-right-interior-designer-for-your-villa…` → `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/`
  - `how-to-choose-the-best-bedroom-interior-designs-in-2025` → `/blogs/bedroom-interior-design-ideas/`
  - `top-5-living-room-design-ideas`, `luxury-living-room-interior-design-ideas…`, `major-living-room-design-trends-for-2025` → `/blogs/living-room-interior-design-ideas/` (an ideas article, closer than the design gallery they redirect to now)
- **Keep the existing related redirect (5 URLs):**
  - the two kitchen posts → kitchen design page
  - the bedroom-lighting post → lighting article
  - `best-ideas-for-office-interior-designs-2025` → office service
  - `know-why-3d-interior-visualization-matters…` → 2D/3D service
- **Restore or 404, decided by Search Console (42 URLs):** 21 with archive copies, 21 known only by slug.

## 4. Image optimisation priorities

**How measured:**
- Image dimensions and file sizes come from `public/`, read with `sharp`, which is already a dev dependency.
- "Served" is the file in `dist/` after the existing `vite-plugin-image-optimizer`. That plugin re-compresses but never resizes, so e.g. `vp-img15.png` goes from 40.5 MB to 14.7 MB at 7680×4319.
- Estimates are in-memory re-encodes (nothing written) at ≤2000 px wide: WebP q80 and AVIF q55.

**Overall:** `public/` holds 103 images, 271 MB (PNG 236 MB, JPEG 14 MB, WebP 21 MB). 61 are wider than 2400 px. `dist/projectsImg` is 87 MB after the current plugin.

### Largest images

| File | Dimensions | Source size | Served now | Format | Recommended | Est. size (WebP / AVIF) | Used on |
|---|---|---|---|---|---|---|---|
| `/projectsImg/varaprasad/vp-img15.png` | 7680×4319 | 40.5 MB | 14.7 MB | PNG | WebP ≤2000 px | 0.16 / 0.11 MB | 6 pages incl. homepage, 3 service pages |
| `/projectsImg/varaprasad/vp-img16.png` | 4029×2266 | 20.9 MB | 5.2 MB | PNG | WebP | 0.28 / 0.16 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img10.png` | 4028×2266 | 16.6 MB | 4.8 MB | PNG | WebP | 0.17 / 0.09 MB | Vara Prasad project |
| `/Panorama.jpeg` | 8192×4096 | 14.0 MB | 2.3 MB | JPEG | WebP at 4096×2048 for the 360° viewer, loaded on interaction | 0.12 MB at 2000 px (needs a higher-resolution test for 360°) | Homepage (client-side viewer) |
| `/projectsImg/banali/bf-img2.png` | 3840×2435 | 13.2 MB | 4.0 MB | PNG | WebP | 0.21 / 0.13 MB | Banali project, commercial service |
| `/projectsImg/varaprasad/vp-img1.png` | 4029×2266 | 12.6 MB | 3.5 MB | PNG | WebP | 0.18 / 0.11 MB | **11 pages** incl. homepage, designs, 5 portfolio pages |
| `/projectsImg/varaprasad/vp-img9.png` | 4028×2266 | 12.5 MB | 3.9 MB | PNG | WebP | 0.16 / 0.10 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img13.png` | 4029×2266 | 12.0 MB | 3.3 MB | PNG | WebP | 0.13 / 0.09 MB | Vara Prasad, office service |
| `/projectsImg/varaprasad/vp-img6.png` | 4029×2266 | 11.1 MB | 2.9 MB | PNG | WebP | 0.14 / 0.09 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img4.png` | 4092×3069 | 10.0 MB | 3.0 MB | PNG | WebP | 0.14 / 0.09 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img2.png` | 4029×2266 | 9.9 MB | 2.5 MB | PNG | WebP | 0.12 / 0.08 MB | 6 pages (5 old portfolio pages) |
| `/projectsImg/varaprasad/vp-img11.png` | 4029×2266 | 9.9 MB | 2.8 MB | PNG | WebP | 0.14 / 0.09 MB | 5 pages incl. `/about/`, home service |
| `/projectsImg/varaprasad/vp-img3.png` | 4029×2266 | 9.5 MB | 2.4 MB | PNG | WebP | 0.13 / 0.08 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img12.png` | 4029×2266 | 9.5 MB | 2.7 MB | PNG | WebP | 0.15 / 0.10 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img7.png` | 3721×2266 | 7.9 MB | 2.1 MB | PNG | WebP | 0.09 / 0.06 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img8.png` | 3658×2266 | 6.3 MB | 2.1 MB | PNG | WebP | 0.10 / 0.07 MB | Vara Prasad project |
| `/projectsImg/varaprasad/vp-img14.png` | 3161×2266 | 5.6 MB | 1.7 MB | PNG | WebP | 0.10 / 0.07 MB | 3 pages incl. 2 service pages |
| `/projectsImg/banali/bf-img4.png` | 2048×1299 | 4.7 MB | 1.3 MB | PNG | WebP | 0.37 / 0.22 MB | Banali project |
| `/projectsImg/varaprasad/vp-img5.png` | 2550×3069 | 4.1 MB | 1.3 MB | PNG | WebP | 0.12 / 0.08 MB | Vara Prasad, home service |
| `/projectsImg/banali/bf-img1.png` | 2048×1299 | 3.9 MB | 1.1 MB | PNG | WebP | 0.21 / 0.14 MB | Commercial service |
| `/projectsImg/banali/bf-img5.png` | 2048×1299 | 3.5 MB | 1.0 MB | PNG | WebP | 0.18 / 0.12 MB | 4 pages incl. `/portfolio/` |
| `/projectsImg/banali/bf-img3.png` | 2049×1299 | 2.9 MB | 0.9 MB | PNG | WebP | 0.16 / 0.11 MB | Homepage, Banali, commercial service |
| `/small-house-interior-designs.png` | 1536×1024 | 2.4 MB | 0.8 MB | PNG | WebP | 0.17 / 0.10 MB | `/blogs/`, small-home post |
| `/modular-kitchen.png` | 1536×1024 | 2.0 MB | 0.6 MB | PNG | WebP | 0.12 / 0.08 MB | `/blogs/`, kitchen-cost post |
| `/projectsImg/etna/sr-img14.webp` | 6144×3456 | 1.4 MB | 1.4 MB | WebP | WebP ≤2000 px | 0.30 / 0.18 MB | Etna project |
| `/bright-hero-video.mp4` | video | 5.0 MB | 5.0 MB | MP4 | Re-encode (H.264/H.265 at ~1–1.5 MB), `preload="metadata"`, poster image | not measured | Homepage hero |

### Page weight (images in prerendered HTML)

| Page | Served now | Estimated after WebP ≤2000 px | Eager (non-lazy) images |
|---|---|---|---|
| `/portfolio/vara-prasad-bachupally-interior-design-project-hyderabad/` | 59.2 MB | ~2.5 MB | 5 of 20 |
| `/` | 23.6 MB | ~3.3 MB | **82 of 82** |
| `/services/office-interior-designers-in-hyderabad/` | 22.7 MB | ~0.7 MB | 5 of 8 |
| `/services/home-interior-designs-hyderabad/` | 22.6 MB | ~0.8 MB | 5 of 8 |
| `/services/` | 22.3 MB | ~0.9 MB | 4 of 8 |
| `/services/2d-3d-interior-design-services-in-hyderabad/` | 16.6 MB | ~0.5 MB | 5 of 8 |
| `/portfolio/etna-by-phoenix-…/` | 8.7 MB | ≤3.0 MB (conservative) | 5 of 16 |
| `/portfolio/banali-foods-…/` | 7.4 MB | ~1.1 MB | 5 of 9 |
| `/portfolio/rajapushpa-…/` | 7.3 MB | ≤3.7 MB (conservative) | 5 of 19 |
| `/services/commercial-interior-designers-in-hyderabad/` | 7.2 MB | ~1.0 MB | 5 of 8 |
| `/portfolio/` | 6.6 MB | ~1.3 MB | 6 of 15 |

No `<img>` on any page has `width` and `height` attributes. Under throttled mobile emulation (9 Mbps, 4× CPU slowdown), the homepage didn't reach the `load` event within 180 s.

### Implementation strategy (existing architecture, no new dependencies)
1. **Conversion script.** Add `scripts/optimize-images.mjs` using `sharp`. It writes `.webp` files next to the originals at 2000 px max width, plus a 1000 px variant for cards. Run it once and commit the output; keep the originals out of `public/` (e.g. in `assets-src/`) so 271 MB stops being deployed.
2. **Data paths.** Point the paths in `ProjectsData.ts`, `servicesData.ts`, `designsData.ts`, `blogsData.ts` and the sections to the `.webp` files. Every image goes through these data files and a few components, so this is a data change, not a layout change.
3. **Markup** (in the components that render images):
   - `loading="lazy"` and `decoding="async"` below the fold
   - `fetchpriority="high"` on each page's main image
   - `width`/`height` attributes from the measured dimensions
   - `srcset` with the 1000 px and 2000 px variants
4. **Panorama.** Produce a 4096×2048 WebP and load it only when the 360° section is visible or clicked.
5. **Hero video.** Re-encode it, add a poster image and `preload="metadata"`.
6. **Build plugin.** Once sources are WebP, restrict `vite-plugin-image-optimizer` (or turn it off for `public/`) so builds stop recompressing 271 MB.
7. **Visual QA.** Take screenshots of the homepage, 4 service pages and 3 project pages before and after at desktop and mobile widths. Check gallery crops (`object-cover`) are unchanged. Run `seo:check`, which verifies image sitemap URLs.
8. **Release.** Ship this as its own deploy, after the SEO fixes, so any visual regression is isolated.

## 5. Top Interior Designer landing page (`/top-interior-designer-in-hyderabad/`)

| Question | Finding |
|---|---|
| History | **New URL.** No Internet Archive captures for the singular or plural form, so it never existed on WordPress and inherited no links. Created 22 Oct 2026. The old WordPress page was `/top-luxury-interior-designers-in-hyderabad/`, which now correctly canonicalises to the luxury page. |
| Copy source | Comment in `TopInteriorDesignerPage.tsx`: copy from the supplied "Interior Designers in Hyderabad" **homepage-copy PDF** (seo-2.pdf) |
| Keyword intent | The same head term as the homepage. "interior designers in hyderabad" appears 26 times (plus "interior designer in hyderabad" 8 times) versus once on the homepage. The H1 "Interior Designers in Hyderabad for Homes Offices and Luxury Spaces" nearly repeats the homepage H1. Only 8 mentions of "top interior". |
| Does it compete with the homepage? | Yes, in intent. Text overlap is low (6.5% shared 5-word phrases), so it isn't duplicate content. But it's a 3,240-word page aimed squarely at the homepage's main keyword, while the homepage has 390 words. Google may rank this page instead of the homepage for that keyword, or switch between them. |
| Unique search value | The section "How to Choose a Top Interior Designer in Hyderabad" and the cost-scope section are distinct. The service, process and project sections repeat material that exists on the service and luxury pages. |
| Internal links | **None.** No page links to it; it's reachable only from the sitemap. |
| Title / description | Fixed in this release: they no longer copy the homepage. The new title targets "Top Interior Designers in Hyderabad". The H1 still targets the homepage term, so title and H1 don't match. |
| Canonical / indexing | Self-canonical, indexable. The plural alias canonicalises to it. Correct for now. |

**Recommendation:**
- **Keep it, indexable, in this release, with the corrected metadata.** It is low-risk and has no history to lose.
- **Do not add a redirect or noindex now.**
- **Target state, after 4–6 weeks of Search Console data: consolidate.** The copy was written for the homepage and the homepage is the thin page.
  - **If** the Performance report shows `/` and this URL swapping for "interior designers in hyderabad" queries: move its distinct sections onto the homepage and 301 both URLs (singular and plural) to `/`.
  - **If** it earns its own "top / best interior designer" queries without hurting the homepage: keep it, differentiate it, and link to it from the homepage and blog.
    - **Differentiate:** re-angle the H1 and opening to "top interior designers in Hyderabad: how to choose", and cut the sections that repeat the service pages.
- Removal or redirect needs your approval.

## 6. Production deployment readiness: test results

All results are from the project working tree on 2 November 2026:

| Check | Result |
|---|---|
| `npx tsc -b` | Pass (exit 0) |
| `npm run build` | Pass. 44 routes prerendered. Only a Vite chunk-size warning, which predates this work. |
| `npm run seo:check` (production build) | **Pass.** 43 pages, 34 internal link targets, 71 redirects, 0 failures. Checks cover canonicals, metadata, sitemap URLs, image sitemap URLs, robots.txt, structured data, noindex, H1 count, duplicates, internal links and the redirect table. |
| Same validator against the live site before the fixes | 152 failures (baseline in `SEO_FIXES.md`) |
| Rendered DOM (headless Edge, 10 pages) | 1 title, 1 description, 1 trailing-slash canonical, 1 H1 each; content rendered, no 404 page |
| `npm run lint` | 6 errors, **all in `src/entry-server.tsx`**: one `@ts-ignore` (should be `@ts-expect-error`) and five `any` types. That file has **no changes** in the working tree; its only commit is `b85530c` (7 Oct). Linting the committed HEAD copy gives the same 6 errors, so they are pre-existing and unrelated. Left alone. |

## 7. Deployment checklist

1. [ ] Sign-off on the Top Interior Designer page title and description (§5).
2. [ ] Decide on the `progressiveChunkSize: Infinity` change (§2.2). If approved, apply it, then run `npm run build && npm run seo:check`, and check `grep -c 'hidden id="S:' dist/about/index.html` is `0`.
3. [ ] Decide on the 7 same-topic blog redirects (§3). If approved, add them to `vercel.json` and re-run `seo:check`.
4. [ ] Review the diff (`git diff`) and commit on `ssg-migration`. Suggested split: canonical + links; sitemaps + prerender; content and metadata fixes; validator + docs.
5. [ ] Push and let Vercel build a **preview** deployment.
6. [ ] Run `node scripts/validate-seo.mjs --base=https://<preview-url>`. Expect "All SEO checks passed". This checks the real Vercel redirect and trailing-slash behaviour.
7. [ ] Spot-check the preview in a browser: homepage, `/about/`, a service page, a portfolio page, `/contact/` (form), and the navbar and footer links.
8. [ ] Confirm which branch Vercel uses for production (live currently matches `ssg-migration`). Promote the preview to production.
9. [ ] Run `node scripts/validate-seo.mjs --live` straight after the deploy.
10. [ ] Spot-check with curl: `curl -sI https://www.brightarenainteriors.com/about` → `308 → /about/`; `curl -s https://www.brightarenainteriors.com/about/ | grep canonical` → `…/about/`.
11. [ ] Start the Search Console actions (§9).

## 8. Rollback strategy

- **Instant rollback:** in Vercel → Deployments, choose the previous production deployment → **Promote to Production** (or `vercel rollback`). This needs no rebuild and restores the exact previous output, including the old `vercel.json`. Note the current production deployment ID before promoting, so you know where to roll back to.
- **Code rollback:** `git revert <commit(s)>` on `ssg-migration` and redeploy. Because the work is split into logical commits, a single area (e.g. the redirects) can be reverted alone.
- **When to roll back:** broken pages or navigation, failed assets, or the contact form failing. Don't roll back over search metrics in the first weeks: rankings react slowly. A rollback would bring back the canonical conflict and the soft-404 issues, and resetting Google's signals twice is worse than waiting.
- **Low-risk parts:** canonicals, internal links, redirects and sitemaps are static output with no runtime state, and no data is migrated. Rollback is fully reversible.

## 9. Google Search Console actions after deployment

The full procedure is in `GOOGLE_SEARCH_CONSOLE_CHECKLIST.md`. In order:

1. **URL Inspection → Test Live URL** on `/`, the 4 service pages, the 5 location pages and `/about/`. Confirm the HTML has a trailing-slash canonical and the page's own description. **Request indexing** for each one whose last crawl was before 7 Oct 2026, or whose Google-selected canonical is wrong.
2. **Resubmit the sitemaps:** `sitemap.xml`, `blog-sitemap.xml`, `image-sitemap.xml`. Remove any old WordPress sitemaps still listed.
3. **Indexing → Pages:** export "Not found (404)", "Soft 404", "Page with redirect" and "Duplicate, Google chose different canonical". Use the 404 and soft-404 exports with **Links → Top linked pages** and **Performance (before June 2026)** to make the blog restore-or-404 decisions in §3.
4. **Performance:** compare four periods: WordPress (before 30 Jun), single-page app (30 Jun – 6 Oct), prerendered with the canonical conflict (7 Oct – deploy), and fixed (after deploy). Check whether `/` and `/top-interior-designer-in-hyderabad/` swap for "interior designers in hyderabad" queries (the §5 decision).
5. **Validate fix** on the canonical and duplicate reasons once the deploy is live.
6. Re-check at 2, 4 and 8 weeks. Recovery depends on Google re-crawling and should not be expected immediately.
