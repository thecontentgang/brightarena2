import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import PrivacyPolicyPage from "@/views/PrivacyPolicyPage";

const path = "/privacy-policy/";
const seo: SEOProps = {
  title: "Privacy Policy - Bright Arena Interiors",
  description: "Privacy policy and data handling practices for Bright Arena Interiors.",
  url: "https://www.brightarenainteriors.com/privacy-policy",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <PrivacyPolicyPage />
    </>
  );
}
