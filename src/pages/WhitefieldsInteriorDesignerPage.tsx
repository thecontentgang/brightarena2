"use client";

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import SEO from "../components/SEO";

// Gentle, premium easing curve
const EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

function RegisterMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" className={className} aria-hidden="true">
      <line x1="12" y1="0" x2="12" y2="24" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="12" x2="24" y2="12" stroke="currentColor" strokeWidth="1" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

interface RevealHeadingProps {
  children: string;
  className?: string;
  delay?: number;
  animateOnLoad?: boolean;
}

function RevealHeading({ children, className, delay = 0, animateOnLoad = false }: RevealHeadingProps) {
  if (!children) return null;
  const lines = children.split("\n");
  let wordIndex = 0;

  return (
    <h2 className={className}>
      {lines.map((line: string, li: number) => (
        <span key={li} className="block">
          {line.split(" ").map((word: string) => {
            const wi = wordIndex++;
            return (
              <span key={wi} className="inline-block overflow-hidden pb-2 mr-[0.2em] sm:mr-[0.22em]">
                <motion.span
                  className="block"
                  initial={{ y: "120%", opacity: 0 }}
                  animate={animateOnLoad ? { y: "0%", opacity: 1 } : undefined}
                  whileInView={!animateOnLoad ? { y: "0%", opacity: 1 } : undefined}
                  transition={{ duration: 1.1, delay: delay + wi * 0.04, ease: EASE }}
                  viewport={{ once: true }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h2>
  );
}

export default function WhitefieldsInteriorDesignerPage() {
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  // The parsed SEO content structured for elegant rendering
  const pageContent = [
    { type: "paragraph", text: "Whitefields combines apartment communities, villas, workplaces, and easy access to Hyderabad's technology corridor. Thoughtful home interior design in Whitefields therefore needs to balance practical layouts, kitchen usability, organised storage, lighting, furniture, visual character, and execution requirements from the beginning." },
    { type: "paragraph", text: "Whether you need a home interior designer in Whitefields for a new property or want to rethink an existing space, start by sharing your layout and priorities. An interior design consultation in Whitefields can clarify the scope before major decisions are made. Book a Design Consultation, Request a Site Visit, or Discuss Your Floor Plan on WhatsApp." },
    
    { type: "heading", text: "Designed for the Way Whitefields Lives and Works" },
    { type: "paragraph", text: "Homes in Whitefields need to work beyond the day they are photographed. Apartment layouts, family storage, utility balconies, home-working needs, and everyday movement all matter. An interior designer in Whitefields should solve these practical details before adding decorative layers." },
    { type: "paragraph", text: "In apartment communities, a kitchen may need to work neatly with its utility balcony, while bedrooms must accommodate wardrobes without narrowing circulation. Families may also need a study corner, concealed charging points, accessible storage, or flexible furniture. Villas bring more space, but they still require disciplined planning to avoid disconnected rooms." },
    { type: "paragraph", text: "Renovation adds another layer because existing electrical points, plumbing, finishes, and society-related site rules can influence execution. Useful interior design services in Whitefields connect the proposed design with these realities. This is especially relevant around Whitefields and the HITEC City corridor, where convenience and functional planning often matter as much as appearance." },
    
    { type: "heading", text: "Home, Apartment, and Office Interior Design Services" },
    { type: "paragraph", text: "Different properties create different design questions. A residential interior designer in Whitefields may focus on family routines and storage, while an office needs practical work areas, meeting zones, lighting, circulation, and technology planned around the people using it." },
    { type: "paragraph", text: "An apartment interior designer in Whitefields can work with tighter dimensions, fixed service points, and limited circulation. A villa interior designer in Whitefields may coordinate larger rooms and varied functions. In either case, a professional interior designer in Whitefields should explain how each recommendation responds to the actual property." },
    { type: "paragraph", text: "For clients who want to understand a proposal before execution, 3D interior design in Whitefields can communicate colours, cabinetry, finishes, and spatial relationships more clearly. Relevant internal links can direct visitors to Home Interior Design, Villa/Apartment Interior Design, and 2D/3D Virtual Design services without interrupting the main decision journey." },
    
    { type: "heading", text: "Home Interiors Planned Around Your Property and Lifestyle" },
    { type: "paragraph", text: "Useful home interiors in Whitefields begin with how the household lives. Cooking habits, family size, storage volume, work schedules, furniture preferences, and guest routines can change what each room needs. Good planning makes these everyday details part of the design brief." },
    { type: "paragraph", text: "A 2 BHK interior design in Whitefields often needs compact storage and flexible furniture. 3 BHK interior design in Whitefields may create space for a study or guest room, while 4 BHK interior design in Whitefields requires stronger coordination across larger common areas and several bedrooms." },
    { type: "paragraph", text: "Depending on your requirements, the scope may include complete home interiors in Whitefields, full home interior design in Whitefields, or custom home interiors in Whitefields. Homeowners may prefer modern home interior design in Whitefields, premium home interiors in Whitefields, or luxury home interiors in Whitefields. Share your floor plan so the project brief starts with your property rather than a preset package." },

    { type: "heading", text: "Planning 2 BHK, 3 BHK, and 4 BHK Homes" },
    { type: "paragraph", text: "With 2 BHK home interiors in Whitefields, furniture and storage dimensions matter greatly. An oversized TV wall or deep wardrobe can quickly reduce comfortable movement, so planning should focus on what the household genuinely needs while keeping rooms visually open." },
    { type: "paragraph", text: "3 BHK home interiors in Whitefields provide more flexibility, yet each room still needs a purpose. A bedroom used partly as a workspace may require different lighting, storage, furniture, and electrical planning. Thoughtful apartment interior design in Whitefields resolves these overlapping needs before carpentry begins." },
    { type: "paragraph", text: "For 4 BHK home interiors in Whitefields, individual rooms can have their own personality without making the home feel fragmented. Materials, colours, lighting, and common spaces need a connecting thread. Turnkey home interiors in Whitefields can bring these decisions into one coordinated scope when homeowners prefer design and execution to remain connected." },

    { type: "heading", text: "Key Interior Design Elements for a Complete Home" },
    { type: "paragraph", text: "A well-planned home works as a connected system. The kitchen influences daily movement, wardrobes affect bedroom space, furniture changes electrical requirements, and ceilings shape lighting. Custom interior design in Whitefields helps these decisions support one another." },
    { type: "paragraph", text: "A modular kitchen design in Whitefields should reflect cooking habits, appliance positions, storage, and worktop needs. A modular kitchen in Whitefields can use drawers, tall units, and overhead storage appropriately. Wardrobe design in Whitefields and a custom wardrobe in Whitefields should likewise start with what needs to be stored." },
    { type: "paragraph", text: "The same thinking applies to living room interior design in Whitefields, bedroom interior design in Whitefields, and master bedroom interior design in Whitefields. A practical TV unit design in Whitefields can organise media neatly, while false ceiling design in Whitefields and home lighting design in Whitefields should support comfortable ambient, task, and accent lighting rather than decoration alone." },

    { type: "heading", text: "From Concept to Handover: Our Interior Execution Process" },
    { type: "paragraph", text: "A design needs a clear path from screen to site. Turnkey interior design in Whitefields can connect consultation, measurement, space planning, visualisation, material decisions, approvals, execution, review, and handover within a clearly agreed project scope." },
    { type: "paragraph", text: "The process begins by understanding requirements and measuring the property. Interior design planning in Whitefields then addresses room functions, furniture, storage, and circulation. Relevant 2D layouts and 3D views can clarify the proposed direction before materials, specifications, quantities, and quotation details are reviewed." },
    { type: "paragraph", text: "Once approvals are complete, home interior execution in Whitefields can move into coordinated implementation. This approach supports complete interior design and execution in Whitefields, end-to-end interior design in Whitefields, and interior project management in Whitefields. Actual sequencing and duration should always depend on project scope, site conditions, and approved requirements." },
    
    { type: "heading", text: "Turnkey and Custom Interior Planning" },
    { type: "paragraph", text: "A turnkey interior designer in Whitefields can help homeowners who prefer design and execution to remain connected. The value comes from clarity around rooms, materials, specifications, approvals, responsibilities, and exclusions rather than simply placing the word “turnkey” on a proposal." },
    { type: "paragraph", text: "A custom interior designer in Whitefields looks closely at problems unique to the household. A utility-balcony kitchen may need better storage, an awkward wall might become useful cabinetry, or a bedroom may require a discreet workstation. Customisation is most valuable when it improves how the space is used." },
    { type: "paragraph", text: "Bright Arena Interiors approaches planning by connecting practical requirements with the agreed visual direction. Instead of customising every feature for effect, decisions can focus on storage, movement, proportions, lighting, and personal preferences. That keeps the project useful while still giving homeowners room to create interiors that feel distinctly their own." },

    { type: "heading", text: "What Shapes Interior Design Cost in Whitefields?" },
    { type: "paragraph", text: "The interior design cost in Whitefields depends on more than the number of bedrooms. Property area, rooms included, materials, carpentry, civil work, electrical changes, appliances, automation, customisation, and existing site conditions can all affect the estimate." },
    { type: "paragraph", text: "The home interior cost in Whitefields also changes with project depth. A kitchen-and-wardrobe requirement is different from a complete home with living spaces, bedrooms, ceilings, lighting, and custom furniture. When comparing interior designers' costs in Whitefields, always check the scope behind the total." },
    { type: "paragraph", text: "A 2 BHK interior cost in Whitefields, a 3 BHK interior cost in Whitefields, and a 4 BHK interior cost in Whitefields should therefore be assessed against actual requirements. When considering interior design packages in Whitefields or home interior packages in Whitefields, compare specifications, quantities, inclusions, and exclusions. Get a plan based on your layout and requirements." },

    { type: "heading", text: "Why Choose Bright Arena Interiors for Your Project?" },
    { type: "paragraph", text: "Choosing an interior designer in Whitefields is about more than finding an attractive image online. The design team should understand your floor plan, ask useful questions, explain trade-offs, and connect functionality, materials, visualisation, and execution decisions clearly." },
    { type: "paragraph", text: "Bright Arena Interiors focuses on personalised planning because similar apartments can belong to very different households. One family may need more kitchen storage, another may prioritise a work corner, while someone else may prefer open surfaces and minimal cabinetry. Relevant 2D/3D planning can make those choices easier to evaluate." },
    { type: "paragraph", text: "Searches for the best interior designer in Whitefields, premium interior designer in Whitefields, or luxury interior designer in Whitefields usually reflect a desire for quality. Rather than relying on labels, compare genuine project work, functional planning, material clarity, communication, and execution approach. Awards, ratings, warranties, or performance promises should only be used when independently verified." },

    { type: "heading", text: "Areas We Serve Around Whitefields" },
    { type: "paragraph", text: "People looking for interior designers near Whitefields may be based within Whitefields or elsewhere in Hyderabad's western corridor. Nearby locations include Kondapur, HITEC City, Madhapur, Gachibowli, and Kothaguda, each with a different mix of apartments and homes." },
    { type: "paragraph", text: "When comparing home interior designers near Whitefields or an interior design company near Whitefields, location is only one consideration. Relevant property experience, planning quality, materials, communication, and execution scope matter too. Bright Arena Interiors can begin with your floor plan and site location so recommendations remain connected to the property rather than a generic locality template." }
  ];

  const faqs = [
    { q: "How Much Does an Interior Designer Cost in Whitefields?", a: "How much does an interior designer cost in Whitefields? There is no single reliable figure because cost changes with floor area, project scope, carpentry quantities, materials, civil or electrical work, appliances, automation, and existing site conditions. Share your floor plan and define the rooms you want included to compare accurate quantities rather than headline prices." },
    { q: "What Does an Interior Designer Do in Whitefields?", a: "What does an interior designer do in Whitefields? The role includes understanding requirements, planning layouts, organising storage and furniture, selecting materials, coordinating lighting, and preparing relevant 2D/3D designs. Depending on the agreed service, it can also include execution coordination and quality review." },
    { q: "What Is Included in a Complete Home Interior Package?", a: "What is included in a complete home interior package? Inclusions vary. A scope may cover a kitchen, wardrobes, living-room elements, ceilings, and lighting. Civil changes, loose furniture, appliances, and electrical modifications may be excluded. Review the detailed room list and material specifications before approving." },
    { q: "How Much Does a 2 BHK or 3 BHK Interior Design Cost in Whitefields?", a: "The answer depends on usable area, kitchen size, wardrobe quantities, materials, lighting, ceilings, and customisation. One property might require only essential storage, while another needs complete room-by-room planning. Identify exactly what you want designed to receive a context-driven estimate." },
    { q: "Do Interior Designers Provide 3D Designs?", a: "Do interior designers provide 3D designs? Yes, 3D visualisation can be included within an agreed design scope. It helps homeowners understand proposed colours, cabinetry, materials, and furniture relationships before related execution begins." },
    { q: "Do You Provide Turnkey Interior Design Services in Whitefields?", a: "Do you provide turnkey interior design services in Whitefields? Yes, our turnkey support connects consultation, measurement, planning, visualisation, material decisions, quotation approval, site coordination, review, and handover within a clearly defined scope." },
    { q: "How Long Does a Home Interior Project Take?", a: "How long does a home interior project take? Duration varies with property size, design scope, approvals, material decisions, and existing conditions. Discuss the programme after your exact scope is defined to get a project-specific expectation." },
    { q: "Can I Customize My Home Interior Design?", a: "Can I customize my home interior design? Yes. Interiors can be adapted around your storage needs, cooking habits, work routine, and layout constraints. We focus on tailoring solutions that genuinely improve how you use the space." },
    { q: "Do You Provide Interior Design for Apartments and Villas in Whitefields?", a: "Do you provide interior design for apartments and villas in Whitefields? Yes. Apartments often require strict control of dimensions to preserve movement, whereas villas demand coordination across larger areas and multiple levels. We plan specifically for your property's architectural style." }
  ];

  return (
    <>
      <SEO
        title="Interior Designer in Whitefields, Hyderabad | Bright Arena Interiors"
        description="Looking for an interior designer in Whitefields? Bright Arena Interiors creates personalized home and office designs that balance practical layouts with visual character."
        keywords="interior designer in Whitefields, home interior design in Whitefields, apartment interior designer Whitefields, turnkey home interiors Whitefields"
        url="https://www.brightarenainteriors.com/interior-designer-whitefields"
      />

      <main className="bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-24 sm:pt-28 md:pt-32">
        {/* ── COMPACT EDITORIAL HEADER ── */}
        <section className="relative w-full px-5 sm:px-8 md:px-12 lg:px-16 mb-12 sm:mb-16 md:mb-20 text-center flex flex-col items-center">
          <RegisterMark className="hidden sm:block absolute top-2 left-4 md:left-8 text-[#4a1c13]/15" />
          <RegisterMark className="hidden sm:block absolute top-2 right-4 md:right-8 text-[#4a1c13]/15" />

          <motion.nav
            className="flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <Link to="/" className="hover:text-[#ff7043] transition-colors">
              Home
            </Link>
            <span className="w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" />
            <span className="text-[#4a1c13] max-w-[45vw] sm:max-w-none truncate">Location</span>
          </motion.nav>

          <RevealHeading
            animateOnLoad={true}
            className="font-primary text-[clamp(32px,8vw,64px)] leading-[1.08] tracking-tight text-[#4a1c13] max-w-4xl"
          >
            Interior Designer in Whitefields, Hyderabad
          </RevealHeading>

          <motion.p
            className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Choosing an interior designer in Whitefields should begin with your floor plan, not a catalogue. Bright Arena Interiors plans personalised residential and office spaces around everyday routines, storage needs, available space, and your preferred design direction.
          </motion.p>
        </section>

        {/* ── PRIMARY IMAGE ── */}
        <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
          <div
            ref={primaryImgRef}
            className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
          >
            <motion.img
              src="/images/whitefields-interior-hero.jpg"
              alt="Luxury Interior Design in Whitefields Hyderabad"
              className="w-full h-full object-cover bg-[#e0dbd1]"
              style={{ y: imgY, scale: 1.1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: EASE }}
            />
            <motion.div
              className="absolute inset-0 bg-[#f7f4ee]"
              style={{ transformOrigin: "left" }}
              initial={{ scaleX: 1 }}
              whileInView={{ scaleX: 0 }}
              transition={{ duration: 1.2, ease: EASE }}
              viewport={{ once: true, margin: "-60px" }}
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 text-[#f7f4ee]">
              <span className="w-6 sm:w-8 h-px bg-[#ffc107]" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold drop-shadow-sm">
                Bright Arena Interiors
              </span>
            </div>
          </div>
        </section>

        {/* ── DETAILED EXPLANATION (SEO Content) ── */}
        <section className="max-w-4xl mx-auto px-5 sm:px-8 md:px-12 mb-16 sm:mb-20">
          <div>
            {pageContent.map((block, idx) => {
              if (block.type === "heading") {
                return (
                  <motion.h3
                    key={idx}
                    className="font-primary text-xl sm:text-2xl md:text-3xl text-[#4a1c13] mt-10 sm:mt-12 mb-5 sm:mb-6 leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE }}
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {block.text}
                  </motion.h3>
                );
              }
              return (
                <motion.p
                  key={idx}
                  className="text-[#4a1c13]/75 leading-[1.8] sm:leading-[1.85] mb-5 sm:mb-6 text-[15px] sm:text-base md:text-lg font-sans"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  {block.text}
                </motion.p>
              );
            })}
          </div>

          {/* ── FAQ SECTION ── */}
          <div className="mt-16 sm:mt-20 pt-14 sm:pt-16 border-t border-[#4a1c13]/10">
            <RevealHeading delay={0.1} className="font-primary text-[clamp(24px,4vw,36px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-6 sm:mb-8">
              Frequently Asked Questions
            </RevealHeading>
            <p className="text-[#4a1c13]/75 leading-[1.8] mb-10 text-[15px] sm:text-base md:text-lg font-sans">
              Homeowners comparing interior designers in Whitefields usually want practical answers before booking a consultation. Cost, complete-home scope, 3D visualisation, and project duration are common questions. The answers below focus on decisions that matter before a project begins.
            </p>
            <div className="grid grid-cols-1 gap-y-10">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col gap-2 rounded-xl -mx-3 px-3 py-2 transition-colors hover:bg-[#4a1c13]/[0.03]"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.08, ease: EASE }}
                  viewport={{ once: true }}
                >
                  <span className="text-[#4a1c13] font-primary text-lg sm:text-xl font-bold leading-tight">
                    {faq.q}
                  </span>
                  <span className="text-[#4a1c13]/70 font-sans text-sm sm:text-base leading-relaxed mt-1">
                    {faq.a}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FULL-WIDTH HORIZONTAL CTA BANNER ── */}
        <section className="w-full bg-[#4a1c13] text-[#f7f4ee] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
          
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative z-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h3 className="font-primary text-[clamp(32px,4vw,56px)] leading-[1.1] text-[#f7f4ee] mb-4">
                Ready to Plan Your Interior?
              </h3>
              
              <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 text-[#f7f4ee]/70 font-medium text-sm md:text-base mt-6">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full border border-[#f7f4ee]/20 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>
                  <span>+91 123 456 7890</span> {/* Replace with actual contact number */}
                </div>
                
                <>
                  <span className="hidden sm:inline-block text-[#f7f4ee]/30">•</span>
                  <span>Available Mon-Sat (9:00 AM - 6:00 PM)</span>
                </>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              viewport={{ once: true }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-[#ff7043] text-white px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#f7f4ee] hover:text-[#4a1c13] transition-colors duration-500 whitespace-nowrap shadow-xl"
              >
                Discuss Your Floor Plan
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
    </>
  );
}