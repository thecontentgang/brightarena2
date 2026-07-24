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
const BlogDetailsPage = React.lazy(() => import('./pages/BlogDetails'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const TestimonialPage = React.lazy(() => import('./pages/TestimonialPage'));

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
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />}/>
              <Route path="/services/:slug" element={<ServiceDetailsPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/portfolio/:slug" element={<ProjectDetailsPage />} />
              <Route path="/designs" element={<DesignPage />} />
              <Route path="/designs/:slug" element={<DesignDetailsPage />} />
              <Route path="/testimonials" element={<TestimonialPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </PageTransitionLayout>
      </main>

      <Footer />
    </>
  );
};

export default App;