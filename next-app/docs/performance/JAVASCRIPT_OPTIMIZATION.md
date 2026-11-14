# JavaScript Optimisation

Phases 2–4 of the performance plan (Phase 2: three.js panorama; Phase 3: Lenis; Phase 4: Talk Now modal / EmailJS). Baseline: [LIGHTHOUSE_BASELINE.md](LIGHTHOUSE_BASELINE.md). Images: [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md).

---

## Phase 2 – Three.js panorama: lazy loading and render loop

Status: **complete** (2026-11-14).

### Problem
On the homepage, the 360° panorama ("Walk Through the Home Theatre") sits about 8–9 viewport heights below the top, yet:
- three.js (517 KB raw / 130 KB gzip) downloaded and executed at page load;
- the panorama texture downloaded at page load (Phase 1 variant: 1.4 MB desktop / 482 KB mobile);
- the WebGL render loop ran every frame from page load onwards, including while the section was offscreen (432 draw calls per 3 s, at the top of the page and below the section alike);
- decoding and uploading the 8192×4096 texture blocked the main thread for **~1.5 s** (one 1,480 ms long task on an unthrottled desktop, shortly after load).

### Root cause
- `HomePage` used `React.lazy` for the section, but lazy sections still server-render and hydrate straight away, so the chunk, including three.js, loaded at page load.
- The component started `requestAnimationFrame` unconditionally and never paused it.
- `THREE.TextureLoader` decodes through an `<img>` and uploads the whole texture in one synchronous `texImage2D`.
- Traced in Chrome during development: further main-thread stalls were **synchronous GPU readbacks** (`CommandBufferHelper::Finish`) waiting for the 128 MB upload to drain:
  - the shader link-status check on the first draw (`GetProgramiv`, up to 1.7 s);
  - `copyTextureToTexture`'s pixel-store `getParameter` reads (`GetIntegerv`, 0.25–0.6 s);
  - occasionally a full command buffer (`WaitForToken`, up to 4.7 s) when uploads were queued faster than the GPU process consumed them.

  Measured on the dev machine's Intel UHD integrated GPU (ANGLE / Direct3D 11) – realistic for integrated-graphics laptops.

### Change made
1. **`src/sections/PanoromaSection.tsx` → shell only.**
   - Same JSX, classes and props as before: heading, viewer box, controls, compass, caption, loading/error overlays.
   - Server-rendered, so section dimensions never change while loading: **no layout shift, and GSAP/ScrollTrigger measurements are unaffected** (no ScrollTrigger refresh needed).
   - No three.js import.
2. **`src/sections/panoramaEngine.ts` (new) – all WebGL code**, loaded with a dynamic `import()`:
   - **Loading:** an `IntersectionObserver` (`rootMargin: "250% 0px"`) triggers the import when the section comes within 2.5 viewport heights.
     - The margin was tuned from 100% after measuring readiness: 1.0 viewport left the desktop overlay visible for 3.2 s after arrival on fast 4G.
     - Nothing loads at page load. Lighthouse runs and the browser metrics below confirm three.js and the texture are absent from the initial load.
   - **Rendering:** a second observer reports on-screen state. Frames are drawn only while the section is visible **and** `document.visibilityState === "visible"`. Rendering stops when scrolled away or the tab is hidden, and resumes on return.
     - With auto-rotate (default), the loop runs while visible, exactly as before.
     - With **reduced motion**, auto-rotate is disabled and the loop runs only during drag or zoom easing, otherwise idle.
   - **Texture, same variants and quality as Phase 1:** 8192 px when the viewport is ≥ 1024 px and `maxTextureSize ≥ 8192`, otherwise 4096 (or 2048).
     - Decoded off the main thread with `THREE.ImageBitmapLoader` (`createImageBitmap`, flipped while decoding).
     - Uploaded in horizontal strips of about 1 M pixels (32 strips at 8192, 8 at 4096) with direct `texSubImage2D` through three.js's state cache.
     - The next strip is sent only after a **WebGL2 fence** reports the previous one has finished. Fence queries never block, so the main thread never waits on the GPU queue.
     - Storage is allocated once with every mip level; the mip chain is generated once, after the last strip.
     - Filtering is identical to a normal three.js texture (Linear / LinearMipmapLinear, sRGB).
   - **Shader warm-up:** a 1×1 white placeholder texture plus one render right after renderer creation compiles and link-checks the textured shader while the GPU is idle. The real texture then swaps in with no recompile. (The untextured sphere was also white behind the loading overlay before, so nothing visible changes.)
   - **No duplicate initialisation:** a cancelled-flag plus controller-ref guard means a remount, a StrictMode double effect or a navigation during the chunk download never creates a second renderer.
   - **WebGL context loss:** `preventDefault` stops the loop; on restore the texture is re-fetched (HTTP-cached) and re-streamed.
   - **WebGL unavailable:** the existing error overlay shows instead of a thrown error.
   - **Cleanup on unmount:** animation frame, both observers, `ResizeObserver`, pointer/wheel/visibility/context listeners, geometry, material, textures (placeholder and real), the decoded `ImageBitmap`s (`close()`), the renderer, and `forceContextLoss()` so the GL context is released immediately rather than at GC.
   - The per-frame `new THREE.Vector3()` allocation in the render loop is now a reused vector.
