"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ReviewType = "video" | "google";

interface Testimonial {
  id: number;
  type: ReviewType;
  name: string;
  role: string;
  location: string;
  rotation: number;
  delay: number;
  floatDuration: number;
  videoId?: string;
  description?: string;
  rating?: number;
  reviewText?: string;
  date?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    type: "video",
    name: "Priya Sharma",
    role: "Homeowner",
    videoId: "aZq2QRwiYsE",
    description: "The transformation of our home was beyond what we imagined. Priya and her family wanted to create a space that felt both luxurious and livable.",
    location: "Mumbai",
    rotation: -3,
    delay: 0,
    floatDuration: 3.2,
  },
  {
    id: 2,
    type: "google",
    name: "Vikram Desai",
    role: "Local Guide",
    rating: 5,
    reviewText: "Absolutely phenomenal service! The team was highly professional and delivered the project 2 weeks ahead of schedule.",
    date: "2 weeks ago",
    location: "Pune",
    rotation: 4,
    delay: 0.5,
    floatDuration: 4.1,
  },
  {
    id: 3,
    type: "video",
    name: "Arjun Mehta",
    role: "Founder & CEO",
    videoId: "ztyqShdYSEY",
    description: "Working with this team was a game-changer for our office space. Arjun needed an office that would inspire creativity.",
    location: "Bangalore",
    rotation: -2,
    delay: 1.2,
    floatDuration: 3.8,
  },
  {
    id: 4,
    type: "google",
    name: "Anita Rao",
    role: "Customer",
    rating: 5,
    reviewText: "I was skeptical at first, but the 3D renders matched the final outcome perfectly. The quality of materials used is top-notch.",
    date: "1 month ago",
    location: "Hyderabad",
    rotation: 5,
    delay: 0.8,
    floatDuration: 4.5,
  },
  {
    id: 5,
    type: "video",
    name: "Sarah & David",
    role: "Restaurant Owners",
    videoId: "fc27D9buInM",
    description: "Our restaurant has never looked better. The ambiance they created is exceptional.",
    location: "Delhi",
    rotation: -4,
    delay: 2.1,
    floatDuration: 3.5,
  },
  {
    id: 6,
    type: "google",
    name: "Karan Singh",
    role: "Customer",
    rating: 4,
    reviewText: "Great experience overall. The design team is very receptive to feedback.",
    date: "3 months ago",
    location: "Gurgaon",
    rotation: 2,
    delay: 1.5,
    floatDuration: 4.0,
  },
];

