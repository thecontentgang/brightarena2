"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ProjectModal from "../components/ProjectModal";

// Premium Apple-like easing curve for fluid, expensive-feeling motion
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const MinimalHero: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // --- Dynamic Gap Logic to match Navbar (px-5 / md:px-10) ---
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

    // 4. REVERSED: Map scroll progress (0 to 0.33) to shrink the video
    const videoWidth = useTransform(smoothProgress, [0, 0.33], ["100%", `calc(100% - ${horizontalGap})`]);
    const videoHeight = useTransform(smoothProgress, [0, 0.33], ["100vh", "60vh"]);
    const videoBR = useTransform(smoothProgress, [0, 0.33], ["0px", "32px"]);
    const videoBottom = useTransform(smoothProgress, [0, 0.33], ["0px", "32px"]);

    // 5. TEXT REVEAL: Text fades IN and slides UP as the video moves out of the way
    const textOpacity = useTransform(smoothProgress, [0.1, 0.33], [0, 1]);
    const textY = useTransform(smoothProgress, [0.1, 0.33], ["40px", "0px"]);
    
    const navigate = useNavigate();

    return (
        <>
        <section ref={containerRef} className="relative w-full h-[300vh] bg-[#f7f4ee] antialiased">
            
            {/* Pinned Viewport Container */}
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-start overflow-hidden">
                 
                {/* Heading Area (Behind the video initially) */}
                <motion.div
                    style={{ opacity: textOpacity, y: textY }}
                    className="w-full h-[40vh] flex flex-col items-center justify-center pt-20 px-4 md:px-8 z-0"
                >
                    <div className="overflow-hidden flex justify-center w-full">
                        <motion.h1
                            className="text-[#4a1c13] font-primary text-[clamp(48px,8vw,80px)] lg:text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight text-center whitespace-normal lg:whitespace-nowrap mx-auto"
                        >
                            Live <span className="text-[#ffc107]">Beautifully</span>
                            <br className="block lg:hidden" />
                            <span className="hidden lg:inline"> </span>
                            Every Day
                        </motion.h1>
                    </div>
                </motion.div>

                {/* Video Area (Starts Full Screen, z-10 puts it above the text) */}
                <motion.div
                    style={{
                        width: videoWidth,
                        height: videoHeight,
                        borderRadius: videoBR,
                        bottom: videoBottom,
                    }}
                    // Note: Removed 'y' from initial/animate so it doesn't conflict with the scroll bottom calculation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.2, ease: smoothEase }}
                    className="absolute left-1/2 -translate-x-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10 shadow-2xl"
                >
                    {/* The Video Element */}
                    <motion.video
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 2.5, ease: smoothEase }}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover opacity-90"
                    >
                        <source src="/bright-hero-video.mp4" type="video/mp4" />
                    </motion.video>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                   {/* Stats & Buttons Inner Container */}
                  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1.2, ease: smoothEase, delay: 0.8 }}
    // 1. Reduced mobile padding (py-4 px-4) and gap (gap-4) to make it tighter
    className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-4 px-4 md:py-5 md:px-10 rounded-[1.25rem] md:rounded-2xl z-20 w-[calc(100%-32px)] sm:w-[calc(100%-40px)] md:w-auto shadow-2xl"
>
    {/* Stats Row */}
    <div className="flex items-center justify-center gap-6 md:gap-10 w-full md:w-auto">
        <div className="flex flex-col items-center md:items-start">
            {/* 2. Scaled down numbers slightly on mobile (text-xl to text-3xl) */}
            <span className="text-white text-xl md:text-3xl font-bold">13+</span>
            <span className="text-white/70 text-[9px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">
                Projects
            </span>
        </div>

        {/* 3. Slightly shorter divider on mobile */}
        <div className="w-px h-8 md:h-10 bg-white/20" />

        <div className="flex flex-col items-center md:items-start">
            <span className="text-white text-xl md:text-3xl font-bold">05+</span>
            <span className="text-white/70 text-[9px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1">
                Years Exp.
            </span>
        </div>
    </div>

    {/* Buttons Row */}
    {/* 4. Tighter gap between buttons on mobile */}
    <div className="flex items-center justify-center gap-2 md:gap-3 w-full md:w-auto">
        <motion.button
            onClick={() => navigate("/portfolio")}
            whileHover={{
                scale: 1.05,
                backgroundColor: "#ffc107",
                color: "#4a1c13",
            }}
            whileTap={{ scale: 0.95 }}
            // 5. Added `flex-1` so buttons split width 50/50 on mobile, reduced px/py and text size
            className="flex-1 md:flex-none w-full md:w-auto bg-[#ff7043] text-white px-2 py-3 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold tracking-widest uppercase shadow-lg text-center whitespace-nowrap"
        >
            View Projects
        </motion.button>

        <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="flex-1 md:flex-none w-full md:w-auto bg-white/5 border border-white/30 text-white px-2 py-3 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-bold tracking-widest uppercase text-center whitespace-nowrap"
        >
            Talk Now
        </motion.button>
    </div>
</motion.div>
                </motion.div>
            </div>
        </section>
        <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
        </>
    );
};

export default MinimalHero;