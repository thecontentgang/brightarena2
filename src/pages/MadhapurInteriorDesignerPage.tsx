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

export default function MadhapurInteriorDesignerPage() {
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  // The parsed SEO content structured for elegant rendering
  const pageContent = [
    { type: "paragraph", text: "Madhapur homes often sit close to busy workplaces, so interiors may need to support family life and work-from-home routines at the same time. Our home interior design in Madhapur approach considers movement, storage, lighting, furniture, technology, and visual character before individual elements are finalised." },
    { type: "paragraph", text: "Whether you need a home interior designer in Madhapur for a new apartment or design support for a villa or office, start with your actual layout. An interior design consultation in Madhapur can help define the scope before execution decisions begin. Book a Design Consultation, Request a Site Visit, or Discuss Your Floor Plan on WhatsApp." },
    
    { type: "heading", text: "Designed for the Way Madhapur Lives and Works" },
    { type: "paragraph", text: "Life in Madhapur often moves between home, office, and hybrid work. Apartments need to stay comfortable while handling storage, devices, guests, and work corners. An interior designer in Madhapur should plan for these routines instead of designing only for appearance." },
    { type: "paragraph", text: "Gated-community layouts can bring their own challenges: compact passages, utility-balcony kitchens, fixed service points, and rooms that need more than one purpose. Families may need a study tucked into a bedroom, extra wardrobe space, or kitchen storage that uses available height without making the room feel cramped." },
    { type: "paragraph", text: "Renovation also needs practical coordination. Society permissions, material movement, service-lift access, and existing electrical or plumbing points can affect how work is planned. Useful interior design services in Madhapur connect design decisions with site realities, especially for homes around the HITEC City corridor where convenience and execution clarity matter." },
    
    { type: "heading", text: "Home, Apartment, and Office Interior Design Services" },
    { type: "paragraph", text: "A home, villa, and workplace cannot be designed from the same checklist. A residential interior designer in Madhapur starts with household routines, while office planning focuses more on movement, workstations, meetings, lighting, storage, and technology." },
    { type: "paragraph", text: "An apartment interior designer in Madhapur may need to make a limited floor area work harder through careful furniture and storage planning. A villa interior designer in Madhapur can address larger rooms and multiple functional zones. A professional interior designer in Madhapur should explain why each recommendation suits the property rather than simply following a trend." },
    { type: "paragraph", text: "For workplaces, planning can cover work areas, meeting spaces, circulation, storage, electrical needs, and visual identity. 3D interior design in Madhapur can help clients understand proposed rooms before related execution begins." },
    
    { type: "heading", text: "Home Interiors Planned Around Your Property and Lifestyle" },
    { type: "paragraph", text: "Useful home interiors in Madhapur begin with ordinary questions. Where do bags land when you enter? Who cooks most often? Does someone work from a bedroom? These details help an interior designer in Madhapur shape rooms around real habits instead of showroom assumptions." },
    { type: "paragraph", text: "A 2 BHK interior design in Madhapur often calls for compact storage and flexible furniture. 3 BHK interior design in Madhapur may provide room for a study, guest bedroom, or children's space, while 4 BHK interior design in Madhapur needs stronger coordination across larger living areas and several private rooms." },
    { type: "paragraph", text: "The scope may include complete home interiors in Madhapur, full home interior design in Madhapur, or custom home interiors in Madhapur. Some homeowners prefer modern home interior design in Madhapur, while others explore premium home interiors in Madhapur or luxury home interiors in Madhapur. Share your floor plan first, so the brief reflects the property." },

    { type: "heading", text: "2 BHK, 3 BHK, and 4 BHK Interior Planning" },
    { type: "paragraph", text: "With 2 BHK home interiors in Madhapur, every large unit earns its place. Deep wardrobes, bulky TV walls, or oversized furniture can quickly narrow movement. Smart planning focuses on useful storage while preserving breathing room in bedrooms and shared spaces." },
    { type: "paragraph", text: "3 BHK home interiors in Madhapur offer greater flexibility, but the extra room still needs a clear purpose. If it doubles as a guest room and workspace, furniture, lighting, storage, and electrical points should support both roles. Apartment interior design in Madhapur works better when such decisions are made before carpentry begins." },
    { type: "paragraph", text: "For 4 BHK home interiors in Madhapur, coordination becomes as important as space efficiency. Bedrooms can reflect individual preferences, yet materials, colours, lighting, and common areas should still feel connected. Turnkey home interiors in Madhapur can bring these decisions into one agreed scope when the homeowner wants design and execution planned together." },

    { type: "heading", text: "Key Interior Design Elements for a Complete Home" },
    { type: "paragraph", text: "A kitchen that works well can change the morning rush; a poorly placed wardrobe can make a bedroom awkward every day. Good custom interior design in Madhapur looks at these everyday interactions so that individual elements support the room rather than compete for space." },
    { type: "paragraph", text: "A modular kitchen design in Madhapur should consider cooking habits, worktop space, appliances, and storage. A modular kitchen in Madhapur can combine drawers, overhead cabinets, tall units, and accessible corners. Wardrobe design in Madhapur and a custom wardrobe in Madhapur should similarly begin with what actually needs to fit inside." },
    { type: "paragraph", text: "The same thinking guides living room interior design in Madhapur, bedroom interior design in Madhapur, and master bedroom interior design in Madhapur. A practical TV unit design in Madhapur can organise media neatly, while false ceiling design in Madhapur and home lighting design in Madhapur should support useful illumination instead of adding detail without purpose." },

    { type: "heading", text: "From Concept to Handover: Our Interior Execution Process" },
    { type: "paragraph", text: "Good drawings are only useful when they can be translated clearly on site. Turnkey interior design in Madhapur therefore needs a defined path from the first conversation to measurement, planning, visualisation, approvals, execution, review, and handover." },
    { type: "paragraph", text: "The process starts by understanding the brief and measuring the property. Interior design planning in Madhapur then considers furniture, circulation, storage, and room use. Relevant 2D layouts and 3D views help clarify ideas before materials, specifications, project scope, and quotation details move into approval." },
    { type: "paragraph", text: "After approval, home interior execution in Madhapur moves the agreed design toward site implementation. This can support complete interior design and execution in Madhapur, end-to-end interior design in Madhapur, and interior project management in Madhapur. The actual sequence and duration should always reflect the property's scope and site conditions." },
    
    { type: "heading", text: "Turnkey and Custom Interior Design for Madhapur Homes" },
    { type: "paragraph", text: "A turnkey interior designer in Madhapur can be useful when homeowners want design and execution handled through a connected process. The important part is clarity: rooms, materials, responsibilities, approvals, quantities, and exclusions should be understood before site work advances." },
    { type: "paragraph", text: "A custom interior designer in Madhapur takes a different question seriously: what does this particular household need? Perhaps the utility balcony needs better coordination with the kitchen, a bedroom requires a discreet workstation, or storage must accommodate luggage, children's belongings, and everyday items without covering every wall." },
    { type: "paragraph", text: "Bright Arena Interiors approaches turnkey home interiors in Madhapur by connecting functional planning with the agreed visual direction and execution scope. Customisation is used where it solves a real problem rather than simply making the design more complicated." },

    { type: "heading", text: "What Shapes Interior Design Cost in Madhapur?" },
    { type: "paragraph", text: "The interior design cost in Madhapur depends on scope, property size, materials, carpentry, civil work, electrical changes, appliances, automation, and site condition. Bedroom count helps describe a home, but it cannot explain everything included in an interior estimate." },
    { type: "paragraph", text: "The home interior cost in Madhapur can change significantly depending on whether you need a kitchen and wardrobes or an entire home. The same applies when comparing interior designers' costs in Madhapur: two quotations may look similar at first but include different materials, hardware, quantities, services, or exclusions." },

    { type: "heading", text: "Why Choose Bright Arena Interiors for Your Project?" },
    { type: "paragraph", text: "People searching for an interior designer in Madhapur have plenty of portfolios to browse. The more useful comparison is how a designer understands your layout, explains trade-offs, plans functionality, visualises ideas, and connects approved decisions with execution." },
    { type: "paragraph", text: "Bright Arena Interiors focuses on personalised planning rather than assuming two similar apartments need the same interior. A family may prioritise kitchen storage; a hybrid worker may value a quiet desk; another homeowner may want fewer cabinets and more visual openness. 2D/3D planning can make these choices easier to discuss." },

    { type: "heading", text: "Areas We Serve Around Madhapur" },
    { type: "paragraph", text: "People searching for interior designers near Madhapur may live within Madhapur itself or in the surrounding western Hyderabad corridor. Nearby residential and business areas include HITEC City, Kondapur, Gachibowli, Jubilee Hills, and Kavuri Hills." },
    { type: "paragraph", text: "When comparing home interior designers near Madhapur or an interior design company near Madhapur, location is useful, but project fit matters too. Review relevant work, planning, materials, communication, and execution scope. Bright Arena Interiors can begin the discussion with your property location and floor plan, so recommendations stay tied to the actual site." }
  ];

  const faqs = [
    { q: "How Much Does an Interior Designer Cost in Madhapur?", a: "There is no single reliable figure based just on BHK. Property area, rooms included, carpentry quantities, material choices, electrical/civil changes, and site conditions all affect the estimate. Share your floor plan and list the work you need before comparing quotations to ensure an accurate, customized scope." },
    { q: "What Does an Interior Designer Do in Madhapur?", a: "The role includes understanding your requirements, planning room layouts, organising furniture and storage, selecting materials, coordinating lighting, and preparing relevant 2D/3D designs. Depending on the agreed service, it may also extend into full execution coordination." },
    { q: "What Is Included in a Complete Home Interior Package?", a: "A project may cover modular kitchens, wardrobes, living-room features, ceilings, and lighting. However, civil work, loose furniture, appliances, and electrical modifications may or may not be included. Always check the detailed scope and exclusions before approving." },
    { q: "How Much Does a 2 BHK or 3 BHK Interior Design Cost in Madhapur?", a: "It depends heavily on carpet area, customisation, and function. A 2 BHK might need basic storage, while a 3 BHK might include an office space requiring different furniture and electrical planning. A BHK label alone isn't enough; sharing your layout provides a dependable foundation." },
    { q: "Do Interior Designers Provide 3D Designs?", a: "Yes, 3D visualisation can form part of an agreed interior design scope. It helps you understand proposed cabinetry, colours, finishes, and furniture relationships before physical execution begins." },
    { q: "Do You Provide Turnkey Interior Design Services in Madhapur?", a: "Yes, turnkey support connects planning and execution. The process spans consultation, site measurement, layouts, visualisation, material decisions, execution coordination, review, and handover." },
    { q: "How Long Does a Home Interior Project Take?", a: "Duration depends on property size, scope, approvals, custom work, and society rules regarding renovation permissions and service access. Ask about the expected programme after defining your exact project scope." },
    { q: "Can I Customize My Home Interior Design?", a: "Yes. The design can be adapted around your floor plan, storage requirements, cooking habits, and work routine. We focus on tailoring solutions where they genuinely improve comfort, storage, or movement." },
    { q: "Do You Provide Interior Design for Apartments and Villas in Madhapur?", a: "Yes. Apartments often need tighter control of furniture scale to preserve movement, while villas require careful coordination across multiple levels and larger rooms. We plan specifically around your property's distinct architecture." }
  ];

  return (
    <>
      <SEO
        title="Interior Designer in Madhapur, Hyderabad | Bright Arena Interiors"
        description="Looking for an interior designer in Madhapur? Bright Arena Interiors plans personalised home and office spaces around your routines, storage needs, and layout."
        keywords="interior designer in Madhapur, home interior design in Madhapur, apartment interior designer Madhapur, turnkey home interiors Madhapur"
        url="https://www.brightarenainteriors.com/interior-designer-madhapur"
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
            Interior Designer in Madhapur, Hyderabad
          </RevealHeading>

          <motion.p
            className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Choosing an interior designer in Madhapur starts with understanding how you want the space to feel and function. Bright Arena Interiors plans personalised home and office interiors around your floor plan, routine, storage needs, and design preferences.
          </motion.p>
        </section>

        {/* ── PRIMARY IMAGE ── */}
        <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
          <div
            ref={primaryImgRef}
            className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
          >
            <motion.img
              src="/images/madhapur-interior-hero.jpg"
              alt="Luxury Interior Design in Madhapur Hyderabad"
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
              Homeowners usually want clear answers before speaking with interior designers in Madhapur. Cost, package inclusions, 3D visualisation, turnkey execution, project duration, and customisation can all influence the decision. The answers below focus on practical buying questions.
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