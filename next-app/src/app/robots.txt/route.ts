import { generateRobotsTxt } from "@/lib/sitemaps";

// Generated once at build time and served as a static file.
export const dynamic = "force-static";

export function GET() {
  return new Response(generateRobotsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
