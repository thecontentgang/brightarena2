# Functional Test Report

The tests were run in headless Chromium (Playwright API) against the Next.js production build (`next start`). The same scripts were run against the Vite build for comparison. EmailJS was **mocked**: requests to `api.emailjs.com` were intercepted and answered by the test, so no email was sent and no enquiry reached anyone.

## Navigation

| Test | Next.js | Vite | Status |
|---|---|---|---|
| Navbar links (Services, Portfolio, Designs, About, Testimonials, Blogs, Contact) | Correct URL and title each time. Client-side navigation, no full reload (navigation timing unchanged) | Same | **PASS** |
| Logo → home | `/` | `/` | **PASS** |
| Footer links (Home, About Us, Services, Portfolio, Blog, Contact Us, Privacy Policy) | All 200. A click lands on the right page | Same | **PASS** |
| Back / back / forward through `/` → `/about/` → `/blogs/` | Correct URL, title and a single H1 at each step | Same | **PASS** |
| Refresh on a route | Correct title immediately | Title briefly empty after reload (a Vite quirk) | **PASS** |
| Direct load of every route (44) and of nested dynamic routes | All 200 (404 for unknown) | Same | **PASS** |
| Refresh on a dynamic route (`/portfolio/kollur-…/`) | Correct page and title | n/a | **PASS** |
| Mobile navigation (390 px): open menu, links visible, navigate to `/contact/`, close menu | Works | Same | **PASS** |
| Back-to-top button (floating bar) | Visible after scrolling; `scrollY` returns to 0 | Same | **PASS** |
| Logo button on the home page while already on `/` | The first click attempt timed out (element not actionable while the hero animates). The page was already correct | Same | **PASS** (not a defect) |

## Forms

### Project enquiry modal ("Talk Now", EmailJS)

| Test | Result | Status |
|---|---|---|
| Opens from the navbar CTA; locks body scroll | `overflow: hidden`; 3 inputs plus option groups | **PASS** |
| Empty submit | Error banner "Unable to send your request"; **0** EmailJS calls | **PASS** |
| Phone with 5 digits | Error banner; 0 calls | **PASS** |
| Invalid email (`not-an-email`) | Error banner; 0 calls | **PASS** |
| Valid submit (mock returns 200) | Button changes to "Sending Request..." and is disabled → "✓ Request sent successfully". **1** call with payload `{name, phone: 10 digits, email, project_type, service, area, budget}`. The modal closes by itself and scroll is restored | **PASS** |
| Server error (mock returns 400) | Error banner; the modal stays open (no silent failure) | **PASS** |
| Close button / backdrop click | Closes | **PASS** |
| Escape key | Before: did not close (in either build). **After F4: closes** | **PASS** (fixed) |
| Keyboard focus | Before: focus stayed behind the dialog and Tab escaped it. **After F7: focus moves into the dialog, Tab is trapped, focus returns to the opener on close** | **PASS** (fixed) |
| Real EmailJS delivery | Not run (it would send a real email) | **NOT TESTED** |

### Contact page form (implemented 2026-11-13, F9)

Before: the form only called `preventDefault()`; a valid submit did nothing (identical in Vite). Now it sends through EmailJS with its own template. Tests were run on a temporary build that had a dummy Contact template ID passed only at build time, with every EmailJS request intercepted in the browser. They were then repeated on the real-configuration build, where the template ID is not yet set. **No real email was sent** (4 intercepted requests in total).

