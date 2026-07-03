
import Hero from './HeroSection'
import About from './AboutSection'
import Services from './ServicesSection'
import Philosophy from './PhilosophySection'
import ProjectsSection from './ProjectsSection'
import TestimonialsSection from './TestimonialSection'
import TrustedBy from './TrustBy'

const HomePage = () => {
  return (
   <>
   <Hero />
   <About />
   <TrustedBy />
   <Services />
   <Philosophy />
   <ProjectsSection />
   <TestimonialsSection />
   </>
  )
}

export default HomePage