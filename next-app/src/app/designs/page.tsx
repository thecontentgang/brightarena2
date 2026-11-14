import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import DesignsPage from "@/views/DesignsPage";

const path = "/designs/";
const seo: SEOProps = {
  title: "Interior Design Ideas in Hyderabad – Bright Arena Interiors",
  description: "Explore home interior designs by Bright Arena Interiors featuring modern living rooms, kitchens, bedrooms, and luxury spaces in Hyderabad.",
  url: "https://www.brightarenainteriors.com/designs",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <DesignsPage />
    </>
  );
}
