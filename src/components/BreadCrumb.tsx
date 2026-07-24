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
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto">
        <ol 
          className={`flex items-center justify-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] ${
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
      </div>
    </motion.nav>
  );
};

export default Breadcrumb;