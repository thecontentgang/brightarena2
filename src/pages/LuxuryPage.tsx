"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import ProjectModal from "../components/ProjectModal";
import { projectsData } from "./ProjectsData";

// Copy source: the supplied "Luxury Interior Designers in Hyderabad: Developer-Ready Page Content" PDF (Parts A-C); see docs/seo/README.md.
// Hero image and project cards reuse real portfolio data (projectsData); the founder photo is a neutral
// initials placeholder until a real photograph is supplied. Card text is the portfolio's own description -
// no per-project "constraint solved" lines exist yet.

const PAGE_URL = "https://www.brightarenainteriors.com/luxury-interior-designers-in-hyderabad/";
const TITLE = "Luxury Interior Designers in Hyderabad | Bright Arena Interiors";
const DESCRIPTION =
  "Bright Arena Interiors creates bespoke luxury home interiors for villas, premium apartments and penthouses in Hyderabad. Explore completed projects and book a consultation.";
const H1 = "Luxury Interior Designers in Hyderabad for Bespoke Homes";

const linkClass = "underline underline-offset-4 decoration-[#4a1c13]/40 hover:text-[#ff7043] hover:decoration-[#ff7043] transition-colors";
const h2Class = "text-[#4a1c13] font-primary text-[clamp(30px,4.5vw,52px)] leading-[1.08] tracking-tight";
const pClass = "text-[#4a1c13]/80 text-[16px] md:text-lg leading-relaxed";
const leadClass = "text-[#4a1c13] text-lg md:text-xl leading-relaxed font-medium";
const sectionClass = "max-w-[1100px] mx-auto px-6 md:px-12 py-10 md:py-14";
const stack = "flex flex-col gap-5 max-w-3xl mt-6";
const eyebrow = "text-[#ff7043] text-xs font-bold tracking-[0.25em] uppercase mb-3";
const card = "bg-white rounded-[2rem] border border-[#4a1c13]/5 shadow-sm p-6 md:p-8";
const primaryBtn =
  "bg-[#ff7043] text-white px-7 py-4 rounded-2xl text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#ff7043]/20 text-center transition-colors hover:bg-[#ffc107] hover:text-[#4a1c13] active:scale-95 touch-manipulation";
const secondaryBtn =
  "border border-[#4a1c13]/30 text-[#4a1c13] px-7 py-4 rounded-2xl text-xs font-bold tracking-widest uppercase text-center transition-colors hover:bg-[#4a1c13]/5 active:scale-95 touch-manipulation";

type Item = [string, string];

