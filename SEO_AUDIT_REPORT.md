# SEO Audit Report: brightarenainteriors.com

Audit date: 2 November 2026. Branch: `ssg-migration` (live production matches commit `4058d41`).

## How this audit was done

Everything below is backed by evidence from one of these sources. Where a conclusion is an inference, it says so.

| Source | What it gave |
|---|---|
| Live crawl as Googlebot, no JavaScript, no redirect following (43 URLs + 3 sitemaps + robots.txt) | Status codes, redirects and the raw HTML metadata Google receives |
| Headless Microsoft Edge render of live pages | Metadata after JavaScript runs, i.e. what Google's renderer sees |
| Internet Archive (Wayback Machine) | The previous WordPress site's URLs, titles, descriptions, canonicals and word counts |
| Git history (`git log -p`) | When each URL, canonical, redirect and rendering change was made |
| Source code and `vercel.json` | Where metadata comes from and how URLs are served |

**Not available:**
- **Google Search Console:** there are no credentials or integration in the repo. Indexing states, Google-selected canonicals and ranking history need manual checks; see `GOOGLE_SEARCH_CONSOLE_CHECKLIST.md`.
- **PageSpeed/CrUX:** the public PageSpeed API returned `429 quota exceeded`, so there is no field data for Core Web Vitals.

## Executive summary

1. **The ranking decline is most likely caused by the WordPress → React migration, not by the canonical change on its own.**
   - **URLs:** 41 of the 86 old URLs found in the Internet Archive now return 404.
   - **Blog content:** about 60 blog posts became 7, and 20 old post URLs redirect to the blog index (Google treats these as soft 404s).
   - **Homepage:** dropped from 1,113 words to about 330 unique words.
   - **Jun 30 to Oct 7, 2026:** every URL on the site, including dead old URLs, returned HTTP 200 with the same homepage HTML.
2. **The trailing slash suspicion is confirmed, and it was a real defect.** The old WordPress site used trailing-slash canonicals. The new site has redirected slashless URLs to the slash form since 4 Oct (`vercel.json: trailingSlash: true`). Despite that, 31 of 41 live pages declared a slashless canonical, which points at a URL that 308-redirects straight back to the page. The sitemap and the redirects said one thing, and the canonical said the opposite. This weakens and slows Google's consolidation. Without Search Console data it cannot be shown to be the main cause of the drop. **Fixed.**
3. **The homepage-description problem has three causes:**
   - **The site's own history:** until 7 Oct, every URL served the homepage title and description in its HTML, and until 12 Oct the rendered page carried two descriptions with the homepage's first. Google's index still holds snapshots from that period for pages it hasn't reprocessed.
   - **A real duplicate:** `/top-interior-designer-in-hyderabad/` (and its plural alias) was publishing the homepage's exact title and description. **Fixed.**
   - **Normal snippet rewriting:** Google sometimes builds its own snippet from page text.

   The current pages are correct. Their raw HTML and rendered DOM both carry their own metadata, so this is not a live rendering bug.
4. **There is no database.** The site is static: React + Vite, prerendered at build time, hosted on Vercel. SEO metadata lives in TSX components and `src/data/pages.ts`. The only external service is EmailJS for the contact form.

## Timeline of changes that affect search

