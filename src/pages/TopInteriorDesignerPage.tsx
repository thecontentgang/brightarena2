"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import SEO from "../components/SEO";
import ProjectModal from "../components/ProjectModal";
import { projectsData } from "./ProjectsData";

// Copy source: the supplied "Interior Designers in Hyderabad" homepage-copy PDF (seo-2.pdf), used here on the
// dedicated /top-interior-designer-in-hyderabad/ URL. Items the PDF marks "to supply before publishing"
// (testimonials, locality-linked area pages, villa page link) are intentionally omitted. Project cards reuse
// real portfolio data (projectsData).

const PAGE_URL = "https://www.brightarenainteriors.com/top-interior-designer-in-hyderabad/";
const TITLE = "Top Interior Designers in Hyderabad | Bright Arena Interiors";
// Must differ from the homepage's title and description: this page previously reused both verbatim.
const DESCRIPTION =
  "Hyderabad interior design studio for homes, luxury spaces, offices and commercial projects, with 2D and 3D planning before work begins. Explore Bright Arena's work.";
const H1 = "Interior Designers in Hyderabad for Homes Offices and Luxury Spaces";

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

// Lightweight WebP heroes only (the Vara Prasad / Banali PNG heroes are 3-12 MB and fail to load reliably).
const featuredSlugs = [
  "forest-edge-interior-design-project-hyderabad",
  "rajapushpa-interior-design-project-hyderabad",
  "kollur-apartment-interior-design-project-hyderabad",
];

const sectionImg = "w-full h-[240px] md:h-[380px] object-cover rounded-[2rem] shadow-md bg-[#e8e5de] mt-8";
const featured = featuredSlugs.map((s) => projectsData.find((p) => p.slug === s)).filter((p): p is NonNullable<typeof p> => Boolean(p));
const heroProject = featured[0];

const services: { name: string; text: string; to: string; cta: string }[] = [
  { name: "Home interiors", text: "Complete interiors for apartments, flats and villas, planned around the way your household lives, with storage, lighting and finishes that suit each room.", to: "/services/home-interior-designs-hyderabad/", cta: "Home interior design in Hyderabad" },
  { name: "Luxury interiors", text: "Refined detailing, bespoke furniture and carefully chosen materials for homes that call for a higher level of finish.", to: "/luxury-interior-designers-in-hyderabad/", cta: "View luxury interiors" },
  { name: "Office interiors", text: "Workplaces planned around team flow, meeting needs and the first impression your brand makes on visitors.", to: "/services/office-interior-designers-in-hyderabad/", cta: "Office interior design" },
  { name: "Commercial interiors", text: "Customer-facing spaces such as showrooms and retail floors, designed around how visitors move and what your brand wants them to notice.", to: "/services/commercial-interior-designers-in-hyderabad/", cta: "Commercial interior design" },
  { name: "2D and 3D design", text: "Layouts and visualisations that let you review the plan, proportions and materials before work begins.", to: "/services/2d-3d-interior-design-services-in-hyderabad/", cta: "2D and 3D virtual design" },
];

const checks: Item[] = [
  ["Portfolio relevance.", "Look for completed work close to your property type and scale. A showcase of penthouses says little about a 2 BHK flat, and the reverse is also true."],
  ["Written scope and drawings.", "Ask what is included, what is excluded and which drawings you will receive. Vague scope is the most common source of disputes later."],
  ["Material specification.", "Brand, finish and thickness should be named in the proposal, not left to be decided on site."],
  ["Budget clarity.", "You should see how the estimate is built and what could change it, such as extra civil work or custom pieces."],
  ["Site coordination.", "Find out who supervises carpentry, electrical work, painting and finishing, and how progress is reported to you."],
  ["After-project support.", "Ask how snagging, repairs and questions after handover are handled."],
];

