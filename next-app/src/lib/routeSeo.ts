import type { SEOProps } from "./seo";
import { SITE_ORIGIN } from "./seo";
import { projectsData, type Project } from "@/views/ProjectsData";
import { servicesData, type ServiceItem } from "@/views/data/servicesData";
import { designsData, type Design } from "@/views/designsData";

/**
 * The <SEO /> props each Vite detail page passed, moved verbatim so generateMetadata() and the page body
 * share them. Expressions are copied from ServiceDetails.tsx, ProjectDetails.tsx, DesignDetails.tsx and
 * the blog components.
 */

export const findService = (slug: string) => servicesData.find((item: ServiceItem) => item.slug === slug);
export const findProject = (slug: string) => projectsData.find((item) => item.slug === slug);
// DesignDetails matched either the current slug or the legacy one.
export const findDesign = (slug: string) => designsData.find((d) => d.slug === slug || d.oldSlug === slug);

export function serviceSeoProps(service: ServiceItem): SEOProps {
  return {
    title: service.seo?.metaTitle || `${service.title} | Bright Arena Interiors`,
    description: service.seo?.description,
    keywords: service.seo?.keywords,
    url: `${SITE_ORIGIN}/services/${service.slug}`,
  };
}

export function projectSeoProps(project: Project): SEOProps {
  return {
    title: project.seo?.metaTitle || `${project.title} | Bright Arena Interiors`,
    description: project.seo?.description,
    keywords: project.seo?.keywords,
    url: `${SITE_ORIGIN}/portfolio/${project.slug}`,
  };
}

export function designSeoProps(targetDesign: Design): SEOProps {
  const categoryName = targetDesign.category || "Gallery";
  return {
    title: targetDesign.seo?.metaTitle || `${categoryName} Interior Design Concepts | Bright Arena`,
    description:
      targetDesign.seo?.description ||
      targetDesign.description ||
      `Explore our luxury ${categoryName} interior design concepts and transformations by Bright Arena.`,
    keywords: targetDesign.seo?.keywords,
    url: `${SITE_ORIGIN}/designs/${targetDesign.slug}`,
  };
}

interface BlogMeta {
  post: { slug: string; title: string; excerpt: string };
  seo?: { metaTitle?: string; description?: string; keywords?: string };
}

export function blogSeoProps({ post, seo }: BlogMeta): SEOProps {
  return {
    title: seo?.metaTitle || `${post.title} | Bright Arena Interiors Journal`,
    description: seo?.description || post.excerpt,
    keywords: seo?.keywords,
    url: `${SITE_ORIGIN}/blogs/${post.slug}`,
  };
}
