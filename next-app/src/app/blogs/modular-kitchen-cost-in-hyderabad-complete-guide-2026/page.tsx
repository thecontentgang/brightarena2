import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { blogSeoProps } from "@/lib/routeSeo";
import * as articleMeta from "@/views/blogs/meta/ModularKitchenCostInHyderabadCompleteGuide2026.meta";
import ModularKitchenCostInHyderabadCompleteGuide2026 from "@/views/blogs/ModularKitchenCostInHyderabadCompleteGuide2026";

const path = "/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/";
const seo: SEOProps = blogSeoProps(articleMeta);

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <ModularKitchenCostInHyderabadCompleteGuide2026 />
    </>
  );
}
