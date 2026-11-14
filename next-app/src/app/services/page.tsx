import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import ServicesPage from "@/views/ServicesPage";

const path = "/services/";
const seo: SEOProps = {
  title: "Home and Office Interior Design Services in Hyderabad - Bright Arena Interiors",
  description: "Bright Arena Interiors offers Interior Design Services in Hyderabad for luxury homes, offices, and commercial spaces with expert planning and execution.",
  url: "https://www.brightarenainteriors.com/services",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <ServicesPage />
    </>
  );
}
