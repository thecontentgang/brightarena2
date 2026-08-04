"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { designsData } from "./designsData"; // Ensure path is correct
import SEO from "../components/SEO";

export default function DesignDetailsPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  // 1. Find the target design matching either the new slug OR the old slug
  const targetDesign = designsData.find(
    (d) => d.slug === slug || d.oldSlug === slug
  );

  // 2. Find all designs in the same category for the masonry gallery
  const categoryDesigns = targetDesign 
    ? designsData.filter((d) => d.category === targetDesign.category)
    : [];

  // ALL HOOKS MUST BE CALLED BEFORE ANY EARLY RETURNS
  useEffect(() => {
    if (!slug) return;

    if (!targetDesign) {
      // If no design matches at all, send to gallery
      navigate("/designs", { replace: true });
    } else if (targetDesign.oldSlug === slug) {
      // If the URL matches the old slug, REDIRECT to the new slug seamlessly
      navigate(`/designs/${targetDesign.slug}`, { replace: true });
    }
  }, [slug, targetDesign, navigate]);

  const heroImgRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroImgRef,
    offset: ["start end", "end start"],
  });
  
  const heroImgY = useTransform(heroScroll, [0, 1], ["-10%", "10%"]);

  // SAFE EARLY RETURN AFTER HOOKS
  if (!targetDesign || targetDesign.oldSlug === slug) return null;

  // Extract base data from the matched item safely
  const categoryName = targetDesign.category || "Gallery";
  
  // Extract SEO specifically from the matched item
  const pageTitle = targetDesign.seo?.metaTitle || `${categoryName} Interior Design Concepts | Bright Arena`;
  const pageDescription = targetDesign.seo?.description || targetDesign.description || `Explore our luxury ${categoryName} interior design concepts and transformations by Bright Arena.`;
  const pageKeywords = targetDesign.seo?.keywords;
  
  // Extract the unique H1 tag for this specific category design
  const pageH1 = targetDesign.seo?.h1 || `${categoryName} Interior Design in Hyderabad`;
  
  // Use a reliable default Unsplash image if heroImage is missing
  const heroImage = targetDesign.coverImage || "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop";

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
        url={`https://www.brightarenainteriors.com/designs/${targetDesign.slug}`}
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24">
      
        {/* ── BREADCRUMB CLEARANCE AREA ── */}
        <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto">
           {/* Breadcrumb handled globally */}
        </div>

        {/* ── DYNAMIC HERO ── */}
        <section className="pt-4 md:pt-8 pb-12 md:pb-16 relative">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center">
            
            {/* SEO H1 Tag - Visually Hidden - Unique per design category */}
            <h1 className="sr-only">{pageH1}</h1>

            {/* Converted visual text to H2 to respect semantic HTML */}
            <h2 className="text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary capitalize">
              {categoryName} <br />
              <span className="italic text-[#ff7043]">Concepts.</span>
            </h2>
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