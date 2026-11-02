# SEO Fixes

All changes are uncommitted on branch `ssg-migration` and **not deployed**. Findings and evidence are in `SEO_AUDIT_REPORT.md`.

URL policy enforced everywhere: `https://www.brightarenainteriors.com` + path + trailing slash. It matches `vercel.json` (`trailingSlash: true`), the old WordPress URLs, the sitemap and the existing redirects.

## Changes

### 1. Canonical URLs always end in a slash (Critical)
- **File:** `src/components/SEO.tsx`
- **Before:** `finalUrl = url || pageData.canonical || …`. A page's `url` prop won, and 31 pages passed slashless URLs, e.g. `/about`. Those 308-redirect back to the page, so the canonical pointed at a redirect. `og:url`, `twitter:url` and the blog schema `url` carried the same value.
- **After:** the chosen URL is normalised to end in `/` at the single point where every canonical is emitted. All 43 pages now have a self-referencing, 200-status canonical. The two alias URLs still point at their primary page.
- **Why here:** one choke point covers every current and future page. The 31 `url` props were left as they are; they're now harmless.

### 2. Internal links point at final URLs (Critical)
- **Files:** `Navbar.tsx`, `Footer.tsx`, `BreadCrumb.tsx`, `NextPostCTA.tsx`, `AboutSection.tsx`, `HeroSection.tsx`, `ProjectShowcase.tsx`, `ProjectsSection.tsx`, `ServicesSection.tsx`, `AboutPage.tsx`, `BlogPage.tsx`, `ContactPage.tsx`, `DesignDetails.tsx`, `DesignsPage.tsx`, the five location pages, `LuxuryPage.tsx`, `TopInteriorDesignerPage.tsx`, `ProjectDetails.tsx`, `ProjectsPage.tsx`, `ServiceDetails.tsx`, `ServicesPage.tsx`, `TestimonialPage.tsx`, `servicesData.ts` (one link inside article copy)
- **Before:** 35 of 36 internal link targets were slashless and went through a 308 on every crawl.
- **After:** every `to=`, `href=`, `path:` and `navigate()` target ends in `/`. Route definitions in `App.tsx` are unchanged; React Router matches both forms. 0 internal links redirect.

### 3. Duplicate of the homepage's title and description (High)
- **Files:** `src/pages/TopInteriorDesignerPage.tsx`, `src/data/pages.ts` (2 matching registry entries)
- **Before:** `/top-interior-designer-in-hyderabad/` (and the plural alias) used the homepage's exact title and description.
- **After:**
  - **Title:** "Top Interior Designers in Hyderabad | Bright Arena Interiors"
  - **Description:** "Hyderabad interior design studio for homes, luxury spaces, offices and commercial projects, with 2D and 3D planning before work begins. Explore Bright Arena's work."
  - The H1, copy and URL are unchanged.
- **Please review:** this is new copy on a page whose metadata came from the client's PDF. Edit the wording freely. It only has to stay different from the homepage's.

### 4. Blog post in the sitemap returned 404 (High)
- **File:** `scripts/prerender.js`
- **Before:** `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/` had a route, a sitemap entry and an inbound link, but wasn't in the prerender list, so Vercel served `404.html` with status 404.
- **After:** the page is prerendered and returns 200 with its own metadata.

### 5. Broken "Read next" links (High)
- **Files:** `SmallHomeInteriorDesignIdeas.tsx`, `ModularKitchenCostInHyderabadCompleteGuide2026.tsx`
- **Before:** one link went to `/blogs/perfect-minimalist-living-room/` (never existed, 404). One went to the "CONTENT REQUIRED" placeholder.
- **After:** the first now points to the living-room ideas post and the second to the small-home ideas post, both live.

### 6. Placeholder page kept out of the index (High)
- **Files:** `src/components/SEO.tsx` (new optional `noindex` prop), `src/pages/blogs/ArtOfBiophilicDesign.tsx`
- **Before:** `/blogs/art-of-biophilic-design/` was indexable, with the body text "CONTENT REQUIRED".
- **After:** `<meta name="robots" content="noindex, follow">`. Remove the prop when the article is written, and add the post to `blogsData.ts` so it reaches the sitemap.

