import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransitionLayout from './components/PageTransitionLayout';
import FloatingSocialBar from './components/SocialMediaBar';
import Breadcrumb from './components/BreadCrumb';

// Lazy Load Pages
const HomePage = React.lazy(() => import('./sections/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'));
const ServiceDetailsPage = React.lazy(() => import('./pages/ServiceDetails'));
const PortfolioPage = React.lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailsPage = React.lazy(() => import('./pages/ProjectDetails'));
const DesignPage = React.lazy(() => import('./pages/DesignsPage'));
const DesignDetailsPage = React.lazy(() => import('./pages/DesignDetails'));
const BlogsPage = React.lazy(() => import('./pages/BlogPage'));
const MasteringLightingInvisibleArchitecture = React.lazy(() => import('./pages/blogs/MasteringLightingInvisibleArchitecture'));
const HowToChooseTheBestInteriorDesignerInHyderabad = React.lazy(() => import('./pages/blogs/HowToChooseTheBestInteriorDesignerInHyderabad'));
const ModularKitchenCostInHyderabadCompleteGuide2026 = React.lazy(() => import('./pages/blogs/ModularKitchenCostInHyderabadCompleteGuide2026'));
const SmallHomeInteriorDesignIdeas = React.lazy(() => import('./pages/blogs/SmallHomeInteriorDesignIdeas'));
const BedroomInteriorDesignIdeas = React.lazy(() => import('./pages/blogs/BedroomInteriorDesignIdeas'));
const LivingRoomInteriorDesignIdeas = React.lazy(() => import('./pages/blogs/LivingRoomInteriorDesignIdeas'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TestimonialPage = React.lazy(() => import('./pages/TestimonialPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

// Lazy Load Location SEO Pages
const HitecCityPage = React.lazy(() => import('./pages/HitecCityInteriorDesignerPage'));
const GachibowliPage = React.lazy(() => import('./pages/GachibowliInteriorDesignerPage'));
const KondapurPage = React.lazy(() => import('./pages/KondapurInteriorDesignerPage'));
const MadhapurPage = React.lazy(() => import('./pages/MadhapurInteriorDesignerPage'));
const WhitefieldsPage = React.lazy(() => import('./pages/WhitefieldsInteriorDesignerPage'));

const Loader = () => (
  <div className="flex justify-center items-center h-screen bg-[#f7f4ee]">
    <div className="w-12 h-12 border-4 border-[#4a1c13] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <>
      <Navbar />
      <FloatingSocialBar />
      <Breadcrumb />

      <main>
        <PageTransitionLayout>
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Core Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailsPage />} />
              <Route path="/designs" element={<DesignPage />} />
              <Route path="/designs/:slug" element={<DesignDetailsPage />} />
              <Route path="/testimonials" element={<TestimonialPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/mastering-lighting-invisible-architecture" element={<MasteringLightingInvisibleArchitecture />} />
              <Route path="/blogs/how-to-choose-the-best-interior-designer-in-hyderabad" element={<HowToChooseTheBestInteriorDesignerInHyderabad />} />
              <Route path="/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026" element={<ModularKitchenCostInHyderabadCompleteGuide2026 />} />
              <Route path="/blogs/small-home-interior-design-ideas" element={<SmallHomeInteriorDesignIdeas />} />
              <Route path="/blogs/bedroom-interior-design-ideas" element={<BedroomInteriorDesignIdeas />} />
              <Route path="/blogs/living-room-interior-design-ideas" element={<LivingRoomInteriorDesignIdeas />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

              {/* Location SEO Routes */}
              <Route path="/interior-designer-hitech-city" element={<HitecCityPage />} />
              <Route path="/interior-designer-gachibowli" element={<GachibowliPage />} />
              <Route path="/interior-designer-kondapur" element={<KondapurPage />} />
              <Route path="/interior-designer-madhapur" element={<MadhapurPage />} />
              <Route path="/interior-designer-whitefields" element={<WhitefieldsPage />} />

              {/* 404 Catch-All */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </PageTransitionLayout>
      </main>

      <Footer />
    </>
  );
};

export default App;