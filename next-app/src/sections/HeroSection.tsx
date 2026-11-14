"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "@/lib/smoothScroll";
import ProjectModal, { talkNowIntent } from "../components/LazyProjectModal";
import { preload } from "react-dom";
import { imageVariants } from "@/lib/responsiveImage";

gsap.registerPlugin(ScrollTrigger);

// Prevents GSAP pins from violently jumping on iOS/Android when the address bar hides/shows
ScrollTrigger.config({ ignoreMobileResize: true });

// Hero video loading (Phase 5):
// - The video opens with a fade-in from black (frames 0-1.75 s); the first fully faded-in frame is at 2 s.
//   The poster is that frame, extracted from bright-hero-video.mp4, and the first playback starts there,
//   so the poster hands over to motion without a jump. The 60 s -> 1 s loop below is unchanged.
//   (The start time is set just before play() rather than with a #t= media fragment: a fragment makes the
//   browser seek and buffer video data during page load, which preload="metadata" is meant to avoid.)
// - preload="metadata" and no `autoPlay` attribute: the ~4.9 MB file is no longer downloaded alongside the
//   page's critical resources. Playback starts once the page has loaded and the hero is visible.
const VIDEO_START_SECONDS = 2;
const VIDEO_SRC = "/bright-hero-video.mp4";
const POSTER_SOURCE = "/bright-hero-video-poster.jpg";
// Largest build-time WebP variant (1280 px = the video's own resolution); falls back to the source file.
const POSTER_SRC = imageVariants(POSTER_SOURCE).at(-1)?.url ?? POSTER_SOURCE;

