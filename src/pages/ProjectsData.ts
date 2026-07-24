// src/data/projectsData.ts

export interface ProjectSEO {
  metaTitle: string;
  description: string;
  keywords: string;
}

export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  seo?: ProjectSEO;
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "forest-edge-interior-design-project-hyderabad",
    title: "ForestEdge",
    shortDescription: "Luxury Residential, Interior Design",
    description: "A premium residential space designed with timeless interiors, seamlessly blending indoor and outdoor functional areas for a resort-like feel.",
    heroImage: "/projectsImg/forest-edge/fe-img1.webp",
    gallery: Array.from({ length: 10 }, (_, i) => `/projectsImg/forest-edge/fe-img${i + 1}.webp`),
    seo: {
      metaTitle: "Forest Edge Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Explore the Forest Edge interior design project by Bright Arena Interiors, showcasing modern layouts, premium finishes, and thoughtfully designed living spaces in Hyderabad.",
      keywords: "ForestEdge interiors, luxury residential design, resort-style home interiors, premium interior designers",
    }
  },
  {
    id: 2,
    slug: "rajapushpa-interior-design-project-hyderabad",
    title: "Rajapushpa Project",
    shortDescription: "Premium Apartment, Styling",
    description: "Modern elegant residential interiors crafted for luxurious living, featuring seamless layouts and bespoke furniture tailored for maximum comfort.",
    heroImage: "/projectsImg/rajapushpa/rp-img1.webp",
    gallery: Array.from({ length: 15 }, (_, i) => `/projectsImg/rajapushpa/rp-img${i + 1}.webp`),
    seo: {
      metaTitle: "Rajapushpa Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Explore the Rajapushpa Interior Design Project by Bright Arena Interiors, showcasing elegant layouts, premium finishes, and modern living spaces in Hyderabad.",
      keywords: "Rajapushpa apartment interiors, premium apartment styling, modern luxury living, bespoke furniture design",
    }
  },
  {
    id: 3,
    slug: "vara-prasad-bachupally-interior-design-project-hyderabad",
    title: "Vara Prasad Bachupally",
    shortDescription: "Residential Interiors",
    description: "A beautifully tailored residential space featuring contemporary finishes and a serene, comfortable atmosphere crafted specifically for modern family living.",
    heroImage: "/projectsImg/varaprasad/vp-img1.png",
    gallery: Array.from({ length: 16 }, (_, i) => `/projectsImg/varaprasad/vp-img${i + 1}.png`),
    seo: {
      metaTitle: "Vara Prasad Bachupally Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Explore the Vara Prasad Bachupally Interior Design Project by Bright Arena Interiors, featuring elegant interiors, premium finishes, and customized living spaces in Hyderabad.",
      keywords: "Bachupally interior design, modern family home interiors, contemporary residential finishes",
    }
  },
  {
    id: 4,
    slug: "etna-by-phoenix-interior-design-project-hyderabad",
    title: "Etna By Phoenix",
    shortDescription: "Premium Apartment, Styling",
    description: "A sophisticated blend of contemporary design and timeless elegance, creating a vibrant and luxurious residential oasis.",
    heroImage: "/projectsImg/etna/sr-img1.webp",
    gallery: Array.from({ length: 16 }, (_, i) => `/projectsImg/etna/sr-img${i + 1}.webp`),
    seo: {
      metaTitle: "Etna by Phoenix Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Discover the Etna by Phoenix Interior Design Project by Bright Arena Interiors, featuring elegant interiors, premium finishes, and thoughtfully designed living spaces in Hyderabad",
      keywords: "Etna by Phoenix interiors, luxury apartment design, contemporary residential styling",
    }
  },
  {
    id: 5,
    slug: "banali-foods-commercial-interior-design-project-hyderabad",
    title: "Banali Foods",
    shortDescription: "Commercial, Sweets Shop",
    description: "A vibrant and welcoming commercial retail space tailored for a premium sweets brand, featuring elegant display counters and warm ambient lighting.",
    heroImage: "/projectsImg/banali/bf-img5.png",
    gallery: Array.from({ length: 5 }, (_, i) => `/projectsImg/banali/bf-img${i + 1}.png`),
    seo: {
      metaTitle: "Banali Foods Commercial Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Explore the Banali Foods commercial interior design project by Bright Arena Interiors, showcasing modern workspaces, premium finishes, and smart space planning.",
      keywords: "Retail interior design, sweets shop interiors, commercial space styling, premium retail design",
    }
  },
  {
    id: 6,
    slug: "kollur-apartment-interior-design-project-hyderabad",
    title: "Kollur Apartment",
    shortDescription: "Residential, Modern Apartment",
    description: "Elegant residential interiors designed with space-saving layouts and contemporary finishes for a modern family lifestyle.",
    heroImage: "/projectsImg/kollur/kl-img1.webp",
    gallery: Array.from({ length: 15 }, (_, i) => `/projectsImg/kollur/kl-img${i + 1}.webp`),
    seo: {
      metaTitle: "Kollur Apartment Interior Design Project in Hyderabad | Bright Arena Interiors",
      description: "Explore the Kollur Apartment Interior Design Project by Bright Arena Interiors, featuring modern interiors, premium finishes, and customized living spaces in Hyderabad.",
      keywords: "Kollur apartment interiors, space-saving interior design, modern apartment styling",
    }
  }
];