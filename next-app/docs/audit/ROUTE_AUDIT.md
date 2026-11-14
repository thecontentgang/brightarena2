# Route Audit

The final Next.js production build (all 8 fixes applied) was tested in headless Chromium on 2026-11-13. Each route was loaded directly, scrolled top to bottom, and checked after every image completed. The Vite build was measured the same way for comparison.

**Columns**
- **HTTP:** the status of a direct request.
- **Metadata:** title, description, canonical and H1 are present and identical to Vite (for the 404 routes: the correct 404 status).
- **Content:** server HTML carries the page text (more than 300 characters of visible text; the per-page visible text is identical to Vite, per `pnpm seo:compare`).
- **Images:** every `<img>` loaded. WARNING means the only failures are assets that also fail in Vite.
- **Responsive:** no horizontal overflow. 17 key pages were checked at all 5 viewports (1920 / 1440 / 768 / 390 / 360); the rest at 1440.
- **Runtime:** no uncaught exceptions and no hydration errors.

**Totals:** 45 routes. **PASS 39**, **FAIL (pre-existing) 5**, **NEEDS REVIEW 1**, FAIL caused by the migration 0. The 5 pre-existing failures are missing images that exist identically in the Vite site: 4 location heroes (N2) and the founder photos on /about/ (N3). They are kept unchanged until you supply approved photos. NEEDS REVIEW: /contact/, where the form is implemented (F9) but real delivery awaits your EmailJS template and approval. See OUTSTANDING_DECISIONS.md.

| Route | HTTP | Metadata | Content | Images | Responsive | Runtime | Result | Notes |
|---|---|---|---|---|---|---|---|---|
| `/` | 200 | PASS | PASS (82 img) | PASS | PASS (5/5 vp) | PASS | PASS | hero poster 404 (same in Vite) |
| `/about/` | 200 | PASS | PASS (9 img) | WARNING | PASS (5/5 vp) | PASS | FAIL (pre-existing) | 2 image(s) missing in Vite too: photo-, https://images.unsplash.c/ |
| `/services/` | 200 | PASS | PASS (8 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/portfolio/` | 200 | PASS | PASS (15 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/designs/` | 200 | PASS | PASS (7 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/testimonials/` | 200 | PASS | PASS (13 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/blogs/` | 200 | PASS | PASS (10 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/contact/` | 200 | PASS | PASS (5 img) | PASS | PASS (5/5 vp) | PASS | NEEDS REVIEW | contact form implemented (F9) and tested with EmailJS mocked; real delivery awaits the EmailJS Contact template + your approval |
| `/privacy-policy/` | 200 | PASS | PASS (4 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/services/home-interior-designs-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/services/commercial-interior-designers-in-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/services/office-interior-designers-in-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/services/2d-3d-interior-design-services-in-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/forest-edge-interior-design-project-hyderabad/` | 200 | PASS | PASS (14 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/portfolio/rajapushpa-interior-design-project-hyderabad/` | 200 | PASS | PASS (19 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/vara-prasad-bachupally-interior-design-project-hyderabad/` | 200 | PASS | PASS (20 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/etna-by-phoenix-interior-design-project-hyderabad/` | 200 | PASS | PASS (16 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/banali-foods-commercial-interior-design-project-hyderabad/` | 200 | PASS | PASS (9 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/kollur-apartment-interior-design-project-hyderabad/` | 200 | PASS | PASS (19 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/mr-nageswara-rao/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/haseeb-my-home-bhooja/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/rakesh-bhupathi-nagole/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/sammys-villa-bangalore/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/portfolio/praveen-aparna-zenith/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/designs/living-room-interior-design-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/designs/bedroom-interior-design-hyderabad/` | 200 | PASS | PASS (8 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/designs/kitchen-interior-design-hyderabad/` | 200 | PASS | PASS (9 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/mastering-lighting-invisible-architecture/` | 200 | PASS | PASS (6 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/` | 200 | PASS | PASS (5 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/` | 200 | PASS | PASS (5 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/art-of-biophilic-design/` | 200 | PASS | PASS (4 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/small-home-interior-design-ideas/` | 200 | PASS | PASS (5 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/bedroom-interior-design-ideas/` | 200 | PASS | PASS (5 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/blogs/living-room-interior-design-ideas/` | 200 | PASS | PASS (5 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/interior-designer-hitec-city/` | 200 | PASS | PASS (5 img) | WARNING | PASS (1440 only) | PASS | FAIL (pre-existing) | 1 image(s) missing in Vite too: hitec-city-interior-hero.jpg |
| `/interior-designer-gachibowli/` | 200 | PASS | PASS (5 img) | WARNING | PASS (5/5 vp) | PASS | FAIL (pre-existing) | 1 image(s) missing in Vite too: gachibowli-interior-hero.jpg |
| `/interior-designer-kondapur/` | 200 | PASS | PASS (5 img) | WARNING | PASS (1440 only) | PASS | FAIL (pre-existing) | 1 image(s) missing in Vite too: kondapur-interior-hero.jpg |
| `/interior-designer-madhapur/` | 200 | PASS | PASS (5 img) | WARNING | PASS (1440 only) | PASS | FAIL (pre-existing) | 1 image(s) missing in Vite too: madhapur-interior-hero.jpg |
| `/interior-designer-whitefields/` | 200 | PASS | PASS (5 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/luxury-interior-designers-in-hyderabad/` | 200 | PASS | PASS (10 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/top-luxury-interior-designers-in-hyderabad/` | 200 | PASS | PASS (10 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/top-interior-designer-in-hyderabad/` | 200 | PASS | PASS (11 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/top-interior-designers-in-hyderabad/` | 200 | PASS | PASS (11 img) | PASS | PASS (1440 only) | PASS | PASS |  |
| `/no-such-page/` | 404 | PASS | PASS (4 img) | PASS | PASS (5/5 vp) | PASS | PASS |  |
| `/services/not-a-real-service/` | 404 | PASS | PASS (4 img) | PASS | PASS (1440 only) | PASS | PASS |  |

## Additional per-route facts (final build)

- **Distorted images:** 0. **Missing alt:** 0. **Lazy images above the fold:** 0.
- **Exactly one `<h1>` per page** (validator). The two alias routes canonicalise to their primary pages by design.
- **Unexpected 404/500 responses:** none. The only 404s are the pre-existing missing assets and the two intentional 404 test URLs.
- **Sections:** the visible text of every page is identical to the Vite build, so no section is missing or duplicated. Elements still invisible after a full scroll are intentional (the transition overlay logo, the GSAP-pinned project stack on the home page, hover-only captions on design cards), and they are identical in Vite.
