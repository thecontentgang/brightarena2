// Repeatable image optimisation for public/ — the Next.js replacement for the Vite app's
// vite-plugin-image-optimizer step. Same engine (sharp / SVGO), same settings, same "keep the original
// when the optimised file is not smaller" rule. Vite wrote the results into dist/ at every build; Next.js
// serves public/ as-is, so this script optimises public/ in place, once per file.
//
//   pnpm images:optimize            optimise new or changed images, update the manifest
//   pnpm images:optimize --check    report only; exit 1 if any image still needs optimising
//
// scripts/image-manifest.json records each processed file's original size and the SHA-1 of the file now in
// public/. A file whose hash matches its manifest entry is skipped, so lossy formats are never re-encoded
// twice. To add an image: put the original in public/ and run this script.
//
// Settings mirror vite.config.ts (ViteImageOptimizer({ webp/avif/jpeg/jpg/png: { quality: 80 } })) merged the
// way the plugin merges them (user keys replace defaults per format; untouched formats keep its defaults).

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const manifestPath = path.join(root, "scripts", "image-manifest.json");
const checkOnly = process.argv.includes("--check");

const OPTIONS = {
  png: { quality: 80 },
  jpeg: { quality: 80 },
  jpg: { quality: 80 },
  webp: { quality: 80 },
  avif: { quality: 80 },
  tiff: { quality: 100 },
  gif: {},
};
const SVGO_CONFIG = {
  multipass: true,
  plugins: [
    { name: "preset-default", params: { overrides: { cleanupNumericValues: false, cleanupIds: { minify: false, remove: false }, convertPathData: false } } },
    "sortAttrs",
    { name: "addAttributesToSVGElement", params: { attributes: [{ xmlns: "http://www.w3.org/2000/svg" }] } },
  ],
};
const TEST = /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i;

const sha1 = (buf) => crypto.createHash("sha1").update(buf).digest("hex");
const manifest = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, "utf8")) : {};

async function optimise(file, buffer) {
  const ext = path.extname(file).slice(1).toLowerCase();
  if (ext === "svg") {
    let optimize;
    try { ({ optimize } = await import("svgo")); } catch { return null; } // svgo optional: no SVG savings without it
    return Buffer.from(optimize(buffer.toString(), { path: file, ...SVGO_CONFIG }).data);
  }
  const meta = await sharp(buffer).metadata();
  const out = await sharp(buffer, { animated: ext === "gif" }).toFormat(ext, OPTIONS[ext]).toBuffer();
  const check = await sharp(out).metadata();
  if (check.width !== meta.width || check.height !== meta.height) throw new Error(`dimensions changed for ${file}`);
  return out;
}

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    // public/_img holds build-generated variants (scripts/build-responsive-images.mjs), already encoded.
    if (e.isDirectory()) { if (!(dir === publicDir && e.name === "_img")) walk(p); }
    else if (TEST.test(e.name)) files.push(p);
  }
})(publicDir);

let before = 0, after = 0, changed = 0, pending = 0;
for (const file of files.sort()) {
  const rel = path.relative(publicDir, file).split(path.sep).join("/");
  const buffer = fs.readFileSync(file);
  const entry = manifest[rel];
  if (entry && entry.sha1 === sha1(buffer)) { before += entry.originalBytes; after += buffer.length; continue; }
  if (checkOnly) { pending++; console.log(`needs optimising: ${rel}`); continue; }

  const out = await optimise(rel, buffer);
  const keep = !out || out.length >= buffer.length;
  const final = keep ? buffer : out;
  if (!keep) { fs.writeFileSync(file, final); changed++; }
  manifest[rel] = { originalBytes: buffer.length, optimizedBytes: final.length, sha1: sha1(final), skipped: keep };
  before += buffer.length;
  after += final.length;
  console.log(`${keep ? "kept    " : "optimised"} ${rel}  ${(buffer.length / 1024).toFixed(1)} kB -> ${(final.length / 1024).toFixed(1)} kB`);
}

if (!checkOnly) {
  for (const rel of Object.keys(manifest)) if (!fs.existsSync(path.join(publicDir, rel))) delete manifest[rel];
  const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
  fs.writeFileSync(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(`\n${files.length} images: ${mb(before)} original -> ${mb(after)} now (${before ? Math.round((1 - after / before) * 100) : 0}% saved); ${changed} rewritten this run.`);
if (checkOnly && pending) { console.log(`${pending} image(s) not optimised yet. Run: pnpm images:optimize`); process.exitCode = 1; }
