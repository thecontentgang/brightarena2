export interface PageSEO {
  route: string;
  title: string;
  h1: string;
  description?: string;
  keywords?: string;
  canonical: string;
  ogImage?: string;
  type: "website" | "article";
  schemaType?: string;
  lastModified?: string;
}

export const pagesData: PageSEO[] = [
  {
    route: "/",
    title: "Interior Designers in Hyderabad for Homes and Offices | Bright Arena",
    h1: "Interior Designers in Hyderabad for Homes and Offices",
    description: "Bright Arena Interiors designs personalised home, luxury, office and commercial interiors in Hyderabad. Explore our work and book a consultation.",
    canonical: "https://www.brightarenainteriors.com/",
    type: "website"
  },
  {
    route: "/about/",
    title: "About Bright Arena Interiors | Hyderabad Interior Designers",
    h1: "About Bright Arena Interiors",
    canonical: "https://www.brightarenainteriors.com/about/",
    type: "website"
  },
  {
    route: "/services/",
    title: "Interior Design Services in Hyderabad | Bright Arena",
    h1: "Interior Design Services in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/services/",
    type: "website"
  },
  {
    route: "/services/home-interior-designs-hyderabad/",
    title: "Home Interior Designers in Hyderabad | Bright Arena",
    h1: "Home Interior Designers in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/services/home-interior-designs-hyderabad/",
    type: "website"
  },
  {
    route: "/services/commercial-interior-designers-in-hyderabad/",
    title: "Commercial Interior Designers in Hyderabad | Bright Arena",
    h1: "Commercial Interior Designers in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/services/commercial-interior-designers-in-hyderabad/",
    type: "website"
  },
  {
    route: "/services/office-interior-designers-in-hyderabad/",
    title: "Office Interior Designers in Hyderabad | Bright Arena",
    h1: "Office Interior Designers in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/services/office-interior-designers-in-hyderabad/",
    type: "website"
  },
  {
    route: "/services/2d-3d-interior-design-services-in-hyderabad/",
    title: "2D and 3D Interior Design Services in Hyderabad | Bright Arena",
    h1: "2D and 3D Interior Design Services in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/services/2d-3d-interior-design-services-in-hyderabad/",
    type: "website"
  },
  // Location pages: title, description and keywords come verbatim from "docs/seo/source-pdfs/LOcal Page Seo.pdf"
  {
    route: "/interior-designer-gachibowli/",
    title: "Interior Designers in Gachibowli, Hyderabad | Home & Office Interiors",
    h1: "Interior Designers in Gachibowli",
    description: "Explore customised home and office interiors in Gachibowli, Hyderabad with Bright Arena Interiors, including modular kitchens, wardrobes and turnkey interior solutions.",
    keywords: "interior designers in gachibowli, interior designer gachibowli, interior designers gachibowli hyderabad, interior design gachibowli, interior design company gachibowli, home interior designers gachibowli, home interiors gachibowli, residential interior designer gachibowli, luxury interior designers gachibowli, modular kitchen designer gachibowli, office interior designers gachibowli, commercial interior design gachibowli, turnkey interior design gachibowli, interior designers in hyderabad",
    canonical: "https://www.brightarenainteriors.com/interior-designer-gachibowli/",
    type: "website"
  },
  {
    route: "/interior-designer-madhapur/",
    title: "Luxury Interior Designer in Madhapur, Hyderabad | Bright Arena",
    h1: "Interior Designers in Madhapur",
    description: "Looking for an interior designer in Madhapur, Hyderabad? Bright Arena Interiors offers customised home interiors, modular kitchens, office spaces and turnkey interior design solutions.",
    keywords: "interior designer in madhapur, interior designers in madhapur, interior designer madhapur hyderabad, interior design madhapur, interior design company madhapur, home interior designer madhapur, home interiors madhapur, residential interior designer madhapur, luxury interior designer madhapur, modular kitchen designer madhapur, office interior designer madhapur, commercial interior design madhapur, turnkey interior design madhapur, interior designers in hyderabad",
    canonical: "https://www.brightarenainteriors.com/interior-designer-madhapur/",
    type: "website"
  },
  {
    route: "/interior-designer-hitec-city/",
    title: "Best Interior Designer in HITEC City, Hyderabad | Home & Office - Bright Arena",
    h1: "Interior Designers in HITEC City",
    description: "Looking for an interior designer in HITEC City, Hyderabad? Bright Arena Interiors offers luxury home, office and turnkey interior design tailored to your space.",
    keywords: "interior designer hitec city, interior designers in hitec city, interior designer in hitech city, interior design hitec city, home interior designers hitec city, luxury interior designers hitec city, interior designers Hyderabad, home interiors hitec city, office interior design hitec city, turnkey interior design hitec city",
    canonical: "https://www.brightarenainteriors.com/interior-designer-hitec-city/",
    type: "website"
  },
  {
    route: "/interior-designer-kondapur/",
    title: "Top Interior Designer in Kondapur, Hyderabad | Bright Arena",
    h1: "Interior Designers in Kondapur",
    description: "Transform your space with Bright Arena Interiors, offering luxury home interiors, modular kitchens, office design and turnkey interior solutions in Kondapur, Hyderabad.",
    keywords: "interior designer in kondapur, interior designers in kondapur, interior designer kondapur hyderabad, interior design kondapur, interior design company kondapur, home interior designer kondapur, home interiors kondapur, residential interior designer kondapur, luxury interior designer kondapur, modular kitchen designer kondapur, office interior designer kondapur, commercial interior design kondapur, turnkey interior design kondapur, interior designers in hyderabad",
    canonical: "https://www.brightarenainteriors.com/interior-designer-kondapur/",
    type: "website"
  },
  {
    route: "/interior-designer-whitefields/",
    title: "Home Interior Designer in Whitefields, Hyderabad | Bright Arena",
    h1: "Interior Designers in Whitefield",
    description: "Bright Arena Interiors provides customised interior design in Whitefields, Hyderabad, including home interiors, office spaces, modular kitchens and turnkey solutions.",
    keywords: "interior designer in whitefield, interior designers in whitefield, interior designer hitech city, interior design whitefield, home interior designer whitefield, home interior designers in whitefield, luxury interior designer whitefield, interior design company whitefield, interior designers in hyderabad, home interiors whitefield, office interior designer whitefield, turnkey interior design whitefield",
    canonical: "https://www.brightarenainteriors.com/interior-designer-whitefields/",
    type: "website"
  },
  {
    route: "/designs/",
    title: "Interior Design Ideas for Hyderabad Homes | Bright Arena",
    h1: "Interior Design Ideas for Your Home",
    canonical: "https://www.brightarenainteriors.com/designs/",
    type: "website"
  },
  {
    route: "/designs/living-room-interior-design-hyderabad/",
    title: "Living Room Interior Design in Hyderabad | Bright Arena",
    h1: "Living Room Interior Design in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/designs/living-room-interior-design-hyderabad/",
    type: "website"
  },
  {
    route: "/designs/bedroom-interior-design-hyderabad/",
    title: "Bedroom Interior Design in Hyderabad | Bright Arena",
    h1: "Bedroom Interior Design in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/designs/bedroom-interior-design-hyderabad/",
    type: "website"
  },
  {
    route: "/designs/kitchen-interior-design-hyderabad/",
    title: "Kitchen Interior Design in Hyderabad | Bright Arena",
    h1: "Kitchen Interior Design in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/designs/kitchen-interior-design-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/",
    title: "Interior Design Projects in Hyderabad | Bright Arena",
    h1: "Our Interior Design Projects in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/portfolio/",
    type: "website"
  },
  {
    route: "/portfolio/forest-edge-interior-design-project-hyderabad/",
    title: "Forest Edge Interior Design Project, Hyderabad | Bright Arena",
    h1: "Forest Edge Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/forest-edge-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/rajapushpa-interior-design-project-hyderabad/",
    title: "Rajapushpa Interior Design Project, Hyderabad | Bright Arena",
    h1: "Rajapushpa Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/rajapushpa-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/vara-prasad-bachupally-interior-design-project-hyderabad/",
    title: "Vara Prasad Bachupally Interior Design Project, Hyderabad | Bright Arena",
    h1: "Vara Prasad Bachupally Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/vara-prasad-bachupally-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/etna-by-phoenix-interior-design-project-hyderabad/",
    title: "Etna by Phoenix Interior Design Project, Hyderabad | Bright Arena",
    h1: "Etna by Phoenix Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/etna-by-phoenix-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/banali-foods-commercial-interior-design-project-hyderabad/",
    title: "Banali Foods Commercial Interior Design Project, Hyderabad | Bright Arena",
    h1: "Banali Foods Commercial Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/banali-foods-commercial-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/portfolio/kollur-apartment-interior-design-project-hyderabad/",
    title: "Kollur Apartment Interior Design Project, Hyderabad | Bright Arena",
    h1: "Kollur Apartment Interior Design Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/kollur-apartment-interior-design-project-hyderabad/",
    type: "website"
  },
  {
    route: "/blogs/",
    title: "Interior Design Blog: Tips and Trends | Bright Arena",
    h1: "Interior Design Tips and Trends",
    canonical: "https://www.brightarenainteriors.com/blogs/",
    type: "website"
  },
  {
    route: "/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/",
    title: "Modular Kitchen Cost in Hyderabad | Bright Arena",
    h1: "Modular Kitchen Cost in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/",
    type: "article",
    schemaType: "BlogPosting"
  },
  {
    route: "/blogs/art-of-biophilic-design/",
    title: "Art of Biophilic Design | Bright Arena",
    h1: "Art of Biophilic Design",
    canonical: "https://www.brightarenainteriors.com/blogs/art-of-biophilic-design/",
    type: "article",
    schemaType: "BlogPosting"
  },
  {
    route: "/blogs/mastering-lighting-invisible-architecture/",
    title: "Mastering Lighting: Invisible Architecture | Bright Arena",
    h1: "Mastering Lighting: Invisible Architecture",
    canonical: "https://www.brightarenainteriors.com/blogs/mastering-lighting-invisible-architecture/",
    type: "article",
    schemaType: "BlogPosting"
  },
  {
    route: "/testimonials/",
    title: "Client Reviews | Bright Arena Interiors",
    h1: "What Our Clients Say",
    canonical: "https://www.brightarenainteriors.com/testimonials/",
    type: "website"
  },
  {
    route: "/contact/",
    title: "Contact Bright Arena Interiors | Hyderabad",
    h1: "Contact Bright Arena Interiors",
    canonical: "https://www.brightarenainteriors.com/contact/",
    type: "website"
  },
  {
    route: "/privacy-policy/",
    title: "Privacy Policy | Bright Arena Interiors",
    h1: "Privacy Policy",
    canonical: "https://www.brightarenainteriors.com/privacy-policy/",
    type: "website"
  },
  // Luxury Restored
  {
    route: "/luxury-interior-designers-in-hyderabad/",
    title: "Luxury Interior Designers in Hyderabad | Bright Arena",
    h1: "Luxury Interior Designers in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/luxury-interior-designers-in-hyderabad/",
    type: "website"
  },
  {
    route: "/top-luxury-interior-designers-in-hyderabad/",
    title: "Top Luxury Interior Designers in Hyderabad | Bright Arena",
    h1: "Top Luxury Interior Designers in Hyderabad",
    canonical: "https://www.brightarenainteriors.com/top-luxury-interior-designers-in-hyderabad/",
    type: "website"
  },
  // Old Portfolio Restored
  {
    route: "/portfolio/mr-nageswara-rao/",
    title: "Mr Nageswara Rao Interior Project | Bright Arena",
    h1: "Mr Nageswara Rao Interior Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/mr-nageswara-rao/",
    type: "website"
  },
  {
    route: "/portfolio/haseeb-my-home-bhooja/",
    title: "Haseeb My Home Bhooja Interior Project | Bright Arena",
    h1: "Haseeb My Home Bhooja Interior Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/haseeb-my-home-bhooja/",
    type: "website"
  },
  {
    route: "/portfolio/rakesh-bhupathi-nagole/",
    title: "Rakesh Bhupathi Nagole Interior Project | Bright Arena",
    h1: "Rakesh Bhupathi Nagole Interior Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/rakesh-bhupathi-nagole/",
    type: "website"
  },
  {
    route: "/portfolio/sammys-villa-bangalore/",
    title: "Sammy's Villa Bangalore Interior Project | Bright Arena",
    h1: "Sammy's Villa Bangalore Interior Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/sammys-villa-bangalore/",
    type: "website"
  },
  {
    route: "/portfolio/praveen-aparna-zenith/",
    title: "Praveen Aparna Zenith Interior Project | Bright Arena",
    h1: "Praveen Aparna Zenith Interior Project",
    canonical: "https://www.brightarenainteriors.com/portfolio/praveen-aparna-zenith/",
    type: "website"
  }
];

export const getPageSEO = (route: string): PageSEO | undefined => {
  const normalizedRoute = route.endsWith('/') ? route : `${route}/`;
  const exactMatch = pagesData.find(p => p.route === normalizedRoute || p.route === route);
  if (exactMatch) return exactMatch;
  if (route === '/') return pagesData.find(p => p.route === '/');
  
  // Try to find old blog routes and extra slugs generically
  if (route.startsWith('/blog/')) {
    return {
      route: normalizedRoute,
      title: "Interior Design Blog | Bright Arena",
      h1: "Interior Design Blog",
      canonical: `https://www.brightarenainteriors.com${normalizedRoute}`,
      type: "article",
      schemaType: "BlogPosting"
    }
  }

  return undefined;
};
