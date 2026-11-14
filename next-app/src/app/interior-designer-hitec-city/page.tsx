import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import HitecCityPage from "@/views/HitecCityInteriorDesignerPage";

const path = "/interior-designer-hitec-city/";
const seo: SEOProps = {};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <HitecCityPage />
    </>
  );
}
