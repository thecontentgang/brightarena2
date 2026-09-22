import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface BlogHeroImageProps {
  coverImage: string;
  title: string;
}

export default function BlogHeroImage({ coverImage, title }: BlogHeroImageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);

  return (
    <section className="px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24">
      <div ref={heroRef} className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de]">
        <motion.div className="w-full h-full" style={{ y: heroImgY, scale: 1.05 }}>
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-[#4a1c13]/5" />
      </div>
    </section>
  );
}
