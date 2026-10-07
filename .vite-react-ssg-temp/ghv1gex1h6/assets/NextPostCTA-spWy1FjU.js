import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/components/blog/BlogHeader.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/blog/BlogHeader.tsx");
var EASE$2 = [
	.22,
	1,
	.36,
	1
];
function BlogHeader({ category, readTime, title, author, date, articleRef }) {
	const { scrollYProgress: articleScroll } = useScroll({
		target: articleRef,
		offset: ["start start", "end end"]
	});
	const scaleX = useSpring(articleScroll, {
		stiffness: 100,
		damping: 30,
		restDelta: .001
	});
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(motion.div, {
		className: "fixed top-0 left-0 right-0 h-1 bg-[#ff7043] origin-left z-50",
		style: { scaleX }
	}), /* @__PURE__ */ jsxs("header", {
		className: "pt-32 md:pt-48 pb-12 md:pb-16 px-6 md:px-12 lg:px-16 max-w-[1200px] mx-auto text-center",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 10
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .7,
					ease: EASE$2
				},
				className: "flex items-center justify-center gap-4 mb-8",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold",
						children: category
					}),
					/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a1c13]/20" }),
					/* @__PURE__ */ jsx("span", {
						className: "text-[#4a1c13]/50 text-[10px] md:text-xs font-mono tracking-widest uppercase",
						children: readTime
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.h2, {
				initial: {
					opacity: 0,
					y: 30
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .9,
					delay: .1,
					ease: EASE$2
				},
				className: "text-[clamp(36px,6vw,80px)] leading-[1.05] tracking-tight font-primary max-w-4xl mx-auto mb-10",
				children: title
			}),
			/* @__PURE__ */ jsxs(motion.div, {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				transition: {
					duration: .8,
					delay: .3,
					ease: EASE$2
				},
				className: "flex items-center justify-center gap-4 text-sm font-medium text-[#4a1c13]/70",
				children: [
					/* @__PURE__ */ jsxs("span", { children: ["By ", author] }),
					/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a1c13]/20" }),
					/* @__PURE__ */ jsx("span", { children: date })
				]
			})
		]
	})] });
}
//#endregion
//#region src/components/blog/BlogHeroImage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/blog/BlogHeroImage.tsx");
function BlogHeroImage({ coverImage, title }) {
	const heroRef = useRef(null);
	const { scrollYProgress: heroScroll } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	const heroImgY = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
	return /* @__PURE__ */ jsx("section", {
		className: "px-4 md:px-6 lg:px-12 max-w-[1600px] mx-auto mb-16 md:mb-24",
		children: /* @__PURE__ */ jsxs("div", {
			ref: heroRef,
			className: "relative w-full h-[50vh] md:h-[70vh] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-[#e8e5de]",
			children: [/* @__PURE__ */ jsx(motion.div, {
				className: "w-full h-full",
				style: {
					y: heroImgY,
					scale: 1.05
				},
				children: /* @__PURE__ */ jsx("img", {
					src: coverImage,
					alt: title,
					className: "w-full h-full object-cover"
				})
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-[#4a1c13]/5" })]
		})
	});
}
//#endregion
//#region src/components/blog/BlogContentBlock.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/blog/BlogContentBlock.tsx");
var EASE$1 = [
	.22,
	1,
	.36,
	1
];
function BlogContentBlock({ type, value, caption, index = 0 }) {
	switch (type) {
		case "paragraph": return /* @__PURE__ */ jsx(motion.p, {
			initial: {
				opacity: 0,
				y: 20
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
				duration: .8,
				ease: EASE$1
			},
			className: "text-[#4a1c13]/80 text-lg md:text-xl leading-relaxed mb-8 md:mb-12 font-sans",
			children: value
		}, index);
		case "heading": return /* @__PURE__ */ jsx(motion.h3, {
			initial: {
				opacity: 0,
				y: 20
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
				duration: .8,
				ease: EASE$1
			},
			className: "text-3xl md:text-4xl font-primary text-[#4a1c13] mt-16 mb-8 leading-snug",
			children: value
		}, index);
		case "quote": return /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				scale: .95
			},
			whileInView: {
				opacity: 1,
				scale: 1
			},
			viewport: {
				once: true,
				margin: "-50px"
			},
			transition: {
				duration: .8,
				ease: EASE$1
			},
			className: "my-16 md:my-24 pl-6 md:pl-10 border-l-2 border-[#ff7043]",
			children: /* @__PURE__ */ jsxs("p", {
				className: "text-2xl md:text-4xl font-primary italic text-[#4a1c13] leading-tight",
				children: [
					"\"",
					value,
					"\""
				]
			})
		}, index);
		case "image": return /* @__PURE__ */ jsxs(motion.figure, {
			initial: {
				opacity: 0,
				y: 30
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
				duration: .8,
				ease: EASE$1
			},
			className: "my-12 md:my-16",
			children: [/* @__PURE__ */ jsx("div", {
				className: "w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-2xl md:rounded-3xl bg-[#e8e5de]",
				children: /* @__PURE__ */ jsx("img", {
					src: value,
					alt: caption || "Blog image",
					className: "w-full h-full object-cover"
				})
			}), caption && /* @__PURE__ */ jsx("figcaption", {
				className: "text-center text-[#4a1c13]/50 text-sm mt-4 font-mono tracking-wide",
				children: caption
			})]
		}, index);
		default: return null;
	}
}
//#endregion
//#region src/components/blog/NextPostCTA.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/blog/NextPostCTA.tsx");
var EASE = [
	.22,
	1,
	.36,
	1
];
function NextPostCTA({ title, slug }) {
	return /* @__PURE__ */ jsx("section", {
		className: "py-24 px-6 md:px-12 lg:px-16 max-w-[1400px] mx-auto mt-24 border-t border-[#4a1c13]/10",
		children: /* @__PURE__ */ jsxs(motion.div, {
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
				ease: EASE
			},
			viewport: { once: true },
			className: "flex flex-col items-center text-center",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "text-[#ff7043] text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold mb-6",
					children: "Read Next"
				}),
				/* @__PURE__ */ jsx("h3", {
					className: "text-[#4a1c13] text-3xl md:text-5xl lg:text-6xl font-primary leading-tight tracking-tight max-w-3xl mb-12 hover:text-[#ff7043] transition-colors duration-500",
					children: /* @__PURE__ */ jsx(Link, {
						to: `/blogs/${slug}`,
						children: title
					})
				}),
				/* @__PURE__ */ jsxs(Link, {
					to: `/blogs/${slug}`,
					className: "group flex items-center gap-4 bg-[#4a1c13] text-white px-8 py-5 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-[#ff7043] transition-colors duration-500",
					children: ["Continue Reading", /* @__PURE__ */ jsx("div", {
						className: "w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white transition-colors duration-500",
						children: /* @__PURE__ */ jsx("svg", {
							width: "12",
							height: "12",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							className: "text-white group-hover:text-[#ff7043]",
							children: /* @__PURE__ */ jsx("path", {
								d: "M5 12h14M12 5l7 7-7 7",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { BlogHeader as i, BlogContentBlock as n, BlogHeroImage as r, NextPostCTA as t };
