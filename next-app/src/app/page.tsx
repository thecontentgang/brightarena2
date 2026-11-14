import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import HomePage from "@/sections/HomePage";

const path = "/";
const seo: SEOProps = {
  title: "Interior Designers in Hyderabad for Homes and Offices | Bright Arena",
  description: "Bright Arena Interiors designs personalised home, luxury, office and commercial interiors in Hyderabad. Explore our work and book a consultation.",
  keywords: "Interior Designers Hyderabad, Luxury Interior Designers, Home Interior Design, Office Interiors, Commercial Interior Designers, Residential Interior Designers, Modular Kitchen Designers",
  url: "https://www.brightarenainteriors.com/",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <HomePage />
    </>
  );
}
