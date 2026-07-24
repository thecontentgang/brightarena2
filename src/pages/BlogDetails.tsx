"use client";

import { useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { blogsData, type BlogContentBlock } from "./blogsData";
import SEO from "../components/SEO";

// Premium easing curve
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const postIndex = blogsData.findIndex((b) => b.slug === slug);
  const post = blogsData[postIndex];
  
  // Get the next post for the footer link
  const nextPost = blogsData[(postIndex + 1) % blogsData.length];

  // Hero Parallax & Reading Progress
  const heroRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

  const { scrollYProgress: articleScroll } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(articleScroll, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] text-[#4a1c13]">
        <h1 className="text-2xl font-primary">Article Not Found</h1>
        <button onClick={() => navigate("/blogs")} className="mt-4 text-[#ff7043] underline">Return to Journal</button>
      </div>
    );
  }

  // Helper function to render different content blocks
  const renderContentBlock = (block: BlogContentBlock, index: number) => {
    switch (block.type) {
      case "paragraph":
        return (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-[#4a1c13]/80 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-sans"
          >
            {block.value}
          </motion.p>
        );
      case "heading":
        return (
          <motion.h2
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-3xl md:text-4xl font-primary text-[#4a1c13] mt-16 mb-8 leading-snug"
          >
            {block.value}
          </motion.h2>
        );
      case "quote":
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="my-16 md:my-24 pl-6 md:pl-10 border-l-2 border-[#ff7043]"
          >
            <p className="text-2xl md:text-4xl font-primary italic text-[#4a1c13] leading-tight">
              "{block.value}"
            </p>
          </motion.div>
        );
      case "image":
        return (
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="my-12 md:my-16"
          >
            <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl bg-[#e8e5de]">
              <img src={block.value} alt={block.caption || "Blog image"} className="w-full h-full object-cover" />
            </div>
            {block.caption && (
              <figcaption className="text-center text-[#4a1c13]/50 text-sm mt-4 font-mono tracking-wide">
                {block.caption}
              </figcaption>
            )}
          </motion.figure>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SEO 
        title={post.seo?.metaTitle || `${post.title} | Bright Arena Interiors Journal`}
        description={post.seo?.description || post.excerpt}
        keywords={post.seo?.keywords}
        url={`https://www.brightarenainteriors.com/blogs/${post.slug}`}
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] w-full min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── READING PROGRESS BAR ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff7043] origin-left z-50"
        style={{ scaleX }}
      />

      <article ref={articleRef}>
        {/* ── HERO HEADER ── */}
        <header className="pt-32 md:pt-48 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <span className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold">
              {post.category}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/20" />
            <span className="text-[#4a1c13]/50 text-[10px] md:text-xs font-mono tracking-widest uppercase">
              {post.readTime}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="text-[clamp(36px,6vw,80px)] leading-[1.05] tracking-tight font-primary max-w-4xl mx-auto mb-10"
          >
            {post.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="flex items-center justify-center gap-4 text-sm font-medium text-[#4a1c13]/70"
          >
            <span>By {post.author}</span>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/20" />
            <span>{post.date}</span>
          </motion.div>
        </header>

        {/* ── HERO IMAGE ── */}
        <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24">
          <div ref={heroRef} className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de]">
            <motion.div className="w-full h-full" style={{ y: heroImgY, scale: 1.05 }}>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[#4a1c13]/5" />
          </div>
        </section>

        {/* ── ARTICLE CONTENT ── */}
        <section className="px-6 md:px-12 max-w-[800px] mx-auto">
          {/* Excerpt / Lead Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="text-2xl md:text-3xl font-primary text-[#4a1c13] leading-snug mb-16"
          >
            {post.excerpt}
          </motion.p>

          {/* Dynamic Content Blocks */}
          <div className="article-body">
            {post.content.map((block, index) => renderContentBlock(block, index))}
          </div>

        </section>
      </article>

      {/* ── NEXT POST CTA ── */}
      {nextPost && (
        <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto mt-24 border-t border-[#4a1c13]/10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <p className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6">
              Read Next
            </p>
            <h3 className="text-[#4a1c13] text-3xl md:text-5xl lg:text-6xl font-primary leading-tight tracking-tight max-w-3xl mb-12 hover:text-[#ff7043] transition-colors duration-500">
              <Link to={`/blogs/${nextPost.slug}`}>
                {nextPost.title}
              </Link>
            </h3>

            <Link
              to={`/blogs/${nextPost.slug}`}
              className="group flex items-center gap-4 bg-[#4a1c13] text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors duration-500"
            >
              Continue Reading
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-[#ff7043]">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          </motion.div>
        </section>
      )}

      </main>
    </>
  );
}