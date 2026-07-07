export interface Project {
  id: number;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  heroImage: string;
  gallery: string[];
  location: string;
  houseType: string;
  year: string;
  bg: string;
  textColor: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: "rajapushpa",
    title: "Rajapushpa Provincia",
    shortDescription: "Luxury apartment interiors with premium finishes.",
    description: "Modern elegant interiors crafted for luxurious living, featuring seamless layouts and bespoke furniture tailored for maximum comfort.",
    heroImage: "/projectsImg/rajapushpa/RP-img3.jpg",
    gallery: Array.from({ length: 40 }, (_, i) => `/projectsImg/rajapushpa/RP-img${i + 1}.jpg`),
    location: "Rajapushpa Provincia",
    houseType: "Luxury Apartment",
    year: "2024",
    bg: "#F4EDDB",
    textColor: "#3A393F",
  },
  {
    id: 2,
    slug: "my-home-bhooja",
    title: "My Home Bhooja",
    shortDescription: "High-end luxury 4BHK apartment with dynamic styling.",
    description: "A sophisticated blend of contemporary design and timeless elegance, creating a vibrant and comfortable oasis for the family.",
    heroImage: "/projectsImg/my-home-bhooja/MHB-img1.jpg",
    gallery: Array.from({ length: 15 }, (_, i) => `/projectsImg/my-home-bhooja/MHB-img${i + 1}.jpg`),
    location: "Raidurg, Hyderabad",
    houseType: "4BHK",
    year: "2023",
    bg: "#3A393F",
    textColor: "#F4EDDB",
  },
  {
    id: 3,
    slug: "my-home-krishe",
    title: "My Home Krishe",
    shortDescription: "Bright and airy interiors focused on natural light.",
    description: "A serene and functional living space designed with a minimalist approach, emphasizing natural lighting and warm textures.",
    heroImage: "/projectsImg/mhk/MHk-img5.jpg",
    gallery: Array.from({ length: 13 }, (_, i) => `/projectsImg/mhk/MHk-img${i + 1}.jpg`),
    location: "Gachibowli, Hyderabad",
    houseType: "3BHK",
    year: "2022",
    bg: "#F4EDDB",
    textColor: "#3A393F",
  },
  {
    id: 4,
    slug: "aparna-sarovar",
    title: "Aparna Sarovar",
    shortDescription: "Modern 3BHK redesign balancing style and practicality.",
    description: "Smart layouts combined with contemporary styling to maximize space utility without compromising on the luxurious feel.",
    heroImage: "/projectsImg/aparna-sarovar/AS-img1.jpg",
    gallery: Array.from({ length: 11 }, (_, i) => `/projectsImg/aparna-sarovar/AS-img${i + 1}.jpg`),
    location: "Nallagandla, Hyderabad",
    houseType: "3BHK",
    year: "2024",
    bg: "#3A393F",
    textColor: "#F4EDDB",
  },
  {
    id: 5,
    slug: "nagole-house",
    title: "Nagole House",
    shortDescription: "Contemporary 4BHK featuring elegant modern living.",
    description: "A beautifully crafted residence using warm color palettes, premium lighting, and customized decor to reflect the client's personality.",
    heroImage: "/projectsImg/nagole/NAG-img1.jpg",
    gallery: Array.from({ length: 21 }, (_, i) => `/projectsImg/nagole/NAG-img${i + 1}.jpg`),
    location: "Nagole, Hyderabad",
    houseType: "4BHK",
    year: "2022",
    bg: "#F4EDDB",
    textColor: "#3A393F",
  },
  {
    id: 6,
    slug: "luxury-villa",
    title: "Luxury Villa",
    shortDescription: "Bespoke villa interiors with timeless elegance.",
    description: "A premium villa with custom-designed luxury interiors, featuring high-end materials, grand chandeliers, and sprawling living areas.",
    heroImage: "/projectsImg/Villa/Villa-img1.jpg",
    gallery: Array.from({ length: 55 }, (_, i) => `/projectsImg/Villa/Villa-img${i + 1}.jpg`),
    location: "Hyderabad",
    houseType: "Luxury Villa",
    year: "2025",
    bg: "#3A393F",
    textColor: "#F4EDDB",
  },
  {
    id: 7,
    slug: "forest-edge",
    title: "Forest Edge Residence",
    shortDescription: "Luxury contemporary residence with elegant interiors.",
    description: "A premium villa designed with timeless interiors, seamlessly blending indoor and outdoor functional spaces for a resort-like feel.",
    heroImage: "/projectsImg/forest-edge/FE-img1.jpg",
    gallery: Array.from({ length: 20 }, (_, i) => `/projectsImg/forest-edge/FE-img${i + 1}.jpg`),
    location: "Hyderabad",
    houseType: "Luxury Villa",
    year: "2025",
    bg: "#F4EDDB",
    textColor: "#3A393F",
  }
];