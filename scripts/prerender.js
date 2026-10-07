import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
const distServerPath = path.resolve(__dirname, '../dist-server');

const routes = [
  '/',
  '/about/',
  '/services/',
  '/services/home-interior-designs-hyderabad/',
  '/services/commercial-interior-designers-in-hyderabad/',
  '/services/office-interior-designers-in-hyderabad/',
  '/services/2d-3d-interior-design-services-in-hyderabad/',
  '/interior-designer-gachibowli/',
  '/interior-designer-madhapur/',
  '/interior-designer-hitec-city/',
  '/interior-designer-kondapur/',
  '/interior-designer-whitefields/',
  '/designs/',
  '/designs/living-room-interior-design-hyderabad/',
  '/designs/bedroom-interior-design-hyderabad/',
  '/designs/kitchen-interior-design-hyderabad/',
  '/portfolio/',
  '/portfolio/forest-edge-interior-design-project-hyderabad/',
  '/portfolio/rajapushpa-interior-design-project-hyderabad/',
  '/portfolio/vara-prasad-bachupally-interior-design-project-hyderabad/',
  '/portfolio/etna-by-phoenix-interior-design-project-hyderabad/',
  '/portfolio/banali-foods-commercial-interior-design-project-hyderabad/',
  '/portfolio/kollur-apartment-interior-design-project-hyderabad/',
  '/blogs/',
  '/blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026/',
  '/blogs/art-of-biophilic-design/',
  '/blogs/mastering-lighting-invisible-architecture/',
  '/blogs/small-home-interior-design-ideas/',
  '/blogs/bedroom-interior-design-ideas/',
  '/blogs/living-room-interior-design-ideas/',
  '/testimonials/',
  '/contact/',
  '/privacy-policy/',
  '/luxury-interior-designers-in-hyderabad/',
  '/top-luxury-interior-designers-in-hyderabad/',
  '/portfolio/mr-nageswara-rao/',
  '/portfolio/haseeb-my-home-bhooja/',
  '/portfolio/rakesh-bhupathi-nagole/',
  '/portfolio/sammys-villa-bangalore/',
  '/portfolio/praveen-aparna-zenith/',
  '/404.html'
];

async function prerender() {
  const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
  // Dynamic import the SSR bundle
  const { render } = await import(pathToFileURL(path.resolve(distServerPath, 'entry-server.js')).href);

  for (const route of routes) {
    console.log(`Prerendering ${route}...`);
    try {
      // Mock global for components relying on it (like lenis/framer motion)
      global.__IS_PRERENDERING__ = true;
      global.window = undefined;
      
      const helmetContext = {};
      const url = route.endsWith('.html') ? route.replace('.html', '') : route;
      const appHtml = await render(url, helmetContext);
      
      const { helmet } = helmetContext;
      
      let html = template.replace(`<div id="root"></div>`, `<div id="root">${appHtml}</div>`);
      
      // Extract title, meta, link tags emitted by React 18 into the appHtml
      const titleMatch = appHtml.match(/<title>.*?<\/title>/gi);
      const metaMatches = appHtml.match(/<meta[^>]*>/gi);
      const linkMatches = appHtml.match(/<link[^>]*rel="canonical"[^>]*>/gi);
      const scriptMatches = appHtml.match(/<script type="application\/ld\+json">.*?<\/script>/gi);

      // Strip hardcoded title and description from template
      html = html.replace(/<title>.*?<\/title>/gi, '');
      html = html.replace(/<meta[^>]*name="description"[^>]*>/gi, '');

      // Remove the inline tags from the body so they don't appear in the middle of the document
      html = html.replace(/<title>.*?<\/title>/gi, ''); // Rematch to clear body ones too
      
      let newHeadTags = '';
      if (titleMatch) newHeadTags += titleMatch.join('\n') + '\n';
      
      if (metaMatches) {
        newHeadTags += metaMatches.join('\n') + '\n';
        // Remove them from the body
        for (const m of metaMatches) {
          html = html.replace(m, '');
        }
      }
      
      if (linkMatches) {
        newHeadTags += linkMatches.join('\n') + '\n';
        for (const m of linkMatches) {
          html = html.replace(m, '');
        }
      }

      if (scriptMatches) {
        newHeadTags += scriptMatches.join('\n') + '\n';
        for (const m of scriptMatches) {
          html = html.replace(m, '');
        }
      }
      
      // Inject all extracted tags right before </head>
      html = html.replace('</head>', `\n${newHeadTags}\n</head>`);
      
      if (route === '/404.html') {
        fs.writeFileSync(path.join(distPath, '404.html'), html);
      } else {
        const routePath = path.join(distPath, route);
        if (!fs.existsSync(routePath)) {
          fs.mkdirSync(routePath, { recursive: true });
        }
        fs.writeFileSync(path.join(routePath, 'index.html'), html);
      }
      console.log(`Saved ${route}`);
    } catch (err) {
      console.error(`Error prerendering ${route}:`, err);
      process.exit(1);
    }
  }
  
  // Clean up SSR build
  try {
    fs.rmSync(distServerPath, { recursive: true, force: true });
  } catch (e) {
    // ignore cleanup errors
  }
  console.log('Prerendering complete!');
}

prerender();
