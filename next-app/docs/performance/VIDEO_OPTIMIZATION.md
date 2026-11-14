# Phase 5 – Hero Video (plus Phase 4 follow-ups)

Status: **complete** (2026-11-14). Previous phases: [IMAGE_OPTIMIZATION.md](IMAGE_OPTIMIZATION.md), [JAVASCRIPT_OPTIMIZATION.md](JAVASCRIPT_OPTIMIZATION.md).

All measurements use production builds (`next start`). "Phase 4" is the approved Phase 4 build; "Phase 5" is this build.

---

## Part A – Phase 4 follow-ups

### A1. Talk Now intent preloading
- `src/components/LazyProjectModal.tsx` now exports:
  - `preloadProjectModal()`: starts the shared one-time `import()` and never opens anything. A failed preload resets the promise so the real open retries.
  - `talkNowIntent`: `{ onPointerEnter, onFocus, onPointerDown }`, i.e. desktop hover, keyboard focus, and touch/pen/mouse press.
- It is spread onto all **10** Talk Now triggers: Navbar desktop + mobile, the homepage Hero, 4 on `LuxuryPage` and 3 on `TopInteriorDesignerPage`.
- Nothing is fetched on page load or because a trigger is visible.

| Check (desktop and mobile) | Result |
|---|---|
| Chunks fetched after load with the trigger visible for 3 s | modal chunk **not** fetched |
| Hover (desktop) / pointer-down (mobile) | modal chunk fetched; **popup not opened** |
| Keyboard focus | modal chunk fetched |
| Click after the intent | **no** further fetch (already loaded) |
| First open, 9 Mbps / 60 ms, click 150 ms after hover | Phase 4: 100 / 101 / 100 ms → **Phase 5: 18 / 8 / 20 ms** |

### A2. Background scroll lock (popup / testimonial lightbox)
**Root cause** – two separate problems:
1. `ProjectModal` and `TestimonialSection` each wrote `document.body.style.overflow` directly, so the last writer won. The testimonials section setting `"unset"` when it mounts cancelled an open popup's lock (seen after browser Back to the homepage with the popup open).
2. On the desktop homepage, `overflow: hidden` on `<body>` never stopped the page anyway. Lenis scrolls the window from script on wheel input. The original Vite site behaves the same: the page scrolled 1,200 px behind the open popup.

**Change**
- `src/lib/scrollLock.ts` (new): a reference-counted `lockPageScroll()`. The page stays locked while any overlay holds a lock, and the same `hidden`/`unset` values are used as before.
- `ProjectModal.tsx` and `TestimonialSection.tsx` take and release a lock instead of writing `overflow` directly.
- `src/lib/smoothScroll.ts`: the shared Lenis subscribes to the lock and calls Lenis's own `stop()` / `start()`. This is an addition only; the Lenis setup is unchanged.
- `ProjectModal`: `data-lenis-prevent` on the dialog, so its own form still scrolls natively on short screens while the page behind it is locked.

| Check | Phase 4 | Phase 5 |
|---|---|---|
| Desktop homepage: wheel behind the open popup | page scrolled **1,200 px** | **0 px** |
| Desktop homepage: wheel behind the open testimonial lightbox | page scrolled **1,072 px** | **0 px** |
| Popup open, browser Back to the homepage (testimonials mount while the popup is open) | lock lost (`unset`; scrolled 1,200 px desktop / 385 px mobile) | lock held (`hidden`; **0 px**) |
| Mobile popup / lightbox (native touch scrolling) | 0 px | 0 px |
| Popup's own content scroll container (short viewport) | scrolls | scrolls |
| After closing either overlay | page scrolls normally | page scrolls normally |
| Testimonial lightbox opens (YouTube iframe) and closes | ✓ | ✓ |

### A3. Browser Back with the popup open (known UX issue, unchanged)
The popup belongs to the persistent Navbar, so pressing Back while it is open keeps it open on the previous page with its last state (e.g. the error banner). This is unchanged by request and is documented as a known UX issue. The scroll lock now holds in that state (A2).

### A4. Phase 4 functionality re-verified
The complete Phase 4 suite (33 checks, EmailJS fully mocked, desktop and mobile) was run on Phase 5 vs Phase 4:
- identical results except the intended scroll-lock change (`afterNavWhileOpen.bodyOverflow`: `unset` → `hidden`) and open-time noise;
- open, close, backdrop, Escape (ignored while sending), focus in, focus trap and focus restore all pass;
- validation (0 requests on an empty submit), sending → success → auto-close, mocked 400 → error, form reset on reopen, 1 request for a burst of submits all pass;
- the Hero instance and the independent Contact form (0 requests) also pass.

---

## Part B – Video audit

