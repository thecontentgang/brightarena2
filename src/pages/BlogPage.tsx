"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { blogsData } from "./blogsData";
import SEO from "../components/SEO";

// Create a special component that merges Framer Motion with React Router Links
const MotionLink = motion(Link);

// Explicitly typed easing tuple to satisfy TypeScript
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function BlogPage() {
  const featuredPost = blogsData[0];
  const standardPosts = blogsData.slice(1);

  return (
    <>
      <SEO 
        title="Interior Design Ideas and Tips - Bright Arena Interiors"
        description="Explore expert interior design ideas, home decor tips, design trends, and practical guides from Bright Arena Interiors to create beautiful living spaces."
        url="https://www.brightarenainteriors.com/blogs"
      />
      <div className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs md:text-sm tracking-[0.3em] uppercase font-bold block mb-6"
        >
          Insights & Inspiration
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
          className="text-[clamp(40px,7vw,96px)] font-primary font-light leading-[1.05] tracking-tight mb-8"
        >
          The Design <br />
          <span className="italic font-serif text-[#ff7043]">Journal.</span>
        </motion.h1>
      </section>

      {/* ── FEATURED POST ── */}
      {featuredPost && (
        <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-16 md:mb-24">
          <MotionLink
            to={`/blogs/${featuredPost.slug}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: smoothEase }}
            className="group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-[3rem] p-6 shadow-sm border border-[#4a1c13]/5"
          >
            {/* Featured Image */}
            <div className="lg:col-span-8 overflow-hidden rounded-[2rem] h-full min-h-[500px]">
              <img
                src={featuredPost.coverImage}
                alt={featuredPost.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
            </div>
            
            {/* Featured Content */}
            <div className="lg:col-span-4 flex flex-col justify-center py-4">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#ff7043]/10 text-[#ff7043] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                  {featuredPost.category}
                </span>
                <span className="text-[#4a1c13]/40 text-xs font-mono tracking-wider">
                  {featuredPost.date}
                </span>
              </div>
              
              <h2 className="text-[clamp(28px,3vw,40px)] font-primary leading-tight mb-6 group-hover:text-[#ff7043] transition-colors duration-500">
                {featuredPost.title}
              </h2>
              
              <p className="text-[#4a1c13]/70 text-base leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-3 text-[#4a1c13] font-bold text-xs tracking-widest uppercase group-hover:text-[#ff7043] transition-colors duration-300">
                Read Article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="transform group-hover:translate-x-2 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </MotionLink>
        </section>
      )}

      {/* ── STANDARD POSTS GRID (3 Columns) ── */}
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {standardPosts.map((post, index) => (
            <MotionLink
              to={`/blogs/${post.slug}`}
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: smoothEase, delay: (index % 3) * 0.15 }}
              className="group cursor-pointer flex flex-col"
            >
              {/* Card Image */}
              <div className="w-full aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl mb-6 bg-[#e8e5de]">
                <img 
                  src={post.coverImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Card Meta */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#ff7043] text-[10px] font-bold tracking-widest uppercase">
                  {post.category}
                </span>
                <span className="w-1 h-1 rounded-full bg-[#4a1c13]/20" />
                <span className="text-[#4a1c13]/40 text-xs font-mono tracking-wider">
                  {post.date}
                </span>
              </div>

              {/* Card Title & Excerpt */}
              <h3 className="text-2xl font-primary leading-snug mb-3 group-hover:text-[#ff7043] transition-colors duration-300 line-clamp-2">
                {post.title}
              </h3>
              
              <p className="text-[#4a1c13]/60 text-sm leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Subtle Read More */}
              <div className="mt-auto flex items-center gap-2 text-[#4a1c13]/50 text-[10px] font-bold tracking-widest uppercase group-hover:text-[#ff7043] transition-colors duration-300">
                Read More
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="transform group-hover:translate-x-1 transition-transform duration-300">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </MotionLink>
          ))}
        </div>
      </section>

      {/* ── PAGINATION (Optional visual element) ── */}
      <div className="flex justify-center items-center gap-4 mt-24">
        <button className="w-10 h-10 rounded-full border border-[#4a1c13]/20 flex items-center justify-center text-[#4a1c13]/40 hover:bg-[#ff7043] hover:text-white hover:border-[#ff7043] transition-colors duration-300 cursor-not-allowed">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M15 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <span className="text-xs font-mono">Page 1 of 1</span>
        <button className="w-10 h-10 rounded-full border border-[#4a1c13]/20 flex items-center justify-center text-[#4a1c13] hover:bg-[#ff7043] hover:text-white hover:border-[#ff7043] transition-colors duration-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      </div>
    </>
  );
}