const MinimalHero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  // Reference to control the video directly
  const videoRef = useRef<HTMLVideoElement>(null);

  // The full-screen poster is the homepage's largest first paint (LCP): fetch it early, at high priority.
  preload(POSTER_SRC, { as: "image", fetchPriority: "high" });

  // ---------------------------------------------------------------
  // 1. LENIS — smooth scroll (one shared instance, see src/lib/smoothScroll.ts)
  // ---------------------------------------------------------------
  useSmoothScroll();

  // ---------------------------------------------------------------
  // 2. GSAP SCROLLTRIGGER — animations
  // ---------------------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const gap = isMobile ? 40 : 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
        0.15
      );

      tl.fromTo(
        videoWrapRef.current,
        {
          width: "100%",
          height: "100dvh",
          borderRadius: "0px",
          bottom: "0px",
        },
        {
          width: `calc(100% - ${gap}px)`,
          height: "60dvh",
          borderRadius: "32px",
          bottom: "32px",
          ease: "power2.inOut",
          duration: 0.55,
        },
        0.05
      );

      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ---------------------------------------------------------------
  // 3. PLAYBACK: start after page load while visible; pause when off screen or the tab is hidden
  // ---------------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;

    if (!video || !section) return;

    // Reduced motion: keep the static poster (the video is never played, so only its metadata loads).
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let visible = false;
    let pageLoaded = document.readyState === "complete";
    let started = false;

    const tryPlay = () => {
      if (!visible || !pageLoaded || document.visibilityState !== "visible") return;
      if (!started) {
        started = true;
        // First playback starts on the poster's frame (see VIDEO_START_SECONDS).
        if (video.currentTime < VIDEO_START_SECONDS) video.currentTime = VIDEO_START_SECONDS;
      }
      video.play().catch((err) => console.log("Video auto-play prevented:", err));
    };
    const onPageLoad = () => {
      pageLoaded = true;
      tryPlay();
    };
    if (!pageLoaded) window.addEventListener("load", onPageLoad, { once: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: 0 }
    );
    observer.observe(section);

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") tryPlay();
      else video.pause();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener("load", onPageLoad);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  // ---------------------------------------------------------------
  // 4. CUSTOM VIDEO LOOP LOGIC (Loops at 60s back to 1s)
  // ---------------------------------------------------------------
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    // If video reaches or passes 60 seconds (1 minute)...
    if (video.currentTime >= 60) {
      // ...instantly jump back to 1 second
      video.currentTime = 1;
      // Ensure it keeps playing
      video.play().catch(console.error);
    }
  };

  const router = useRouter();

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Hero Section"
        className="relative w-full h-[100dvh] bg-[#f7f4ee] antialiased z-10 overflow-hidden"
      >
        {/* Heading Area */}
        <div
          ref={headingRef}
          className="absolute top-0 left-0 w-full h-[40dvh] flex items-center justify-center pt-18 px-4 md:px-8 z-0 opacity-0 transform-gpu"
        >
          <h2 className="sr-only">
            Dream Big. Experience Exceptional Design. Live in Comfort.
          </h2>

          <div className="grid grid-cols-2 gap-y-6 w-full md:w-auto md:flex md:flex-nowrap items-start justify-center md:gap-16 text-center">
            <div className="flex flex-col items-center order-1 md:order-none col-span-1" aria-hidden="true">
              <h2 className="font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
                Dream
              </h2>
              <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.25em] text-[#8c6b63]">
                BIG
              </p>
            </div>

            <span aria-hidden="true" className="hidden md:flex items-center text-5xl font-light text-[#4a1c13]/30 order-none">
              |
            </span>

            <div className="flex flex-col items-center order-3 md:order-none col-span-2 md:col-span-1 mt-2 md:mt-0" aria-hidden="true">
              <h2 className="font-primary text-[#ff7043] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
                Experience
              </h2>
              <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]">
                Exceptional Design
              </p>
            </div>

            <span aria-hidden="true" className="hidden md:flex items-center text-5xl font-light text-[#4a1c13]/30 order-none">
              |
            </span>

            <div className="flex flex-col items-center order-2 md:order-none col-span-1" aria-hidden="true">
              <h2 className="font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
                Live
              </h2>
              <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]">
                in Comfort
              </p>
            </div>
          </div>
        </div>

        {/* Video Area */}
        <div
          ref={videoWrapRef}
          className="absolute left-1/2 -translate-x-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10 shadow-2xl will-change-[width,height,border-radius,bottom] transform-gpu"
          style={{ width: "100%", height: "100dvh", bottom: 0 }}
        >
          <video
            ref={videoRef}
            onTimeUpdate={handleTimeUpdate} /* <-- Trigger the loop check every frame */
            muted
            // REMOVED 'loop' attribute so it doesn't conflict with our custom loop
            playsInline
            preload="metadata"
            poster={POSTER_SRC}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Stats & Buttons Container */}
          <div
            ref={statsRef}
            className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-5 md:py-5 md:px-10 rounded-[1.5rem] md:rounded-2xl z-20 w-[92%] md:w-auto shadow-2xl opacity-0 transform-gpu"
            style={{
              paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex items-center justify-center gap-8 md:gap-10 w-full md:w-auto">
              <div className="flex flex-col items-center">
                <span className="text-white text-2xl md:text-3xl font-bold">350+</span>
                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">Projects</span>
              </div>
              <div className="w-px h-10 md:h-12 bg-white/20" />
              <div className="flex flex-col items-center">
                <span className="text-white text-2xl md:text-3xl font-bold">15+</span>
                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">Years Exp.</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button
                aria-label="View our portfolio of projects"
                onClick={() => router.push("/portfolio/")}
                className="flex-1 md:flex-none w-full md:w-auto bg-[#ff7043] text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg text-center whitespace-nowrap transition-colors hover:bg-[#ffc107] hover:text-[#4a1c13] active:scale-95 touch-manipulation"
              >
                View Projects
              </button>

              <button
                aria-label="Open contact modal to talk now"
                {...talkNowIntent}
                onClick={() => setIsModalOpen(true)}
                className="flex-1 md:flex-none w-full md:w-auto bg-white/5 border border-white/30 text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase text-center whitespace-nowrap transition-colors hover:bg-white/20 active:scale-95 touch-manipulation"
              >
                Talk Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default MinimalHero;