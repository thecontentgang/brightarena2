import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import WhitefieldsPage from "@/views/WhitefieldsInteriorDesignerPage";

const path = "/interior-designer-whitefields/";
const seo: SEOProps = {};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <WhitefieldsPage />
    </>
  );
}