3. `HomePage.tsx` is unchanged (the section is still `React.lazy` inside the same `Suspense`).

### Files modified
- `src/sections/PanoromaSection.tsx` – rewritten as the shell (markup unchanged; `ref` added to the viewer box).
- `src/sections/panoramaEngine.ts` – new.
- `tsconfig.json` – removed two `.next-exp` include entries that a temporary experiment build had added. No other change.
- Not modified: Phase 1 image pipeline, `ProjectsData.ts`, redirects, the Vite app.

### Measured result

**Browser metrics, homepage** (headless Chromium on the dev machine's real GPU; desktop 1440×900 at 1× CPU, mobile 390×844 at 4× CPU slowdown; Phase 1 build vs Phase 2 build, same script):

| Metric | Desktop before → after | Mobile before → after |
|---|---|---|
| Initial JS transferred | 396 KB → **324 KB** | 389 KB → **261 KB** |
| three.js loaded at page load | yes (at 0.6 s) → **no** | yes (at 1.6 s) → **no** |
| Panorama texture loaded at page load | yes (1.4 MB at 1.3–2.5 s) → **no** | yes (482 KB at 1.9 s) → **no** |
| Main-thread blocking, first 8 s | 2,142–4,840 ms → **32–111 ms** | 923 ms → **230–248 ms** |
| WebGL draw calls / 3 s, top of page | 432 → **0** | 432 → **0** |
| WebGL draw calls / 3 s, scrolled below the section | 433 → **0** | 432 → **0** |
| Draw calls / 3 s, section visible | 432 → 432 (unchanged) | 429 → 431 (unchanged) |
| Blocking while scrolling into the panorama (Chrome traces) | n/a before (loaded at start) – during development 386–2,940 ms → **50–103 ms**, worst single task 139 ms (6 runs) | 177–219 ms |

**Lighthouse 13.6** (same runner and settings as every phase; production `next start`):

| Page | FF | Phase 1 | Phase 2 |
|---|---|---|---|
| Home | mobile | 51 / 51 (TBT 930 / 999 ms, LCP 6.9 s) | **75 / 78 / 47** – median 75 (TBT 209 / 107 / 2,379 ms, LCP 5.1 s) |
| Home | desktop | 66 / 91 (TBT 659 / 199 ms) | **97 / 97 / 97** (TBT 0 / 11 / 26 ms) |
| Home | mobile: unused JS | 78 KB | **27 KB** |
| Home | mobile: JS boot-up / main-thread work | 3,638 / 6,133 ms | 1,228 / 3,781 ms |
| Home | desktop: JS boot-up / main-thread work | 1,198 / 1,920 ms | 338 / 1,267 ms |
| Inner pages | both | unchanged within run-to-run noise (not affected by this phase) | |

The mobile run that scored 47 contains a single 1,920 ms "unattributable" task 1.2 s into page load. three.js and the texture were **not** requested in that run (checked in its network log), so it is measurement noise, not this phase. A Project-mobile run in the first batch (52) was also noise; reruns gave 79 / 80, same as Phase 1.

**Panorama readiness** (time the "Loading 360° view…" overlay stays visible after the section reaches the viewport; network throttled to 9 Mbps / 60 ms RTT):

| Scroll style | Desktop (8192 texture, 1.4 MB) | Mobile (4096 texture, 482 KB) |
|---|---|---|
| Brisk reading scroll (one viewport per 0.4 s) | 1.8 – 2.1 s | **0.02 s** |
| Direct jump from the top (worst case; no anchor link targets the section) | 3.3 s | 1.2 s |

Before Phase 2 the overlay was never seen, because the texture loaded at page load (at the cost of the 1.5 s freeze and ~1.9 MB downloaded by every visitor).

### Regression tests
Run on the production build, desktop 1440×900 and mobile 390×844; all pass on both:

| Test | Result |
|---|---|
| Initial load, before the section approaches | no canvas, no three.js chunk, no texture request |
| Scroll into the panorama | exactly 1 canvas; renders (~432 draws / 3 s) |
| Scroll away (to page bottom) | 0 draws |
| Scroll back | rendering resumes (~288 draws / 2 s) |
| Tab hidden → visible | 4–11 draws in the hidden window (in-flight frames only) → resumes |
| WebGL context lost → restored | 0 draws while lost → resumes and the texture re-appears (screenshot checked) |
| Client navigation to /about/ (unmount) | 0 canvases, 0 draws on About |
| Browser Back to home (remount) | 0 canvases at the top; exactly 1 after scrolling to the section; renders |
| Browser Forward to /about/ | 0 draws |
| `prefers-reduced-motion: reduce`, idle | 0 draws (no auto-rotate) |
| Normal navigation unmount / remount | no WebGL errors or warnings |
| Visual: exact "Reset View" angle vs original Vite site | mean absolute pixel difference **0.70–0.80 / 255** per channel (WebP vs JPEG encoding) |
| Visual: looking up at the ceiling (upper texture rows, where strip seams would show) vs Vite | **0.51–0.52 / 255**; no seams, orientation and colour identical |
| Homepage screenshots vs Vite at 9 scroll positions, desktop + mobile | match, except a direct jump to the panorama shows the loading overlay (see readiness table) |
| `pnpm verify` | typecheck ✓, lint 0 errors (37 pre-existing warnings), contact tests 7/7 ✓, `images:check` ✓ (**Phase 1 still passes**), build ✓, SEO: all metadata / canonicals / structured data / sitemaps ✓ except the 4 inherited portfolio redirects (below) |

### Post-review adjustment (approved with Phase 2)
The preload margin moved from 2.5 to **3.25 viewport heights** (`rootMargin: "325% 0px"`). Texture variants, quality and the loading-message fallback are unchanged, with no low-resolution preview. Measured on the Phase 3 build:
- **Distance:** once GSAP's pin spacers exist, the section starts 12.2 viewports down on desktop and 9.4 on mobile. Loading therefore begins after about 8.9 / 6.1 viewports of scrolling, never at page load.
- **Initial load:** three.js and the texture are absent from the initial load (browser metrics on desktop and mobile; no Lighthouse run requested them).
- **Readiness:** at a brisk scroll on 9 Mbps, the desktop overlay is visible for **1.27–1.32 s** after arrival, down from 1.8–2.1 s at 2.5 viewports. Mobile stays at 0.015–0.016 s. A direct jump is unchanged (3.25 s desktop / 1.14 s mobile), since a jump skips the preload zone. Testing did not show a need for a preview texture.

### Remaining issues
- **Desktop overlay on slow connections (before the adjustment above):** at 9 Mbps the full-quality 8192 texture can still be arriving when a fast-scrolling desktop visitor reaches the section (1.8–2.1 s overlay). Options if wanted:
  - (a) an even larger preload margin;
  - (b) a progressive preview: show the 4096 texture first, then swap to 8192, which would briefly look softer;
  - (c) accept as is. On typical desktop broadband the download takes a fraction of this.
- **After a forced WebGL context loss**, three.js logs "object does not belong to this context" warnings when it disposes resources created on the old context. These are harmless; they do not occur in normal use or normal navigation.
- **Auto-rotate starting angle:** before, rotation began at page load and continued offscreen, so the angle a visitor first saw depended on how long they had been on the page. Now it starts when the engine loads (about 2.5 viewports early) and pauses offscreen, so visitors arrive near the intended starting view.
- **Build environment:** the previous `.next` folder (shared with `next dev`) consistently crashed Turbopack (PostCSS worker exit), even with the dev server stopped. It was moved aside (not deleted) to the session scratchpad, and `pnpm verify` then built a fresh `.next` successfully.
- **Inherited, not touched in this phase:** `ProjectsData.ts` has 6 projects vs 11 on the Vite site. 4 legacy redirects (`/our_portfolio/mr-nageswara-rao/`, `/sammys-villa/`, `/rakesh-bhupathi/`, `/praveen-aparna-zenith-nallagandla/`) point to portfolio pages that return 404. This needs a separate content-restoration decision.


---

## Phase 3 – Lenis: one shared smooth-scroll instance

Status: **complete** (2026-11-14).

### Problem
On the homepage, `HeroSection.tsx` and `ProjectShowcase.tsx` each created their own Lenis instance with identical options. Two instances drove the same window scroll, each with its own GSAP ticker callback, `ScrollTrigger.update` subscription and set of window listeners (wheel, touch, scroll). The original Vite site has the same duplication: its homepage has 5 wheel listeners on `window`, against 3 without Lenis.

### Inspection: all scroll integrations
- **Lenis:** only on the homepage, in those two components. Every other route uses native scrolling.
- **GSAP ScrollTrigger:** 3 triggers, all on the homepage, each pinned (3 pin spacers):
  - Hero: video shrink + heading/stats fade;
  - Services: horizontal track, scrub + snap;
  - ProjectShowcase: stacked card transitions.

  `ScrollTrigger.config({ ignoreMobileResize: true })` is set in two modules (global, idempotent; left as is).
- **Framer Motion `useScroll`:** used on many pages (Navbar, Philosophy, location/project/service heroes, blog). It reads the native scroll position, which Lenis keeps in sync.
- **Native scroll calls:**
  - `PageTransitionLayout` resets to the top at the transition midpoint;
  - `ProjectDetails` resets to the top on mount;
  - the back-to-top button uses `scrollTo({ behavior: "smooth" })`.
- **Anchors:** the skip link `#main-content` (all pages), and About's `#founders` / `#philosophy` (no Lenis on About).

### Change made
- **`src/lib/smoothScroll.ts` (new):** owns at most one Lenis instance, reference-counted through a `useSmoothScroll()` hook.
  - The first component to mount creates it, others share it, and the last to unmount destroys it: it is removed from the GSAP ticker and `lenis.destroy()` removes its listeners and the `lenis` classes.
  - Options are identical to both previous instances (`duration: 1.2`, same exponential easing, `smoothWheel: true`; touch stays native).
  - Same wiring as before: `lenis.on("scroll", ScrollTrigger.update)`, driven from `gsap.ticker` (one rAF loop), `gsap.ticker.lagSmoothing(0)`. That last setting is global; as before, it is left in place after leaving the homepage.
  - **Reduced motion:** when `prefers-reduced-motion: reduce` is set, no Lenis is created and scrolling is native. ScrollTriggers keep working from native scroll events.
  - Deliberately **not** a site-wide smooth-scroll provider: inner pages keep native scrolling exactly as before, and nothing else in the app needs to know about Lenis.
- **`HeroSection.tsx`:** its Lenis effect is replaced by `useSmoothScroll()`. Its GSAP timeline is untouched.
- **`ProjectShowcase.tsx`:** the Lenis setup and teardown are removed from its effect, replaced by `useSmoothScroll()`. The GSAP timeline and the prerender guard are untouched.

### Files modified
- New: `src/lib/smoothScroll.ts`.
- Changed: `src/sections/HeroSection.tsx`, `src/sections/ProjectShowcase.tsx`, `src/sections/PanoromaSection.tsx` (preload margin and comment only, see the Phase 2 adjustment above).
- Docs: corrected the Services statements in `IMAGE_OPTIMIZATION.md` (the ScrollTrigger works; lazy loading verified).
- Not modified: Phase 1 image pipeline, Phase 2 engine, `ProjectsData.ts`, redirects, the Vite app.

### Measured result

**Instances and triggers** (window wheel listeners via DevTools `getEventListeners`; homepage baseline without Lenis = 3):

| | Vite original | Phase 2 | Phase 3 |
|---|---|---|---|
| Lenis instances on the homepage (wheel listeners) | 2 (5) | 2 (5) | **1 (4)** |
| After Home → About → Back, twice | 2 each time | 2 each time | **1 each time** (0 on About) |
| With reduced motion | 2 | 2 | **0** (native scrolling) |
| GSAP ScrollTriggers / pin spacers | 3 / 3 | 3 / 3 | 3 / 3 (unchanged) |

**Scroll behaviour and smoothness** (production build, headless Chromium on the dev machine; desktop 1440×900 with a 60-step wheel input; mobile 390×844 at 4× CPU slowdown with 6 touch drags):

| Metric | Phase 2 | Phase 3 |
|---|---|---|
| Desktop: distance scrolled by the same wheel input | 5,833 px | **5,833 px** (identical feel) |
| Desktop: average frame rate during scroll | 131–132 fps | 128–130 fps |
| Desktop: long animation frames during scroll / blocking | 2–3 / 0 ms | 3–4 / 0 ms |
| Mobile: distance scrolled by the touch drags (native touch either way) | 3,458–3,732 px | 3,464–3,846 px |
| Mobile: average frame rate | 107–114 fps | 101–107 fps (one outlier run at 81) |
| Mobile: long animation frames / blocking | 1–2 / 0–2 ms | 0–2 / 0 ms (outlier run: 6 / 54 ms) |

On this hardware the single instance gives **no measurable frame-rate change**: the duplicate instance's per-frame cost was below what these tests can resolve. The gain is the removed duplicate work: one ticker callback, one `ScrollTrigger.update` subscription and one listener set instead of two. The Services snap also became consistent (see regression tests).

**Lighthouse 13.6** (same runner and settings):

| Page | FF | Phase 2 | Phase 3 |
|---|---|---|---|
| Home | desktop | 97 / 97 / 97 (TBT 0 / 11 / 26 ms; main-thread 1,267–1,603 ms; JS boot-up 317–431 ms) | **98 / 98 / 98** (TBT 0 / 0 / 0 ms; main-thread 949–1,153 ms; boot-up 231–263 ms) |
| Home | mobile | 75 / 78 / 47 (TBT 209 / 107 / 2,379 ms; main-thread 3,781–8,593 ms) | **75 / 77 / 79** (TBT 103 / 175 / 68 ms; main-thread 3,465–4,037 ms; boot-up 1,192–1,345 ms) |
| Inner pages | both | – | unchanged within run-to-run noise |

**Bundle size:** homepage first-party JS is unchanged: 263 KB (17 files) on mobile and 285 KB (22 files) on desktop, in both phases. Turbopack already included the Lenis library only once; Phase 3 removes only the duplicated setup code. (Two desktop runs also captured 42 KB of Next.js idle-time `<Link>` prefetches for `/services/` and `/portfolio/`; the homepage itself does not reference those chunks, and whether Lighthouse captures them is timing-dependent.)

### Regression tests
Each run on the original Vite site (`../dist`) and the Phase 3 build with the same script, desktop 1440×900, mobile 390×844 and desktop with reduced motion:

| Test | Result |
|---|---|
| GSAP states at 9 scroll positions (hero heading, Services track, 4 ProjectShowcase cards) | **identical to Vite** on desktop and with reduced motion (differences only in the 4th decimal of a percentage) |
| Services snap (mobile) | Vite is non-deterministic: it settled on card 3 in 2 of 3 runs and card 4 in 1. Phase 3 settled on card 4 in 3 of 3 runs. Both are valid snap points; removing the second scroll driver makes it consistent. |
| Hero pin and animations, ProjectShowcase pinning | identical states (above); 3 pin spacers in both |
| Back-to-top button | reaches 0 (all modes, both sites) |
| Skip link `#main-content` | first focusable element, works (both sites) |
| About anchors `#founders` | lands with the target at the top (both sites) |
| Navigation Home → About, scroll position on About | 0 (both sites) |
| Browser Back to Home | scroll position restored to 2,600 px (identical to Vite) |
| Browser Forward | returns to /about/ at the top (both sites) |
| Wheel scrolling after the round trip | 1,793 px desktop, 2,000 px mobile (identical to Vite) |
| Repeated navigation | always exactly 1 instance on the homepage, 0 on About (never accumulates) |
| Mobile touch scrolling | native, as before (touch-drag distances in the same range) |
| Reduced motion | no Lenis, native scrolling, GSAP states identical to Vite |
| Panorama (Phase 2 suite) | all checks pass on desktop and mobile: lazy load, visibility pause/resume, tab switch, context loss, unmount/remount, reduced motion. Reset view vs Vite: 0.70–0.80 / 255. |
| Page transitions | tile overlay unchanged (no change to `PageTransitionLayout`; same state as Vite in the transition sample) |
| `pnpm verify` | typecheck ✓, lint 0 errors, contact tests 7/7 ✓, `images:check` ✓, build ✓, SEO ✓ except the 4 inherited portfolio redirects |

### Remaining issues
- `gsap.ticker.lagSmoothing(0)` stays global after leaving the homepage, as in the original code. This only matters for GSAP tweens on other pages after a very slow frame; left unchanged to avoid altering timing.
- **Test tooling notes:**
  - `Input.synthesizeScrollGesture` does not scroll in this headless setup on any page (Vite or Next); mobile tests use dispatched touch events instead.
  - At 4× CPU throttle, client-side navigation in tests occasionally needed more than 30 s; navigation steps use 60 s timeouts.
- **Inherited, untouched:** `ProjectsData.ts` (6 vs 11 projects) and the 4 portfolio redirects that return 404.


---

## Phase 4 – Talk Now modal (EmailJS) loaded on demand

Status: **complete** (2026-11-14).

### Problem
`ProjectModal` (the "Talk Now" popup) and `@emailjs/browser` were in every route's initial JavaScript. `Navbar` renders the popup on every page; `HeroSection`, `LuxuryPage` and `TopInteriorDesignerPage` also import it. In the Phase 3 build, every route's HTML referenced a 20.9 KB (gzip) shared chunk containing EmailJS, even though the popup is only needed after a click.

### Inspection
- **EmailJS importers:** `ProjectModal.tsx` (Talk Now) and `ContactForm.tsx` (Contact page form).
- **The two forms share no code:**
  - `ContactForm` has its own template ID (`NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID`) and its own validation module (`src/lib/contactForm.ts`).
  - The popup has its own inline validation and template (`NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`).
  - The Contact page form was left untouched.
- **Popup behaviour to preserve:**
  - always mounted, with `AnimatePresence` handling enter/exit animations;
  - body scroll lock;
  - Escape closes (ignored while sending);
  - focus moves into the dialog on open, Tab is trapped, focus returns to the opener on close;
  - backdrop click closes;
  - validation, then sending, success (auto-close after 1.8 s) or error;
  - form reset on close.
- **Environment:** service, template and public key are read from `NEXT_PUBLIC_*` variables at build time (unchanged; nothing moved into source, nothing logged).

### Change made
- **`src/components/LazyProjectModal.tsx` (new):** same props as `ProjectModal`.
  - It renders nothing until the popup is first opened.
  - Then it loads `ProjectModal` with a plain dynamic `import()` and keeps it mounted, so closing still plays the exit animation and later opens behave exactly as before.
  - The module promise is shared by every instance on the page, so the chunk is fetched once.
  - If the chunk fails to load, the promise is reset so the next open retries.
  - **Why not `next/dynamic` / `React.lazy`:** both were tried first. They reveal through a Suspense boundary, and React throttles Suspense reveals. Measured in production: the chunk arrived 6 ms after the click, but the dialog appeared at **315 ms**. With the plain import, the dialog appears 12–13 ms after the click on localhost.
- **`Navbar.tsx`, `HeroSection.tsx`, `LuxuryPage.tsx`, `TopInteriorDesignerPage.tsx`:** only the import line changed (`./ProjectModal` → `./LazyProjectModal`).
- **`ProjectModal.tsx`:** added a synchronous in-flight guard (`sendingRef`) to `handleSubmit`.
  - The existing guard (`submitStatus === "sending"`) is React state, which only updates on the next render.
  - Testing showed that three submit events in the same tick sent **3** requests in the Phase 3 build. With the ref guard they send **1**.
  - The guard is released in `finally`, so retry after an error still works. No visual change.

### Files modified
- New: `src/components/LazyProjectModal.tsx`.
- Changed:
  - `src/components/ProjectModal.tsx`: duplicate-submit guard only;
  - `src/components/Navbar.tsx`, `src/sections/HeroSection.tsx`, `src/views/LuxuryPage.tsx`, `src/views/TopInteriorDesignerPage.tsx`: import line only.
- Not modified: `ContactForm.tsx`, `src/lib/contactForm.ts`, Phases 1–3, `ProjectsData.ts`, redirects, the Vite app.

### Measured result

**Initial route bundle** (all JS chunks referenced by each route's prerendered HTML; Phase 3 build vs Phase 4 build):

| Route | Phase 3 gzip / raw | Phase 4 gzip / raw | EmailJS in initial bundle |
|---|---|---|---|
| `/` | 291,844 / 913,149 B | **288,275 / 899,258 B** | yes (20.9 KB chunk) → **no** |
| `/about/` | 269,122 / 849,687 B | **265,552 / 835,796 B** | yes → **no** |
| `/services/` | 302,845 / 965,267 B | **299,275 / 951,376 B** | yes → **no** |
| `/portfolio/` | 265,637 / 838,545 B | **262,067 / 824,654 B** | yes → **no** |
| `/contact/` | 267,280 / 842,711 B | **265,010 / 832,269 B** | yes → yes (its own form; 5.6 KB chunk) |
| `/interior-designer-gachibowli/` | 272,259 / 857,379 B | **268,689 / 843,488 B** | yes → **no** |
| `/portfolio/forest-edge-…/` | 267,299 / 844,701 B | **263,729 / 830,810 B** | yes → **no** |
| `/luxury-interior-designers-in-hyderabad/` | 274,078 / 868,758 B | **270,509 / 854,867 B** | yes → **no** |
| `/top-interior-designer-in-hyderabad/` | 273,949 / 868,723 B | **270,380 / 854,832 B** | yes → **no** |
| `/blogs/` | 266,084 / 840,027 B | **262,514 / 826,136 B** | yes → **no** |

That is about **3.5 KB gzip / 13.9 KB raw less initial JS on every route** (2.3 KB gzip on `/contact/`). The chunk count per route is unchanged (12–14): the old 20.9 KB EmailJS chunk also carried unrelated shared code, which now ships in another shared chunk. The modal UI plus EmailJS (the code actually removed from initial load) is about 3.5 KB gzip.

**On demand** (browser, production build, every route tested): clicking Talk Now fetches one chunk (about 5 KB transferred) containing the popup and EmailJS. Before the click it is absent; after the click it is present. Reopening fetches nothing.

**Note on Next.js link prefetch:** after about 0.6 s of idle time, Next.js prefetches routes whose `<Link>`s are visible, including the navbar's Contact link. That pulls the Contact page's own form chunk (5.6 KB gzip, which contains EmailJS) into the browser cache on every page. It is idle-time prefetching of another route, not part of any route's initial bundle; this also happened before Phase 4 (the shared chunk was simply already loaded).

**First-open latency** (click → dialog in the DOM, measured in-page, 3 runs each):

| Network | Phase 3 | Phase 4 |
|---|---|---|
| localhost | ~20 ms | **12–13 ms** |
| Throttled 9 Mbps / 60 ms RTT | 19–25 ms | **94–108 ms** (first open only; one round trip for the 5 KB chunk) |

Later opens use the already-loaded module. A 4× CPU variant of the throttled test stalled in the harness, did not produce results and was stopped.

**Lighthouse 13.6** (same runner and settings; production `next start`):

| Page | FF | Phase 3 | Phase 4 |
|---|---|---|---|
| Home | mobile | 75 / 77 / 79 (TBT 103 / 175 / 68 ms; JS boot-up 1,192–1,345 ms) | **76 / 79 / 78** (TBT 186 / 56 / 134 ms; boot-up 854–1,101 ms) |
| Home | desktop | 98 / 98 / 98 | 97 / 98 / 98 (TBT 0 ms) |
| Luxury | mobile / desktop | – (not in the Phase 3 batch) | 100 / 100 |
| Other pages | both | – | within run-to-run noise; Accessibility, Best Practices and SEO unchanged; CLS 0–0.02 |

First-party JS transferred in the Lighthouse mobile runs went down 2–4 KB on every page: home 263 → 260, about 258 → 255, contact 257 → 254, services 292 → 288, portfolio 260 → 256, project 260 → 256, location 262 → 258 KB.

### Functional tests
EmailJS was **fully mocked**: every request to `api.emailjs.com` was intercepted and answered locally (200 after 700 ms, or 400). No real email was sent. Same script against the Phase 3 build and the Phase 4 build, desktop 1440×900 and mobile 390×844:

| Test | Phase 3 | Phase 4 |
|---|---|---|
| No dialog before the first open | ✓ | ✓ |
| Talk Now opens (navbar) / focus moves into the dialog / body scroll locked | ✓ | ✓ |
| Close button closes; focus returns to "Talk Now"; scroll lock released | ✓ | ✓ |
| Backdrop click closes | ✓ | ✓ |
| Escape closes | ✓ | ✓ |
| Tab focus trap (18 focusable controls; Tab from the last wraps to the first) | ✓ | ✓ |
| Empty submit → error banner, **0 requests** | ✓ | ✓ |
| Valid submit → "Sending Request…" with the button disabled; Escape ignored while sending | ✓ | ✓ |
| Success banner → auto-close after 1.8 s; payload fields unchanged (`area, budget, email, name, phone, project_type, service`) | ✓ | ✓ |
| Three submit events in the same tick | **3 requests** | **1 request** (fixed) |
| Reopen → form reset, no stale banner | ✓ | ✓ |
| Mocked 400 → error banner | ✓ | ✓ (1 request; Phase 3 had 2 from the earlier duplicates) |
| Homepage Hero "Talk Now" (separate instance) opens one dialog; Escape closes | ✓ | ✓ |
| Contact page form: 5 fields; empty submit shows 3 field errors; **0 requests** (its template ID is not configured, the known outstanding item) | ✓ | ✓ |
| Screenshot of the open dialog vs Phase 3 | – | mean pixel difference 0.000 (desktop) / 0.001 (mobile) |

### Validation
`pnpm verify`: typecheck ✓, lint 0 errors (37 pre-existing `no-img-element` warnings), contact-form tests 7/7 ✓, `images:check` ✓, build ✓, SEO validation ✓ for every page, canonical, structured-data block and sitemap. The **4 inherited redirect failures** are unchanged and still need a content decision:
`/our_portfolio/mr-nageswara-rao/`, `/our_portfolio/sammys-villa/`, `/our_portfolio/rakesh-bhupathi/`, `/our_portfolio/praveen-aparna-zenith-nallagandla/` → portfolio pages that return 404 (`ProjectsData.ts` has 6 projects vs 11 on the Vite site).

### Limitations and remaining issues
- **First open on slow networks** waits for the 5 KB chunk (about 95–108 ms on 9 Mbps, vs about 20 ms before). Optional mitigation: start the import on hover, focus or press of a Talk Now button, so the chunk usually arrives before the click lands. That would fetch it slightly before an actual open, so it is left for the owner's decision.
- **Pre-existing, unchanged (identical in Phase 3):**
  - Navigating with browser Back while the popup is open keeps it open with its last banner. The popup belongs to the persistent Navbar.
  - After landing on the homepage, the popup's body scroll lock is lost, because the testimonials section resets `body.style.overflow` when it mounts.

  Changing either would alter current behaviour, so both are reported, not changed.
- After a *successful* send, the form stays filled for 1.8 s before auto-closing, and the button is enabled again during that time. A deliberate second click would send a second request (unchanged behaviour). The new guard covers only requests that overlap in time.
- Idle-time `<Link>` prefetch of `/contact/` still brings the Contact form's EmailJS chunk into the cache on other pages (see the note above). Avoiding it would mean changing the Contact page form or prefetch behaviour, both outside this phase.

---

## Phase 4 follow-ups (done in Phase 5)

Intent-based preloading of the Talk Now popup (hover, focus, pointer-down on all 10 triggers) and the shared page scroll lock (popup and testimonial lightbox, including pausing Lenis while locked) are documented with measurements in [VIDEO_OPTIMIZATION.md](VIDEO_OPTIMIZATION.md#part-a--phase-4-follow-ups). Browser Back with the popup open is unchanged and recorded there as a known UX issue.
