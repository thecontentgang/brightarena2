"use client";

import React, { Suspense, useEffect } from 'react';

// ─── EAGER IMPORTS (ABOVE THE FOLD) ───
// These load immediately to ensure a fast First Contentful Paint (FCP)
import Hero from './HeroSection';
import About from './AboutSection';
import TrustedBy from './TrustBy';

// ─── LAZY IMPORTS (BELOW THE FOLD) ───
// These are code-split and only downloaded after the initial render
const Services = React.lazy(() => import('./ServicesSection'));
const Philosophy = React.lazy(() => import('./PhilosophySection'));
// const ProjectsSection = React.lazy(() => import('./ProjectsSection'));
const TestimonialsSection = React.lazy(() => import('./TestimonialSection'));

// A minimal, on-brand loading skeleton for suspended components
const SectionLoader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#f7f4ee]" aria-hidden="true">
    <div className="w-6 h-6 border-2 border-[#4a1c13]/20 border-t-[#ff7043] rounded-full animate-spin" />
  </div>
);

const HomePage = () => {
  // ─── SEO ENHANCEMENT ───
  useEffect(() => {
    document.title = "Bright Arena | Luxury Interior Designers in Hyderabad";
  }, []);

  return (
    <main id="main-content" className="bg-[#f7f4ee] overflow-x-hidden antialiased">
      
      {/* ── PRIORITY SECTIONS ── */}
      <Hero />
      <About />
      <TrustedBy />

      {/* ── DEFERRED SECTIONS ── */}
      <Suspense fallback={<SectionLoader />}>
        <Services />
        <Philosophy />
        {/* <ProjectsSection /> */}
        <TestimonialsSection />
      </Suspense>
      
    </main>
  );
};

export default HomePage;