"use client";

import { motion } from "framer-motion";

// Explicitly typed easing tuple for Framer Motion
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const services = [
  {
    id: "01",
    title: "Interior Architecture",
    description: "We transform raw spaces into functional, breathtaking environments. Our approach balances structural integrity with fluid, intentional layouts.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "02",
    title: "Bespoke Furniture",
    description: "Custom pieces crafted to perfectly match your aesthetic and lifestyle. We collaborate with master artisans to build furniture that endures.",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "03",
    title: "Lighting Design",
    description: "Illuminating spaces to enhance mood, highlight textures, and improve daily living. Lighting is the invisible architecture of every room.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "04",
    title: "Spatial Styling",
    description: "The final layer of soul. We curate art, textiles, and objects that bring warmth, character, and a unique narrative to your environment.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop",
  }
];

export default function ServicesPage() {
  return (
    <div className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs md:text-sm tracking-[0.3em] uppercase font-bold block mb-6"
        >
          Our Expertise
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
          className="text-[clamp(40px,7vw,96px)] font-primary font-light leading-[1.05] tracking-tight mb-8"
        >
          Visualizing <br />
          <span className="italic font-serif text-[#ff7043]">perfection.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
          className="text-[#4a1c13]/70 text-sm md:text-base max-w-xl leading-relaxed"
        >
          From the foundational architecture to the final curated object, we offer comprehensive design services tailored to your unique lifestyle.
        </motion.p>
      </section>

      {/* ── SMALL IMAGE CARDS GRID (4 Columns) ── */}
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        {/* Changed to 4 columns on desktop, 2 on tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease: smoothEase, delay: (index % 4) * 0.1 }}
              // Changed aspect ratio and border radius to fit smaller cards
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer bg-[#e8e5de]"
            >
              {/* Background Image */}
              <img 
                src={service.image} 
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Card Content - Reduced Padding (p-6) */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                
                {/* Top: Number */}
                <div className="flex justify-end overflow-hidden">
                  <span className="text-white/50 font-mono text-base md:text-lg tracking-widest transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    {service.id}
                  </span>
                </div>

                {/* Bottom: Text & Button */}
                <div className="flex flex-col transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  
                  {/* Smaller Title */}
                  <h2 className="text-white font-primary text-2xl md:text-3xl mb-3 leading-tight">
                    {service.title}
                  </h2>
                  
                  {/* Smaller Description */}
                  <p className="text-white/70 text-xs md:text-sm leading-relaxed mb-6 opacity-0 h-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 delay-75 line-clamp-4">
                    {service.description}
                  </p>

                  {/* Smaller Animated Arrow/Button */}
                  <div className="flex items-center gap-3 text-[#ff7043] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-white">Explore</span>
                    <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-colors duration-300">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-[#4a1c13] transition-colors duration-300">
                        <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}