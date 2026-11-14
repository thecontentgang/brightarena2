import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { blogSeoProps } from "@/lib/routeSeo";
import * as articleMeta from "@/views/blogs/meta/BedroomInteriorDesignIdeas.meta";
import BedroomInteriorDesignIdeas from "@/views/blogs/BedroomInteriorDesignIdeas";

const path = "/blogs/bedroom-interior-design-ideas/";
const seo: SEOProps = blogSeoProps(articleMeta);

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <BedroomInteriorDesignIdeas />
    </>
  );
}