| Date | Change | Evidence |
|---|---|---|
| ≤ Dec 2025 – mid 2026 | WordPress 6.7.2 site on the same domain. All canonicals have trailing slashes, e.g. `https://www.brightarenainteriors.com/services/`. The homepage has 1,113 words and the title "Best Luxury Interior Designers in Hyderabad". | Wayback snapshots 2025-02-12, 2025-04-19, 2025-12-19; an old blog URL still returned 200 on 2026-06-16 |
| 30 Jun 2026 | React single-page app on Vercel with `rewrites: /(.*) → /index.html`. Every URL returns 200 with identical HTML: homepage `<title>` and `<meta description>`, empty `<div id="root">`, no canonical. | commit `c439c1e`; `vercel.json` history |
| 24 Jul 2026 | `<SEO>` component added. Page canonicals come from `url` props written **without** a trailing slash. | commit `dabeed1` |
| 4 Oct 2026 | `trailingSlash: true` and 62 old-URL redirects added. Most old blog posts are redirected to `/blogs/`. From now on, slashless canonicals point at 308 redirects. | commit `f13a6ea` |
| 7 Oct 2026 | Static prerendering (SSG) added and the catch-all rewrite removed. Unknown URLs now return a real 404. | commits `bb7ca78`, `b85530c` |
| 12 Oct 2026 | Sitemap switched to trailing slashes. The 5 location pages dropped their `url` props and got correct canonicals. The 31 other pages kept slashless canonicals, so sitemap and canonical have disagreed ever since. | commit `ac1b53d` |
| 13 Oct 2026 | `hydrateRoot` replaced by `createRoot`: the browser throws away the prerendered DOM and re-renders it. | commit `2ee5131` |
| 17 Oct 2026 | Homepage title and description changed. | commit `9afe3eb` |
| 22 Oct 2026 | `/top-interior-designer-in-hyderabad/` published with the homepage's exact title and description. | commit `991af11`/`4058d41` |

## Issue A: canonical URL trailing slash

**Intended URL policy:** `https://www.` + path + trailing slash. This is the only policy consistent with every other signal:
- the old WordPress canonicals
- the Vercel config (`trailingSlash: true`)
- the sitemap generator
- the canonicals in `src/data/pages.ts`
- the 62 existing redirects, all slash-terminated

Changing to slashless would mean reversing the Vercel config and every redirect, and creating a third URL set for Google. That was rejected.

**Findings from the live crawl (before the fix):**

| Check | Result |
|---|---|
| Non-www and http | `https://brightarenainteriors.com/*` and `http://` 308 → `https://www.` ✅ (`http://` takes two hops: http→https→www) |
| Slashless URL | `/about` 308 → `/about/` (200) ✅ |
| Canonical on `/about/` | `https://www.brightarenainteriors.com/about` ❌ which 308s back to `/about/` |
| Pages with a canonical pointing to a redirect | **31 of 41** (every page whose component passes a `url` prop) |
| Pages with a correct self-canonical | 8: home, 5 location pages, the luxury page and the top-interior-designer page |
| Sitemap URLs | All trailing slash, all 200 ✅, so the sitemap contradicts 31 canonicals |
| Internal links | **35 of 36** internal link targets were slashless and 308-redirected (navbar, footer, breadcrumbs, cards, CTAs) |
| `og:url` | Same value as the canonical, so also slashless |
| Redirect chains | Old slashless legacy URLs take 2 hops, e.g. `/contact-us` → `/contact-us/` → `/contact/`. Only reachable from an old slashless link. Low impact. |
| Redirect loops | None |

**Root cause:** in [SEO.tsx](src/components/SEO.tsx), `finalUrl = url || pageData?.canonical || …`. The per-page `url` prop always won over the correct slash-terminated canonical in `pages.ts`, and those props were written without a trailing slash in July, before `trailingSlash: true` existed.

**Did it cause the drop?**
- **Supported:** the conflict started on 4 Oct and was widened on 12 Oct, when the sitemap switched to slashes while the canonicals didn't. Google treats a canonical that points to a redirect as a conflicting signal, so it can delay or prevent consolidation onto the slash URL.
- **Not supported:** a redirect is a stronger signal than a `rel=canonical`, and Google normally resolves this case by indexing the redirect target (the slash URL). It does not usually cause deindexing.
- **Verdict:** a confirmed defect and a plausible contributor. It is unlikely to explain the decline by itself.
- **How to check:** in Search Console, if URL Inspection for `/about/` shows "Google-selected canonical: https://www.brightarenainteriors.com/about/" with "User-declared canonical: …/about", Google has been overriding the tag (the less harmful case). If pages show as "Alternate page with proper canonical tag" or "Page with redirect", the conflict did hurt.

