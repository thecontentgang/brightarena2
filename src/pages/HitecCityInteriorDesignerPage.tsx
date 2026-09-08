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

export default function HitecCityInteriorDesignerPage() {
  const primaryImgRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: imgScroll } = useScroll({
    target: primaryImgRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);

  // The parsed SEO content structured for elegant rendering
  const pageContent = [
    { type: "paragraph", text: "A home near Hyderabad’s IT corridor may need compact storage, a comfortable work-from-home corner, or a kitchen planned for busy mornings. An office has different priorities. Our approach to home interior design in Hitech City begins with the floor plan, your requirements, and the way each room will actually be used." },
    { type: "paragraph", text: "Whether you own an apartment, villa, or commercial property, you can start by sharing your layout and discussing the required scope. From an interior design consultation in Hitech City to 2D/3D planning and coordinated execution, the process is shaped around your property rather than a fixed template. Book a Design Consultation | Request a Site Visit | Discuss Your Floor Plan on WhatsApp." },
    
    { type: "heading", text: "Designed for the Way HITEC City Lives and Works" },
    { type: "paragraph", text: "HITEC City has a distinct rhythm. Long workdays, hybrid schedules, apartment living, and technology-heavy routines influence what people expect from their homes. An interior designer in Hitech City therefore needs to think beyond appearance and consider how the space behaves on an ordinary weekday." },
    { type: "paragraph", text: "Homes around Madhapur, Kondapur, and Gachibowli may need a workstation without sacrificing a bedroom, storage without making rooms feel crowded, or charging points placed where they are genuinely useful. High-rise layouts also make furniture dimensions, circulation, kitchen organisation, and natural light important parts of early planning." },
    { type: "paragraph", text: "Good interior design services in Hitech City bring these small but meaningful details together. Smart electrical planning can reduce visible wires, layered lighting can support different activities, and purpose-built storage can make everyday routines easier. For busy homeowners, thoughtful decisions made early can also reduce avoidable changes once execution begins." },
    
    { type: "heading", text: "Home, Apartment, and Office Interior Design Services" },
    { type: "paragraph", text: "Every property brings a different design problem to the table. A home interior designer in Hitech City may be planning storage for a growing family, while an office designer could be working around employee movement and meetings. The service should match the property rather than forcing every client into one format." },
    { type: "paragraph", text: "For residential projects, a residential interior designer in Hitech City can plan kitchens, wardrobes, bedrooms, living areas, storage, lighting, and other agreed elements. An apartment interior designer in Hitech City often focuses heavily on space efficiency, whereas a villa interior designer in Hitech City may coordinate larger rooms and multiple functional zones." },
    { type: "paragraph", text: "Workplace planning considers another set of needs: workstations, collaboration, meeting areas, circulation, storage, lighting, and technology. Clients can also use 3D interior design in Hitech City to understand proposed ideas more clearly." },
    
    { type: "heading", text: "Residential, Apartment, and Villa Interiors" },
    { type: "paragraph", text: "A residential interior should feel connected to the people living in it. Instead of starting with a catalogue, planning can begin with everyday habits: cooking, working, entertaining, relaxing, storing clothes, or managing children's belongings. Those details help establish what each room really needs." },
    { type: "paragraph", text: "For apartment interior design in Hitech City, careful measurements can help prevent furniture or storage from overwhelming available space. Villa projects offer more room but also introduce more decisions. A premium interior designer in Hitech City should use that freedom thoughtfully rather than simply adding decorative features because space is available." },
    { type: "paragraph", text: "Clients searching for a luxury interior designer in Hitech City may also benefit from looking beyond surface finishes. A refined interior can come from proportion, material coordination, useful storage, comfortable lighting, and restrained detailing. Good residential design feels considered when you live with it, not only when you first see it." },
    
    { type: "heading", text: "Office, 2D/3D Design and Consultation" },
    { type: "paragraph", text: "Office interiors need to support work before they support photographs. Seating capacity, movement, meeting requirements, storage, lighting, electrical points, and technology can influence the layout. The design also needs enough flexibility to make the workplace comfortable for people using it throughout the day." },
    { type: "paragraph", text: "Visual planning can make these decisions easier to discuss. 3D home interior design in Hitech City helps homeowners see how finishes, furniture, cabinetry, colours, and spatial relationships may come together. 2D layouts provide a more technical view of dimensions, furniture positions, circulation, and other planning details." },
    { type: "paragraph", text: "An early home interior consultation in Hitech City is also useful when the scope is not yet clear. Bring the floor plan, explain your priorities, and discuss what you want to change. This gives the designer useful context before materials or visual styles take over the conversation and helps establish a practical starting point." },
    
    { type: "heading", text: "Home Interiors Planned Around Your Property and Lifestyle" },
    { type: "paragraph", text: "A home can look polished and still be inconvenient. Useful home interiors in Hitech City start with the people who will occupy the property. Storage habits, family size, cooking routines, work schedules, furniture preferences, and room dimensions can all change what makes sense for the same floor plan." },
    { type: "paragraph", text: "A 2 BHK interior design in Hitech City often benefits from compact storage and multifunctional planning. 3 BHK interior design in Hitech City may provide room for a guest bedroom, children's space, or study. With 4 BHK interior design in Hitech City, maintaining a consistent design language across larger common and private areas becomes equally important." },
    { type: "paragraph", text: "Depending on the brief, homeowners may require complete home interiors in Hitech City, full home interior design in Hitech City, or turnkey home interiors in Hitech City. Others may prefer custom home interiors in Hitech City for selected rooms. Bright Arena Interiors can use the floor plan and requirements to establish which approach fits the property." },

    { type: "heading", text: "Planning 2 BHK, 3 BHK, and 4 BHK Homes" },
    { type: "paragraph", text: "In a 2 BHK, every large piece of furniture can affect circulation. 2 BHK home interiors in Hitech City therefore benefit from asking whether a storage unit, workstation, or display feature genuinely earns the space it occupies. A visually lighter room can often feel more comfortable than one filled with cabinetry." },
    { type: "paragraph", text: "With 3 BHK home interiors in Hitech City, there is usually greater flexibility in assigning room functions. One bedroom may serve parents, children, guests, or hybrid work. Planning those roles early can guide wardrobe capacity, study furniture, electrical points, lighting, and the level of privacy each room requires." },
    { type: "paragraph", text: "4 BHK home interiors in Hitech City can involve more extensive storage, larger living areas, and several individual bedroom requirements. Whether the preferred direction is modern home interior design in Hitech City or premium home interiors in Hitech City, consistency should not mean making every room identical. Each space can have character while still belonging to the same home." },

    { type: "heading", text: "Key Interior Design Elements for a Complete Home" },
    { type: "paragraph", text: "The most successful homes rarely depend on one dramatic feature. They work because kitchens, wardrobes, bedrooms, lighting, storage, and living spaces support one another. A capable interior designer in Hitech City considers these relationships before individual elements are finalised." },
    { type: "paragraph", text: "A kitchen affects movement and storage; a wardrobe changes usable bedroom space; a television wall influences seating; and a ceiling affects how lighting is distributed. When these decisions are made separately, small conflicts can appear later. Coordinated planning helps dimensions, finishes, functions, and visual details make sense together." },

    { type: "heading", text: "Modular Kitchen and Wardrobe Design" },
    { type: "paragraph", text: "A practical modular kitchen design in Hitech City begins with cooking habits rather than cabinet colours. Appliance positions, countertop space, frequently used ingredients, utensils, waste handling, and movement between key work areas can all influence how cabinets and drawers should be organised." },
    { type: "paragraph", text: "A modular kitchen in Hitech City may include base units, overhead storage, drawers, tall units, or corner solutions according to available space. The same thinking applies to wardrobe design in Hitech City. Hanging sections, drawers, shelves, loft storage, and internal accessories should reflect what the user needs to store." },

    { type: "heading", text: "Living Room, Bedroom, Ceiling, and Lighting" },
    { type: "paragraph", text: "Living room interior design in Hitech City needs to balance conversation, television viewing, circulation, storage, and occasional guests. Furniture proportions matter because an oversized sofa or deep storage unit can quickly change how spacious the room feels, particularly in an apartment." },
    { type: "paragraph", text: "For bedroom interior design in Hitech City, the priorities shift toward comfort, privacy, wardrobe access, and softer lighting. Master bedroom interior design in Hitech City may additionally involve dressing storage or a workstation." },
    { type: "paragraph", text: "A well-considered false ceiling design in Hitech City can support lighting and help define areas, but it should serve a purpose. Likewise, home lighting design in Hitech City works best when ambient, task, and accent lighting are planned according to room use." },

    { type: "heading", text: "From Concept to Handover: Our Interior Execution Process" },
    { type: "paragraph", text: "Good design needs a workable path from conversation to site. Turnkey interior design in Hitech City can involve several connected stages, and each one influences what happens next. Clear measurements, drawings, approvals, materials, and scope help turn an attractive idea into something that can actually be executed." },
    { type: "paragraph", text: "The process begins with consultation and requirement gathering, followed by site measurement. Interior design planning in Hitech City then develops the layout around room functions, furniture, movement, and storage. Relevant 2D drawings and 3D views help clients understand proposed decisions before materials and quotation details are approved." },
    
    { type: "heading", text: "What Shapes Interior Design Cost in HITEC City?" },
    { type: "paragraph", text: "The interior design cost in Hitech City cannot be calculated responsibly from the number of bedrooms alone. Property size, design scope, materials, custom carpentry, civil changes, electrical work, appliances, automation, and existing site conditions can all influence the overall requirement." },
    { type: "paragraph", text: "When reviewing interior designers' costs in Hitech City, compare scope and specifications alongside price. Ask what materials, hardware, quantities, rooms, services, and exclusions are covered. This creates a more useful comparison and helps prevent an apparently inexpensive proposal from becoming difficult to evaluate because essential details were never clearly defined." },

    { type: "heading", text: "Areas We Serve Around HITEC City" },
    { type: "paragraph", text: "Our service focus includes HITEC City and nearby parts of western Hyderabad, including Madhapur, Kondapur, Gachibowli, Financial District, and Nanakramguda. People searching for interior designers near Hitech City may therefore be comparing options across the same wider residential and commercial corridor." },
    { type: "paragraph", text: "If you are comparing home interior designers near Hitech City or an interior design company near Hitech City, proximity should be considered alongside project fit. Look at relevant work, planning, communication, material specifications, and execution scope. Share your property location with Bright Arena Interiors to discuss the project in its actual local context." }
  ];

  const faqs = [
    { q: "How Much Does an Interior Designer Cost in HITEC City?", a: "The answer to how much an interior designer costs in Hitech City depends on your property and scope. There is no reliable universal rate because area, materials, carpentry quantities, civil work, electrical changes, furniture, appliances, automation, and site conditions can all influence the estimate. Share the floor plan and define what should be included to get a useful estimate." },
    { q: "What Does an Interior Designer Do in HITEC City?", a: "The role can include understanding requirements, planning layouts, organising furniture and storage, selecting materials, developing kitchens and wardrobes, coordinating lighting, and creating 2D or 3D design information according to the project scope. Depending on the agreed service, it may extend into execution coordination." },
    { q: "What Is Included in a Complete Home Interior Package?", a: "A scope may include a modular kitchen, wardrobes, living room features, bedroom elements, storage, TV units, ceilings, lighting, and other agreed interior work. Civil work, loose furniture, and appliances may be included or excluded. Before approving a package, read the scope instead of relying on its name." },
    { q: "Do Interior Designers Provide 3D Designs?", a: "Yes, 3D visualisation can be part of an interior design scope. It helps clients understand how proposed cabinetry, furniture, colours, finishes, and other visible elements may relate before corresponding work reaches execution." },
    { q: "Can I Customize My Home Interior Design?", a: "Yes, customisation can be developed around your layout, lifestyle, storage needs, visual preferences, and agreed project scope. Useful design balances personal preferences with dimensions, practicality, materials, and budget." },
    { q: "How Long Does a Home Interior Project Take?", a: "The duration depends on property size, project scope, design approvals, material choices, customisation, site conditions, and the amount of execution involved. Discuss the schedule after the scope and design requirements are understood." }
  ];

  return (
    <>
      <SEO
  title="Interior Designer in HITEC City, Hyderabad | Bright Arena Interiors"
  description="Finding the right interior designer in Hitech City is about making your property work better. Discover personalised residential and office spaces with Bright Arena."
  keywords="interior designer in Hitech City, 2 BHK interior design in Hitech City, 3 BHK interior design, apartment interior designer Hitech City, turnkey home interiors"
  url="https://www.brightarenainteriors.com/interior-designer-hitec-city"
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
            Interior Designer in HITEC City, Hyderabad
          </RevealHeading>

          <motion.p
            className="mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
          >
            Finding the right interior designer in Hitech City is about making your property work better for the way you live or run your business. Bright Arena Interiors plans personalised residential and office spaces with practical layouts, thoughtful design choices, and clear visual planning.
          </motion.p>
        </section>

        {/* ── PRIMARY IMAGE ── */}
        <section className="w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32">
          <div
            ref={primaryImgRef}
            className="relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm"
          >
            {/* Replace standard static image path with your actual hero image */}
            <motion.img
              src="/images/hitec-city-interior-hero.jpg"
              alt="Luxury Interior Design in Hitech City Hyderabad"
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
            <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff7043] block mb-6 sm:mb-8">
              Frequently Asked Questions
            </span>
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

        {/* ── FULL-WIDTH HORIZONTAL AD / BANNER ── */}
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
                  <span>+91 123 456 7890</span> {/* Replace with actual number */}
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