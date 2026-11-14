// One-off migration helper (kept for traceability). Run once after copying the Vite sources:
//   node scripts/migrate-transform.mjs
// - react-router-dom <Link to> -> next/link <Link href>
// - "../pages/" imports -> "../views/" (src/pages would be treated as the Pages Router by Next.js)
// - removes the Helmet-based <SEO .../> element + import and prints its props (they move to route metadata)
import fs from "fs";
import path from "path";

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "../src");
const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!["app", "lib"].includes(e.name) || dir !== root) walk(p); }
    else if (/\.tsx?$/.test(e.name)) files.push(p);
  }
})(root);

// Returns the end index (exclusive) of a JSX opening tag starting at `start` ("<Tag ...>" or "<Tag .../>").
function tagEnd(src, start) {
  let depth = 0, quote = null;
  for (let i = start + 1; i < src.length; i++) {
    const c = src[i];
    if (quote) { if (c === quote && src[i - 1] !== "\\") quote = null; continue; }
    if (depth === 0 && (c === '"' || c === "'")) { quote = c; continue; }
    if (c === "{") depth++;
    else if (c === "}") depth--;
    else if (c === ">" && depth === 0) return i + 1;
  }
  throw new Error("unterminated tag");
}

for (const file of files) {
  let src = fs.readFileSync(file, "utf8");
  const before = src;
  const rel = path.relative(root, file);

  src = src.replace(/import \{ Link \} from ["']react-router-dom["'];[^\n]*/g, 'import Link from "next/link";');
  src = src.replace(/(["'])\.\.\/pages\//g, "$1../views/");

  let out = "", i = 0;
  for (;;) {
    const m = src.slice(i).search(/<Link[\s>]/);
    if (m < 0) { out += src.slice(i); break; }
    const s = i + m, e = tagEnd(src, s);
    out += src.slice(i, s) + src.slice(s, e).replace(/(\s)to=/g, "$1href=");
    i = e;
  }
  src = out;

  if (!rel.endsWith(path.join("components", "SEO.tsx"))) {
    const seoAt = src.search(/<SEO[\s/]/);
    if (seoAt >= 0) {
      const e = tagEnd(src, seoAt);
      const lineStart = src.lastIndexOf("\n", seoAt);
      console.log(`\n=== ${rel}\n${src.slice(seoAt, e)}`);
      src = src.slice(0, lineStart) + src.slice(e).replace(/^[ \t]*(?=\n)/, "");
      src = src.replace(/import SEO from ["'][./]+components\/SEO["'];?\r?\n/, "");
    }
  }

  if (src !== before) fs.writeFileSync(file, src);
}
