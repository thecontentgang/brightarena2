import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransitionLayout from './components/PageTransitionLayout';

// Page Imports
import HomePage from './sections/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailsPage from './pages/ServiceDetails'; 
import PortfolioPage from './pages/ProjectsPage';
import ProjectDetailsPage from './pages/ProjectDetails';
import DesignPage from './pages/DesignsPage';
import BlogsPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import DesignDetailsPage from './pages/DesignDetails';
import BlogDetailsPage from './pages/BlogDetails';
import FloatingSocialBar from './components/SocialMediaBar';
import TestimonialPage from './pages/TestimonialPage';
import Breadcrumb from './components/BreadCrumb';


const App = () => {
  return (
    <>
      <Navbar />
      <FloatingSocialBar />
      <Breadcrumb />
      
      <main>
        <PageTransitionLayout>
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
        </PageTransitionLayout>
      </main>

      <Footer />
    </>
  );
};

export default App;