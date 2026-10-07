import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/NotFoundPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/NotFoundPage.tsx");
function NotFoundPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Page Not Found - Bright Arena Interiors",
		description: "The page you are looking for does not exist.",
		url: "https://www.brightarenainteriors.com/404"
	}), /* @__PURE__ */ jsx("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] min-h-[80vh] flex items-center justify-center antialiased px-6 md:px-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-2xl text-center flex flex-col items-center",
			children: [
				/* @__PURE__ */ jsx(motion.h1, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: { duration: .5 },
					className: "text-[clamp(60px,10vw,120px)] font-primary font-bold leading-none text-[#ff7043] mb-4",
					children: "404"
				}),
				/* @__PURE__ */ jsx(motion.h2, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: .1
					},
					className: "text-2xl md:text-4xl font-primary mb-6",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ jsx(motion.p, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: .2
					},
					className: "text-sm md:text-base text-[#4a1c13]/70 mb-10 max-w-md mx-auto leading-relaxed",
					children: "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
				}),
				/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .5,
						delay: .3
					},
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#4a1c13] text-white text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#ff7043]",
						children: "Back to Home"
					})
				})
			]
		})
	})] });
}
//#endregion
export { NotFoundPage as default };