const featuredSlugs = [
  "forest-edge-interior-design-project-hyderabad",
  "rajapushpa-interior-design-project-hyderabad",
  "etna-by-phoenix-interior-design-project-hyderabad",
  "kollur-apartment-interior-design-project-hyderabad", // WebP hero; the Vara Prasad PNG hero is 12 MB and fails to load reliably
];
const featured = featuredSlugs.map((s) => projectsData.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
const heroProject = featured[0];

const bespokeServices: Item[] = [
  ["Space planning.", "We study how you move through the home and rework layouts so that every room has a clear purpose, comfortable proportions and room to grow."],
  ["Material and finish palettes.", "Timber, stone, metal, textiles and paint are selected as one coherent palette, with samples reviewed against the light in your home."],
  ["Lighting design.", "Layered lighting, from concealed cove lines to task and accent fittings, is planned together with ceilings and joinery so that it supports each activity and mood."],
  ["Joinery and furniture planning.", "Wardrobes, storage units, consoles and feature joinery are designed to suit the room instead of being fitted around standard sizes."],
  ["Kitchens and wardrobes.", "These are planned around daily routines, storage volumes, appliances and ergonomics, with fittings specified for durability."],
  ["Living spaces, bedrooms and bathrooms.", "Each room is detailed for its use: social living areas, restful bedrooms and bathrooms where waterproofing, ventilation and fixtures are resolved before finishes are chosen."],
];

const styles: Item[] = [
  ["Modern luxury", "is built on clean lines, generous proportions and a disciplined palette. Large-format stone, slim metal detailing and carefully layered lighting create calm, high-contrast spaces. Modern luxury interior design works best when the restraint is intentional."],
  ["Contemporary", "interiors are softer and more fluid. Curved forms, textured finishes and flexible layouts suit families who want a home that feels current without being tied to a trend. Contemporary luxury interior design should feel comfortable first and impressive second."],
  ["Minimalist luxury", "relies on reduction. Concealed storage, a single material story and precise detailing leave space for art, light and daily life."],
  ["Warm, wood-led", "homes use timber and veneer, warm lighting and tactile fabrics to create richness without heaviness."],
];

const materials: Item[] = [
  ["Timber and veneer.", "Grain, finish and construction are chosen to cope with seasonal humidity, with edges and joints detailed to reduce movement and wear."],
  ["Stone.", "Marble, quartz and engineered stone behave differently. Porosity, staining and heat tolerance guide where each is used, so kitchens and bathrooms are treated differently from living areas."],
  ["Metal.", "Brass, stainless steel and powder-coated finishes are selected for durability and for how they weather."],
  ["Textiles.", "Fabrics are considered for sunlight exposure, abrasion and ease of cleaning, especially on seating and curtains."],
  ["Lighting and hardware.", "Warm, dimmable, low-glare lighting and hardware rated for daily use make a home comfortable to live in, not just to look at."],
];

const costFactors = [
  "Property size and number of rooms",
  "Civil work: demolition, structural changes, waterproofing and services",
  "Finish level: stone, veneer, metal and fabric specifications",
  "Custom furniture and joinery, kitchens and wardrobes",
  "Lighting design and fixtures, and automation if required",
  "Appliances, sanitaryware and fittings",
  "Sourcing: special-order materials and lead times",
  "Site conditions: access, floors and society regulations",
];

const faqs: Item[] = [
  ["What is luxury interior design?", "Luxury interior design in Hyderabad is a tailored combination of space planning, materials, detailing, functionality and personal expression. It is not a fixed decor style or a price tag. A luxury home is designed around how you live, with finishes, joinery and lighting resolved carefully so the space works well and feels distinctive to you."],
  ["How do I choose a luxury interior designer in Hyderabad?", "Whether you are comparing premium interior designers in Hyderabad or specialist luxury studios, start with a relevant portfolio of completed homes like yours. Then check how involved the principal designer will be, what the scope includes, how materials are specified and who coordinates the site. Finally, read the contract: clear deliverables, approvals and payment stages matter as much as the design."],
  ["What is included in luxury home interior design?", "Inclusions depend on your property, brief and agreement. Typically, luxury home interior design covers consultation, space planning, a material and finish palette, lighting and joinery details, and coordination during execution. Your signed scope lists exactly what is and is not included."],
  ["How much do luxury interior designers in Hyderabad charge?", "There is no single rate, because charges depend on the project. Luxury interior design cost in Hyderabad is shaped by property size, civil work, finish level, custom furniture, lighting and the extent of design and site involvement. The most reliable way to understand cost is a scoped estimate based on your floor plan and brief."],
  ["What is the cost of luxury home interiors in Hyderabad?", "The cost of luxury home interiors in Hyderabad varies with property size, level of customisation, finishes, civil scope, furniture, lighting and site conditions. A bespoke villa with extensive joinery will differ widely from a premium apartment with a focused scope. We give a scoped estimate after reviewing your plan rather than quoting an unsupported figure."],
  ["Do luxury interior designers provide 3D designs?", "Bright Arena Interiors prepares 3D visualisations for luxury projects where they are part of the agreed scope. They are shared after layouts are approved and before specifications are finalised, so you can see proportions, finishes and lighting before work begins. Your signed scope confirms exactly what is provided."],
  ["Can I customise luxury home interiors?", "Yes. Customisation is central to luxury interiors. Through consultation, we shape layouts, finishes, furniture and functionality around your routines, family needs and taste. Some choices, such as structural changes or society-regulated work, depend on building constraints, which we review during the site visit."],
  ["How long does luxury home interior design take?", "Timelines vary with scope, approvals, material sourcing and site readiness. Whether it is luxury apartment interior design in Hyderabad or a multi-level villa with extensive custom joinery, no two schedules are the same. We share a realistic timeline once the scope is defined and the site is reviewed."],
  ["What is the difference between premium and luxury interiors?", "Luxury interiors are usually more bespoke and detail-led, with greater attention to custom planning, joinery, materials and personal expression. Premium interiors typically offer a refined, well-finished result within a more defined range of options. Both can be excellent. The right choice depends on your brief, your property and how much customisation you want."],
];

// Built from the same array as the visible FAQs so the markup always matches the page word for word.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

const Lead = ({ children }: { children: React.ReactNode }) => <strong className="text-[#4a1c13]">{children}</strong>;

const Bullets = ({ items }: { items: Item[] }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8">
    {items.map(([lead, rest]) => (
      <div key={lead} className={card + " !p-6"}>
        <h3 className="text-[#4a1c13] font-primary text-xl md:text-2xl">{lead.replace(/[.]$/, "")}</h3>
        <p className={pClass + " mt-2 text-base md:text-base"}>{rest}</p>
      </div>
    ))}
  </div>
);

// Collapsible long copy. The full text is always in the DOM (clamped by height, never display:none),
// so it stays crawlable and readable by assistive tech; the button only changes how much is shown.
function ReadMore({ children, collapsed = 150, label = "Read more", onWhite = false }: { children: ReactNode; collapsed?: number; label?: string; onWhite?: boolean }) {
  const [open, setOpen] = useState(false);
  const [needed, setNeeded] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    const el = ref.current;
    if (el) setNeeded(el.scrollHeight > collapsed + 24);
  }, [collapsed]);

  const clamped = needed && !open;
  return (
    <div>
      <div
        id={id}
        ref={ref}
        style={clamped ? { maxHeight: collapsed } : undefined}
        className={"relative overflow-hidden transition-[max-height] duration-500 "}
      >
        {children}
        {clamped && <div aria-hidden="true" className={"pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t to-transparent " + (onWhite ? "from-white" : "from-[#f7f4ee]")} />}
      </div>
      {needed && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={id}
          className="mt-3 inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#ff7043] hover:text-[#4a1c13] transition-colors"
        >
          {open ? "Read less" : label}
          <span aria-hidden="true" className={"transition-transform " + (open ? "rotate-180" : "")}>↓</span>
        </button>
      )}
    </div>
  );
}

