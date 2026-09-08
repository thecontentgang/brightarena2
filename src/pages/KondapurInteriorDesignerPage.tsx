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

export default function KondapurInteriorDesignerPage() {
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  // The parsed SEO content structured for elegant rendering
  const pageContent = [
    { type: "paragraph", text: "Kondapur has everything from compact apartments to large gated-community homes and busy office spaces. Our home interior design in Kondapur approach begins with understanding how each room will be used, then connects layouts, materials, lighting, storage, visualisation, and execution requirements in a practical sequence." },
    { type: "paragraph", text: "Whether you need a home interior designer in Kondapur, office planning, or an interior design consultation in Kondapur, you can begin with your floor plan and project brief. Book a Design Consultation, Request a Site Visit, or Discuss Your Floor Plan on WhatsApp to start with your actual property rather than a generic package." },
    
    { type: "heading", text: "Designed for the Way Kondapur Lives and Works" },
    { type: "paragraph", text: "Kondapur combines apartment-led family living with quick access to HITEC City and Madhapur. That creates a distinctive design brief: practical storage, flexible rooms, useful utility spaces, and interiors that can handle busy daily routines without feeling overloaded or difficult to maintain." },
    { type: "paragraph", text: "Many homes around Kondapur, Kothaguda, and Hafeezpet need smart solutions for utility-balcony kitchens, work-from-home corners, children's storage, and compact passages. An interior designer in Kondapur should consider these everyday constraints early, especially in apartments where a few oversized elements can quickly reduce comfortable movement." },
    { type: "paragraph", text: "Society rules, renovation access, service-lift timings, material movement, and site coordination may also influence execution in apartment communities. Thoughtful interior design services in Kondapur therefore go beyond choosing finishes; they connect the design with real site conditions so approved ideas remain practical when work moves from drawings into the home." },
    
    { type: "heading", text: "Home, Apartment, and Office Interior Design Services" },
    { type: "paragraph", text: "Every property has a different job to do. A residential interior designer in Kondapur may be planning for a family that needs more storage, while an office project may prioritise workstations, meeting rooms, circulation, and technology. The service should respond to those needs rather than follow one fixed format." },
    { type: "paragraph", text: "For homes, an apartment interior designer in Kondapur can plan kitchens, wardrobes, living areas, bedrooms, ceilings, lighting, and storage around the available floor plan. A villa interior designer in Kondapur may work with larger rooms, multiple levels, and broader material choices, where scale and continuity become equally important." },
    { type: "paragraph", text: "Clients can also explore 3D interior design in Kondapur to understand the proposed look before relevant execution begins. 2D layouts help communicate dimensions and circulation, while visualisation supports decisions about finishes, cabinetry, and furniture." },
    
    { type: "heading", text: "Residential, Apartment, and Villa Interiors" },
    { type: "paragraph", text: "Useful home interiors in Kondapur should reflect how the household actually lives. Cooking habits, storage volume, work schedules, children's needs, furniture preferences, and how often guests visit can all change the brief. A home feels easier to use when these details influence planning from the beginning." },
    { type: "paragraph", text: "For compact properties, a premium interior designer in Kondapur can focus on proportion, storage efficiency, lighting, and material coordination instead of adding unnecessary layers. In larger homes, a luxury interior designer in Kondapur may explore richer finishes, customised details, and more expressive spaces while keeping movement and everyday use comfortable." },
    { type: "paragraph", text: "The same principle applies to luxury home interiors in Kondapur: visual richness should not come at the cost of function. A polished room still needs accessible storage, suitable furniture scale, practical lighting, and sensible circulation. Good residential planning balances appearance with the small daily actions that make a home feel easy to live in." },
    
    { type: "heading", text: "Office, 2D/3D Design and Consultation" },
    { type: "paragraph", text: "Workplace interiors need a different planning lens. Desks, meeting areas, collaboration spaces, circulation, storage, lighting, electrical points, and technology all influence the layout. A visually impressive office can still feel inefficient if people constantly cross one another or essential functions are placed in awkward locations." },
    { type: "paragraph", text: "For homeowners, 3D home interior design in Kondapur can make proposed cabinetry, colours, materials, and room relationships easier to understand. It is especially useful when a floor plan alone does not communicate how the space may feel after furniture, storage, lighting, and finishes are introduced." },
    { type: "paragraph", text: "A home interior consultation in Kondapur is also useful when the project scope is still evolving. Bring your floor plan, explain the rooms that need attention, and share practical concerns before discussing finishes. This gives an interior designer in Kondapur clearer context and helps the design conversation begin with real needs instead of surface-level inspiration." },
    
    { type: "heading", text: "Home Interiors Planned Around Your Property and Lifestyle" },
    { type: "paragraph", text: "A home can look stylish and still be inconvenient. Complete home interiors in Kondapur should begin with practical questions: where will daily items be stored, how often is the kitchen used, does someone work from home, and which rooms need to adapt as family needs change?" },
    { type: "paragraph", text: "A 2 BHK interior design in Kondapur often needs efficient storage and multifunctional furniture. 3 BHK interior design in Kondapur may allow a dedicated guest room, study, or children's space. With 4 BHK interior design in Kondapur, maintaining visual continuity across larger common areas and several bedrooms becomes increasingly important." },
    { type: "paragraph", text: "Depending on your requirements, the scope may involve full home interior design in Kondapur, turnkey home interiors in Kondapur, or selected custom home interiors in Kondapur. Whether you prefer modern home interior design in Kondapur or premium home interiors in Kondapur, Bright Arena Interiors can begin with your layout and lifestyle instead of a preset room list." },

    { type: "heading", text: "Planning 2 BHK, 3 BHK, and 4 BHK Homes" },
    { type: "paragraph", text: "With 2 BHK home interiors in Kondapur, every large element affects the room. A deep wardrobe, oversized television unit, or bulky study desk can reduce circulation quickly, so the best decisions often come from asking what needs to be used every day and what can remain visually lighter." },
    { type: "paragraph", text: "3 BHK home interiors in Kondapur offer greater flexibility, but each room still needs a clear role. A bedroom that doubles as a home office may require different lighting, electrical points, storage, and furniture than a guest-only room. Deciding this early helps avoid costly compromises after installation." },
    { type: "paragraph", text: "For 4 BHK home interiors in Kondapur, the challenge shifts toward coordination. Larger living areas, multiple wardrobes, individual bedroom preferences, and varied lighting requirements need a common design thread. Share your project brief with an interior designer in Kondapur so each room can feel personal without making the overall home look disconnected." },

    { type: "heading", text: "Key Interior Design Elements for a Complete Home" },
    { type: "paragraph", text: "A complete interior is a chain of connected decisions. The kitchen affects workflow, wardrobes influence bedroom space, ceilings affect lighting, and a television wall influences furniture placement. Planning each item independently can create conflicts that only become obvious once the room is physically installed." },
    { type: "paragraph", text: "This is where custom interior design in Kondapur can add value. Customisation is not about making every feature unusual; it is about adapting storage, dimensions, finishes, and functions when the property or household needs something more specific than a standard arrangement." },

    { type: "heading", text: "Modular Kitchen and Wardrobe Design" },
    { type: "paragraph", text: "A practical modular kitchen design in Kondapur starts with cooking habits, appliance positions, countertop space, cleaning zones, and what needs to be stored close at hand. In many apartments, utility balconies also influence washing-machine placement, pantry storage, or how the kitchen connects to service areas." },
    { type: "paragraph", text: "A modular kitchen in Kondapur may include drawers, base units, overhead cabinets, tall storage, and corner solutions depending on space. Wardrobe design in Kondapur follows a similar principle: shelves, hanging sections, drawers, lofts, and accessories should be based on actual storage needs rather than a standard internal layout." },

    { type: "heading", text: "Living Room, Bedroom, TV Unit, Ceiling, and Lighting" },
    { type: "paragraph", text: "Living room interior design in Kondapur needs to balance seating, movement, television viewing, storage, and occasional guests. Furniture dimensions matter because a large sofa or deep storage wall can change how open the room feels, particularly in apartment layouts with defined circulation paths." },
    { type: "paragraph", text: "In bedroom interior design in Kondapur, comfort, privacy, and wardrobe access come first. Master bedroom interior design in Kondapur may also include dressing storage or a compact work area. A thoughtful TV unit design in Kondapur can organise media equipment without turning the entire wall into visually heavy cabinetry." },
    { type: "paragraph", text: "A purposeful false ceiling design in Kondapur can support lighting and help define zones where needed. Home lighting design in Kondapur can then combine ambient, task, and accent layers based on room use. Kitchens need clarity, bedrooms need softer illumination, and living spaces often benefit from flexible lighting for different activities." },

    { type: "heading", text: "From Concept to Handover: Our Interior Execution Process" },
    { type: "paragraph", text: "An attractive concept needs a practical route to the site. Turnkey interior design in Kondapur involves several connected stages, and each decision affects the next. Measurements, layouts, 2D/3D planning, materials, approvals, quotation details, and execution all need to remain aligned." },
    { type: "paragraph", text: "The process usually begins with consultation and site measurement, followed by interior design planning in Kondapur. Furniture, storage, movement, and room functions are considered before visual concepts are refined. Relevant 2D and 3D views help clients understand the proposed direction before materials and quotation details are reviewed." },
    { type: "paragraph", text: "Once approvals are in place, home interior execution in Kondapur moves the project toward implementation, coordination, quality review, and eventual handover. This supports complete interior design and execution in Kondapur while recognising that every site behaves differently. No responsible project should assume an identical timeline for every apartment, villa, or office." },

    { type: "heading", text: "What Shapes Interior Design Cost in Kondapur?" },
    { type: "paragraph", text: "The interior design cost in Kondapur depends on more than the bedroom count. Property size, project scope, materials, custom carpentry, civil work, electrical changes, appliances, automation, and site condition can all influence the estimate. That is why one fixed BHK number rarely tells the whole story." },
    { type: "paragraph", text: "The home interior cost in Kondapur also changes with what you choose to include. A kitchen-and-wardrobe project is very different from a complete home involving bedrooms, living spaces, ceilings, lighting, furniture, and additional site work. The amount of customisation can change the budget even when two floor plans look similar." },

    { type: "heading", text: "Why Choose Bright Arena Interiors for Your Project?" },
    { type: "paragraph", text: "Choosing a professional interior designer in Kondapur is not just about liking one portfolio image. You also need to understand how the designer approaches your floor plan, solves practical problems, communicates decisions, specifies materials, and connects the approved design with execution." },
    { type: "paragraph", text: "Bright Arena Interiors focuses on personalised planning because two apartments with the same BHK count can have very different households. One family may need deeper kitchen storage; another may value a study area or a more flexible living room. 2D/3D capability can make those decisions clearer before related work moves forward." },

    { type: "heading", text: "Areas We Serve Around Kondapur" },
    { type: "paragraph", text: "Our local service focus includes Kondapur and nearby parts of Hyderabad's western residential and business corridor. People searching for interior designers near Kondapur may also be based around HITEC City, Gachibowli, Madhapur, Kothaguda, or Hafeezpet, depending on their property and requirements." },
    { type: "paragraph", text: "When comparing home interior designers near Kondapur or an interior design company near Kondapur, proximity is only one factor. Relevant work, communication, planning quality, material clarity, and execution scope matter too. Share your property location with Bright Arena Interiors so the project can be discussed in its actual local and site context." }
  ];

  const faqs = [
    { q: "How Much Does an Interior Designer Cost in Kondapur?", a: "The cost depends on your property, scope, and specifications. Floor area, carpentry quantities, materials, civil work, electrical changes, furniture, appliances, automation, and site condition can all influence the overall estimate. Share your floor plan for an accurate evaluation instead of relying on generic BHK figures." },
    { q: "What Does an Interior Designer Do in Kondapur?", a: "The role may include requirement gathering, space planning, furniture positioning, kitchen and wardrobe planning, material selection, lighting, ceilings, 2D drawings, 3D visualisation, and execution coordination according to the agreed scope." },
    { q: "What Is Included in a Complete Home Interior Package?", a: "It varies by project but generally covers a modular kitchen, wardrobes, living-room elements, bedroom storage, TV units, ceilings, and lighting. Civil modifications, loose furniture, appliances, and electrical work may be excluded. Always check the detailed scope and materials before proceeding." },
    { q: "How Much Does 2 BHK or 3 BHK Interior Design Cost in Kondapur?", a: "Cost cannot be answered accurately from the bedroom count alone. A 2 BHK might need basic wardrobes, while a 3 BHK might involve full execution including custom furniture, ceilings, and civil modifications. We recommend sharing your layout for a room-by-room estimate." },
    { q: "Do Interior Designers Provide 3D Designs?", a: "Yes, 3D visualisation can form part of the agreed design scope. It helps you understand cabinetry, finishes, colours, furniture relationships, and the proposed visual character before execution begins." },
    { q: "Do You Provide Turnkey Interior Design Services in Kondapur?", a: "Yes, our turnkey support connects design planning and execution within an agreed scope. The process spans from site measurement and 2D/3D development to material selection, coordination, and handover." },
    { q: "How Long Does a Home Interior Project Take?", a: "Duration depends on property size, scope, approvals, materials, customisation, site conditions, and apartment society rules. A fixed completion promise is rarely meaningful without first assessing your specific property." },
    { q: "Can I Customize My Home Interior Design?", a: "Yes. Customization can respond to your floor plan, lifestyle, storage requirements, kitchen habits, and lighting needs. We focus on custom solutions that add genuine value and practical efficiency to your daily routine." },
    { q: "Do You Provide Interior Design for Apartments and Villas in Kondapur?", a: "Yes, we handle both. Apartments often require strict control of dimensions for comfortable circulation, whereas villas offer more space but demand excellent material coordination across multiple levels. Our approach responds directly to your property's architecture." }
  ];

  return (
    <>
      <SEO
        title="Interior Designer in Kondapur, Hyderabad | Bright Arena Interiors"
        description="Looking for an interior designer in Kondapur? Bright Arena Interiors creates functional, personalised residential and office spaces based on your actual floor plan."
        keywords="interior designer in Kondapur, home interior design in Kondapur, apartment interior designer Kondapur, turnkey home interiors Kondapur"
        url="https://www.brightarenainteriors.com/interior-designer-kondapur"
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
            Interior Designer in Kondapur, Hyderabad
          </RevealHeading>

          <motion.p
            className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Looking for an interior designer in Kondapur who can make your home or workplace easier to live in, not just better to photograph? Bright Arena Interiors plans personalised interiors around your floor plan, daily routine, storage needs, design preferences, and practical priorities.
          </motion.p>
        </section>

        {/* ── PRIMARY IMAGE ── */}
        <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
          <div
            ref={primaryImgRef}
            className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
          >
            <motion.img
              src="/images/kondapur-interior-hero.jpg"
              alt="Luxury Interior Design in Kondapur Hyderabad"
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
              Homeowners often have practical questions before appointing an interior designer in Kondapur. Cost, project scope, 3D visualisation, turnkey execution, and duration can all affect the decision. The FAQs below address common search queries directly.
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