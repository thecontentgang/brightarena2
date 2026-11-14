import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";
import { legacyRedirects } from "./redirects";

// This app is self-contained. Pin the project root so Next.js never infers the parent Vite repository
// (which has its own lockfile) as the workspace root while next-app still lives inside it.
const appRoot = path.dirname(fileURLToPath(import.meta.url));

/**
 * URL policy (unchanged from the Vite site): https + www + trailing slash.
 *
 * - trailingSlash: true  -> Next.js 308-redirects "/about" to "/about/", exactly like Vercel's
 *   `trailingSlash: true` did for the prerendered Vite build. Paths with a file extension
 *   (sitemap.xml, robots.txt, images) are left alone.
 * - cleanUrls emulation  -> Vercel's `cleanUrls: true` stripped ".html". The Next.js app never emits
 *   .html files, so the two redirects below keep any old "*.html" / "index.html" links working.
 * - legacyRedirects      -> the 71 permanent redirects from the Vite app's vercel.json. This file is the
 *   single authoritative copy: it works with `next start`, on Vercel and on any other host, so the
 *   Next.js app intentionally ships no vercel.json redirects.
 */
const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Optional separate output folder (e.g. NEXT_DIST_DIR=.next-perf) so a production build used for measurement
  // can run next to `next dev` without the two sharing - and clearing - the same .next folder. Default unchanged.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  trailingSlash: true,
  poweredByHeader: false,
  turbopack: { root: appRoot },
  outputFileTracingRoot: appRoot,
  async redirects() {
    return [
      ...legacyRedirects,
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:path+/index.html", destination: "/:path+/", permanent: true },
      { source: "/:path+.html", destination: "/:path+/", permanent: true },
    ];
  },
};

export default nextConfig;