## Issue B: Google shows the homepage description

**Current state, verified:** every live page has exactly one title, one meta description and one canonical in the raw HTML. The headless Edge render shows the same values after JavaScript runs. No page sets `noindex` and there are no `X-Robots-Tag` headers. Open Graph and Twitter tags mirror the standard tags and don't conflict. No canonical points to the homepage except the homepage's own.

**Why Google showed (and may still show) the homepage description:**

1. **30 Jun – 7 Oct: every URL served the homepage's metadata.** With the SPA rewrite, the HTML for `/services/office-interior-designers-in-hyderabad/` and for any dead WordPress URL was byte-for-byte the homepage. Each page's real metadata only appeared after JavaScript. Google's first-pass indexing, and any URL it didn't render, recorded the homepage title and description, and identical HTML across hundreds of URLs invites Google to fold them into the homepage as duplicates.
2. **Until 12 Oct, rendered pages carried two descriptions.** With React 19, `react-helmet-async` v3 does not replace existing head tags. It adds the page's tags and React hoists them into `<head>`, so the static `<meta name="description">` from `index.html` (the homepage's) stayed first. This is inferred from the library's documented React 19 behaviour and from the `data-ssg` fix added in `ac1b53d`; it was not observed directly.
3. **Since 22 Oct, one page really does use the homepage's metadata.** `/top-interior-designer-in-hyderabad/` and `/top-interior-designers-in-hyderabad/` shipped the homepage title and description verbatim. **Fixed** with a unique title and description; see `SEO_FIXES.md`.
4. **Normal rewriting.** Google picks snippet text per query, which is why it happens only "sometimes".

**How to tell which cause you are looking at.** Match the snippet text Google shows for an inner page:

| Snippet text shown | Era | Meaning |
|---|---|---|
| "Looking for Interior Designers in Hyderabad? Bright Arena Interiors delivers luxury home and office interiors with 14+ years…" | `index.html`, 30 Jun – 17 Oct | Stale index entry from the SPA period. Google hasn't reprocessed this URL since. |
| "Bright Arena Interiors designs personalised home, luxury, office and commercial interiors…" on a URL other than `/` | After 17 Oct | Either the `/top-interior-designer…` duplicate (now fixed), or Google has clustered the URL under the homepage. Check "Google-selected canonical" in URL Inspection. |
| "Discover the best luxury interior designers in Hyderabad…" | WordPress | A very stale result; check whether that URL now 404s. |
| Any other sentence from the page body | n/a | Normal Google snippet rewriting. Not a technical fault. |

## Issue C: other causes of the ranking decline

Ranked by the strength of evidence that they hurt rankings:

1. **Lost URLs and content from the migration (Critical).** Of 86 archived WordPress HTML URLs:
   - 11 still serve 200.
   - 12 redirect to an exact equivalent.
   - 20 redirect to `/blogs/` and 2 to `/portfolio/`. These are blanket redirects to an index page, which Google treats as soft 404s, so the ranking value of the old post does not transfer.
   - **41 return 404.** They include the old service slugs (`/services/home-interior-design/`, `/services/office-interior-design/`, `/services/2d-and-3d-virtual-design/`, …), 21 `/our_portfolio/*` project pages, `/portfolio-category/*`, and 5 blog posts.

   About 60 blog posts were reduced to 7 (one an empty placeholder). The homepage went from 1,113 words to about 330 unique words; the prepared homepage copy in `docs/seo/` was deliberately not published.
