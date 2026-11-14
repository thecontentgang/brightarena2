import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEO from "@/components/SEO";
import { buildMetadata } from "@/lib/seo";
import { findProject, projectSeoProps } from "@/lib/routeSeo";
import { projectsData } from "@/views/ProjectsData";
import ProjectDetailsPage from "@/views/ProjectDetails";

// Every project (current and restored legacy slugs) is prerendered; unknown slugs render the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) return {};
  return buildMetadata(`/portfolio/${slug}/`, projectSeoProps(project));
}

export default async function Page({ params }: PageProps<"/portfolio/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();
  return (
    <>
      <SEO path={`/portfolio/${slug}/`} {...projectSeoProps(project)} />
      <ProjectDetailsPage slug={slug} />
    </>
  );
}
