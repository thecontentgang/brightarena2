"use client";

import { motion } from "framer-motion";

const trustedLogos = [
  "/logos/aparna-zenon.png",
  "/logos/asbl-spire.png",
  "/logos/auro-regent.svg",
  "/logos/avani-tulasi-vanam.png",
  "/logos/candeur-40.png",
  "/logos/dsr-park-ridge.jpg",
  "/logos/elegance-emperia.png",
  "/logos/epil-carnerstone.png",
  "/logos/gem-nakshtra.png",
  "/logos/hallmark-skyrena.png",
  "/logos/indus-peblcity.png",
  "/logos/my-home-sayuk.jpg",
  "/logos/nyla-tema4.png",
  "/logos/tripura-lm-3.jpg",
  "/logos/vaishnavi-oasis.png",
];

const row1 = [...trustedLogos, ...trustedLogos];
const row2 = [...trustedLogos].reverse();
const duplicatedRow2 = [...row2, ...row2];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const stats = [
  { value: "150+", label: "Luxury Homes" },
  { value: "25+", label: "Premium Communities" },
  { value: "8+", label: "Years Experience" },
  { value: "100%", label: "Client Satisfaction" },
];

const TrustedBy = () => {
  return (
    <section className="relative overflow-hidden bg-[#FAF7F2] py-24 md:py-32">
      
      {/* BACKGROUND PATTERN */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
            linear-gradient(#d8c7b6 1px, transparent 1px),
            linear-gradient(90deg, #d8c7b6 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        {/* Soft edge fades to blend with adjoining sections */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAF7F2] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAF7F2] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        
        {/* EYEBROW */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          viewport={{ once: true }}
          className="flex justify-center mb-6"
        >
          <span className="text-xs font-semibold tracking-[0.3em] text-[#FF7043] uppercase">
            A Legacy of Trust
          </span>
        </motion.div>

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: smoothEase }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-primary text-[42px] md:text-[68px] leading-[1.1] text-[#4A1C13]">
            Designed for
            <br />
            <span className="text-[#FF7043]">Exceptional Living</span>
          </h2>
          <p className="max-w-3xl mx-auto mt-8 text-[#6E5A52] leading-8 text-lg font-light">
            Every home tells a story. We've had the privilege of crafting interiors
            for some of Hyderabad's most admired residential communities, delivering
            timeless spaces with meticulous attention to detail.
          </p>
        </motion.div>

        {/* STATISTICS */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-8 my-20 md:my-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: smoothEase }}
          viewport={{ once: true }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center flex flex-col items-center justify-center space-y-2">
              <span className="font-primary text-4xl md:text-5xl text-[#4A1C13] font-medium">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-[#6E5A52] tracking-wide uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CAROUSEL WRAPPER */}
        <div className="relative mt-12 md:mt-16">
          {/* Edge fades for the marquee */}
          <div className="absolute left-0 top-0 z-20 h-full w-24 md:w-48 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-24 md:w-48 bg-gradient-to-l from-[#FAF7F2] to-transparent pointer-events-none" />

          {/* ROW 1 */}
          <div className="relative overflow-hidden py-4">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex w-max"
            >
              {row1.map((logo, index) => (
                <div
                  key={index}
                  className="group relative mx-4 w-[180px] h-[130px] rounded-2xl bg-[#F4EDDB] border border-[#E6D8C7] shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center hover:-translate-y-2 overflow-hidden flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="Premium Community Client"
                    className="w-[65%] h-[55%] object-contain  transition-all duration-500"
                  />
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FF7043] transition-all duration-500" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* ROW 2 */}
          <div className="relative overflow-hidden py-4">
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex w-max"
            >
              {duplicatedRow2.map((logo, index) => (
                <div
                  key={index}
                  className="group relative mx-4 w-[180px] h-[130px] rounded-2xl bg-[#F4EDDB] border border-[#E6D8C7] shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center hover:-translate-y-2 overflow-hidden flex-shrink-0 cursor-pointer"
                >
                  <img
                    src={logo}
                    alt="Premium Community Client"
                    className="w-[65%] h-[55%] object-contain  transition-all duration-500"
                  />
                  {/* Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FF7043] transition-all duration-500" />
                </div>
              ))}
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;