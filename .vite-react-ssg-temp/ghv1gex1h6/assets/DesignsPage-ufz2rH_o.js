import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { t as designsData } from "./designsData--pD0sNUq.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/DesignsPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/DesignsPage.tsx");
var categoriesData = Array.from(new Set(designsData.map((d) => d.category))).map((cat) => {
	const designsInCategory = designsData.filter((d) => d.category === cat);
	return {
		name: cat,
		count: designsInCategory.length,
		coverImage: designsInCategory[0]?.coverImage || "",
		slug: designsInCategory[0]?.slug || cat.toLowerCase().replace(/\s+/g, "-")
	};
});
var smoothEase = [
	.22,
	1,
	.36,
	1
];
function CategoryCard({ category, index, isPriority }) {
	const spanClasses = index % 4 === 0 || index % 4 === 3 ? "md:col-span-2" : "md:col-span-1";
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
		transition: {
			duration: .7,
			ease: smoothEase,
			delay: index % 4 * .1
		},
		className: `group relative w-full h-full overflow-hidden rounded-[2rem] cursor-pointer bg-[#e8e5de] shadow-sm hover:shadow-xl transition-shadow duration-500 ${spanClasses}`,
		children: /* @__PURE__ */ jsxs(Link, {
			to: `/designs/${category.slug}`,
			className: "block w-full h-full",
			"aria-label": `View all ${category.count} concepts in the ${category.name} interior design category`,
			children: [/* @__PURE__ */ jsx("img", {
				src: category.coverImage,
				alt: `Bright Arena interior design concepts for ${category.name}`,
				decoding: "async",
				loading: isPriority ? "eager" : "lazy",
				fetchPriority: isPriority ? "high" : "auto",
				className: "w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
			}), /* @__PURE__ */ jsxs("div", {
				className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10",
				"aria-hidden": "true",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 mb-2",
						children: [/* @__PURE__ */ jsx("span", { className: "w-8 h-[1px] bg-[#ff7043]" }), /* @__PURE__ */ jsxs("p", {
							className: "text-[#ff7043] text-[10px] tracking-[0.25em] uppercase font-bold",
							children: [
								category.count,
								" Concept",
								category.count !== 1 ? "s" : ""
							]
						})]
					}), /* @__PURE__ */ jsx("h3", {
						className: "text-white font-primary text-3xl md:text-4xl leading-tight",
						children: category.name
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "absolute bottom-10 right-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 ease-out hidden md:flex",
					children: /* @__PURE__ */ jsx("svg", {
						width: "20",
						height: "20",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						children: /* @__PURE__ */ jsx("path", { d: "M5 12h14M12 5l7 7-7 7" })
					})
				})]
			})]
		})
	});
}
function DesignPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Interior Design Ideas in Hyderabad – Bright Arena Interiors",
		description: "Explore home interior designs by Bright Arena Interiors featuring modern living rooms, kitchens, bedrooms, and luxury spaces in Hyderabad.",
		url: "https://www.brightarenainteriors.com/designs"
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "pt-24 md:pt-32 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto",
				"aria-hidden": "true"
			}),
			/* @__PURE__ */ jsxs("header", {
				"aria-labelledby": "design-hero-heading",
				className: "pt-8 md:pt-12 pb-16 md:pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("h1", {
						id: "design-hero-heading",
						className: "sr-only",
						children: "Interior Design Ideas in Hyderabad"
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
							duration: .6,
							ease: smoothEase
						},
						className: "text-[#ff7043] text-xs tracking-[0.3em] uppercase font-bold mb-6",
						children: "Curated Collections"
					}),
					/* @__PURE__ */ jsxs(motion.h2, {
						initial: {
							opacity: 0,
							y: 30
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease: smoothEase,
							delay: .1
						},
						className: "text-[clamp(40px,7vw,96px)] font-primary leading-[1.05] mb-6 tracking-tight",
						children: [
							"Visualizing the ",
							/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
							/* @__PURE__ */ jsx("span", {
								className: "italic font-serif text-[#ff7043]",
								children: "future."
							})
						]
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
							duration: .8,
							ease: smoothEase,
							delay: .2
						},
						className: "max-w-2xl text-[#4a1c13]/60 text-base md:text-lg leading-relaxed",
						children: "Explore our curated library of interior styles. Choose a category below to discover tailored concepts designed to inspire your next space."
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				"aria-label": "Interior Design Categories",
				className: "px-4 md:px-12 lg:px-24 max-w-[1400px] mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					layout: true,
					className: "grid grid-cols-1 md:grid-cols-3 auto-rows-[350px] md:auto-rows-[450px] gap-4 md:gap-6 grid-flow-dense",
					children: categoriesData.map((category, i) => /* @__PURE__ */ jsx(CategoryCard, {
						category,
						index: i,
						isPriority: i < 2
					}, category.name))
				}), categoriesData.length === 0 && /* @__PURE__ */ jsxs("div", {
					className: "py-32 flex flex-col items-center justify-center text-center",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-16 h-16 mb-4 rounded-full bg-[#4a1c13]/5 flex items-center justify-center text-[#4a1c13]/20",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("svg", {
							width: "24",
							height: "24",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							children: /* @__PURE__ */ jsx("path", {
								strokeLinecap: "round",
								strokeLinejoin: "round",
								strokeWidth: "1.5",
								d: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
							})
						})
					}), /* @__PURE__ */ jsx("p", {
						className: "text-[#4a1c13]/50 text-sm tracking-wide",
						children: "No design categories found."
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { DesignPage as default };
