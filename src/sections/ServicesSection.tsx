"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const services = [
    {
        id: "01",
        title: "Home Interiors",
        description: "Curated, minimalist living spaces tailored to your daily rhythms. We blend aesthetics with absolute functionality.",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "02",
        title: "2D & 3D Services",
        description: "Photorealistic rendering and precise spatial planning. See your space in vivid detail before a single wall is touched.",
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "03",
        title: "Commercial Spaces",
        description: "High-end retail and office environments designed to elevate your brand identity and optimize workflow.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
    },
    {
        id: "04",
        title: "Bespoke Furniture",
        description: "Custom-crafted, architectural furniture pieces that serve as the focal point of your minimalist sanctuary.",
        image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1600&auto=format&fit=crop",
    },
];

const HorizontalServices: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);

    // Track scroll progress of the 400vh section
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Spring physics for premium Apple-like fluidity
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 25,
        mass: 0.2,
    });

    // 4 items = 400vw total width.
    // To show the 4th item (which starts at 300vw), we must move left by exactly 300vw.
    // 300vw is exactly 75% of 400vw.
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[400vh] bg-[#f7f4ee] antialiased">
            
            {/* The Sticky Viewport */}
            <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                
                {/* Centered Section Header */}
                <div className="absolute top-28 md:top-20 left-1/2 -translate-x-1/2 w-full px-4 text-center z-20 pointer-events-none">
                    <h2 className="text-[#4a1c13] font-primary text-[clamp(32px,5vw,64px)] leading-none tracking-tight">
                        We Do What <span className="text-[#ff7043]">We Know</span>
                    </h2>
                    
                </div>

                {/* The Moving Track */}
                <motion.div style={{ x }} className="flex w-[400vw] h-full items-center pt-20 md:pt-24">
                    {services.map((service) => (
                        // Each card container is exactly 100vw and uses flex to center the card inside it
                        <div key={service.id} className="w-[100vw] flex items-center justify-center px-4 md:px-12">
                            
                            {/* Card - Height reduced for better mobile/desktop fit */}
                            <div className="relative w-full max-w-[1000px] h-[55vh] md:h-[60vh] bg-[#4a1c13] rounded-3xl overflow-hidden group">
                                
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="absolute inset-0 w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                                />
                                
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                                    <div className="flex-1">
                                        <span className="text-[#ff7043] text-sm md:text-base font-bold tracking-[0.2em]">
                                            {service.id}
                                        </span>
                                        <h3 className="text-white text-3xl md:text-5xl font-medium tracking-tight mt-2 mb-3 md:mb-4">
                                            {service.title}
                                        </h3>
                                        <p className="text-white/70 max-w-md text-xs md:text-sm leading-relaxed">
                                            {service.description}
                                        </p>
                                    </div>
                                    
                                    <button className="w-fit h-fit bg-white text-[#4a1c13] px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#ff7043] hover:text-white">
                                        Explore
                                    </button>
                                </div>
                                
                            </div>
                        </div>
                    ))}
                </motion.div>
                
            </div>
        </section>
    );
};

export default HorizontalServices;