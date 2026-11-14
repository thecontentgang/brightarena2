import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SEO from "@/components/SEO";
import { buildMetadata } from "@/lib/seo";
import { findService, serviceSeoProps } from "@/lib/routeSeo";
import { servicesData } from "@/views/data/servicesData";
import ServiceDetailsPage from "@/views/ServiceDetails";

// Every service is prerendered at build time; unknown slugs render the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) return {};
  return buildMetadata(`/services/${slug}/`, serviceSeoProps(service));
}

export default async function Page({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = findService(slug);
  if (!service) notFound();
  return (
    <>
      <SEO path={`/services/${slug}/`} {...serviceSeoProps(service)} />
      <ServiceDetailsPage slug={slug} />
    </>
  );
}
