import type { Metadata } from "next";
import SEO from "@/components/SEO";
import { buildMetadata, type SEOProps } from "@/lib/seo";
import NotFoundPage from "@/views/NotFoundPage";

// Same props the Vite NotFoundPage passed to <SEO /> (prerendered there as /404.html).
const path = "/404";
const seo: SEOProps = {
  title: "Page Not Found - Bright Arena Interiors",
  description: "The page you are looking for does not exist.",
  url: "https://www.brightarenainteriors.com/404",
};

export const metadata: Metadata = buildMetadata(path, seo);

export default function NotFound() {
  return (
    <>
      <SEO path={path} {...seo} />
      <NotFoundPage />
    </>
  );
}
