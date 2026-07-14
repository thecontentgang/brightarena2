"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: smoothEase } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18 } },
};

// Unsplash & Local image URLs
const IMAGES = {
  heroRoom: "/projectsImg/my-home-bhooja/MHB-img2.jpg",
  studioWork: "/office.jpg",
  philosophyBg: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
  founderA: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  founderB: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=800&q=80",
};

const founders = [
  {
    name: "Srilatha Ravuri",
    role: "Co-Founder",
    description: "Srilatha Ravuri is the creative force behind Bright Arena, bringing a refined vision for luxury interiors and modern living spaces. With a strong background in architecture and interior design, she focuses on creating timeless spaces that combine elegance, comfort, and functionality.",
  },
  {
    name: "Bhawani Shankar",
    role: "Co-Founder",
    description: "Bhawani shankar leads the operational and strategic growth of Bright Arena with extensive experience in business management and global operations. His expertise in execution, client relationships, and project coordination ensures every project is delivered with excellence and precision.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] overflow-x-hidden">
      
      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} aria-label="Introduction" className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Parallax background */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 scale-110">
          <img 
            src={IMAGES.heroRoom} 
            alt="Luxurious signature living room interior designed by Bright Arena" 
            className="w-full h-full object-cover"
            fetchPriority="high" // Prioritize above-the-fold image
          />
          <div className="absolute inset-0 bg-[#1F1F1F]/60" aria-hidden="true" />
        </motion.div>

        {/* Hero text */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 px-6 max-w-4xl mx-auto">
          <motion.span variants={fadeUp} className="inline-block text-[#ff7043] tracking-[0.35em] uppercase font-bold text-xs mb-6">
            Est. 2012 · Hyderabad, India
          </motion.span>
          <motion.h1 variants={fadeUp} className="text-[clamp(40px,9vw,108px)] leading-[0.92] font-serif text-white mb-8">
            We Design <br />
            <span className="italic text-[#ff7043]">Living Stories.</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
            Bright Arena Interiors is Hyderabad's premier luxury design studio —
            14 years, 500+ transformations, one obsession: spaces that feel
            unmistakably yours.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#founders" 
              aria-label="Navigate to meet the founders section"
              className="bg-[#ff7043] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300"
            >
              Meet the Founders
            </a>
            <a 
              href="#philosophy" 
              aria-label="Navigate to our design philosophy section"
              className="border border-white/40 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50" aria-hidden="true">
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </motion.div>
      </section>

      {/* ─── 2. STUDIO SPLIT ─── */}
      <section aria-labelledby="about-heading" className="py-24 lg:py-32 bg-[#F8F6F2] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <motion.div className="lg:col-span-5" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <span className="uppercase tracking-[0.4em] text-[#ff7043] text-xs font-semibold">
                About Bright Arena
              </span>
              <h2 id="about-heading" className="mt-6 text-5xl md:text-6xl font-serif leading-[1.05]">
                We Design<br />Spaces That<br />Inspire.
              </h2>
              <p className="mt-8 text-gray-600 leading-8">
                Since 2012, Bright Arena has transformed homes, offices, and
                commercial spaces into timeless environments that balance beauty,
                comfort, and functionality.
              </p>
              <p className="mt-6 text-gray-600 leading-8">
                Every project begins with understanding people their lifestyle,
                aspirations, and personality before translating those ideas into
                thoughtfully crafted interiors.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <div className="px-5 py-3 rounded-full border border-gray-300 text-sm">Residential</div>
                <div className="px-5 py-3 rounded-full border border-gray-300 text-sm">Commercial</div>
                <div className="px-5 py-3 rounded-full border border-gray-300 text-sm">Turnkey Projects</div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div className="lg:col-span-4 relative" initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="overflow-hidden rounded-[30px]">
                <img 
                  src={IMAGES.studioWork} 
                  alt="Bright Arena design studio workspace showing architectural plans" 
                  loading="lazy" 
                  decoding="async"
                  className="w-full h-[650px] object-cover hover:scale-105 transition duration-700" 
                />
              </div>
              <div className="absolute top-8 -left-6 bg-white shadow-2xl rounded-3xl px-6 py-5">
                <div className="text-4xl font-bold text-[#4a1c13]">2012</div>
                <p className="text-xs tracking-[0.3em] uppercase text-gray-500">Founded</p>
              </div>
            </motion.div>

            {/* Right Stats */}
            <motion.div className="lg:col-span-3" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="space-y-10">
                <div className="border-b border-gray-300 pb-8">
                  <h3 className="text-5xl font-serif text-[#4a1c13]">350+</h3>
                  <p className="mt-2 text-gray-600">Completed Interior Projects</p>
                </div>
                <div className="border-b border-gray-300 pb-8">
                  <h3 className="text-5xl font-serif text-[#4a1c13]">14+</h3>
                  <p className="mt-2 text-gray-600">Years of Experience</p>
                </div>
                <div className="border-b border-gray-300 pb-8">
                  <h3 className="text-5xl font-serif text-[#4a1c13]">40+</h3>
                  <p className="mt-2 text-gray-600">Design Professionals</p>
                </div>
                <div>
                  <h3 className="text-5xl font-serif text-[#4a1c13]">98%</h3>
                  <p className="mt-2 text-gray-600">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── 3. FOUNDERS ─── */}
      <section id="founders" aria-labelledby="founders-heading" className="w-full bg-[#FFF8F2] px-6 md:px-12 lg:px-24 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
            className="mb-20"
          >
            <motion.p variants={fadeUp} className="uppercase tracking-[0.35em] text-[#ff7043] text-xs font-semibold mb-4">
              Our Leadership
            </motion.p>
            <motion.h2 id="founders-heading" variants={fadeUp} className="text-[#4a1c13] text-4xl md:text-5xl font-serif leading-tight mb-8">
              Meet The Founders
            </motion.h2>
            <motion.div variants={fadeUp} className="w-full h-[1px] bg-[#4a1c13]/10" aria-hidden="true" />
          </motion.div>

          {/* Founders Grid */}
          <div className="space-y-28">
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center ${
                  index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* Image */}
                <motion.div variants={fadeUp} className="lg:col-span-5">
                  <div className="overflow-hidden shadow-xl aspect-[4/5] bg-white flex items-center justify-center border border-[#4a1c13]/10 rounded-[2rem]">
                    <img
                      src={index === 0 ? IMAGES.founderA : IMAGES.founderB}
                      alt={`Portrait of ${founder.name}, ${founder.role} at Bright Arena`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div variants={fadeUp} className="lg:col-span-7">
                  <p className="text-[#ff7043] uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-semibold">
                    Founder
                  </p>
                  <h3 className="text-[#4a1c13] text-3xl md:text-5xl font-serif tracking-tight mb-4">
                    {founder.name}
                  </h3>
                  <p className="text-[#4a1c13]/60 uppercase tracking-[0.2em] text-sm mb-8 font-medium">
                    {founder.role}
                  </p>
                  <p className="text-[#4a1c13]/80 text-sm md:text-base leading-relaxed font-light max-w-2xl">
                    {founder.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mt-8" aria-label={`Specialties of ${founder.name}`}>
                    <span className="px-5 py-2.5 border border-[#4a1c13]/10 rounded-full text-[10px] uppercase tracking-widest text-[#4a1c13]/80">
                      Interior Design
                    </span>
                    <span className="px-5 py-2.5 border border-[#4a1c13]/10 rounded-full text-[10px] uppercase tracking-widest text-[#4a1c13]/80">
                      Luxury Spaces
                    </span>
                    <span className="px-5 py-2.5 border border-[#4a1c13]/10 rounded-full text-[10px] uppercase tracking-widest text-[#4a1c13]/80">
                      Client Experience
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SERVICE PILLARS ─── */}
      <section aria-labelledby="commitments-heading" className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger} className="text-center mb-14">
          <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
            What We Stand For
          </motion.span>
          <motion.h2 id="commitments-heading" variants={fadeUp} className="text-[clamp(28px,5vw,52px)] font-serif mt-4">
            Our Six Commitments
          </motion.h2>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Customised Designs", desc: "Tailored to your unique lifestyle and aesthetic not drawn from a catalogue.", icon: "✦" },
            { title: "Reflects Your Style", desc: "We listen deeply before we draw. Every corner is a reflection of you.", icon: "◈" },
            { title: "Expert Consultation", desc: "Guidance from India's finest minds, available throughout your project.", icon: "◇" },
            { title: "Transparent Pricing", desc: "Detailed, itemised quotes with zero hidden charges ever.", icon: "◉" },
            { title: "Qualified Staff", desc: "200+ trained professionals, each vetted for craft, punctuality, and care.", icon: "⬡" },
            { title: "Timely Handover", desc: "We have never missed a handover date. We don't intend to start.", icon: "◎" },
          ].map((item) => (
            <motion.div key={item.title} variants={fadeUp} whileHover={{ y: -6 }} className="bg-white p-8 rounded-3xl border border-[#4a1c13]/8 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="w-11 h-11 bg-[#ff7043]/10 text-[#ff7043] rounded-2xl flex items-center justify-center mb-5 text-lg" aria-hidden="true">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-[#4a1c13]/55 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── 5. PHILOSOPHY ─── */}
      <section id="philosophy" aria-labelledby="philosophy-heading" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={IMAGES.philosophyBg} 
            alt="Abstract architectural elements representing Bright Arena's design philosophy" 
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-[#1F1F1F]/60" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              Our Philosophy
            </motion.span>
            <motion.h2 id="philosophy-heading" variants={fadeUp} className="text-[clamp(28px,5vw,56px)] font-serif text-white mt-5 mb-8 leading-tight">
              Unique by Doing. <br className="hidden sm:block" />
              Not by Saying.
            </motion.h2>
            <motion.div variants={stagger} className="text-white/70 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              <motion.p variants={fadeUp}>
                We are the premier luxury interior designers in Hyderabad because we
                let our work speak. Every project is a complete turnkey journey from
                the first sketch on a napkin to the last cushion placed on a sofa.
              </motion.p>
              <motion.p variants={fadeUp}>
                A home is more than walls. It's where your children take their first
                steps, where you celebrate, grieve, dream. We carry that weight in
                every decision we make.
              </motion.p>
              <motion.p variants={fadeUp}>
                Innovation, craft, and a fierce attention to detail that's the
                Bright Arena guarantee. Come experience the finest luxury interiors
                in India.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                aria-label="Start your interior design project with Bright Arena"
                className="bg-[#ff7043] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300"
              >
                Start Your Project
              </a>
              <a 
                href="/projects" 
                aria-label="Explore the Bright Arena interior design portfolio"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300"
              >
                Explore Portfolio
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 6. PROCESS TIMELINE ─── */}
      <section aria-labelledby="process-heading" className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger} className="text-center mb-14">
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              How We Work
            </motion.span>
            <motion.h2 id="process-heading" variants={fadeUp} className="text-[clamp(28px,5vw,52px)] font-serif mt-4 text-[#4a1c13]">
              The Bright Arena Process
            </motion.h2>
          </motion.div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Discovery Call", desc: "We listen. Tell us your dreams, your budget, your lifestyle. We ask the questions other studios forget to ask." },
              { step: "02", title: "Concept & Moodboard", desc: "Within 7 days we present a full concept palette, material library, spatial flow, and reference imagery." },
              { step: "03", title: "Design Development", desc: "3D renders, elevation drawings, custom furniture selections. You see every detail before we build." },
              { step: "04", title: "Execution", desc: "Our in-house teams handle everything. You get a single point of contact. No juggling vendors." },
              { step: "05", title: "Handover & Beyond", desc: "We walk you through the finished space and remain on-call for 12 months post-handover." },
            ].map((item, i, arr) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className={`flex gap-8 items-start py-10 ${i < arr.length - 1 ? "border-b border-[#4a1c13]/10" : ""}`}>
                <div className="text-[clamp(32px,4vw,52px)] font-serif text-[#ff7043]/30 leading-none shrink-0 w-14 text-right" aria-hidden="true">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-[#4a1c13]">{item.title}</h3>
                  <p className="text-[#4a1c13]/55 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}