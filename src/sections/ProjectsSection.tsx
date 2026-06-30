"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

// 1. Defined an interface for your data to fix the "implicit any" errors
export interface ProjectItem {
  id: string | number;
  shortDescription: string;
  heroImage?: string;
  year: string;
  houseType: string;
  location: string;
  slug: string;
}

// IF YOU HAVE YOUR OWN DATA: Uncomment the line below and delete the mock array.
// import { projectsData } from "../ProjectsPage/ProjectsData";

// Temporary mock data so the component compiles perfectly. 
// Replace this with your actual imported data.
const projectsData: ProjectItem[] = [
  {
    id: 1,
    shortDescription: "The Glass Pavilion",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    year: "2026",
    houseType: "Residential",
    location: "Bangalore",
    slug: "glass-pavilion",
  },
  {
    id: 2,
    shortDescription: "Aura Workspace",
    heroImage: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
    year: "2025",
    houseType: "Commercial",
    location: "Mumbai",
    slug: "aura-workspace",
  },
  {
    id: 3,
    shortDescription: "Lumina Penthouse",
    heroImage: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2000&auto=format&fit=crop",
    year: "2025",
    houseType: "Luxury",
    location: "Dubai",
    slug: "lumina-penthouse",
  },
];

// 2. Explicitly typed 'p' as ProjectItem
const PROJECTS = projectsData.map((p: ProjectItem) => ({
  id: p.id,
  title: p.shortDescription,
  image: p.heroImage || `https://picsum.photos/seed/${p.id}/1600/900`,
  year: p.year,
  category: p.houseType,
  location: p.location,
  slug: p.slug,
}));

const AUTOPLAY_DURATION = 6000; // 6 seconds

// 3. Forced TypeScript to treat this as a strict 4-number tuple to fix Framer Motion errors
const EASE_FADE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const imgVariants = {
  enter: { opacity: 0, scale: 1.05 },
  center: { 
    opacity: 1, 
    scale: 1, 
    transition: { duration: 1.4, ease: EASE_FADE } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.98, 
    transition: { duration: 1.4, ease: EASE_FADE } 
  },
};

export default function ProjectsShowcase() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
  }, []);

  const next = useCallback(() => go((index + 1) % PROJECTS.length), [index, go]);
  const prev = useCallback(() => go((index - 1 + PROJECTS.length) % PROJECTS.length), [index, go]);

  // Autoplay Logic
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [index, paused, next]);

  const p = PROJECTS[index];

  // Safeguard if PROJECTS is empty
  if (!p) return null;

  return (
    <section
      className="relative w-full h-[85vh] md:h-screen min-h-[600px] overflow-hidden bg-[#1a1a1a] select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* BACKGROUND IMAGE WITH CINEMATIC FADE */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={p.id}
          variants={imgVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={p.image}
            alt={p.title}
            className="w-full h-full object-cover origin-center"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${p.id}/1600/900`;
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* REFINED GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

      {/* GLOBAL SLIDE COUNTER */}
      <div className="absolute top-6 right-6 md:top-12 md:right-12 flex items-center gap-4 z-20">
        <span className="text-white/40 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono">
          Featured
        </span>
        <div className="w-px h-4 bg-white/20" />
        <span className="text-white text-xs md:text-sm tracking-widest font-mono tabular-nums">
          {String(index + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
        </span>
      </div>

      {/* MAIN CONTENT PANEL */}
      <div className="absolute bottom-0 left-0 w-full md:w-auto p-6 md:p-16 lg:p-24 z-20 flex flex-col justify-end h-full pointer-events-none">
        
        <div className="pointer-events-auto max-w-[90%] md:max-w-2xl">
          
          {/* Animated Meta Data */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${p.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: EASE_FADE }}
              className="flex items-center gap-3 text-[9px] md:text-xs tracking-[0.3em] uppercase text-white/60 mb-6"
            >
              <span>{p.category}</span>
              <span className="w-1 h-1 rounded-full bg-[#ff7043]" />
              <span>{p.location}</span>
              <span className="w-1 h-1 rounded-full bg-[#ff7043]" />
              <span>{p.year}</span>
            </motion.div>
          </AnimatePresence>

          {/* Animated Title */}
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${p.id}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: EASE_FADE, delay: 0.1 }}
              className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.05] tracking-tight text-white mb-10 md:mb-16 font-primary drop-shadow-lg"
            >
              {p.title}
            </motion.h2>
          </AnimatePresence>

          {/* Controls & Progress Wrapper */}
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12">
            
            {/* View Project Button */}
            <Link 
              to={`/projects/${p.slug}`}
              className="group relative inline-flex items-center gap-6 px-8 py-4 border border-white/20 rounded-full overflow-hidden transition-all duration-500 hover:border-white/50 w-fit"
            >
              <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10 text-[10px] md:text-xs font-bold tracking-widest uppercase text-white group-hover:text-black transition-colors duration-500">
                Explore Space
              </span>
            </Link>

            {/* Elegant Navigation Controls */}
            <div className="flex items-center gap-6">
              <button 
                onClick={prev}
                className="text-white/50 hover:text-white transition-colors duration-300 p-2"
                aria-label="Previous Project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              
              {/* Animated Progress Lines */}
              <div className="flex gap-2">
                {/* 4. Typed the map parameters explicitly to satisfy strict mode */}
                {PROJECTS.map((_, i: number) => (
                  <div key={i} className="relative w-8 h-[2px] bg-white/20 rounded-full overflow-hidden cursor-pointer" onClick={() => go(i)}>
                    {i === index && (
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: paused ? "100%" : "100%" }}
                        transition={
                          paused 
                            ? { duration: 0 } 
                            : { duration: AUTOPLAY_DURATION / 1000, ease: "linear" }
                        }
                        className="absolute top-0 left-0 h-full bg-[#ff7043]"
                      />
                    )}
                    {i < index && <div className="absolute inset-0 bg-white/60" />}
                  </div>
                ))}
              </div>

              <button 
                onClick={next}
                className="text-white/50 hover:text-white transition-colors duration-300 p-2"
                aria-label="Next Project"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}