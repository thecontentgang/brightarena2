import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface BlogContentBlockProps {
  type: "paragraph" | "heading" | "quote" | "image";
  value: string;
  caption?: string;
  index?: number;
}

export default function BlogContentBlock({ type, value, caption, index = 0 }: BlogContentBlockProps) {
  switch (type) {
    case "paragraph":
      return (
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-[#4a1c13]/80 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-sans"
        >
          {value}
        </motion.p>
      );
    case "heading":
      return (
        <motion.h3
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="text-3xl md:text-4xl font-primary text-[#4a1c13] mt-16 mb-8 leading-snug"
        >
          {value}
        </motion.h3>
      );
    case "quote":
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="my-16 md:my-24 pl-6 md:pl-10 border-l-2 border-[#ff7043]"
        >
          <p className="text-2xl md:text-4xl font-primary italic text-[#4a1c13] leading-tight">
            "{value}"
          </p>
        </motion.div>
      );
    case "image":
      return (
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="my-12 md:my-16"
        >
          <div className="w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl bg-[#e8e5de]">
            <img src={value} alt={caption || "Blog image"} className="w-full h-full object-cover" />
          </div>
          {caption && (
            <figcaption className="text-center text-[#4a1c13]/50 text-sm mt-4 font-mono tracking-wide">
              {caption}
            </figcaption>
          )}
        </motion.figure>
      );
    default:
      return null;
  }
}
