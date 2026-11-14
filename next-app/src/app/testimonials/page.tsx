import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import TestimonialPage from "@/views/TestimonialPage";

const path = "/testimonials/";
const seo: SEOProps = {
  title: "Client Testimonials - Bright Arena Interiors",
  description: "Read client testimonials for Bright Arena Interiors and discover why homeowners and businesses across Hyderabad trust us for luxury interior design projects.",
  url: "https://www.brightarenainteriors.com/testimonials",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <TestimonialPage />
    </>
  );
}