// Reusable SVG Icons
const StarIcon = () => (
  <svg className="w-3 h-3 md:w-4 md:h-4 text-[#FBBC04] fill-current" viewBox="0 0 24 24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 md:w-5 md:h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const ScatteredTestimonials: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  
  const [filter, setFilter] = useState<"all" | "video" | "google">("all");
  const containerRef = useRef<HTMLDivElement>(null);

 

  const selectedTestimonial = testimonials.find((t) => t.id === selectedId);
  const filteredTestimonials = testimonials.filter(t => filter === "all" || t.type === filter);

  useEffect(() => {
    if (selectedId) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [selectedId]);

  

  return (
    <section className="relative w-full min-h-[90vh] bg-[#f7f4ee] overflow-hidden py-16 md:py-24 px-4 flex flex-col items-center">

      {/* Header & Interactive Filters */}
      <div className="relative z-10 text-center flex flex-col items-center pointer-events-auto w-full max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-[#4a1c13] font-primary text-[clamp(32px,5vw,56px)] leading-[1.1]"
        >
          Client <span className="italic font-serif text-[#ff7043]">Stories</span>
        </motion.h2>
        <p className="text-[#4a1c13]/60 text-sm md:text-base mt-2 mb-8">
          Explore our latest experiences and reviews
        </p>

        {/* Filters */}
        <div className="flex bg-white shadow-sm rounded-full p-1 border border-[#e8e5de] mb-12">
          {(["all", "video", "google"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 md:py-1.5 rounded-full text-xs md:text-sm font-medium capitalize transition-all duration-300 ${filter === f ? "bg-[#4a1c13] text-white shadow-md" : "text-[#4a1c13]/70 hover:text-[#4a1c13] hover:bg-gray-50"
                }`}
            >
              {f === "all" ? "All Stories" : f === "video" ? "Videos" : "Reviews"}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Grid/Scatter Layout 
          - Mobile: 3-column Grid
          - Desktop: Flex Wrap (Scatter)
      */}
      <div
        ref={containerRef}
        className="relative w-full max-w-[1200px] mx-auto grid grid-cols-3 gap-3 sm:gap-4 md:flex md:flex-wrap md:items-center md:justify-center md:gap-8 lg:gap-12 pb-20"
      >
        <AnimatePresence mode="popLayout">
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layoutId={`card-container-${testimonial.id}`}
              drag
              dragConstraints={containerRef}
              whileDrag={{ scale: 1.05, cursor: "grabbing", zIndex: 60 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                rotate: testimonial.rotation,
                opacity: 1,
                scale: 1,
                y: [0, -8, 0],
              }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{
                y: { duration: testimonial.floatDuration, repeat: Infinity, ease: "easeInOut", delay: testimonial.delay },
                opacity: { duration: 0.4 },
                layout: { duration: 0.4, type: "spring", bounce: 0.2 },
              }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                transition: { duration: 0.2 },
                zIndex: 40,
              }}
              onClick={() => setSelectedId(testimonial.id)}
              className={`
                cursor-grab group shadow-md md:shadow-lg bg-white 
                rounded-2xl md:rounded-[2rem] 
                p-1.5 md:p-3 md:pr-6 lg:pr-8 
                flex items-center justify-center md:justify-start gap-0 md:gap-4
                hover:shadow-xl border border-[#e8e5de] select-none shrink-0
                ${selectedId === testimonial.id ? "z-50 opacity-0 pointer-events-none" : "z-20"}
              `}
            >

              {/* Thumbnail (Full width on mobile, fixed w/h on desktop) */}
              <motion.div
                layoutId={`image-${testimonial.id}`}
                className="w-full aspect-square md:w-16 md:h-16 rounded-xl md:rounded-3xl overflow-hidden relative flex-shrink-0 bg-[#f4f1eb] flex items-center justify-center shadow-inner"
              >
                {testimonial.type === "video" ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${testimonial.videoId}/maxresdefault.jpg`}
                      alt={testimonial.name}
                      draggable={false}
                      className="absolute inset-0 w-full h-full object-cover rounded-xl md:rounded-full group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                      {/* SVG Play Icon: Large on mobile, smaller on desktop */}
                      <svg 
                        className="w-8 h-8 md:w-5 md:h-5 text-white/95 ml-1 drop-shadow-md" 
                        fill="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#4285F4]/10 text-[#4285F4] text-3xl md:text-xl font-bold font-serif">
                    {testimonial.name.charAt(0)}
                  </div>
                )}
              </motion.div>

              {/* Text Label - HIDDEN on mobile, flex on md+ */}
              <motion.div layoutId={`text-content-${testimonial.id}`} className="hidden md:flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[#4a1c13] text-sm md:text-base whitespace-nowrap">{testimonial.name}</h3>
                  {testimonial.type === "google" && <GoogleIcon />}
                </div>
                {testimonial.type === "video" ? (
                  <p className="text-xs text-[#ff7043] whitespace-nowrap font-medium mt-0.5">Watch Video</p>
                ) : (
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} />
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Expanded Modal State */}
      <AnimatePresence>
        {selectedId && selectedTestimonial && (
          <React.Fragment>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90]"
            />

            <div className="fixed inset-0 flex items-center justify-center z-[100] pointer-events-none p-4 md:p-8 lg:p-12">
              <motion.div
                layoutId={`card-container-${selectedTestimonial.id}`}
                className="bg-white rounded-[2rem] overflow-hidden w-full max-w-5xl shadow-2xl pointer-events-auto flex flex-col md:flex-row relative max-h-[90vh] md:max-h-[70vh]"
              >
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-3 right-3 md:top-4 md:right-4 z-[110] w-8 h-8 md:w-10 md:h-10 bg-black/10 hover:bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-[#4a1c13] md:text-white transition-colors"
                >
                  ✕
                </button>

                <motion.div
                  layoutId={`image-${selectedTestimonial.id}`}
                  className={`
                    w-full md:w-1/2 relative overflow-hidden rounded-t-[2rem] md:rounded-l-[2rem] md:rounded-r-none flex items-center justify-center
                    ${selectedTestimonial.type === "video" ? "aspect-video md:aspect-auto bg-black shrink-0" : "bg-[#f4f1eb] p-8 md:p-12 shrink-0"}
                  `}
                >
                  {selectedTestimonial.type === "video" ? (
                    <iframe
                      className="w-full h-full absolute inset-0"
                      src={`https://www.youtube.com/embed/${selectedTestimonial.videoId}?autoplay=1`}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center flex flex-col items-center justify-center">
                      <div className="scale-150 mb-4"><GoogleIcon /></div>
                      <h2 className="text-[#4a1c13] text-5xl font-serif font-bold mt-2 mb-3">{selectedTestimonial.rating}.0</h2>
                      <div className="flex items-center gap-1.5 mb-4 scale-125">
                        {[...Array(selectedTestimonial.rating || 5)].map((_, i) => (
                          <StarIcon key={i} />
                        ))}
                      </div>
                      <p className="text-sm text-[#4a1c13]/60 font-medium">Verified Customer Review</p>
                    </div>
                  )}
                </motion.div>

                <motion.div
                  layoutId={`text-content-${selectedTestimonial.id}`}
                  className="w-full md:w-1/2 p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white overflow-y-auto"
                >
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div className="flex items-start justify-between mb-4 md:mb-6">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-[#4a1c13]">
                          {selectedTestimonial.name}
                        </h3>
                        <p className="text-[#ff7043] font-medium text-sm md:text-lg">
                          {selectedTestimonial.role}
                        </p>
                      </div>
                      {selectedTestimonial.type === "google" && (
                        <span className="text-xs md:text-sm text-[#4a1c13]/50">{selectedTestimonial.date}</span>
                      )}
                    </div>

                    <p className={`text-[#4a1c13] font-serif leading-relaxed mb-6 ${selectedTestimonial.type === "google" ? "text-lg md:text-xl italic" : "text-base md:text-lg"}`}>
                      "{selectedTestimonial.type === "google" ? selectedTestimonial.reviewText : selectedTestimonial.description}"
                    </p>

                    <div className="mt-4 md:mt-8 flex items-center gap-2 text-sm text-[#4a1c13]/60 font-medium pt-4 md:pt-6 border-t border-[#f4f1eb]">
                      <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{selectedTestimonial.location}</span>
                    </div>
                  </motion.div>
                </motion.div>

              </motion.div>
            </div>
          </React.Fragment>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ScatteredTestimonials;