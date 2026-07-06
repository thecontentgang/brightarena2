"use client";
import React from "react";
import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// --- Dummy Data: Videos ---
const videoTestimonials = [
  {
    id: 1,
    client: "The Weston Family",
    project: "Luxury Condo Transformation",
    thumbnail: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    duration: "2:15",
  },
  {
    id: 2,
    client: "David Chen",
    project: "Boutique Corporate Office",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    duration: "1:45",
  },
  {
    id: 3,
    client: "Eleanor Richards",
    project: "Modern Minimalist Villa",
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    duration: "3:02",
  },
];

// --- Dummy Data: Google Reviews ---
const googleReviews = [
  {
    id: 1,
    name: "Eleanor Richards",
    date: "2 months ago",
    text: "Bright Arena completely transformed our living space. Their attention to detail and ability to balance functionality with breathtaking aesthetics is unmatched. It finally feels like home.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: 2,
    name: "James Collins",
    date: "3 months ago",
    text: "Professional, visionary, and incredibly precise. They took our vague ideas and turned them into a masterpiece. Every guest we host asks who designed our interior.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=11",
  },
  {
    id: 3,
    name: "Sophia Martinez",
    date: "4 months ago",
    text: "They managed to preserve the historical charm of our 1920s home while seamlessly integrating modern luxuries. A truly sensitive and spectacular design process.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=9",
  },
  {
    id: 4,
    name: "Marcus Thorne",
    date: "5 months ago",
    text: "From the initial consultation to the final reveal, the team was an absolute pleasure to work with. The color palettes they chose bring the ocean right into our living room.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=68",
  },
  {
    id: 5,
    name: "Amelia Weston",
    date: "6 months ago",
    text: "The spatial planning was genius. They made our 1,200 sq ft condo feel twice its size. The bespoke cabinetry and material selection are stunning.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: 6,
    name: "Liam O'Connor",
    date: "8 months ago",
    text: "Exceptional execution from start to finish. We wanted an office that felt like a luxury lounge but functioned perfectly for our team. The results exceeded our expectations.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=15",
  },
];

// --- Animation Variants ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// SVG for the colorful Google 'G' Logo
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const Testimonials: React.FC = () => {
  return (
    <main className="min-h-screen bg-[#fcfcfc] pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24 antialiased overflow-hidden">
      
      {/* ========================================= */}
      {/* HERO SECTION                              */}
      {/* ========================================= */}
      <motion.div
        className="w-full max-w-4xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <p className="text-[11px] tracking-[0.3em] uppercase font-medium mb-5 text-[#8A7570]">
          Client Stories
        </p>
        <h1 className="text-[clamp(36px,5vw,64px)] leading-[1.1] mb-6 text-[#4a1c13] font-primary font-light">
          Don't just take our <br className="hidden sm:block" />
          <span className="text-[#C4623A] italic">
            word for it.
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-[16px] leading-[1.8] text-[#6B5C57]">
          Watch and read what our clients have to say about their experience working with us to bring their dream spaces to life.
        </p>
      </motion.div>

      {/* ========================================= */}
      {/* VIDEO TESTIMONIALS                        */}
      {/* ========================================= */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24"
      >
        {videoTestimonials.map((video) => (
          <motion.div
            key={video.id}
            variants={cardVariants}
            whileHover={{ y: -5 }}
            className="group relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg"
          >
            {/* Background Image */}
            <img 
              src={video.thumbnail} 
              alt={video.client}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Play Button (Glassmorphism) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#ff7043]/90 group-hover:border-transparent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
                  <path d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                  {video.duration}
                </span>
              </div>
              <h4 className="font-bold text-[18px] leading-tight mb-1">{video.client}</h4>
              <p className="text-white/70 text-[13px]">{video.project}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ========================================= */}
      {/* GOOGLE REVIEWS SECTION                    */}
      {/* ========================================= */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="flex flex-col sm:flex-row items-center justify-between mb-10 border-b border-gray-200 pb-6"
        >
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <GoogleIcon />
            <div>
              <h2 className="text-[#4a1c13] font-bold text-[20px] leading-tight">Excellent</h2>
              <div className="flex items-center gap-1 text-[13px] text-gray-500">
                <span className="font-bold text-[#4a1c13]">4.9/5</span> based on 45+ reviews
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ backgroundColor: "#f3f4f6" }}
            className="px-6 py-2.5 rounded-full border border-gray-200 text-[14px] font-bold text-[#4a1c13] transition-colors"
          >
            Write a review
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {googleReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="bg-white border border-gray-100 rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name, Date, Google Icon */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-3 items-center">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-11 h-11 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <h4 className="text-[#4a1c13] font-bold text-[15px] leading-tight mb-0.5">
                        {review.name}
                      </h4>
                      <p className="text-[12px] text-gray-400">
                        {review.date}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-70 scale-90">
                    <GoogleIcon />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex items-center space-x-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-[18px] h-[18px] ${
                        i < review.rating ? "text-[#FBBC05]" : "text-gray-200"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Review Text */}
                <p className="text-[#6B5C57] text-[14.5px] leading-[1.7]">
                  "{review.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ========================================= */}
      {/* BOTTOM CTA                                */}
      {/* ========================================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: smoothEase, delay: 0.4 }}
        className="mt-32 text-center"
      >
        <h2 className="text-[clamp(28px,4vw,40px)] text-[#4a1c13] font-primary mb-6">
          Ready to create your own story?
        </h2>
        <Link to="/contact">
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#e65a2d" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3, ease: smoothEase }}
            className="bg-[#ff7043] text-white px-8 py-4 rounded-full text-[15px] font-bold tracking-wide shadow-lg shadow-[#ff7043]/30"
          >
            Start Your Project
          </motion.button>
        </Link>
      </motion.div>
      
    </main>
  );
};

export default Testimonials;