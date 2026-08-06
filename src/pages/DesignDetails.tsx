"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { designsData } from "./designsData"; 
import SEO from "../components/SEO";

// Gentle, premium easing curve
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export default function DesignDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 1. Find the target design matching either the new slug OR the old slug
  const targetDesign = designsData.find(
    (d) => d.slug === slug || d.oldSlug === slug
  );

  // 2. Find all designs in the same category for the gallery
  const categoryDesigns = targetDesign 
    ? designsData.filter((d) => d.category === targetDesign.category)
    : [];

  // Check if we are actually on the old slug and need to redirect
  const isOldSlug = targetDesign?.oldSlug === slug && targetDesign?.slug !== slug;

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  useEffect(() => {
    if (!slug) return;

    if (!targetDesign) {
      // If no design matches at all, send to gallery
      navigate("/designs", { replace: true });
    } else if (isOldSlug) {
      // If the URL matches the old slug (and isn't the new one), REDIRECT
      navigate(`/designs/${targetDesign.slug}`, { replace: true });
    }
  }, [slug, targetDesign, navigate, isOldSlug]);

  // SAFE EARLY RETURN AFTER HOOKS
  if (!targetDesign || isOldSlug) return null;

  // Extract base data from the matched item safely
  const categoryName = targetDesign.category || "Gallery";
  
  // Extract SEO specifically from the matched item
  const pageTitle = targetDesign.seo?.metaTitle || `${categoryName} Interior Design Concepts | Bright Arena`;
  const pageDescription = targetDesign.seo?.description || targetDesign.description || `Explore our luxury ${categoryName} interior design concepts and transformations by Bright Arena.`;
  const pageKeywords = targetDesign.seo?.keywords;
  
  // Extract the unique H1 tag for this specific category design
  const pageH1 = targetDesign.seo?.h1 || `${categoryName} Interior Design in Hyderabad`;

  // Extract ALL images from the matched designs 
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
        url={`https://www.brightarenainteriors.com/designs/${targetDesign.slug}`}
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">
      
        {/* ── BREADCRUMB CLEARANCE AREA ── */}
        <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
           {/* Breadcrumb handled globally */}
        </div>

        {/* ── CATEGORY NAME (TITLE) ── */}
        <section className="pt-4 md:pt-8 pb-12 md:pb-16 relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
            
            <h1 className="sr-only">{pageH1}</h1>

            <h2 className="text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary capitalize">
              {categoryName} <br />
              <span className="italic text-[#ff7043]">Concepts.</span>
            </h2>
          </div>
        </section>

        {/* ── 2x2 GRID (IMAGES) ── */}
        <section className="px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
          {/* Changed to exactly 1 column on mobile, 2 columns on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {galleryItems.map((item, index) => {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  // Added animation delay logic so the two columns stagger nicely
                  transition={{ duration: 0.7, delay: (index % 2) * 0.15, ease: EASE }}
                  // Added aspect-[4/3] so every card is a perfect uniform rectangle
                  className="group relative w-full h-full overflow-hidden rounded-[2rem] bg-[#e8e5de] shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/3]"
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10">
                    <h3 className="text-white font-primary text-2xl md:text-3xl leading-snug mb-3">{item.title}</h3>
                    <p className="text-white/80 text-sm md:text-base line-clamp-2 leading-relaxed">{item.description}</p>
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