import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface NextPostCTAProps {
  title: string;
  slug: string;
}

export default function NextPostCTA({ title, slug }: NextPostCTAProps) {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto mt-24 border-t border-[#4a1c13]/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: EASE }}
        viewport={{ once: true }}
        className="flex flex-col items-center text-center"
      >
        <p className="text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6">
          Read Next
        </p>
        <h3 className="text-[#4a1c13] text-3xl md:text-5xl lg:text-6xl font-primary leading-tight tracking-tight max-w-3xl mb-12 hover:text-[#ff7043] transition-colors duration-500">
          <Link to={`/blogs/${slug}`}>
            {title}
          </Link>
        </h3>

        <Link
          to={`/blogs/${slug}`}
          className="group flex items-center gap-4 bg-[#4a1c13] text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors duration-500"
        >
          Continue Reading
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-white group-hover:text-[#ff7043]">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
