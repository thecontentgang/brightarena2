"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Homeowner",
    videoId: "aZq2QRwiYsE",
    quote: "The transformation of our home was beyond what we imagined.",
    description: "Priya and her family wanted to create a space that felt both luxurious and livable. Our team worked closely with her to bring her vision to life.",
    location: "Mumbai, India"
  },
  {
    id: 2,
    name: "Arjun Mehta",
    role: "Founder & CEO",
    videoId: "ztyqShdYSEY",
    quote: "Working with this team was a game-changer for our office space.",
    description: "Arjun needed an office that would inspire creativity and productivity. We designed a modern workspace that reflects his company's innovative culture.",
    location: "Bangalore, India"
  },
  {
    id: 3,
    name: "Sarah & David",
    role: "Restaurant Owners",
    videoId: "fc27D9buInM",
    quote: "Our restaurant has never looked better. The ambiance they created is exceptional.",
    description: "Sarah and David wanted to elevate their restaurant's dining experience. We transformed their space into a warm, inviting environment.",
    location: "Delhi, India"
  },
  {
    id: 4,
    name: "Rahul Kapoor",
    role: "Creative Director",
    videoId: "nPOif88Do40",
    quote: "The attention to detail and creativity brought to our project was outstanding.",
    description: "Rahul required a space that would serve as both a studio and a gallery for his creative work. We created a versatile environment that inspires creativity.",
    location: "Hyderabad, India"
  }
];

interface TestimonialVideoProps {
  videoId: string;
  name: string;
  resetTrigger: number;
  onPlayChange: (isPlaying: boolean) => void;
}

const TestimonialVideo: React.FC<TestimonialVideoProps> = ({ 
  videoId, 
  name, 
  resetTrigger,
  onPlayChange
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const prevResetTrigger = useRef(resetTrigger);

  useEffect(() => {
    if (prevResetTrigger.current !== resetTrigger) {
      setIsPlaying(false);
      prevResetTrigger.current = resetTrigger;
    }
  }, [resetTrigger]);

  const handlePlay = () => {
    setIsPlaying(true);
    onPlayChange(true);
  };

  // Notify parent when video is closed manually (by user clicking outside or refreshing)
  const handleStop = () => {
    setIsPlaying(false);
    onPlayChange(false);
  };

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#e8e5de] shadow-lg">
      {!isPlaying ? (
        <div className="relative w-full h-full group">
          <img 
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <button 
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-all duration-300"
            aria-label="Play video"
          >
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/95 flex items-center justify-center shadow-2xl"
            >
              <div className="w-0 h-0 border-t-[11px] border-t-transparent border-l-[18px] border-l-[#4a1c13] border-b-[11px] border-b-transparent ml-1" />
            </motion.div>
          </button>
        </div>
      ) : (
        <div className="relative w-full h-full">
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title={`Testimonial video - ${name}`}
          />
          {/* Optional: Button to close video and go back to thumbnail */}
          <button
            onClick={handleStop}
            className="absolute top-3 right-3 bg-black/70 hover:bg-black/90 text-white text-xs px-3 py-1 rounded-full transition-colors z-10"
          >
            ✕ Close Video
          </button>
        </div>
      )}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);

  // Auto-advance only when NO video is playing
  useEffect(() => {
    if (isVideoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      setResetCounter((prev) => prev + 1);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVideoPlaying]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setResetCounter((prev) => prev + 1);
    setIsVideoPlaying(false); // Reset video state when manually changing
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setResetCounter((prev) => prev + 1);
    setIsVideoPlaying(false);
  }, []);

  const handleDotClick = (index: number) => {
    if (index === currentIndex) return;
    
    setCurrentIndex(index);
    setResetCounter((prev) => prev + 1);
    setIsVideoPlaying(false);
  };

  const handlePlayChange = (playing: boolean) => {
    setIsVideoPlaying(playing);
  };

  return (
    <section ref={sectionRef} className="py-8 md:py-12 lg:py-16 bg-[#f7f4ee] min-h-screen flex items-center">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 w-full">
        
        <div className="text-center mb-6 md:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-[#4a1c13] font-primary text-[clamp(28px,4vw,48px)] leading-[1.1]"
          >
            Client <span className="italic font-serif text-[#ff7043]">Stories</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="text-[#4a1c13]/60 text-sm md:text-base mt-2"
          >
            Hear directly from the people we've worked with
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-[#e8e5de]"
        >
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-3 md:p-4 lg:p-5 bg-[#faf8f5]">
              <div className="w-full aspect-video md:aspect-square lg:aspect-[4/3] relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0"
                  >
                    <TestimonialVideo 
                      videoId={testimonials[currentIndex].videoId}
                      name={testimonials[currentIndex].name}
                      resetTrigger={resetCounter}
                      onPlayChange={handlePlayChange}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="w-full md:w-1/2 p-4 md:p-5 lg:p-6 flex flex-col justify-between bg-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1"
                >
                  {/* Content remains same */}
                  <div className="flex items-start gap-3 mb-4">
                    <svg className="w-6 h-6 text-[#ff7043] flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <div>
                      <h3 className="text-xl font-bold text-[#4a1c13]">
                        {testimonials[currentIndex].name}
                      </h3>
                      <p className="text-[#ff7043] font-medium">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#4a1c13] text-lg font-serif italic leading-relaxed mb-4">
                    "{testimonials[currentIndex].quote}"
                  </p>

                  <p className="text-[#4a1c13]/70 leading-relaxed">
                    {testimonials[currentIndex].description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm text-[#4a1c13]/60">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    <span>{testimonials[currentIndex].location}</span>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-8 pt-6 border-t border-[#e8e5de]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentIndex 
                            ? 'w-8 bg-[#ff7043]' 
                            : 'w-2 bg-[#4a1c13]/20 hover:bg-[#4a1c13]/40'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <button onClick={prevSlide} className="p-3 rounded-full hover:bg-[#f7f4ee] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                      </svg>
                    </button>
                    <button onClick={nextSlide} className="p-3 rounded-full hover:bg-[#f7f4ee] transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  );
};

export default TestimonialsSection;