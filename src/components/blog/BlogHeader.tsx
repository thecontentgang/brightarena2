import { motion, useScroll, useSpring } from "framer-motion";
import React from "react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface BlogHeaderProps {
  category: string;
  readTime: string;
  title: string;
  author: string;
  date: string;
  articleRef: React.RefObject<HTMLElement | null>;
}

export default function BlogHeader({ category, readTime, title, author, date, articleRef }: BlogHeaderProps) {
  const { scrollYProgress: articleScroll } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(articleScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* ── READING PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff7043] origin-left z-50"
        style={{ scaleX }}
      />
      <header className="pt-32 md:pt-48 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
            {category}
          </span>
          <span className="w-1 h-1 rounded-full bg-[#4a1c13]/20" />
          <span className="text-[#4a1c13]/50 text-[10px] md:text-xs font-mono tracking-widest uppercase">
            {readTime}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
          className="text-[clamp(36px,6vw,80px)] leading-[1.05] tracking-tight font-primary max-w-4xl mx-auto mb-10"
        >
          {title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="flex items-center justify-center gap-4 text-sm font-medium text-[#4a1c13]/70"
        >
          <span>By {author}</span>
          <span className="w-1 h-1 rounded-full bg-[#4a1c13]/20" />
          <span>{date}</span>
        </motion.div>
      </header>
    </>
  );
}
