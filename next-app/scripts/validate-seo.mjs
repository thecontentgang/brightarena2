// SEO validator for the Next.js app. Port of the Vite app's scripts/validate-seo.mjs: same checks, same
// URL policy (https + www + trailing slash), but it always talks HTTP so redirects and status codes are the
// real ones the server returns (the Vite version simulated them from dist/ files).
//
//   pnpm build && pnpm seo:check            starts `next start` on a free port, checks it, stops it
//   node scripts/validate-seo.mjs --base=<url>   checks an already running server or deployment
//   node scripts/validate-seo.mjs --live         checks https://www.brightarenainteriors.com
// Exits 1 if any check fails.

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { legacyRedirects } from "../redirects.ts";

const ORIGIN = "https://www.brightarenainteriors.com";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

// Alias URLs that intentionally canonicalise to another page, so they share its title and description.
const ALIASES = {
  "/top-interior-designers-in-hyderabad/": "/top-interior-designer-in-hyderabad/",
  "/top-luxury-interior-designers-in-hyderabad/": "/luxury-interior-designers-in-hyderabad/",
};
// Placeholder pages deliberately kept out of the index until they have content.
const NOINDEX = ["/blogs/art-of-biophilic-design/"];
const EXTRA_ROUTES = [...Object.keys(ALIASES), ...NOINDEX];

const failures = [];
const fail = (where, message) => failures.push(`${where}: ${message}`);

let base;
async function get(route) {
  const res = await fetch(base + route, { redirect: "manual" });
  return {
    status: res.status,
    location: res.headers.get("location"),
    xRobots: res.headers.get("x-robots-tag"),
    body: await res.text(),
  };
}

const decode = (s = "") =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const attr = (tag, name) => decode((tag.match(new RegExp(`\\b${name}=["']([^"']*)`, "i")) || [])[1]);
const tags = (html, re) => html.match(re) || [];
// Location headers may be absolute; compare by path.
const locPath = (loc) => (loc ? loc.replace(/^https?:\/\/[^/]+/, "") : loc);

const statusCache = new Map();
const statusOf = (route) => {
  if (!statusCache.has(route)) statusCache.set(route, get(route));
  return statusCache.get(route);
};

