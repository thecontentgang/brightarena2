"use client";

import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { servicesData, type ServiceItem } from "../pages/data/servicesData";
import SEO from "../components/SEO";

// Gentle, premium easing curve
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

function RegisterMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className={className} aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  animateOnLoad?: boolean;
}

function RevealHeading({ children, className, delay = 0, animateOnLoad = false }: RevealHeadingProps) {
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
              <span key={wi} className="inline-block overflow-hidden pb-2 mr-[0.2em] sm:mr-[0.22em]">
                <motion.span
                  className="block"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={animateOnLoad ? { y: "0%", opacity: 1 } : undefined}
                  whileInView={!animateOnLoad ? { y: "0%", opacity: 1 } : undefined}
                  transition={{ duration: 1.1, delay: delay + wi * 0.04, ease: EASE }}
                  viewport={{ once: true }}
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

export default function ServiceDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((item: ServiceItem) => item.slug === slug);
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-[#4a1c13] font-primary text-2xl px-6 text-center">
        Service not found
      </div>
    );
  }

  const cleanImgSrc = (src: string) => (src.endsWith(".") ? `${src}png` : src);

  /* ─────────────────────────────────────────────
     NEW: Markdown Link Parser
     Converts [Text](/url) into styled <Link> tags
  ───────────────────────────────────────────────*/
  const parseLinks = (text: string) => {
    // Regex splits the text by the [text](url) pattern
    const parts = text.split(/(\[.*?\]\(.*?\))/g);
    
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const linkText = match[1];
        const url = match[2];
        const linkClasses = "font-bold text-[#ff7043] underline decoration-[#ff7043]/30 hover:decoration-[#ff7043] transition-colors duration-300";
        
        // Use React Router for internal links
        if (url.startsWith('/')) {
          return <Link key={i} to={url} className={linkClasses}>{linkText}</Link>;
        }
        // Use standard <a> tag for external links
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className={linkClasses}>
            {linkText}
          </a>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const renderRichContent = (content: string) => {
    const extraImages = service.images ? service.images.slice(1) : [];
    let headingCount = 0;
    let imageIndex = 0;

    return content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line, idx) => {
        const isHeading = line.length < 100 && !line.trim().endsWith(".") && !line.trim().endsWith("?");
        let injectedImage = null;

        if (isHeading) {
          headingCount++;

          if (headingCount > 1 && headingCount % 2 === 0 && imageIndex < extraImages.length) {
            const imgSrc = cleanImgSrc(extraImages[imageIndex]);
            imageIndex++;

            injectedImage = (
              <motion.div
                key={`img-${idx}`}
                className="w-full aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl shadow-sm my-10 sm:my-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: EASE }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <img
                  src={imgSrc}
                  alt={`${service.title} detail layout`}
                  loading="lazy"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
                />
              </motion.div>
            );
          }

          return (
            <React.Fragment key={idx}>
              {injectedImage}
              <motion.h3
                className="font-primary text-xl sm:text-2xl md:text-3xl text-[#4a1c13] mt-10 sm:mt-12 mb-5 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Apply Link Parser to Headings */}
                {parseLinks(line)}
              </motion.h3>
            </React.Fragment>
          );
        }

        return (
          <motion.p
            key={idx}
            className="text-[#4a1c13]/75 leading-[1.8] sm:leading-[1.85] mb-5 sm:mb-6 text-[15px] sm:text-base md:text-lg font-sans"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Apply Link Parser to Paragraphs */}
            {parseLinks(line)}
          </motion.p>
        );
      });
  };

  return (
    <>
      <SEO
        title={service.seo?.metaTitle || `${service.title} | Bright Arena Interiors`}
        description={
          service.seo?.description ||
          service.description ||
          service.longDescription ||
          `Explore our ${service.title} interior design services.`
        }
        keywords={service.seo?.keywords}
        url={`https://www.brightarenainteriors.com/services/${service.slug}`}
      />

      <main className="bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-24 sm:pt-28 md:pt-32">
        {/* ── COMPACT EDITORIAL HEADER ── */}
        <section className="relative w-full px-5 sm:px-8 md:px-12 lg:px-16 mb-12 sm:mb-16 md:mb-20 text-center flex flex-col items-center">
          <RegisterMark className="hidden sm:block absolute top-2 left-4 md:left-8 text-[#4a1c13]/15" />
          <RegisterMark className="hidden sm:block absolute top-2 right-4 md:right-8 text-[#4a1c13]/15" />

          <h1 className="sr-only">{service.seo?.h1 || service.title}</h1>

          <motion.nav
            className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link to="/services" className="hover:text-[#ff7043] transition-colors">
              Services
            </Link>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" />
            <span className="text-[#4a1c13] max-w-[45vw] sm:max-w-none truncate">{service.title}</span>
          </motion.nav>

          <RevealHeading
            animateOnLoad={true}
            className="font-primary text-[clamp(32px,8vw,64px)] leading-[1.08] tracking-tight text-[#4a1c13] max-w-4xl"
          >
            {service.heroTitle || "Crafting Timeless Spaces"}
          </RevealHeading>

          {service.subtitle && (
            <motion.p
              className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
            >
              {service.subtitle}
            </motion.p>
          )}
        </section>

        {/* ── PRIMARY IMAGE ── */}
        {service.images?.[0] && (
          <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
            <div
              ref={primaryImgRef}
              className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
            >
              <motion.img
                src={cleanImgSrc(service.images[0])}
                alt={service.title}
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
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 text-[#f7f4ee]">
                <span className="w-6 sm:w-8 h-px bg-[#ffc107]" />
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold drop-shadow-sm">
                  {service.title}
                </span>
              </div>
            </div>
          </section>
        )}

        {/* ── DETAILED EXPLANATION ── */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 mb-16 sm:mb-20">
          {service.description && (
            <RevealHeading
              delay={0.1}
              className="font-primary text-[clamp(24px,6vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-6 sm:mb-8"
            >
              {service.description}
            </RevealHeading>
          )}

          <div>
            {service.longDescription && (
              <motion.p
                className="text-[#4a1c13]/90 text-base sm:text-lg md:text-xl leading-[1.75] sm:leading-[1.8] font-medium mb-10 sm:mb-12 pb-10 sm:pb-12 border-b border-[#4a1c13]/10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: EASE }}
                viewport={{ once: true }}
              >
                {/* Apply Link Parser here too in case you add links to longDescription */}
                {parseLinks(service.longDescription)}
              </motion.p>
            )}

            {/* Content parsed with embedded images and links */}
            {service.content && <div className="mt-6 sm:mt-8">{renderRichContent(service.content)}</div>}
          </div>

          {service.benefits && service.benefits.length > 0 && (
            <div className="mt-16 sm:mt-20 pt-14 sm:pt-16 border-t border-[#4a1c13]/10">
              <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff7043] block mb-6 sm:mb-8">
                Key Advantages
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-12 gap-y-5 sm:gap-y-6">
                {service.benefits.map((benefit: string, i: number) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 rounded-xl -mx-3 px-3 py-2 transition-colors hover:bg-[#4a1c13]/[0.03]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    <span className="text-[#ff7043] font-bold text-sm mt-1 shrink-0">0{i + 1}.</span>
                    <span className="text-[#4a1c13] font-medium leading-relaxed">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* ── FULL-WIDTH HORIZONTAL AD / BANNER ── */}
        <section className="w-full bg-[#4a1c13] text-[#f7f4ee] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h3 className="font-primary text-[clamp(32px,4vw,56px)] leading-[1.1] text-[#f7f4ee] mb-4">
                Ready to transform your space?
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 text-[#f7f4ee]/70 font-medium text-sm md:text-base mt-6">
                {service.phone && (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-[#f7f4ee]/20 flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <span>{service.phone}</span>
                  </div>
                )}
                
                {service.workingDays && (
                  <>
                    <span className="hidden sm:inline-block text-[#f7f4ee]/30">•</span>
                    <span>
                      Available {service.workingDays} 
                      {service.workingHours && <span className="ml-1 opacity-70">({service.workingHours})</span>}
                    </span>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[#ff7043] text-white px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#f7f4ee] hover:text-[#4a1c13] transition-colors duration-500 whitespace-nowrap shadow-xl"
              >
                Discuss Your Project
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
    </>
  );
}