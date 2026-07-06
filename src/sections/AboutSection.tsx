"use client";

import React, { useRef } from "react";
import { motion, useInView,type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Animation Variants for the Bento Grid ---
const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const gridItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: smoothEase },
  },
};

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const navigate = useNavigate();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f7f4ee] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        
        {/* ========================================= */}
        {/* TOP CONTENT (Text & Button)               */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 md:mb-20">
          {/* Left - Big Title */}
          <h2 className="text-[#4a1c13] text-[clamp(42px,6vw,68px)] leading-[1.05] tracking-tight font-primary">
            Partner in every detail,
            <span className="text-[#ff7043] italic"> always</span>
          </h2>

          {/* Right - Description + Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: smoothEase, delay: 0.1 }}
            className="flex flex-col gap-8 pt-2 md:pt-3"
          >
            <p className="text-[#4a1c13]/80 text-[16px] md:text-lg leading-relaxed max-w-lg">
              We don’t waste time with hierarchy. Our small team gives you
              direct access to the designers who will create your space —
              from the first conversation to the final details.
            </p>

            <div>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "#ffc107",
                  color: "#4a1c13",
                }}
                onClick={() => navigate("/about")}
                whileTap={{ scale: 0.95 }}
                className="w-full md:w-auto bg-[#ff7043] text-white px-8 py-4 rounded-2xl text-[13px] font-bold tracking-widest uppercase shadow-lg shadow-[#ff7043]/20 transition-colors"
              >
                Meet the Team
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ========================================= */}
        {/* INTERACTIVE BENTO GRID GALLERY            */}
        {/* ========================================= */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          // Flex col on mobile, 3-col grid on large screens
          className="flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[550px]"
        >
          {/* 1. Main Large Image */}
          <motion.div
            variants={gridItemVariants}
            className="lg:col-span-2 lg:row-span-2 h-[350px] lg:h-full relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop"
              alt="Our design philosophy in action"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Floating Glass Badge */}
            <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/20 backdrop-blur-md border border-white/30 px-5 py-3 rounded-2xl flex items-center gap-3 transform transition-transform duration-500 group-hover:-translate-y-1">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffc107] animate-pulse" />
              <span className="text-white text-sm font-bold tracking-wide">Award-Winning Design</span>
            </div>
          </motion.div>

          {/* 2. Top Right: Detail/Material Image */}
          <motion.div
            variants={gridItemVariants}
            className="lg:col-span-1 lg:row-span-1 h-[220px] lg:h-full relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm"
          >
            <img
              src="https://images.unsplash.com/photo-1618220179428-22790b46a0eb?q=80&w=800&auto=format&fit=crop"
              alt="Material details"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          </motion.div>

          {/* 3. Bottom Right: Brand Colored Stat Card */}
          <motion.div
            variants={gridItemVariants}
            className="lg:col-span-1 lg:row-span-1 h-[220px] lg:h-full relative rounded-3xl overflow-hidden bg-[#4a1c13] flex flex-col justify-center p-8 group cursor-pointer shadow-sm"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#f7f4ee" strokeWidth="1">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <h3 className="text-[#ff7043] text-[clamp(40px,4vw,56px)] leading-none font-primary mb-2 transform transition-transform duration-500 group-hover:-translate-y-1">
              100%
            </h3>
            <p className="text-[#f7f4ee] text-sm md:text-base font-medium tracking-wide">
              Client Satisfaction Rate
            </p>
            <p className="text-[#f7f4ee]/50 text-xs mt-2 max-w-[200px]">
              We don't consider the job done until your vision is perfectly realized.
            </p>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;