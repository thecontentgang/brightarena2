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

const fadeIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: smoothEase } },
};

// Unsplash image URLs (luxury interior / founder placeholders)
const IMAGES = {
  heroRoom:
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1400&q=80",
  studioWork:
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1000&q=80",
  founderA:
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
  founderB:
    "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=600&q=80",
  project1:
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
  project2:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80",
  project3:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  philosophyBg:
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
};

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-[#f7f4ee] text-[#4a1c13] overflow-x-hidden">

      {/* ─── 1. HERO ─── */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Parallax background */}
        <motion.div
          style={{ y: heroImgY }}
          className="absolute inset-0 scale-110"
        >
          <img
            src={IMAGES.heroRoom}
            alt="Bright Arena signature room"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#4a1c13]/60" />
        </motion.div>

        {/* Hero text */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 px-6 max-w-4xl mx-auto"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[#ff7043] tracking-[0.35em] uppercase font-bold text-xs mb-6"
          >
            Est. 2010 · Hyderabad, India
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-[clamp(40px,9vw,108px)] leading-[0.92] font-serif text-white mb-8"
          >
            We Design <br />
            <span className="italic text-[#ff7043]">Living Stories.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed"
          >
            Bright Arena Interiors is Hyderabad's premier luxury design studio —
            14 years, 500+ transformations, one obsession: spaces that feel
            unmistakably yours.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#founders"
              className="bg-[#ff7043] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300"
            >
              Meet the Founders
            </a>
            <a
              href="#philosophy"
              className="border border-white/40 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300"
            >
              Our Story
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
        >
          <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-white/30 animate-pulse" />
        </motion.div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-[#4a1c13] text-white py-14 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center"
        >
          {[
            { val: "14+", label: "Years of Excellence" },
            { val: "500+", label: "Projects Delivered" },
            { val: "200+", label: "Design Experts" },
            { val: "700+", label: "Happy Families" },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="text-[clamp(36px,6vw,64px)] font-serif text-[#ff7043]">{s.val}</div>
              <div className="text-white/55 text-[11px] uppercase tracking-widest mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── 3. STUDIO SPLIT ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            className="relative"
          >
            <img
              src={IMAGES.studioWork}
              alt="Bright Arena studio"
              className="w-full h-[420px] md:h-[540px] object-cover rounded-3xl"
            />
            {/* Floating label */}
            <div className="absolute -bottom-6 left-6 md:left-10 bg-[#ff7043] text-white px-6 py-3 rounded-2xl shadow-xl">
              <div className="text-2xl font-serif font-bold">2010</div>
              <div className="text-[10px] uppercase tracking-widest opacity-80">Year Founded</div>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="pt-8 lg:pt-0"
          >
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              Our Studio
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,4vw,52px)] font-serif leading-tight my-5">
              A Studio Built <br className="hidden md:block" />
              on One Promise.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4a1c13]/65 leading-relaxed mb-5">
              What began as a two-person vision in 2010 has grown into Hyderabad's
              most recognised luxury interior studio. We don't just design rooms —
              we architect entire living experiences, from the first sketch to the
              final throw pillow.
            </motion.p>
            <motion.p variants={fadeUp} className="text-[#4a1c13]/65 leading-relaxed mb-8">
              Our studio operates on a single promise: that every space we touch
              will be impossible to mistake for anyone else's. No templates, no
              shortcuts, no compromises.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-6">
              <div className="border-l-2 border-[#ff7043] pl-4">
                <div className="font-bold text-lg">Residential</div>
                <div className="text-sm text-[#4a1c13]/55">Apartments · Villas · Penthouses</div>
              </div>
              <div className="border-l-2 border-[#4a1c13]/30 pl-4">
                <div className="font-bold text-lg">Commercial</div>
                <div className="text-sm text-[#4a1c13]/55">Offices · Retail · Hospitality</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 4. PROJECT GALLERY STRIP ─── */}
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            { img: IMAGES.project1, label: "The Kapoor Residence · Jubilee Hills" },
            { img: IMAGES.project2, label: "Nexus Corporate HQ · HITEC City" },
            { img: IMAGES.project3, label: "The Sen Villa · Banjara Hills" },
          ].map((p, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              className="relative overflow-hidden rounded-2xl group cursor-pointer"
            >
              <img
                src={p.img}
                alt={p.label}
                className="w-full h-[260px] md:h-[320px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-400">
                <p className="text-white text-sm font-medium">{p.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <a
            href="/projects"
            className="inline-block border border-[#4a1c13]/30 text-[#4a1c13] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#4a1c13] hover:text-white transition-all duration-300"
          >
            View All Projects
          </a>
        </div>
      </section>

      {/* ─── 5. FOUNDERS ─── */}
      <section id="founders" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              The Visionaries
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,5vw,56px)] font-serif mt-4">
              Meet the Founders
            </motion.h2>
            <motion.p variants={fadeUp} className="text-[#4a1c13]/60 max-w-xl mx-auto mt-4 leading-relaxed">
              Two creatives. One shared obsession. An unyielding belief that
              exceptional interiors change the way people live.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Founder A */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img
                  src={IMAGES.founderA}
                  alt="Priya Mehta"
                  className="w-full h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#4a1c13]/60 to-transparent" />
              </div>
              <div className="px-4">
                <div className="inline-block bg-[#ff7043]/10 text-[#ff7043] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                  Co-Founder & Creative Director
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-2">Priya Mehta</h3>
                <p className="text-[#4a1c13]/60 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
                  A graduate of NID Ahmedabad with 16 years of experience spanning
                  Milan, Singapore, and Hyderabad. Priya's design language is rooted
                  in emotion — she believes a room should feel like a feeling, not
                  just a floorplan. Her residential portfolio spans 300+ homes across
                  Telangana and Andhra Pradesh.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {["Residential Luxury", "Material Curation", "Colour Theory"].map((tag) => (
                    <span key={tag} className="border border-[#4a1c13]/20 text-[#4a1c13]/60 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Founder B */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
              className="group text-center"
            >
              <div className="relative overflow-hidden rounded-3xl mb-6">
                <img
                  src={IMAGES.founderB}
                  alt="Arjun Reddy"
                  className="w-full h-[420px] object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#4a1c13]/60 to-transparent" />
              </div>
              <div className="px-4">
                <div className="inline-block bg-[#4a1c13]/10 text-[#4a1c13] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">
                  Co-Founder & Principal Architect
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-2">Arjun Reddy</h3>
                <p className="text-[#4a1c13]/60 leading-relaxed text-sm md:text-base max-w-sm mx-auto">
                  An architect and strategist by training from SPA Delhi, Arjun
                  brings structural rigour to every aesthetic decision. With a
                  background in hospitality and commercial design, he ensures that
                  every Bright Arena space is as functional as it is beautiful —
                  enduring beyond trends and built for real life.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  {["Commercial Spaces", "Space Planning", "Turnkey Projects"].map((tag) => (
                    <span key={tag} className="border border-[#4a1c13]/20 text-[#4a1c13]/60 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founders quote */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeUp}
            className="mt-16 text-center border-t border-[#4a1c13]/10 pt-14 px-4"
          >
            <p className="text-[clamp(20px,3vw,34px)] font-serif text-[#4a1c13] italic max-w-3xl mx-auto leading-snug">
              "We started Bright Arena because we were tired of beautiful rooms
              that felt like nobody lived in them. Every home deserves to feel
              lived-in, loved, and uniquely yours."
            </p>
            <p className="text-[#4a1c13]/40 text-xs uppercase tracking-widest mt-6">
              — Priya & Arjun, Co-Founders
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── 6. SERVICE PILLARS ─── */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="text-center mb-14"
        >
          <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
            What We Stand For
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-[clamp(28px,5vw,52px)] font-serif mt-4">
            Our Six Commitments
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { title: "Customised Designs", desc: "Tailored to your unique lifestyle and aesthetic — not drawn from a catalogue.", icon: "✦" },
            { title: "Reflects Your Style", desc: "We listen deeply before we draw. Every corner is a reflection of you.", icon: "◈" },
            { title: "Expert Consultation", desc: "Guidance from India's finest minds, available throughout your project.", icon: "◇" },
            { title: "Transparent Pricing", desc: "Detailed, itemised quotes with zero hidden charges — ever.", icon: "◉" },
            { title: "Qualified Staff", desc: "200+ trained professionals, each vetted for craft, punctuality, and care.", icon: "⬡" },
            { title: "Timely Handover", desc: "We have never missed a handover date. We don't intend to start.", icon: "◎" },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="bg-white p-8 rounded-3xl border border-[#4a1c13]/8 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-11 h-11 bg-[#ff7043]/10 text-[#ff7043] rounded-2xl flex items-center justify-center mb-5 text-lg">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{item.title}</h3>
              <p className="text-[#4a1c13]/55 leading-relaxed text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── 7. PHILOSOPHY ─── */}
      <section id="philosophy" className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={IMAGES.philosophyBg}
            alt="Philosophy background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#4a1c13]/82" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
          >
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              Our Philosophy
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,5vw,56px)] font-serif text-white mt-5 mb-8 leading-tight">
              Unique by Doing. <br className="hidden sm:block" />
              Not by Saying.
            </motion.h2>
            <motion.div variants={stagger} className="text-white/70 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              <motion.p variants={fadeUp}>
                We are the premier luxury interior designers in Hyderabad because we
                let our work speak. Every project is a complete turnkey journey — from
                the first sketch on a napkin to the last cushion placed on a sofa.
              </motion.p>
              <motion.p variants={fadeUp}>
                A home is more than walls. It's where your children take their first
                steps, where you celebrate, grieve, dream. We carry that weight in
                every decision we make.
              </motion.p>
              <motion.p variants={fadeUp}>
                Innovation, craft, and a fierce attention to detail — that's the
                Bright Arena guarantee. Come experience the finest luxury interiors
                in India.
              </motion.p>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-[#ff7043] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300"
              >
                Start Your Project
              </a>
              <a
                href="/projects"
                className="border border-white/30 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300"
              >
                Explore Portfolio
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── 8. PROCESS TIMELINE ─── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.span variants={fadeUp} className="text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs">
              How We Work
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-[clamp(28px,5vw,52px)] font-serif mt-4">
              The Bright Arena Process
            </motion.h2>
          </motion.div>

          <div className="space-y-0">
            {[
              { step: "01", title: "Discovery Call", desc: "We listen. Tell us your dreams, your budget, your lifestyle. We ask the questions other studios forget to ask." },
              { step: "02", title: "Concept & Moodboard", desc: "Within 7 days we present a full concept — palette, material library, spatial flow, and reference imagery." },
              { step: "03", title: "Design Development", desc: "3D renders, elevation drawings, custom furniture selections. You see every detail before we build." },
              { step: "04", title: "Execution", desc: "Our in-house teams handle everything. You get a single point of contact. No juggling vendors." },
              { step: "05", title: "Handover & Beyond", desc: "We walk you through the finished space and remain on-call for 12 months post-handover." },
            ].map((item, i, arr) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeUp}
                className={`flex gap-8 items-start py-10 ${i < arr.length - 1 ? "border-b border-[#4a1c13]/10" : ""}`}
              >
                <div className="text-[clamp(32px,4vw,52px)] font-serif text-[#ff7043]/30 leading-none shrink-0 w-14 text-right">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-[#4a1c13]/55 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}