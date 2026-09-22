"use client";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SEO from "../components/SEO";

export default function NotFoundPage() {
  return (
    <>
      <SEO 
        title="Page Not Found - Bright Arena Interiors"
        description="The page you are looking for does not exist."
        url="https://www.brightarenainteriors.com/404"
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] min-h-[80vh] flex items-center justify-center antialiased px-6 md:px-12">
        <div className="max-w-2xl text-center flex flex-col items-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[clamp(60px,10vw,120px)] font-primary font-bold leading-none text-[#ff7043] mb-4"
          >
            404
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl md:text-4xl font-primary mb-6"
          >
            Page Not Found
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-sm md:text-base text-[#4a1c13]/70 mb-10 max-w-md mx-auto leading-relaxed"
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4a1c13] text-white text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#ff7043]"
            >
              Back to Home
            </Link>
          </motion.div>
        </div>
      </main>
    </>
  );
}
