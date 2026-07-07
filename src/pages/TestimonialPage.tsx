"use client";
import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ==========================================
// 1. ADD YOUR YOUTUBE VIDEOS HERE
// ==========================================
const videoTestimonials = [
  {
    id: 1,
    client: "The Weston Family",
    project: "Luxury Condo Transformation",
    duration: "41",
    youtubeId: "aZq2QRwiYsE", // <-- Replace with your YouTube Video ID
  },
  {
    id: 2,
    client: "David Chen",
    project: "Boutique Corporate Office",
    duration: "1:30",
    youtubeId: "ztyqShdYSEY", // <-- Replace with your YouTube Video ID
  },
  {
    id: 3,
    client: "Eleanor Richards",
    project: "Modern Minimalist Villa",
    duration: "2:33",
    youtubeId: "fc27D9buInM", // <-- Replace with your YouTube Video ID
  },
];

// ==========================================
// 2. PASTE YOUR ACTUAL GOOGLE REVIEWS HERE
// ==========================================
interface GoogleReview {
  id: number;
  author_name: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

const staticReviews: GoogleReview[] = [
  {
    id: 1,
    author_name: "Jhansi Janu",
    profile_photo_url: "https://i.pravatar.cc/150?img=47", // <-- Link to their profile picture
    rating: 5,
    relative_time_description: "11 months ago",
    text: "Bright Arena Interiors completely changed the look of my home with their amazing work. Their designs are very classy and gave my space a luxury feel. The team was very professional, always on time, and handled everything smoothly.If you are searching for the best luxury interior designers in Hyderabad, Bright Arena Interiors is the right choice. I’m really happy with the final result and would definitely suggest them to anyone.",
  },
  {
    id: 2,
    author_name: "Kavya ketha",
    profile_photo_url: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    relative_time_description: "8 months ago",
    text: "Mind-blowing! I've never seen this type of interior work before.",
  },
  {
    id: 3,
    author_name: "rajesh shankar pandey",
    profile_photo_url: "https://i.pravatar.cc/150?img=9",
    rating: 5,
    relative_time_description: "4 months ago",
    text: "Bright Arena Interiors transformed our ideal home into a reality. Their inventive designs and attention to detail are unparalleled. They built a gorgeous and useful environment, and we couldn't be happier. Thank you for making our home a true representation of our personal style.",
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
  // Keeps track of which video IDs are playing inline
  const [playingVideos, setPlayingVideos] = useState<Record<number, boolean>>({});

  const handlePlayVideo = (id: number) => {
    setPlayingVideos((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24 antialiased overflow-hidden">
      
      {/* HERO SECTION */}
      <motion.div
        className="w-full max-w-4xl mx-auto text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: smoothEase }}
      >
        <h1 className="text-[clamp(36px,5vw,64px)] leading-[1.1] mb-6 pt-6 text-[#4a1c13] font-primary font-light">
          Don't just take our <br className="hidden sm:block" />
          <span className="text-[#C4623A] italic">word for it.</span>
        </h1>
        <p className="max-w-2xl mx-auto text-[16px] leading-[1.8] text-[#6B5C57]">
          Watch and read what our clients have to say about their experience working with us to bring their dream spaces to life.
        </p>
      </motion.div>

      {/* VIDEO TESTIMONIALS (INLINE PLAYBACK) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24"
      >
        {videoTestimonials.map((video) => {
          const isPlaying = playingVideos[video.id];

          return (
            <motion.div
              key={video.id}
              variants={cardVariants}
              whileHover={!isPlaying ? { y: -5 } : {}}
              className="group relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-white border border-gray-100 shadow-md transition-shadow duration-300 hover:shadow-lg"
            >
              <AnimatePresence mode="wait">
                {isPlaying ? (
                  // Live YouTube Player replacing the placeholder
                  <motion.div
                    key="video-player"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full h-full bg-black"
                  >
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
                      title={video.client}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </motion.div>
                ) : (
                  // Premium Minimalist Placeholder
                  <motion.div
                    key="video-placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => handlePlayVideo(video.id)}
                    className="absolute inset-0 flex flex-col justify-between p-8 cursor-pointer bg-gradient-to-br from-[#fdfbfb] to-[#ebedee]"
                  >
                    {/* Top Row: Duration Tag */}
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] uppercase tracking-widest bg-[#4a1c13]/5 text-[#4a1c13] px-3 py-1 rounded-full border border-[#4a1c13]/10 font-medium">
                        {video.duration}
                      </span>
                    </div>

                    {/* Middle: Custom Glassmorphism Play Button */}
                    <div className="flex items-center justify-center my-auto">
                      <div className="w-16 h-16 rounded-full bg-[#4a1c13]/5 flex items-center justify-center border border-[#4a1c13]/10 transition-all duration-500 group-hover:scale-110 group-hover:bg-[#ff7043] group-hover:border-transparent">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-[#4a1c13] group-hover:text-white transition-colors duration-300">
                          <path d="M5 3l14 9-14 9V3z" />
                        </svg>
                      </div>
                    </div>

                    {/* Bottom: Project Description Details */}
                    <div className="border-t border-gray-200/60 pt-4">
                      <h4 className="font-bold text-[18px] text-[#4a1c13] leading-tight mb-1">
                        {video.client}
                      </h4>
                      <p className="text-[#6B5C57] text-[13px]">
                        {video.project}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* GOOGLE REVIEWS SECTION (HARDCODED) */}
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
                <span className="font-bold text-[#4a1c13]">4.9/5</span> based on Google Reviews
              </div>
            </div>
          </div>
          <a href="YOUR_GMB_REVIEW_LINK" target="_blank" rel="noreferrer">
            <motion.button
              whileHover={{ backgroundColor: "#f3f4f6" }}
              className="px-6 py-2.5 rounded-full border border-gray-200 text-[14px] font-bold text-[#4a1c13] transition-colors"
            >
              Write a review
            </motion.button>
          </a>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {staticReviews.map((review) => (
            <motion.div
              key={review.id}
              variants={cardVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.4, ease: smoothEase }}
              className="bg-white border border-gray-100 rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-3 items-center">
                    <img 
                      src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${review.author_name}`} 
                      alt={review.author_name} 
                      className="w-11 h-11 rounded-full object-cover border border-gray-100"
                    />
                    <div>
                      <h4 className="text-[#4a1c13] font-bold text-[15px] leading-tight mb-0.5">
                        {review.author_name}
                      </h4>
                      <p className="text-[12px] text-gray-400">
                        {review.relative_time_description}
                      </p>
                    </div>
                  </div>
                  <div className="opacity-70 scale-90">
                    <GoogleIcon />
                  </div>
                </div>

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
                
                <p className="text-[#6B5C57] text-[14.5px] leading-[1.7]">
                  "{review.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* BOTTOM CTA */}
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