| Item | Finding |
|---|---|
| Videos in the app | **One**: the homepage hero (`src/sections/HeroSection.tsx`). No other `<video>` and no other video files. Testimonial videos are click-to-play YouTube iframes, not preloaded media. |
| File | `public/bright-hero-video.mp4`: **4,906 KB**, H.264 (avc1) 1280×720, AAC audio track, **66 s**, about 600 kbit/s, `moov` box at the start (fast start). Identical to the Vite original. |
| Playback | `autoPlay`, `muted`, `playsInline`, no `loop` attribute. A custom loop jumps from 60 s back to 1 s. An IntersectionObserver paused the video while the hero was off screen. |
| Sound | the audio track is present; the element is always muted |
| Loading | `preload="auto"` + `autoPlay`. The request started 59–176 ms after navigation and **4.1–4.7 MB arrived within 5 s** on desktop and mobile, competing with the page's own resources. |
| Poster | `/video-fallback-poster.jpg` returned **404**, so the hero was plain brown until the first frame. |
| First frames | **frames 0–0.5 s are black** (mean brightness 0); the fade-in completes at about **1.75 s** (brightness 0 → 35 → 74 → 113 → 125 at 0.5 / 1.0 / 1.25 / 1.5 / 1.75 s). The first fully lit frame is at 2.0 s. |
| Mobile | same 1280×720 file, cropped by `object-cover`; no smaller mobile asset exists |
| Essential? | yes: it fills the first screen behind the heading and stats |
| Duplicates / unused | none: 1 request per load; no unused video files |

---

## Part C – Changes

`src/sections/HeroSection.tsx`:
- **Poster:** the 2.0 s frame, extracted losslessly from `bright-hero-video.mp4` (canvas capture, 1280×720), saved as `public/bright-hero-video-poster.jpg`.
  - Like every other image in `public/`, it went through the existing `images:optimize` step (q80, 62 KB) and the Phase 1 responsive pipeline.
  - The page uses the hashed **1280 px WebP variant (32 KB)**, the video's own resolution.
  - No new imagery: it is a frame of the approved video.
- **Poster preload:** `preload(posterUrl, { as: "image", fetchPriority: "high" })` from `react-dom` puts a `<link rel="preload">` in the server-rendered `<head>`.
- **`preload="metadata"`**, and the `autoPlay` attribute removed: with `autoPlay`, browsers download the video immediately regardless of `preload`. `muted` and `playsInline` are unchanged.
- **Playback start:** once the page `load` event has fired, the hero is visible and the tab is visible (`play()` on a muted video is allowed by autoplay policies).
- **First playback starts at 2.0 s:** the poster's frame, so the hand-over is seamless.
  - This skips the 1.75 s black fade-in, on the first play only. The 60 s → 1 s loop is unchanged.
  - The start time is set just before the first `play()` rather than with a `#t=2` media fragment. A first implementation used `#t=2` and measured worse: the fragment made Chrome seek and buffer video during page load (0.2–1 MB before `load`, and 0.6–1 MB even with reduced motion).
- **Pause rules:** off screen (existing IntersectionObserver) and now also when the tab is hidden; playback resumes on return.
- **Reduced motion:** the video is never played; the static poster stays.
- **Failure:** if the video cannot load, the poster stays (no blank hero).
- **Layout:** the video element, wrapper sizes, crop (`object-cover`), overlays, text placement and GSAP animations are unchanged. CLS is unchanged.

---

## Part E – Measurements

### Video loading, homepage (in-browser; network throttled to 9 Mbps / 60 ms where noted)

| Profile | Metric | Phase 4 | Phase 5 |
|---|---|---|---|
| Desktop, unthrottled | video KB by `load` / in 5 s | 4,096 / 4,096 | 1,024 / 3,200 |
| | playback starts | 753 ms | 1,148 ms (after `load`) |
| | poster | 404 | 200 at 74 ms |
| Mobile 390×844, unthrottled | video KB by `load` / in 5 s | 4,636 / 4,636 | 1,024 / 3,712 |
| | playback starts | 593 ms | 640 ms |
| Desktop, throttled | video KB by `load` / in 5 s | 699 / 4,754 | **147** / 4,514 |
| | first frame / playback | 1,592 / 1,592 ms | 1,497 / 2,308 ms |
| Mobile, throttled + 4× CPU | video KB by `load` / in 5 s | 278 / 4,187 | **136** / 3,834 |
| | first frame / playback | 1,389 / 1,390 ms | 1,517 / 1,859 ms |
| Desktop, reduced motion | video KB total | (played: ~4–8 MB) | **316** (metadata only; never plays) |
| Mobile throttled, reduced motion | video KB total | (played) | **161** |

Unthrottled localhost delivers Chrome's first 1 MB media read before `load` simply because the page finishes loading in 0.4–0.8 s there.

**What visitors see** (timed screenshots, 9 Mbps; Phase 4 vs Phase 5, same capture times):

| Time after navigation | Phase 4 | Phase 5 |
|---|---|---|
| ~0.9 s (desktop) / ~1.3 s (mobile) | blank brown hero | **room visible (poster)** |
| ~1.4 s / ~1.6 s | blank brown | poster (desktop) / video playing from 2.0 s (mobile) |
| ~2.6 s | dark, mid fade-in | video playing (t = 2.6–2.8 s) |
| ~4.1 s | room visible | video playing |

Crop, overlays, navbar and composition are identical in both.

### Lighthouse 13.6 (same runner and settings as every phase)

