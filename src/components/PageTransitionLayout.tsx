"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

interface PageTransitionLayoutProps {
  children: React.ReactNode;
}

const PageTransitionLayout: React.FC<PageTransitionLayoutProps> = ({ children }) => {
  const location = useLocation();
  // We store a "display location" so we can delay the actual page change
  const [displayLocation, setDisplayLocation] = useState(location);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If the URL changes, trigger the transition sequence!
    if (location.pathname !== displayLocation.pathname) {
      const tl = gsap.timeline();

      // 1. Block user clicks during transition
      gsap.set(containerRef.current, { pointerEvents: "auto" });

      // 2. Animate tiles IN (Covering the screen)
      tl.to(tilesRef.current, {
        scaleX: 1,
        transformOrigin: "left",
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.inOut",
      })
      // Fade in the Logo
      .to(iconRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.3")
      // 3. MIDPOINT: The screen is covered. Now we swap the route and scroll to top!
      .call(() => {
        setDisplayLocation(location);
        window.scrollTo(0, 0);
      })
      // 4. Fade out the Logo
      .to(iconRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      }, "+=0.1")
      // 5. Animate tiles OUT (Uncovering the new page)
      .to(tilesRef.current, {
        scaleX: 0,
        transformOrigin: "right",
        duration: 0.6,
        stagger: 0.1,
        ease: "expo.inOut",
      }, "-=0.1")
      // 6. Unblock user clicks
      .set(containerRef.current, { pointerEvents: "none" });
    }
  }, [location, displayLocation]);

  return (
    <>
      {/* ========================================= */}
      {/* GSAP TRANSITION OVERLAY                   */}
      {/* ========================================= */}
      <div 
        ref={containerRef} 
        className="fixed inset-0 z-[9999] pointer-events-none flex flex-col"
      >
        {/* The 5 Dark Brown Tiles */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { tilesRef.current[i] = el; }}
            className="w-full h-[20vh] bg-[#4a1c13] scale-x-0 origin-left"
          />
        ))}

        {/* The Logo Container */}
        <div
          ref={iconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
        >
          <motion.img
            src="/bright-arena-logo.webp"
            alt="Bright Arena Logo"
            className="w-32 md:w-48 h-auto object-contain drop-shadow-2xl" 
            /* Note: 'brightness-0 invert' forces the logo to be solid white so it contrasts beautifully against the dark brown tiles. Remove those two classes if your logo is already light/white. */
            
            // Subtle breathing animation
            animate={{ scale: [0.95, 1.02, 0.95] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Explicitly passing the location prop to the children (the Routes block) */}
      {React.cloneElement(children as React.ReactElement<{ location: typeof displayLocation }>, { location: displayLocation })}
    </>
  );
};

export default PageTransitionLayout;