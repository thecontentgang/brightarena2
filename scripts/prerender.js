import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

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
  const app = express();
  app.use(express.static(distPath));
  
  // SPA fallback
  app.use((req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });

  const server = app.listen(0, async () => {
    const port = server.address().port;
    console.log(`Server started on http://localhost:${port}`);
    
    const browser = await puppeteer.launch({ headless: 'new' });
    
    for (const route of routes) {
      const page = await browser.newPage();
      
      // Inject prerender flag to disable Lenis/Framer Motion infinite loops
      await page.evaluateOnNewDocument(() => {
        window.__IS_PRERENDERING__ = true;
      });

      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (resourceType === 'media' || req.url().endsWith('.mp4') || req.url().endsWith('.webm')) {
          req.abort();
        } else if (resourceType === 'image' && req.url().includes('panorama')) {
          req.abort();
        } else {
          req.continue();
        }
      });
      try {
        console.log(`Prerendering ${route}...`);
        try {
          await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'domcontentloaded', timeout: 15000 });
        } catch (e) {
          console.warn(`Goto timeout for ${route}, proceeding to check DOM...`);
        }
        
        // Wait for React to render (root should not be empty)
        await page.waitForFunction(() => {
          const root = document.getElementById('root');
          return root && root.innerHTML.length > 100;
        }, { timeout: 10000 });
        
        // Give Framer Motion/lazy load a tiny bit of time if needed
        await new Promise(r => setTimeout(r, 500));
        
        let html = await page.content();
        
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
      } finally {
        await page.close();
      }
    }
    
    await browser.close();
    server.close();
    console.log('Prerendering complete!');
  });
}

prerender();
