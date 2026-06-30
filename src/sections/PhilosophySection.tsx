"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Shortened text, tailored for digital experiences and clean aesthetics
const text = "We shape rooms where negative space meets positive intention. True harmony is the exact amount of what you need.";

const PhilosophySection: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll over the shortened container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const words = text.split(" ");

    return (
        // Reduced from 150vh to 120vh to match the shorter text length
        <section ref={containerRef} className="relative w-full h-[120vh] bg-[#f7f4ee] antialiased">
            
            <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12">
                
                {/* Centered Text Block */}
                <p className="w-full max-w-[900px] text-[#4a1c13] font-primary text-[clamp(32px,5vw,64px)] leading-[1.2] tracking-tight flex flex-wrap justify-center text-center">
                    {words.map((word, i) => {
                        const start = i / words.length;
                        const end = start + (1 / words.length);
                        
                        return (
                            <Word key={i} progress={scrollYProgress} range={[start, end]}>
                                {word}
                            </Word>
                        );
                    })}
                </p>

                

            </div>
        </section>
    );
};

// Updated Interface with MotionValue<number> instead of any
interface WordProps {
    children: React.ReactNode;
    progress: MotionValue<number>;
    range: [number, number];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
    const opacity = useTransform(progress, range, [0.15, 1]);
    
    return (
        
        <span className="relative mx-[1vw] md:mx-[0.6vw] mt-2">
            <span className="absolute opacity-15">{children}</span>
            <motion.span style={{ opacity }}>
                {children}
            </motion.span>
        </span>
    );
};

export default PhilosophySection;