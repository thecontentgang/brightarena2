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

const sqFtRanges = ["< 500", "500 - 1000", "1000 - 2000", "2000+"];

// Added Indian Rupee budget ranges to match your Hyderabad location
const budgetRanges = ["Under ₹10L", "₹10L - 25L", "₹25L - 50L", "₹50L+"];

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  // Form State
  const [projectType, setProjectType] = useState<"Residential" | "Commercial">("Residential");
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedSqFt, setSelectedSqFt] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<string>(""); // New Budget State

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Reset state when closed
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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 antialiased">
          {/* Backdrop with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: smoothEase }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md bg-white rounded-[1.25rem] sm:rounded-[1.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] flex flex-col max-h-[95vh] sm:max-h-[90vh]"
            onClick={(e) => e.stopPropagation()} 
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3 sm:px-6 sm:pt-6 sm:pb-4 border-b border-gray-100 shrink-0">
              <div>
                <h3 id="modal-title" className="text-[17px] sm:text-[20px] font-bold text-[#4a1c13] leading-tight font-primary">
                  Start Your Project
                </h3>
                <p className="text-[11px] sm:text-[13px] text-[#6B5C57] mt-0.5 sm:mt-1">
                  Fill out the details below to get a quick quote.
                </p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#4a1c13] transition-colors shrink-0 ml-3"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="sm:w-[14px] sm:h-[14px]" aria-hidden="true">
                  <path d="M13 1L1 13M1 1l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar">
              <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
                
                {/* Name & Number Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="client-name" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">Name</label>
                    <input
                      id="client-name"
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] sm:text-[14px] rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-2.5 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-1 sm:space-y-1.5">
                    <label htmlFor="client-phone" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">
                      Phone
                    </label>
                    <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-lg sm:rounded-xl focus-within:ring-2 focus-within:ring-[#ff7043]/30 focus-within:border-[#ff7043] transition-all overflow-hidden">
                      <span className="pl-3 sm:pl-4 pr-2 text-[#4a1c13]/60 text-[13px] sm:text-[14px] font-medium select-none border-r border-gray-200">
                        +91
                      </span>
                      <input
                        id="client-phone"
                        type="tel"
                        placeholder="Mobile number"
                        className="w-full bg-transparent text-[#4a1c13] text-[13px] sm:text-[14px] px-3 py-2 sm:px-3 sm:py-2.5 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Project Type (Segmented Control) */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label id="project-type-label" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">Project Type</label>
                  <div 
                    role="radiogroup" 
                    aria-labelledby="project-type-label"
                    className="flex p-1 bg-gray-100 rounded-lg sm:rounded-xl relative"
                  >
                    <motion.div
                      className="absolute inset-y-1 bg-white rounded-md sm:rounded-lg shadow-sm"
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
                        className={`relative w-1/2 py-1.5 sm:py-2.5 text-[12px] sm:text-[13px] font-bold tracking-wide rounded-md sm:rounded-lg transition-colors z-10 ${
                          projectType === type ? "text-[#4a1c13]" : "text-gray-500 hover:text-[#4a1c13]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Services (Radio Pill Grid) */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label id="service-req-label" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">Service Required</label>
                  <div role="radiogroup" aria-labelledby="service-req-label" className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        type="button"
                        role="radio"
                        aria-checked={selectedService === service}
                        onClick={() => setSelectedService(service)}
                        className={`py-1.5 px-2 sm:py-2 sm:px-3 text-[11.5px] sm:text-[13px] font-medium rounded-lg sm:rounded-xl border transition-all duration-200 leading-tight ${
                          selectedService === service
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" required value={selectedService} />
                </div>

                {/* Area / Sq Ft (Radio Pill Grid) */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label id="area-label" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">Area (Sq Ft)</label>
                  <div role="radiogroup" aria-labelledby="area-label" className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {sqFtRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedSqFt === range}
                        onClick={() => setSelectedSqFt(range)}
                        className={`py-1.5 px-1 sm:py-2 sm:px-1 text-[11.5px] sm:text-[13px] font-medium rounded-lg sm:rounded-xl border transition-all duration-200 whitespace-nowrap ${
                          selectedSqFt === range
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" required value={selectedSqFt} />
                </div>

                {/* Budget (Radio Pill Grid) */}
                <div className="space-y-1 sm:space-y-1.5">
                  <label id="budget-label" className="text-[11px] sm:text-[12px] font-bold text-[#4a1c13] uppercase tracking-wide">Estimated Budget</label>
                  <div role="radiogroup" aria-labelledby="budget-label" className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedBudget === range}
                        onClick={() => setSelectedBudget(range)}
                        className={`py-1.5 px-1 sm:py-2 sm:px-1 text-[11.5px] sm:text-[13px] font-medium rounded-lg sm:rounded-xl border transition-all duration-200 whitespace-nowrap ${
                          selectedBudget === range
                            ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm"
                            : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                  <input type="hidden" required value={selectedBudget} />
                </div>

                {/* Submit Button */}
                <div className="pt-1 sm:pt-2">
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "#e65a2d" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-[#ff7043] text-white py-2.5 sm:py-3.5 rounded-lg sm:rounded-xl text-[14px] sm:text-[15px] font-bold tracking-wide shadow-md shadow-[#ff7043]/20 transition-colors"
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