# SEO Audit

Target: Next.js production build (`next start`). Reference: the Vite build (`../dist`). Every result below comes from a command that was actually run on 2026-11-13.

| Area | Status | Evidence |
|---|---|---|
| Metadata on all 43 pages | **PASS** | `pnpm seo:compare`: 0 differences from Vite in title, description, keywords, author, canonical, robots, og:\*, twitter:\* |
| Uniqueness | **PASS** | 41 unique titles, descriptions and canonicals across 43 pages. The two shared values are the intentional aliases (`/top-luxury-…` → `/luxury-…/`, `/top-interior-designers-…` → `/top-interior-designer-…/`) |
| Canonicals | **PASS** | Every page has exactly one canonical: https, www, trailing slash; the target returns 200; it equals og:url |
| Robots / indexability | **PASS** | Only `/blogs/art-of-biophilic-design/` has `noindex, follow` (intended, and absent from all sitemaps). No `X-Robots-Tag` headers. `robots.txt` allows everything and lists 3 sitemaps |
| Open Graph / Twitter | **PASS** (with a recommendation) | One each of og:title/description/image/url/type/site_name and twitter:card/title/description/image/url per page. The og:image (`/bright-logo.jpg`) returns 200. Every page uses the same logo image, as in Vite (recommendation: page-specific OG images) |
| Favicon | **WARNING** | `/bright-logo.webp` loads (200). `/apple-touch-icon.png` is referenced but missing, in both apps |
| H1 | **PASS** | Exactly 1 `<h1>` per page (validator). The H1 text is identical to Vite on all 43 pages (hidden H1s where the original used them) |
| Heading hierarchy | **PASS after F3** | Before: h2→h4 skip in the footer (43 pages) and in testimonial cards. Fixed by changing h4 to h3 (no visual change) |
| Structured data | **PASS** (with a recommendation) | All JSON-LD parses. Types per page: LocalBusiness (36), BreadcrumbList (42; every page except the home page), BlogPosting (7), FAQPage (4). Required properties are present (LocalBusiness name/address/telephone/url/image/@id; BlogPosting headline/image/author/publisher/mainEntityOfPage; FAQ Question + acceptedAnswer). No duplicate types per page. The business details are consistent (one `@id`, the address matches the footer and contact page). Recommendation: BlogPosting has no `datePublished` (N12) |
| Breadcrumb targets | **PASS after F1** | Every BreadcrumbList item URL returns 200, except the 404 page's own crumb. That crumb pointed at `/_not-found/` (a migration regression) and now matches Vite's `/404/` |
| Sitemaps | **PASS** | `/sitemap.xml` 34 URLs, `/blog-sitemap.xml` 6, `/image-sitemap.xml` 14 URLs / 107 images. All four files are byte-identical to the Vite output. Every URL is https + www + trailing slash and returns 200. All 107 image URLs return 200. No noindex pages, no alias URLs, no `<lastmod>` |
| Redirects (71) | **PASS** | Each source returns **308** with the exact destination, and each destination returns 200. No duplicates, no loops, no chains (no destination is also a source). The slashless form of each source returns 308 → slash form → destination. A single source of truth: `next.config.ts` |
| Trailing-slash policy | **PASS** | Slashless page URLs return 308 to the slash form. `/sitemap.xml` and `/robots.txt` keep their file URLs |
| 404 handling | **PASS** | Unknown URLs and unknown dynamic slugs (`/services/not-a-real-service/`) return a real **404** with the NotFoundPage design |
| Internal links | **PASS** | 34 distinct internal link targets, all 200 (validator). Click-through tests of the navbar (8 links), footer (9) and logo all route client-side to the correct page |
| Orphan pages | **WARNING** | No internal link points to `/interior-designer-{hitec-city,gachibowli,kondapur,madhapur,whitefields}/`, `/top-interior-designer-in-hyderabad/`, or the aliases. They are in the sitemap. Same in Vite (N10) |
| External links | **PASS** (one note) | WhatsApp, Instagram, YouTube and thecontentgang.com open with `target="_blank" rel="noopener noreferrer"`. One `tel:` link also has `target="_blank"` (harmless; pre-existing) |
| Meta lengths | **WARNING** | 26 titles over 60 characters and 23 descriptions over 160 characters. This is inherited copy (N11) |
| Lighthouse SEO category | see FULL_AUDIT_REPORT.md §Performance | |

## Commands run

```
pnpm seo:check     → Checked 43 pages, 34 internal link targets, 71 redirects. All SEO checks passed.   (re-run after every fix)
pnpm seo:compare   → Compared 43 Vite pages … No differences in metadata, JSON-LD, H1s, visible text, links or images.
```

Additional checks run with audit scripts outside the repository: JSON-LD property validation on 44 HTML responses, breadcrumb target status codes, the orphan-page graph built from 1,132 rendered links, external link attributes, and heading outlines.

## Not tested

- Google Rich Results Test and Search Console (external services; not called).
- How the live production domain behaves on Vercel (nothing was deployed). Run `node scripts/validate-seo.mjs --base=<preview-url>` on the first preview deployment.
