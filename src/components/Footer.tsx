"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
];

export default function CardFooter() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-50px" });
    // const currentYear = new Date().getFullYear();

    return (
        <footer
            ref={containerRef}
            className="bg-[#f7f4ee] px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-12 md:pt-24 flex flex-col gap-4 md:gap-6 max-w-[1600px] mx-auto antialiased"
        >
            <motion.section
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, ease: smoothEase }}
                // Responsive padding: Reduced for mobile (py-10/px-6)
                className="relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-[#4A1C13] px-6 py-10 md:px-16 lg:px-24"
            >
                {/* Background Glows (Slightly smaller on mobile) */}
                <div className="absolute -top-20 -right-10 h-64 w-64 rounded-full bg-[#ff7043]/10 blur-[80px]" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

                    {/* Left Section */}
                    <div className="max-w-xl text-center lg:text-left">
                        <span className="uppercase tracking-[0.2em] text-[#ff8c63] text-[10px] md:text-xs font-semibold">
                            Let's Build Something Beautiful
                        </span>
                        <h2 className="mt-4 font-primary text-[clamp(32px,8vw,76px)] leading-[1] text-[#F8F5F1]">
                            Spaces that tell
                            <br />
                            <span className="italic text-[#ff8c63]">your story.</span>
                        </h2>
                        <p className="mt-6 text-white/70 leading-7 text-sm md:text-base max-w-md mx-auto lg:mx-0">
                            Every exceptional interior starts with a conversation. Let's turn your vision into timeless architecture.
                        </p>
                    </div>

                    {/* Right Card (Fixed width for mobile) */}
                    <div className="w-full max-w-xs md:max-w-sm">
                        <div className="rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8">
                            <h4 className="text-white text-lg md:text-xl font-primary">
                                Book a Free Consultation
                            </h4>
                            <p className="mt-2 text-white/60 text-xs md:text-sm leading-6">
                                Speak directly with our experts and receive personalized guidance.
                            </p>

                            <a
                                href="tel:+918978222980"
                                className="group mt-6 flex items-center justify-between rounded-full bg-[#ff7043] px-5 py-4 transition-all duration-500 hover:bg-[#ff8a63] text-sm"
                            >
                                <span className="font-medium text-white truncate px-2">
                                    +91 89782 22980
                                </span>
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4A1C13] transition-transform duration-500 group-hover:translate-x-1">
                                    →
                                </div>
                            </a>

                            <div className="mt-6 flex items-center justify-center lg:justify-start gap-2 text-white/40 text-[10px] md:text-xs">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-400" />
                                Available Mon – Sat · 9 AM – 7 PM
                            </div>
                        </div>
                    </div>

                </div>
            </motion.section>

            {/* ======================= */}
            {/* FOOTER CARD             */}
            {/* ======================= */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: smoothEase, delay: 0.15 }}
                className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-[#4a1c13]/5 shadow-sm flex flex-col justify-between gap-16 md:gap-24"
            >

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

                    {/* Brand Identity & Description */}
                    <div className="md:col-span-5 flex flex-col justify-between">
                        <div>
                            {/* Replace the src with your actual logo path */}
                            <div className="mb-6 flex items-center">
                                <img
                                    src="/bright-logo.webp"
                                    alt="Bright Arena Logo"
                                    // Increased from h-10 to h-16 (mobile) and md:h-20 (desktop)
                                    className="h-20 md:h-28 w-auto object-cover"
                                />
                            </div>

                            <p className="text-[#4a1c13]/70 text-sm leading-relaxed max-w-sm">
                                Bright Arena offers the best interior design services in Hyderabad that reflect your unique style, beauty, and comfort in luxury. We specialize in crafting the best home interior design, commercial design, and office interior design.
                            </p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-2 md:col-start-7">
                        <h4 className="text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-[#4a1c13] font-medium hover:text-[#ff7043] transition-colors duration-300"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="md:col-span-4">
                        <h4 className="text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-6">Our Address</h4>
                        <address className="not-italic text-sm text-[#4a1c13] space-y-2 font-medium max-w-[250px]">
                            <p className="leading-relaxed">
                                4th Floor, 23 Nordwest, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500081
                            </p>

                            <div className="pt-4">
                                <a href="tel:+918978222980" className="flex items-center gap-2 hover:text-[#ff7043] transition-colors font-bold text-lg">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    +91-8978222980
                                </a>
                            </div>
                        </address>
                    </div>

                </div>
{/* Bottom Section: Copyright, Policy & Credits */}
                <div className="flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 pt-8 border-t border-[#4a1c13]/10 text-[#4a1c13]/50 text-[11px] md:text-xs tracking-wider font-medium text-center">
                    <p>
                        &copy; {new Date().getFullYear()} Bright Arena. All rights reserved.
                    </p>
                    
                    <span className="hidden md:block w-px h-3 bg-[#4a1c13]/20"></span>
                    
                    <a href="/privacy-policy" className="hover:text-[#ff7043] transition-colors duration-300">
                        Privacy Policy
                    </a>
                    
                    <span className="hidden md:block w-px h-3 bg-[#4a1c13]/20"></span>
                    
                    <p>
                        Designed and built by{" "}
                        <a 
                            href="https://thecontentgang.com" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[#4a1c13]/80 hover:text-[#ff7043] hover:underline underline-offset-4 transition-colors duration-300"
                        >
                            thecontentgang.com
                        </a>
                    </p>
                </div>

            </motion.div>
        </footer>
    );
}