2. **Three months of identical 200 responses (Critical, historic).** See Issue B §1. Dead URLs returning 200 with homepage content are soft 404s, and real pages carried no distinct metadata without JavaScript. Fixed on 7 Oct by SSG, but recovery needs recrawling.
3. **Canonical/redirect conflict (Critical, fixed).** See Issue A.
4. **Page weight and Core Web Vitals (High, field data not available).**
   - **Homepage:** 82 `<img>` tags totalling 23.5 MB, none lazy-loaded, including a 14.7 MB PNG (`vp-img15.png`), plus a 5 MB hero video.
   - **Vara Prasad project page:** 59 MB of images.
   - **Files:** `public/` holds 29 files over 800 KB, the largest 40 MB. `vite-plugin-image-optimizer` is evidently not shrinking these, because live files match the source sizes.
   - **Re-render:** since 13 Oct, `createRoot` throws away the prerendered DOM and re-renders it, which risks layout shift and a late LCP.
5. **Thin and duplicate pages (High).**
   - **Thin pages:** portfolio and design detail pages have about 220–260 words in total, of which roughly 200 are the navbar and footer.
   - **Placeholder:** `/blogs/art-of-biophilic-design/` was an indexable page reading "CONTENT REQUIRED", linked from a live article. **Fixed with noindex.**
   - **Same keyword as the homepage:** `/top-interior-designer-in-hyderabad/` targets the homepage's main keyword with copy from the homepage brief, which is keyword cannibalisation. The metadata clash is fixed; the targeting overlap needs a business decision.
6. **Broken links and sitemap entries (High, fixed).**
   - `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/` is in `blog-sitemap.xml` and linked from another article, but returned 404 because it was missing from the prerender list.
   - `/blogs/perfect-minimalist-living-room/` was linked but never existed.
   - Four Etna gallery images in `image-sitemap.xml` (and on the page) return 404.
7. **Missing social image (Medium, fixed).** The default `og:image` `/og-image.jpg` returned 404 on every page. It doesn't affect rankings but breaks link previews.

## Technical SEO checklist

| Area | Finding | Severity | Status |
|---|---|---|---|
| Canonical tags | 31/41 point to a 308 redirect | Critical | Fixed |
| Redirects | Domain/protocol/slash redirects correct; 41 old URLs 404; 22 blanket redirects to index pages | Critical | 9 exact-match redirects added; rest needs content decisions |
| Internal links | 35/36 targets redirect | High | Fixed |
| robots.txt | `Allow: /`, lists 3 sitemaps, blocks nothing | — | OK |
| XML sitemaps | 1 URL returns 404; 4 image URLs 404; every `<lastmod>` = build time | High | Fixed (`lastmod` removed rather than faked) |
| Sitemap vs canonical | Disagreed on 31 URLs | Critical | Fixed |
| Meta robots / X-Robots-Tag | No unintended noindex | — | OK |
| HTTPS / www | Consistent | — | OK |
| Status codes | Unknown URLs return a real 404 since 7 Oct | — | OK |
| Prerendering | All 43 routes have full HTML; one sitemap route was not prerendered | High | Fixed |
| JS rendering | Rendered DOM matches raw HTML; `createRoot` re-render | Medium | Recommend restoring hydration after investigating why it was removed |
| Structured data | `LocalBusiness` with a stable `@id` on all pages ✅; `BreadcrumbList` ✅; `FAQPage` on 2 pages ✅. Blog posts carried `LocalBusiness` or a `BlogPosting` with business fields and no `headline` | Medium | Fixed |
| H1 | One per page except `/contact/` (2) | Low | Fixed |
| H1 visibility | Most pages' only H1 is a visually hidden (`sr-only`) heading injected by `<SEO>` | Medium | Not changed (design decision) |
| Image alt text | 0 images without alt on the pages sampled | — | OK |
| Titles | 27 pages exceed ~60 characters and will be truncated | Low | Not changed (existing copy preserved) |
| Descriptions | Many exceed ~160 characters | Low | Not changed |
| Favicon | Declared `image/svg+xml` but is WebP (207 KB) | Low | Type fixed |
| `apple-touch-icon.png` | 404 | Low | Open |
| `<noscript>` | Says "JavaScript is Required" on fully prerendered pages | Low | Open |
| Nested `<main>` | `App.tsx` and most pages both render `<main>` | Low | Open |
| Alias URLs | `/top-luxury-interior-designers-in-hyderabad/` and `/top-interior-designers-in-hyderabad/` return 200 with a cross-canonical | Low | Working as designed; a 301 would be a stronger signal |

