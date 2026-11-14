import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { blogSeoProps } from "@/lib/routeSeo";
import * as articleMeta from "@/views/blogs/meta/SmallHomeInteriorDesignIdeas.meta";
import SmallHomeInteriorDesignIdeas from "@/views/blogs/SmallHomeInteriorDesignIdeas";

const path = "/blogs/small-home-interior-design-ideas/";
const seo: SEOProps = blogSeoProps(articleMeta);

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <SmallHomeInteriorDesignIdeas />
    </>
  );
}
