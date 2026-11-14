"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";

const PageTransition: React.FC = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Refs for GSAP targeting
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRef = useRef<HTMLDivElement>(null);

  // GSAP Orchestration
  useEffect(() => {
    // Create a timeline to sequence the animations perfectly
    const tl = gsap.timeline();

    if (isTransitioning) {
      // 1. Enable pointer events to block user interaction during load
      gsap.set(containerRef.current, { pointerEvents: "auto" });

      // 2. Animate tiles in from left to right
      tl.to(tilesRef.current, {
        scaleX: 1,
        transformOrigin: "left", // Expand from the left edge
        duration: 0.8,
        stagger: 0.1, // 0.1s delay between each tile
        ease: "expo.inOut",
      })
      // 3. Fade in the spinner slightly before the tiles finish
      .to(iconRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.4"); 
      
    } else {
      // 1. Fade out the spinner first
      tl.to(iconRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      // 2. Collapse tiles from left to right (moving away)
      .to(tilesRef.current, {
        scaleX: 0,
        transformOrigin: "right", // Shrink towards the right edge
        duration: 0.8,
        stagger: 0.1,
        ease: "expo.inOut",
      }, "-=0.1")
      // 3. Disable pointer events so the user can interact with the page again
      .set(containerRef.current, { pointerEvents: "none" });
    }

    // Cleanup timeline on unmount
    return () => {
      tl.kill();
    };
  }, [isTransitioning]);

  // Demo Trigger Function
  const handleToggle = () => {
    setIsTransitioning(true);
    // Simulate a page load/network request for 3 seconds, then close it
    setTimeout(() => {
      setIsTransitioning(false);
    }, 3000);
  };

  return (
    <>
      {/* ========================================= */}
      {/* TRANSITION OVERLAY                        */}
      {/* ========================================= */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[999] pointer-events-none flex flex-col"
      >
        {/* Render 5 Staggered Tiles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              // Store references to each tile for GSAP
              tilesRef.current[i] = el;
            }}
            // Using brand colors (Dark Brown) for a premium feel
            className="w-full h-[20vh] bg-[#4a1c13] scale-x-0"
          />
        ))}

        {/* Loading Icon Wrapper */}
        <div
          ref={iconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
        >
          {/* Framer Motion handles the infinite rotation cleanly */}
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="drop-shadow-lg"
          >
            <path 
              opacity="0.2" 
              fill="#ffc107" // Bright Yellow accent
              d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" 
            />
            <path 
              fill="#ffc107" 
              d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" 
            />
          </motion.svg>
        </div>
      </div>

      {/* ========================================= */}
      {/* PAGE CONTENT & TRIGGER                    */}
      {/* ========================================= */}
      <main className="min-h-screen flex items-center justify-center bg-[#f7f4ee]">
        <button
          onClick={handleToggle}
          className="bg-[#ff7043] text-white px-8 py-3 rounded-full font-semibold tracking-wide hover:bg-[#4a1c13] transition-colors duration-300 active:scale-95"
        >
          Toggle Page Transition
        </button>
      </main>
    </>
  );
};

export default PageTransition;