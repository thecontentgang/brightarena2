import { motion } from "framer-motion";

const trustedLogos = [
  "/logos/aparna-zenon.png",
  "/logos/asbl-spire.png",
  "/logos/auro-regent.svg",
  "/logos/avani-tulasi-vanam.png",
  "/logos/candeur-40.png",
  "/logos/dsr-park-ridge.jpg",
  "/logos/elegance-emperia.png",
  "/logos/epil-carnerstone.png",
  "/logos/gem-nakshtra.png",
  "/logos/hallmark-skyrena.png",
  "/logos/indus-peblcity.png",
  "/logos/my-home-sayuk.jpg",
  "/logos/nyla-tema4.png",
  "/logos/tripura-lm-3.jpg",
  "/logos/vaishnavi-oasis.png",
];

const row1 = [...trustedLogos, ...trustedLogos];
const row2 = [...trustedLogos].reverse();
const duplicatedRow2 = [...row2, ...row2];

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const TrustedBy = () => {
  return (
    <section className="relative w-full overflow-hidden py-24 md:py-28 bg-[#4a1c13]">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4a1c13] via-[#4a1c13] to-[#3a150e]" />
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#ffc107]/10 blur-3xl rounded-full" />

      {/* Faint blueprint grid — reads as drafting paper, not decoration for its own sake */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffc107 1px, transparent 1px), linear-gradient(to bottom, #ffc107 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* EYEBROW — corner-bracket label, like a callout on a drawing, not a SaaS pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex justify-center px-5"
        >
          <div className="relative px-6 py-2">
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#ffc107]/60" />
            <span className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#ffc107]/60" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#ffc107]/60" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#ffc107]/60" />
            <span className="text-xs font-semibold tracking-[0.3em] text-[#ffc107] uppercase">
              Trusted By Premium Clients
            </span>
          </div>
        </motion.div>

        {/* HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8 px-5"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-primary font-semibold text-white leading-tight tracking-tight">
            Spaces Designed For <br />
            <span className="text-[#ffc107] italic">Discerning Communities</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/60 text-base md:text-lg leading-relaxed">
            Collaborating with premium apartments, luxury residences,
            and modern architectural developments.
          </p>
        </motion.div>

        {/* DATUM LINE — the signature element. A drafting datum/reference line
            that draws itself in on scroll, echoing a measurement line on a floor plan. */}
        <div className="relative mt-16 mb-10 px-5 md:px-10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: smoothEase }}
            viewport={{ once: true }}
            className="h-px w-full bg-[#ffc107]/30 origin-left"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.9 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-[#ffc107]"
          />
        </div>

        {/* ROW 1 — logos sit directly on the plinth, divided by ruler-tick hairlines
            instead of boxed frosted cards */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 z-20 h-full w-24 md:w-40 bg-gradient-to-r from-[#4a1c13] via-[#4a1c13]/90 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-24 md:w-40 bg-gradient-to-l from-[#4a1c13] via-[#4a1c13]/90 to-transparent pointer-events-none" />

          {/* top rule of the plinth */}
          <div className="absolute top-0 left-0 w-full h-px bg-white/10" />

          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max"
          >
            {row1.map((logo, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[150px] md:w-[190px] h-[110px] flex flex-col items-center justify-center border-r border-white/[0.06]"
              >
                <img
                  src={logo}
                  alt="Trusted Brand"
                  className="w-[62%] h-[46%] object-contain object-center  group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* ruler tick — grows into a short brass line on hover, like marking a measurement */}
                <span className="mt-4 h-px w-3 bg-white/20 group-hover:w-8 group-hover:bg-[#ffc107] transition-all duration-500" />
              </div>
            ))}
          </motion.div>

          {/* bottom rule of the plinth */}
          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
        </div>

        {/* ROW 2 — opposite direction, same plinth treatment */}
        <div className="relative mt-2 overflow-hidden">
          <div className="absolute left-0 top-0 z-20 h-full w-24 md:w-40 bg-gradient-to-r from-[#4a1c13] via-[#4a1c13]/90 to-transparent pointer-events-none" />
          <div className="absolute right-0 top-0 z-20 h-full w-24 md:w-40 bg-gradient-to-l from-[#4a1c13] via-[#4a1c13]/90 to-transparent pointer-events-none" />

          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex w-max"
          >
            {duplicatedRow2.map((logo, index) => (
              <div
                key={index}
                className="group relative flex-shrink-0 w-[150px] md:w-[190px] h-[110px] flex flex-col items-center justify-center border-r border-white/[0.06]"
              >
                <img
                  src={logo}
                  alt="Trusted Brand"
                  className="w-[62%] h-[46%] object-contain object-center group-hover:opacity-100 transition-opacity duration-500"
                />
                <span className="mt-4 h-px w-3 bg-white/20 group-hover:w-8 group-hover:bg-[#ffc107] transition-all duration-500" />
              </div>
            ))}
          </motion.div>

          <div className="absolute bottom-0 left-0 w-full h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;