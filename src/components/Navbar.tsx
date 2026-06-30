"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

// Array of objects for exact routing paths
const navItems = [
  { name: "Services", path: "/services" },
  { name: "Portfolio", path: "/portfolio" },
  { name: "Designs", path: "/designs" },
  { name: "About", path: "/about" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" }
];

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const Header: React.FC = () => {
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // State to track which link is currently being hovered for the sliding underline
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- Link Animation Variants ---
  const desktopLinkVariants: Variants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1, y: 0, filter: "blur(0px)",
      transition: { duration: 0.6, ease: smoothEase, delay: 0.15 + i * 0.05 },
    }),
    exit: { opacity: 0, y: -5, filter: "blur(2px)", transition: { duration: 0.2 } },
  };

  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, x: -10, filter: "blur(4px)" },
    visible: (i: number) => ({
      opacity: 1, x: 0, filter: "blur(0px)",
      transition: { duration: 0.5, ease: smoothEase, delay: 0.1 + i * 0.05 },
    }),
    exit: { opacity: 0, x: -5, filter: "blur(2px)", transition: { duration: 0.2 } },
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-start justify-between px-5 py-5 md:px-10 pointer-events-none antialiased">
      
      {/* ========================================= */}
      {/* LEFT SIDE: LOGO                           */}
      {/* ========================================= */}
      <motion.div
        className="pointer-events-auto flex items-center cursor-pointer"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        <Link to="/" className="h-24 md:h-24 w-auto overflow-hidden -mt-3.5 block">
          <img
            src="/bright-arena-logo.webp"
            alt="Bright Arena Logo"
            className="h-full w-auto object-cover"
          />
        </Link>
      </motion.div>

      {/* ========================================= */}
      {/* RIGHT SIDE: DESKTOP NAVIGATION (Hover)    */}
      {/* ========================================= */}
      <div 
        className="pointer-events-auto hidden md:flex justify-end font-secondary p-4 -mr-4"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => {
          setIsDesktopExpanded(false);
          setHoveredIndex(null);
        }}
      >
        <motion.nav
          layout
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center h-[52px] bg-[#f7f4ee] p-[6px] rounded-[1rem] shadow-sm border border-gray-200/60 cursor-pointer overflow-hidden origin-right"
        >
          <AnimatePresence mode="wait">
            {isDesktopExpanded ? (
              <motion.div
                key="expanded"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "auto", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="flex items-center overflow-hidden"
              >
                <div className="flex items-center space-x-2 px-6 py-1 whitespace-nowrap relative">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={desktopLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseEnter={() => setHoveredIndex(i)}
                      className="relative"
                    >
                      <Link
                        to={item.path}
                        className="text-[#4a1c13] text-[15px] font-medium tracking-wide relative z-10 px-4 py-2 block transition-colors duration-300 hover:text-[#ff7043]"
                      >
                        {item.name}
                      </Link>
                      
                      {/* Sliding Underline Animation */}
                      {hoveredIndex === i && (
                        <motion.div
                          layoutId="desktop-nav-underline"
                          className="absolute bottom-1 left-4 right-4 h-[2px] bg-[#ff7043]"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, ease: smoothEase }}
                className="px-5 flex items-center justify-center text-[#4a1c13] hover:text-[#ff7043] transition-colors duration-300 group"
              >
                <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
                  <motion.line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="transition-all duration-300 group-hover:translate-x-[2px]" />
                  <motion.line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="transition-all duration-300 group-hover:w-full group-hover:translate-x-[-2px]" />
                  <motion.line x1="0" y1="13" x2="18" y2="13" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" className="transition-all duration-300 group-hover:translate-x-[1px]" />
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          <Link to="/contact" className="h-full ml-2">
            <motion.button
              layout
              whileHover={{ backgroundColor: "#ffc107", color: "#4a1c13" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="bg-[#ff7043] text-white px-7 h-full rounded-[1rem] text-[14px] font-semibold tracking-wide relative z-10 flex items-center justify-center"
            >
              Talk Now
            </motion.button>
          </Link>
        </motion.nav>
      </div>

      {/* ========================================= */}
      {/* RIGHT SIDE: MOBILE NAVIGATION (Click)     */}
      {/* ========================================= */}
      <div className="pointer-events-auto flex md:hidden justify-end">
        <motion.nav
          layout
          animate={{ width: isMobileOpen ? 240 : "auto" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col bg-[#f7f4ee] p-[6px] rounded-[1rem] shadow-sm border border-gray-200/60 overflow-hidden origin-top-right relative z-50"
        >
          {/* Top Row: Always visible (Matches Desktop Collapsed State) */}
          <motion.div layout className="flex items-center justify-between w-full h-[40px]">
            {/* Morphing Hamburger/Close Button */}
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="px-5 h-full flex items-center justify-center text-[#4a1c13]"
            >
              <div className="w-5 h-[14px] flex flex-col justify-between relative">
                <motion.span 
                  animate={isMobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="w-full h-[1.75px] bg-current rounded-full origin-center"
                />
                <motion.span 
                  animate={isMobileOpen ? { opacity: 0, x: -5 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, ease: smoothEase }}
                  className="w-[70%] h-[1.75px] bg-current rounded-full ml-auto"
                />
                <motion.span 
                  animate={isMobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="w-full h-[1.75px] bg-current rounded-full origin-center"
                />
              </div>
            </button>

            {/* Talk Now Button */}
            <Link to="/contact">
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                className="bg-[#ff7043] text-white px-6 h-full rounded-[1rem] text-[13px] font-semibold tracking-wide flex items-center justify-center flex-shrink-0"
              >
                Talk Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Expanded Content: Links & Socials */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                className="flex flex-col px-6 pt-6 pb-4 w-full"
              >
                <div className="flex flex-col space-y-4 mb-8">
                  {navItems.map((item, i) => (
                    <motion.div
                      key={item.name}
                      custom={i}
                      variants={mobileLinkVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileOpen(false)}
                        className="text-[#4a1c13] text-[18px] font-medium tracking-wide block hover:text-[#ff7043] transition-colors duration-300"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Divider */}
                <motion.div 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="w-full h-[1px] bg-[#4a1c13]/10 mb-4" 
                />

                {/* Social Icons */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5, ease: smoothEase }}
                  className="flex items-center space-x-5 text-[#4a1c13]"
                >
                  <a href="#" className="hover:text-[#ff7043] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></a>
                  <a href="#" className="hover:text-[#ff7043] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg></a>
                  <a href="#" className="hover:text-[#ff7043] transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

    </header>
  );
};

export default Header;