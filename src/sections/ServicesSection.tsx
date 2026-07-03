"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";

const services = [
  {
    id: "01",
    title: "Home Interiors",
    slug: "home-interior-design",
    description: "Curated, minimalist living spaces tailored to your daily rhythms. We bring your vision of home to life with precision.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Commercial Spaces",
    slug: "commercial-interior-design",
    description: "Photorealistic rendering and precise spatial planning designed to elevate customer experiences and brand identity.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Office Environments",
    slug: "office-interior-design",
    description: "High-end corporate environments that foster productivity, well-being, and modern collaboration.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Virtual Design",
    slug: "2d-3d-virtual-design",
    description: "Custom-crafted architectural layouts and 3D walkthroughs so you can experience your space before it's built.",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1600&auto=format&fit=crop",
  },
];

const HorizontalServices: React.FC = () => {
  const navigate = useNavigate();
  const targetRef = useRef<HTMLDivElement>(null);

  // Track scroll progress of the 400vh section
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Updated Spring physics for a more cinematic, fluid glide
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    mass: 0.5,
  });

  // 4 items = 400vw total width.
  // 300vw is exactly 75% of 400vw.
  const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#f7f4ee] antialiased">

      {/* The Sticky Viewport — header sits in normal flow so it always reserves
          its own space and can never overlap the cards, at any viewport height */}
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">

        {/* Section Header */}
        {/* Section Header */}
<div className="shrink-0 w-full px-4 pt-8 pb-2 sm:pt-10 sm:pb-3 md:pt-16 md:pb-10 text-center z-20">
  <h2 className="text-[#4a1c13] font-primary text-[clamp(32px,5vw,72px)] leading-[1.05] tracking-tight">
    We Do What{" "}
    <span className="text-[#ff7043] font-primary">
      We Know
    </span>
  </h2>
</div>
        {/* The Moving Track — takes up the remaining space below the header
            and centers each card vertically within it */}
        <div className="relative flex-1 min-h-0 overflow-hidden">
          <motion.div style={{ x }} className="flex w-[400vw] h-full items-center">
            {services.map((service) => (
             
              <div key={service.id} className="w-[100vw] h-full flex items-center justify-center px-4 md:px-8 pb-6 md:pb-10">

                {/* Massive Card Layout — sized relative to the track's own
                    height, so it always fits cleanly beneath the header */}
                <div
  className="
    relative
    w-full
    max-w-[1400px]
    h-[420px]
    sm:h-[460px]
    md:h-full
    md:max-h-[640px]
    bg-[#2a110b]
    rounded-[2rem]
    md:rounded-[3rem]
    overflow-hidden
    group
    shadow-2xl
  "
>

                  {/* Background Image */}
                  <img
                    src={service.image}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />

                  {/* Heavier Gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-80" />

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
                    <div className="flex-1 max-w-2xl">
                      <span className="inline-block text-[#ff7043] text-lg md:text-xl font-bold tracking-[0.2em] mb-4 bg-black/30 px-4 py-1 rounded-full backdrop-blur-sm border border-white/10">
                        {service.id}
                      </span>
                      <h3 className="text-white text-4xl md:text-7xl font-medium tracking-tight mt-2 mb-4 md:mb-6 drop-shadow-lg">
                        {service.title}
                      </h3>
                      <p className="text-white/80 text-sm md:text-lg leading-relaxed md:leading-loose">
                        {service.description}
                      </p>
                    </div>

                    <button
                      className="shrink-0 w-fit h-fit bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#ff7043] hover:border-[#ff7043] hover:shadow-[0_0_30px_rgba(255,112,67,0.4)]"
                      onClick={() => navigate(`/services/${service.slug}`)}
                    >
                      Explore Service
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalServices;