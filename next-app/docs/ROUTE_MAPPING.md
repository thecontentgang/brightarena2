# Route Mapping

Every URL is served with a trailing slash (`trailingSlash: true`). A slashless request returns a 308 to the slash form. Every route is statically prerendered at build time.

| URL | Vite component | Next.js route file | Render |
|---|---|---|---|
| `/` | `sections/HomePage` | `src/app/page.tsx` | static |
| `/about/` | `pages/AboutPage` | `src/app/about/page.tsx` | static |
| `/services/` | `pages/ServicesPage` | `src/app/services/page.tsx` | static |
| `/services/[slug]/` (4) | `pages/ServiceDetails` | `src/app/services/[slug]/page.tsx` | SSG, `generateStaticParams` from `servicesData` |
| `/portfolio/` | `pages/ProjectsPage` | `src/app/portfolio/page.tsx` | static |
| `/portfolio/[slug]/` (11, including the 5 restored legacy projects) | `pages/ProjectDetails` | `src/app/portfolio/[slug]/page.tsx` | SSG from `projectsData` |
| `/designs/` | `pages/DesignsPage` | `src/app/designs/page.tsx` | static |
| `/designs/[slug]/` (3) | `pages/DesignDetails` | `src/app/designs/[slug]/page.tsx` | SSG from `designsData` |
| `/testimonials/` | `pages/TestimonialPage` | `src/app/testimonials/page.tsx` | static |
| `/blogs/` | `pages/BlogPage` | `src/app/blogs/page.tsx` | static |
| `/blogs/mastering-lighting-invisible-architecture/` | `pages/blogs/MasteringLightingInvisibleArchitecture` | `src/app/blogs/<slug>/page.tsx` | static |
| `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/` | `…/HowToChooseTheBestInteriorDesignerInHyderabad` | same pattern | static |
| `/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/` | `…/ModularKitchenCostInHyderabadCompleteGuide2026` | same pattern | static |
| `/blogs/art-of-biophilic-design/` | `…/ArtOfBiophilicDesign` | same pattern | static, **noindex**, kept out of the sitemaps |
| `/blogs/small-home-interior-design-ideas/` | `…/SmallHomeInteriorDesignIdeas` | same pattern | static |
| `/blogs/bedroom-interior-design-ideas/` | `…/BedroomInteriorDesignIdeas` | same pattern | static |
| `/blogs/living-room-interior-design-ideas/` | `…/LivingRoomInteriorDesignIdeas` | same pattern | static |
| `/contact/` | `pages/ContactPage` | `src/app/contact/page.tsx` | static |
| `/privacy-policy/` | `pages/PrivacyPolicyPage` | `src/app/privacy-policy/page.tsx` | static |
| `/interior-designer-hitec-city/` | `pages/HitecCityInteriorDesignerPage` | `src/app/interior-designer-hitec-city/page.tsx` | static |
| `/interior-designer-gachibowli/` | `pages/GachibowliInteriorDesignerPage` | matching folder | static |
| `/interior-designer-kondapur/` | `pages/KondapurInteriorDesignerPage` | matching folder | static |
| `/interior-designer-madhapur/` | `pages/MadhapurInteriorDesignerPage` | matching folder | static |
| `/interior-designer-whitefields/` | `pages/WhitefieldsInteriorDesignerPage` | matching folder | static |
| `/luxury-interior-designers-in-hyderabad/` | `pages/LuxuryPage` | matching folder | static |
| `/top-luxury-interior-designers-in-hyderabad/` | `pages/LuxuryPage` (alias) | matching folder | static; canonical → `/luxury-interior-designers-in-hyderabad/` |
| `/top-interior-designer-in-hyderabad/` | `pages/TopInteriorDesignerPage` | matching folder | static |
| `/top-interior-designers-in-hyderabad/` | `pages/TopInteriorDesignerPage` (alias) | matching folder | static; canonical → `/top-interior-designer-in-hyderabad/` |
| any unknown URL / unknown slug | `pages/NotFoundPage` (`/404.html`) | `src/app/not-found.tsx` | HTTP 404 |
| `/sitemap.xml`, `/blog-sitemap.xml`, `/image-sitemap.xml`, `/robots.txt` | written into `public/` by `scripts/generate-sitemaps.ts` | `src/app/<file>/route.ts` (`force-static`) | static, byte-identical to the Vite output |

**Totals:** 43 indexable or alias HTML pages: 25 fixed routes (including the noindex placeholder) plus 18 dynamic pages, the same 43 the Vite prerender produced. There is also the 404 page and 4 static files.

The route inventory was checked against `scripts/prerender.js`, `scripts/generate-sitemaps.ts` and `src/App.tsx`. No other routes exist.

Legacy URLs (71 redirects): see SEO_MIGRATION_PLAN.md.
