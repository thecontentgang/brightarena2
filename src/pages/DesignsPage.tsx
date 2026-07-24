"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { designsData } from "./designsData";
import SEO from "../components/SEO";

// Dynamically extract categories, count them, and grab a cover image for each
const categoriesData = Array.from(new Set(designsData.map(d => d.category))).map(cat => {
  const designsInCategory = designsData.filter(d => d.category === cat);
  return {
    name: cat,
    count: designsInCategory.length,
    coverImage: designsInCategory[0]?.coverImage || "", 
    slug: cat.toLowerCase().replace(/\s+/g, '-'), 
  };
});

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ─── CATEGORY CARD ─── */
function CategoryCard({ 
  category, 
  index,
  isPriority 
}: { 
  category: typeof categoriesData[0]; 
  index: number;
  isPriority: boolean;
}) {
  // The grid's 'auto-rows' safely controls the height without conflicts.
  const spanClasses = index % 4 === 0 || index % 4 === 3
    ? "md:col-span-2" 
    : "md:col-span-1";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.1 }}
      className={`group relative w-full h-full overflow-hidden rounded-[2rem] cursor-pointer bg-[#e8e5de] shadow-sm hover:shadow-xl transition-shadow duration-500 ${spanClasses}`}
    >
      <Link 
        to={`/designs/${category.slug}`} 
        className="block w-full h-full"
        aria-label={`View all ${category.count} concepts in the ${category.name} interior design category`}
      >
        <img
          src={category.coverImage}
          alt={`Bright Arena interior design concepts for ${category.name}`}
          decoding="async"
          loading={isPriority ? "eager" : "lazy"}
          fetchPriority={isPriority ? "high" : "auto"}
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
        />

        {/* Elegant Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10" aria-hidden="true">
          <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[1px] bg-[#ff7043]" />
              <p className="text-[#ff7043] text-[10px] tracking-[0.25em] uppercase font-bold">
                {category.count} Concept{category.count !== 1 ? "s" : ""}
              </p>
            </div>
            <h3 className="text-white font-primary text-3xl md:text-4xl leading-tight">
              {category.name}
            </h3>
          </div>
          
          {/* Animated Arrow that appears on hover */}
          <div className="absolute bottom-10 right-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out hidden md:flex">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ─── PAGE COMPONENT ─── */
export default function DesignPage() {
  return (
    <>
      <SEO 
        title="Interior Design Ideas in Hyderabad – Bright Arena Interiors"
        description="Explore home interior designs by Bright Arena Interiors featuring modern living rooms, kitchens, bedrooms, and luxury spaces in Hyderabad."
        url="https://www.brightarenainteriors.com/designs"
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── BREADCRUMB CLEARANCE AREA ── */}
      <div className="pt-24 md:pt-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto" aria-hidden="true">
         {/* <Breadcrumb /> */}
      </div>

      {/* ── HERO ── */}
      <header aria-labelledby="design-hero-heading" className="pt-8 md:pt-12 pb-16 md:pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs tracking-[0.3em] uppercase font-bold mb-6"
        >
          Curated Collections
        </motion.p>
        <motion.h1
          id="design-hero-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
          className="text-[clamp(40px,7vw,96px)] font-primary leading-[1.05] mb-6 tracking-tight"
        >
          Visualizing the <br className="hidden sm:block" />
          <span className="italic font-serif text-[#ff7043]">future.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
          className="max-w-2xl text-[#4a1c13]/60 text-base md:text-lg leading-relaxed"
        >
          Explore our curated library of interior styles. Choose a category below to discover tailored concepts designed to inspire your next space.
        </motion.p>
      </header>

      {/* ── CATEGORIES BENTO GRID ── */}
      <section aria-label="Interior Design Categories" className="px-4 md:px-12 lg:px-24 max-w-[1400px] mx-auto">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] md:auto-rows-[450px] gap-4 md:gap-6 grid-flow-dense"
        >
          {categoriesData.map((category, i) => (
            <CategoryCard 
              key={category.name} 
              category={category} 
              index={i} 
              isPriority={i < 2} // Eagerly load the first row of images for LCP optimization
            />
          ))}
        </motion.div>

        {/* Fallback if no data is found */}
        {categoriesData.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 mb-4 rounded-full bg-[#4a1c13]/5 flex items-center justify-center text-[#4a1c13]/20" aria-hidden="true">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-[#4a1c13]/50 text-sm tracking-wide">No design categories found.</p>
          </div>
        )}
      </section>
    </main>
    </>
  );
}