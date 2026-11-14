// Build-time responsive image generation (runs before `next build`, see package.json "build").
//
// For every raster image in public/ (originals are never modified) this writes resized WebP variants to
// public/_img/ and records each source's intrinsic size + content hash in src/data/responsive-images.json.
// Components read that manifest through src/lib/responsiveImage.ts to emit src / srcSet / sizes / width / height.
//
//   node scripts/build-responsive-images.mjs           generate missing variants, prune stale ones
//   node scripts/build-responsive-images.mjs --check   report only; exit 1 if anything is missing or stale
//
// Variant file name: <dir>/<name>.<hash>.w<width>.webp - the hash covers the source bytes and the encoder
// settings, so a changed image or setting always produces a new URL (safe for immutable caching) and an
// unchanged one is never re-encoded. Generation is incremental, so committed variants make Vercel builds a no-op.

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");
const outRoot = path.join(publicDir, "_img");
const manifestPath = path.join(root, "src", "data", "responsive-images.json");
const checkOnly = process.argv.includes("--check");

// Settings version: bump when encoder behaviour changes so every hash (and URL) changes with it.
const SETTINGS_VERSION = 1;
// Candidate widths. Each source gets the candidates below its own width plus its intrinsic width (capped at
// the largest candidate), so nothing is ever upscaled.
const WIDTHS = [256, 480, 828, 1200, 1920, 2560];
const WEBP = { quality: 82, effort: 5, smartSubsample: true };
// Per-file overrides. The panorama is a WebGL texture, not an <img>: it needs power-of-two widths up to its
// full 8192 px so the 360 viewer keeps its detail on desktop while phones get a GPU-safe 4096/2048 texture.
const OVERRIDES = {
  "/Panorama.jpeg": { widths: [2048, 4096, 8192], webp: { quality: 85, effort: 5, smartSubsample: true } },
};
const SKIP_DIRS = new Set(["_img", "font"]);
const TEST = /\.(png|jpe?g|webp)$/i;

sharp.concurrency(0);

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!(dir === publicDir && SKIP_DIRS.has(e.name))) walk(p); }
    else if (TEST.test(e.name)) files.push(p);
  }
})(publicDir);

const slug = (s) => s.replace(/[^A-Za-z0-9._-]+/g, "-");
const urlFor = (key, hash, w) => {
  const dir = path.posix.dirname(key);
  const name = slug(path.posix.basename(key).replace(/\.[^.]+$/, ""));
  return `/_img${dir === "/" ? "" : dir}/${name}.${hash}.w${w}.webp`;
};

const manifest = {};
const expected = new Set();
let generated = 0, missing = 0;
let sourceBytes = 0, largestVariantBytes = 0;

async function processFile(file) {
  const key = "/" + path.relative(publicDir, file).split(path.sep).join("/");
  const cfg = OVERRIDES[key] ?? {};
  const widthsCfg = cfg.widths ?? WIDTHS;
  const webp = cfg.webp ?? WEBP;
  const buf = fs.readFileSync(file);
  sourceBytes += buf.length;
  const hash = crypto.createHash("sha1").update(buf).update(JSON.stringify({ SETTINGS_VERSION, widthsCfg, webp })).digest("hex").slice(0, 10);
  const meta = await sharp(buf).metadata();
  // EXIF-rotated sources report pre-rotation dimensions; swap so width/height match what the browser shows.
  const rotated = (meta.orientation ?? 1) >= 5;
  const W = rotated ? meta.height : meta.width;
  const H = rotated ? meta.width : meta.height;
  const max = widthsCfg[widthsCfg.length - 1];
  const widths = [...new Set([...widthsCfg.filter((w) => w < W), Math.min(W, max)])].sort((a, b) => a - b);
  manifest[key] = [W, H, hash, widths];

  let opaque = null;
  for (const w of widths) {
    const url = urlFor(key, hash, w);
    const out = path.join(publicDir, url);
    expected.add(path.normalize(out));
    if (fs.existsSync(out)) { if (w === widths[widths.length - 1]) largestVariantBytes += fs.statSync(out).size; continue; }
    if (checkOnly) { missing++; console.log(`missing: ${url}`); continue; }
    if (opaque === null) opaque = meta.hasAlpha ? (await sharp(buf).stats()).isOpaque : true;
    let img = sharp(buf).rotate().resize({ width: w, withoutEnlargement: true });
    if (opaque) img = img.removeAlpha(); // fully opaque "alpha" channels only add bytes
    const data = await img.webp(webp).toBuffer();
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, data);
    generated++;
    if (w === widths[widths.length - 1]) largestVariantBytes += data.length;
  }
}

const started = Date.now();
const queue = [...files].sort();
const workers = Array.from({ length: Math.max(1, Math.min(4, os.cpus().length)) }, async () => {
  while (queue.length) await processFile(queue.shift());
});
await Promise.all(workers);

// Prune variants that no longer belong to any source (old hashes, deleted images).
let pruned = 0;
if (fs.existsSync(outRoot)) {
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) { walk(p); if (!checkOnly && fs.readdirSync(p).length === 0) fs.rmdirSync(p); }
      else if (!expected.has(path.normalize(p))) {
        if (checkOnly) { missing++; console.log(`stale: ${path.relative(publicDir, p)}`); }
        else { fs.unlinkSync(p); pruned++; }
      }
    }
  })(outRoot);
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
const json = JSON.stringify(sorted) + "\n";
if (checkOnly) {
  const current = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, "utf8") : "";
  if (current !== json) { missing++; console.log("stale: src/data/responsive-images.json"); }
} else {
  fs.writeFileSync(manifestPath, json);
}

const mb = (n) => `${(n / 1024 / 1024).toFixed(1)} MB`;
console.log(
  `responsive images: ${files.length} sources (${mb(sourceBytes)}), largest variants total ${mb(largestVariantBytes)}; ` +
  `${generated} generated, ${pruned} pruned in ${((Date.now() - started) / 1000).toFixed(1)}s`
);
if (checkOnly && missing) { console.log(`${missing} responsive image file(s) missing or stale. Run: node scripts/build-responsive-images.mjs`); process.exitCode = 1; }