export default function LuxuryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openForm = () => setIsModalOpen(true);

  return (
    <>
      {/* Both /luxury-interior-designers-in-hyderabad/ and the /top-luxury-... alias canonicalise to the primary URL. */}
      <SEO title={TITLE} description={DESCRIPTION} h1={H1} url={PAGE_URL} injectH1={false} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <article className="bg-[#f7f4ee] text-[#4a1c13] pt-32 md:pt-40 pb-16 md:pb-24 antialiased">
        {/* Hero */}
        <header className={sectionClass}>
          <h1 className={h2Class + " max-w-4xl text-[clamp(34px,5.5vw,64px)]"}>{H1}</h1>
          <div className={stack}>
            <p className={leadClass}>
              Bright Arena Interiors designs personalised luxury interiors for villas, penthouses and premium apartments in Hyderabad. Every home begins with detailed planning, carefully chosen materials and execution tailored around how you live, host, work and unwind. The result is a home that feels considered, comfortable and entirely your own.
            </p>
            <p className={pClass}>
              If you are looking for luxury interior designers in Hyderabad who treat a home as a long-term commitment rather than a styling exercise, this is where the conversation begins.
            </p>
            <p className={pClass}>
              We work with homeowners who value proportion, craftsmanship and clarity: a clear design direction, clear specifications and a clear understanding of what will be built, by whom and in what sequence.
            </p>
            <p className={pClass}>
              Our luxury home interiors in Hyderabad are planned room by room and detailed down to joinery, lighting and hardware. A first consultation for luxury interior design in Hyderabad helps you understand the design direction, the scope and the sensible next steps before you commit to anything.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={openForm} className={primaryBtn}>Book a Luxury Design Consultation</button>
            <Link to="/portfolio" className={secondaryBtn}>Explore Luxury Projects</Link>
          </div>
          {heroProject && (
            <figure className="mt-10">
              <img
                src={heroProject.heroImage}
                alt={`${heroProject.shortDescription.split(",")[0]} luxury interior by Bright Arena Interiors`}
                width={1600}
                height={900}
                className="w-full h-[260px] md:h-[480px] object-cover rounded-[2rem] md:rounded-[3rem] shadow-xl bg-[#e8e5de]"
              />
              <figcaption className="mt-3 text-sm text-[#4a1c13]/60">
                {heroProject.title}: {heroProject.shortDescription}
              </figcaption>
            </figure>
          )}
        </header>

        <section aria-labelledby="lux-means" className={sectionClass}>
          <p className={eyebrow}>The approach</p>
          <h2 id="lux-means" className={h2Class}>What Luxury Interior Design in Hyderabad Really Means</h2>
          <div className="max-w-3xl mt-6"><ReadMore collapsed={190}><div className="flex flex-col gap-5">
            <p className={pClass}>Luxury interior design is a tailored approach to planning, proportion, materials, lighting and craftsmanship, shaped around how a household actually lives. It is defined by the quality of decisions and detailing, not by how many expensive objects fill a room. A luxury home should feel effortless to use and distinctive to the people who live in it.</p>
            <p className={pClass}>Good luxury design begins with how the home works. Circulation, light, storage and the relationship between living, dining and private areas are resolved before a single finish is chosen. Detailing then makes the difference: clean shadow gaps, aligned joinery, concealed lighting and hardware that feels right in the hand shape how a home feels long after handover.</p>
            <p className={pClass}>Luxury also means restraint, and it must respect local conditions. Luxury interior design in Hyderabad has to account for summer heat, monsoon humidity, apartment society rules and the way families here host and gather. A refined room often has fewer elements, each placed with intent.</p>
            <p className={pClass}>Finally, luxury is personal. A multigenerational family home, a collector’s apartment and a young couple’s penthouse need different answers. Our role as your luxury interior designer in Hyderabad is to translate how you live into a plan that can be built well.</p>
          </div></ReadMore></div>
          <img src="/Luxurious%20Hyderabad%20Open-Plan%20Living%20Space.webp" alt="Luxury open-plan living space interior by Bright Arena Interiors in Hyderabad" loading="lazy" width={1200} height={800} className="w-full h-[240px] md:h-[400px] object-cover rounded-[2rem] shadow-md bg-[#e8e5de] mt-8" />
        </section>

        <section aria-labelledby="lux-homes" className={sectionClass}>
          <p className={eyebrow}>Property types</p>
          <h2 id="lux-homes" className={h2Class}>Luxury Homes We Design in Hyderabad</h2>
          <p className={pClass + " max-w-3xl mt-6"}>As luxury home interior designers in Hyderabad, Bright Arena Interiors designs villas and bungalows, penthouses, premium apartments and full-home renovations. Each property type brings different spatial, structural and lifestyle demands, so planning priorities, detailing and site coordination change from one home to the next.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8 items-start">
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Villas and Bungalows</h3>
              <div className="mt-3"><ReadMore collapsed={130} onWhite>
                <p className={pClass}>Villas and bungalows offer scale, multiple levels and a stronger connection with outdoor space, and these qualities need careful planning. Staircases, double-height volumes, formal and family living zones, pooja rooms, guest suites and home theatres must work as one composition. As luxury villa interior designers in Hyderabad, we concentrate on sightlines, zoning and a material story that stays consistent from the entrance to the terrace. Larger homes also need a clear plan for services, storage and staff movement, which is easiest to resolve at the layout stage.</p>
              </ReadMore></div>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Penthouses</h3>
              <div className="mt-3"><ReadMore collapsed={130} onWhite>
                <p className={pClass}>Penthouses reward confident design, yet they bring their own constraints: wide glazing, terrace exposure, structural limits and restricted service access. Light, privacy and views are the starting points, followed by furniture scale and acoustics. The aim is a home that feels open and private at once.</p>
              </ReadMore></div>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Premium Apartments</h3>
              <div className="mt-3"><ReadMore collapsed={130} onWhite>
                <p className={pClass}>In a premium apartment, every square foot carries weight. Luxury apartment interior design in Hyderabad is largely about precision: efficient layouts, full-height storage that disappears into the walls, layered lighting and a restrained palette that makes rooms feel larger. Society regulations, lift timings and permitted working hours also shape how work is planned and sequenced.</p>
              </ReadMore></div>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Full-Home Renovations</h3>
              <div className="mt-3"><ReadMore collapsed={130} onWhite>
                <div className="flex flex-col gap-4">
                  <p className={pClass}>Renovating an existing home lets you keep what works and rethink what does not. That often means revisiting layouts, electrical and plumbing routes, ceilings and storage before finishes are chosen. Luxury full home interior design in Hyderabad works best when the whole scope is planned together, so that every element is considered in relation to the rest.</p>
                  <p className={pClass}>
                    Our focus is residential luxury. If you are planning a more budget-led home, our{" "}
                    <Link to="/services/home-interior-designs-hyderabad" className={linkClass}>home interior design in Hyderabad</Link>{" "}
                    page may be a better starting point.
                  </p>
                </div>
              </ReadMore></div>
            </div>
          </div>
        </section>

        <section aria-labelledby="lux-services" className={sectionClass}>
          <p className={eyebrow}>What we do</p>
          <h2 id="lux-services" className={h2Class}>Bespoke Design Services</h2>
          <p className={pClass + " max-w-3xl mt-6"}>Our luxury interior design services in Hyderabad cover space planning, material palettes, lighting, joinery, kitchens, wardrobes and the principal living spaces, bedrooms and bathrooms of your home. Final deliverables vary by property, brief and signed scope, and are agreed clearly before work begins.</p>
          <Bullets items={bespokeServices} />
          <p className={pClass + " max-w-3xl mt-6"}>Not every home needs every service. Whichever of the luxury interior designers in Hyderabad you choose, insist that your requirements are written into the scope. We define them with you during consultation and document them before work starts.</p>
        </section>

        <section aria-labelledby="lux-styles" className={sectionClass}>
          <p className={eyebrow}>Style</p>
          <h2 id="lux-styles" className={h2Class}>Design Styles and Personal Expression</h2>
          <p className={pClass + " max-w-3xl mt-6"}>Luxury interiors do not follow a single style. Bright Arena Interiors works with modern luxury, contemporary, minimalist luxury and warm, wood-led approaches, treating each as a direction shaped by the client’s taste, family and home rather than a catalogue look to be copied.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8">
            {styles.map(([lead, rest]) => (
              <div key={lead} className={card + " !p-6"}>
                <p className={pClass}><Lead>{lead}</Lead> {rest}</p>
              </div>
            ))}
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>We take references seriously but do not replicate them. Bespoke interior design in Hyderabad should look as though it was made for one household, because it was.</p>
        </section>

        <section aria-labelledby="lux-process" className={sectionClass}>
          <p className={eyebrow}>Process</p>
          <h2 id="lux-process" className={h2Class}>From Brief to Handover</h2>
          <div className="max-w-3xl mt-6"><ReadMore collapsed={120}><div className="flex flex-col gap-5">
            <p className={pClass}>Our luxury design process runs from the first consultation to styling and handover in clear, documented stages. You know what is being decided at each step, what you will receive and what approval is needed to move forward. Exact deliverables depend on the scope signed for your project.</p>
            <p className={pClass}>Our approach to luxury interior design in Hyderabad is deliberately sequenced, and for luxury full home interior design in Hyderabad that sequence keeps decisions orderly and the site predictable. As your luxury interior designer in Hyderabad, we treat each stage as a decision point that you approve before the next begins.</p>
          </div></ReadMore></div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8 list-none">
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Consultation.</Lead> We discuss your household, routines, taste, timeline and expectations, and review your floor plan or drawings.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Site review.</Lead> We visit the property, record dimensions and conditions, and flag structural, services or society constraints early.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Design direction.</Lead> A concept direction covering mood, materials and spatial ideas is presented for your feedback.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Layouts.</Lead> Furniture, storage, circulation and lighting are planned in detail and refined with you until approved.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}>
              <Lead>3D visualisation, where included.</Lead> Luxury{" "}
              <Link to="/services/2d-3d-interior-design-services-in-hyderabad" className={linkClass}>3D interior design in Hyderabad</Link>{" "}
              lets you see proportions, finishes and lighting before anything is built.
            </li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Specifications.</Lead> Materials, finishes, fittings and joinery details are documented so that what you approve is what is built.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Execution coordination.</Lead> Vendors, craftsmen and site activity are coordinated against the agreed drawings and sequence.</li>
            <li className={card + " !p-6 " + pClass + " text-base md:text-base"}><Lead>Styling and handover.</Lead> Final styling, a snag review and handover complete the project.</li>
          </ol>
          <p className={pClass + " max-w-3xl mt-6"}>The easiest way to begin is to share your floor plan.</p>
          <div className="mt-5"><button onClick={openForm} className={primaryBtn}>Share Your Floor Plan</button></div>
        </section>

        <section aria-labelledby="lux-featured" className={sectionClass}>
          <p className={eyebrow}>Portfolio</p>
          <h2 id="lux-featured" className={h2Class}>Featured Luxury Projects</h2>
          <div className={stack}>
            <p className={pClass}>Our featured projects show how a brief becomes a built home. Open any project to see its scope and design notes, so you can judge our work on evidence rather than adjectives.</p>
            <p className={pClass}>Any of the luxury interior designers in Hyderabad you shortlist should be able to show completed homes similar to yours. These projects reflect how we work as luxury home interior designers in Hyderabad: plan first, detail carefully and document clearly. Luxury home interiors in Hyderabad are best judged in photographs of finished rooms.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8">
            {featured.map((proj) => (
              <Link key={proj.slug} to={`/portfolio/${proj.slug}`} className="group block bg-white rounded-[2rem] border border-[#4a1c13]/5 shadow-sm overflow-hidden">
                <img
                  src={proj.heroImage}
                  alt={`${proj.shortDescription.split(",")[0]} luxury interior by Bright Arena Interiors`}
                  loading="lazy"
                  width={800}
                  height={560}
                  className="w-full h-[240px] md:h-[300px] object-cover bg-[#e8e5de] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-[#4a1c13] font-primary text-2xl">{proj.title}</h3>
                  <p className="mt-1 text-[#ff7043] text-xs font-bold tracking-[0.2em] uppercase">{proj.shortDescription}</p>
                  <p className={pClass + " mt-3 text-base md:text-base"}>{proj.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8"><Link to="/portfolio" className={secondaryBtn + " inline-block"}>View the Full Luxury Portfolio</Link></div>
        </section>

        <section aria-labelledby="lux-materials" className={sectionClass}>
          <p className={eyebrow}>Materials</p>
          <h2 id="lux-materials" className={h2Class}>Materials and Detailing in Luxury Home Interiors</h2>
          <p className={pClass + " max-w-3xl mt-6"}>Bright Arena Interiors chooses materials for how they perform, age and are maintained as much as for how they look. Timber, veneer, stone, metal, textiles, lighting and hardware are matched to how each space is used, so a finish that looks beautiful at handover stays that way.</p>
          <Bullets items={materials} />
          <p className={pClass + " max-w-3xl mt-6"}>A good specification explains what to expect over time, so you can choose finishes with confidence.</p>
        </section>

        <section aria-labelledby="lux-cost" className={sectionClass}>
          <p className={eyebrow}>Investment</p>
          <h2 id="lux-cost" className={h2Class}>Luxury Interior Cost in Hyderabad</h2>
          <div className="max-w-3xl mt-6"><ReadMore collapsed={150}><div className="flex flex-col gap-5">
            <p className={pClass}>The luxury interior design cost in Hyderabad depends on the project, not a fixed rate. Property size, civil work, finish level, custom furniture, kitchen and wardrobe scope, lighting, appliances and site conditions all shape the budget, so a reliable figure is possible only once the scope is defined.</p>
            <p className={pClass}>Luxury interior design in Hyderabad is unusually scope-dependent. A compact premium apartment with a focused brief and a multi-level villa with extensive custom joinery are very different undertakings, even if both are luxury. These are the factors that move a budget:</p>
          </div></ReadMore></div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {costFactors.map((f) => (<li key={f} className="bg-white rounded-2xl border border-[#4a1c13]/5 px-5 py-4 text-[#4a1c13]/80 text-base leading-snug"><span aria-hidden="true" className="text-[#ff7043] mr-2">●</span>{f}</li>))}
          </ul>
          <p className={pClass + " max-w-3xl mt-6"}>When homeowners ask about luxury home interior design cost in Hyderabad, the most useful answer is a scoped estimate based on your floor plan and brief. We do not publish starting prices, because a number without a scope can mislead. Share your plan and we will explain what shapes your budget.</p>
          <div className="mt-5"><button onClick={openForm} className={primaryBtn}>Request a Scoped Estimate</button></div>
        </section>

        <section aria-labelledby="lux-why" className={sectionClass}>
          <p className={eyebrow}>Why us</p>
          <h2 id="lux-why" className={h2Class}>Why Choose Bright Arena Interiors</h2>
          <div className="max-w-3xl mt-6"><ReadMore collapsed={150}><div className="flex flex-col gap-5">
            <p className={pClass}>Bright Arena Interiors is a luxury interior design company in Hyderabad that works from a clear process, a documented scope and careful site coordination. You can validate that fit yourself by asking to see completed projects, meeting the principal designer and reviewing how scope, specifications and approvals are documented.</p>
            <p className={pClass}>
              When comparing luxury interior designers in Hyderabad, ask five questions. Who will design my home? Can I see completed projects like mine? How are materials specified? Who coordinates the site? What exactly does the contract include? The same questions apply whether you are shortlisting premium interior designers in Hyderabad or high-end interior designers in Hyderabad. Our work as luxury residential interior designers in Hyderabad rests on being able to answer each of them plainly. If you are still at an early stage, our overview of{" "}
              <Link to="/" className={linkClass}>interior designers in Hyderabad</Link>{" "}
              shows the full range of what we do.
            </p>
          </div></ReadMore></div>
          <div className="mt-8 max-w-3xl bg-white rounded-[2rem] border border-[#4a1c13]/5 shadow-sm p-6 md:p-8 flex flex-col sm:flex-row gap-5 items-start">
            {/* Placeholder avatar: replace with a real photograph of the principal designer. */}
            <div aria-hidden="true" className="shrink-0 w-20 h-20 rounded-full bg-[#4a1c13] text-[#f7f4ee] font-primary text-2xl flex items-center justify-center">SR</div>
            <div>
              <h3 className="text-[#4a1c13] font-primary text-2xl">Srilatha Ravuri</h3>
              <p className="text-[#ff7043] text-xs font-bold tracking-[0.2em] uppercase mt-1">Co-Founder &amp; Principal Lead Designer</p>
              <p className={pClass + " mt-3 text-base md:text-base"}>
                Srilatha Ravuri is the Founder and Principal Interior Designer of Bright Arena, specializing in luxury residential and commercial interior design. With expertise in space planning, modern interiors, and bespoke design solutions, she creates elegant, functional spaces tailored to each client's lifestyle.
              </p>
              <p className="mt-3 font-semibold"><Link to="/about" className={linkClass}>About Bright Arena Interiors</Link></p>
            </div>
          </div>
        </section>

        <section aria-labelledby="lux-areas" className={sectionClass}>
          <p className={eyebrow}>Coverage</p>
          <h2 id="lux-areas" className={h2Class}>Luxury Home Service Areas in Hyderabad</h2>
          <p className={pClass + " max-w-3xl mt-6"}>We design luxury homes across Hyderabad, from established neighbourhoods such as Jubilee Hills and Banjara Hills to newer premium communities in Gachibowli, Kokapet and the Financial District. Luxury home interiors in Hyderabad vary by locality: a gated villa community, a high-rise tower and an older independent bungalow each bring different access, approvals and design opportunities, and we plan for them accordingly.</p>
        </section>

        <section aria-labelledby="lux-faq" className={sectionClass}>
          <p className={eyebrow}>Questions</p>
          <h2 id="lux-faq" className={h2Class}>Luxury Interior Designers in Hyderabad: Frequently Asked Questions</h2>
          <div className="max-w-3xl mt-8 flex flex-col gap-3">
            {faqs.map(([q, a], idx) => (
              <details key={q} open={idx === 0} className="group bg-white rounded-2xl border border-[#4a1c13]/5 shadow-sm px-6 py-4">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="text-[#4a1c13] font-primary text-lg md:text-2xl leading-tight">{q}</h3>
                  <span aria-hidden="true" className="shrink-0 text-[#ff7043] text-2xl transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className={pClass + " mt-3"}>{a}</p>
              </details>
            ))}
          </div>
        </section>

        <section aria-labelledby="lux-book" className={sectionClass}>
          <p className={eyebrow}>Next step</p>
          <h2 id="lux-book" className={h2Class}>Book a Luxury Design Consultation</h2>
          <div className={stack}>
            <p className={pClass}>If you are ready to speak with luxury interior designers in Hyderabad who will plan your home with care, share a few details about your property and we will take it from there. Tell us the property type, locality, approximate area, project stage, move-in target and, if you have it, your floor plan. Choose an in-person, video or phone consultation. Sharing a budget is optional.</p>
            <p className={pClass}>As a luxury interior design company in Hyderabad, Bright Arena Interiors offers luxury interior design services in Hyderabad that begin with an unhurried conversation about your home.</p>
          </div>
          <div className="mt-6"><button onClick={openForm} className={primaryBtn}>Book a Luxury Design Consultation</button></div>
        </section>
      </article>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
