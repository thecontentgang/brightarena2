"use client";

import { Link, useParams, useNavigate } from "react-router-dom";
import { projectsData } from "./ProjectsData"; // Ensure path is correct
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import SEO from "../components/SEO";

// Gentle, premium easing curve
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
}

function RevealHeading({ children, className, delay = 0 }: RevealHeadingProps) {
  if (!children) return null;
  const lines = children.split("\n");
  let wordIndex = 0;
  
  return (
    <h2 className={className}>
      {lines.map((line: string, li: number) => (
        <span key={li} className="block">
          {line.split(" ").map((word: string) => {
            const wi = wordIndex++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-2 mr-[0.22em]">
                <motion.span
                  className="block"
                  initial={{ y: "120%", opacity: 0 }}
                  whileInView={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 1.2, delay: delay + wi * 0.04, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

export default function ProjectDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const project = projectsData.find((item) => item.slug === slug);
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });
  
  // Subtle parallax for the primary image
  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  useEffect(() => { 
    window.scrollTo(0, 0); 
  }, [slug, project]);

  useEffect(() => {
    if (!project && slug) {
      navigate("/portfolio");
    }
  }, [project, slug, navigate]);

  if (!project) return null;

  return (
    <>
      <SEO 
        title={project.seo?.metaTitle || `${project.title} | Bright Arena Interiors`}
        description={project.seo?.description || project.shortDescription || project.description}
        keywords={project.seo?.keywords}
        url={`https://www.brightarenainteriors.com/portfolio/${project.slug}`}
      />
      
      <article className="bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-32 pb-24">
        
        {/* ── 1. COMPACT EDITORIAL HEADER ── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-20 text-center flex flex-col items-center">
          {/* Internal Breadcrumb */}
          <motion.nav 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link to="/portfolio" className="hover:text-[#ff7043] transition-colors">Portfolio</Link>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" />
            <span className="text-[#4a1c13]">{project.title}</span>
          </motion.nav>

          <RevealHeading
            className="font-primary text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight text-[#4a1c13] max-w-4xl"
          >
            {project.title}
          </RevealHeading>

          {project.shortDescription && (
            <motion.p
              className="mt-6 max-w-2xl text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
            >
              {project.shortDescription}
            </motion.p>
          )}
        </section>

        {/* ── 2. MINIMAL PRIMARY IMAGE ── */}
        {project.heroImage && (
          <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
            <div ref={primaryImgRef} className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-sm bg-[#e8e5de]">
              <motion.img
                src={project.heroImage}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ y: imgY, scale: 1.1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: EASE }}
              />
              <motion.div
                className="absolute inset-0 bg-[#f7f4ee]"
                style={{ transformOrigin: "left" }}
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                transition={{ duration: 1.2, ease: EASE }}
                viewport={{ once: true, margin: "-60px" }}
              />
            </div>
          </section>
        )}

        {/* ── 3. DETAILED EXPLANATION & STICKY METADATA ── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24">

            {/* LEFT: Sticky Project Information & CTA */}
            <div className="relative order-2 lg:order-1">
              <div className="sticky top-32 space-y-10 pr-6 border-t lg:border-t-0 border-[#4a1c13]/10 pt-10 lg:pt-0">
                
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    <div className="text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold">Client / Project</div>
                    <div className="font-primary text-xl md:text-2xl text-[#4a1c13]">
                      {project.title}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    <div className="text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold">Scope</div>
                    <div className="text-[#4a1c13] font-medium text-sm md:text-base">
                      {project.shortDescription}
                    </div>
                  </motion.div>
                </div>

                {/* Sticky CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                  viewport={{ once: true }}
                  className="pt-4"
                >
                  <Link
                    to="/contact"
                    className="inline-block w-full text-center bg-[#4a1c13] text-[#f7f4ee] px-8 py-4 rounded-xl uppercase tracking-widest text-[11px] font-bold hover:bg-[#ff7043] transition-colors duration-500"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: In-Depth Project Narrative */}
            <div className="order-1 lg:order-2">
              <RevealHeading
                delay={0.1}
                className="font-primary text-[clamp(28px,3.5vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-8"
              >
                {"Design\nNarrative."}
              </RevealHeading>

              <div className="prose prose-lg prose-p:text-[#4a1c13]/75 prose-p:leading-[1.8] max-w-3xl font-sans text-base md:text-lg">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2, ease: EASE }}
                  viewport={{ once: true }}
                >
                  {project.description}
                </motion.p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 4. MINIMAL SUPPLEMENTARY IMAGES ── */}
        {/* Strictly slices the massive array to a maximum of 2 minimal images */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.slice(0, 2).map((img, i) => (
                <motion.div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-[#e8e5de]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.2, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <img
                    src={img}
                    alt={`${project.title} Detail ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </article>
    </>
  );
}