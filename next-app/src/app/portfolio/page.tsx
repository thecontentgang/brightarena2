import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import ProjectsPage from "@/views/ProjectsPage";

const path = "/portfolio/";
const seo: SEOProps = {
  title: "Bright Arena Interiors Portfolio and Interior Design Projects",
  description: "Explore the Bright Arena Interiors portfolio showcasing completed home, villa, apartment, and office interior projects across Hyderabad with 15+ years of expertise.",
  url: "https://www.brightarenainteriors.com/portfolio",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <ProjectsPage />
    </>
  );
}
