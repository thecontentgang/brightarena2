"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import JsonLd from "./JsonLd";

const Breadcrumb = () => {
  // The 404 page is prerendered once at Next.js's internal "/_not-found" path. Show it as "/404", which is
  // what the Vite build prerendered for its 404.html, so the server HTML and BreadcrumbList match.
  const rawPathname = usePathname();
  const pathname = /^\/_not-found\/?$/.test(rawPathname) ? "/404" : rawPathname;
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathnames = pathname.split("/").filter((x) => x);

  // Hide on homepage
  if (pathnames.length === 0) {
    return null; 
  }

  // Build JSON-LD Schema for Breadcrumbs
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.brightarenainteriors.com/"
    }
  ];

  pathnames.forEach((value, index) => {
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
    const label = value.replace(/-/g, " ");
    itemListElement.push({
      "@type": "ListItem",
      "position": index + 2,
      "name": label.charAt(0).toUpperCase() + label.slice(1),
      "item": `https://www.brightarenainteriors.com${to}/`
    });
  });

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      
      <motion.nav
        initial={{ opacity: 1, y: 0 }}
        animate={{ 
          opacity: isTop ? 1 : 0, 
          y: isTop ? 0 : -10 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        aria-label="Breadcrumb"
        className="fixed top-24 md:top-28 right-6 md:right-12 lg:right-16 z-40 pointer-events-none"
      >
        <ol 
          className={`flex flex-wrap items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#4a1c13]/10 shadow-sm rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] ${
            isTop ? "pointer-events-auto" : "pointer-events-none"
          }`}
        >
          <motion.li whileHover={{ x: -2 }}>
            <Link href="/" className="hover:text-[#ff7043] transition-colors">
              Home
            </Link>
          </motion.li>

          {pathnames.map((value, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const label = value.replace(/-/g, " ");

            return (
              <React.Fragment key={to}>
                <li aria-hidden="true" className="opacity-40">/</li>
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
                    <Link href={`${to}/`} className="capitalize">
                      {label}
                    </Link>
                  )}
                </motion.li>
              </React.Fragment>
            );
          })}
        </ol>
      </motion.nav>
    </>
  );
};

export default Breadcrumb;