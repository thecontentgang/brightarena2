// src/data/blogsData.ts

export interface BlogSEO {
  metaTitle: string;
  description: string;
  keywords: string;
}

export interface BlogContentBlock {
  type: "paragraph" | "heading" | "quote" | "image";
  value: string;
  caption?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  authorRole: string;
  coverImage: string;
  excerpt: string;
  content: BlogContentBlock[];
  seo?: BlogSEO;
}

// High-end Unsplash placeholders for luxury interiors
const FALLBACK_COVER = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop";

export const blogsData: BlogPost[] = [
  {
    id: 1,
    slug: "art-of-biophilic-design",
    title: "The Art of Biophilic Design: Bringing Nature Indoors",
    category: "Design Trends",
    date: "April 12, 2026",
    readTime: "4 Min Read",
    author: "Elena Rostova",
    authorRole: "Principal Architect",
    coverImage: FALLBACK_COVER,
    excerpt: "Discover how integrating natural elements, organic materials, and abundant light can transform your living space into a restorative sanctuary.",
    content: [
      {
        type: "paragraph",
        value: "In an era where our lives are increasingly digital and fast-paced, the concept of home has shifted. It is no longer just a place to sleep; it is a sanctuary, a retreat, and a space for profound restoration. This shift has given rise to one of the most important architectural movements of our time: Biophilic Design."
      },
      {
        type: "heading",
        value: "More Than Just Houseplants"
      },
      {
        type: "paragraph",
        value: "Biophilia literally translates to 'love of life.' In interior design, it goes far beyond simply placing a potted fern in the corner of a room. It is a comprehensive approach that seeks to connect human occupants seamlessly with the natural environment. This involves maximizing natural light, utilizing organic, raw materials like unpolished wood and natural stone, and establishing visual connections to nature."
      },
      {
        type: "image",
        value: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
        caption: "Natural light sweeping across untreated stone finishes."
      },
      {
        type: "paragraph",
        value: "When we design spaces at Bright Arena, we consider the psychological impact of textures. A highly polished, synthetic surface bounces sound and feels cold. Conversely, a porous, natural limestone wall absorbs sound, feels grounded, and physically connects the occupant to the earth. These subtle sensory cues drastically reduce stress and increase well-being."
      },
      {
        type: "quote",
        value: "We are not separate from nature; we are a part of it. A successful interior recognizes this and invites the outside world in."
      },
      {
        type: "paragraph",
        value: "As we look to the future of luxury interiors, the ultimate premium is not gold or marble—it is peace. By integrating biophilic principles, we construct environments that don't just look beautiful, but actively care for the people who inhabit them."
      }
    ],
    seo: {
      metaTitle: "Art of Biophilic Design for Modern Homes | Bright Arena Interiors",
      description: "Discover the art of biophilic design with Bright Arena Interiors. Learn how natural light, greenery, and organic materials create healthier, stylish living spaces.",
      keywords: "Biophilic interior design, natural interior design, organic materials in home, luxury home wellness, restorative interiors",
    }
  },
  {
    id: 2,
    slug: "mastering-lighting-invisible-architecture",
    title: "Mastering Lighting: The Invisible Architecture",
    category: "Styling",
    date: "March 15, 2026",
    readTime: "6 Min Read",
    author: "David Chen",
    authorRole: "Lead Lighting Designer",
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
    excerpt: "How the right mix of ambient, task, and accent lighting can entirely change the mood, depth, and perceived size of a room.",
    content: [
      {
        type: "paragraph",
        value: "You can spend millions on the finest furniture, the most exquisite art, and flawless architectural framing, but if the lighting is wrong, the space will fail. Lighting is the invisible architecture of a room. It tells you where to look, how to feel, and how to navigate the space."
      },
      {
        type: "heading",
        value: "The Three Layers of Illumination"
      },
      {
        type: "paragraph",
        value: "A masterfully lit room always utilizes a tiered approach: Ambient, Task, and Accent lighting. Ambient is the general wash of light—the baseline. Task lighting is highly localized, allowing you to read or cook. Accent lighting is the drama—it grazes a textured wall or spotlights a piece of art."
      },
      {
        type: "image",
        value: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
        caption: "A masterful balance of ambient and accent lighting."
      },
      {
        type: "paragraph",
        value: "The mistake most homeowners make is relying entirely on overhead downlights. This creates a flat, clinical environment akin to a supermarket. By turning off the overheads and utilizing low-level floor lamps, table lamps, and concealed LED strips, you instantly inject mystery, depth, and warmth into the architecture."
      }
    ],
    seo: {
      metaTitle: "Mastering Lighting: The Invisible Architecture Guide | Bright Arena Interiors",
      description: "Discover how lighting transforms interiors with Bright Arena Interiors. Learn how invisible architecture creates elegant, functional, and inviting spaces through smart lighting design.",
      keywords: "Interior lighting design, ambient lighting, accent lighting tips, luxury home lighting, architectural lighting",
    }
  }
];