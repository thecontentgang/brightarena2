"use client";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { servicesData, type ServiceItem } from "../pages/data/servicesData"; // Adjust path if needed
import SEO from "../components/SEO";

/* ─── SERVICE CARD ─── */
function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const headingId = `service-heading-${index}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`
        flex flex-col
        ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}
        w-full bg-white rounded-[2rem] md:rounded-[3rem] 
        overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        border border-[#2C1810]/5 group
      `}
      aria-labelledby={headingId}
    >
      {/* 1. Image Section */}
      <div className="relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-[#EDE8E2] shrink-0">
        <motion.img
          src={service.images?.[0] || "/placeholder-service.jpg"}
          alt={`Bright Arena interior service: ${service.title}`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Subtle inner shadow for premium depth */}
        <div className="absolute inset-0 bg-black/5 pointer-events-none" />
      </div>

      {/* 2. Text Content Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block px-4 py-1.5 bg-[#C4623A]/10 text-[#C4623A] rounded-full text-[10px] tracking-[0.25em] uppercase font-bold mb-6">
            0{index + 1} • {service.title.split(' ')[0]}
          </span>

          <h2
            id={headingId}
            className="text-[clamp(28px,4vw,42px)] leading-[1.1] mb-5 tracking-tight"
            style={{ fontFamily: "Georgia, serif", color: "#2C1810" }}
          >
            {service.title}
          </h2>

          <p className="text-[15px] leading-relaxed mb-8" style={{ color: "#6B5C57" }}>
            {service.longDescription}
          </p>

          <div className="mb-10">
            <p className="text-[11px] tracking-[0.2em] uppercase font-bold mb-4" style={{ color: "#8A7570" }}>
              Key Benefits
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6" aria-label={`Benefits of ${service.title}`}>
              {service.benefits?.map((item: string) => (
                <li key={item} className="flex items-start gap-3 text-[14px]" style={{ color: "#4A3630" }}>
                  <span className="mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 bg-[#C4623A]" aria-hidden="true" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Learn More */}
            <Link
              to={`/services/${service.slug}`}
              aria-label={`Learn more details about our ${service.title} services`}
              className="group/btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C4623A] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#A84E2C] hover:shadow-lg"
            >
              Explore Service
              <span className="transition-transform duration-300 group-hover/btn:translate-x-1" aria-hidden="true">
                →
              </span>
            </Link>

            {/* Phone */}
            <a
              href={`tel:${service.phone}`}
              aria-label={`Call Bright Arena regarding ${service.title} at ${service.phone}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#E8D9D3] bg-[#F9F6F3] text-[#6B5752] hover:border-[#C4623A] hover:bg-white hover:text-[#C4623A] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15h2.25a1.5 1.5 0 001.5-1.5v-1.372a1.5 1.5 0 00-1.09-1.443l-4.423-1.106a1.5 1.5 0 00-1.465.417l-.97.97a12.042 12.042 0 01-5.431-5.431l.97-.97a1.5 1.5 0 00.417-1.465L7.937 4.34A1.5 1.5 0 006.494 3.25H5.122a1.5 1.5 0 00-1.5 1.5V6.75z" />
              </svg>
              <span className="text-[12px] font-bold tracking-wider">
                {service.phone}
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
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
      
      <main style={{ background: "#F9F7F3" }} className="overflow-x-hidden pt-16">
        <h1 className="sr-only">Home &amp; Office Interior Design Services in Hyderabad</h1>

        {/* HERO */}
        <section aria-labelledby="services-hero-heading" className="relative min-h-[70vh] flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24">
          <motion.div
            className="w-full max-w-4xl text-center pt-24 pb-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-[11px] tracking-[0.3em] uppercase font-bold mb-6" style={{ color: "#C4623A" }}>
              Bright Arena Interiors
            </p>
            <h2 id="services-hero-heading" className="text-[clamp(42px,6vw,72px)] leading-[1.05] mb-8" style={{ fontFamily: "Georgia, serif", color: "#2C1810" }}>
              Professional design <br className="hidden sm:block" />
              <span style={{ color: "#C4623A", fontStyle: "italic" }}>
                for your vision.
              </span>
            </h2>
            <p className="max-w-2xl mx-auto text-[16px] leading-[1.8]" style={{ color: "#6B5C57" }}>
              We bring professional precision to every space, ensuring your project is handled with expertise, creativity, and absolute attention to detail.
            </p>
          </motion.div>
        </section>

        {/* SERVICE CARDS */}
        <section aria-label="Our Interior Design Services" className="px-5 sm:px-8 md:px-12 lg:px-20 pb-24">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-12 lg:gap-20">
            {servicesData.map((s: ServiceItem, i: number) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </div>
        </section>

        {/* QUIET TRUST BAR */}
        <section aria-label="Company Statistics" className="px-8 md:px-16 lg:px-24 py-24 bg-white border-t border-[#E8E2DB]">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
            {[
              { val: "14+", label: "Years of practice" },
              { val: "350+", label: "Projects delivered" },
              { val: "200+", label: "Design experts" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-[clamp(32px,5vw,56px)] mb-2" style={{ fontFamily: "Georgia, serif", color: "#2C1810" }}>
                  {s.val}
                </div>
                <div className="text-[11px] font-bold tracking-[0.2em] uppercase" style={{ color: "#C4623A" }}>
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