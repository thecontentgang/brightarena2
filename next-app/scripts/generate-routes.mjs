// One-off scaffolding helper (kept for traceability): writes src/app/**/page.tsx for every static route.
// Each entry's `seo` is the exact prop set the Vite page passed to <SEO />, or an expression importing the
// shared meta module. Re-running overwrites the generated files.
//   node scripts/generate-routes.mjs
import fs from "fs";
import path from "path";

const app = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/(\w:)/, "$1")), "../src/app");
const O = "https://www.brightarenainteriors.com";

const s = JSON.stringify;
const lit = (o) => `{\n${Object.entries(o).map(([k, v]) => `  ${k}: ${s(v)},`).join("\n")}\n}`;

const routes = [
  { path: "/", view: "@/sections/HomePage", name: "HomePage", seo: lit({
    title: "Interior Designers in Hyderabad for Homes and Offices | Bright Arena",
    description: "Bright Arena Interiors designs personalised home, luxury, office and commercial interiors in Hyderabad. Explore our work and book a consultation.",
    keywords: "Interior Designers Hyderabad, Luxury Interior Designers, Home Interior Design, Office Interiors, Commercial Interior Designers, Residential Interior Designers, Modular Kitchen Designers",
    url: `${O}/`,
  }) },
  { path: "/about/", view: "@/views/AboutPage", name: "AboutPage", seo: lit({
    title: "About - Bright Arena Interiors 14+ Years of Interior Design Excellence",
    description: "Learn about Bright Arena Interiors, a trusted interior design company in Hyderabad with 14+ years of experience creating beautiful, functional, and personalized spaces.",
    url: `${O}/about`,
  }) },
  { path: "/services/", view: "@/views/ServicesPage", name: "ServicesPage", seo: lit({
    title: "Home and Office Interior Design Services in Hyderabad - Bright Arena Interiors",
    description: "Bright Arena Interiors offers Interior Design Services in Hyderabad for luxury homes, offices, and commercial spaces with expert planning and execution.",
    url: `${O}/services`,
  }) },
  { path: "/portfolio/", view: "@/views/ProjectsPage", name: "ProjectsPage", seo: lit({
    title: "Bright Arena Interiors Portfolio and Interior Design Projects",
    description: "Explore the Bright Arena Interiors portfolio showcasing completed home, villa, apartment, and office interior projects across Hyderabad with 14+ years of expertise.",
    url: `${O}/portfolio`,
  }) },
  { path: "/designs/", view: "@/views/DesignsPage", name: "DesignsPage", seo: lit({
    title: "Interior Design Ideas in Hyderabad – Bright Arena Interiors",
    description: "Explore home interior designs by Bright Arena Interiors featuring modern living rooms, kitchens, bedrooms, and luxury spaces in Hyderabad.",
    url: `${O}/designs`,
  }) },
  { path: "/testimonials/", view: "@/views/TestimonialPage", name: "TestimonialPage", seo: lit({
    title: "Client Testimonials - Bright Arena Interiors",
    description: "Read client testimonials for Bright Arena Interiors and discover why homeowners and businesses across Hyderabad trust us for luxury interior design projects.",
    url: `${O}/testimonials`,
  }) },
  { path: "/blogs/", view: "@/views/BlogPage", name: "BlogPage", seo: lit({
    title: "Interior Design Ideas and Tips - Bright Arena Interiors",
    description: "Explore expert interior design ideas, home decor tips, design trends, and practical guides from Bright Arena Interiors to create beautiful living spaces.",
    url: `${O}/blogs`,
  }) },
  { path: "/contact/", view: "@/views/ContactPage", name: "ContactPage", seo: lit({
    title: "Contact - Bright Arena Interiors Interior Designers in Hyderabad",
    description: "Contact Bright Arena Interiors, trusted interior designers in Hyderabad, to discuss your home or office interior project and book a free consultation today.",
    url: `${O}/contact`,
  }) },
  { path: "/privacy-policy/", view: "@/views/PrivacyPolicyPage", name: "PrivacyPolicyPage", seo: lit({
    title: "Privacy Policy - Bright Arena Interiors",
    description: "Privacy policy and data handling practices for Bright Arena Interiors.",
    url: `${O}/privacy-policy`,
  }) },
  // Location pages called <SEO /> with no props: everything comes from src/data/pages.ts.
  { path: "/interior-designer-hitec-city/", view: "@/views/HitecCityInteriorDesignerPage", name: "HitecCityPage", seo: "{}" },
  { path: "/interior-designer-gachibowli/", view: "@/views/GachibowliInteriorDesignerPage", name: "GachibowliPage", seo: "{}" },
  { path: "/interior-designer-kondapur/", view: "@/views/KondapurInteriorDesignerPage", name: "KondapurPage", seo: "{}" },
  { path: "/interior-designer-madhapur/", view: "@/views/MadhapurInteriorDesignerPage", name: "MadhapurPage", seo: "{}" },
  { path: "/interior-designer-whitefields/", view: "@/views/WhitefieldsInteriorDesignerPage", name: "WhitefieldsPage", seo: "{}" },
  // Restored legacy routes. The alias of each pair renders the same page and canonicalises to it.
  ...["/luxury-interior-designers-in-hyderabad/", "/top-luxury-interior-designers-in-hyderabad/"].map((p) => ({
    path: p, view: "@/views/LuxuryPage", name: "LuxuryPage", metaModule: "@/views/meta/LuxuryPage.meta",
    seo: "{ title: TITLE, description: DESCRIPTION, h1: H1, url: PAGE_URL, injectH1: false }",
  })),
  ...["/top-interior-designer-in-hyderabad/", "/top-interior-designers-in-hyderabad/"].map((p) => ({
    path: p, view: "@/views/TopInteriorDesignerPage", name: "TopInteriorDesignerPage", metaModule: "@/views/meta/TopInteriorDesignerPage.meta",
    seo: "{ title: TITLE, description: DESCRIPTION, h1: H1, url: PAGE_URL, injectH1: false }",
  })),
  // Blog posts: props were `seo?.metaTitle || ...` expressions over each article's post/seo objects.
  ...[
    ["mastering-lighting-invisible-architecture", "MasteringLightingInvisibleArchitecture"],
    ["how-to-choose-the-best-interior-designer-in-hyderabad", "HowToChooseTheBestInteriorDesignerInHyderabad"],
    ["modular-kitchen-cost-in-hyderabad-complete-guide-2026", "ModularKitchenCostInHyderabadCompleteGuide2026"],
    ["small-home-interior-design-ideas", "SmallHomeInteriorDesignIdeas"],
    ["bedroom-interior-design-ideas", "BedroomInteriorDesignIdeas"],
    ["living-room-interior-design-ideas", "LivingRoomInteriorDesignIdeas"],
  ].map(([slug, name]) => ({
    path: `/blogs/${slug}/`, view: `@/views/blogs/${name}`, name, blogMeta: `@/views/blogs/meta/${name}.meta`,
    seo: "blogSeoProps(articleMeta)",
  })),
  // Placeholder article: intentionally noindex and absent from the sitemaps (validated by seo:check).
  { path: "/blogs/art-of-biophilic-design/", view: "@/views/blogs/ArtOfBiophilicDesign", name: "ArtOfBiophilicDesign", seo: "{ noindex: true }" },
];

for (const r of routes) {
  const imports = [
    'import type { Metadata } from "next";',
    'import SEO from "@/components/SEO";',
    'import { buildMetadata, type SEOProps } from "@/lib/seo";',
  ];
  if (r.metaModule) imports.push(`import { DESCRIPTION, H1, PAGE_URL, TITLE } from "${r.metaModule}";`);
  if (r.blogMeta) {
    imports.push('import { blogSeoProps } from "@/lib/routeSeo";');
    imports.push(`import * as articleMeta from "${r.blogMeta}";`);
  }
  imports.push(`import ${r.name} from "${r.view}";`);
  const body = `${imports.join("\n")}

const path = ${s(r.path)};
const seo: SEOProps = ${r.seo};

export const metadata: Metadata = buildMetadata(path, seo);

export default function Page() {
  return (
    <>
      <SEO path={path} {...seo} />
      <${r.name} />
    </>
  );
}
`;
  const dir = path.join(app, ...r.path.split("/").filter(Boolean));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "page.tsx"), body);
}
console.log(`wrote ${routes.length} static routes`);
