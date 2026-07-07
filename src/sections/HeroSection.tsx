"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../components/ProjectModal";

// Premium Apple-like easing curve for fluid, expensive-feeling motion
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MinimalHero: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Dynamic Gap Logic to match Navbar (px-5 / md:px-10) ---
  const [horizontalGap, setHorizontalGap] = useState("80px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHorizontalGap("40px");
      } else {
        setHorizontalGap("80px");
      }
    };

    handleResize(); // Set on initial load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Track the scroll progress within the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Add a spring to smooth out the scroll scrubbing slightly
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5,
  });

  // Map scroll progress (0 to 0.33) to shrink the video
  const videoWidth = useTransform(
    smoothProgress,
    [0, 0.33],
    ["100%", `calc(100% - ${horizontalGap})`]
  );
  
  // FIXED: Start at 100vh on both mobile and desktop for true full screen
  const videoHeight = useTransform(
    smoothProgress,
    [0, 0.33],
    ["100vh", "60vh"] 
  );
  
  const videoBR = useTransform(smoothProgress, [0, 0.33], ["0px", "32px"]);
  const videoBottom = useTransform(smoothProgress, [0, 0.33], ["0px", "32px"]);

  // TEXT REVEAL: Text fades IN and slides UP as the video moves out of the way
  const textOpacity = useTransform(smoothProgress, [0.1, 0.33], [0, 1]);
  const textY = useTransform(smoothProgress, [0.1, 0.33], ["40px", "0px"]);

  const navigate = useNavigate();

  return (
    <>
      {/* Semantic main section for SEO */}
      <section
        ref={containerRef}
        aria-label="Hero Section"
        className="relative w-full h-[300vh] bg-[#f7f4ee] antialiased"
      >
        {/* Pinned Viewport Container */}
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start overflow-hidden">
          
          {/* Heading Area (Behind the video initially) */}
          <motion.div
            style={{ opacity: textOpacity, y: textY }}
            className="w-full h-[40vh] flex flex-col items-center justify-center pt-20 px-4 md:px-8 z-0"
          >
            <div className="overflow-hidden flex justify-center w-full">
              <motion.h1 className="text-[#4a1c13] font-primary text-[clamp(48px,8vw,80px)] lg:text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight text-center whitespace-normal lg:whitespace-nowrap mx-auto">
                Live <span className="text-[#ffc107]">Beautifully</span>
                <br className="block lg:hidden" />
                <span className="hidden lg:inline"> </span>
                Every Day
              </motion.h1>
            </div>
          </motion.div>

          {/* Video Area (Starts Full Screen, z-10 puts it above the text) */}
          <motion.div
            style={{
              width: videoWidth,
              height: videoHeight,
              borderRadius: videoBR,
              bottom: videoBottom,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: smoothEase }}
            className="absolute left-1/2 -translate-x-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10 shadow-2xl will-change-transform"
          >
            {/* The Video Element - Added accessibility and performance attributes */}
            <motion.video
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2.5, ease: smoothEase }}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster="/video-fallback-poster.jpg" // IMPORTANT: Replace with a real static image path to prevent blank flashes
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover opacity-90"
            >
              <source src="/bright-hero-video.mp4" type="video/mp4" />
            </motion.video>

            {/* Gradient Overlay for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Stats & Buttons Inner Container */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              // FIXED: bottom-24 bumps it higher on mobile. w-[92%] ensures it scales nicely without touching edges.
              className="absolute bottom-24 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-5 md:py-5 md:px-10 rounded-[1.5rem] md:rounded-2xl z-20 w-[92%] md:w-auto shadow-2xl"
              style={{
                paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
              }}
            >
              {/* Stats Row */}
              <div className="flex items-center justify-center gap-8 md:gap-10 w-full md:w-auto">
                <div className="flex flex-col items-center">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    13+
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">
                    Projects
                  </span>
                </div>

                <div className="w-px h-10 md:h-12 bg-white/20" />

                <div className="flex flex-col items-center">
                  <span className="text-white text-2xl md:text-3xl font-bold">
                    05+
                  </span>
                  <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">
                    Years Exp.
                  </span>
                </div>
              </div>

              {/* Buttons Row - FIXED ALIGNMENT */}
              <div className="flex items-center justify-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                <motion.button
                  aria-label="View our portfolio of projects"
                  onClick={() => navigate("/portfolio")}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "#ffc107",
                    color: "#4a1c13",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none w-full md:w-auto bg-[#ff7043] text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg text-center whitespace-nowrap transition-colors"
                >
                  View Projects
                </motion.button>

                <motion.button
                  aria-label="Open contact modal to talk now"
                  onClick={() => setIsModalOpen(true)}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,.2)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 md:flex-none w-full md:w-auto bg-white/5 border border-white/30 text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase text-center whitespace-nowrap transition-colors"
                >
                  Talk Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default MinimalHero;