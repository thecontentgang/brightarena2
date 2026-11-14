import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import { DESCRIPTION, H1, PAGE_URL, TITLE } from "@/views/meta/LuxuryPage.meta";
import LuxuryPage from "@/views/LuxuryPage";

const path = "/luxury-interior-designers-in-hyderabad/";
const seo: SEOProps = { title: TITLE, description: DESCRIPTION, h1: H1, url: PAGE_URL, injectH1: false };

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <LuxuryPage />
    </>
  );
}
