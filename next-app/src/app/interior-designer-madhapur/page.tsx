import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import MadhapurPage from "@/views/MadhapurInteriorDesignerPage";

const path = "/interior-designer-madhapur/";
const seo: SEOProps = {};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <MadhapurPage />
    </>
  );
}
