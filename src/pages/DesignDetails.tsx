"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { designsData } from "./designsData"; 

// const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function DesignDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const categoryDesigns = designsData.filter(
    (d) => d.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  useEffect(() => {
    if (categoryDesigns.length === 0 && slug) {
      navigate("/designs");
    }
  }, [categoryDesigns, slug, navigate]);

  const categoryName = categoryDesigns[0]?.category || "Gallery";
  
  // Use a reliable default Unsplash image if heroImage is missing
  const heroImage = categoryDesigns[0]?.coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

  const heroImgRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);

  if (categoryDesigns.length === 0) return null;

  return (
    <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── BACK BUTTON ── */}
      <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
        <Link to="/designs" className="inline-flex items-center gap-2 text-[#4a1c13]/60 hover:text-[#ff7043] transition-colors text-sm font-bold uppercase tracking-widest">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Categories
        </Link>
      </div>

      {/* ── DYNAMIC HERO ── */}
      <section className="pt-10 md:pt-12 pb-12 md:pb-16 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <h1 className="text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary capitalize">
            {categoryName} <br />
            <span className="italic text-[#ff7043]">Concepts.</span>
          </h1>
        </div>
      </section>

      {/* ── PARALLAX IMAGE ── */}
      <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24">
        <div ref={heroImgRef} className="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de] h-[40vh] md:h-[60vh] shadow-sm">
          <motion.div className="w-full h-full" style={{ y: heroImgY }}>
            {/* Added onError handler to replace broken images with a solid color div */}
            <img 
                src={heroImage} 
                alt={categoryName} 
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── MASONRY GRID ── */}
      <section className="px-4 md:px-12 lg:px-16 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[450px] gap-4 md:gap-6 grid-flow-dense">
          {categoryDesigns.map((design, index) => {
            const spanClasses = index % 4 === 0 ? "md:col-span-2 aspect-video md:aspect-auto" : "md:col-span-1 aspect-square md:aspect-auto";
            return (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`group relative overflow-hidden rounded-[2rem] bg-[#e8e5de] shadow-sm hover:shadow-xl transition-all duration-500 ${spanClasses}`}
              >
                {/* KEY FIX: Check if image exists, otherwise show a gray placeholder 
                   with a slight pulse animation
                */}
                {design.coverImage ? (
                  <img 
                    src={design.coverImage} 
                    alt={design.title} 
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                    loading="lazy" 
                  />
                ) : (
                  <div className="w-full h-full bg-[#d1cdc7] animate-pulse flex items-center justify-center text-[#a8a49e]">
                    No Image
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-white font-primary text-2xl mb-2">{design.title}</h3>
                  <p className="text-white/70 text-sm line-clamp-2">{design.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}