"use client";

import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SEO from "../components/SEO";

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
  heroRoom: "/projectsImg/forest-edge/fe-img5.webp",
  studioWork: "/projectsImg/varaprasad/vp-img11.png",
  philosophyBg: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
  founderA: "https://images.unsplash.com/photo-",
  founderB: "https://images.unsplash.c",
};

const founders = [
  {
    name: "Srilatha Ravuri",
    role: "Co-Founder & Principal Lead Designer",
    description: "Srilatha Ravuri is the Founder and Principal Interior Designer of Bright Arena, specializing in luxury residential and commercial interior design. With expertise in space planning, modern interiors, and bespoke design solutions, she creates elegant, functional spaces tailored to each client's lifestyle.Known for her attention to detail and client-focused approach, Srilatha oversees every project from concept to completion, delivering timeless interiors that combine aesthetics, comfort, and quality. Her vision has established Bright Arena as a trusted name in innovative interior design and customized living spaces.",
    stats: ["500K+ Sq Ft Designed", "200+ Homes Completed", "Lead Architect"], 
  },
  {
  name: "Bhawani Shankar Guruvelli",
  role: "Co-Founder & Director of Operations & Growth",
  description:
    "Bhawani Shankar Guruvelli is the Co-Founder of Bright Arena, leading business operations, strategic planning, and project execution. With expertise in business management, client relationships, and operational excellence, he ensures every project is delivered with efficiency and quality. His vision for innovation, sustainable growth, and customer satisfaction continues to strengthen Bright Arena's reputation as a trusted interior design company.",
    stats: ["15+ Years Experience", "150+ Commercial Spaces", "Creative Lead"],
}
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <>
      <SEO 
        title="About - Bright Arena Interiors 14+ Years of Interior Design Excellence"
        description="Learn about Bright Arena Interiors, a trusted interior design company in Hyderabad with 14+ years of experience creating beautiful, functional, and personalized spaces."
        url="https://www.brightarenainteriors.com/about"
      />
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
          
          {/* SEO H1 Tag - Visually Hidden */}
          <h1 className="sr-only">About Bright Arena Interiors</h1>

          <motion.span variants={fadeUp} className="inline-block text-[#ff7043] tracking-[0.35em] uppercase font-bold text-xs mb-6">
            Est. 2012 · Hyderabad, India
          </motion.span>
          
          {/* Converted visual text to H2 to respect semantic HTML */}
          <motion.h2 variants={fadeUp} className="text-[clamp(40px,9vw,108px)] leading-[0.92] font-serif text-white mb-8">
            We Design <br />
            <span className="italic text-[#ff7043]">Living Stories.</span>
          </motion.h2>
          
          <motion.p variants={fadeUp} className="text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed">
            Bright Arena Interiors is Hyderabad's premier luxury design studio
            14 years, 350+ transformations, one obsession: spaces that feel
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
      className="mb-16 md:mb-24"
    >
      <motion.p variants={fadeUp} className="uppercase tracking-[0.35em] text-[#ff7043] text-xs font-semibold mb-4">
        Our Leadership
      </motion.p>
      <motion.h2 id="founders-heading" variants={fadeUp} className="text-[#4a1c13] text-4xl md:text-5xl font-serif leading-tight mb-8">
        Meet The Founders
      </motion.h2>
      <motion.div variants={fadeUp} className="w-full h-[1px] bg-[#4a1c13]/10" aria-hidden="true" />
    </motion.div>

    {/* Founders Grid -> Now Horizontal Cards */}
    <div className="space-y-16 lg:space-y-24">
      {founders.map((founder, index) => (
        <motion.div
          key={founder.name}
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}
          // The magic layout classes: Stack on mobile, side-by-side on desktop. Alternate left/right on desktop.
          className={`flex flex-col ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
          } items-stretch w-full max-w-6xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#4a1c13]/5 overflow-hidden`}
        >
          
          {/* Image Section */}
          <motion.div variants={fadeUp} className="relative w-full lg:w-2/5 min-h-[350px] lg:min-h-full shrink-0 overflow-hidden bg-gray-100">
            <img
              src={index === 0 ? IMAGES.founderA : IMAGES.founderB}
              alt={`Portrait of ${founder.name}, ${founder.role} at Bright Arena`}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent ${index % 2 !== 0 ? 'lg:to-white/10' : 'lg:to-white/10'}`} />
          </motion.div>

          {/* Content Section */}
          <motion.div variants={fadeUp} className="flex flex-col justify-center w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
           
            
            <h3 className="text-[#4a1c13] text-3xl md:text-5xl font-serif tracking-tight mb-2 md:mb-4">
              {founder.name}
            </h3>
            
            <p className="text-[#4a1c13]/60 uppercase tracking-[0.2em] text-sm mb-6 md:mb-8 font-medium">
              {founder.role}
            </p>
            
            <p className="text-[#4a1c13]/80 text-sm md:text-base leading-relaxed font-light max-w-2xl">
              {founder.description}
            </p>
            
           <div className="flex flex-wrap gap-3 mt-8 md:mt-10" aria-label={`Key metrics for ${founder.name}`}>
  {founder.stats?.map((stat, i) => (
    <span 
      key={i} 
      className="px-5 py-2.5 border border-[#4a1c13]/10 rounded-full text-[10px] uppercase tracking-widest text-[#4a1c13]/80 hover:bg-[#4a1c13]/5 transition-colors cursor-default"
    >
      {stat}
    </span>
  ))}
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
      { title: "Expert Consultation", desc: "Guidance from India's finest minds, available throughout your project.", icon: "◇" },
      { title: "Reflects Your Style", desc: "We listen deeply before we draw. Every corner is a reflection of you.", icon: "◈" },
      { title: "Customised Designs", desc: "Tailored to your unique lifestyle and aesthetic not drawn from a catalogue.", icon: "✦" },
      { title: "Transparent Pricing", desc: "Detailed, itemised quotes with zero hidden charges ever.", icon: "◉" },
      { title: "Qualified Staff", desc: "200+ trained professionals, each vetted for craft, punctuality, and care.", icon: "⬡" },
      { title: "Timely Handover", desc: "We have never missed a handover date. We don't intend to start.", icon: "◎" },
    ].map((item, i) => (
      <motion.div 
        key={item.title} 
        variants={fadeUp} 
        whileHover={{ y: -6 }} 
        // Added relative, overflow-hidden, and group
        className="relative bg-white p-8 rounded-3xl border border-[#4a1c13]/8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
      >
        {/* The Vertical, Half-Visible Number */}
        <div 
          className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-[20%] -rotate-90 text-[140px] font-serif font-bold leading-none text-[#4a1c13]/[0.03] group-hover:text-[#ff7043]/[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0" 
          aria-hidden="true"
        >
          0{i + 1}
        </div>

        {/* Existing Content wrapped in relative z-10 so it sits above the number */}
        <div className="relative z-10">
          <div className="w-11 h-11 bg-[#ff7043]/10 text-[#ff7043] rounded-2xl flex items-center justify-center mb-5 text-lg" aria-hidden="true">
            {item.icon}
          </div>
          <h3 className="text-lg font-bold mb-3 text-[#4a1c13]">{item.title}</h3>
          <p className="text-[#4a1c13]/55 leading-relaxed text-sm">{item.desc}</p>
        </div>
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
      <section aria-labelledby="process-heading" className="py-24 px-6 bg-white overflow-hidden">
  <div className="max-w-6xl mx-auto">
    
    {/* Header */}
    <motion.div 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.3 }} 
      variants={stagger} 
      className="text-center mb-16 lg:mb-20"
    >
      <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
        How We Work
      </motion.span>
      <motion.h2 id="process-heading" variants={fadeUp} className="text-[clamp(28px,5vw,52px)] font-serif mt-4 text-[#4a1c13]">
        The Bright Arena Process
      </motion.h2>
    </motion.div>

    {/* 
      Vertical stack of Horizontal Cards 
    */}
    <div className="flex flex-col gap-6">
      {[
        { step: "01", title: "Project Kick-off call", desc: "We listen. Tell us your dreams, your budget, your lifestyle." },
        { step: "02", title: "Concept & Moodboard", desc: "Within 7 days we present a full concept palette, material library, spatial flow, and reference imagery." },
        { step: "03", title: "Design Development", desc: "3D renders, elevation drawings, custom furniture selections. You see every detail before we build." },
        { step: "04", title: "Execution", desc: "Our in-house teams handle everything. You get a single point of contact. No juggling vendors." },
        { step: "05", title: "Final Chapter with New Beginning", desc: "We walk you through the finished space and remain on-call for 12 months post-handover." },
      ].map((item) => (
        <motion.div 
          key={item.step} 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.4 }} 
          variants={fadeUp} 
          // Changed to flex-col on mobile, md:flex-row on desktop
          className="group flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 rounded-[2rem] bg-[#FFF8F2] border border-[#4a1c13]/5 hover:shadow-xl hover:border-[#ff7043]/20 transition-all duration-300"
        >
          {/* Step Number (Left) */}
          <div 
            className="w-full md:w-1/5 text-6xl md:text-7xl font-serif text-[#ff7043]/20 leading-none mb-6 md:mb-0 group-hover:text-[#ff7043]/40 transition-colors shrink-0" 
            aria-hidden="true"
          >
            {item.step}
          </div>
          
          {/* Title (Middle) */}
          <div className="w-full md:w-2/5 pr-0 md:pr-8 mb-4 md:mb-0 shrink-0">
            <h3 className="text-2xl md:text-3xl font-bold font-primary text-[#4a1c13] leading-snug">
              {item.title}
            </h3>
          </div>

          {/* Text Content (Right) */}
          <div className="w-full md:w-2/5 flex-grow">
            <p className="text-[#4a1c13]/70 text-base leading-relaxed border-l-0 md:border-l border-[#4a1c13]/10 pl-0 md:pl-8">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
    
  </div>
</section>

    </main>
    </>
  );
}