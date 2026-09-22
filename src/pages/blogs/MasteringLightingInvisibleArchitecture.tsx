import { useRef } from "react";
import SEO from "../../components/SEO";
import BlogHeader from "../../components/blog/BlogHeader";
import BlogHeroImage from "../../components/blog/BlogHeroImage";
import BlogContentBlock from "../../components/blog/BlogContentBlock";
import NextPostCTA from "../../components/blog/NextPostCTA";

export default function MasteringLightingInvisibleArchitecture() {
  const articleRef = useRef<HTMLElement>(null);

  const post = {
  "id": 2,
  "slug": "mastering-lighting-invisible-architecture",
  "title": "Mastering Lighting: The Invisible Architecture",
  "category": "Styling",
  "date": "March 15, 2026",
  "readTime": "6 Min Read",
  "author": "David Chen",
  "authorRole": "Lead Lighting Designer",
  "coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
  "excerpt": "How the right mix of ambient, task, and accent lighting can entirely change the mood, depth, and perceived size of a room."
};
  const seo = {
  "metaTitle": "Mastering Lighting: The Invisible Architecture Guide | Bright Arena Interiors",
  "description": "Discover how lighting transforms interiors with Bright Arena Interiors. Learn how invisible architecture creates elegant, functional, and inviting spaces through smart lighting design.",
  "keywords": "Interior lighting design, ambient lighting, accent lighting tips, luxury home lighting, architectural lighting",
  "h1": "Mastering Interior Lighting Design"
};
  const content = [
  {
    "type": "paragraph",
    "value": "You can spend millions on the finest furniture, the most exquisite art, and flawless architectural framing, but if the lighting is wrong, the space will fail. Lighting is the invisible architecture of a room. It tells you where to look, how to feel, and how to navigate the space."
  },
  {
    "type": "heading",
    "value": "The Three Layers of Illumination"
  },
  {
    "type": "paragraph",
    "value": "A masterfully lit room always utilizes a tiered approach: Ambient, Task, and Accent lighting. Ambient is the general wash of light—the baseline. Task lighting is highly localized, allowing you to read or cook. Accent lighting is the drama—it grazes a textured wall or spotlights a piece of art."
  },
  {
    "type": "image",
    "value": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    "caption": "A masterful balance of ambient and accent lighting."
  },
  {
    "type": "paragraph",
    "value": "The mistake most homeowners make is relying entirely on overhead downlights. This creates a flat, clinical environment akin to a supermarket. By turning off the overheads and utilizing low-level floor lamps, table lamps, and concealed LED strips, you instantly inject mystery, depth, and warmth into the architecture."
  }
];

  return (
    <>
      <SEO 
        title={seo?.metaTitle || `${post.title} | Bright Arena Interiors Journal`}
        description={seo?.description || post.excerpt}
        keywords={seo?.keywords}
        url={`https://www.brightarenainteriors.com/blogs/${post.slug}`}
      />
      <main className="bg-[#f7f4ee] text-[#4a1c13] w-full min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24">
        
        <article ref={articleRef}>
          {/* ── HERO HEADER ── */}
          <BlogHeader 
            category={post.category} 
            readTime={post.readTime} 
            title={post.title} 
            author={post.author} 
            date={post.date} 
            articleRef={articleRef} 
          />

          {/* ── HERO IMAGE ── */}
          <BlogHeroImage coverImage={post.coverImage} title={post.title} />

          {/* ── ARTICLE CONTENT ── */}
          <section className="px-6 md:px-12 max-w-[800px] mx-auto">
            {/* Excerpt / Lead Paragraph */}
            <p className="text-2xl md:text-3xl font-primary text-[#4a1c13] leading-snug mb-16">
              {post.excerpt}
            </p>

            {/* Dynamic Content Blocks */}
            <div className="article-body">
              {content.map((block: { type: string; value: string; caption?: string; }, index: number) => (
                <BlogContentBlock key={index} index={index} type={block.type as "paragraph" | "heading" | "quote" | "image"} value={block.value} caption={block.caption} />
              ))}
            </div>
          </section>
        </article>

        {/* ── NEXT POST CTA ── */}
        <NextPostCTA title={"How to Choose the Best Interior Designer in Hyderabad"} slug={"how-to-choose-the-best-interior-designer-in-hyderabad"} />
      </main>
    </>
  );
}