const process: Item[] = [
  ["Consultation.", "We discuss your brief, property type, timeline and priorities, and review any floor plan you can share. This first interior design consultation in Hyderabad shapes everything that follows."],
  ["Site understanding.", "We measure and study the space, noting structure, services and constraints that will shape the plan."],
  ["Design direction.", "We agree a style, colour and material direction that reflects your taste and the way you use the space."],
  ["2D layout.", "Furniture, storage, circulation and services are drawn and refined with your feedback."],
  ["3D visualisation.", "Where included in your scope, we show how the space will look so you can approve with confidence."],
  ["Materials and scope.", "Finishes, fittings and inclusions are specified and written into the proposal."],
  ["Execution.", "Our team coordinates carpentry, electrical work, painting and finishing against the approved drawings."],
  ["Handover.", "We review the finished work with you and note any snagging for correction."],
];

const costFactors: Item[] = [
  ["Property size and layout:", "more area and more rooms mean more material and labour."],
  ["Civil work:", "changes to walls, flooring, bathrooms or services add to scope."],
  ["Materials and finishes:", "laminates, veneers, stone, fittings and hardware vary widely in price."],
  ["Custom work:", "bespoke furniture and detailed joinery need more design and production time."],
  ["Kitchen and wardrobe scope:", "these are often the most material-intensive parts of a home."],
  ["Site conditions:", "access, floor level, lift availability and building rules affect execution."],
];

const whyUs: Item[] = [
  ["Local coordination.", "We are an interior design company in Hyderabad working on projects across the city, so site visits, material sourcing and trade coordination stay practical."],
  ["Defined scope.", "Inclusions, exclusions and responsibilities are written down before work starts."],
  ["Design visualisation.", "Layouts and, where included, 3D views let you review decisions early."],
  ["Material specification.", "Finishes and fittings are named in the proposal so you know exactly what is being installed."],
  ["Project communication.", "You know who to ask and you receive updates at each stage."],
];

