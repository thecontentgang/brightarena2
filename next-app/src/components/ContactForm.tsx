"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  EMPTY_CONTACT_FORM,
  PROJECT_TYPE_OPTIONS,
  buildContactTemplateParams,
  validateContactForm,
  type ContactFormErrors,
  type ContactFormValues,
} from "@/lib/contactForm";

// Same EmailJS service and public key as the Talk Now popup, with a separate template for Contact page enquiries.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const EMAILJS_CONTACT_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const inputClass =
  "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none";
const labelClass = "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60";

type Status = "idle" | "sending" | "success" | "error";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[11px] text-red-600">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(EMPTY_CONTACT_FORM);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: keyof ContactFormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    if (status === "success" || status === "error") setStatus("idle");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    const found = validateContactForm(values);
    if (Object.keys(found).length) {
      setErrors(found);
      setStatus("error");
      const first = (["name", "email", "phone", "message"] as const).find((f) => found[f]);
      if (first) formRef.current?.querySelector<HTMLElement>(`#${first}`)?.focus();
      return;
    }

    if (!EMAILJS_SERVICE_ID || !EMAILJS_CONTACT_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error("EmailJS environment variables for the Contact page form are missing.");
      setStatus("error");
      return;
    }

    try {
      setStatus("sending");
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_CONTACT_TEMPLATE_ID, buildContactTemplateParams(values), {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      // Clear the form only after a successful send; on failure the visitor keeps what they typed.
      setValues(EMPTY_CONTACT_FORM);
      setErrors({});
      setStatus("success");
    } catch (error) {
      console.error("EmailJS contact enquiry error:", error);
      setStatus("error");
    }
  };

  const a11y = (field: keyof ContactFormValues) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
  });

  return (
    <form ref={formRef} className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
      {/* Form Row: Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            autoComplete="name"
            value={values.name}
            onChange={update("name")}
            {...a11y("name")}
            className={inputClass}
            placeholder="John Doe"
          />
          <FieldError id="name-error" message={errors.name} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={update("email")}
            {...a11y("email")}
            className={inputClass}
            placeholder="john@example.com"
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      {/* Form Row: Phone & Project Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            autoComplete="tel"
            inputMode="tel"
            value={values.phone}
            onChange={update("phone")}
            {...a11y("phone")}
            className={inputClass}
            placeholder="+91 XXXXX XXXXX"
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className={labelClass}>
            Project Type
          </label>
          <select
            id="type"
            name="projectType"
            value={values.projectType}
            onChange={update("projectType")}
            className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors appearance-none rounded-none cursor-pointer"
          >
            <option value="" disabled>Select a category...</option>
            {PROJECT_TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          Project Details *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          value={values.message}
          onChange={update("message")}
          {...a11y("message")}
          className="w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors resize-none rounded-none"
          placeholder="Tell us about your vision, timeline, and space..."
        ></textarea>
        <FieldError id="message-error" message={errors.message} />
      </div>

      {/* Submit Button */}
      <div className="flex flex-col gap-0">
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-4 bg-[#4a1c13] text-white py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ff7043] transition-colors duration-500 w-full md:w-auto md:px-12 self-start disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {status === "sending" ? "Sending Inquiry..." : "Send Inquiry"}
        </button>

        {/* Status messages: same wording and styling as the Talk Now popup */}
        <div aria-live="polite">
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-4 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center"
              >
                <p className="text-[12px] font-semibold text-green-700">✓ Request sent successfully</p>
                <p className="text-[11px] text-green-600 mt-1">Our team will contact you shortly.</p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-center"
              >
                <p className="text-[12px] font-semibold text-red-700">Unable to send your request</p>
                <p className="text-[11px] text-red-600 mt-1">Please check your details and try again.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
