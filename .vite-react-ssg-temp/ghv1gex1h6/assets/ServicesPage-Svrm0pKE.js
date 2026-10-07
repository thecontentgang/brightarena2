import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { t as servicesData } from "./servicesData-DsveBLpy.js";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/ServicesPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ServicesPage.tsx");
function ServiceCard({ service, index }) {
	const ref = useRef(null);
	const inView = useInView(ref, {
		once: true,
		margin: "-100px"
	});
	const isEven = index % 2 === 0;
	const headingId = `service-heading-${index}`;
	return /* @__PURE__ */ jsxs(motion.div, {
		ref,
		initial: {
			opacity: 0,
			y: 50
		},
		animate: inView ? {
			opacity: 1,
			y: 0
		} : {},
		transition: {
			duration: .8,
			ease: [
				.22,
				1,
				.36,
				1
			]
		},
		className: `
        flex flex-col
        ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}
        w-full bg-white rounded-[2rem] md:rounded-[3rem] 
        overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        border border-[#2C1810]/5 group
      `,
		"aria-labelledby": headingId,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative w-full lg:w-1/2 min-h-[300px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-[#EDE8E2] shrink-0",
			children: [/* @__PURE__ */ jsx(motion.img, {
				src: service.images?.[0] || "/placeholder-service.jpg",
				alt: `Bright Arena interior service: ${service.title}`,
				loading: "lazy",
				decoding: "async",
				className: "absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105",
				initial: {
					scale: 1.1,
					opacity: 0
				},
				animate: inView ? {
					scale: 1,
					opacity: 1
				} : {},
				transition: {
					duration: 1.2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				}
			}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/5 pointer-events-none" })]
		}), /* @__PURE__ */ jsx("div", {
			className: "w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16 xl:p-20",
			children: /* @__PURE__ */ jsxs(motion.div, {
				initial: {
					opacity: 0,
					y: 20
				},
				animate: inView ? {
					opacity: 1,
					y: 0
				} : {},
				transition: {
					duration: .7,
					delay: .2,
					ease: [
						.22,
						1,
						.36,
						1
					]
				},
				children: [
					/* @__PURE__ */ jsxs("span", {
						className: "inline-block px-4 py-1.5 bg-[#C4623A]/10 text-[#C4623A] rounded-full text-[10px] tracking-[0.25em] uppercase font-bold mb-6",
						children: [
							"0",
							index + 1,
							" • ",
							service.title.split(" ")[0]
						]
					}),
					/* @__PURE__ */ jsx("h2", {
						id: headingId,
						className: "text-[clamp(28px,4vw,42px)] leading-[1.1] mb-5 tracking-tight",
						style: {
							fontFamily: "Georgia, serif",
							color: "#2C1810"
						},
						children: service.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[15px] leading-relaxed mb-8",
						style: { color: "#6B5C57" },
						children: service.longDescription
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-10",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-[11px] tracking-[0.2em] uppercase font-bold mb-4",
							style: { color: "#8A7570" },
							children: "Key Benefits"
						}), /* @__PURE__ */ jsx("ul", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6",
							"aria-label": `Benefits of ${service.title}`,
							children: service.benefits?.map((item) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3 text-[14px]",
								style: { color: "#4A3630" },
								children: [/* @__PURE__ */ jsx("span", {
									className: "mt-[6px] w-1.5 h-1.5 rounded-full shrink-0 bg-[#C4623A]",
									"aria-hidden": "true"
								}), /* @__PURE__ */ jsx("span", {
									className: "leading-snug",
									children: item
								})]
							}, item))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ jsxs(Link, {
							to: `/services/${service.slug}`,
							"aria-label": `Learn more details about our ${service.title} services`,
							className: "group/btn flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#C4623A] text-white text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-[#A84E2C] hover:shadow-lg",
							children: ["Explore Service", /* @__PURE__ */ jsx("span", {
								className: "transition-transform duration-300 group-hover/btn:translate-x-1",
								"aria-hidden": "true",
								children: "→"
							})]
						}), /* @__PURE__ */ jsxs("a", {
							href: `tel:${service.phone}`,
							"aria-label": `Call Bright Arena regarding ${service.title} at ${service.phone}`,
							className: "flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-[#E8D9D3] bg-[#F9F6F3] text-[#6B5752] hover:border-[#C4623A] hover:bg-white hover:text-[#C4623A] transition-all duration-300",
							children: [/* @__PURE__ */ jsx("svg", {
								xmlns: "http://www.w3.org/2000/svg",
								className: "w-4 h-4 shrink-0",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								strokeWidth: 2,
								"aria-hidden": "true",
								children: /* @__PURE__ */ jsx("path", {
									strokeLinecap: "round",
									strokeLinejoin: "round",
									d: "M2.25 6.75c0 8.284 6.716 15 15h2.25a1.5 1.5 0 001.5-1.5v-1.372a1.5 1.5 0 00-1.09-1.443l-4.423-1.106a1.5 1.5 0 00-1.465.417l-.97.97a12.042 12.042 0 01-5.431-5.431l.97-.97a1.5 1.5 0 00.417-1.465L7.937 4.34A1.5 1.5 0 006.494 3.25H5.122a1.5 1.5 0 00-1.5 1.5V6.75z"
								})
							}), /* @__PURE__ */ jsx("span", {
								className: "text-[12px] font-bold tracking-wider",
								children: service.phone
							})]
						})]
					})
				]
			})
		})]
	});
}
function ServicesPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Home and Office Interior Design Services in Hyderabad - Bright Arena Interiors",
		description: "Bright Arena Interiors offers Interior Design Services in Hyderabad for luxury homes, offices, and commercial spaces with expert planning and execution.",
		url: "https://www.brightarenainteriors.com/services"
	}), /* @__PURE__ */ jsxs("main", {
		style: { background: "#F9F7F3" },
		className: "overflow-x-hidden pt-16",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "sr-only",
				children: "Home & Office Interior Design Services in Hyderabad"
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-labelledby": "services-hero-heading",
				className: "relative min-h-[70vh] flex items-center justify-center px-6 sm:px-8 md:px-16 lg:px-24",
				children: /* @__PURE__ */ jsxs(motion.div, {
					className: "w-full max-w-4xl text-center pt-24 pb-12",
					initial: {
						opacity: 0,
						y: 24
					},
					animate: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .8,
						ease: [
							.22,
							1,
							.36,
							1
						]
					},
					children: [
						/* @__PURE__ */ jsx("p", {
							className: "text-[11px] tracking-[0.3em] uppercase font-bold mb-6",
							style: { color: "#C4623A" },
							children: "Bright Arena Interiors"
						}),
						/* @__PURE__ */ jsxs("h2", {
							id: "services-hero-heading",
							className: "text-[clamp(42px,6vw,72px)] leading-[1.05] mb-8",
							style: {
								fontFamily: "Georgia, serif",
								color: "#2C1810"
							},
							children: [
								"Professional design ",
								/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
								/* @__PURE__ */ jsx("span", {
									style: {
										color: "#C4623A",
										fontStyle: "italic"
									},
									children: "for your vision."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "max-w-2xl mx-auto text-[16px] leading-[1.8]",
							style: { color: "#6B5C57" },
							children: "We bring professional precision to every space, ensuring your project is handled with expertise, creativity, and absolute attention to detail."
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-label": "Our Interior Design Services",
				className: "px-5 sm:px-8 md:px-12 lg:px-20 pb-24",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-[1400px] mx-auto flex flex-col gap-12 lg:gap-20",
					children: servicesData.map((s, i) => /* @__PURE__ */ jsx(ServiceCard, {
						service: s,
						index: i
					}, s.slug))
				})
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-label": "Company Statistics",
				className: "px-8 md:px-16 lg:px-24 py-24 bg-white border-t border-[#E8E2DB]",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-12 text-center",
					children: [
						{
							val: "14+",
							label: "Years of practice"
						},
						{
							val: "350+",
							label: "Projects delivered"
						},
						{
							val: "200+",
							label: "Design experts"
						}
					].map((s) => /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-[clamp(32px,5vw,56px)] mb-2",
						style: {
							fontFamily: "Georgia, serif",
							color: "#2C1810"
						},
						children: s.val
					}), /* @__PURE__ */ jsx("div", {
						className: "text-[11px] font-bold tracking-[0.2em] uppercase",
						style: { color: "#C4623A" },
						children: s.label
					})] }, s.label))
				})
			})
		]
	})] });
}
//#endregion
export { ServicesPage as default };
