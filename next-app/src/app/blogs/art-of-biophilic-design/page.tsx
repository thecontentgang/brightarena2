import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import ArtOfBiophilicDesign from "@/views/blogs/ArtOfBiophilicDesign";

const path = "/blogs/art-of-biophilic-design/";
const seo: SEOProps = { noindex: true };

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <ArtOfBiophilicDesign />
    </>
  );
}
