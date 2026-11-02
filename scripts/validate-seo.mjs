// SEO validator: checks the HTML search engines actually receive, without running any JavaScript.
//   node scripts/validate-seo.mjs                  checks the production build in dist/ (run after `npm run build`)
//   node scripts/validate-seo.mjs --live           checks https://www.brightarenainteriors.com over HTTP, without following redirects
//   node scripts/validate-seo.mjs --base=<url>     checks another deployment (e.g. a Vercel preview) over HTTP
// Exits 1 if any check fails. URL policy: https + www + trailing slash, matching vercel.json.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ORIGIN = 'https://www.brightarenainteriors.com';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const baseArg = process.argv.find((a) => a.startsWith('--base='));
const base = process.argv.includes('--live') ? ORIGIN : baseArg?.slice('--base='.length).replace(/\/$/, '');

// Alias URLs that intentionally canonicalise to another page, so they share its title and description.
const ALIASES = {
  '/top-interior-designers-in-hyderabad/': '/top-interior-designer-in-hyderabad/',
  '/top-luxury-interior-designers-in-hyderabad/': '/luxury-interior-designers-in-hyderabad/',
};
// Placeholder pages deliberately kept out of the index until they have content.
const NOINDEX = ['/blogs/art-of-biophilic-design/'];
const EXTRA_ROUTES = [...Object.keys(ALIASES), ...NOINDEX];

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