### 7. Redirects for old URLs with an exact equivalent (High)
- **File:** `vercel.json` (+9 permanent redirects, 62 → 71)
- **Before:** these WordPress URLs returned 404:

| Old URL | New URL |
|---|---|
| `/services/home-interior-design/` | `/services/home-interior-designs-hyderabad/` |
| `/services/home-interior-designers-in-hyderabad/` | `/services/home-interior-designs-hyderabad/` |
| `/services/commercial-interior-design/` | `/services/commercial-interior-designers-in-hyderabad/` |
| `/services/office-interior-design/` | `/services/office-interior-designers-in-hyderabad/` |
| `/services/2d-and-3d-virtual-design/` | `/services/2d-3d-interior-design-services-in-hyderabad/` |
| `/our_portfolio/mr-nageswara-rao/` | `/portfolio/mr-nageswara-rao/` |
| `/our_portfolio/sammys-villa/` | `/portfolio/sammys-villa-bangalore/` |
| `/our_portfolio/rakesh-bhupathi/` | `/portfolio/rakesh-bhupathi-nagole/` |
| `/our_portfolio/praveen-aparna-zenith-nallagandla/` | `/portfolio/praveen-aparna-zenith/` |

- **Not redirected on purpose:** old URLs with no equivalent page stay 404, which is correct for removed content. Redirecting them to an index page would be another soft 404.

