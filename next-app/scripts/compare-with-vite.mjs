// Parity check: compares every prerendered page of the original Vite build (../dist, produced by the Vite
// app's `pnpm build`) with the same URL served by this Next.js build. Development-only tool: it reads the
// sibling Vite output when it exists and is skipped otherwise, so it never makes the app depend on it.
//
//   pnpm build && pnpm seo:compare [--vite-dist=<path>] [--base=<url>]
//
// Compared per route: <title>, description, keywords, author, canonical, robots, every og:* and twitter:*
// tag, the set of JSON-LD objects, the H1 texts, visible body text, internal link targets and image URLs.

import { spawn } from "node:child_process";
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distArg = process.argv.find((a) => a.startsWith("--vite-dist="));
const dist = path.resolve(distArg ? distArg.slice(12) : path.join(root, "..", "dist"));
const baseArg = process.argv.find((a) => a.startsWith("--base="));

if (!fs.existsSync(path.join(dist, "index.html"))) {
  console.log(`No Vite build at ${dist}; nothing to compare (pass --vite-dist=<path>).`);
  process.exit(0);
}

const decode = (s = "") =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const attr = (tag, name) => decode((tag.match(new RegExp(`\\s${name}=(?:"([^"]*)"|'([^']*)')`, "i")) || []).slice(1).find((v) => v !== undefined));

function sortKeys(v) {
  if (Array.isArray(v)) return v.map(sortKeys);
  if (v && typeof v === "object") return Object.fromEntries(Object.keys(v).sort().map((k) => [k, sortKeys(v[k])]));
  return v;
}

// The Vite prerender serialised lazy routes with React's streaming format: Suspense fallbacks in place
// (<!--$?--><template id="B:n"></template>…<!--/$-->) and the resolved content after the footer in
// <div hidden id="S:n">, swapped in by an inline script. Apply that swap so text compares in reading order.
function resolveStreamedSuspense(html) {
  for (;;) {
    const open = html.match(/<div hidden(?:="")? id="S:(\d+)">/);
    if (!open) return html;
    const start = open.index, id = open[1];
    let depth = 0, i = start, end = -1;
    const re = /<div\b|<\/div>/g;
    re.lastIndex = start;
    let m;
    while ((m = re.exec(html))) {
      depth += m[0] === "</div>" ? -1 : 1;
      if (depth === 0) { end = m.index + m[0].length; break; }
    }
    if (end < 0) return html;
    i = start + open[0].length;
    const content = html.slice(i, end - "</div>".length);
    html = html.slice(0, start) + html.slice(end);
    const ph = new RegExp(`<!--\\$\\?--><template id="B:${id}"></template>[\\s\\S]*?<!--/\\$-->`);
    if (!ph.test(html)) return html;
    html = html.replace(ph, () => `<!--$-->${content}<!--/$-->`);
  }
}

