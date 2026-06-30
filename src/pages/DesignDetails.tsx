"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Explicitly typed tuple for Framer Motion
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const processSteps = [
  {
    id: "01",
    title: "Discovery & Vision",
    description: "Every masterpiece begins with a conversation. We immerse ourselves in your lifestyle, understanding how you move, live, and dream in your space. This isn't just about aesthetics; it's about translating your essence into architectural language.",
  },
  {
    id: "02",
    title: "Spatial Architecture",
    description: "Before applying finishes, we perfect the bones. We rethink floor plans, manipulate natural light, and establish a fluid, intuitive flow. True luxury is invisible—it's the feeling of a room that just 'works' the moment you step inside.",
  },
  {
    id: "03",
    title: "Materiality & Sourcing",
    description: "We source globally and craft locally. From rare Italian marbles to bespoke hand-woven textiles and sustainable woods, we curate a tactile palette that begs to be touched. Every material must earn its place in the room.",
  },
  {
    id: "04",
    title: "Execution & Styling",
    description: "Our artisans and contractors execute the vision with obsessive precision. The final layer is the styling—placing curated art, bespoke furniture, and lighting to breathe soul into the finished architecture.",
  }
];

export default function DesignDetailsPage() {
  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">

      {/* ── HERO TEXT ── */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-16 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 relative z-10 text-center flex flex-col items-center">
          
          <motion.span
            className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Design Philosophy
          </motion.span>

          <motion.h1 
            className="text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          >
            The anatomy of a <br />
            <span className="italic text-[#ff7043]">masterpiece.</span>
          </motion.h1>

          <motion.p
            className="mt-8 max-w-2xl text-base md:text-lg leading-relaxed text-[#4a1c13]/70"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            A look behind the curtain. Discover the meticulous process, the reverence for raw materials, and the unyielding attention to detail that defines every Bright Arena project.
          </motion.p>
        </div>
      </section>

      {/* ── PANORAMIC HERO IMAGE ── */}
      <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto mb-24 md:mb-32">
        <div ref={heroImgRef} className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de] h-[40vh] md:h-[60vh]">
          <motion.div className="w-full h-full" style={{ y: heroImgY }}>
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
              alt="Bright Arena Design Process"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#4a1c13]/10" />
          <motion.div
            className="absolute inset-0 bg-[#f7f4ee]"
            style={{ transformOrigin: "top" }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
          />
        </div>
      </section>

      {/* ── THE PROCESS (Sticky Scrolling) ── */}
      <section className="py-12 md:py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left: Sticky Header */}
            <div className="lg:col-span-5">
              <div className="sticky top-32">
                <motion.h2
                  className="text-3xl md:text-5xl font-primary text-[#4a1c13] leading-tight"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  Our <br />
                  <span className="italic text-[#ff7043]">Methodology.</span>
                </motion.h2>
                <motion.p 
                  className="mt-6 text-[#4a1c13]/60 text-base md:text-lg max-w-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                  viewport={{ once: true, margin: "-60px" }}
                >
                  Great design is never an accident. It is the result of a rigorous, four-step journey.
                </motion.p>
              </div>
            </div>

            {/* Right: Scrolling Steps */}
            <div className="lg:col-span-7 flex flex-col gap-12 md:gap-24">
              {processSteps.map((step) => (
                <motion.div 
                  key={step.id}
                  className="flex flex-col md:flex-row gap-6 md:gap-12"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="shrink-0">
                    <span className="text-[#4a1c13]/20 font-primary text-5xl md:text-7xl">
                      {step.id}
                    </span>
                  </div>
                  <div className="pt-2 md:pt-4">
                    <h3 className="text-2xl md:text-3xl font-medium text-[#4a1c13] mb-4">
                      {step.title}
                    </h3>
                    <p className="text-[#4a1c13]/70 text-base md:text-lg leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── MATERIALITY & CRAFT (Asymmetrical Grid) ── */}
      <section className="py-24 md:py-32 bg-white mt-12 md:mt-24 rounded-[3rem] md:rounded-[4rem] mx-4 md:mx-6 shadow-sm border border-[#4a1c13]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.span
              className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold block mb-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
              viewport={{ once: true }}
            >
              The Details
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-primary leading-tight text-[#4a1c13]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
              viewport={{ once: true }}
            >
              An obsession with <br /> <span className="italic text-[#ff7043]">craftsmanship.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10">
            
            {/* Large Image */}
            <motion.div 
              className="md:col-span-7 h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <img 
                src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop" 
                alt="Wood and Marble Textures" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
              />
            </motion.div>

            {/* Stacked Smaller Images */}
            <div className="md:col-span-5 flex flex-col gap-6 md:gap-10">
              <motion.div 
                className="h-[250px] md:h-[350px] rounded-[2rem] overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop" 
                  alt="Textiles and Fabrics" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                />
              </motion.div>
              
              <motion.div 
                className="flex-1 bg-[#f7f4ee] rounded-[2rem] p-8 md:p-10 flex flex-col justify-center border border-[#4a1c13]/5"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="text-xl md:text-2xl font-primary mb-3">Tactile Reality</h3>
                <p className="text-[#4a1c13]/60 text-sm md:text-base leading-relaxed">
                  Design should not just look good on a screen; it must feel exceptional to the human hand. We prioritize natural, living materials that age gracefully alongside you.
                </p>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 md:py-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE }}
          viewport={{ once: true }}
          className="flex flex-col items-center"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-primary leading-tight tracking-tight mb-10">
            Ready to start <br /> your journey?
          </h2>
          
          <Link
            to="/contact"
            className="bg-[#4a1c13] text-white px-10 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors duration-500"
          >
            Connect with our designers
          </Link>
        </motion.div>
      </section>

    </main>
  );
}