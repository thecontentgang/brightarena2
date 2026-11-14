import { projectsData } from "@/views/ProjectsData";
import { servicesData } from "@/views/data/servicesData";
import { blogsData } from "@/views/blogsData";
import { designsData } from "@/views/designsData";

/**
 * Port of the Vite app's scripts/generate-sitemaps.ts. Same data sources, same URL list, same XML.
 * The files are now served by static route handlers (src/app/<name>/route.ts) and generated at build
 * time, instead of being written into public/ before the build.
 */
const BASE_URL = "https://www.brightarenainteriors.com";

// Every route is served with a trailing slash (trailingSlash: true), so sitemap URLs match canonicals.
const loc = (route: string) => `${BASE_URL}${route.endsWith("/") ? route : route + "/"}`;

// Static routes. Alias URLs (/top-luxury-..., /top-interior-designers-...) and the noindex placeholder
// /blogs/art-of-biophilic-design/ are deliberately absent, exactly as in the Vite generator.
export const staticRoutes = [
  "/",
  "/about",
  "/services",
  "/portfolio",
  "/designs",
  "/testimonials",
  "/blogs",
  "/contact",
  "/privacy-policy",
  "/luxury-interior-designers-in-hyderabad",
  "/top-interior-designer-in-hyderabad",
  "/interior-designer-hitec-city",
  "/interior-designer-gachibowli",
  "/interior-designer-kondapur",
  "/interior-designer-madhapur",
  "/interior-designer-whitefields",
];

// No <lastmod>: the only date available at build time is the build itself, which would mark every URL as changed on each deploy
export function generateSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  staticRoutes.forEach((route) => {
    xml += `  <url>\n    <loc>${loc(route)}</loc>\n    <changefreq>${route === "/" ? "weekly" : "monthly"}</changefreq>\n    <priority>${route === "/" ? "1.0" : "0.8"}</priority>\n  </url>\n`;
  });

  servicesData.forEach((service) => {
    xml += `  <url>\n    <loc>${loc(`/services/${service.slug}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  projectsData.forEach((project) => {
    xml += `  <url>\n    <loc>${loc(`/portfolio/${project.slug}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  designsData.forEach((design) => {
    xml += `  <url>\n    <loc>${loc(`/designs/${design.slug}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

export function generateBlogSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  blogsData.forEach((blog) => {
    xml += `  <url>\n    <loc>${loc(`/blogs/${blog.slug}`)}</loc>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  return xml;
}

export function generateImageSitemap(): string {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  projectsData.forEach((project) => {
    xml += `  <url>\n    <loc>${loc(`/portfolio/${project.slug}`)}</loc>\n`;
    if (project.heroImage)
      xml += `    <image:image>\n      <image:loc>${BASE_URL}${project.heroImage}</image:loc>\n      <image:title>${project.title.replace(/&/g, "&amp;")}</image:title>\n    </image:image>\n`;
    project.gallery?.forEach((img) => {
      xml += `    <image:image>\n      <image:loc>${BASE_URL}${img}</image:loc>\n    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  designsData.forEach((design) => {
    xml += `  <url>\n    <loc>${loc(`/designs/${design.slug}`)}</loc>\n`;
    design.images?.forEach((img) => {
      xml += `    <image:image>\n      <image:loc>${BASE_URL}${img}</image:loc>\n    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/blog-sitemap.xml
Sitemap: ${BASE_URL}/image-sitemap.xml
`;
}

export const xmlResponse = (body: string) =>
  new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
