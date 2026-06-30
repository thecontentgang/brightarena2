"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─── SERVICES DATA ─── */
const services = [
  {
    title: "Home Interiors",
    description:
      "We design homes around the way you actually live — your morning light, your evening rituals, the corner you always return to. Every material and every fixture is chosen to make your space feel effortlessly, unmistakably yours.",
    scope: ["Full-home & apartment design", "Kitchen & wardrobe design", "Lighting & material selection", "Vastu-compliant layouts on request"],
    detail: "Starting from ₹8L · 45–90 day delivery",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "2D & 3D Visualisation",
    description:
      "Every decision — proportion, material, light — made with full visual confidence before a single wall is touched. We produce precise floor plans alongside photorealistic 3D walkthroughs so there are no surprises at handover.",
    scope: ["AutoCAD & Revit floor plans", "Photorealistic 3D renders", "Virtual space walkthroughs", "Furniture & lighting simulation"],
    detail: "Standalone or bundled · 7-day turnaround",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Commercial Spaces",
    description:
      "A well-designed office or retail environment is a business tool, not decoration. We embed your brand identity into every surface — shaping first impressions, guiding customer behaviour, and making your space work as hard as you do.",
    scope: ["Offices & co-working spaces", "Retail & flagship stores", "Restaurants & hospitality", "Brand-coherent spatial strategy"],
    detail: "Custom quote · Timeline varies by scope",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    title: "Bespoke Furniture",
    description:
      "Conceived in-house, crafted by hand. Each piece is drawn from scratch around your exact dimensions, your materials, and the specific role it plays in the room — not adapted from a catalogue, but built for one space and one space only.",
    scope: ["Solid wood & veneer joinery", "Upholstered seating design", "Statement shelving & cabinetry", "Metal & glass accent pieces"],
    detail: "Per-piece pricing · 3–6 week craft time",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1400&auto=format&fit=crop",
  },
];

/* ─── SERVICE ROW ─── */
function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="border-t border-[#E8E2DB]">
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
            src={service.image}
            alt={service.title}
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

          <h2 className="text-[clamp(26px,3.5vw,42px)] leading-tight mb-5" style={{ fontFamily: "Georgia, serif", color: "#2C1810" }}>
            {service.title}
          </h2>

          <p className="text-[15px] leading-[1.8] mb-8" style={{ color: "#6B5C57" }}>
            {service.description}
          </p>

          <div className="mb-8">
            <p className="text-[11px] tracking-[0.2em] uppercase font-medium mb-3" style={{ color: "#8A7570" }}>
              What's included
            </p>
            <ul className="space-y-2">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[14px]" style={{ color: "#4A3630" }}>
                  <span className="mt-[7px] w-[5px] h-[1px] shrink-0 bg-[#C4623A]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-6 flex-wrap">
            <span className="text-[12px] tracking-wide" style={{ color: "#8A7570" }}>
              {service.detail}
            </span>
            <a
              href="/contact"
              className="text-[11px] font-semibold tracking-[0.18em] uppercase border-b pb-px transition-all duration-300 hover:tracking-[0.25em]"
              style={{ color: "#C4623A", borderColor: "#C4623A" }}
            >
              Enquire →
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
    <div style={{ background: "#F9F7F3", color: "#2C1810" }} className="overflow-x-hidden">

      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24">
  <motion.div
    className="w-full max-w-5xl text-center"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
  >
    <p
      className="text-[11px] tracking-[0.3em] uppercase font-medium mb-7"
      style={{ color: "#8A7570" }}
    >
      Bright Arena Interiors · Services
    </p>

    <h1
      className="text-[clamp(40px,7vw,88px)] leading-[0.95] mb-8 font-primary"
      
    >
      Four ways we <br />
      <span style={{ color: "#C4623A", fontStyle: "italic" }}>
        transform
      </span>{" "}
      a space.
    </h1>

    <p
      className="max-w-2xl mx-auto text-[16px] leading-[1.8]"
      style={{ color: "#6B5C57" }}
    >
      Whether it's a single room or an entire commercial floor, every
      engagement follows the same standard — full attention, no shortcuts,
      and a handover you'll be proud to walk into.
    </p>
  </motion.div>
</section>

      {/* SERVICE ROWS */}
      <section>
        {services.map((s, i) => (
          <ServiceRow key={s.title} service={s} index={i} />
        ))}
        <div className="border-t border-[#E8E2DB]" />
      </section>

      {/* QUIET TRUST BAR */}
      <section className="px-8 md:px-16 lg:px-24 py-20 border-t border-[#E8E2DB]">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { val: "14+", label: "Years of practice" },
            { val: "500+", label: "Projects delivered" },
            { val: "200+", label: "Design experts" },
            { val: "0", label: "Missed handovers" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="text-[clamp(28px,4vw,48px)] mb-1"
                style={{ fontFamily: "Georgia, serif", color: "#C4623A" }}
              >
                {s.val}
              </div>
              <div className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "#8A7570" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}