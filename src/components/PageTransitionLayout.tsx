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
      // Fade in the spinner
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
      // 4. Fade out the spinner
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
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { tilesRef.current[i] = el; }}
            className="w-full h-[20vh] bg-[#4a1c13] scale-x-0 origin-left"
          />
        ))}

        <div
          ref={iconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none"
        >
          <motion.svg
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            width="48"
            height="48"
            viewBox="0 0 40 40"
            fill="none"
            className="drop-shadow-lg"
          >
            <path opacity="0.2" fill="#f7f4ee" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
            <path fill="#f7f4ee" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z" />
          </motion.svg>
        </div>
      </div>

      
      {React.cloneElement(children as React.ReactElement<{ location: typeof displayLocation }>, { location: displayLocation })}
    </>
  );
};

export default PageTransitionLayout;