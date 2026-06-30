import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransitionLayout from './components/PageTransitionLayout'; // <-- Import the new wrapper

// Your Page Imports
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

const App = () => {
  return (
    <>
      <Navbar />
      
      <main>
        {/* Wrap your Routes in the new Layout */}
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
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </PageTransitionLayout>
      </main>

      <Footer />
    </>
  );
};

export default App;