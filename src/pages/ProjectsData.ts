export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "forest-edge",
    title: "ForestEdge",
    shortDescription: "Luxury Residential, Interior Design",
    description: "A premium residential space designed with timeless interiors, seamlessly blending indoor and outdoor functional areas for a resort-like feel.",
    heroImage: "/projectsImg/forest-edge/fe-img1.webp",
    gallery: Array.from({ length: 10 }, (_, i) => `/projectsImg/forest-edge/fe-img${i + 1}.webp`),
  },
  {
    id: 2,
    slug: "rajapushpa",
    title: "Rajapushpa Project",
    shortDescription: "Premium Apartment, Styling",
    description: "Modern elegant residential interiors crafted for luxurious living, featuring seamless layouts and bespoke furniture tailored for maximum comfort.",
    heroImage: "/projectsImg/rajapushpa/rp-img1.webp",
    gallery: Array.from({ length: 15 }, (_, i) => `/projectsImg/rajapushpa/rp-img${i + 1}.webp`),
  },
  {
    id: 3,
    slug: "vara-prasad-bachupally",
    title: "Vara Prasad Bachupally",
    shortDescription: "Residential Interiors",
    description: "A beautifully tailored residential space featuring contemporary finishes and a serene, comfortable atmosphere crafted specifically for modern family living.",
    heroImage: "/projectsImg/varaprasad/vp-img1.png",
    gallery: Array.from({ length: 16 }, (_, i) => `/projectsImg/varaprasad/vp-img${i + 1}.png`),
  },
  {
    id: 4,
    slug: "etna-by-phoenix",
    title: "Etna By Phoenix",
    shortDescription: "Premium Apartment, Styling",
    description: "A sophisticated blend of contemporary design and timeless elegance, creating a vibrant and luxurious residential oasis.",
    heroImage: "/projectsImg/etna/sr-img1.webp",
    gallery: Array.from({ length: 16 }, (_, i) => `/projectsImg/etna/sr-img${i + 1}.webp`),
  },
  {
    id: 5,
    slug: "banali-foods",
    title: "Banali Foods",
    shortDescription: "Commercial, Sweets Shop",
    description: "A vibrant and welcoming commercial retail space tailored for a premium sweets brand, featuring elegant display counters and warm ambient lighting.",
    heroImage: "/projectsImg/banali/bf-img5.png",
    gallery: Array.from({ length: 5 }, (_, i) => `/projectsImg/banali/bf-img${i + 1}.png`),
  },
  {
    id: 6,
    slug: "kollur-apartment",
    title: "Kollur Apartment",
    shortDescription: "Residential, Modern Apartment",
    description: "Elegant residential interiors designed with space-saving layouts and contemporary finishes for a modern family lifestyle.",
    heroImage: "/projectsImg/kollur/kl-img1.webp",
    gallery: Array.from({ length: 15 }, (_, i) => `/projectsImg/kollur/kl-img${i + 1}.webp`),
  }
];