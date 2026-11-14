import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import BlogPage from "@/views/BlogPage";

const path = "/blogs/";
const seo: SEOProps = {
  title: "Interior Design Ideas and Tips - Bright Arena Interiors",
  description: "Explore expert interior design ideas, home decor tips, design trends, and practical guides from Bright Arena Interiors to create beautiful living spaces.",
  url: "https://www.brightarenainteriors.com/blogs",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <BlogPage />
    </>
  );
}
