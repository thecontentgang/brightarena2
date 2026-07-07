"use client";

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb = () => {
  const location = useLocation();
  // 1. State to track if we are at the top of the page
  const [isTop, setIsTop] = useState(true);

  // 2. Effect to listen to the scroll event
  useEffect(() => {
    const handleScroll = () => {
      // If scroll position is less than 50px, we consider it "at the top"
      setIsTop(window.scrollY < 50);
    };

    // Attach event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup listener on unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render on the home page
  if (location.pathname === "/") return null;

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    // 3. Change <nav> to <motion.nav> to animate it based on the isTop state
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
        {/* 4. Disable pointer events on the list when hidden so invisible links aren't clickable */}
        <ol 
          className={`flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] ${
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