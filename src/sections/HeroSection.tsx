"use client";

import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import ProjectModal from "../components/ProjectModal";

gsap.registerPlugin(ScrollTrigger);

// FIX 1: Prevents GSAP pins from violently jumping on iOS/Android when the address bar hides/shows
ScrollTrigger.config({ ignoreMobileResize: true });

const MinimalHero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // ---------------------------------------------------------------
  // 1. LENIS — smooth scroll, synced to GSAP's ticker so ScrollTrigger
  //    and Lenis agree on scroll position every single frame.
  // ---------------------------------------------------------------
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  // ---------------------------------------------------------------
  // 2. GSAP SCROLLTRIGGER — pins the section and holds it pinned
  //    for the FULL scrub duration. The section will not release
  //    until the timeline (shrink + reveal) completes.
  // ---------------------------------------------------------------
  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const gap = isMobile ? 40 : 80;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=150%", // <-- scroll distance the pin lasts for.
          scrub: 1, // smoothed scrub, tied to scroll position
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Heading fades/slides in first
      tl.fromTo(
        headingRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.35 },
        0.15
      );

      // Video shrinks from full-bleed to framed card
      tl.fromTo(
        videoWrapRef.current,
        {
          width: "100%",
          height: "100dvh", // Using dvh is fine, GSAP handles it well with ignoreMobileResize
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

      // Stats/buttons bar fades in slightly after the video settles
      tl.fromTo(
        statsRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.5
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const navigate = useNavigate();

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
  <div className="flex flex-wrap md:flex-nowrap items-start justify-center gap-3 md:gap-16 text-center">

    {/* Dream */}
    <div className="flex flex-col items-center">
      <h1 className="font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
        Dream
      </h1>
      <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.25em] text-[#8c6b63]">
        BIG
      </p>
    </div>

    <span className=" md:flex items-center text-5xl font-light text-[#4a1c13]/30">
      |
    </span>

    {/* Experience */}
    <div className="flex flex-col items-center">
      <h1 className="font-primary text-[#ff7043] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
        Experience
      </h1>
      <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]">
        Exceptional Design
      </p>
    </div>

    <span className=" md:flex items-center text-5xl font-light text-[#4a1c13]/30">
      |
    </span>

    {/* Live */}
    <div className="flex flex-col items-center">
      <h1 className="font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none">
        Live
      </h1>
      <p className="mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]">
        in Comfort
      </p>
    </div>

  </div>
</div>

        {/* Video Area */}
        <div
          ref={videoWrapRef}
          // FIX 3: Added transform-gpu to prevent layout thrashing and repaints on mobile when animating width/height/borderRadius
          className="absolute left-1/2 -translate-x-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10 shadow-2xl will-change-[width,height,border-radius,bottom] transform-gpu"
          style={{ width: "100%", height: "100dvh", bottom: 0 }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/video-fallback-poster.jpg"
            aria-hidden="true"
            // FIX 4: Added pointer-events-none. If a user taps the video on iOS, it can force-open the native fullscreen Apple video player. This prevents touch interactions on the video itself.
            className="absolute inset-0 h-full w-full object-cover opacity-90 pointer-events-none"
          >
            <source src="/bright-hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Stats & Buttons Container */}
          <div
            ref={statsRef}
            // FIX 5: transform-gpu added for smooth fade-in without artifacts on Android
            className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-5 md:py-5 md:px-10 rounded-[1.5rem] md:rounded-2xl z-20 w-[92%] md:w-auto shadow-2xl opacity-0 transform-gpu"
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
                <span className="text-white text-2xl md:text-3xl font-bold">14+</span>
                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">Years Exp.</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 w-full md:w-auto mt-2 md:mt-0">
              <button
                aria-label="View our portfolio of projects"
                onClick={() => navigate("/portfolio")}
                className="flex-1 md:flex-none w-full md:w-auto bg-[#ff7043] text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg text-center whitespace-nowrap transition-colors hover:bg-[#ffc107] hover:text-[#4a1c13] active:scale-95 touch-manipulation"
              >
                View Projects
              </button>

              <button
                aria-label="Open contact modal to talk now"
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