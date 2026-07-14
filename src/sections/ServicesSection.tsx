"use client";

import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Home Interiors",
    slug: "home-interior-design",
    description: "Curated, minimalist living spaces tailored to your daily rhythms. We bring your vision of home to life with precision.",
    image: "/projectsImg/my-home-bhooja/MHB-img8.jpg",
  },
  {
    id: "02",
    title: "Commercial Spaces",
    slug: "commercial-interior-design",
    description: "Photorealistic rendering and precise spatial planning designed to elevate customer experiences and brand identity.",
    image: "/projectsImg/rajapushpa/RP-img38.jpg",
  },
  {
    id: "03",
    title: "Office Environments",
    slug: "office-interior-design",
    description: "High-end corporate environments that foster productivity, well-being, and modern collaboration.",
    image: "/office.jpg",
  },
  {
    id: "04",
    title: "Virtual Design",
    slug: "2d-3d-virtual-design",
    description: "Custom-crafted architectural layouts and 3D walkthroughs so you can experience your space before it's built.",
    image: "/virtual.jpg",
  },
];

const HorizontalServices: React.FC = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;

      // Total horizontal distance the track needs to travel:
      // track scrollWidth - viewport width = how far left it must shift
      // so the last card ends flush with the right edge.
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        return -(trackWidth - window.innerWidth);
      };

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${Math.abs(getScrollAmount())}`, // pin lasts exactly as long as the horizontal travel needs
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true, // recalculates getScrollAmount() on resize
          // markers: true, // uncomment while tuning
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen bg-[#f7f4ee] antialiased overflow-hidden"
    >
      {/* Pinned Viewport */}
      <div className="h-screen flex flex-col justify-center overflow-hidden py-6 md:py-12">

        {/* Section Header */}
        <div className="shrink-0 w-full px-4 pb-4 md:pb-6 text-center z-20">
          <h2 className="text-[#4a1c13] font-primary text-[clamp(32px,5vw,72px)] leading-[1.05] tracking-tight">
            We Do What{" "}
            <span className="text-[#ff7043] font-primary">We Know</span>
          </h2>
        </div>

        {/* The Moving Track */}
        <div className="relative w-full flex-1 min-h-0 max-h-[460px] md:max-h-[640px] overflow-hidden">
          <div
            ref={trackRef}
            className="flex h-full items-start will-change-transform"
            style={{ width: `${services.length * 100}vw` }}
          >
            {services.map((service) => (
              <div
                key={service.id}
                className="w-screen h-full flex justify-center px-4 md:px-8"
              >
                <div
                  className="
                    relative
                    w-full
                    max-w-[1400px]
                    h-full
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

                  {/* Gradient */}
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default HorizontalServices;