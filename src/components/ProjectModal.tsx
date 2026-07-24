"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Premium Apple-like easing curve
const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const servicesList = [
  "Full Interior Design",
  "Renovation",
  "Consultation",
  "Custom Furniture",
];

// 3 items: Perfectly fits in a 3-column grid to save a vertical row
const sqFtRanges = ["1000 - 2000", "2000 - 3000", "3000+"];

const budgetRanges = ["₹15L - 25L", "₹25L - 40L", "₹40L - 50L", "₹50L+"];

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [projectType, setProjectType] = useState<"Residential" | "Commercial">("Residential");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSqFt, setSelectedSqFt] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Optional: For a true iOS-style background push, you can scale down your main app wrapper here.
      // const root = document.getElementById('root'); 
      // if (root) { root.style.transform = 'scale(0.97)'; root.style.transition = 'transform 0.4s ease'; }
    } else {
      document.body.style.overflow = "unset";
      // const root = document.getElementById('root'); 
      // if (root) root.style.transform = 'scale(1)';
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setProjectType("Residential");
        setSelectedService("");
        setSelectedSqFt("");
        setSelectedBudget("");
      }, 300);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 antialiased">
          
          {/* Backdrop - Darker with stronger blur for a premium background response */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container - Tightened up for maximum compactness */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md bg-white rounded-[1.25rem] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100 bg-white z-10">
              <div>
                <h3 id="modal-title" className="text-[18px] font-bold text-[#4a1c13] leading-tight font-primary">
                  Start Your Project
                </h3>
                <p className="text-[12px] text-[#6B5C57] mt-0.5">
                  Fill out the details below for a quick quote.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#4a1c13] transition-colors shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M13 1L1 13M1 1l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content - Scrollbar completely hidden, tight vertical spacing */}
            <div className="p-5 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name & Number Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="client-name" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Name</label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="client-phone" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Phone</label>
                    <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-lg focus-within:ring-2 focus-within:ring-[#ff7043]/30 focus-within:border-[#ff7043] transition-all overflow-hidden">
                      <span className="pl-3 pr-1.5 text-[#4a1c13]/60 text-[13px] font-medium select-none border-r border-gray-200">
                        +91
                      </span>
                      <input
                        id="client-phone"
                        type="tel"
                        placeholder="Mobile number"
                        className="w-full bg-transparent text-[#4a1c13] text-[13px] px-2 py-2 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type */}
                <div className="space-y-1">
                  <label id="project-type-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Project Type</label>
                  <div role="radiogroup" aria-labelledby="project-type-label" className="flex p-1 bg-gray-100 rounded-lg relative">
                    <motion.div
                      className="absolute inset-y-1 bg-white rounded-md shadow-sm"
                      initial={false}
                      animate={{ 
                        left: projectType === "Residential" ? "4px" : "50%", 
                        width: "calc(50% - 4px)" 
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    {["Residential", "Commercial"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={projectType === type}
                        onClick={() => setProjectType(type as "Residential" | "Commercial")}
                        className={`relative w-1/2 py-1.5 text-[12px] font-bold tracking-wide rounded-md transition-colors z-10 ${
                          projectType === type ? "text-[#4a1c13]" : "text-gray-500 hover:text-[#4a1c13]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service Required */}
                <div className="space-y-1">
                  <label id="service-req-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Service Required</label>
                  <div role="radiogroup" aria-labelledby="service-req-label" className="grid grid-cols-2 gap-1.5">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        type="button"
                        role="radio"
                        aria-checked={selectedService === service}
                        onClick={() => setSelectedService(service)}
                        className={`py-1.5 px-2 text-[11px] font-medium rounded-lg border transition-all duration-200 ${
                          selectedService === service
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area - Forced to 3 columns to keep it in a single row */}
                <div className="space-y-1">
                  <label id="area-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Area (Sq Ft)</label>
                  <div role="radiogroup" aria-labelledby="area-label" className="grid grid-cols-3 gap-1.5">
                    {sqFtRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedSqFt === range}
                        onClick={() => setSelectedSqFt(range)}
                        className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
                          selectedSqFt === range
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget */}
                <div className="space-y-1">
                  <label id="budget-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">Estimated Budget</label>
                  <div role="radiogroup" aria-labelledby="budget-label" className="grid grid-cols-2 gap-1.5">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedBudget === range}
                        onClick={() => setSelectedBudget(range)}
                        className={`py-1.5 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
                          selectedBudget === range
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#e65a2d" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#ff7043] text-white py-2.5 rounded-lg text-[13px] font-bold tracking-wide shadow-md shadow-[#ff7043]/20 transition-colors"
                  >
                    Submit Request
                  </motion.button>
                </div>
                
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;