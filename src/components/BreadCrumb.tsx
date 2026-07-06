"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  
  // Do not render on the home page
  if (location.pathname === "/") return null;

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    // 'fixed' with high z-index, but below header (z-40). 
    // pt-24 ensures it sits below the header.
    <nav 
      aria-label="Breadcrumb" 
      className="fixed top-0 left-0 w-full z-40 px-6 md:px-12 lg:px-16 pt-24 md:pt-32 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto">
        <ol className="flex items-center gap-2 text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] pointer-events-auto">
          <motion.li whileHover={{ x: -2 }}>
            <Link to="/" className="hover:text-[#ff7043] transition-colors">Home</Link>
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
                  className={last ? "text-[#4a1c13] cursor-default" : "hover:text-[#ff7043] transition-colors"}
                >
                  {last ? (
                    <span className="capitalize">{label}</span>
                  ) : (
                    <Link to={to} className="capitalize">{label}</Link>
                  )}
                </motion.li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;