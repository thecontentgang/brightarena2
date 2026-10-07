"use client";

import SEO from "../components/SEO";
import { Link } from "react-router-dom";

export default function LuxuryPage() {
  return (
    <>
      <SEO />
      <article className="bg-[#f7f4ee] min-h-screen text-[#4a1c13] pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-primary mb-6">Luxury Interior Designers in Hyderabad</h2>
          <p className="text-lg opacity-80 mb-8 leading-relaxed">
            Welcome to Bright Arena Interiors, the premier destination for luxury home and commercial interior design in Hyderabad.
            We specialize in creating timeless, high-end spaces that reflect your lifestyle.
          </p>
          <Link 
            to="/portfolio" 
            className="inline-block bg-[#C4623A] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#A84E2C] transition-colors"
          >
            View Our Portfolio
          </Link>
        </div>
      </article>
    </>
  );
}
