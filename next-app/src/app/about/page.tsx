import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import AboutPage from "@/views/AboutPage";

const path = "/about/";
const seo: SEOProps = {
  title: "About - Bright Arena Interiors 15+ Years of Interior Design Excellence",
  description: "Learn about Bright Arena Interiors, a trusted interior design company in Hyderabad with 15+ years of experience creating beautiful, functional, and personalized spaces.",
  url: "https://www.brightarenainteriors.com/about",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <AboutPage />
    </>
  );
}
