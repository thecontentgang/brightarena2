# SEO Migration Plan and Result

## Metadata

`src/lib/seo.ts` contains the rules from the Vite `SEO.tsx`, unchanged: an explicit prop wins, then the `src/data/pages.ts` entry, then the site default. It also applies the trailing-slash canonical rule, the BlogPosting/LocalBusiness choice and the `noindex, follow` behaviour.

- Head tags are built by `buildMetadata(path, props)`, called from each route's `metadata` export or `generateMetadata`. That function emits: `title` (absolute), description, author, keywords, canonical, robots (only when noindex), `og:type/title/description/image/url/site_name`, `twitter:creator/card/title/description/image`, and `twitter:url` (through `metadata.other`, since the Metadata API has no field for it).
- The body tags come from `<SEO path … />`, which renders the JSON-LD and the hidden `sr-only` H1. It takes the same inputs, so head and body always agree.
- The layout carries `metadataBase`, the favicon, the apple-touch-icon link, Google site verification and `theme-color`, all copied from `index.html`.
- Extra JSON-LD: BreadcrumbList (layout Breadcrumb, every page except `/`), and FAQPage on the Luxury and Top-Interior-Designer pages.
- Hidden H1s behave as before. The Luxury and Top pages pass `injectH1={false}` and render their own visible H1.
- `/blogs/art-of-biophilic-design/` has `noindex, follow` and is excluded from every sitemap, as before. The validator enforces both.
- Aliases canonicalise as before: `/top-luxury-…` → `/luxury-…/` and `/top-interior-designers-…` → `/top-interior-designer-…/`.

## Verification

`pnpm seo:compare` diffs every Vite page in `../dist` against the same Next.js URL. It compares the title, description, keywords, author, canonical, robots, every `og:*` and `twitter:*` tag, the set of JSON-LD objects, the H1 texts, the visible text, the internal links and the image URLs:

```
Compared 43 Vite pages with http://localhost:52921
No differences in metadata, JSON-LD, H1s, visible text, links or images.
```

`pnpm seo:check` is the Vite validator ported to HTTP. It checks real status codes and headers, and adds tag-count checks against duplicates, JSON-LD type checks, slashless→slash 308s, real 404s and live redirect checks:

```
Sitemaps: /sitemap.xml 34 URLs, /blog-sitemap.xml 6 URLs, /image-sitemap.xml 14 URLs / 107 images
Checked 43 pages, 34 internal link targets, 71 redirects.
All SEO checks passed.
```

## Redirects: one authoritative source

- `redirects.ts` holds all 71 entries, generated from `vercel.json` (sources, destinations and `permanent: true` unchanged). `next.config.ts` `redirects()` is the only place they are configured. It works with `next start`, on Vercel and on any other Node host. The Next.js app deliberately has no `vercel.json` redirects, so nothing is defined twice.
- Every source returns **308** with the exact destination. Every destination returns 200. There are no duplicate sources and no chains (sources ∩ destinations = ∅).
- `trailingSlash: true` is the same policy as before. A slashless legacy URL (e.g. `/contact-us`) first gets the trailing-slash 308 and then the redirect. That is the same two-hop order as Vercel's `trailingSlash` + `redirects`, and the validator checks it for all 71.
- `cleanUrls: true` is emulated with three extra redirects (`/index.html`, `/:path+/index.html`, `/:path+.html` → slash URL). The Next.js app emits no `.html` files, so these only keep old `.html` links working.
- Cache headers: the Vite rule targeted `/assets/*`, its hashed bundle folder. In Next.js the hashed bundles live under `/_next/static/*`, which Next.js already serves with `public, max-age=31536000, immutable`. Public files keep the host's default caching, as before.

## Sitemaps and robots.txt

`src/lib/sitemaps.ts` is `scripts/generate-sitemaps.ts` ported unchanged (same data sources, URL list, priorities and XML). It is served by `force-static` route handlers that are generated at build time. The output was compared with the Vite `public/` files: **all four are byte-identical**. All URLs use https, www and a trailing slash, every listed URL returns 200, and all 107 image URLs return 200. There is no `<lastmod>`, as before.

## Fonts

`next/font/local` self-hosts the same files: `OrangeAvenueDEMO-Regular.otf` as "TT Bakers" (`font-primary`) and `TT_Bakers_Trial_Bold.ttf` as "TT Bakers Bold" (`font-primary-bold`). `next/font/google` self-hosts Inter (variable weight, `font-secondary`). The originals remain in `public/font/` (including the unused `TT_Bakers_Trial_Regular.ttf`). Screenshot pixel-diffs against the Vite build at 1440, 820 and 390 px wide showed 0.00% difference on 8 pages.

## Images

See README.md §Images. `scripts/optimize-images.mjs` reproduces `vite-plugin-image-optimizer` with the same sharp version and settings. Result: 104 images, 258.8 MB → 89.1 MB (66%), and **every file is byte-identical to the Vite `dist/` output**. Pages keep plain `<img>` elements, so layout, loading and quality match production exactly. Moving to `next/image` would give further savings (AVIF, responsive sizes) but changes rendering. It is left as a follow-up, and the 37 `@next/next/no-img-element` lint warnings mark each candidate.
