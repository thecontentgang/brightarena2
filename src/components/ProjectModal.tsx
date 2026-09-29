"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ProjectType = "Residential" | "Commercial";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const servicesList = ["Full Interior Design", "Renovation", "Consultation", "Custom Furniture"];
const sqFtRanges = ["1000 - 2000", "2000 - 3000", "3000+"];
const budgetRanges = ["₹15L - 25L", "₹25L - 40L", "₹40L - 50L", "₹50L+"];

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("Residential");
  const [selectedService, setSelectedService] = useState("");
  const [selectedSqFt, setSelectedSqFt] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setProjectType("Residential");
    setSelectedService("");
    setSelectedSqFt("");
    setSelectedBudget("");
    setSubmitStatus("idle");
  };

  const handleClose = () => {
    if (submitStatus === "sending") return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submitStatus === "sending") return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS environment variables are missing.");
      setSubmitStatus("error");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim() || cleanPhone.length !== 10 || !emailRegex.test(email) || !selectedService || !selectedSqFt || !selectedBudget) {
      setSubmitStatus("error");
      return;
    }

    try {
      setSubmitStatus("sending");

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: name.trim(),
          phone: cleanPhone,
          email: email.trim(),
          project_type: projectType,
          service: selectedService,
          area: selectedSqFt,
          budget: selectedBudget,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );

      setSubmitStatus("success");

      setTimeout(() => {
        resetForm();
        onClose();
      }, 1800);
    } catch (error) {
      console.error("EmailJS project enquiry error:", error);
      setSubmitStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 antialiased">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md cursor-pointer"
            onClick={handleClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.4, ease: smoothEase }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative w-full max-w-md max-h-[92vh] sm:max-h-[90vh] bg-white rounded-[1.25rem] shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-gray-100 bg-white z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-[#ff7043]/10 text-[#ff7043] text-[9px] font-bold uppercase tracking-[0.14em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff7043]" />
                  Start Your Project
                </div>
                <h3 id="modal-title" className="text-[18px] sm:text-[19px] font-bold text-[#4a1c13] leading-tight font-primary">
                  Tell us about your project
                </h3>
                <p className="text-[12px] text-[#6B5C57] mt-1">
                  Share a few details and we'll get back to you.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                disabled={submitStatus === "sending"}
                aria-label="Close modal"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#4a1c13] transition-colors shrink-0 disabled:opacity-40"
              >
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M13 1L1 13M1 1l12 12" />
                </svg>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-5 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                {/* Name + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label htmlFor="client-name" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      id="client-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      autoComplete="name"
                      className="w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="client-phone" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                      Phone
                    </label>
                    <div className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ff7043]/30 focus-within:border-[#ff7043] transition-all">
                      <span className="pl-3 pr-2 text-[#4a1c13]/60 text-[13px] font-medium select-none border-r border-gray-200 py-2.5">
                        +91
                      </span>
                      <input
                        id="client-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setPhone(value);
                        }}
                        placeholder="Mobile number"
                        autoComplete="tel"
                        inputMode="numeric"
                        className="w-full bg-transparent text-[#4a1c13] text-[13px] px-2 py-2.5 placeholder:text-gray-400 focus:outline-none"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label htmlFor="client-email" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    id="client-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    className="w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all"
                    required
                  />
                </div>

                {/* Project Type */}
                <div className="space-y-1.5">
                  <label id="project-type-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                    Project Type
                  </label>
                  <div role="radiogroup" aria-labelledby="project-type-label" className="flex p-1 bg-gray-100 rounded-lg relative">
                    <motion.div
                      className="absolute inset-y-1 bg-white rounded-md shadow-sm"
                      initial={false}
                      animate={{
                        left: projectType === "Residential" ? "4px" : "50%",
                        width: "calc(50% - 4px)",
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    {(["Residential", "Commercial"] as ProjectType[]).map((type) => (
                      <button
                        key={type}
                        type="button"
                        role="radio"
                        aria-checked={projectType === type}
                        onClick={() => setProjectType(type)}
                        className={`relative w-1/2 py-2 text-[12px] font-bold tracking-wide rounded-md transition-colors z-10 ${
                          projectType === type ? "text-[#4a1c13]" : "text-gray-500 hover:text-[#4a1c13]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Service */}
                <div className="space-y-1.5">
                  <label id="service-req-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                    Service Required
                  </label>
                  <div role="radiogroup" aria-labelledby="service-req-label" className="grid grid-cols-2 gap-1.5">
                    {servicesList.map((service) => (
                      <button
                        key={service}
                        type="button"
                        role="radio"
                        aria-checked={selectedService === service}
                        onClick={() => setSelectedService(service)}
                        className={`py-2 px-2 text-[11px] font-medium rounded-lg border transition-all duration-200 ${
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

                {/* Area */}
                <div className="space-y-1.5">
                  <label id="area-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                    Area (Sq Ft)
                  </label>
                  <div role="radiogroup" aria-labelledby="area-label" className="grid grid-cols-3 gap-1.5">
                    {sqFtRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedSqFt === range}
                        onClick={() => setSelectedSqFt(range)}
                        className={`py-2 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
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
                <div className="space-y-1.5">
                  <label id="budget-label" className="text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide">
                    Estimated Budget
                  </label>
                  <div role="radiogroup" aria-labelledby="budget-label" className="grid grid-cols-2 gap-1.5">
                    {budgetRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="radio"
                        aria-checked={selectedBudget === range}
                        onClick={() => setSelectedBudget(range)}
                        className={`py-2 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${
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

                {/* Submit */}
                <div className="pt-1">
                  <motion.button
                    whileHover={submitStatus !== "sending" ? { scale: 1.02, backgroundColor: "#e65a2d" } : undefined}
                    whileTap={submitStatus !== "sending" ? { scale: 0.98 } : undefined}
                    type="submit"
                    disabled={submitStatus === "sending"}
                    className="w-full bg-[#ff7043] text-white py-3 rounded-lg text-[13px] font-bold tracking-wide shadow-md shadow-[#ff7043]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitStatus === "sending" ? "Sending Request..." : "Submit Request"}
                  </motion.button>

                  {/* Success */}
                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center"
                      >
                        <p className="text-[12px] font-semibold text-green-700">✓ Request sent successfully</p>
                        <p className="text-[11px] text-green-600 mt-1">Our team will contact you shortly.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error */}
                  <AnimatePresence>
                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -8, height: 0 }}
                        className="mt-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-center"
                      >
                        <p className="text-[12px] font-semibold text-red-700">Unable to send your request</p>
                        <p className="text-[11px] text-red-600 mt-1">Please check your details and try again.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <p className="text-[9px] text-gray-400 text-center mt-2.5">
                    Your information is only used to contact you about your project.
                  </p>
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
