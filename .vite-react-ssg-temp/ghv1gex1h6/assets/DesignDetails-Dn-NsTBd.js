import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { t as designsData } from "./designsData--pD0sNUq.js";
import NotFoundPage from "./NotFoundPage-Drbycidu.js";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/DesignDetails.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/DesignDetails.tsx");
var EASE = [
	.25,
	1,
	.5,
	1
];
function DesignDetailsPage() {
	const { slug } = useParams();
	const navigate = useNavigate();
	const targetDesign = designsData.find((d) => d.slug === slug || d.oldSlug === slug);
	const categoryDesigns = targetDesign ? designsData.filter((d) => d.category === targetDesign.category) : [];
	const isOldSlug = targetDesign?.oldSlug === slug && targetDesign?.slug !== slug;
	useEffect(() => {
		if (!slug) return;
		if (targetDesign && isOldSlug) navigate(`/designs/${targetDesign.slug}`, { replace: true });
	}, [
		slug,
		targetDesign,
		navigate,
		isOldSlug
	]);
	if (!targetDesign) return /* @__PURE__ */ jsx(NotFoundPage, {});
	if (isOldSlug) return null;
	const categoryName = targetDesign.category || "Gallery";
	const pageTitle = targetDesign.seo?.metaTitle || `${categoryName} Interior Design Concepts | Bright Arena`;
	const pageDescription = targetDesign.seo?.description || targetDesign.description || `Explore our luxury ${categoryName} interior design concepts and transformations by Bright Arena.`;
	const pageKeywords = targetDesign.seo?.keywords;
	const pageH1 = targetDesign.seo?.h1 || `${categoryName} Interior Design in Hyderabad`;
	const galleryItems = categoryDesigns.flatMap((design) => design.images.map((imgSrc, imgIndex) => ({
		id: `${design.id}-${imgIndex}`,
		src: imgSrc,
		title: design.title,
		description: design.description
	})));
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: pageTitle,
		description: pageDescription,
		keywords: pageKeywords,
		url: `https://www.brightarenainteriors.com/designs/${targetDesign.slug}`
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] w-full overflow-hidden antialiased font-sans selection:bg-[#ff7043] selection:text-white pb-24",
		children: [
			/* @__PURE__ */ jsx("div", { className: "pt-24 md:pt-32 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto" }),
			/* @__PURE__ */ jsx("section", {
				className: "pt-4 md:pt-8 pb-12 md:pb-16 relative",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 text-center",
					children: [/* @__PURE__ */ jsx("h1", {
						className: "sr-only",
						children: pageH1
					}), /* @__PURE__ */ jsxs("h2", {
						className: "text-[clamp(40px,7vw,96px)] leading-[1.05] tracking-tight font-primary capitalize",
						children: [
							categoryName,
							" ",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "italic text-[#ff7043]",
								children: "Concepts."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "px-4 md:px-12 lg:px-20 max-w-[1600px] mx-auto",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10",
					children: galleryItems.map((item, index) => {
						return /* @__PURE__ */ jsxs(motion.div, {
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
								delay: index % 2 * .15,
								ease: EASE
							},
							className: "group relative w-full h-full overflow-hidden rounded-[2rem] bg-[#e8e5de] shadow-sm hover:shadow-xl transition-all duration-500 aspect-[4/3]",
							children: [item.src ? /* @__PURE__ */ jsx("img", {
								src: item.src,
								alt: item.title,
								className: "w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105",
								loading: "lazy"
							}) : /* @__PURE__ */ jsx("div", {
								className: "w-full h-full bg-[#d1cdc7] animate-pulse flex items-center justify-center text-[#a8a49e]",
								children: "No Image"
							}), /* @__PURE__ */ jsxs("div", {
								className: "absolute inset-0 bg-gradient-to-t from-[#4a1c13]/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 md:p-10",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-white font-primary text-2xl md:text-3xl leading-snug mb-3",
									children: item.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-white/80 text-sm md:text-base line-clamp-2 leading-relaxed",
									children: item.description
								})]
							})]
						}, item.id);
					})
				})
			})
		]
	})] });
}
//#endregion
export { DesignDetailsPage as default };
