"use client";

import { Link, useParams } from "react-router-dom";
import { servicesData } from "./ServicesData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// Explicit tuple to fix Framer Motion typescript errors
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  animate?: boolean;
}

function RevealHeading({ children, className, delay = 0, animate = false }: RevealHeadingProps) {
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
                  initial={{ y: "110%", opacity: 0 }}
                  {...(animate
                    ? { animate: { y: "0%", opacity: 1 } }
                    : { whileInView: { y: "0%", opacity: 1 } }
                  )}
                  transition={{ duration: 0.9, delay: delay + wi * 0.08, ease: EASE }}
                  viewport={animate ? undefined : { once: true, margin: "-60px" }}
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

  const heroImgRef = useRef<HTMLDivElement>(null);
  const bigImgRef  = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  const { scrollYProgress: bigScroll } = useScroll({
    target: bigImgRef,
    offset: ["start end", "end start"],
  });

  const heroImgY  = useTransform(heroScroll, [0, 1], ["0%", "12%"]);
  const bigImgY   = useTransform(bigScroll,  [0, 1], ["0%", "10%"]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-[#4a1c13]">
        Service not found
      </div>
    );
  }

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans">

      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-[#f7f4ee] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

          {/* LEFT CONTENT */}
          <div className="relative flex items-center px-6 md:px-10 lg:px-16 py-28 lg:py-20 z-10">

            {/* Subtle dot pattern */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: "radial-gradient(#4a1c13 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative z-10 max-w-2xl">
             

              {/* Title */}
              <RevealHeading
                animate
                delay={0.1}
                className="mt-6 font-primary text-[clamp(40px,5vw,80px)] leading-[1.05] tracking-tight text-[#4a1c13]"
              >
                {service.title || "Designing\nspaces that\nfeel timeless"}
              </RevealHeading>

              {/* Description */}
              <motion.p
                className="mt-8 max-w-xl text-base md:text-lg leading-relaxed text-[#4a1c13]/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
              >
                We create luxurious interior experiences tailored for modern lifestyles
                blending elegance, comfort, functionality, and architectural precision
                into every detail.
              </motion.p>

              {/* Divider */}
              <motion.div
                className="mt-10 h-px bg-[#4a1c13]/10"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.7, ease: EASE }}
              />

              {/* Buttons (Softened with rounded-full) */}
              <motion.div
                className="mt-10 flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.75, ease: EASE }}
              >
                <Link
                  to="/contact"
                  className="bg-[#4a1c13] text-white px-8 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-[#ff7043] transition-colors duration-500"
                >
                  Enquire Now
                </Link>
                <Link
                  to="/portfolio"
                  className="border border-[#4a1c13]/20 text-[#4a1c13] px-8 py-4 rounded-full uppercase tracking-widest text-[10px] font-bold hover:bg-[#4a1c13] hover:text-white transition-colors duration-500"
                >
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div ref={heroImgRef} className="relative min-h-[50vh] lg:min-h-screen bg-[#e8e5de] overflow-hidden lg:rounded-bl-[4rem]">
            {/* Parallax Image */}
            <motion.img
              src={service.images?.[0] || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"}
              alt={service.title}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ y: heroImgY, scale: 1.05 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            />
            
            {/* Soft Dark Overlay */}
            <div className="absolute inset-0 bg-[#4a1c13]/10" />

            {/* Elegant Wipe Reveal */}
            <motion.div
              className="absolute inset-0 bg-[#f7f4ee]"
              style={{ transformOrigin: "top" }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.3, delay: 0.15, ease: EASE }}
            />
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">

            {/* LEFT Sticky Info */}
            <div>
              <div className="sticky top-32 bg-white rounded-3xl p-8 md:p-10 border border-[#4a1c13]/5 shadow-sm">
                <motion.span
                  className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff7043]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  viewport={{ once: true }}
                >
                  Service Information
                </motion.span>

                <div className="mt-10 space-y-8">
                  {[
                    { label: "Phone",         value: service.phone || "+91 89782 22980",        big: true },
                    { label: "Working Days",  value: service.workingDays || "Monday - Saturday", big: false },
                    { label: "Working Hours", value: service.workingHours || "09:00 AM - 07:00 PM", big: false },
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                      viewport={{ once: true }}
                    >
                      <div className="text-[#4a1c13]/50 text-xs tracking-widest uppercase mb-2">{item.label}</div>
                      <div className={item.big ? "font-primary text-2xl md:text-3xl text-[#4a1c13]" : "text-[#4a1c13] font-medium"}>
                        {item.value}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT Details */}
            <div className="pt-8">
              <RevealHeading
                delay={0.05}
                className="font-primary text-[clamp(32px,4vw,56px)] leading-[1.05] tracking-tight max-w-2xl text-[#4a1c13]"
              >
                {"Interior experiences\ndesigned with elegance."}
              </RevealHeading>

              <motion.div
                className="mt-8 mb-12 h-px bg-[#4a1c13]/10"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: EASE }}
                viewport={{ once: true }}
              />

              <div className="space-y-8 text-[#4a1c13]/70 text-base md:text-lg leading-relaxed max-w-3xl">
                {[service.description, service.longDescription].map((text, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                    viewport={{ once: true }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>

              {/* Big Image Reveal */}
              <div ref={bigImgRef} className="mt-16 overflow-hidden relative aspect-[16/9] rounded-3xl">
                <motion.img
                  src={service.images?.[1] || "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop"}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  style={{ y: bigImgY, scale: 1.05 }}
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1.05 }}
                  transition={{ duration: 1.4, ease: EASE }}
                  viewport={{ once: true }}
                />
                {/* Cover Wipe */}
                <motion.div
                  className="absolute inset-0 bg-[#f7f4ee]"
                  style={{ transformOrigin: "top" }}
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  transition={{ duration: 1.2, ease: EASE }}
                  viewport={{ once: true, margin: "-60px" }}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="mb-16">
            <motion.span
              className="uppercase tracking-[0.3em] text-[10px] font-bold text-[#ff7043]"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.span>

            <RevealHeading
              delay={0.08}
              className="mt-4 font-primary text-[clamp(32px,5vw,64px)] leading-tight tracking-tight text-[#4a1c13]"
            >
              {"Built around luxury,\ncomfort & precision"}
            </RevealHeading>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits?.map((item, i) => (
              <motion.div
                key={i}
                className="bg-[#4a1c13] text-[#f7f4ee] p-8 md:p-10 min-h-[260px] rounded-3xl flex flex-col justify-between"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: EASE }}
                viewport={{ once: true, margin: "-40px" }}
              >
                <motion.div
                  className="text-xs font-bold text-[#ff7043] tracking-widest"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.3, ease: EASE }}
                  viewport={{ once: true }}
                >
                  0{i + 1}
                </motion.div>
                <motion.h3
                  className="font-primary text-2xl md:text-3xl leading-snug"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: i * 0.1 + 0.4, ease: EASE }}
                  viewport={{ once: true }}
                >
                  {item}
                </motion.h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMAGE STRIP ── */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {service.images?.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className={`relative overflow-hidden group rounded-2xl md:rounded-3xl ${i % 2 === 0 ? "aspect-[3/4]" : "aspect-square mt-auto"}`}
              >
                <motion.img
                  src={img}
                  alt="Service Detail"
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.3, delay: i * 0.1, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                  whileHover={{ scale: 1.05, transition: { duration: 0.7 } }}
                />
                {/* Soft overlay to match theme */}
                <div className="absolute inset-0 bg-[#4a1c13]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                {/* Cover Wipe */}
                <motion.div
                  className="absolute inset-0 bg-[#f7f4ee]"
                  style={{ transformOrigin: "top" }}
                  initial={{ scaleY: 1 }}
                  whileInView={{ scaleY: 0 }}
                  transition={{ duration: 1.0, delay: i * 0.1, ease: EASE }}
                  viewport={{ once: true, margin: "-40px" }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}