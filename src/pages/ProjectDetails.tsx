"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "./ProjectsData"; 

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((item) => item.slug === slug);

  // Scroll to top & set SEO Title
  useEffect(() => { 
    window.scrollTo(0, 0); 
    if (project) {
      document.title = `${project.title} | Bright Arena Interiors`;
    }
  }, [slug, project]);

  useEffect(() => {
    if (!project && slug) {
      navigate("/portfolio");
    }
  }, [project, slug, navigate]);

  if (!project) return null;

  return (
    <article className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── BREADCRUMB CLEARANCE AREA ── */}
      <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto" />

      {/* ── HERO TEXT ── */}
      <header className="pt-8 md:pt-12 pb-10 md:pb-12 relative">
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4a1c13 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          <motion.p
            className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 md:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Residential Project
          </motion.p>

          <h1 className="text-[clamp(40px,6vw,80px)] leading-[1.05] tracking-tight font-primary flex flex-wrap gap-x-[0.22em] max-w-5xl">
            {project.title.split(" ").map((word, i) => (
              <span key={i} className="overflow-hidden block pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: EASE }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#4a1c13]/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            {project.shortDescription}
          </motion.p>
        </div>
      </header>

      {/* ── HERO IMAGE ── */}
      <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <div className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de] h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <img
            src={project.heroImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <motion.h2
                  className="text-2xl md:text-4xl font-primary text-[#4a1c13] leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true }}
                >
                  Design <br />
                  <span className="italic text-[#ff7043]">Narrative.</span>
                </motion.h2>
              </div>
            </div>

            <div className="lg:col-span-8">
              <motion.p
                className="text-base md:text-lg leading-relaxed text-[#4a1c13]/75 max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                viewport={{ once: true }}
              >
                {project.description}
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MASONRY GALLERY ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {project.gallery.map((image, i) => (
              <div 
                key={i} 
                className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#e8e5de] break-inside-avoid mb-4 md:mb-6 group"
              >
                <motion.img
                  src={image}
                  alt={`${project.title} view ${i + 1}`}
                  className="w-full h-auto object-cover block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true }}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}