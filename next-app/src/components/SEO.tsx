import { resolveSEO, type SEOProps } from "@/lib/seo";
import JsonLd from "./JsonLd";

/**
 * Body half of the original SEO component. Head tags (title, description, canonical, Open Graph,
 * Twitter, robots) are produced by `buildMetadata()` in each route's metadata export; this component
 * renders the JSON-LD schema and the visually hidden H1 exactly where the Vite version placed them.
 * Always pass the same `path` and props as the matching `buildMetadata()` call.
 */
export default function SEO({ path, ...props }: SEOProps & { path: string }) {
  const seo = resolveSEO(path, props);
  return (
    <>
      <JsonLd data={seo.schema} />
      {seo.injectH1 && <h1 className="sr-only">{seo.h1}</h1>}
    </>
  );
}
