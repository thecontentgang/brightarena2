"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#f7f4ee] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20">
        {/* Top Content - Like the screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
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
            className="flex flex-col gap-8 pt-3"
          >
            <p className="text-[#4a1c13]/70 text-[17px] md:text-lg leading-relaxed max-w-lg">
              We don’t waste time with hierarchy. Our small team gives you 
              direct access to the designers who will create your space — 
              from the first conversation to the final details.
            </p>

            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: "#ffc107",
                color: "#4a1c13",
              }}
              whileTap={{ scale: 0.95 }}
              className="w-full md:w-auto bg-[#ff7043] text-white px-7 py-3.5 md:py-4 rounded-2xl text-xs font-bold tracking-widest uppercase"
            >
              meet the team
            </motion.button>
          </motion.div>
        </div>

        {/* Large Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: smoothEase, delay: 0.3 }}
          className="relative rounded-3xl overflow-hidden aspect-[16/9] md:aspect-[2.1/0.8]"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop"
            alt="Our design philosophy in action"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/30 via-transparent to-transparent" />

          
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;