import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import NotFoundPage from "./NotFoundPage-Drbycidu.js";
import { t as servicesData } from "./servicesData-DsveBLpy.js";
import React, { useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/ServiceDetails.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ServiceDetails.tsx");
var EASE = [
	.25,
	1,
	.5,
	1
];
function RegisterMark({ className = "" }) {
	return /* @__PURE__ */ jsxs("svg", {
		viewBox: "0 0 24 24",
		width: "18",
		height: "18",
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("line", {
				x1: "12",
				y1: "0",
				x2: "12",
				y2: "24",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ jsx("line", {
				x1: "0",
				y1: "12",
				x2: "24",
				y2: "12",
				stroke: "currentColor",
				strokeWidth: "1"
			}),
			/* @__PURE__ */ jsx("circle", {
				cx: "12",
				cy: "12",
				r: "4",
				stroke: "currentColor",
				strokeWidth: "1",
				fill: "none"
			})
		]
	});
}
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
					className: "inline-block overflow-hidden pb-2 mr-[0.2em] sm:mr-[0.22em]",
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
							duration: 1.1,
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
function ServiceDetailsPage() {
	const { slug } = useParams();
	const service = servicesData.find((item) => item.slug === slug);
	const primaryImgRef = useRef(null);
	const { scrollYProgress: imgScroll } = useScroll({
		target: primaryImgRef,
		offset: ["start end", "end start"]
	});
	const imgY = useTransform(imgScroll, [0, 1], ["-8%", "8%"]);
	if (!service) return /* @__PURE__ */ jsx(NotFoundPage, {});
	const cleanImgSrc = (src) => src.endsWith(".") ? `${src}png` : src;
	const parseLinks = (text) => {
		return text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
			const match = part.match(/\[(.*?)\]\((.*?)\)/);
			if (match) {
				const linkText = match[1];
				const url = match[2];
				const linkClasses = "font-bold text-[#ff7043] underline decoration-[#ff7043]/30 hover:decoration-[#ff7043] transition-colors duration-300";
				if (url.startsWith("/")) return /* @__PURE__ */ jsx(Link, {
					to: url,
					className: linkClasses,
					children: linkText
				}, i);
				return /* @__PURE__ */ jsx("a", {
					href: url,
					target: "_blank",
					rel: "noopener noreferrer",
					className: linkClasses,
					children: linkText
				}, i);
			}
			return /* @__PURE__ */ jsx("span", { children: part }, i);
		});
	};
	const renderRichContent = (content) => {
		const extraImages = service.images ? service.images.slice(1) : [];
		let headingCount = 0;
		let imageIndex = 0;
		return content.split("\n").filter((line) => line.trim() !== "").map((line, idx) => {
			const isHeading = line.length < 100 && !line.trim().endsWith(".") && !line.trim().endsWith("?");
			let injectedImage = null;
			if (isHeading) {
				headingCount++;
				if (headingCount > 1 && headingCount % 2 === 0 && imageIndex < extraImages.length) {
					const imgSrc = cleanImgSrc(extraImages[imageIndex]);
					imageIndex++;
					injectedImage = /* @__PURE__ */ jsx(motion.div, {
						className: "w-full aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-xl sm:rounded-2xl shadow-sm my-10 sm:my-16",
						initial: {
							opacity: 0,
							y: 30
						},
						whileInView: {
							opacity: 1,
							y: 0
						},
						transition: {
							duration: 1.1,
							ease: EASE
						},
						viewport: {
							once: true,
							margin: "-50px"
						},
						children: /* @__PURE__ */ jsx("img", {
							src: imgSrc,
							alt: `${service.title} detail layout`,
							loading: "lazy",
							className: "w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]"
						})
					}, `img-${idx}`);
				}
				return /* @__PURE__ */ jsxs(React.Fragment, { children: [injectedImage, /* @__PURE__ */ jsx(motion.h3, {
					className: "font-primary text-xl sm:text-2xl md:text-3xl text-[#4a1c13] mt-10 sm:mt-12 mb-5 sm:mb-6 leading-tight",
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						ease: EASE
					},
					viewport: {
						once: true,
						margin: "-50px"
					},
					children: parseLinks(line)
				})] }, idx);
			}
			return /* @__PURE__ */ jsx(motion.p, {
				className: "text-[#4a1c13]/75 leading-[1.8] sm:leading-[1.85] mb-5 sm:mb-6 text-[15px] sm:text-base md:text-lg font-sans",
				initial: {
					opacity: 0,
					y: 20
				},
				whileInView: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .8,
					ease: EASE
				},
				viewport: {
					once: true,
					margin: "-50px"
				},
				children: parseLinks(line)
			}, idx);
		});
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: service.seo?.metaTitle || `${service.title} | Bright Arena Interiors`,
		description: service.seo?.description,
		keywords: service.seo?.keywords,
		url: `https://www.brightarenainteriors.com/services/${service.slug}`
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] overflow-hidden font-sans selection:bg-[#ff7043] selection:text-white pt-24 sm:pt-28 md:pt-32",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative w-full px-5 sm:px-8 md:px-12 lg:px-16 mb-12 sm:mb-16 md:mb-20 text-center flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx(RegisterMark, { className: "hidden sm:block absolute top-2 left-4 md:left-8 text-[#4a1c13]/15" }),
					/* @__PURE__ */ jsx(RegisterMark, { className: "hidden sm:block absolute top-2 right-4 md:right-8 text-[#4a1c13]/15" }),
					/* @__PURE__ */ jsx("h1", {
						className: "sr-only",
						children: service.seo?.h1 || service.title
					}),
					/* @__PURE__ */ jsxs(motion.nav, {
						className: "flex items-center gap-2 text-[9px] sm:text-[10px] uppercase tracking-widest text-[#4a1c13]/50 font-bold mb-6 sm:mb-8",
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
								to: "/services",
								className: "hover:text-[#ff7043] transition-colors",
								children: "Services"
							}),
							/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a1c13]/30 mx-1" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-[#4a1c13] max-w-[45vw] sm:max-w-none truncate",
								children: service.title
							})
						]
					}),
					/* @__PURE__ */ jsx(RevealHeading, {
						animateOnLoad: true,
						className: "font-primary text-[clamp(32px,8vw,64px)] leading-[1.08] tracking-tight text-[#4a1c13] max-w-4xl",
						children: service.heroTitle || "Crafting Timeless Spaces"
					}),
					service.subtitle && /* @__PURE__ */ jsx(motion.p, {
						className: "mt-5 sm:mt-6 max-w-xs sm:max-w-lg md:max-w-2xl text-[15px] sm:text-base md:text-lg text-[#4a1c13]/70 font-light leading-relaxed",
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
						children: service.subtitle
					})
				]
			}),
			service.images?.[0] && /* @__PURE__ */ jsx("section", {
				className: "w-full sm:max-w-[1600px] sm:mx-auto sm:px-4 md:px-8 mb-16 sm:mb-20 md:mb-32",
				children: /* @__PURE__ */ jsxs("div", {
					ref: primaryImgRef,
					className: "relative aspect-[4/5] xs:aspect-[3/4] sm:aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden sm:rounded-[1.5rem] md:rounded-[2rem] shadow-sm",
					children: [
						/* @__PURE__ */ jsx(motion.img, {
							src: cleanImgSrc(service.images[0]),
							alt: service.title,
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
						}),
						/* @__PURE__ */ jsx(motion.div, {
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
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-2 text-[#f7f4ee]",
							children: [/* @__PURE__ */ jsx("span", { className: "w-6 sm:w-8 h-px bg-[#ffc107]" }), /* @__PURE__ */ jsx("span", {
								className: "text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-bold drop-shadow-sm",
								children: service.title
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "max-w-4xl mx-auto px-5 sm:px-8 md:px-12 mb-16 sm:mb-20",
				children: [
					service.description && /* @__PURE__ */ jsx(RevealHeading, {
						delay: .1,
						className: "font-primary text-[clamp(24px,6vw,48px)] leading-[1.2] tracking-tight text-[#4a1c13] mb-6 sm:mb-8",
						children: service.description
					}),
					/* @__PURE__ */ jsxs("div", { children: [service.longDescription && /* @__PURE__ */ jsx(motion.p, {
						className: "text-[#4a1c13]/90 text-base sm:text-lg md:text-xl leading-[1.75] sm:leading-[1.8] font-medium mb-10 sm:mb-12 pb-10 sm:pb-12 border-b border-[#4a1c13]/10",
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
						children: parseLinks(service.longDescription)
					}), service.content && /* @__PURE__ */ jsx("div", {
						className: "mt-6 sm:mt-8",
						children: renderRichContent(service.content)
					})] }),
					service.benefits && service.benefits.length > 0 && /* @__PURE__ */ jsxs("div", {
						className: "mt-16 sm:mt-20 pt-14 sm:pt-16 border-t border-[#4a1c13]/10",
						children: [/* @__PURE__ */ jsx("span", {
							className: "uppercase tracking-[0.2em] text-[10px] font-bold text-[#ff7043] block mb-6 sm:mb-8",
							children: "Key Advantages"
						}), /* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-x-10 sm:gap-x-12 gap-y-5 sm:gap-y-6",
							children: service.benefits.map((benefit, i) => /* @__PURE__ */ jsxs(motion.div, {
								className: "flex items-start gap-4 rounded-xl -mx-3 px-3 py-2 transition-colors hover:bg-[#4a1c13]/[0.03]",
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
									delay: i * .08,
									ease: EASE
								},
								viewport: { once: true },
								children: [/* @__PURE__ */ jsxs("span", {
									className: "text-[#ff7043] font-bold text-sm mt-1 shrink-0",
									children: [
										"0",
										i + 1,
										"."
									]
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[#4a1c13] font-medium leading-relaxed",
									children: benefit
								})]
							}, i))
						})]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "w-full bg-[#4a1c13] text-[#f7f4ee] py-24 md:py-32 px-6 md:px-12 relative overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none bg-[radial-gradient(circle_at_100%_0%,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" }), /* @__PURE__ */ jsxs("div", {
					className: "max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left relative z-10",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: {
							opacity: 0,
							x: -30
						},
						whileInView: {
							opacity: 1,
							x: 0
						},
						transition: {
							duration: .8,
							ease: EASE
						},
						viewport: { once: true },
						className: "max-w-2xl",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-primary text-[clamp(32px,4vw,56px)] leading-[1.1] text-[#f7f4ee] mb-4",
							children: "Ready to transform your space?"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-col sm:flex-row items-center md:items-start gap-4 text-[#f7f4ee]/70 font-medium text-sm md:text-base mt-6",
							children: [service.phone && /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx("div", {
									className: "w-8 h-8 rounded-full border border-[#f7f4ee]/20 flex items-center justify-center",
									children: /* @__PURE__ */ jsx("svg", {
										width: "12",
										height: "12",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
									})
								}), /* @__PURE__ */ jsx("span", { children: service.phone })]
							}), service.workingDays && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
								className: "hidden sm:inline-block text-[#f7f4ee]/30",
								children: "•"
							}), /* @__PURE__ */ jsxs("span", { children: [
								"Available ",
								service.workingDays,
								service.workingHours && /* @__PURE__ */ jsxs("span", {
									className: "ml-1 opacity-70",
									children: [
										"(",
										service.workingHours,
										")"
									]
								})
							] })] })]
						})]
					}), /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							scale: .95
						},
						whileInView: {
							opacity: 1,
							scale: 1
						},
						transition: {
							duration: .8,
							delay: .2,
							ease: EASE
						},
						viewport: { once: true },
						children: /* @__PURE__ */ jsx(Link, {
							to: "/contact",
							className: "inline-flex items-center justify-center bg-[#ff7043] text-white px-10 py-5 rounded-xl uppercase tracking-widest text-[13px] font-bold hover:bg-[#f7f4ee] hover:text-[#4a1c13] transition-colors duration-500 whitespace-nowrap shadow-xl",
							children: "Discuss Your Project"
						})
					})]
				})]
			})
		]
	})] });
}
//#endregion
export { ServiceDetailsPage as default };
