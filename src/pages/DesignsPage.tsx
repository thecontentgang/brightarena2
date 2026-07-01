"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { designsData } from "./designData"; // Ensure this path points to your designsData file

// Extract dynamic categories directly from your data
const CATEGORIES = ["All", ...Array.from(new Set(designsData.map(d => d.category)))];
type Category = string;

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── DESIGN CARD ─── */
function DesignCard({ design, index }: { design: typeof designsData[0]; index: number }) {
  // Map index to CSS Grid classes for a true masonry/bento feel
  const spanClasses = index % 5 === 0 
    ? "md:row-span-2 md:col-span-1 aspect-[3/4] md:aspect-auto" 
    : index % 3 === 0 
    ? "md:col-span-2 md:row-span-1 aspect-video md:aspect-auto" 
    : "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#e8e5de] ${spanClasses}`}
    >
      <Link to={`/designs/${design.slug}`} className="block w-full h-full">
        <img
          src={design.coverImage}
          alt={design.title}
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Elegant Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 via-[#4a1c13]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-[#ff7043] text-[10px] tracking-[0.25em] uppercase font-bold mb-2">
              {design.category}
            </p>
            <h3 className="text-white font-primary text-2xl md:text-3xl leading-snug mb-2">
              {design.title}
            </h3>
            <p className="text-white/70 text-sm font-medium line-clamp-2">
              {design.description}
            </p>
          </div>
        </div>

        {/* Mobile Fallback Overlay (Always partially visible) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/80 via-transparent to-transparent md:hidden flex flex-col justify-end p-6 pointer-events-none">
          <p className="text-[#ff7043] text-[9px] tracking-[0.2em] uppercase font-bold mb-1">
            {design.category}
          </p>
          <h3 className="text-white font-primary text-xl leading-snug">
            {design.title}
          </h3>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── PAGE COMPONENT ─── */
export default function DesignPage() {
  const [activeFilter, setActiveFilter] = useState<Category>("All");

  const filtered = activeFilter === "All"
    ? designsData
    : designsData.filter((d) => d.category === activeFilter);

  // Count instances of each category dynamically
  const counts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = cat === "All" 
      ? designsData.length 
      : designsData.filter((d) => d.category === cat).length;
    return acc;
  }, {} as Record<Category, number>);

  return (
    <div className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── HERO ── */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs tracking-[0.3em] uppercase font-bold mb-6"
        >
          Design Concepts
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
          className="text-[clamp(40px,7vw,96px)] font-primary leading-[1] mb-8 tracking-tight"
        >
          Visualizing the <br />
          <span className="italic font-serif text-[#ff7043]">future.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
          className="max-w-2xl text-[#4a1c13]/60 text-base md:text-lg leading-relaxed"
        >
          Explore our curated library of interior concepts, crafted to inspire and define the aesthetic direction of your next space.
        </motion.p>
      </section>

      {/* ── STICKY FILTER BAR ── */}
      <div className="sticky top-0 z-40 bg-[#f7f4ee]/80 backdrop-blur-xl border-y border-[#4a1c13]/10 mb-12 md:mb-16">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-24 py-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          
          <div className="flex items-center gap-2 md:gap-4 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`relative px-4 py-2 text-xs tracking-[0.15em] uppercase font-bold transition-colors duration-300 ${
                  activeFilter === cat ? "text-[#4a1c13]" : "text-[#4a1c13]/40 hover:text-[#4a1c13]/70"
                }`}
              >
                {cat}
                <span className="ml-2 text-[10px] opacity-50">
                  {counts[cat]}
                </span>
                
                {activeFilter === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#ff7043]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <p className="text-[#4a1c13]/40 text-[10px] tracking-[0.2em] uppercase font-bold min-w-max hidden md:block">
            Showing {filtered.length} Concept{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* ── MASONRY/BENTO GRID ── */}
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[400px] gap-4 md:gap-6 grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((design, i) => (
              <DesignCard key={design.id} design={design} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#4a1c13]/5 flex items-center justify-center text-[#4a1c13]/20">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-[#4a1c13]/50 text-sm tracking-wide">No concepts found in this category.</p>
          </div>
        )}
      </section>

    </div>
  );
}