"use client";
import { useEffect, useRef, useState } from "react";
import type { PanoramaController } from "./panoramaEngine";

/**
 * InteractivePanorama360
 * ------------------------------------------------------------------
 * A true 360-degree panorama viewer: the equirectangular photo is projected onto the inside of a sphere
 * and rendered through a WebGL camera; dragging rotates the look direction, scroll/buttons zoom.
 *
 * Performance (Phase 2): this component is only the shell - the same markup, server-rendered, so the
 * section's size never changes and GSAP ScrollTrigger positions are unaffected. The WebGL engine
 * (./panoramaEngine, which pulls in three.js) is dynamically imported when the section comes within
 * ~one viewport of the screen, and only renders while the section is actually visible.
 *
 * Usage:
 *   <InteractivePanorama360 src="/Panorama.jpeg" />
 * ------------------------------------------------------------------
 */

interface InteractivePanorama360Props {
  src: string;
  className?: string;
  /** Degrees per second for gentle auto-rotation when idle. 0 disables it. */
  autoRotateSpeed?: number;
  /** Section headline shown above the viewer */
  title?: string;
  /** Short supporting line shown under the headline */
  description?: string;
}

/**
 * Start downloading three.js + the texture this far (3.25 viewport heights) before the section scrolls into
 * view. Once GSAP's pin spacers are in place the section sits ~12 viewports down on desktop and ~9 on
 * mobile, so nothing loads at page load, but there is enough lead time for the 1.4 MB desktop texture to
 * arrive before a briskly scrolling visitor reaches it.
 */
const PRELOAD_MARGIN = "325% 0px";

export default function InteractivePanorama360({
  src,
  className = "",
  autoRotateSpeed = 1.2,
  title = "Step Inside, Virtually",
  description = "Explore this space in full 360°. Drag to look around, scroll to zoom in on the details.",
}: InteractivePanorama360Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<PanoramaController | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container || window.__IS_PRERENDERING__) return;

    let cancelled = false;
    let visible = false;
    let loadObserver: IntersectionObserver | null = null;

    // Render only while the section is on screen.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      controllerRef.current?.setVisible(visible);
    });
    visibilityObserver.observe(section);

    // Load the engine (three.js chunk + texture) once, when the section approaches the viewport.
    const load = () => {
      loadObserver?.disconnect();
      loadObserver = null;
      import("./panoramaEngine").then(({ createPanorama }) => {
        // Unmounted (or effect re-run) while the chunk was downloading: never create a second renderer.
        if (cancelled || controllerRef.current) return;
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        controllerRef.current = createPanorama(container, {
          src,
          autoRotateSpeed,
          reducedMotion,
          onLoad: () => { if (!cancelled) setIsLoading(false); },
          onError: () => { if (!cancelled) { setIsLoading(false); setHasError(true); } },
        });
        controllerRef.current.setVisible(visible);
      }).catch(() => {
        if (!cancelled) { setIsLoading(false); setHasError(true); }
      });
    };
    loadObserver = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) load(); }, { rootMargin: PRELOAD_MARGIN });
    loadObserver.observe(section);

    return () => {
      cancelled = true;
      loadObserver?.disconnect();
      visibilityObserver.disconnect();
      controllerRef.current?.dispose();
      controllerRef.current = null;
    };
  }, [src, autoRotateSpeed]);

  const zoomIn = () => controllerRef.current?.zoomIn();
  const zoomOut = () => controllerRef.current?.zoomOut();
  const resetView = () => controllerRef.current?.resetView();

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 md:px-8 py-12 flex flex-col items-center font-sans">
      {(title || description) && (
        <div className="max-w-2xl text-center mb-8 md:mb-10">
          {title && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-primary font-semibold text-[#4a1c13] tracking-tight leading-tight">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-sm md:text-base text-[#4a1c13]/70 leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-4 mx-auto w-12 h-[2px] bg-[#ff7043]" />
        </div>
      )}

      <section
        ref={sectionRef}
        className={`relative w-full h-[55vh] md:h-[70vh] lg:h-[80vh] bg-black overflow-hidden rounded-md border border-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.1)] cursor-grab ${className}`}
      >
        <div ref={containerRef} className="absolute inset-0" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-30 text-white text-sm tracking-wide">
            Loading 360&deg; view&hellip;
          </div>
        )}

        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/90 z-30 text-white text-sm tracking-wide px-6 text-center">
            Couldn&apos;t load the panorama image. Check that the file at
            <span className="mx-1 font-mono">{src}</span>
            exists and is a valid equirectangular (2:1) panorama.
          </div>
        )}

        {/* Controls (top left) */}
        <div className="absolute top-4 left-4 z-20 flex flex-col shadow-lg rounded-sm overflow-hidden border border-gray-200">
          <button
            onClick={zoomIn}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200"
            title="Zoom In"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <button
            onClick={zoomOut}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors border-b border-gray-200"
            title="Zoom Out"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>

          <button
            onClick={resetView}
            className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-gray-100 transition-colors"
            title="Reset View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M3 8V5a2 2 0 0 1 2-2h3"></path>
              <path d="M21 8V5a2 2 0 0 0-2-2h-3"></path>
              <path d="M3 16v3a2 2 0 0 0 2 2h3"></path>
              <path d="M21 16v3a2 2 0 0 1-2 2h-3"></path>
            </svg>
          </button>
        </div>

        {/* Compass (bottom right) */}
        <div className="absolute bottom-4 right-4 z-20 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-lg pointer-events-none opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7 text-black transform -rotate-45">
            <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v16.19l6.22-6.22a.75.75 0 111.06 1.06l-7.5 7.5a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 111.06-1.06l6.22 6.22V3a.75.75 0 01.75-.75z" clipRule="evenodd" />
          </svg>
        </div>
      </section>

      <div className="mt-4 text-[#5D4037]/70 text-sm tracking-wide text-center">
        Drag to <strong className="text-[#2A2220] font-bold">Look Around</strong>, Scroll to <strong className="text-[#2A2220] font-bold">Zoom</strong>
      </div>
    </div>
  );
}