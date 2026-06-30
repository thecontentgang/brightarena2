"use client";

import { motion } from "framer-motion";

// Explicitly typed easing tuple to satisfy TypeScript
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: smoothEase } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

// URL-encoded address for the Google Maps iframe
const mapAddress = encodeURIComponent("4th Floor, 23 Nordwest, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500081");

export default function ContactPage() {
  return (
    <div className="bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
      
      {/* ── HERO SECTION ── */}
      <section className="pt-32 pb-12 md:pt-48 md:pb-16 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="text-[#ff7043] text-xs md:text-sm tracking-[0.3em] uppercase font-bold block mb-6"
        >
          Get In Touch
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: smoothEase, delay: 0.1 }}
          className="text-[clamp(40px,7vw,96px)] font-primary font-light leading-[1.05] tracking-tight mb-8"
        >
          Let's build something <br />
          <span className="italic font-serif text-[#ff7043]">beautiful.</span>
        </motion.h1>
      </section>

      {/* ── SPLIT CONTENT: INFO & FORM ── */}
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* LEFT COLUMN: Contact Details & Image */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="flex flex-col gap-12"
          >
            {/* Atmospheric Image */}
            <motion.div variants={fadeUp} className="w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#e8e5de]">
              <img 
                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop" 
                alt="Bright Arena Studio Materials"
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Address */}
              <motion.div variants={fadeUp}>
                <h3 className="text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4">
                  Headquarters
                </h3>
                <address className="not-italic text-[#4a1c13] text-base leading-relaxed font-medium">
                  4th Floor, 23 Nordwest, <br />
                  P Janardhan Reddy Nagar, <br />
                  Gachibowli, Hyderabad, <br />
                  Telangana 500081
                </address>
              </motion.div>

              {/* Direct Contact */}
              <motion.div variants={fadeUp} className="flex flex-col gap-8">
                <div>
                  <h3 className="text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4">
                    Direct
                  </h3>
                  <div className="flex flex-col gap-2 font-medium">
                    <a href="tel:+918978222980" className="hover:text-[#ff7043] transition-colors duration-300">
                      +91-8978222980
                    </a>
                    <a href="mailto:info@brightarena.com" className="hover:text-[#ff7043] transition-colors duration-300">
                      info@brightarena.com
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4">
                    Follow Us
                  </h3>
                  <div className="flex items-center gap-4">
                    {["Instagram", "Facebook", "LinkedIn"].map((social) => (
                      <a 
                        key={social}
                        href="#" 
                        className="text-sm font-medium hover:text-[#ff7043] transition-colors duration-300"
                      >
                        {social}
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: smoothEase, delay: 0.2 }}
            className="bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-sm border border-[#4a1c13]/5"
          >
            <h2 className="text-3xl font-primary mb-2">Project Inquiry</h2>
            <p className="text-[#4a1c13]/60 text-sm mb-10 leading-relaxed">
              Please provide a few details about your project, and our design team will get back to you within 24-48 hours.
            </p>

            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              
              {/* Form Row: Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60">
                    Full Name *
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60">
                    Email Address *
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Form Row: Phone & Project Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone"
                    className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="type" className="text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60">
                    Project Type
                  </label>
                  <select 
                    id="type"
                    defaultValue=""
                    className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors appearance-none rounded-none cursor-pointer"
                  >
                    <option value="" disabled>Select a category...</option>
                    <option value="residential">Residential Interior</option>
                    <option value="commercial">Commercial / Office</option>
                    <option value="architecture">Architecture</option>
                    <option value="furniture">Bespoke Furniture</option>
                  </select>
                </div>
              </div>

              {/* Message Area */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60">
                  Project Details
                </label>
                <textarea 
                  id="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors resize-none rounded-none"
                  placeholder="Tell us about your vision, timeline, and space..."
                ></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="mt-4 bg-[#4a1c13] text-white py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ff7043] transition-colors duration-500 w-full md:w-auto md:px-12 self-start"
              >
                Send Inquiry
              </button>

            </form>
          </motion.div>

        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <section className="px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center text-center mb-4">
            <h2 className="text-2xl md:text-4xl font-primary leading-tight mb-3">
              Visit Our Studio
            </h2>
            <p className="text-[#4a1c13]/60 text-sm md:text-base max-w-md">
              We'd love to host you for a coffee and a conversation about your upcoming project.
            </p>
          </div>

          {/* Interactive Map Container */}
          <div className="w-full h-[350px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-sm border border-[#4a1c13]/5 group bg-[#e8e5de]">
            
            {/* 
              The filter class makes the map grayscale by default to match the luxury theme. 
              When the user hovers over it, the group-hover removes the grayscale so they can navigate easily.
            */}
            <iframe 
              src={`https://maps.google.com/maps?q=${mapAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[80%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700 ease-in-out"
            />
            
          </div>
        </motion.div>
      </section>

    </div>
  );
}