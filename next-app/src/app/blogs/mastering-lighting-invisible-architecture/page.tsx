import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { blogSeoProps } from "@/lib/routeSeo";
import * as articleMeta from "@/views/blogs/meta/MasteringLightingInvisibleArchitecture.meta";
import MasteringLightingInvisibleArchitecture from "@/views/blogs/MasteringLightingInvisibleArchitecture";

const path = "/blogs/mastering-lighting-invisible-architecture/";
const seo: SEOProps = blogSeoProps(articleMeta);

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <MasteringLightingInvisibleArchitecture />
    </>
  );
}
