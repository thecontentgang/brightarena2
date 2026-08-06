"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb = () => {
  const location = useLocation();
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Split the pathname into segments (e.g., "/services/home-interior" becomes ["services", "home-interior"])
  const pathnames = location.pathname.split("/").filter((x) => x);

  // HIDE LOGIC:
  // 1. If pathnames.length === 0, we are on the Home page ("/").
  // 2. If pathnames.length > 1, we are on an internal/detail page (e.g., "/services/:slug").
  if (pathnames.length === 0 || pathnames.length > 1) {
    return null; 
  }

  return (
    <motion.nav
      initial={{ opacity: 1, y: 0 }}
      animate={{ 
        opacity: isTop ? 1 : 0, 
        y: isTop ? 0 : -10 
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      aria-label="Breadcrumb"
      // 1. POSITIONING: Placed on the right side, just under the navbar height (adjust top-24 if your navbar is taller/shorter)
      className="fixed top-24 md:top-28 right-6 md:right-12 lg:right-16 z-40 pointer-events-none"
    >
      <ol 
        // 2. PILL STYLING: Added bg-white/80, backdrop-blur, rounded-full, shadow, and padding
        className={`flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#4a1c13]/10 shadow-sm rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] ${
          isTop ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <motion.li whileHover={{ x: -2 }}>
          <Link to="/" className="hover:text-[#ff7043] transition-colors">
            Home
          </Link>
        </motion.li>

        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const label = value.replace(/-/g, " ");

          return (
            <React.Fragment key={to}>
              <span className="opacity-40">/</span>
              <motion.li
                whileHover={!last ? { x: 2 } : {}}
                className={
                  last
                    ? "text-[#4a1c13] cursor-default"
                    : "hover:text-[#ff7043] transition-colors"
                }
              >
                {last ? (
                  <span className="capitalize">{label}</span>
                ) : (
                  <Link to={to} className="capitalize">
                    {label}
                  </Link>
                )}
              </motion.li>
            </React.Fragment>
          );
        })}
      </ol>
    </motion.nav>
  );
};

export default Breadcrumb;