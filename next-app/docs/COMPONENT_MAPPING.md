# Component Mapping

All 49 component modules and 4 data modules were copied byte-for-byte and then changed only as listed below. `src/pages/` became `src/views/`, because Next.js would treat a `src/pages/` folder as the Pages Router. Page content (text, headings, image references, links) is unchanged. The rendered visible text was compared with the Vite build for all 43 pages and is identical (`pnpm seo:compare`).

## Architecture

```
src/app/layout.tsx  (Server)   html/body, fonts, site-wide metadata, skip link, noscript
 ├─ Navbar, FloatingSocialBar, Breadcrumb            (client)
 ├─ <main> PageTransitionLayout (client) → {route page}
 └─ Footer                                           (client)

src/app/**/page.tsx (Server)   metadata (buildMetadata) + <SEO/> (JSON-LD + hidden H1) + view
src/views/**, src/sections/** (client)  the original page components
```

Route files, the layout, `SEO`, `JsonLd`, the SEO libraries, the sitemap handlers, every data module and `ArtOfBiophilicDesign` are Server Components. Every component that uses state, effects, Framer Motion, GSAP, Lenis, Three.js/OGL, event handlers or modals is a client component (`"use client"`). Client components are still server-rendered, so all content is in the HTML.

## Per-file changes

| Vite file | Next.js file | Change |
|---|---|---|
| `App.tsx` | `app/layout.tsx` + `app/**/page.tsx` | `<Routes>` replaced by file-system routes. `React.lazy` route splitting is replaced by Next.js's automatic per-route code splitting |
| `main.tsx`, `entry-server.tsx`, `index.html` | `app/layout.tsx` | head tags moved to the `metadata`/`viewport` exports, body markup moved to the layout. `HelmetProvider`, `BrowserRouter` and `StaticRouter` removed |
| `components/SEO.tsx` | `lib/seo.ts` + `components/SEO.tsx` | resolution logic ported unchanged. Head tags now come from the Metadata API (`buildMetadata`); the component renders only JSON-LD and the `sr-only` H1, in the same DOM position |
| `components/BreadCrumb.tsx` | same | `useLocation` → `usePathname`, Helmet JSON-LD → `<JsonLd>`, `Link to` → `href` |
| `components/PageTransitionLayout.tsx` | same | `useLocation` → `usePathname`; `cloneElement(children, {location})` → `{children}` (see below) |
| `components/ProjectModal.tsx` | same | `import.meta.env.VITE_EMAILJS_*` → `process.env.NEXT_PUBLIC_EMAILJS_*` |
| `components/Navbar.tsx`, `Footer.tsx`, `blog/NextPostCTA.tsx` | same | `react-router-dom` `Link to` → `next/link` `href` |
| `components/blog/*` | same | `"use client"` added (they use Framer Motion / refs) |
| `sections/HeroSection, AboutSection, ServicesSection` | same | `useNavigate()` → `useRouter().push()` |
| `sections/ProjectsSection, ProjectShowcase` | same | `Link` swap |
| `pages/ServiceDetails, ProjectDetails` | `views/…` | `useParams()` → `slug` prop; `<SEO>` props moved to `lib/routeSeo.ts` |
| `pages/DesignDetails` | `views/DesignDetails` | `useParams()` → `slug` prop; `navigate(…, {replace})` → `router.replace()`; SEO values → `designSeoProps()` |
| `pages/blogs/*` (6 articles) | `views/blogs/*` + `views/blogs/meta/*.meta.ts` | the inline `post`/`seo` objects were hoisted unchanged into `.meta.ts` modules so the route metadata can read them; `"use client"` added |
| `pages/LuxuryPage`, `TopInteriorDesignerPage` | `views/…` + `views/meta/*.meta.ts` | `PAGE_URL/TITLE/DESCRIPTION/H1` hoisted to meta modules; FAQ JSON-LD via `<JsonLd>` instead of Helmet |
| `pages/AboutPage` | `views/AboutPage` | the one internal `<a href="/portfolio/">` is now `<Link>` (`@next/next/no-html-link-for-pages`) |
| `pages/NotFoundPage` | `views/NotFoundPage` + `app/not-found.tsx` | `Link` swap; SEO moved to `not-found.tsx` |
| All other pages and sections | `views/…`, `sections/…` | `<SEO>` element moved to the route file; `Link` swap |
| 20 JSX text nodes in 13 files | same | `'` → `&apos;` and `"` → `&quot;` (`react/no-unescaped-entities`). The rendered text is identical |
| `index.css` | `app/globals.css` + `app/fonts.ts` | fonts loaded via `next/font` (see SEO_MIGRATION_PLAN.md §Fonts) |

## Page transition (five-tile GSAP)

The tiles, colours, logo pulse (Framer Motion), timing (0.6 s in with 0.1 s stagger, logo fade, 0.6 s out), click blocking and the scroll reset at the covered midpoint are unchanged. The animation runs whenever `usePathname()` changes, including browser back/forward. It does not run on a direct load or refresh. Browser test: tiles mid-sweep at 450 ms (`scaleX` 0.79 / 0.12 / 0.01 …), URL changed client-side with no full reload, `scrollY` 0 afterwards, and back/forward restored the correct pages and titles.

## Shared data

`views/ProjectsData.ts`, `views/designsData.ts`, `views/blogsData.ts`, `views/data/servicesData.ts` and `data/pages.ts` are unchanged. The pages, `generateStaticParams`, the metadata and the sitemaps all import them.
