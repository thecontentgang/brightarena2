import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import ContactPage from "@/views/ContactPage";

const path = "/contact/";
const seo: SEOProps = {
  title: "Contact - Bright Arena Interiors Interior Designers in Hyderabad",
  description: "Contact Bright Arena Interiors, trusted interior designers in Hyderabad, to discuss your home or office interior project and book a free consultation today.",
  url: "https://www.brightarenainteriors.com/contact",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <ContactPage />
    </>
  );
}
