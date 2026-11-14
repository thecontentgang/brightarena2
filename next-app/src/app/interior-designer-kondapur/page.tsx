import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import KondapurPage from "@/views/KondapurInteriorDesignerPage";

const path = "/interior-designer-kondapur/";
const seo: SEOProps = {};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <KondapurPage />
    </>
  );
}
