import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { t as projectsData } from "./ProjectsData-Bd_2ISED.js";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/ProjectsPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ProjectsPage.tsx");
var smoothEase = [
	.22,
	1,
	.36,
	1
];
function ProjectCard({ project, index }) {
	const isPriority = index < 2;
	return /* @__PURE__ */ jsx(motion.div, {
		layout: true,
		initial: {
			opacity: 0,
			y: 40
		},
		whileInView: {
			opacity: 1,
			y: 0
		},
		viewport: {
			once: true,
			margin: "-50px"
		},
		exit: {
			opacity: 0,
			scale: .95
		},
		transition: {
			duration: .7,
			ease: smoothEase,
			delay: index % 2 * .15
		},
		className: "group relative overflow-hidden rounded-3xl cursor-pointer bg-[#e8e5de] shadow-sm hover:shadow-2xl transition-all duration-700 aspect-[4/3]",
		children: /* @__PURE__ */ jsxs(Link, {
			to: `/portfolio/${project.slug}`,
			className: "block w-full h-full",
			"aria-label": `View details for ${project.title}`,
			children: [/* @__PURE__ */ jsx("img", {
				src: project.heroImage,
				alt: project.title,
				decoding: "async",
				loading: isPriority ? "eager" : "lazy",
				className: "w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
			}), /* @__PURE__ */ jsx("div", {
				className: "absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10",
				"aria-hidden": "true",
				children: /* @__PURE__ */ jsxs("div", {
					className: "transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "text-white font-primary text-2xl md:text-3xl leading-snug mb-3",
						children: project.title
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[#ff7043] text-xs tracking-[0.2em] uppercase font-bold",
						children: project.shortDescription
					})]
				})
			})]
		})
	});
}
function PortfolioPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Bright Arena Interiors Portfolio and Interior Design Projects",
		description: "Explore the Bright Arena Interiors portfolio showcasing completed home, villa, apartment, and office interior projects across Hyderabad with 14+ years of expertise.",
		url: "https://www.brightarenainteriors.com/portfolio"
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24 pt-32",
		children: [/* @__PURE__ */ jsxs("header", {
			className: "px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center mb-16 md:mb-24",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "sr-only",
					children: "Interior Design Portfolio & Completed Projects in Hyderabad"
				}),
				/* @__PURE__ */ jsx(motion.p, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						ease: smoothEase
					},
					className: "text-[#ff7043] text-xs tracking-[0.3em] uppercase font-bold mb-6 pt-6",
					children: "Selected Works"
				}),
				/* @__PURE__ */ jsxs(motion.h2, {
					initial: {
						opacity: 0,
						y: 20
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						delay: .1,
						ease: smoothEase
					},
					className: "text-[clamp(40px,7vw,96px)] font-primary leading-[1] mb-8 tracking-tight",
					children: [
						"Designing spaces with ",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("span", {
							className: "italic font-serif text-[#ff7043]",
							children: "purpose."
						})
					]
				})
			]
		}), /* @__PURE__ */ jsx("section", {
			className: "px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto",
			children: /* @__PURE__ */ jsx(motion.div, {
				layout: true,
				className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10",
				children: /* @__PURE__ */ jsx(AnimatePresence, {
					mode: "popLayout",
					children: projectsData.map((project, i) => /* @__PURE__ */ jsx(ProjectCard, {
						project,
						index: i
					}, project.id))
				})
			})
		})]
	})] });
}
//#endregion
export { PortfolioPage as default };
