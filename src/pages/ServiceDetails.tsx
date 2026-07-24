"use client";

import { Link, useParams } from "react-router-dom";
import { servicesData } from "./servicesData"; 
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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

export default function ServiceDetailsPage() {
  const { slug } = useParams();
  const service = servicesData.find((item) => item.slug === slug);

  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });
  
  // Subtle parallax for the primary image
  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-[#4a1c13] font-primary text-2xl">
        Service not found
      </div>
    );
  }

  const cleanImgSrc = (src: string) => src.endsWith('.') ? `${src}png` : src;

  return (
    <>
      {/* ── UPDATED SEO COMPONENT PULLING FROM DATA ── */}
      <SEO 
        title={service.seo?.metaTitle || `${service.title} | Bright Arena Interiors`}
        description={service.seo?.description || service.description || service.longDescription || `Explore our ${service.title} interior design services.`}
        keywords={service.seo?.keywords}
        url={`https://www.brightarenainteriors.com/services/${service.slug}`}
      />
      
      <main className="bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-32 pb-24">
        
        {/* ── 1. COMPACT EDITORIAL HEADER ── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-20 text-center flex flex-col items-center">
          {/* Internal Breadcrumb */}
          <motion.nav 
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link to="/services" className="hover:text-[#ff7043] transition-colors">Services</Link>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" />
            <span className="text-[#4a1c13]">{service.title}</span>
          </motion.nav>

          <RevealHeading
            className="font-primary text-[clamp(36px,5vw,64px)] leading-[1.1] tracking-tight text-[#4a1c13] max-w-4xl"
          >
            {service.heroTitle || "Crafting Timeless Spaces"}
          </RevealHeading>

          {service.subtitle && (
            <motion.p
              className="mt-6 max-w-2xl text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: EASE }}
            >
              {service.subtitle}
            </motion.p>
          )}
        </section>

        {/* ── 2. MINIMAL PRIMARY IMAGE ── */}
        {service.images?.[0] && (
          <section className="max-w-[1600px] mx-auto px-4 md:px-8 mb-20 md:mb-32">
            <div ref={primaryImgRef} className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-sm">
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
            </div>
          </section>
        )}

        {/* ── 3. DETAILED EXPLANATION & STICKY METADATA ── */}
        <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-24 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24">

            {/* LEFT: Sticky Service Information & CTA */}
            <div className="relative order-2 lg:order-1">
              <div className="sticky top-32 space-y-10 pr-6 border-t lg:border-t-0 border-[#4a1c13]/10 pt-10 lg:pt-0">
                
                <div className="space-y-8">
                  {service.phone && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <div className="text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold">Contact</div>
                      <div className="font-primary text-xl md:text-2xl text-[#4a1c13]">
                        {service.phone}
                      </div>
                    </motion.div>
                  )}

                  {service.workingDays && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <div className="text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold">Availability</div>
                      <div className="text-[#4a1c13] font-medium text-sm md:text-base">{service.workingDays}</div>
                      {service.workingHours && (
                        <div className="text-[#4a1c13]/70 text-sm mt-0.5">{service.workingHours}</div>
                      )}
                    </motion.div>
                  )}
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
                    Discuss Your Project
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* RIGHT: In-Depth Service Content */}
            <div className="order-1 lg:order-2">
              {service.description && (
                <RevealHeading
                  delay={0.1}
                  className="font-primary text-[clamp(28px,3.5vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-8"
                >
                  {service.description}
                </RevealHeading>
              )}

              <div className="prose prose-lg prose-p:text-[#4a1c13]/75 prose-p:leading-[1.8] max-w-3xl font-sans text-base md:text-lg">
                {service.longDescription && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    {service.longDescription}
                  </motion.p>
                )}
                
                {service.content && (
                  <motion.p
                    className="mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.3, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    {service.content}
                  </motion.p>
                )}
              </div>

              {/* Compact Benefits List */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="mt-16 pt-12 border-t border-[#4a1c13]/10">
                  <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff7043] block mb-8">
                    Key Advantages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                    {service.benefits.map((benefit, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-4"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                        viewport={{ once: true }}
                      >
                        <span className="text-[#ff7043] font-bold text-sm mt-1">0{i + 1}.</span>
                        <span className="text-[#4a1c13] font-medium leading-relaxed">{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── 4. MINIMAL SUPPLEMENTARY IMAGES ── */}
        {service.images && service.images.length > 1 && (
          <section className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {service.images.slice(1, 3).map((img, i) => (
                <motion.div
                  key={i}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: i * 0.2, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <img
                    src={cleanImgSrc(img)}
                    alt={`${service.title} Detail ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </motion.div>
              ))}
            </div>
          </section>
        )}

      </main>
    </>
  );
}