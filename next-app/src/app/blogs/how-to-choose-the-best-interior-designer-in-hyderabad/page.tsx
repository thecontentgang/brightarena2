import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { blogSeoProps } from "@/lib/routeSeo";
import * as articleMeta from "@/views/blogs/meta/HowToChooseTheBestInteriorDesignerInHyderabad.meta";
import HowToChooseTheBestInteriorDesignerInHyderabad from "@/views/blogs/HowToChooseTheBestInteriorDesignerInHyderabad";

const path = "/blogs/how-to-choose-the-best-interior-designer-in-hyderabad/";
const seo: SEOProps = blogSeoProps(articleMeta);

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <HowToChooseTheBestInteriorDesignerInHyderabad />
    </>
  );
}
