"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { designsData } from "./designsData"; // Ensure path is correct
import SEO from "../components/SEO";

export default function DesignDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find all designs matching the category slug
  const categoryDesigns = designsData.filter(
    (d) => d.category.toLowerCase().replace(/\s+/g, "-") === slug
  );

  // 1. ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  useEffect(() => {
    if (categoryDesigns.length === 0 && slug) {
      navigate("/designs");
    }
  }, [categoryDesigns, slug, navigate]);

  const heroImgRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);

  // 2. NOW IT IS SAFE TO DO THE EARLY RETURN
  if (categoryDesigns.length === 0) return null;

  // 3. Extract base data from the first matched item safely
  const firstDesign = categoryDesigns[0];
  const categoryName = firstDesign.category || "Gallery";
  
  // Extract SEO specifically from the first item
  const pageTitle = firstDesign.seo?.metaTitle || `${categoryName} Interior Design Concepts | Bright Arena`;
  const pageDescription = firstDesign.seo?.description || firstDesign.description || `Explore our luxury ${categoryName} interior design concepts and transformations by Bright Arena.`;
  const pageKeywords = firstDesign.seo?.keywords;
  
  // Use a reliable default Unsplash image if heroImage is missing
  const heroImage = firstDesign.coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

  // Extract ALL images from the matched designs 
  // so the masonry grid shows the full gallery, not just the single cover object!
  const galleryItems = categoryDesigns.flatMap(design => 
    design.images.map((imgSrc, imgIndex) => ({
      id: `${design.id}-${imgIndex}`,
      src: imgSrc,
      title: design.title,
      description: design.description
    }))
  );

  return (
    <>
      <SEO 
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
        url={`https://www.brightarenainteriors.com/designs/${slug}`}
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">
      
        {/* ── BREADCRUMB CLEARANCE AREA ── */}
        <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
           {/* Breadcrumb handled globally */}
        </div>

        {/* ── DYNAMIC HERO ── */}
        <section className="pt-4 md:pt-8 pb-12 md:pb-16 relative">
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
            {galleryItems.map((item, index) => {
              const spanClasses = index % 4 === 0 ? "md:col-span-2" : "md:col-span-1";
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`group relative w-full h-full overflow-hidden rounded-[2rem] bg-[#e8e5de] shadow-sm hover:shadow-xl transition-all duration-500 ${spanClasses}`}
                >
                  {item.src ? (
                    <img 
                      src={item.src} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
                      loading="lazy" 
                    />
                  ) : (
                    <div className="w-full h-full bg-[#d1cdc7] animate-pulse flex items-center justify-center text-[#a8a49e]">
                      No Image
                    </div>
                  )}
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-white font-primary text-2xl mb-2">{item.title}</h3>
                    <p className="text-white/70 text-sm line-clamp-2">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}