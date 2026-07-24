"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { servicesData } from "./servicesData"; 
import SEO from "../components/SEO";

/* ─── SERVICE ROW ─── */
function ServiceRow({
  service,
  index,
}: {
  service: typeof servicesData[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const headingId = `service-heading-${index}`;

  return (
    <div ref={ref} className="border-t border-[#E8E2DB]" aria-labelledby={headingId}>
      <div
        className={`
          flex flex-col
          ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
          min-h-[540px]
        `}
      >
        {/* Image */}
        <div className="w-full md:w-[55%] overflow-hidden bg-[#EDE8E2]" style={{ minHeight: 300 }}>
          <motion.img
            src={service.images[0]}
            alt={`Bright Arena interior service: ${service.title}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
            style={{ minHeight: 300 }}
            initial={{ scale: 1.06, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        {/* Text */}
        <motion.div
          className={`
            w-full md:w-[45%] flex flex-col justify-center
            px-8 py-12
            md:px-12 md:py-16
            lg:px-16
          `}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        >
          <span className="text-[#8A7570] text-[11px] tracking-[0.25em] uppercase font-medium mb-5">
            0{index + 1}
          </span>

          <h2 id={headingId} className="text-[clamp(26px,3.5vw,42px)] leading-tight mb-5" style={{ fontFamily: "Georgia, serif", color: "#2C1810" }}>
            {service.title}
          </h2>

          <p className="text-[15px] leading-[1.8] mb-8" style={{ color: "#6B5C57" }}>
            {service.longDescription}
          </p>

          <div className="mb-8">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "#8A7570" }}>
              Key Benefits
            </p>
            <ul className="space-y-2" aria-label={`Benefits of ${service.title}`}>
              {service.benefits.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px]" style={{ color: "#4A3630" }}>
                  <span className="mt-[7px] w-[5px] h-[1px] shrink-0 bg-[#C4623A]" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* Phone */}
            <a
              href={`tel:${service.phone}`}
              aria-label={`Call Bright Arena regarding ${service.title} at ${service.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#E8D9D3] bg-[#F9F6F3] text-[#6B5752] hover:border-[#C4623A] hover:text-[#C4623A] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-1.372a1.5 1.5 0 00-1.09-1.443l-4.423-1.106a1.5 1.5 0 00-1.465.417l-.97.97a12.042 12.042 0 01-5.431-5.431l.97-.97a1.5 1.5 0 00.417-1.465L7.937 4.34A1.5 1.5 0 006.494 3.25H5.122a1.5 1.5 0 00-1.5 1.5V6.75z"
                />
              </svg>

              <span className="text-[13px] font-medium tracking-wide">
                {service.phone}
              </span>
            </a>

            {/* Learn More */}
            <a
              href={`/services/${service.slug}`}
              aria-label={`Learn more details about our ${service.title} services`}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C4623A] text-white text-[11px] font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:bg-[#A84E2C] hover:scale-105 hover:shadow-xl"
            >
              Learn More
              <span className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── PAGE ─── */
export default function ServicesPage() {
  return (
    <>
      <SEO 
        title="Home and Office Interior Design Services in Hyderabad - Bright Arena Interiors"
        description="Bright Arena Interiors offers Interior Design Services in Hyderabad for luxury homes, offices, and commercial spaces with expert planning and execution."
        url="https://www.brightarenainteriors.com/services"
      />
      <main style={{ background: "#F9F7F3", color: "#2C1810" }} className="overflow-x-hidden">

      {/* HERO */}
      <section aria-labelledby="services-hero-heading" className="relative min-h-[80vh] flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24">
        <motion.div
          className="w-full max-w-5xl text-center pt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-7" style={{ color: "#8A7570" }}>
            Bright Arena Interiors · Services
          </p>
          <h1 id="services-hero-heading" className="text-[clamp(40px,7vw,88px)] leading-[0.95] mb-8 font-primary">
            Professional design <br />
            <span style={{ color: "#C4623A", fontStyle: "italic" }}>
              for your vision.
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-[16px] leading-[1.8]" style={{ color: "#6B5C57" }}>
            We bring professional precision to every space, ensuring your project is handled with expertise, creativity, and absolute attention to detail.
          </p>
        </motion.div>
      </section>

      {/* SERVICE ROWS */}
      <section aria-label="Our Interior Design Services">
        {servicesData.map((s, i) => (
          <ServiceRow key={s.slug} service={s} index={i} />
        ))}
        <div className="border-t border-[#E8E2DB]" aria-hidden="true" />
      </section>

      {/* QUIET TRUST BAR */}
      <section aria-label="Company Statistics" className="px-8 md:px-16 lg:px-24 py-20 border-t border-[#E8E2DB]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { val: "14+", label: "Years of practice" },
            { val: "500+", label: "Projects delivered" },
            { val: "200+", label: "Design experts" },
            { val: "0", label: "Missed handovers" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-[clamp(28px,4vw,48px)] mb-1" style={{ fontFamily: "Georgia, serif", color: "#C4623A" }}>
                {s.val}
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#8A7570" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </main>
    </>
  );
}