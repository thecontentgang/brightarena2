import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { projectsData } from '../src/pages/ProjectsData.ts';
import { servicesData } from '../src/pages/ServicesData.ts';
import { blogsData } from '../src/pages/blogsData.ts';
import { designsData } from '../src/pages/designsData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://www.brightarenainteriors.com';
const PUBLIC_DIR = path.resolve(__dirname, '../public');

// Static Routes
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/portfolio',
  '/designs',
  '/testimonials',
  '/blogs',
  '/contact'
];

function generateDate() {
  return new Date().toISOString();
}

function generateSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static routes
  staticRoutes.forEach(route => {
    xml += `  <url>\n    <loc>${BASE_URL}${route}</loc>\n    <lastmod>${generateDate()}</lastmod>\n    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${route === '/' ? '1.0' : '0.8'}</priority>\n  </url>\n`;
  });

  // Dynamic routes
  servicesData.forEach(service => {
    xml += `  <url>\n    <loc>${BASE_URL}/services/${service.slug}</loc>\n    <lastmod>${generateDate()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  projectsData.forEach(project => {
    xml += `  <url>\n    <loc>${BASE_URL}/portfolio/${project.slug}</loc>\n    <lastmod>${generateDate()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  designsData.forEach(design => {
    xml += `  <url>\n    <loc>${BASE_URL}/designs/${design.slug}</loc>\n    <lastmod>${generateDate()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), xml);
}

function generateBlogSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  blogsData.forEach(blog => {
    xml += `  <url>\n    <loc>${BASE_URL}/blogs/${blog.slug}</loc>\n    <lastmod>${generateDate()}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });
  xml += `</urlset>`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'blog-sitemap.xml'), xml);
}

function generateImageSitemap() {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;
  
  projectsData.forEach(project => {
    xml += `  <url>\n    <loc>${BASE_URL}/portfolio/${project.slug}</loc>\n`;
    if (project.heroImage) xml += `    <image:image>\n      <image:loc>${BASE_URL}${project.heroImage}</image:loc>\n      <image:title>${project.title.replace(/&/g, '&amp;')}</image:title>\n    </image:image>\n`;
    project.gallery?.forEach(img => {
      xml += `    <image:image>\n      <image:loc>${BASE_URL}${img}</image:loc>\n    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  designsData.forEach(design => {
    xml += `  <url>\n    <loc>${BASE_URL}/designs/${design.slug}</loc>\n`;
    design.images?.forEach(img => {
      xml += `    <image:image>\n      <image:loc>${BASE_URL}${img}</image:loc>\n    </image:image>\n`;
    });
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'image-sitemap.xml'), xml);
}

function generateRobotsTxt() {
  const txt = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
Sitemap: ${BASE_URL}/blog-sitemap.xml
Sitemap: ${BASE_URL}/image-sitemap.xml
`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), txt);
}

function run() {
  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR);
  }
  generateSitemap();
  generateBlogSitemap();
  generateImageSitemap();
  generateRobotsTxt();
  console.log('Sitemaps and robots.txt generated successfully.');
}

run();