async function sitemapRoutes() {
  const routes = {};
  const robots = await get("/robots.txt");
  if (robots.status !== 200) fail("/robots.txt", `status ${robots.status}`);
  if (/^\s*Disallow:\s*\/\s*$/im.test(robots.body)) fail("/robots.txt", "blocks the whole site");

  const listed = [...robots.body.matchAll(/^Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!listed.length) fail("/robots.txt", "lists no sitemaps");
  for (const name of ["/sitemap.xml", "/blog-sitemap.xml", "/image-sitemap.xml"]) {
    if (!listed.includes(ORIGIN + name)) fail("/robots.txt", `does not list ${name}`);
  }

  const counts = {};
  for (const url of listed) {
    const name = url.replace(ORIGIN, "");
    const res = await get(name);
    if (res.status !== 200) { fail(name, `status ${res.status}`); continue; }
    if (!/xml/.test(res.body.slice(0, 60))) fail(name, "is not an XML document");
    if (/<lastmod>/.test(res.body) && new Set(res.body.match(/<lastmod>.*?<\/lastmod>/g)).size === 1 && res.body.match(/<lastmod>/g).length > 1) {
      fail(name, "every <lastmod> is identical, so it reports the build time and not real changes");
    }
    counts[name] = { urls: 0, images: 0 };
    for (const [, loc] of res.body.matchAll(/<url>\s*<loc>(.*?)<\/loc>/g)) {
      counts[name].urls++;
      if (!loc.startsWith(`${ORIGIN}/`) || !loc.endsWith("/")) fail(name, `URL breaks the policy: ${loc}`);
      (routes[loc.replace(ORIGIN, "")] ||= new Set()).add(name);
    }
    for (const [, img] of res.body.matchAll(/<image:loc>(.*?)<\/image:loc>/g)) {
      counts[name].images++;
      const r = await statusOf(encodeURI(img.replace(ORIGIN, "")));
      if (r.status !== 200) fail(name, `image returns ${r.status}: ${img}`);
    }
  }
  return { routes, counts };
}

async function checkPage(route, inSitemap, seen, internalLinks) {
  const res = await get(route);
  if (res.status !== 200) {
    fail(route, `status ${res.status}${res.location ? ` -> ${res.location}` : ""}${inSitemap ? " (listed in sitemap)" : ""}`);
    return;
  }
  const html = res.body;
  const [head, bodyPart = ""] = html.split("</head>");

  // Replaces the Vite "root is empty" check: the server HTML must already carry the page content.
  const visibleText = bodyPart
    .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (visibleText.length < 500) fail(route, `server HTML has only ${visibleText.length} characters of text, so content is not prerendered`);

  const titles = tags(head, /<title[^>]*>[\s\S]*?<\/title>/gi).map((t) => decode(t.replace(/<[^>]+>/g, "").trim()));
  if (titles.length !== 1) fail(route, `expected 1 <title> in <head>, found ${titles.length}`);
  if (tags(bodyPart, /<title[\s>]/gi).length) fail(route, "<title> rendered outside <head>");

  const descriptions = tags(head, /<meta[^>]*name=["']description["'][^>]*>/gi).map((t) => attr(t, "content"));
  if (descriptions.length !== 1) fail(route, `expected 1 meta description in <head>, found ${descriptions.length}`);
  else if (descriptions[0].length < 50) fail(route, `meta description is too short to be meaningful (${descriptions[0].length} chars)`);

  const canonicals = tags(html, /<link[^>]*rel=["']canonical["'][^>]*>/gi).map((t) => attr(t, "href"));
  const expected = `${ORIGIN}${ALIASES[route] || route}`;
  if (canonicals.length !== 1) fail(route, `expected 1 canonical, found ${canonicals.length}`);
  else if (canonicals[0] !== expected) fail(route, `canonical is ${canonicals[0]}, expected ${expected}`);
  if (canonicals[0]) {
    const target = await statusOf(canonicals[0].replace(ORIGIN, ""));
    if (target.status !== 200) fail(route, `canonical target returns ${target.status}`);
  }

  for (const prop of ["og:url", "og:title", "og:description", "og:image", "og:type", "og:site_name"]) {
    const n = tags(head, new RegExp(`<meta[^>]*property=["']${prop}["'][^>]*>`, "gi")).length;
    if (n !== 1) fail(route, `expected 1 ${prop}, found ${n}`);
  }
  for (const name of ["twitter:card", "twitter:title", "twitter:description", "twitter:image", "twitter:url", "author", "keywords"]) {
    const n = tags(head, new RegExp(`<meta[^>]*name=["']${name}["'][^>]*>`, "gi")).length;
    if (n !== 1) fail(route, `expected 1 ${name} meta, found ${n}`);
  }

  const ogUrl = tags(head, /<meta[^>]*property=["']og:url["'][^>]*>/gi).map((t) => attr(t, "content"))[0];
  if (ogUrl !== canonicals[0]) fail(route, `og:url (${ogUrl}) differs from canonical`);

  const ogImage = tags(head, /<meta[^>]*property=["']og:image["'][^>]*>/gi).map((t) => attr(t, "content"))[0];
  if (ogImage?.startsWith(ORIGIN)) {
    const r = await statusOf(encodeURI(ogImage.replace(ORIGIN, "")));
    if (r.status !== 200) fail(route, `og:image returns ${r.status}: ${ogImage}`);
  }

  const robots = tags(html, /<meta[^>]*name=["'](?:robots|googlebot)["'][^>]*>/gi).map((t) => attr(t, "content")).join(" ");
  const noindexed = /noindex/i.test(`${robots} ${res.xRobots || ""}`);
  if (NOINDEX.includes(route)) {
    if (!noindexed) fail(route, "placeholder page is missing noindex");
    if (inSitemap) fail(route, "noindex page is listed in a sitemap");
  } else if (noindexed) fail(route, "unintended noindex");

  const h1Count = tags(bodyPart, /<h1\b/gi).length;
  if (h1Count !== 1) fail(route, `expected 1 <h1>, found ${h1Count}`);

  const types = [];
  for (const block of tags(html, /<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi)) {
    try {
      const data = JSON.parse(block.replace(/<[^>]+>/g, ""));
      types.push(data["@type"]);
      if (data["@type"] === "BlogPosting" && (!data.headline || data.telephone || data.address)) {
        fail(route, "BlogPosting schema needs a headline and must not carry business fields");
      }
    } catch {
      fail(route, "invalid JSON-LD");
    }
  }
  if (new Set(types).size !== types.length) fail(route, `duplicate JSON-LD types: ${types.join(", ")}`);
  if (!types.includes("BreadcrumbList") && route !== "/") fail(route, "missing BreadcrumbList JSON-LD");
  const expectsArticle = /^\/blogs\/[^/]+\/$/.test(route);
  if (expectsArticle && !types.includes("BlogPosting")) fail(route, "blog post is missing BlogPosting JSON-LD");
  if (!expectsArticle && !types.includes("LocalBusiness")) fail(route, "missing LocalBusiness JSON-LD");

  if (!ALIASES[route]) {
    if (titles[0]) (seen.titles[titles[0]] ||= []).push(route);
    if (descriptions[0]) (seen.descriptions[descriptions[0]] ||= []).push(route);
  }

  for (const [, href] of bodyPart.matchAll(/<a\b[^>]*\shref=["']([^"'#]+)/gi)) {
    const internal = href.startsWith(ORIGIN) ? href.slice(ORIGIN.length) : href;
    if (internal.startsWith("/")) (internalLinks[decode(internal)] ||= new Set()).add(route);
  }
}

async function checkRedirects() {
  const sources = new Set();
  for (const { source, destination, permanent } of legacyRedirects) {
    if (sources.has(source)) fail("redirects.ts", `duplicate redirect source ${source}`);
    sources.add(source);
    if (permanent !== true) fail("redirects.ts", `${source} is not permanent`);
    if (legacyRedirects.some((r) => r.source === destination)) fail("redirects.ts", `redirect chain at ${source} -> ${destination}`);

    const r = await get(source);
    if (r.status !== 308) fail(source, `redirect returns ${r.status}, expected 308`);
    else if (locPath(r.location) !== destination) fail(source, `redirects to ${r.location}, expected ${destination}`);
    const d = await statusOf(destination);
    if (d.status !== 200) fail(source, `redirect destination ${destination} returns ${d.status}`);

    // The slashless spelling first gets the trailing-slash 308, then this redirect (same as Vercel's
    // trailingSlash + redirects). It must land on the destination within those two hops.
    const bare = source.replace(/\/$/, "");
    const b1 = await get(bare);
    if (b1.status !== 308 || locPath(b1.location) !== source) fail(bare, `expected 308 -> ${source}, got ${b1.status} -> ${b1.location}`);
  }
  return legacyRedirects.length;
}

async function checkUrlPolicy(routes) {
  // Slashless page URLs must 308 to the slash form (canonical policy).
  for (const route of routes.filter((r) => r !== "/").slice(0, 60)) {
    const r = await get(route.replace(/\/$/, ""));
    if (r.status !== 308 || locPath(r.location) !== route) fail(route, `slashless form returns ${r.status} -> ${r.location}`);
  }
  // Unknown URLs must return a real 404 rendered with the site's NotFoundPage.
  const missing = await get("/this-page-does-not-exist/");
  if (missing.status !== 404) fail("/this-page-does-not-exist/", `status ${missing.status}, expected 404`);
  else if (!/Page Not Found/.test(missing.body)) fail("/this-page-does-not-exist/", "404 does not render the NotFoundPage design");
  const badSlug = await get("/services/not-a-real-service/");
  if (badSlug.status !== 404) fail("/services/not-a-real-service/", `status ${badSlug.status}, expected 404`);
  // Sitemaps and robots keep their file URLs (no trailing slash added).
  for (const f of ["/sitemap.xml", "/blog-sitemap.xml", "/image-sitemap.xml", "/robots.txt"]) {
    const r = await get(f);
    if (r.status !== 200) fail(f, `status ${r.status}`);
  }
}

async function freePort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => { const { port } = srv.address(); srv.close(() => resolve(port)); });
  });
}

async function startServer() {
  if (!fs.existsSync(path.join(root, ".next", "BUILD_ID"))) {
    console.error(".next/ build not found. Run `pnpm build` first.");
    process.exit(1);
  }
  const port = await freePort();
  const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], { cwd: root, stdio: "pipe" });
  const url = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    try { await fetch(url + "/robots.txt"); return { url, child }; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  child.kill();
  throw new Error("next start did not become ready");
}

async function main() {
  const baseArg = process.argv.find((a) => a.startsWith("--base="));
  let server;
  if (process.argv.includes("--live")) base = ORIGIN;
  else if (baseArg) base = baseArg.slice("--base=".length).replace(/\/$/, "");
  else { server = await startServer(); base = server.url; }

  try {
    const { routes: inSitemap, counts } = await sitemapRoutes();
    const routes = [...new Set([...Object.keys(inSitemap), ...EXTRA_ROUTES])];
    const seen = { titles: {}, descriptions: {} };
    const internalLinks = {};

    for (let i = 0; i < routes.length; i += 6) {
      await Promise.all(routes.slice(i, i + 6).map((r) => checkPage(r, Boolean(inSitemap[r]), seen, internalLinks)));
    }

    for (const [kind, values] of Object.entries(seen)) {
      for (const [value, pages] of Object.entries(values)) {
        if (pages.length > 1) fail(pages.join(", "), `share one ${kind.slice(0, -1)}: "${value.slice(0, 70)}"`);
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
    await checkUrlPolicy(routes);

    console.log(`Target: ${base}`);
    console.log(`Sitemaps: ${Object.entries(counts).map(([n, c]) => `${n} ${c.urls} URLs${c.images ? ` / ${c.images} images` : ""}`).join(", ")}`);
    console.log(`Checked ${routes.length} pages, ${links.length} internal link targets, ${redirectCount} redirects.`);
    if (failures.length) {
      console.log(`\n${failures.length} FAILED:`);
      for (const f of failures) console.log(`  - ${f}`);
      process.exitCode = 1;
    } else console.log("All SEO checks passed.");
  } finally {
    server?.child.kill();
  }
}

main();
