"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FloatingSocialBar: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      name: "WhatsApp",
      href: "https://wa.me/8978222980", // Replace with your number
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5l-1.4 5.12 5.24-1.37c1.46.8 3.1 1.22 4.76 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.81.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.4c0-4.54 3.7-8.22 8.24-8.22Zm-4.52 4.36c-.16 0-.42.06-.64.31s-.85.83-.85 2.02.87 2.35.99 2.51c.12.16 1.7 2.65 4.21 3.65 2.09.83 2.51.66 2.97.62.46-.04 1.48-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.46-.29-.24-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.12-.17.24-.65.81-.79.98-.15.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.15.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.37-.78-1.87-.2-.5-.41-.43-.56-.44-.14-.01-.31-.01-.47-.01Z" />
        </svg>
      ),
    },
    {
      name: "Call Us",
      href: "tel:+918978222980", // Replace with your number
      color: "hover:bg-[#4a1c13] hover:text-white hover:border-[#4a1c13]",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/brightarenainteriors", // Replace with your link
      color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "https://www.youtube.com/@brightarenainteriors", // Replace with your link
      color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Social Media Pill Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex flex-col items-center gap-2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/50"
      >
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.name}
            className={`relative group flex items-center justify-center w-11 h-11 shrink-0 rounded-full text-[#4a1c13] bg-white border border-[#4a1c13]/10 shadow-sm transition-colors duration-300 ${social.color}`}
          >
            {social.icon}

            {/* Hover Tooltip */}
            <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-[#4a1c13] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              {social.name}
              <span className="absolute right-[-4px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[4px] border-y-transparent border-l-[#4a1c13]" />
            </span>
          </a>
        ))}
      </motion.div>

      {/* Scroll To Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff7043] text-white shadow-lg transition-colors duration-300 hover:bg-[#4a1c13] hover:shadow-xl"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] transition-transform duration-300 group-hover:-translate-y-1">
              <line x1="12" y1="19" x2="12" y2="5" />
              <polyline points="5 12 12 5 19 12" />
            </svg>

            <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-[#4a1c13] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Top
              <span className="absolute right-[-4px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[4px] border-y-transparent border-l-[#4a1c13]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FloatingSocialBar;