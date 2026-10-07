import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import NotFoundPage from "./NotFoundPage-Drbycidu.js";
import { t as projectsData } from "./ProjectsData-Bd_2ISED.js";
import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/ProjectDetails.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ProjectDetails.tsx");
var EASE = [
	.25,
	1,
	.5,
	1
];
function RevealHeading({ children, className, delay = 0, animateOnLoad = false }) {
	if (!children) return null;
	const lines = children.split("\n");
	let wordIndex = 0;
	return /* @__PURE__ */ jsx("h2", {
		className,
		children: lines.map((line, li) => /* @__PURE__ */ jsx("span", {
			className: "block",
			children: line.split(" ").map((word) => {
				const wi = wordIndex++;
				return /* @__PURE__ */ jsx("span", {
					className: "inline-block overflow-hidden pb-2 mr-[0.22em]",
					children: /* @__PURE__ */ jsx(motion.span, {
						className: "block",
						initial: {
							y: "120%",
							opacity: 0
						},
						animate: animateOnLoad ? {
							y: "0%",
							opacity: 1
						} : void 0,
						whileInView: !animateOnLoad ? {
							y: "0%",
							opacity: 1
						} : void 0,
						transition: {
							duration: 1.2,
							delay: delay + wi * .04,
							ease: EASE
						},
						viewport: { once: true },
						children: word
					})
				}, wi);
			})
		}, li))
	});
}
function ProjectDetailsPage() {
	const { slug } = useParams();
	const project = projectsData.find((item) => item.slug === slug);
	const primaryImgRef = useRef(null);
	const { scrollYProgress: imgScroll } = useScroll({
		target: primaryImgRef,
		offset: ["start end", "end start"]
	});
	const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [slug, project]);
	if (!project) return /* @__PURE__ */ jsx(NotFoundPage, {});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: project.seo?.metaTitle || `${project.title} | Bright Arena Interiors`,
		description: project.seo?.description,
		keywords: project.seo?.keywords,
		url: `https://www.brightarenainteriors.com/portfolio/${project.slug}`
	}), /* @__PURE__ */ jsxs("article", {
		className: "bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-32 pb-24",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-16 md:mb-20 text-center flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "sr-only",
						children: project.seo?.h1 || project.title
					}),
					/* @__PURE__ */ jsxs(motion.nav, {
						className: "flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-8",
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							ease: EASE
						},
						children: [
							/* @__PURE__ */ jsx(Link, {
								to: "/portfolio",
								className: "hover:text-[#ff7043] transition-colors",
								children: "Portfolio"
							}),
							/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-[#4a1c13]",
								children: project.title
							})
						]
					}),
					/* @__PURE__ */ jsx(RevealHeading, {
						animateOnLoad: true,
						className: "font-primary text-[clamp(40px,5vw,72px)] leading-[1.05] tracking-tight text-[#4a1c13] max-w-4xl",
						children: project.heroTitle || project.title
					}),
					project.shortDescription && /* @__PURE__ */ jsx(motion.p, {
						className: "mt-6 max-w-2xl text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed",
						initial: {
							opacity: 0,
							y: 20
						},
						animate: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1,
							delay: .4,
							ease: EASE
						},
						children: project.shortDescription
					})
				]
			}),
			project.heroImage && /* @__PURE__ */ jsx("section", {
				className: "max-w-[1600px] mx-auto px-4 md:px-8 mb-20 md:mb-32",
				children: /* @__PURE__ */ jsxs("div", {
					ref: primaryImgRef,
					className: "relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden rounded-[2rem] shadow-sm bg-[#e8e5de]",
					children: [/* @__PURE__ */ jsx(motion.img, {
						src: project.heroImage,
						alt: project.title,
						className: "w-full h-full object-cover",
						style: {
							y: imgY,
							scale: 1.1
						},
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: {
							duration: 1.5,
							ease: EASE
						}
					}), /* @__PURE__ */ jsx(motion.div, {
						className: "absolute inset-0 bg-[#f7f4ee]",
						style: { transformOrigin: "left" },
						initial: { scaleX: 1 },
						whileInView: { scaleX: 0 },
						transition: {
							duration: 1.2,
							ease: EASE
						},
						viewport: {
							once: true,
							margin: "-60px"
						}
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 mb-24 md:mb-32",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-[1fr_2.5fr] gap-16 lg:gap-24",
					children: [/* @__PURE__ */ jsx("div", {
						className: "relative order-2 lg:order-1",
						children: /* @__PURE__ */ jsxs("div", {
							className: "sticky top-32 space-y-10 pr-6 border-t lg:border-t-0 border-[#4a1c13]/10 pt-10 lg:pt-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-8",
								children: [/* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										x: -10
									},
									whileInView: {
										opacity: 1,
										x: 0
									},
									transition: {
										duration: .8,
										delay: .1,
										ease: EASE
									},
									viewport: { once: true },
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold",
										children: "Client / Project"
									}), /* @__PURE__ */ jsx("div", {
										className: "font-primary text-xl md:text-2xl text-[#4a1c13]",
										children: project.title
									})]
								}), /* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										x: -10
									},
									whileInView: {
										opacity: 1,
										x: 0
									},
									transition: {
										duration: .8,
										delay: .2,
										ease: EASE
									},
									viewport: { once: true },
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-[#4a1c13]/50 text-[10px] tracking-widest uppercase mb-1 font-bold",
										children: "Scope"
									}), /* @__PURE__ */ jsx("div", {
										className: "text-[#4a1c13] font-medium text-sm md:text-base",
										children: project.shortDescription
									})]
								})]
							}), /* @__PURE__ */ jsx(motion.div, {
								initial: {
									opacity: 0,
									y: 10
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: .8,
									delay: .3,
									ease: EASE
								},
								viewport: { once: true },
								className: "pt-4",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/contact",
									className: "inline-block w-full text-center bg-[#4a1c13] text-[#f7f4ee] px-8 py-4 rounded-xl uppercase tracking-widest text-[11px] font-bold hover:bg-[#ff7043] transition-colors duration-500",
									children: "Start Your Project"
								})
							})]
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "order-1 lg:order-2",
						children: [/* @__PURE__ */ jsx(RevealHeading, {
							delay: .1,
							className: "font-primary text-[clamp(28px,3.5vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-8",
							children: "Design\nNarrative."
						}), /* @__PURE__ */ jsx("div", {
							className: "prose prose-lg prose-p:text-[#4a1c13]/75 prose-p:leading-[1.8] max-w-3xl font-sans text-base md:text-lg",
							children: /* @__PURE__ */ jsx(motion.p, {
								initial: {
									opacity: 0,
									y: 20
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								transition: {
									duration: 1,
									delay: .2,
									ease: EASE
								},
								viewport: { once: true },
								children: project.description
							})
						})]
					})]
				})
			}),
			project.gallery && project.gallery.length > 1 && /* @__PURE__ */ jsxs("section", {
				className: "max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 mb-20",
				children: [/* @__PURE__ */ jsx(RevealHeading, {
					delay: .1,
					className: "font-primary text-[clamp(28px,3.5vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-10 text-center",
					children: "Project\nGallery."
				}), /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6",
					children: project.gallery.slice(1).map((img, i) => /* @__PURE__ */ jsx(motion.div, {
						className: "relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-[#e8e5de]",
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: .8,
							delay: i % 3 * .15,
							ease: EASE
						},
						viewport: { once: true },
						children: /* @__PURE__ */ jsx("img", {
							src: img,
							alt: `${project.title} space ${i + 1}`,
							loading: "lazy",
							className: "w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
						})
					}, i))
				})]
			})
		]
	})] });
}
//#endregion
export { ProjectDetailsPage as default };