function extract(rawHtml) {
  const html = resolveStreamedSuspense(rawHtml);
  const [head, body = ""] = html.split(/<\/head>/i);
  const meta = {};
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  meta.title = title ? decode(title[1].trim()) : undefined;
  for (const tag of head.match(/<meta\b[^>]*>/gi) || []) {
    const key = attr(tag, "name") || attr(tag, "property");
    if (!key) continue;
    if (!/^(description|keywords|author|robots|og:[a-z_:]+|twitter:[a-z_:]+)$/.test(key)) continue;
    (meta[key] ||= []).push(attr(tag, "content"));
  }
  meta.canonical = (html.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi) || []).map((t) => attr(t, "href"));

  const jsonld = (html.match(/<script[^>]*application\/ld\+json[^>]*>[\s\S]*?<\/script>/gi) || [])
    .map((b) => JSON.stringify(sortKeys(JSON.parse(b.replace(/^<script[^>]*>|<\/script>$/gi, "")))))
    .sort();

  const h1 = (body.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/gi) || []).map((h) => decode(h.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim());

  const text = decode(
    body
      .replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, " ")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<[^>]+>/g, " ")
  ).replace(/\s+/g, " ").trim();

  const links = [...new Set([...body.matchAll(/<a\b[^>]*\shref=["']([^"'#]*)/gi)].map((m) => decode(m[1])).filter((h) => h.startsWith("/")))].sort();
  const images = [...new Set([...body.matchAll(/<(?:img|source)\b[^>]*\s(?:src|srcSet|srcset)=["']([^"']+)/gi)].map((m) => decode(m[1])))].sort();
  return { meta, jsonld, h1, text, links, images };
}

function diffText(a, b) {
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  return `first difference at char ${i}:\n      vite: …${a.slice(Math.max(0, i - 60), i + 80)}…\n      next: …${b.slice(Math.max(0, i - 60), i + 80)}…`;
}

async function freePort() {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.listen(0, () => { const { port } = srv.address(); srv.close(() => resolve(port)); });
  });
}

async function startServer() {
  const port = await freePort();
  const child = spawn(process.execPath, [path.join(root, "node_modules", "next", "dist", "bin", "next"), "start", "-p", String(port)], { cwd: root, stdio: "pipe" });
  const url = `http://localhost:${port}`;
  for (let i = 0; i < 120; i++) {
    try { await fetch(url + "/robots.txt"); return { url, child }; } catch { await new Promise((r) => setTimeout(r, 500)); }
  }
  child.kill();
  throw new Error("next start did not become ready");
}

function viteRoutes() {
  const out = [];
  (function walk(dir, rel) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(dir, e.name), `${rel}${e.name}/`);
      else if (e.name === "index.html") out.push(rel);
    }
  })(dist, "/");
  return out.sort();
}

async function main() {
  const server = baseArg ? null : await startServer();
  const base = baseArg ? baseArg.slice(7).replace(/\/$/, "") : server.url;
  const routes = viteRoutes();
  let problems = 0;
  const report = [];
  try {
    for (const route of routes) {
      const vite = extract(fs.readFileSync(path.join(dist, route, "index.html"), "utf8"));
      const res = await fetch(base + route, { redirect: "manual" });
      if (res.status !== 200) { report.push(`${route}\n    Next.js status ${res.status}`); problems++; continue; }
      const next = extract(await res.text());
      const issues = [];
      const keys = new Set([...Object.keys(vite.meta), ...Object.keys(next.meta)]);
      for (const k of keys) {
        const a = JSON.stringify(vite.meta[k]), b = JSON.stringify(next.meta[k]);
        if (a !== b) issues.push(`meta ${k}: vite=${a} next=${b}`);
      }
      if (JSON.stringify(vite.jsonld) !== JSON.stringify(next.jsonld)) {
        const onlyVite = vite.jsonld.filter((j) => !next.jsonld.includes(j));
        const onlyNext = next.jsonld.filter((j) => !vite.jsonld.includes(j));
        issues.push(`JSON-LD differs:\n      only vite: ${onlyVite.join("\n                 ")}\n      only next: ${onlyNext.join("\n                 ")}`);
      }
      if (JSON.stringify(vite.h1) !== JSON.stringify(next.h1)) issues.push(`h1: vite=${JSON.stringify(vite.h1)} next=${JSON.stringify(next.h1)}`);
      if (vite.text !== next.text) issues.push(`visible text (${vite.text.length} vs ${next.text.length} chars) ${diffText(vite.text, next.text)}`);
      const lA = vite.links.filter((l) => !next.links.includes(l)), lB = next.links.filter((l) => !vite.links.includes(l));
      if (lA.length || lB.length) issues.push(`links: only vite ${JSON.stringify(lA)} only next ${JSON.stringify(lB)}`);
      const iA = vite.images.filter((l) => !next.images.includes(l)), iB = next.images.filter((l) => !vite.images.includes(l));
      if (iA.length || iB.length) issues.push(`images: only vite ${JSON.stringify(iA)} only next ${JSON.stringify(iB)}`);
      if (issues.length) { problems += issues.length; report.push(`${route}\n    ${issues.join("\n    ")}`); }
    }
  } finally {
    server?.child.kill();
  }
  console.log(`Compared ${routes.length} Vite pages with ${base}`);
  if (report.length) { console.log(`\n${problems} difference(s):\n`); console.log(report.join("\n\n")); process.exitCode = 1; }
  else console.log("No differences in metadata, JSON-LD, H1s, visible text, links or images.");
}

main();
