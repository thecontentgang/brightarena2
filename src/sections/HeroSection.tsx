"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";

// Premium Apple-like easing curve for fluid, expensive-feeling motion
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MinimalHero: React.FC = () => {
    // 1. Reference for the scroll track
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Dynamic Gap Logic to match Navbar (px-5 / md:px-10) ---
    // Desktop: px-10 is 40px per side = 80px total. 
    // Mobile: px-5 is 20px per side = 40px total.
    const [horizontalGap, setHorizontalGap] = useState("80px");

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setHorizontalGap("40px");
            } else {
                setHorizontalGap("80px");
            }
        };

        handleResize(); // Set on initial load
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 2. Track the scroll progress within the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // 3. Add a spring to smooth out the scroll scrubbing slightly
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 20,
        mass: 0.5,
    });

    // 4. Map scroll progress (0 to 0.33) to various CSS properties
    // We start at the calculated exact gap to match the navbar, and expand to 100%
    const videoWidth = useTransform(smoothProgress, [0, 0.33], [`calc(100% - ${horizontalGap})`, "calc(100% - 0px)"]);
    const videoHeight = useTransform(smoothProgress, [0, 0.33], ["58vh", "100vh"]);
    const videoBR = useTransform(smoothProgress, [0, 0.33], ["24px", "0px"]);
    const videoBottom = useTransform(smoothProgress, [0, 0.33], ["24px", "0px"]);

    // Fade out and move text up as video expands
    const textOpacity = useTransform(smoothProgress, [0, 0.25], [1, 0]);
    const textY = useTransform(smoothProgress, [0, 0.25], ["0%", "-50%"]);
    const navigate = useNavigate();

    return (
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#f7f4ee] antialiased">
            
            {/* Pinned Viewport Container */}
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start overflow-hidden">
                 
                {/* Heading Area */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    // CHANGED HERE: h-[32vh] on mobile, pt-28 to clear header, items-start on mobile vs md:items-end
                    className="w-full h-[32vh] md:h-[40vh] flex items-start md:items-end justify-center md:justify-start pt-28 md:pt-0 px-4 md:px-12 pb-4 z-0"
                >
                    <div className="overflow-hidden flex justify-center md:justify-start">
                        <motion.h1
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: "0%" }}
                            transition={{ duration: 1.2, ease: smoothEase, delay: 0.2 }}
                            className="text-[#4a1c13] font-primary text-[clamp(48px,7vw,120px)] leading-[1.1] tracking-tight whitespace-normal md:whitespace-nowrap text-center md:text-left"
                        >
                            Live <span className="text-[#ffc107]">Beautifully</span> Every Day
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Video Area */}
                <motion.div
                    style={{
                        width: videoWidth,
                        height: videoHeight,
                        borderRadius: videoBR,
                        bottom: videoBottom,
                    }}
                    // ADDED: x: "-50%" to keep the container anchored exactly in the middle
                    initial={{ opacity: 0, y: 50, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, x: "-50%" }}
                    transition={{ duration: 1.2, ease: smoothEase, delay: 0.4 }}
                    // ADDED: left-1/2 to anchor the absolute position to the center
                    className="absolute left-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10"
                >
                    <motion.video
                        initial={{ scale: 1.25 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2.5, ease: smoothEase, delay: 0.5 }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                    >
                        <source
                            src="/bright-hero-video.mp4"
                            type="video/mp4"
                        />
                    </motion.video>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                   {/* Stats & Buttons Inner Container */}
                   <motion.div
                        // ADDED x: "-50%" so the inner stats stay perfectly centered inside the video
                        initial={{ opacity: 0, y: 40, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        transition={{ duration: 1.2, ease: smoothEase, delay: 1.2 }}
                        // Added `left-1/2` to center this absolute element perfectly
                        className="absolute bottom-6 md:bottom-10 left-1/2 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-6 md:px-10 rounded-2xl z-20 w-[calc(100%-40px)] md:w-auto"
                    >
                        <div className="flex items-center gap-8 md:gap-10">
                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-white text-2xl md:text-3xl font-bold">13+</span>
                                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
                                    Projects
                                </span>
                            </div>

                            <div className="w-px h-10 bg-white/20" />

                            <div className="flex flex-col items-center md:items-start">
                                <span className="text-white text-2xl md:text-3xl font-bold">05+</span>
                                <span className="text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">
                                    Years Exp.
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <motion.button
                                onClick={() => navigate("/portfolio")}
                                whileHover={{
                                    scale: 1.05,
                                    backgroundColor: "#ffc107",
                                    color: "#4a1c13",
                                }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto bg-[#ff7043] text-white px-7 py-3.5 md:py-4 rounded-2xl text-xs font-bold tracking-widest uppercase"
                            >
                                View Projects
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="w-full md:w-auto bg-white/5 border border-white/30 text-white px-7 py-3.5 md:py-4 rounded-2xl text-xs font-bold tracking-widest uppercase"
                            >
                                Talk Now
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default MinimalHero;