## On-page summary (live, before fixes)

Every indexable page has a unique title and description, except the homepage duplicate described above. Titles and descriptions are page-specific and keyword-targeted. Content depth varies widely:

| Page group | Words in raw HTML (incl. ~200 nav/footer) | Note |
|---|---|---|
| Service detail pages | 3,800–5,000 | Strong |
| Location pages | 2,000–2,500 | Strong |
| Luxury / top-interior pages | 3,100–3,400 | Strong |
| Blog posts (4 long) | 2,700–3,600 | Strong |
| Homepage | 528 | Thin for the main money page |
| Portfolio / design detail pages | 210–260 | Thin |
| Services, portfolio and designs index pages | 210–420 | Thin |

## Database and backend audit

- **No database.** There is no Supabase, Firebase, Prisma or other client, no API route and no server runtime. `.env` contains only EmailJS keys for the contact form.
- **Where SEO metadata lives:**
  1. `<SEO title description url …>` props in each page component (the effective source for 31 pages)
  2. `src/data/pages.ts` (effective only where a page passes no props: home fallback, location pages, luxury pages)
  3. data files (`servicesData.ts`, `ProjectsData.ts`, `blogsData.ts`, `designsData.ts`) feeding detail pages
  4. `index.html` placeholders, stripped at prerender
- **Multiple sources of truth: yes.** Props silently override `pages.ts`. About 25 `pages.ts` titles never render, e.g. `/about/` is "About Bright Arena Interiors | Hyderabad Interior Designers" in `pages.ts` but "About - Bright Arena Interiors 14+ Years…" live. This override is exactly where the canonical bug lived. The canonical is now normalised at the single output point, so no source can emit a slashless canonical. The dead `pages.ts` titles were left alone so no live title changes.
- **No API returns homepage metadata and no stale SEO cache exists.** The `getPageSEO` fallback for `/blog/*` is dead code: no route renders it.
- **Slugs:** no duplicate slugs. All data-driven slugs match prerendered routes, apart from the blog route fixed above.

## Severity summary

| # | Issue | Severity | Status |
|---|---|---|---|
| 1 | Canonicals point to redirects (31 pages) | Critical | Fixed |
| 2 | Canonical/sitemap/internal-link disagreement | Critical | Fixed |
| 3 | 41 old URLs 404, 22 blanket redirects, about 53 blog posts gone | Critical | Partly fixed (9 redirects); content decisions needed |
| 4 | Stale homepage metadata in Google's index from the SPA period | Critical (historic) | Needs recrawl (GSC checklist) |
| 5 | Page duplicating the homepage title and description | High | Fixed |
| 6 | Sitemap URL returning 404 (unprerendered blog route) | High | Fixed |
| 7 | Broken internal links (2) and image-sitemap 404s (4) | High | Fixed |
| 8 | Image weight (23.5 MB homepage, 59 MB project page) | High | Open, needs approval |
| 9 | Thin homepage and detail pages | High | Open, content work |
| 10 | Indexable "CONTENT REQUIRED" placeholder | High | Fixed (noindex) |
| 11 | Same main keyword as the homepage (`/top-interior-designer-in-hyderabad/`) | Medium | Open, business decision |
| 12 | Blog schema wrong or missing `headline` | Medium | Fixed |
| 13 | Site-wide `og:image` 404 | Medium | Fixed |
| 14 | `createRoot` instead of hydration | Medium | Open |
| 15 | Build-time `lastmod` | Medium | Fixed |
| 16 | Two H1s on `/contact/` | Low | Fixed |
| 17 | Favicon MIME type | Low | Fixed |
| 18 | Long titles and descriptions, hidden H1s, nested `<main>`, noscript text, apple-touch-icon 404 | Low | Open |
