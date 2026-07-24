import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  keywords?: string;
  schema?: Record<string, unknown>;
}

export default function SEO({
  title = 'Bright Arena | Luxury Interior Designers in Hyderabad',
  description = "Bright Arena Interiors is Hyderabad's premier luxury design studio. We transform residential and commercial spaces into timeless, functional, and breathtaking environments.",
  name = 'Bright Arena Interiors',
  type = 'website',
  url = 'https://www.brightarenainteriors.com',
  image = 'https://www.brightarenainteriors.com/og-image.jpg',
  keywords = 'luxury interior design, interior designers Hyderabad, residential interiors, commercial interiors, Bright Arena',
  schema,
}: SEOProps) {
  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'InteriorDesign',
    name: 'Bright Arena Interiors',
    image: `${url}/bright-logo.webp`,
    '@id': url,
    url: url,
    telephone: '+918978222980',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Hyderabad',
      addressLocality: 'Hyderabad',
      addressRegion: 'TG',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 17.385044,
      longitude: 78.486671,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '21:00',
    },
  };

  const finalSchema = schema || defaultSchema;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content={name} />
      <meta name='keywords' content={keywords} />
      <link rel="canonical" href={url} />

      {/* Facebook tags */}
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:site_name' content={name} />

      {/* Twitter tags */}
      <meta name='twitter:creator' content={name} />
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />
      <meta name='twitter:url' content={url} />

      {/* Schema */}
      <script type='application/ld+json'>{JSON.stringify(finalSchema)}</script>
    </Helmet>
  );
}