| Test | Result | Status |
|---|---|---|
| Unit tests (`pnpm test:contact`, 7 tests): required fields, whitespace-only input, email format (7 cases), Indian mobile rule (6 accepted / 7 rejected formats), template variables | 7 pass, 0 fail | **PASS** |
| Initial render | Empty fields, no error text, no banners; button "Send Inquiry"; labels "Full Name *", "Email Address *", "Phone Number", "Project Type", "Project Details *" | **PASS** |
| Empty submit | Inline errors for name, email and message (not phone); `aria-invalid` on those 3; focus moves to Full Name; red banner; **0** requests | **PASS** |
| Typing in an invalid field | Its error clears | **PASS** |
| Invalid email + phone "12345" | Errors on email and phone only; focus on email; 0 requests | **PASS** |
| Phone "5876543210" (not a mobile prefix) | Phone error; 0 requests | **PASS** |
| Valid submit (mock 200) with phone "+91 98765 43210" and type Commercial | "Sending Inquiry..." with the button disabled → green "✓ Request sent successfully"; **all fields cleared**. 1 request to the **Contact template** (not Talk Now's), with the service ID and public key present, and variables subject "New Website Enquiry – Contact Page", source "Contact page", name, email, reply_to = the customer's email, phone "9876543210", project_type "Commercial / Office", message | **PASS** |
| Server error (mock 400) | Red banner; **all input kept** | **PASS** |
| Network failure (request aborted) | Red banner; all input kept | **PASS** |
| Contact template ID not configured (the real current state) | Valid submit → red banner, input kept, **no request made** | **PASS** (safe failure) |
| Talk Now popup on the same page | Still sends with its own template and its own variables (name, phone, email, project_type, service, area, budget) and the same service. The full Talk Now regression suite matches the pre-change results exactly | **PASS** |
| Visual check (1440, 390) | Error and success states render in the existing style; no layout change in the default state | **PASS** |
| Real EmailJS delivery to the Talk Now inbox | Not run: awaiting your approval and the Contact template | **NOT TESTED** |

## Dynamic routes

| Test | Result | Status |
|---|---|---|
| Every valid slug: 4 services, 11 portfolio projects, 3 designs | 200, correct title, description, canonical and H1 (metadata generated per slug; identical to Vite) | **PASS** |
| Invalid slug `/services/not-a-real-service/` | Real **404** with the NotFoundPage design | **PASS** |
| Unknown URL `/no-such-page/` | Real **404** | **PASS** |
| Prerendering | All 18 dynamic pages are generated at build time (`dynamicParams = false`) | **PASS** |

## Interactive elements and animations

| Element | Result (identical in both builds unless noted) | Status |
|---|---|---|
| Five-tile GSAP page transition | Tiles sweep in a stagger on every client navigation; scroll resets at the midpoint; back/forward still work | **PASS** |
| Reduced motion | Before: tiles and motion ran regardless. **After F2: with `prefers-reduced-motion: reduce` the tiles are skipped and Framer Motion drops transform motion**; navigation still lands, and `scrollY` is 0 | **PASS** (fixed) |
| Home testimonial filters (All / Videos / Reviews) | 9 → 6 → 3 → 9 cards | **PASS** |
| Testimonial detail modal | Opens, locks scroll, closes from the backdrop. Escape does not close it (pre-existing, N17) | **WARNING** |
| Testimonial page video cards | Click → YouTube embed loads (`/embed/aZq2QRwiYsE?autoplay=1`) | **PASS** |
| 3D panorama (Three.js) | WebGL canvas 1374×718 renders; a drag rotates the view; Zoom In changes the frame; Reset works | **PASS** |
| Hero video | Loads (206), readyState 4, autoplay + muted | **PASS** |
| Scroll-reveal sections | After a full scroll nothing is stuck invisible, apart from intentional states (the transition logo, the GSAP-pinned stack, hover-only captions) | **PASS** |
| Lenis smooth scroll (home hero / showcase) | Runs; no errors | **PASS** |
| Breadcrumb hide-on-scroll | Fades after 50 px | **PASS** |
| Image galleries / zoom | The project and design detail galleries render every image (0 broken, 0 distorted). `react-zoom-pan-pinch` is installed but **no component uses it** in either app, so there is no zoom UI to test | **PASS** / **NOT APPLICABLE** |
| "Trusted by" logo marquee (home, Framer Motion infinite `x` loop) | 60 logos. Moves 164 px per 2 s (Vite: 161 px). With reduced motion: stationary in Next.js after F2 (Vite keeps scrolling) | **PASS** |
| Other sliders / carousels | The home "project showcase" is a GSAP-pinned scroll stack (tested above). The only other slider, the WebGL carousel in `ProjectsSection.tsx`, is not used by any page in either app | **NOT APPLICABLE** |
| Memory across 32 client-side navigations | Next.js heap 8.3 → 10.0 → 10.7 → 10.0 → 10.7 MB (plateau); DOM nodes 1186 → 1180; listeners stable; 1 canvas. Vite: 7.5 → 9.7 MB, still rising | **PASS** |

## Browser errors

| Check | Production (44 routes) | Development server (44 routes) | Status |
|---|---|---|---|
| Uncaught exceptions | 0 | 0 | **PASS** |
| Hydration warnings / React errors | 0 | 0 (no issues in the Next devtools badge) | **PASS** |
| Failed requests | Only the pre-existing missing assets: 4 location hero JPGs, `video-fallback-poster.jpg`, 2 truncated founder URLs, 1 YouTube `maxresdefault` (handled by fallback) | Same | **WARNING** (pre-existing) |
| Console errors besides those 404s | `<path> attribute d: Expected number` on `/services/` (pre-existing malformed SVG, N6) | Same | **WARNING** (pre-existing) |

## External links

WhatsApp (`wa.me`), Instagram, YouTube and thecontentgang.com open in a new tab with `rel="noopener noreferrer"`. `tel:` and `mailto:` links are correct. The external destinations themselves were **not fetched** (no outbound requests to third parties): **NOT TESTED**.
