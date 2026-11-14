import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEO from "@/components/SEO";
import { buildMetadata } from "@/lib/seo";
import { designSeoProps, findDesign } from "@/lib/routeSeo";
import { designsData } from "@/views/designsData";
import DesignDetailsPage from "@/views/DesignDetails";

// Every design category page is prerendered; unknown slugs render the 404 page.
// (designsData's oldSlug values currently equal the new slugs, so no extra legacy params exist.)
export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = new Set(designsData.flatMap((d) => [d.slug, ...(d.oldSlug ? [d.oldSlug] : [])]));
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/designs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const design = findDesign(slug);
  if (!design) return {};
  return buildMetadata(`/designs/${slug}/`, designSeoProps(design));
}

export default async function Page({ params }: PageProps<"/designs/[slug]">) {
  const { slug } = await params;
  const design = findDesign(slug);
  if (!design) notFound();
  return (
    <>
      <SEO path={`/designs/${slug}/`} {...designSeoProps(design)} />
      <DesignDetailsPage slug={slug} />
    </>
  );
}
