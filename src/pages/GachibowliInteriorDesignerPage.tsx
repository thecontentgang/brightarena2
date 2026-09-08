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

export default function GachibowliInteriorDesignerPage() {
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  // The parsed SEO content structured for elegant rendering
  const pageContent = [
    { type: "paragraph", text: "Gachibowli has everything from gated apartment communities to villas and busy workplaces, so one design formula rarely fits every property. Our home interior design in Gachibowli approach starts with how you intend to use the space, then brings layouts, materials, storage, lighting, 2D/3D visualisation, and execution requirements into the discussion." },
    { type: "paragraph", text: "Whether you need a home interior designer in Gachibowli for a new apartment or design support for a villa or office, the process can begin with your floor plan. Bright Arena Interiors offers interior design consultation in Gachibowli based on the agreed project scope. Book a Design Consultation | Request a Site Visit | Discuss Your Floor Plan on WhatsApp." },
    
    { type: "heading", text: "Designed for the Way Gachibowli Lives and Works" },
    { type: "paragraph", text: "Gachibowli combines busy professional life with modern residential living. Gated communities, hybrid work routines, larger family homes, and technology-heavy lifestyles create specific planning needs. An interior designer in Gachibowli should understand these everyday realities before choosing finishes." },
    { type: "paragraph", text: "Homes around Gachibowli, Financial District, Nanakramguda, and Kondapur may need workstations that blend into bedrooms, organised kitchen storage, comfortable living areas, and electrical points placed for modern devices. In gated-community apartments, furniture dimensions and storage depth also matter because poor planning can quickly reduce comfortable circulation." },
    { type: "paragraph", text: "Useful interior design services in Gachibowli connect these details rather than treating them as separate upgrades. Smart wiring can support televisions, appliances, workstations, and charging needs, while layered lighting can adapt a room for different times of day. Early planning also helps busy homeowners settle key design decisions before related execution begins." },
    
    { type: "heading", text: "Home, Apartment, and Office Interior Design Services" },
    { type: "paragraph", text: "Every property starts with a different brief. A residential interior designer in Gachibowli may be solving storage for a growing family, while an office project focuses on people, movement, and work. Good design begins by understanding those differences instead of starting with a standard package." },
    { type: "paragraph", text: "For residential projects, an apartment interior designer in Gachibowli can plan kitchens, wardrobes, living rooms, bedrooms, storage, ceilings, and lighting around the available layout. A villa interior designer in Gachibowli may work with larger rooms or multiple levels, where furniture scale and visual continuity require a different approach." },
    { type: "paragraph", text: "Office interiors introduce workstations, meeting areas, circulation, lighting, storage, and technology into the brief. 3D interior design in Gachibowli can help make proposed ideas easier to understand before execution-related decisions are finalised." },
    
    { type: "heading", text: "Residential, Apartment, and Villa Interiors" },
    { type: "paragraph", text: "Useful home interiors in Gachibowli should feel connected to the people living in them. Cooking habits, work schedules, family size, storage requirements, and furniture preferences can influence a design far more than a passing trend. The floor plan provides boundaries; your lifestyle gives those spaces purpose." },
    { type: "paragraph", text: "Apartment owners often need to make every room work harder without filling every wall with cabinetry. For larger properties, a premium interior designer in Gachibowli can focus on proportion, material coordination, lighting, and purposeful detailing. Premium design should feel considered rather than simply adding expensive-looking elements." },
    { type: "paragraph", text: "Clients searching for a luxury interior designer in Gachibowli may prefer richer finishes or bespoke details, yet usability still matters. Luxury home interiors in Gachibowli work better when beautiful materials support comfortable movement, sensible storage, and everyday routines. A good home should still feel effortless when the photographs are over and ordinary life begins." },
    
    { type: "heading", text: "Office, 2D/3D Design and Consultation" },
    { type: "paragraph", text: "An office has to support the people who use it throughout the day. Workstations, meeting spaces, circulation, lighting, storage, electrical planning, and collaborative areas can all shape the layout. These practical requirements should be resolved alongside the visual identity rather than after it." },
    { type: "paragraph", text: "Visual planning makes many decisions easier to discuss. 3D home interior design in Gachibowli can show how cabinetry, colours, finishes, furniture, and room proportions may work together. 2D layouts help communicate dimensions, movement, furniture positions, and functional relationships that are less obvious from an inspirational image." },
    { type: "paragraph", text: "A home interior consultation in Gachibowli can be useful before the scope is fully defined. Bring your floor plan and talk about what bothers you, what you need more of, and how you want each room to work. That conversation gives an interior designer in Gachibowli a practical context before style references and material selections begin influencing the project." },
    
    { type: "heading", text: "Home Interiors Planned Around Your Property and Lifestyle" },
    { type: "paragraph", text: "A home can be beautifully finished and still frustrate you every morning. Complete home interiors in Gachibowli should therefore begin with everyday behaviour: where things are stored, how the kitchen is used, whether someone works from home, and which rooms need to perform more than one role." },
    { type: "paragraph", text: "A 2 BHK interior design in Gachibowli often benefits from compact storage and flexible furniture. 3 BHK interior design in Gachibowli may allow a dedicated study, guest room, or children's space. With 4 BHK interior design in Gachibowli, maintaining a coherent relationship between larger common spaces and individual bedrooms becomes important." },
    { type: "paragraph", text: "Depending on your needs, the scope could involve full home interior design in Gachibowli, turnkey home interiors in Gachibowli, or selected custom home interiors in Gachibowli. Whether your preference is modern home interior design in Gachibowli or premium home interiors in Gachibowli, Bright Arena Interiors can begin with your property brief instead of a preset room formula." },

    { type: "heading", text: "Planning 2 BHK, 3 BHK, and 4 BHK Homes" },
    { type: "paragraph", text: "With 2 BHK home interiors in Gachibowli, the challenge is often deciding what deserves valuable floor and wall space. A compact workstation, well-planned wardrobe, or additional kitchen storage can be useful, but too many large elements can make an otherwise comfortable apartment feel crowded." },
    { type: "paragraph", text: "3 BHK home interiors in Gachibowli offer more flexibility, yet that extra room needs a clear purpose. If it will switch between guest room and home office, electrical points, storage, lighting, and furniture should support both uses. Planning those needs early can prevent the room from becoming an awkward collection of compromises." },
    { type: "paragraph", text: "For 4 BHK home interiors in Gachibowli, larger living spaces and several bedrooms can create more design decisions, not fewer. Materials, lighting, furniture scale, storage, and individual room preferences need a common thread. Share your floor plan with an interior designer in Gachibowli and identify the priorities for each room before deciding which features belong in the project." },

    { type: "heading", text: "Key Interior Design Elements for a Complete Home" },
    { type: "paragraph", text: "A complete home is built from connected decisions. The kitchen affects daily movement, wardrobes influence bedroom space, and lighting changes how colours and finishes feel after dark. Planning these elements together helps the interior feel intentional rather than like a collection of products purchased room by room." },
    { type: "paragraph", text: "Custom interior design in Gachibowli becomes valuable when standard solutions do not fit the property or household. That could mean adjusting wardrobe internals, planning a work-from-home corner, changing kitchen storage, or simplifying a television wall. Customisation should solve a real need rather than make every feature unnecessarily complicated." },

    { type: "heading", text: "Modular Kitchen and Wardrobe Design" },
    { type: "paragraph", text: "A practical modular kitchen design in Gachibowli begins with cooking habits. Appliance positions, worktop space, frequently used utensils, groceries, and movement between cooking and cleaning areas can influence how cabinets are arranged. A beautiful kitchen becomes frustrating quickly if everyday items are difficult to reach." },
    { type: "paragraph", text: "A modular kitchen in Gachibowli may combine base cabinets, overhead units, drawers, tall storage, and corner solutions according to available space. Wardrobe design in Gachibowli follows similar logic: hanging sections, shelves, drawers, lofts, and accessories should be based on what needs to be stored rather than copied from a catalogue." },

    { type: "heading", text: "Living Room, Bedroom, TV Unit, Ceiling, and Lighting" },
    { type: "paragraph", text: "Living room interior design in Gachibowli needs to accommodate conversation, television, guests, circulation, and sometimes work. Furniture scale is crucial. A deep sofa, oversized centre table, or bulky storage wall can change how easily people move through an apartment, even when each item looks attractive on its own." },
    { type: "paragraph", text: "In bedroom interior design in Gachibowli, comfort and privacy take priority. Master bedroom interior design in Gachibowli may also need dressing storage, a work corner, or additional cabinetry. A well-sized TV unit design in Gachibowli can organise media equipment and storage without turning the television wall into the heaviest feature in the room." },
    { type: "paragraph", text: "A thoughtful false ceiling design in Gachibowli can help organise lighting and visually define areas where needed. Home lighting design in Gachibowli can then combine ambient, task, and accent layers according to room use. The goal is not to add more lights everywhere; it is to place the right kind of illumination where everyday activities actually require it." },

    { type: "heading", text: "From Concept to Handover: Our Interior Execution Process" },
    { type: "paragraph", text: "An attractive concept is only the beginning. Turnkey interior design in Gachibowli involves decisions that need to move logically from discussion to site. Measurements, layouts, visualisation, materials, approvals, quotation details, and execution all influence whether the completed interior reflects what was originally planned." },
    { type: "paragraph", text: "The process begins with consultation and site measurement. Interior design planning in Gachibowli then considers room functions, furniture, movement, and storage. Relevant 2D drawings and 3D views help communicate the proposed direction before material specifications, project scope, and quotation details are reviewed and approved." },
    { type: "paragraph", text: "Once approvals are in place, home interior execution in Gachibowli moves the project into site implementation, coordination, quality review, and eventual handover. This structured approach supports complete interior design and execution in Gachibowli while recognising that every property has different conditions. Responsible planning avoids promising the same completion period for every scope." },

    { type: "heading", text: "What Shapes Interior Design Cost in Gachibowli?" },
    { type: "paragraph", text: "The interior design cost in Gachibowli depends on what your property actually needs. Floor area matters, but so do materials, custom carpentry, civil modifications, electrical work, appliances, automation, site condition, and the number of spaces included. Bedroom count alone cannot produce a dependable estimate." },
    { type: "paragraph", text: "The home interior cost in Gachibowli also changes with the scope. A kitchen-and-wardrobe project cannot be compared directly with a complete home involving several bedrooms, ceilings, lighting, furniture, and additional work. The amount and complexity of carpentry can make a substantial difference even between properties with similar floor plans." },

    { type: "heading", text: "Why Choose Bright Arena Interiors for Your Project?" },
    { type: "paragraph", text: "Choosing a professional interior designer in Gachibowli is not simply about finding the most dramatic portfolio. The designer also needs to understand your property, identify functional priorities, communicate ideas clearly, and connect approved decisions with the realities of materials and execution." },
    { type: "paragraph", text: "Bright Arena Interiors focuses on personalised planning because two similar apartments can belong to people with very different routines. One family may need more kitchen storage; another may prioritise a home office or children's room. 2D/3D capability helps make those decisions easier to discuss before related elements move toward execution." },

    { type: "heading", text: "Areas We Serve Around Gachibowli" },
    { type: "paragraph", text: "Our local service focus includes Gachibowli and surrounding parts of Hyderabad's western corridor. People searching for interior designers near Gachibowli may also be based in Financial District, Nanakramguda, Kokapet, Kondapur, or HITEC City, depending on their property and project requirements." },
    { type: "paragraph", text: "When comparing home interior designers near Gachibowli or an interior design company near Gachibowli, proximity is useful but should not be the only filter. Relevant work, planning quality, communication, material clarity, and execution scope also matter. Share your property location so the project can be discussed in its real local and site context." }
  ];

  const faqs = [
    { q: "How Much Does an Interior Designer Cost in Gachibowli?", a: "The cost depends on your property, scope, and specifications. Floor area, carpentry, materials, electrical work, civil changes, furniture, and site conditions all influence the requirement. For a relevant estimate, share your floor plan and define the spaces you want included so we can compare materials and quantities properly." },
    { q: "What Does an Interior Designer Do in Gachibowli?", a: "The role includes requirement gathering, space planning, furniture positioning, kitchen and wardrobe design, material selection, lighting, ceilings, 2D drawings, 3D visualisation, and execution coordination based on the agreed scope. The exact service should always be confirmed before starting." },
    { q: "What Is Included in a Complete Home Interior Package?", a: "It typically covers a modular kitchen, wardrobes, living and bedroom elements, storage, TV units, ceilings, and lighting. However, civil changes, loose furniture, appliances, and electrical modifications may or may not be included. Always review the detailed scope, materials, and exclusions rather than relying solely on the package name." },
    { q: "How Much Does a 2 BHK or 3 BHK Interior Design Cost in Gachibowli?", a: "Cost cannot be determined accurately from bedroom count alone. Carpet area, kitchen dimensions, custom carpentry, material choices, and hardware make a massive difference. A selective kitchen-and-wardrobe project naturally differs from a full-home execution. Share your floor plan and room-by-room requirements for an accurate estimate." },
    { q: "Do Interior Designers Provide 3D Designs?", a: "Yes, 3D visualisation can form part of the design service. It helps you understand proposed cabinetry, colours, finishes, and the overall appearance of key rooms before related physical elements move toward execution." },
    { q: "Do You Provide Turnkey Interior Design Services in Gachibowli?", a: "Yes, our turnkey support connects design planning and execution. This workflow brings together consultation, site measurement, 2D/3D development, material approval, execution coordination, quality review, and handover for a seamless experience." },
    { q: "How Long Does a Home Interior Project Take?", a: "The duration depends on the size of the property, design scope, approval process, customisation, site conditions, and execution requirements. Discuss the expected schedule with us once your specific project scope has been established." },
    { q: "Can I Customize My Home Interior Design?", a: "Yes. Customisation responds to your layout, storage habits, work routine, and visual preferences. Whether it involves adjusting wardrobe internals or creating a quiet workstation, we aim to deliver solutions that add genuine practical value." },
    { q: "Do You Provide Interior Design for Apartments and Villas in Gachibowli?", a: "Yes, we handle both. Apartments often require careful control of furniture and storage dimensions for comfortable circulation, while villas provide flexibility but demand a consistent visual language across multiple floors. We plan specifically around your property's architecture." }
  ];

  return (
    <>
      <SEO
        title="Interior Designer in Gachibowli, Hyderabad | Bright Arena Interiors"
        description="Looking for an interior designer in Gachibowli? Bright Arena Interiors plans personalised residential and office spaces around your layout and practical priorities."
        keywords="interior designer in Gachibowli, home interior design in Gachibowli, apartment interior designer Gachibowli, turnkey home interiors Gachibowli"
        url="https://www.brightarenainteriors.com/interior-designer-gachibowli"
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
            Interior Designer in Gachibowli, Hyderabad
          </RevealHeading>

          <motion.p
            className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Looking for an interior designer in Gachibowli who understands how your home or workplace needs to function? Bright Arena Interiors plans personalised residential and office spaces around your layout, lifestyle, storage needs, design preferences, and practical priorities.
          </motion.p>
        </section>

        {/* ── PRIMARY IMAGE ── */}
        <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
          <div
            ref={primaryImgRef}
            className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
          >
            <motion.img
              src="/images/gachibowli-interior-hero.jpg"
              alt="Luxury Interior Design in Gachibowli Hyderabad"
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
              Homeowners usually have practical questions before they commit to an interior designer in Gachibowli. Cost, project scope, 3D visualisation, turnkey execution, and timelines can all affect the decision. The answers below address common search questions directly.
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