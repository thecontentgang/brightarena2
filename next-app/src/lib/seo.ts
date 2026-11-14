import type { Metadata } from "next";
import { getPageSEO } from "@/data/pages";

/**
 * Port of the Vite app's src/components/SEO.tsx resolution rules. The same inputs produce the same
 * title, description, keywords, canonical, Open Graph, Twitter and JSON-LD values; only the delivery
 * changed (Next.js Metadata API instead of react-helmet-async).
 *
 * Precedence for every field (unchanged): explicit prop -> src/data/pages.ts entry -> site default.
 */
export interface SEOProps {
  title?: string;
  description?: string;
  h1?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  keywords?: string;
  schema?: Record<string, unknown>;
  injectH1?: boolean;
  noindex?: boolean;
}

export const SITE_ORIGIN = "https://www.brightarenainteriors.com";
const SITE_URL = `${SITE_ORIGIN}/`;

export interface ResolvedSEO {
  title: string;
  description: string;
  keywords: string;
  h1: string;
  url: string;
  type: string;
  image: string;
  name: string;
  noindex: boolean;
  injectH1: boolean;
  schema: Record<string, unknown>;
}

export function resolveSEO(pathname: string, props: SEOProps = {}): ResolvedSEO {
  const {
    title,
    description,
    h1,
    name = "Bright Arena Interiors",
    type,
    url,
    image,
    keywords,
    schema,
    injectH1 = true,
    noindex = false,
  } = props;
  const pageData = getPageSEO(pathname);

  const finalTitle = title || pageData?.title || "Bright Arena | Luxury Interior Designers in Hyderabad";
  const finalDescription =
    description ||
    pageData?.description ||
    "Bright Arena Interiors is Hyderabad's premier luxury design studio. We transform residential and commercial spaces into timeless, functional, and breathtaking environments.";
  const finalKeywords =
    keywords ||
    pageData?.keywords ||
    "luxury interior design, interior designers Hyderabad, residential interiors, commercial interiors, Bright Arena";
  const finalH1 = h1 || pageData?.h1 || finalTitle;
  // Every canonical ends in a slash (trailingSlash: true), including `url` props.
  const rawUrl = url || pageData?.canonical || `${SITE_ORIGIN}${pathname}`;
  const finalUrl = rawUrl.endsWith("/") ? rawUrl : `${rawUrl}/`;
  const finalType = type || pageData?.type || "website";
  const finalImage = image || pageData?.ogImage || `${SITE_ORIGIN}/bright-logo.jpg`;

  const organization = { "@type": "Organization", name, url: SITE_URL };
  const isArticle = pageData?.schemaType === "BlogPosting" || /^\/blogs\/[^/]+\/?$/.test(pathname);

  // Blog posts describe the article; every other page describes the one business entity with a single stable @id.
  const defaultSchema = isArticle
    ? {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": finalUrl,
        headline: finalTitle,
        description: finalDescription,
        image: finalImage,
        url: finalUrl,
        mainEntityOfPage: finalUrl,
        author: organization,
        publisher: organization,
      }
    : {
        "@context": "https://schema.org",
        "@type": pageData?.schemaType || "LocalBusiness",
        name,
        image: `${SITE_ORIGIN}/bright-logo.webp`,
        "@id": `${SITE_URL}#business`,
        url: SITE_URL,
        telephone: "+918978222980",
        // Address matches Footer.tsx and ContactPage.tsx. Opening hours and geo coordinates are omitted until verified.
        address: {
          "@type": "PostalAddress",
          streetAddress: "4th Floor, 23 Nordwest, P Janardhan Reddy Nagar, Gachibowli",
          addressLocality: "Hyderabad",
          addressRegion: "Telangana",
          postalCode: "500032",
          addressCountry: "IN",
        },
      };

  return {
    title: finalTitle,
    description: finalDescription,
    keywords: finalKeywords,
    h1: finalH1,
    url: finalUrl,
    type: finalType,
    image: finalImage,
    name,
    noindex,
    injectH1,
    schema: schema || defaultSchema,
  };
}

/** Metadata API equivalent of the tags SEO.tsx emitted through Helmet. */
export function buildMetadata(pathname: string, props: SEOProps = {}): Metadata {
  const seo = resolveSEO(pathname, props);
  return {
    title: { absolute: seo.title },
    description: seo.description,
    authors: [{ name: seo.name }],
    keywords: seo.keywords,
    alternates: { canonical: seo.url },
    robots: seo.noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: seo.type === "article" ? "article" : "website",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
      url: seo.url,
      siteName: seo.name,
    },
    twitter: {
      creator: seo.name,
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [seo.image],
    },
    // The Metadata API has no twitter:url field; emit it as a plain meta tag like the Vite app did.
    other: { "twitter:url": seo.url },
  };
}
