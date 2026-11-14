import { generateImageSitemap, xmlResponse } from "@/lib/sitemaps";

// Generated once at build time and served as a static file.
export const dynamic = "force-static";

export function GET() {
  return xmlResponse(generateImageSitemap());
}
