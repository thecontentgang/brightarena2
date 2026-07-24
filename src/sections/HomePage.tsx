"use client";

import React, { Suspense } from 'react';
import SEO from '../components/SEO';

// ─── EAGER IMPORTS (ABOVE THE FOLD) ───
import Hero from './HeroSection';
import About from './AboutSection';
import TrustedBy from './TrustBy';
import ProjectShowcase from './ProjectShowcase';

// ─── LAZY IMPORTS (BELOW THE FOLD) ───
const Services = React.lazy(() => import('./ServicesSection'));
const Philosophy = React.lazy(() => import('./PhilosophySection'));
const TestimonialsSection = React.lazy(() => import('./TestimonialSection'));

// A minimal, on-brand loading skeleton for suspended components
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#f7f4ee]" aria-hidden="true">
    <div className="w-6 h-6 border-2 border-[#4a1c13]/20 border-t-[#ff7043] rounded-full animate-spin" />
  </div>
);

const HomePage = () => {
  return (
    <>
      <SEO
        title="Best Interior Designers in Hyderabad for Luxury Home Interiors"
        description="Looking for Interior Designers in Hyderabad? Bright Arena Interiors delivers luxury home and office interiors with 14+ years of expertise and craftsmanship."
        keywords="Interior Designers Hyderabad, Luxury Interior Designers, Home Interior Design, Office Interiors, Commercial Interior Designers, Residential Interior Designers, Modular Kitchen Designers"
        url="https://www.brightarenainteriors.com/"
      />
      <main id="main-content" className="bg-[#f7f4ee] overflow-x-hidden antialiased">
        {/* ── PRIORITY SECTIONS ── */}
        <Hero />
        <About />
        <TrustedBy />

        {/* ── DEFERRED SECTIONS ── */}
        <Suspense fallback={<SectionLoader />}>
          <Services />
          <Philosophy />
          <ProjectShowcase />
          <TestimonialsSection />
        </Suspense>
      </main>
    </>
  );
};

export default HomePage;