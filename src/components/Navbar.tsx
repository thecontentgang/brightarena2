"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants, useScroll, useMotionValueEvent } from "framer-motion";
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
  // Default to true so it's open when they first land on the page
  const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // State to track which link is currently being hovered for the sliding pill
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // --- Scroll Tracking Logic ---
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;

    // 1. If at the very top of the page, always keep it open
    if (latest <= 50) {
      setIsDesktopExpanded(true);
    }
    // 2. If scrolling DOWN (and past the top 50px), collapse it
    else if (latest > previous && latest > 50) {
      setIsDesktopExpanded(false);
    }
    // 3. If scrolling UP, expand it
    else if (latest < previous) {
      setIsDesktopExpanded(true);
    }
  });

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
    // Changed md:px-10 to lg:px-10 to switch layout at laptop sizes instead of tablet
    <header className="fixed top-0 left-0 w-full z-50 flex items-start justify-between px-5 py-5 lg:px-10 pointer-events-none antialiased">

      {/* ========================================= */}
      {/* LEFT SIDE: LOGO                           */}
      {/* ========================================= */}
      <motion.div
        // Changed md: breakpoints to lg:
        className="pointer-events-auto flex items-center justify-center h-[40px] lg:h-[52px] cursor-pointer mt-2 lg:mt-0"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4, ease: smoothEase }}
      >
        <Link
          to="/"
          className="inline-flex items-center justify-center h-full"
        >
          <img
            src="/bright-logo1.png"
            alt="Clickora Logo"
            // Changed md:h-12 to lg:h-12
            className="h-8 lg:h-12 w-auto object-contain"
          />
        </Link>
      </motion.div>

      {/* ========================================= */}
      {/* DESKTOP NAVIGATION (Laptop & up: lg:flex) */}
      {/* ========================================= */}
      <div
        // Changed hidden md:flex to hidden lg:flex
        className="pointer-events-auto hidden lg:flex justify-end font-secondary p-4 -mr-4"
        onMouseEnter={() => setIsDesktopExpanded(true)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <motion.nav
          layout
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex items-center h-[52px] bg-gradient-to-b from-white to-[#f4f4f5] p-[6px] rounded-[1rem] shadow-sm border border-gray-200 cursor-pointer overflow-hidden origin-right"
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
                <div className="flex items-center space-x-1 px-4 py-1 whitespace-nowrap relative">
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
                      {/* Sliding Pill Background Animation */}
                      {hoveredIndex === i && (
                        <motion.div
                          layoutId="desktop-nav-pill"
                          className="absolute inset-0 bg-[#ff7043] rounded-[0.8rem] z-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}

                      <Link
                        to={item.path}
                        className="text-[#4a1c13] text-[15px] font-bold tracking-wide relative z-10 px-4 py-2 block transition-colors duration-300 hover:text-white"
                      >
                        {item.name}
                      </Link>
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
              whileHover={{ backgroundColor: "#e65a2d" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: smoothEase }}
              className="bg-[#ff7043] text-white px-7 h-full rounded-[0.8rem] text-[14px] font-semibold tracking-wide relative z-10 flex items-center justify-center"
            >
              Talk Now
            </motion.button>
          </Link>
        </motion.nav>
      </div>

      {/* ========================================= */}
      {/* MOBILE / TABLET NAVIGATION (Below lg)     */}
      {/* ========================================= */}
      {/* Changed flex md:hidden to flex lg:hidden */}
      <div className="pointer-events-auto flex lg:hidden justify-end mt-2">
        <motion.nav
          layout
          animate={{ width: isMobileOpen ? 240 : "auto" }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="flex flex-col bg-gradient-to-b from-white to-[#f4f4f5] p-[6px] rounded-[1rem] shadow-sm border border-gray-200 overflow-hidden origin-top-right relative z-50"
        >
          {/* Top Row: Always visible */}
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
            <Link to="/contact" className="flex items-center justify-center shrink-0 pr-2">
              <motion.button
                layout
                whileTap={{ scale: 0.95 }}
                className="bg-[#ff7043] text-white px-4 py-1.5 rounded-[0.6rem] text-[12px] font-bold tracking-wide flex items-center justify-center whitespace-nowrap shadow-sm"
              >
                Talk Now
              </motion.button>
            </Link>
          </motion.div>

          {/* Expanded Content: Links */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                key="mobile-menu"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5, ease: smoothEase }}
                // Reduced bottom padding slightly since socials are gone
                className="flex flex-col px-4 pt-6 pb-2 w-full"
              >
                <div className="flex flex-col space-y-1 mb-2">
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
                        className="text-[#4a1c13] text-[17px] font-bold tracking-wide block hover:text-white hover:bg-[#ff7043] px-4 py-3 rounded-[0.8rem] transition-all duration-300"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

    </header>
  );
};

export default Header;