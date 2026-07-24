"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function InteractivePanorama() {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Track the scroll progress of this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // 2. Move the image horizontally based on scroll (Auto-pan)
  // This creates the effect that scrolling down rotates the room.
  const scrollX = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden bg-[#1a1a1a] rounded-3xl group"
    >
      {/* 
        OUTER WRAPPER: Handles the scroll movement.
        As the user scrolls down, this moves to the left.
      */}
      <motion.div 
        className="absolute inset-0 h-full w-[200%] md:w-[150%]" 
        style={{ x: scrollX }}
      >
        {/* 
          INNER WRAPPER: Handles the Drag (Click & Hold) movement.
          The user can drag this back and forth inside the outer wrapper.
        */}
        <motion.div
          drag="x"
          // These constraints stop the user from dragging past the edges of the image
          dragConstraints={{ left: -800, right: 0 }}
          dragElastic={0.1} // Adds a nice Apple-like bounce at the edges
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <img
            // Replace with your ultra-wide / panoramic interior image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2500&auto=format&fit=crop"
            alt="360 Degree Interior View"
            className="w-full h-full object-cover pointer-events-none"
          />
        </motion.div>
      </motion.div>

      {/* UX Hint Overlay - Fades out when the user hovers over the image */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/40 backdrop-blur-md text-white px-6 py-3 rounded-full pointer-events-none transition-opacity duration-500 opacity-100 group-hover:opacity-0">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9l-3 3 3 3M9 5l3-3 3 3M9 19l3 3 3-3M19 9l3 3-3 3M2 12h20M12 2v20" />
        </svg>
        <span className="text-xs tracking-widest uppercase font-bold">
          Click & Drag to explore
        </span>
      </div>
    </section>
  );
}