| Page | FF | Phase 4 | Phase 5 |
|---|---|---|---|
| Home | mobile | 76 / 79 / 78; payload 4,439 / 5,271 / 3,991 KB; video 2,432–3,712 KB requested at about 0.1 s; SI 4.09–4.24 s; LCP 5.12–5.13 s (navbar logo); TBT 56–186 ms | **76 / 80 / 80**; payload **1,659–1,723 KB**; video **68–132 KB** (metadata request at about 0.1 s, playback request after load at 0.7–1.5 s); **SI 2.54–3.05 s**; LCP 5.21 / 5.35 / 6.18 s (navbar logo; render delay, Phase 7); TBT 61–100 ms |
| Home | desktop | 97 / 98 / 98; payload 4,694–5,989 KB; video 2,752–4,096 KB; SI 1.35–1.39 s; LCP 0.75–0.96 s (navbar logo) | **99 / 98 / 98**; payload **1,641–2,166 KB**; video **68–193 KB**; **SI 0.74–0.79 s**; LCP 0.94–1.02 s, where the LCP element is now the full-screen hero with its poster; TBT 0 ms |
| Inner pages | both | – | unchanged within run-to-run noise (they have no video) |

CLS is unchanged (0–0.019). Main-thread work on the homepage is in the same range (mobile 3,007–3,825 ms vs 2,835–3,573 ms; desktop 886–914 ms vs 957–985 ms).

---

## Part D – Tests (production build, desktop 1440×900 and mobile 390×844)

| Test | Result |
|---|---|
| Autoplay (muted) after load | ✓ playing, desktop and mobile |
| Poster visible while the video loads (9 Mbps) | ✓ from the first screenshot (see above) |
| Hero scrolled off screen → paused; back on screen → resumes | ✓ |
| Tab hidden → paused; visible → resumes | ✓ (Phase 4 did not pause on tab hide) |
| Navigate away (client nav to /about/) and Back → plays again | ✓ |
| Reduced motion → static poster, video never plays | ✓ |
| Video request blocked (failed network) → poster stays, page works, no blank hero | ✓ (screenshot checked) |
| Video requested on other pages (direct loads of /about/, /services/, /portfolio/, /contact/, luxury) | **0** requests |
| No video element outside the homepage | ✓ |
| Visual comparison with Phase 4 | identical composition, crop and overlays; differences only in timing (poster instead of brown/black) |
| Part A tests | see Part A tables |

## Validation
`pnpm verify`: typecheck ✓, lint 0 errors (37 pre-existing warnings), contact-form tests 7/7 ✓, `images:check` ✓ (poster registered in both image manifests), build ✓, SEO ✓ for all metadata, canonicals, structured data and sitemaps. The **4 inherited redirect failures** are unchanged and not addressed: `/our_portfolio/mr-nageswara-rao/`, `/our_portfolio/sammys-villa/`, `/our_portfolio/rakesh-bhupathi/`, `/our_portfolio/praveen-aparna-zenith-nallagandla/`.

## Files changed
- New:
  - `src/lib/scrollLock.ts`;
  - `public/bright-hero-video-poster.jpg` (frame extracted from the approved video);
  - `public/_img/bright-hero-video-poster.*.webp` (5 generated variants);
  - `docs/performance/VIDEO_OPTIMIZATION.md`.
- Changed:
  - `src/sections/HeroSection.tsx`: video loading and playback, poster;
  - `src/components/LazyProjectModal.tsx`: intent preload;
  - `src/components/ProjectModal.tsx`: shared lock, `data-lenis-prevent`;
  - `src/sections/TestimonialSection.tsx`: shared lock;
  - `src/lib/smoothScroll.ts`: pause while locked;
  - `src/components/Navbar.tsx`, `src/views/LuxuryPage.tsx`, `src/views/TopInteriorDesignerPage.tsx`: intent props on triggers;
  - `src/data/responsive-images.json`, `scripts/image-manifest.json`: poster entries (generated).
- Not changed: the video file, `ProjectsData.ts`, redirects, the Vite app, the Phase 1–3 implementations (apart from the small scroll-lock subscription in `smoothScroll.ts` described in A2).

## Remaining issues
- **Skipped intro fade (decision to confirm):** first playback starts at 2.0 s, so visitors no longer see the 1.75 s fade-in from black; they see the room immediately. To restore the fade, set `VIDEO_START_SECONDS = 0` in `HeroSection.tsx`. The poster would then hand over to a black frame, so a black poster (frame 0) would be the matching choice.
- **Playback starts after `load`:** about 0.05–0.7 s later than before on the tested profiles, with the poster showing the same frame during that time.
- **Mobile LCP is still the navbar logo** (about 5.2 s simulated), dominated by element render delay after hydration; this is for Phase 7. The poster did not become the mobile LCP element in Lighthouse. On desktop it did, at about 1.0 s.
- **No smaller mobile video:** none exists. A 720p mobile encode at a lower bitrate could cut playback bytes on phones further, but needs an approved asset.
- **Browser Back with the popup open** keeps it open (known UX issue, unchanged by request).