async function get(route) {
  if (base) {
    const res = await fetch(base + route, { redirect: 'manual' });
    const status = res.status;
    return { status, location: res.headers.get('location'), xRobots: res.headers.get('x-robots-tag'), body: await res.text() };
  }
  const clean = decodeURI(route.split(/[?#]/)[0]);
  const file = clean.endsWith('/') ? path.join(dist, clean, 'index.html') : path.join(dist, clean);
  if (fs.existsSync(file) && fs.statSync(file).isFile()) return { status: 200, body: fs.readFileSync(file, 'utf8') };
  // Vercel 308s a slashless path to the slash form when that page exists.
  if (!clean.endsWith('/') && fs.existsSync(path.join(dist, clean, 'index.html'))) return { status: 308, location: `${clean}/`, body: '' };
  return { status: 404, body: '' };
}

const decode = (s = '') => s.replace(/&amp;/g, '&').replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"');
const attr = (tag, name) => decode((tag.match(new RegExp(`\\b${name}=["']([^"']*)`, 'i')) || [])[1]);
const tags = (html, re) => html.match(re) || [];

const statusCache = new Map();
const statusOf = (route) => {
  if (!statusCache.has(route)) statusCache.set(route, get(route));
  return statusCache.get(route);
};

async function sitemapRoutes() {
  const routes = {};
  const robots = await get('/robots.txt');
  if (robots.status !== 200) fail('/robots.txt', `status ${robots.status}`);
  if (/^\s*Disallow:\s*\/\s*$/im.test(robots.body)) fail('/robots.txt', 'blocks the whole site');

  const listed = [...robots.body.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!listed.length) fail('/robots.txt', 'lists no sitemaps');

  for (const url of listed) {
    const name = url.replace(ORIGIN, '');
    const res = await get(name);
    if (res.status !== 200) { fail(name, `status ${res.status}`); continue; }
    if (/<lastmod>/.test(res.body) && new Set(res.body.match(/<lastmod>.*?<\/lastmod>/g)).size === 1 && res.body.match(/<lastmod>/g).length > 1) {
      fail(name, 'every <lastmod> is identical, so it reports the build time and not real changes');
    }
    for (const [, loc] of res.body.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)) {
      if (!loc.startsWith(`${ORIGIN}/`) || !loc.endsWith('/')) fail(name, `URL breaks the policy: ${loc}`);
      (routes[loc.replace(ORIGIN, '')] ||= new Set()).add(name);
    }
    for (const [, img] of res.body.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
      const r = await statusOf(encodeURI(img.replace(ORIGIN, '')));
      if (r.status !== 200) fail(name, `image returns ${r.status}: ${img}`);
    }
  }
  return routes;
}

async function checkPage(route, inSitemap, seen, internalLinks) {
  const res = await get(route);
  if (res.status !== 200) {
    fail(route, `status ${res.status}${res.location ? ` -> ${res.location}` : ''}${inSitemap ? ' (listed in sitemap)' : ''}`);
    return;
  }
  const html = res.body;
  const [head, bodyPart = ''] = html.split('</head>');

  if (/<div id="root"><\/div>/.test(html)) fail(route, 'root is empty, so the page is not prerendered');

  const titles = tags(head, /<title[^>]*>[\s\S]*?<\/title>/gi).map((t) => decode(t.replace(/<[^>]+>/g, '').trim()));
  if (titles.length !== 1) fail(route, `expected 1 <title> in <head>, found ${titles.length}`);

  const descriptions = tags(head, /<meta[^>]*name=["']description["'][^>]*>/gi).map((t) => attr(t, 'content'));
  if (descriptions.length !== 1) fail(route, `expected 1 meta description in <head>, found ${descriptions.length}`);
  else if (descriptions[0].length < 50) fail(route, `meta description is too short to be meaningful (${descriptions[0].length} chars)`);

  const canonicals = tags(html, /<link[^>]*rel=["']canonical["'][^>]*>/gi).map((t) => attr(t, 'href'));
  const expected = `${ORIGIN}${ALIASES[route] || route}`;
  if (canonicals.length !== 1) fail(route, `expected 1 canonical, found ${canonicals.length}`);
  else if (canonicals[0] !== expected) fail(route, `canonical is ${canonicals[0]}, expected ${expected}`);
  if (canonicals[0]) {
    const target = await statusOf(canonicals[0].replace(ORIGIN, ''));
    if (target.status !== 200) fail(route, `canonical target returns ${target.status}`);
  }

  const ogUrl = tags(head, /<meta[^>]*property=["']og:url["'][^>]*>/gi).map((t) => attr(t, 'content'))[0];
  if (ogUrl !== canonicals[0]) fail(route, `og:url (${ogUrl}) differs from canonical`);

  const ogImage = tags(head, /<meta[^>]*property=["']og:image["'][^>]*>/gi).map((t) => attr(t, 'content'))[0];
  if (ogImage?.startsWith(ORIGIN)) {
    const r = await statusOf(encodeURI(ogImage.replace(ORIGIN, '')));
    if (r.status !== 200) fail(route, `og:image returns ${r.status}: ${ogImage}`);
  }

  const robots = tags(html, /<meta[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi).map((t) => attr(t, 'content')).join(' ');
  const noindexed = /noindex/i.test(`${robots} ${res.xRobots || ''}`);
  if (NOINDEX.includes(route)) {
    if (!noindexed) fail(route, 'placeholder page is missing noindex');
    if (inSitemap) fail(route, 'noindex page is listed in a sitemap');
  } else if (noindexed) fail(route, 'unintended noindex');

  const h1Count = tags(bodyPart, /<h1\b/gi).length;
  if (h1Count !== 1) fail(route, `expected 1 <h1>, found ${h1Count}`);

  for (const block of tags(html, /<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi)) {
    try {
      const data = JSON.parse(block.replace(/<[^>]+>/g, ''));
      if (data['@type'] === 'BlogPosting' && (!data.headline || data.telephone || data.address)) {
        fail(route, 'BlogPosting schema needs a headline and must not carry business fields');
      }
    } catch {
      fail(route, 'invalid JSON-LD');
    }
  }

  if (!ALIASES[route]) {
    if (titles[0]) (seen.titles[titles[0]] ||= []).push(route);
    if (descriptions[0]) (seen.descriptions[descriptions[0]] ||= []).push(route);
  }

  for (const [, href] of bodyPart.matchAll(/<a\b[^>]*\shref=["']([^"'#]+)/gi)) {
    const internal = href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) : href;
    if (internal.startsWith('/')) (internalLinks[decode(internal)] ||= new Set()).add(route);
  }
}

async function checkRedirects() {
  const { redirects = [], trailingSlash } = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'));
  if (trailingSlash !== true) fail('vercel.json', 'trailingSlash must stay true to match the URL policy');
  const sources = new Set();
  for (const { source, destination, permanent } of redirects) {
    if (sources.has(source)) fail('vercel.json', `duplicate redirect source ${source}`);
    sources.add(source);
    if (!permanent) fail('vercel.json', `${source} is not permanent`);
    if (redirects.some((r) => r.source === destination)) fail('vercel.json', `redirect chain at ${source} -> ${destination}`);
    if (fs.existsSync(path.join(dist, source, 'index.html'))) fail('vercel.json', `${source} redirects but is also a built page`);
    if (!fs.existsSync(path.join(dist, destination, 'index.html'))) fail('vercel.json', `${source} redirects to ${destination}, which is not a built page`);
  }
  return redirects.length;
}

async function main() {
  if (!base && !fs.existsSync(path.join(dist, 'index.html'))) {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  const inSitemap = await sitemapRoutes();
  const routes = [...new Set([...Object.keys(inSitemap), ...EXTRA_ROUTES])];
  const seen = { titles: {}, descriptions: {} };
  const internalLinks = {};

  for (let i = 0; i < routes.length; i += 6) {
    await Promise.all(routes.slice(i, i + 6).map((r) => checkPage(r, Boolean(inSitemap[r]), seen, internalLinks)));
  }

  for (const [kind, values] of Object.entries(seen)) {
    for (const [value, pages] of Object.entries(values)) {
      if (pages.length > 1) fail(pages.join(', '), `share one ${kind.slice(0, -1)}: "${value.slice(0, 70)}"`);
    }
  }

  const links = Object.keys(internalLinks);
  for (let i = 0; i < links.length; i += 8) {
    await Promise.all(links.slice(i, i + 8).map(async (link) => {
      const r = await statusOf(link);
      if (r.status !== 200) fail(link, `internal link returns ${r.status}, from ${internalLinks[link].size} page(s) e.g. ${[...internalLinks[link]][0]}`);
    }));
  }

  const redirectCount = await checkRedirects();

  console.log(`Target: ${base || 'dist/'}`);
  console.log(`Checked ${routes.length} pages, ${links.length} internal link targets, ${redirectCount} redirects.`);
  if (failures.length) {
    console.log(`\n${failures.length} FAILED:`);
    for (const f of failures) console.log(`  - ${f}`);
    process.exit(1);
  }
  console.log('All SEO checks passed.');
}

main();
