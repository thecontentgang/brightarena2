"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { projectsData, type Project } from "./ProjectsData"; 

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Utility to force the path to be a .jpg
const forceJpg = (path?: string) => {
  if (!path) return "";
  return path.replace(/\.(png|jpeg|JPG|avif|webp)$/i, ".jpg");
};

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const spanClasses = index % 5 === 0 
    ? "md:row-span-2 md:col-span-1 aspect-[3/4]" 
    : index % 3 === 0 
    ? "md:col-span-2 md:row-span-1 aspect-video" 
    : "md:col-span-1 md:row-span-1 aspect-square";

  const safeImage = forceJpg(project.heroImage);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer bg-[#e8e5de] shadow-sm hover:shadow-xl transition-all duration-500 ${spanClasses}`}
    >
      <Link to={`/portfolio/${project.slug}`} className="block w-full h-full" aria-label={`View details for ${project.title}`}>
        <img
          src={safeImage}
          alt={project.title}
          decoding="async"
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback to a beautiful placeholder if the local image is missing
            e.currentTarget.src = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop`;
          }}
        />

        {/* Elegant Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 via-[#4a1c13]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <p className="text-[#ff7043] text-[10px] tracking-[0.25em] uppercase font-bold mb-2">
              {project.houseType} · {project.year}
            </p>
            <h3 className="text-white font-primary text-2xl md:text-3xl leading-snug mb-1">
              {project.title}
            </h3>
            <p className="text-white/70 text-sm font-medium">
              {project.location}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── PAGE COMPONENT ─── */
export default function PortfolioPage() {
  // Basic SEO Page Title
  useEffect(() => {
    document.title = "Portfolio | Curated Interior Designs";
  }, []);

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24 pt-32">
      
      {/* ── HERO ── */}
      <header className="px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center mb-16">
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
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto" aria-label="Project Gallery">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-flow-dense"
        >
          <AnimatePresence mode="popLayout">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}