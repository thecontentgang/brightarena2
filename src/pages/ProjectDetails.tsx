"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "./ProjectsData"; 

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const currentIndex = projectsData.findIndex((item) => item.slug === slug);
  const project = projectsData[currentIndex];

  // ALL HOOKS
  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.1, 1.0]);

  // Scroll to top & set SEO Title
  useEffect(() => { 
    window.scrollTo(0, 0); 
    if (project) {
      document.title = `${project.title} | Portfolio`;
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
            {project.houseType} · {project.location} · {project.year}
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

      {/* ── SHORT HERO IMAGE (Panoramic) ── */}
      <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto" aria-label="Project Cover Image">
        <div ref={heroImgRef} className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de] h-[40vh] md:h-[50vh] lg:h-[55vh]">
          
          <motion.div className="w-full h-full" style={{ y: heroImgY, scale: heroImgScale }}>
            <img
              src={project.heroImage}
              alt={project.title}
              decoding="async"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop`;
              }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[#4a1c13]/10" />

          <motion.div
            className="absolute inset-0 bg-[#f7f4ee]"
            style={{ transformOrigin: "top" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
          />
        </div>
      </section>

      {/* ── PROJECT OVERVIEW ── */}
      <section className="py-20 md:py-28" aria-label="Project Details">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-4">
              <div className="sticky top-32">
                <motion.h2
                  className="text-2xl md:text-4xl font-primary text-[#4a1c13] leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  The <br />
                  <span className="italic text-[#ff7043]">Details.</span>
                </motion.h2>
              </div>
            </div>

            <div className="lg:col-span-8">
              <motion.p
                className="text-base md:text-lg leading-relaxed text-[#4a1c13]/75 max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
              >
                {project.description}
              </motion.p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mt-12">
                {[
                  { label: "Location",  value: project.location },
                  { label: "Category",  value: project.houseType },
                  { label: "Year",      value: project.year },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="bg-white p-6 rounded-3xl border border-[#4a1c13]/5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
                    viewport={{ once: true, margin: "-40px" }}
                  >
                    <p className="text-[#ff7043] text-[10px] uppercase tracking-[0.2em] font-bold mb-3">
                      {item.label}
                    </p>
                    <h3 className="text-[#4a1c13] text-sm md:text-base font-medium">
                      {item.value}
                    </h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MASONRY GALLERY ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto" aria-label="Project Image Gallery">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            {project.gallery.map((image, i) => (
              <div 
                key={i} 
                className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#e8e5de] break-inside-avoid mb-4 md:mb-6 group"
              >
                <motion.img
                  src={image}
                  alt={`${project.title} view ${i + 1}`}
                  decoding="async"
                  loading="lazy"
                  className="w-full h-auto object-cover block"
                  initial={{ scale: 1.05, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.5 } }}
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop`;
                  }}
                />
                <div className="absolute inset-0 bg-[#4a1c13]/0 group-hover:bg-[#4a1c13]/5 transition-colors duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}