### 8. Sitemaps (Medium)
- **Files:** `scripts/generate-sitemaps.ts`, regenerated `public/sitemap.xml`, `public/blog-sitemap.xml`, `public/image-sitemap.xml`
- **Before:** every `<lastmod>` was the build timestamp, so every URL looked modified on every deploy and Google learns to ignore the field.
- **After:** `<lastmod>` is omitted (it's optional). No accurate per-page date exists at build time, and Vercel's shallow clone makes git dates unreliable.

### 9. Etna gallery images that don't exist (Medium)
- **File:** `src/pages/ProjectsData.ts`
- **Before:** the gallery generated `sr-img1..16.webp`, but 2, 8, 11 and 15 aren't in `public/projectsImg/etna/`. That meant broken images on the project page and 404s in `image-sitemap.xml`.
- **After:** the gallery lists only the 12 files that exist.

### 10. Blog structured data (Medium)
- **File:** `src/components/SEO.tsx`
- **Before:** three posts emitted `BlogPosting` with business `telephone` and `address` and no `headline`. Three others emitted `LocalBusiness`.
- **After:** every `/blogs/<post>/` page emits a `BlogPosting` with `headline`, `description`, `image`, `url`, `mainEntityOfPage`, and the organisation as `author` and `publisher`. `datePublished` was not added, because the dates in `blogsData.ts` need confirming first. Other pages keep the same `LocalBusiness` entity as before.

### 11. Default social image (Medium)
- **File:** `src/components/SEO.tsx`
- **Before:** the `og:image` and `twitter:image` fallback `/og-image.jpg` returned 404 on all pages.
- **After:** the fallback is `/bright-logo.jpg` (exists, 83 KB). Replace it with a 1200×630 brand image when one is available.

### 12. One H1 on the contact page (Low)
- **File:** `src/pages/ContactPage.tsx`
- **Before:** two `<h1>`s: the SEO heading and the visible "Let's build something beautiful."
- **After:** the visible headline is an `<h2>`. Its styling comes from classes, so it looks the same.

### 13. Favicon type (Low)
- **File:** `index.html`
- **Change:** `type="image/svg+xml"` → `type="image/webp"`, which matches the actual file.

### 14. Automated SEO validator (new)
- **Files:** `scripts/validate-seo.mjs`, plus the `npm run seo:check` script in `package.json`
- **What it checks** (in the HTML as served, with no JavaScript):
  - robots.txt
  - every sitemap URL returns 200, and every image URL too
  - exactly one title, description and canonical per page
  - the canonical follows the URL policy and returns 200
  - `og:url` = canonical, and `og:image` exists
  - no unintended noindex, and placeholders are noindexed and kept out of sitemaps
  - one H1 per page
  - valid JSON-LD
  - unique titles and descriptions
  - every internal link returns 200 without a redirect
  - `vercel.json` redirects: no chains, duplicates or shadowed pages, and every destination is a built page
- **How to run:**

```bash
npm run build && npm run seo:check                    # production build in dist/
node scripts/validate-seo.mjs --live                  # live site, after deploying
node scripts/validate-seo.mjs --base=https://<preview>.vercel.app   # a Vercel preview
```

## Tests performed

| Test | Result |
|---|---|
| Validator against **live production, before the fixes** (baseline) | **152 failures**: 31 canonicals not matching the policy, 31 canonicals → 308, 35 redirecting internal links, 1 sitemap URL 404, 46 image 404s (42 og:image + 4 image sitemap), 3 bad BlogPosting, 2 duplicate title/description pairs, 1 double H1, 1 indexable placeholder |
| `npx tsc -b` | Pass |
| `npm run build` (sitemaps → tsc → client build → SSR build → prerender of 44 routes) | Pass |
| `npm run seo:check` on the new `dist/` | **Pass**: 43 pages, 34 internal link targets, 71 redirects, 0 failures |
| Headless Edge render of the production build (`vite preview`) for 6 pages, including the formerly 404 blog post | Each: 1 title, 1 description, 1 canonical with trailing slash, 1 H1, page content rendered (not the 404 page) |
| Spot-check of built HTML | `/about/` canonical `…/about/`; plural alias canonical → singular page; placeholder has `noindex, follow`; blog posts have a `BlogPosting` with `headline` |
| `npm run lint` | 6 errors, **all in `src/entry-server.tsx`, a file this work did not touch** (pre-existing `any` and `@ts-ignore`). No new lint errors. |
| Unit or integration tests | The project has none |

Not tested: real Googlebot behaviour, Search Console data, and Core Web Vitals field data. These need access this audit didn't have.

## Remaining issues (not changed, need a decision or approval)

1. **Lost content.** About 53 old blog posts and 17 old project pages are gone. 20 blog URLs redirect to `/blogs/` and 41 old URLs 404. Use Search Console (Links and Performance reports for the pre-migration period) to find the old URLs that had traffic or backlinks, then restore that content (Wayback has copies) or redirect to a genuinely equivalent page.
2. **Unconfirmed mapping.** `/our_portfolio/mr-haseeb-mohammed/` probably equals `/portfolio/haseeb-my-home-bhooja/`. Confirm before adding the redirect.
3. **Image weight.** The homepage loads 23.5 MB of images (a 14.7 MB PNG among them), with no lazy loading; one project page loads 59 MB. Convert `public/projectsImg` PNGs to WebP or AVIF at ≤2000 px and add `loading="lazy"` below the fold. This touches many assets, so it needs your approval.
4. **Hydration.** Commit `2ee5131` replaced `hydrateRoot` with `createRoot`, so the prerendered page is discarded and rebuilt in the browser. Find out why (probably hydration-mismatch errors) before restoring it.
5. **Keyword overlap with the homepage.** `/top-interior-designer-in-hyderabad/` competes with the homepage for "interior designers in Hyderabad". Decide whether to differentiate it or 301 it to `/`.
6. **Thin pages.** The homepage (about 330 unique words) and the portfolio and design detail pages (about 20–60 unique words each). `docs/seo/homepage-seo-copy.source.tsx.txt` already holds prepared copy.
7. **Two metadata sources.** About 25 `pages.ts` titles never render because component props override them. Choose one source.
8. **Smaller items:**
   - 27 titles over 60 characters and many descriptions over 160
   - hidden (`sr-only`) H1s
   - nested `<main>`
   - "JavaScript is Required" noscript text on prerendered pages
   - `/apple-touch-icon.png` 404
   - 207 KB favicon
   - alias URLs served as 200 + canonical rather than 301
   - blog author names in `blogsData.ts` should be confirmed as real people
