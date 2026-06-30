"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectsData } from "./ProjectsData"; // Ensure this path is correct

// Explicitly typed tuple for Framer Motion
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  const project = projectsData.find((item) => item.slug === slug);
  const currentIndex = projectsData.findIndex((item) => item.slug === slug);
  const nextProject = projectsData[(currentIndex + 1) % projectsData.length];

  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  
  // Adjusted parallax for the shorter image
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.1, 1.0]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-[#4a1c13]">
        <h1 className="text-2xl font-primary">Project Not Found</h1>
      </div>
    );
  }

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">

      {/* ── HERO TEXT ── */}
      <section className="pt-32 md:pt-48 pb-10 md:pb-12 relative">
        {/* Subtle dot pattern for texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#4a1c13 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          
          {/* Eyebrow */}
          <motion.p
            className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6 md:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            {project.houseType} · {project.location} · {project.year}
          </motion.p>

          {/* Animated Title */}
          <h1 className="text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary flex flex-wrap gap-x-[0.22em] max-w-5xl">
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

          {/* Short Description */}
          <motion.p
            className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-[#4a1c13]/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            {project.shortDescription}
          </motion.p>

        </div>
      </section>

      {/* ── SHORT HERO IMAGE (Panoramic) ── */}
      <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto">
        {/* Changed from aspect-video to a fixed, shorter height (h-[40vh] to 55vh max) */}
        <div ref={heroImgRef} className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de] h-[40vh] md:h-[50vh] lg:h-[55vh]">
          
          {/* Parallax Image */}
          <motion.div className="w-full h-full" style={{ y: heroImgY, scale: heroImgScale }}>
            <img
              src={project.heroImage || `https://picsum.photos/seed/${project.id}/1600/700`}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Soft Dark Overlay for depth */}
          <div className="absolute inset-0 bg-[#4a1c13]/10" />

          {/* Reveal Wipe */}
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
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* Left: Sticky Label */}
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

            {/* Right: Content & Grid */}
            <div className="lg:col-span-8">
              
              <motion.p
                className="text-base md:text-lg leading-relaxed text-[#4a1c13]/75 max-w-3xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
              >
                {project.projectDetails}
              </motion.p>

              {/* Info Grid Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
                {[
                  { label: "Client",     value: project.client },
                  { label: "Location",   value: project.location },
                  { label: "Category",   value: project.houseType },
                  { label: "Year",       value: project.year },
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
                    <h4 className="text-[#4a1c13] text-sm md:text-base font-medium">
                      {item.value}
                    </h4>
                  </motion.div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── PINTEREST-STYLE MASONRY GALLERY ── */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="pb-24 md:pb-32 px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto">
          
          {/* CSS Columns create the masonry effect automatically based on natural image heights */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6">
            
            {project.gallery.map((image, i) => {
              // Creating varied heights for the fallback placeholders so the masonry effect is visible
              const randomHeight = i % 3 === 0 ? 1200 : i % 2 === 0 ? 800 : 1000;
              const imgSrc = image || `https://picsum.photos/seed/${project.id}-${i}/800/${randomHeight}`;

              return (
                <div 
                  key={i} 
                  // break-inside-avoid ensures images don't split across columns
                  // mb-6 provides the vertical spacing between stacked items
                  className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2rem] bg-[#e8e5de] break-inside-avoid mb-4 md:mb-6 group"
                >
                  <motion.img
                    src={imgSrc}
                    alt={`${project.title} gallery view ${i + 1}`}
                    className="w-full h-auto object-cover block"
                    initial={{ scale: 1.05, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    viewport={{ once: true, margin: "-40px" }}
                    whileHover={{ scale: 1.03, transition: { duration: 0.5 } }}
                  />
                  
                  {/* Subtle dark tint on hover */}
                  <div className="absolute inset-0 bg-[#4a1c13]/0 group-hover:bg-[#4a1c13]/5 transition-colors duration-500 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── NEXT PROJECT CTA ── */}
      {nextProject && (
        <section className="py-12 md:py-20 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
          
          <motion.div
            className="h-px w-full bg-[#4a1c13]/10 mb-12"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: EASE }}
            viewport={{ once: true }}
          />

          <motion.div
            className="flex flex-col md:flex-row md:items-end justify-between gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-4">
                Next Project
              </p>
              <h3 className="text-[#4a1c13] text-3xl md:text-5xl lg:text-6xl font-primary leading-tight tracking-tight max-w-2xl">
                {nextProject.title}
              </h3>
            </div>

            <motion.button
              className="group flex items-center gap-4 bg-[#4a1c13] text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors duration-500 w-fit shrink-0"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/projects/${nextProject.slug}`)}
            >
              View Project
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-[#ff7043]">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.button>
          </motion.div>

        </section>
      )}

    </main>
  );
}