const faqs: Item[] = [
  ["How do I choose an interior designer in Hyderabad?", "Compare portfolios for projects similar to yours, then ask for a written scope, drawings, material specifications and a clear explanation of site coordination. When you review top interior designers in Hyderabad, prefer the team that shows evidence and answers plainly. Communication at proposal stage often reflects how the project will run."],
  ["What services do interior designers provide?", "Interior designers typically provide design consultation, space planning, 2D layouts, 3D visualisation where applicable, material and finish selection, and coordination of execution on site. The exact scope depends on the company, so we confirm services in a written proposal that lists what is and is not included."],
  ["What is included in a full home interior design package?", "Inclusions vary among residential interior designers in Hyderabad, so we define ours in writing before work begins. A full home package generally covers design planning, drawings, material specification and execution of agreed items such as kitchen, wardrobes and finishes. Ask for a written list of inclusions and exclusions."],
  ["How much does interior design cost in Hyderabad?", "Cost depends on property size, civil work, materials, custom furniture, kitchen and wardrobe scope, site conditions and design detail. Because these differ for every home, we provide a project-specific estimate after reviewing your floor plan, scope and finish level. Be cautious of any price quoted without seeing your drawings."],
  ["How much does 3 BHK interior design cost in Hyderabad?", "The same factors apply, with added weight on the number of rooms, storage needs, kitchen and bathroom scope, any civil work and the amount of custom furniture. Two 3 BHK flats can differ widely in cost. Share your floor plan and finish preferences, and we will prepare an estimate based on them."],
  ["Do interior designers provide 3D designs?", "Many do, but it depends on the company and the scope. We offer 3D visualisation where it is part of the agreed scope, typically after the 2D layout is approved, so you can review proportions, materials and lighting before execution. Confirm this in writing when comparing proposals."],
  ["How long does home interior design take?", "Timelines depend on design approvals, material lead times, site readiness and scope. A compact apartment and a large villa will not follow the same schedule. After reviewing your property and scope, we share a confirmed timeline in the proposal rather than a general estimate that may not apply."],
  ["What is the difference between an interior designer and an interior decorator?", "An interior designer plans how a space works, including layout, storage, lighting, materials and coordination with trades. An interior decorator focuses on the look of a finished room, such as furnishings, colours and accessories. Most homes benefit from design planning first, with decorative choices following."],
  ["How do I choose an office interior designer in Hyderabad?", "Begin with your needs: team size, meetings, brand identity, services and deadlines. Then compare how each designer handles layout planning, services coordination and site delivery. Ask to see completed workplaces and a written scope. The best interior designers in Hyderabad explain trade-offs openly instead of offering a one-size answer."],
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

export default function TopInteriorDesignerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openForm = () => setIsModalOpen(true);

  return (
    <>
      <SEO title={TITLE} description={DESCRIPTION} h1={H1} url={PAGE_URL} injectH1={false} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <article className="bg-[#f7f4ee] text-[#4a1c13] pt-32 md:pt-40 pb-16 md:pb-24 antialiased">
        {/* 1. Hero */}
        <header className={sectionClass}>
          <h1 className={h2Class + " max-w-4xl text-[clamp(34px,5.5vw,64px)]"}>{H1}</h1>
          <div className={stack}>
            <p className="text-[#ff7043] text-lg md:text-xl italic">Thoughtful interior design for apartments, villas, offices and commercial spaces across Hyderabad.</p>
            <p className={leadClass}>
              Bright Arena Interiors provides home, office and commercial interior design in Hyderabad, from the first layout discussion to final handover. If you are shortlisting interior designers in Hyderabad for an apartment, villa, workplace or showroom, this page shows what we design, how we work and what to have ready before you call.
            </p>
            <p className={pClass}>
              Every project starts with how you actually live or work. Our interior designers in Hyderabad study your floor plan, your daily routine and your priorities for storage, light and budget, then turn them into drawings, material choices and a site plan you can follow with confidence.
            </p>
            <p className={pClass}>
              Looking for a top interior designer in Hyderabad usually comes down to one question: can this team deliver what I need? Our completed projects, written scope and clear process are laid out below so you can answer that yourself, without relying on rankings or slogans.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button onClick={openForm} className={primaryBtn}>Book an Interior Design Consultation</button>
            <Link to="/portfolio/" className={secondaryBtn}>Explore Our Hyderabad Projects</Link>
          </div>
          {heroProject && (
            <figure className="mt-10">
              <img
                src={heroProject.heroImage}
                alt={`${heroProject.shortDescription.split(",")[0]} interior design by Bright Arena Interiors in Hyderabad`}
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

        {/* 2. Services at a glance */}
        <section aria-labelledby="top-services" className={sectionClass}>
          <p className={eyebrow}>Services</p>
          <h2 id="top-services" className={h2Class}>Interior Design Services in Hyderabad for Every Kind of Space</h2>
          <p className={pClass + " max-w-3xl mt-6"}>Bright Arena Interiors offers home, luxury, office and commercial interior design alongside 2D and 3D planning. If you are comparing top interior designers in Hyderabad, start by picking the service that matches your project, or tell us about your space and we will point you to the right starting point.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8">
            {services.map((s) => (
              <div key={s.name} className={card + " !p-6"}>
                <h3 className="text-[#4a1c13] font-primary text-xl md:text-2xl">{s.name}</h3>
                <p className={pClass + " mt-2 text-base md:text-base"}>{s.text}</p>
                <p className="mt-3 font-semibold"><Link to={s.to} className={linkClass}>{s.cta}</Link></p>
              </div>
            ))}
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>Not sure which category fits? Many projects overlap. Describe the space and we will suggest how to approach it.</p>
        </section>

        {/* 3. How to choose */}
        <section aria-labelledby="top-choose" className={sectionClass}>
          <p className={eyebrow}>Choosing a designer</p>
          <h2 id="top-choose" className={h2Class}>How to Choose a Top Interior Designer in Hyderabad</h2>
          <div className={stack}>
            <p className={leadClass}>The most reliable way to choose among top interior designers in Hyderabad is to compare evidence rather than slogans. Check that their completed projects resemble yours, that the scope is written down, and that drawings, materials, budget and site coordination are explained before you commit.</p>
            <p className={pClass}>Rankings and lists can help you build a shortlist, but they cannot tell you whether a team suits your home or office. A good interior design company in Hyderabad will welcome these six checks.</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8 list-none">
            {checks.map(([lead, rest], i) => (
              <li key={lead} className={card + " !p-6 " + pClass + " text-base md:text-base"}>
                <span aria-hidden="true" className="text-[#ff7043] font-bold mr-2">{i + 1}.</span>
                <Lead>{lead}</Lead> {rest}
              </li>
            ))}
          </ol>
          <p className={pClass + " max-w-3xl mt-6"}>Bright Arena Interiors is glad to be measured against this list. Ask us for project examples close to your brief, a written scope and a walkthrough of how we manage the site. If you are comparing the best interior designers in Hyderabad, those answers will tell you more than any ranking can.</p>
        </section>

        {/* 4. Home interiors */}
        <section aria-labelledby="top-home" className={sectionClass}>
          <p className={eyebrow}>Residential</p>
          <h2 id="top-home" className={h2Class}>Home Interior Designers in Hyderabad for Apartments, Villas and Independent Homes</h2>
          <div className={stack}>
            <p className={leadClass}>Our home interior designers in Hyderabad plan complete interiors for apartments, flats, villas and independent houses. We begin with your layout and daily routine, then design storage, kitchen, wardrobes, lighting and furniture so that every room suits the people who use it.</p>
            <p className={pClass}>Choosing an interior designer in Hyderabad for your home is a personal decision. A family in a 2 BHK flat needs different decisions from a household in a four-bedroom villa, even when both want a calm, well-finished home. As residential interior designers in Hyderabad, we begin with questions rather than a catalogue: who lives here, what do mornings and evenings look like, where does clutter gather, and what should a guest notice first?</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-8 items-start">
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl">Apartments and flats</h3>
              <p className={pClass + " mt-3 text-base md:text-base"}>In 2 BHK, 3 BHK and 4 BHK apartments, space is the main constraint. For 3 BHK interior design in Hyderabad, we usually balance an open living and dining area with bedrooms that carry enough storage, a kitchen that is easy to work in and, where the plan allows, a study corner or utility space. Careful planning of circulation and built-in storage often matters more than any single decorative choice, and it is where good design pays back every day.</p>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl">Villas and independent homes</h3>
              <p className={pClass + " mt-3 text-base md:text-base"}>Larger homes bring more rooms to coordinate. For villa interior design in Hyderabad, we plan the house as a whole, covering staircases, double-height spaces, outdoor connections and the way public and private zones relate, so that each floor feels like part of one design rather than a series of separate rooms.</p>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl">What we plan inside the home</h3>
              <p className={pClass + " mt-3 text-base md:text-base"}>Depending on your brief, our scope can include a modular kitchen, wardrobes, TV units, bedroom layouts, false ceilings with lighting plans, bathroom finishes and loose furniture. Each element is drawn and specified so that carpenters, electricians and painters work from the same information.</p>
            </div>
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>
            Whether you are furnishing a new handover flat or renewing a home you have lived in for years, our{" "}
            <Link to="/services/home-interior-designs-hyderabad/" className={linkClass}>home interior design in Hyderabad</Link>{" "}
            service keeps design, material selection and site coordination within one plan.
          </p>
          <img src="/home-interiors.webp" alt="Home interior design by Bright Arena Interiors in Hyderabad" loading="lazy" width={1200} height={800} className={sectionImg} />
        </section>

        {/* 5. Luxury */}
        <section aria-labelledby="top-luxury" className={sectionClass}>
          <p className={eyebrow}>Luxury</p>
          <h2 id="top-luxury" className={h2Class}>Luxury Interiors Designed With Restraint and Detail</h2>
          <div className={stack}>
            <p className={leadClass}>Luxury interior design is about decisions rather than decoration. It means choosing materials with care, detailing joinery precisely, designing furniture and lighting as one composition and keeping every room consistent with the rest of the home.</p>
            <p className={pClass}>
              For clients who want this level of finish, our{" "}
              <Link to="/luxury-interior-designers-in-hyderabad/" className={linkClass}>luxury interior designers in Hyderabad</Link>{" "}
              work on bespoke furniture, layered lighting and considered palettes of stone, veneer, metal and fabric. Early planning of the small junctions where materials meet is what separates a composed home from an assembled one.
            </p>
            <p className={pClass}>Luxury work also demands tighter coordination. Custom pieces have longer lead times, finishes need approval before ordering, and the site team must follow the drawings exactly. We build these steps into the schedule from the start instead of discovering them midway.</p>
            <p className={pClass}>This approach suits homeowners who value craftsmanship and consistency over trend-led decoration, and who are prepared to spend time on decisions at the design stage.</p>
            <p className={pClass}>Our dedicated luxury page covers this work in full, including the design approach and completed projects.</p>
          </div>
          <img src="/Luxurious%20Hyderabad%20Open-Plan%20Living%20Space.webp" alt="Luxury open-plan living space interior design by Bright Arena Interiors in Hyderabad" loading="lazy" width={1200} height={800} className={sectionImg} />
        </section>

        {/* 6. Office and commercial */}
        <section aria-labelledby="top-office" className={sectionClass}>
          <p className={eyebrow}>Workplaces and retail</p>
          <h2 id="top-office" className={h2Class}>Office and Commercial Interior Design in Hyderabad</h2>
          <p className={leadClass + " max-w-3xl mt-6"}>Our interior designers in Hyderabad plan workplaces and customer-facing spaces that support daily operations and reflect your brand. We plan layouts, meeting areas, reception, finishes and services coordination around your team's workflow and your opening or move-in date.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8 items-start">
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Office interiors</h3>
              <p className={pClass + " mt-3"}>As office interior designers in Hyderabad, we start with how your team works: who sits together, which teams need quiet, how often meetings happen and how visitors arrive. The layout follows those answers. Reception, cabins, meeting rooms, collaboration areas and pantry are then planned together, with lighting, acoustics and finishes chosen to support the way the office is used day to day.</p>
            </div>
            <div className={card}>
              <h3 className="text-[#4a1c13] font-primary text-2xl md:text-3xl">Commercial interiors</h3>
              <p className={pClass + " mt-3"}>Commercial interior designers in Hyderabad must balance brand, customer flow and practicality. For showrooms, retail floors and other customer-facing spaces, we plan display, circulation, lighting and service areas so that visitors find their way easily and staff can work without obstruction.</p>
            </div>
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>Both kinds of project follow the same path: discovery, site measurement, space planning, design development and execution coordination. Deliverables and timelines depend on scope, and we confirm them in writing before work starts. If you need commercial interior designers in Hyderabad for a new floor or a refresh, the first step is the same: a conversation about how the space needs to perform. We also settle power, data and lighting positions early so they support the plan instead of working against it.</p>
          <img src="/office-spaces.webp" alt="Office interior design by Bright Arena Interiors in Hyderabad" loading="lazy" width={1200} height={800} className={sectionImg} />
        </section>

        {/* 7. 2D/3D and process */}
        <section aria-labelledby="top-process" className={sectionClass}>
          <p className={eyebrow}>Process</p>
          <h2 id="top-process" className={h2Class}>2D and 3D Planning and Our Interior Design Process</h2>
          <div className={stack}>
            <p className={leadClass}>Our interior designers in Hyderabad move from consultation and site understanding to design direction, 2D layouts, 3D visualisation where included, materials and scope, execution and handover. Deliverables and timelines vary by project, and we confirm them in writing before work begins.</p>
            <p className={pClass}>As a 2D 3D interior designer in Hyderabad, we use layouts and visualisations to help you decide before anything is built. A 2D plan fixes furniture positions, circulation, storage and services. Where 3D visualisation is part of your scope, it shows proportion, materials and lighting, so changes are discussed on screen rather than on site, where they cost more.</p>
          </div>
          <ol className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8 list-none">
            {process.map(([lead, rest], i) => (
              <li key={lead} className={card + " !p-6 " + pClass + " text-base md:text-base"}>
                <span aria-hidden="true" className="text-[#ff7043] font-bold mr-2">{i + 1}.</span>
                <Lead>{lead}</Lead> {rest}
              </li>
            ))}
          </ol>
          <p className={pClass + " max-w-3xl mt-6"}>Every one of our interior design services in Hyderabad follows this sequence, scaled to the size of the job. The interior designer in Hyderabad you choose should show you 2D layouts early, and so will we. Share your floor plan and we can tell you which stages apply to your project.</p>
          <div className="mt-5"><button onClick={openForm} className={primaryBtn}>Share Your Floor Plan</button></div>
        </section>

        {/* 8. Featured projects */}
        <section aria-labelledby="top-featured" className={sectionClass}>
          <p className={eyebrow}>Portfolio</p>
          <h2 id="top-featured" className={h2Class}>Featured Interior Design Projects in Hyderabad</h2>
          <div className={stack}>
            <p className={leadClass}>Our portfolio shows completed projects with their property type, scope and design direction, so you can judge fit before you call. Each card explains what was designed, what the client needed and how the finished space works.</p>
            <p className={pClass}>When you review top interior designers in Hyderabad, look past the photography and ask what problem each project solved. A compact flat that gained storage, an office that now seats more people comfortably, a showroom where customers move naturally towards the product: these are the outcomes worth comparing. Ask for projects at a similar scale to yours and request a walkthrough of what was delivered against the original scope.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-8">
            {featured.map((proj) => (
              <Link key={proj.slug} to={`/portfolio/${proj.slug}/`} className="group block bg-white rounded-[2rem] border border-[#4a1c13]/5 shadow-sm overflow-hidden">
                <img
                  src={proj.heroImage}
                  alt={`${proj.shortDescription.split(",")[0]} interior design by Bright Arena Interiors in Hyderabad`}
                  loading="lazy"
                  width={800}
                  height={560}
                  className="w-full h-[220px] object-cover bg-[#e8e5de] transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-6">
                  <h3 className="text-[#4a1c13] font-primary text-2xl">{proj.title}</h3>
                  <p className="mt-1 text-[#ff7043] text-xs font-bold tracking-[0.2em] uppercase">{proj.shortDescription}</p>
                  <p className={pClass + " mt-3 text-base md:text-base"}>{proj.description}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>Photographs show the finished result, but the useful details sit in the captions: the size of the property, the scope we handled and the decisions that shaped the design. We keep these captions plain and include only facts we can stand behind, so that what you read matches what you would see on a site visit.</p>
          <p className={pClass + " max-w-3xl mt-4"}>Browse our work and open any project to see its scope and design notes. If you cannot find a project close to yours, ask our interior designers in Hyderabad and we will share relevant examples.</p>
          <div className="mt-6"><Link to="/portfolio/" className={secondaryBtn + " inline-block"}>View the Full Portfolio</Link></div>
        </section>

        {/* 9. Cost and scope */}
        <section aria-labelledby="top-cost" className={sectionClass}>
          <p className={eyebrow}>Investment</p>
          <h2 id="top-cost" className={h2Class}>Cost and Scope Clarity: What Shapes Your Estimate</h2>
          <p className={leadClass + " max-w-3xl mt-6"}>Your interior design budget in Hyderabad depends on property size, the amount of civil work, materials, custom furniture, kitchen and wardrobe scope, site conditions and the level of design detail. We prepare a scoped estimate after reviewing your floor plan or visiting the site, instead of quoting a generic rate.</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
            {costFactors.map(([lead, rest]) => (
              <li key={lead} className="bg-white rounded-2xl border border-[#4a1c13]/5 px-5 py-4 text-[#4a1c13]/80 text-base leading-snug">
                <span aria-hidden="true" className="text-[#ff7043] mr-2">●</span><Lead>{lead}</Lead> {rest}
              </li>
            ))}
          </ul>
          <p className={pClass + " max-w-3xl mt-6"}>This is why two homes of the same size can have very different budgets. For home interior design in Hyderabad, the most useful figure is the one built from your own drawings and a written scope with inclusions and exclusions listed clearly. Because every project differs, our interior designers in Hyderabad prepare estimates from your plans rather than publishing package prices. A fair interior designer in Hyderabad should be able to explain every line of that estimate.</p>
        </section>

        {/* 10. Why clients choose us */}
        <section aria-labelledby="top-why" className={sectionClass}>
          <p className={eyebrow}>Why us</p>
          <h2 id="top-why" className={h2Class}>Why Clients Choose Bright Arena Interiors</h2>
          <p className={leadClass + " max-w-3xl mt-6"}>Clients who shortlist top interior designers in Hyderabad choose Bright Arena Interiors for clear scope, visible design thinking and steady communication from first drawing to handover. We explain what is included, show how spaces will look before work starts and keep you informed as the project moves through each stage.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-8">
            {whyUs.map(([lead, rest]) => (
              <div key={lead} className={card + " !p-6"}>
                <h3 className="text-[#4a1c13] font-primary text-xl md:text-2xl">{lead.replace(/[.]$/, "")}</h3>
                <p className={pClass + " mt-2 text-base md:text-base"}>{rest}</p>
              </div>
            ))}
          </div>
          <p className={pClass + " max-w-3xl mt-6"}>Families who want dependable home interior designers in Hyderabad, and businesses looking for office interior designers in Hyderabad, tend to ask the same thing: will the plan hold once work begins? A defined scope and consistent communication are how we answer it.</p>
        </section>

        {/* 11. Areas served */}
        <section aria-labelledby="top-areas" className={sectionClass}>
          <p className={eyebrow}>Coverage</p>
          <h2 id="top-areas" className={h2Class}>Areas We Serve Across Hyderabad</h2>
          <div className={stack}>
            <p className={leadClass}>Bright Arena Interiors takes on home, office and commercial projects across Hyderabad, including Gachibowli, HITEC City, Madhapur, Kondapur, Financial District, Kokapet, Jubilee Hills and Banjara Hills. Tell us your locality and property type, and we will confirm availability.</p>
            <p className={pClass}>Each part of the city brings its own conditions. Gated communities and high-rise apartments in the western corridor often come with society rules on working hours, lift use and material movement. Villas and independent homes in Jubilee Hills and Banjara Hills allow more freedom in layout but need closer coordination across larger scopes. Offices around HITEC City and the Financial District bring their own demands on timelines and approvals. Wherever your project is, our interior designers in Hyderabad plan around the real conditions of the site before the design is finalised.</p>
          </div>
        </section>

        {/* 12. FAQs */}
        <section aria-labelledby="top-faq" className={sectionClass}>
          <p className={eyebrow}>Questions</p>
          <h2 id="top-faq" className={h2Class}>Frequently Asked Questions About Interior Design in Hyderabad</h2>
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

        {/* 13. Final conversion */}
        <section aria-labelledby="top-book" className={sectionClass}>
          <p className={eyebrow}>Next step</p>
          <h2 id="top-book" className={h2Class}>Book Your Interior Design Consultation with Bright Arena Interiors</h2>
          <div className={stack}>
            <p className={pClass}>Tell us about your project and we will help you take the next step. Whether you are planning a new apartment, renewing a villa, fitting out an office or shortlisting top interior designers in Hyderabad for a commercial space, a short conversation is enough to begin. We will review what you share, suggest the right starting point and explain how our process applies to your space. You do not need finished designs, budgets or timelines before you reach out.</p>
            <p className={pClass}>To make the first conversation useful, share your property type and locality, BHK or area, project stage, preferred scope and approximate timeline. A floor plan helps if you have one. Budget is optional.</p>
          </div>
          <div className="mt-6"><button onClick={openForm} className={primaryBtn}>Book an Interior Design Consultation</button></div>
        </section>
      </article>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
