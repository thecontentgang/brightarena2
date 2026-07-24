"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { projectsData, type Project } from "./ProjectsData";
import SEO from "../components/SEO";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  // Masonry-style layout logic
  const spanClasses = index % 5 === 0 
    ? "md:row-span-2 md:col-span-1 aspect-[3/4]" 
    : index % 3 === 0 
    ? "md:col-span-2 md:row-span-1 aspect-video" 
    : "md:col-span-1 md:row-span-1 aspect-square";

  const isPriority = index < 2;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.1 }}
      className={`group relative overflow-hidden rounded-3xl cursor-pointer bg-[#e8e5de] shadow-sm hover:shadow-2xl transition-all duration-700 ${spanClasses}`}
    >
      <Link 
        to={`/portfolio/${project.slug}`} 
        className="block w-full h-full" 
        aria-label={`View details for ${project.title}`}
      >
        <img
          src={project.heroImage}
          alt={project.title}
          decoding="async"
          loading={isPriority ? "eager" : "lazy"}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />

        {/* Updated Elegant Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8" aria-hidden="true">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <h3 className="text-white font-primary text-2xl md:text-3xl leading-snug mb-2">
              {project.title}
            </h3>
            <p className="text-[#ff7043] text-xs tracking-[0.2em] uppercase font-bold">
              {project.shortDescription}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── PAGE COMPONENT ─── */
export default function PortfolioPage() {
  return (
    <>
      <SEO 
        title="Bright Arena Interiors Portfolio and Interior Design Projects"
        description="Explore the Bright Arena Interiors portfolio showcasing completed home, villa, apartment, and office interior projects across Hyderabad with 14+ years of expertise."
        url="https://www.brightarenainteriors.com/portfolio"
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24 pt-32">
      
      {/* ── HERO ── */}
      <header className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center mb-20">
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs tracking-[0.3em] uppercase font-bold mb-6 pt-6"
        >
          Selected Works
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
          className="text-[clamp(40px,7vw,96px)] font-primary leading-[1] mb-8 tracking-tight"
        >
          Designing spaces with <br />
          <span className="italic font-serif text-[#ff7043]">purpose.</span>
        </motion.h1>
      </header>

      {/* ── MASONRY GRID ── */}
      <section 
        className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto" 
      >
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      
    </main>
    </>
  );
}