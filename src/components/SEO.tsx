import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { getPageSEO } from '../data/pages';

interface SEOProps {
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
}

export default function SEO({
  title,
  description,
  h1,
  name = 'Bright Arena Interiors',
  type,
  url,
  image,
  keywords,
  schema,
  injectH1 = true
}: SEOProps) {
  const location = useLocation();
  const pageData = getPageSEO(location.pathname);

  const finalTitle = title || pageData?.title || 'Bright Arena | Luxury Interior Designers in Hyderabad';
  const finalDescription = description || pageData?.description || "Bright Arena Interiors is Hyderabad's premier luxury design studio. We transform residential and commercial spaces into timeless, functional, and breathtaking environments.";
  const finalKeywords = keywords || pageData?.keywords || 'luxury interior design, interior designers Hyderabad, residential interiors, commercial interiors, Bright Arena';
  const finalH1 = h1 || pageData?.h1 || finalTitle;
  const finalUrl = url || pageData?.canonical || `https://www.brightarenainteriors.com${location.pathname.endsWith('/') ? location.pathname : location.pathname + '/'}`;
  const finalType = type || pageData?.type || 'website';
  const finalImage = image || pageData?.ogImage || 'https://www.brightarenainteriors.com/og-image.jpg';

  const SITE_URL = 'https://www.brightarenainteriors.com/';
  // Pages with their own schemaType (e.g. BlogPosting) keep their page-level identity;
  // every other page describes the one business entity with a single stable @id.
  const isBusiness = !pageData?.schemaType;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': pageData?.schemaType || 'LocalBusiness',
    name: name,
    image: 'https://www.brightarenainteriors.com/bright-logo.webp',
    '@id': isBusiness ? `${SITE_URL}#business` : finalUrl,
    url: isBusiness ? SITE_URL : finalUrl,
    telephone: '+918978222980',
    // Address matches Footer.tsx and ContactPage.tsx. Opening hours and geo coordinates are omitted until verified.
    address: {
      '@type': 'PostalAddress',
      streetAddress: '4th Floor, 23 Nordwest, P Janardhan Reddy Nagar, Gachibowli',
      addressLocality: 'Hyderabad',
      addressRegion: 'Telangana',
      postalCode: '500032',
      addressCountry: 'IN',
    },
  };

  const finalSchema = schema || defaultSchema;

  return (
    <>
      <Helmet>
        {/* Standard metadata tags */}
        <title>{finalTitle}</title>
        <meta name='description' content={finalDescription} />
        <meta name='author' content={name} />
        <meta name='keywords' content={finalKeywords} />
        <link rel="canonical" href={finalUrl} />

        {/* Facebook tags */}
        <meta property='og:type' content={finalType} />
        <meta property='og:title' content={finalTitle} />
        <meta property='og:description' content={finalDescription} />
        <meta property='og:image' content={finalImage} />
        <meta property='og:url' content={finalUrl} />
        <meta property='og:site_name' content={name} />

        {/* Twitter tags */}
        <meta name='twitter:creator' content={name} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={finalTitle} />
        <meta name='twitter:description' content={finalDescription} />
        <meta name='twitter:image' content={finalImage} />
        <meta name='twitter:url' content={finalUrl} />

        {/* Schema */}
        <script type='application/ld+json'>{JSON.stringify(finalSchema)}</script>
      </Helmet>
      
      {injectH1 && <h1 className="sr-only">{finalH1}</h1>}
    </>
  );
}
