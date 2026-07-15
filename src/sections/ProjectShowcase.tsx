"use client";

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Assuming you are using react-router
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

const projects = [
  {
    id: 1,
    title: "ForestEdge",
    categories: "Luxury Residential, Interior Design",
    image: "/projectsImg/forest-edge/fe-img1.webp", 
  },
  {
    id: 2,
    title: "Rajapushpa Project",
    categories: "Premium Apartment, Styling",
    image: "/projectsImg/rajapushpa/rp-img1.webp",
  },
  {
    id: 3,
    title: "Vara Prasad Bachupally",
    categories: "Residentail Interiors",
    image: "/projectsImg/varaprasad/vp-img1.png",
  },
  {
    id: 4,
    title: "Etna By Phoenix",
    categories: "Premium Apartment, Styling",
    image: "/projectsImg/etna/sr-img1.webp",
  },
];

export const ProjectShowcase: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // 1. Smooth Scrolling Setup
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const rafCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // 2. GSAP Animation Setup
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length === 0) return;

      // INITIAL STATES: 
      // Card 0 starts in the middle, full size.
      gsap.set(cards[0], { yPercent: 0, scale: 1, opacity: 1 });
      
      // All other cards start below the screen, scaled down.
      gsap.set(cards.slice(1), { yPercent: 120, scale: 0.5, opacity: 0 });

      // Create the main pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: `+=${projects.length * 100}%`, 
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      // Animate the transitions
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          const nextCard = cards[i + 1];
          const syncLabel = `transition-${i}`;

          // Add a slight pause/hold in the center so the user can actually see it
          tl.to({}, { duration: 0.3 });

          // CURRENT CARD EXIT: Moves UP, shrinks, and fades out
          tl.to(
            card,
            {
              yPercent: -120,
              scale: 0.5,
              opacity: 0,
              duration: 1,
              ease: "power2.inOut",
            },
            syncLabel 
          );

          // NEXT CARD ENTER: Moves UP from bottom, grows to normal size, and fades in
          tl.to(
            nextCard,
            {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              duration: 1,
              ease: "power2.inOut",
            },
            syncLabel
          );
        }
      });
      
      // Add a final pause at the end so the last image stays on screen before unpinning
      tl.to({}, { duration: 0.3 });

    }, containerRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[100dvh] bg-[#f7f4ee] overflow-hidden flex items-center justify-center"
    >
      {projects.map((project, index) => (
        <div
          key={project.id}
          ref={(el) => { cardsRef.current[index] = el; }}
          className="absolute inset-0 w-full h-full flex flex-col items-center justify-center will-change-transform pointer-events-none"
        >
          {/* Text Content */}
          <div className="text-center mb-8 z-10 px-4">
            <h2 className="text-[#4a1c13] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight cooper-light mb-3">
              {project.title}
            </h2>
            <p className="text-[#ff7043] font-medium tracking-[0.2em] uppercase text-xs md:text-sm">
              {project.categories}
            </p>
          </div>

          {/* Image Container */}
          <div className="relative w-[85vw] md:w-[60vw] max-w-[900px] h-[50vh] md:h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#e8e5de] pointer-events-auto">
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(74,28,19,0.05)] pointer-events-none rounded-[2rem] md:rounded-[3rem]" />
          </div>
        </div>
      ))}

      {/* Floating CTA Button */}
      <div className="absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-50">
        <Link 
          to="/portfolio" 
          className="bg-[#ff7043] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg shadow-[#ff7043]/30 transition-all hover:scale-105 hover:bg-[#e65a2d] active:scale-95 flex items-center gap-2"
        >
          View Full Portfolio
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default ProjectShowcase;