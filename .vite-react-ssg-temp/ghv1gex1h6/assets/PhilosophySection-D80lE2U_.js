import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { jsx, jsxs } from "react/jsx-runtime";
//#region src/sections/PhilosophySection.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/PhilosophySection.tsx");
var text = "We create thoughtfully designed spaces where simplicity meets intention. Through the perfect balance of form, function, and style, we craft interiors that feel truly yours";
var PhilosophySection = () => {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start center", "end center"]
	});
	const words = text.split(" ");
	return /* @__PURE__ */ jsx("section", {
		ref: containerRef,
		className: "relative w-full h-[120vh] bg-[#f7f4ee] antialiased",
		children: /* @__PURE__ */ jsx("div", {
			className: "sticky top-0 w-full h-screen flex flex-col items-center justify-center px-6 md:px-12",
			children: /* @__PURE__ */ jsx("p", {
				className: "w-full max-w-[900px] text-[#4a1c13] font-primary text-[clamp(32px,5vw,64px)] leading-[1.2] tracking-tight flex flex-wrap justify-center text-center",
				children: words.map((word, i) => {
					const start = i / words.length;
					const end = start + 1 / words.length;
					return /* @__PURE__ */ jsx(Word, {
						progress: scrollYProgress,
						range: [start, end],
						children: word
					}, i);
				})
			})
		})
	});
};
var Word = ({ children, progress, range }) => {
	const opacity = useTransform(progress, range, [.15, 1]);
	return /* @__PURE__ */ jsxs("span", {
		className: "relative mx-[1vw] md:mx-[0.6vw] mt-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "absolute opacity-15",
			children
		}), /* @__PURE__ */ jsx(motion.span, {
			style: { opacity },
			children
		})]
	});
};
//#endregion
export { PhilosophySection as default };
