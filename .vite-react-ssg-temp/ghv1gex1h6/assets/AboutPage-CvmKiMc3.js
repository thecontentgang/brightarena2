import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/AboutPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/AboutPage.tsx");
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 40
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .7,
			ease: [
				.22,
				1,
				.36,
				1
			]
		}
	}
};
var stagger = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: .18 }
	}
};
var IMAGES = {
	heroRoom: "/projectsImg/forest-edge/fe-img5.webp",
	studioWork: "/projectsImg/varaprasad/vp-img11.png",
	philosophyBg: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1400&q=80",
	founderA: "https://images.unsplash.com/photo-",
	founderB: "https://images.unsplash.c"
};
var founders = [{
	name: "Srilatha Ravuri",
	role: "Co-Founder & Principal Lead Designer",
	description: "Srilatha Ravuri is the Founder and Principal Interior Designer of Bright Arena, specializing in luxury residential and commercial interior design. With expertise in space planning, modern interiors, and bespoke design solutions, she creates elegant, functional spaces tailored to each client's lifestyle.Known for her attention to detail and client-focused approach, Srilatha oversees every project from concept to completion, delivering timeless interiors that combine aesthetics, comfort, and quality. Her vision has established Bright Arena as a trusted name in innovative interior design and customized living spaces.",
	stats: [
		"500K+ Sq Ft Designed",
		"200+ Homes Completed",
		"Lead Architect"
	]
}, {
	name: "Bhawani Shankar Guruvelli",
	role: "Co-Founder & Director of Operations & Growth",
	description: "Bhawani Shankar Guruvelli is the Co-Founder of Bright Arena, leading business operations, strategic planning, and project execution. With expertise in business management, client relationships, and operational excellence, he ensures every project is delivered with efficiency and quality. His vision for innovation, sustainable growth, and customer satisfaction continues to strengthen Bright Arena's reputation as a trusted interior design company.",
	stats: [
		"15+ Years Experience",
		"350+ Commercial Spaces",
		"Creative Lead"
	]
}];
function AboutPage() {
	const heroRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end start"]
	});
	const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "About - Bright Arena Interiors 14+ Years of Interior Design Excellence",
		description: "Learn about Bright Arena Interiors, a trusted interior design company in Hyderabad with 14+ years of experience creating beautiful, functional, and personalized spaces.",
		url: "https://www.brightarenainteriors.com/about"
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] overflow-x-hidden",
		children: [
			/* @__PURE__ */ jsxs("section", {
				ref: heroRef,
				"aria-label": "Introduction",
				className: "relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						style: { y: heroImgY },
						className: "absolute inset-0 scale-110",
						children: [/* @__PURE__ */ jsx("img", {
							src: IMAGES.heroRoom,
							alt: "Luxurious signature living room interior designed by Bright Arena",
							className: "w-full h-full object-cover",
							fetchPriority: "high"
						}), /* @__PURE__ */ jsx("div", {
							className: "absolute inset-0 bg-[#1F1F1F]/60",
							"aria-hidden": "true"
						})]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: "hidden",
						animate: "visible",
						variants: stagger,
						className: "relative z-10 px-6 max-w-4xl mx-auto",
						children: [
							/* @__PURE__ */ jsx("h1", {
								className: "sr-only",
								children: "About Bright Arena Interiors"
							}),
							/* @__PURE__ */ jsx(motion.span, {
								variants: fadeUp,
								className: "inline-block text-[#ff7043] tracking-[0.35em] uppercase font-bold text-xs mb-6",
								children: "Est. 2012 · Hyderabad, India"
							}),
							/* @__PURE__ */ jsxs(motion.h2, {
								variants: fadeUp,
								className: "text-[clamp(40px,9vw,108px)] leading-[0.92] font-serif text-white mb-8",
								children: [
									"We Design ",
									/* @__PURE__ */ jsx("br", {}),
									/* @__PURE__ */ jsx("span", {
										className: "italic text-[#ff7043]",
										children: "Living Stories."
									})
								]
							}),
							/* @__PURE__ */ jsx(motion.p, {
								variants: fadeUp,
								className: "text-lg md:text-xl text-white/75 max-w-xl mx-auto leading-relaxed",
								children: "Bright Arena Interiors is Hyderabad's premier luxury design studio 14 years, 350+ transformations, one obsession: spaces that feel unmistakably yours."
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								className: "mt-10 flex flex-col sm:flex-row gap-4 justify-center",
								children: [/* @__PURE__ */ jsx("a", {
									href: "#founders",
									"aria-label": "Navigate to meet the founders section",
									className: "bg-[#ff7043] text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300",
									children: "Meet the Founders"
								}), /* @__PURE__ */ jsx("a", {
									href: "#philosophy",
									"aria-label": "Navigate to our design philosophy section",
									className: "border border-white/40 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all duration-300",
									children: "Our Story"
								})]
							})
						]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						initial: { opacity: 0 },
						animate: { opacity: 1 },
						transition: { delay: 1.5 },
						className: "absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("span", {
							className: "text-[10px] tracking-[0.2em] uppercase",
							children: "Scroll"
						}), /* @__PURE__ */ jsx("div", { className: "w-px h-12 bg-white/30 animate-pulse" })]
					})
				]
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-labelledby": "about-heading",
				className: "py-24 lg:py-32 bg-[#F8F6F2] overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					className: "max-w-7xl mx-auto px-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "grid lg:grid-cols-12 gap-12 items-center",
						children: [
							/* @__PURE__ */ jsxs(motion.div, {
								className: "lg:col-span-5",
								initial: {
									opacity: 0,
									x: -60
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { duration: .8 },
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "uppercase tracking-[0.4em] text-[#ff7043] text-xs font-semibold",
										children: "About Bright Arena"
									}),
									/* @__PURE__ */ jsxs("h2", {
										id: "about-heading",
										className: "mt-6 text-5xl md:text-6xl font-serif leading-[1.05]",
										children: [
											"We Design",
											/* @__PURE__ */ jsx("br", {}),
											"Spaces That",
											/* @__PURE__ */ jsx("br", {}),
											"Inspire."
										]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-8 text-gray-600 leading-8",
										children: "Since 2012, Bright Arena has transformed homes, offices, and commercial spaces into timeless environments that balance beauty, comfort, and functionality."
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-6 text-gray-600 leading-8",
										children: "Every project begins with understanding people their lifestyle, aspirations, and personality before translating those ideas into thoughtfully crafted interiors."
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-10 flex flex-wrap gap-4",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "px-5 py-3 rounded-full border border-gray-300 text-sm",
												children: "Residential"
											}),
											/* @__PURE__ */ jsx("div", {
												className: "px-5 py-3 rounded-full border border-gray-300 text-sm",
												children: "Commercial"
											}),
											/* @__PURE__ */ jsx("div", {
												className: "px-5 py-3 rounded-full border border-gray-300 text-sm",
												children: "Turnkey Projects"
											})
										]
									})
								]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								className: "lg:col-span-4 relative",
								initial: {
									opacity: 0,
									y: 80
								},
								whileInView: {
									opacity: 1,
									y: 0
								},
								viewport: { once: true },
								transition: { duration: .8 },
								children: [/* @__PURE__ */ jsx("div", {
									className: "overflow-hidden rounded-[30px]",
									children: /* @__PURE__ */ jsx("img", {
										src: IMAGES.studioWork,
										alt: "Bright Arena design studio workspace showing architectural plans",
										loading: "lazy",
										decoding: "async",
										className: "w-full h-[650px] object-cover hover:scale-105 transition duration-700"
									})
								}), /* @__PURE__ */ jsxs("div", {
									className: "absolute top-8 -left-6 bg-white shadow-2xl rounded-3xl px-6 py-5",
									children: [/* @__PURE__ */ jsx("div", {
										className: "text-4xl font-bold text-[#4a1c13]",
										children: "2012"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs tracking-[0.3em] uppercase text-gray-500",
										children: "Founded"
									})]
								})]
							}),
							/* @__PURE__ */ jsx(motion.div, {
								className: "lg:col-span-3",
								initial: {
									opacity: 0,
									x: 60
								},
								whileInView: {
									opacity: 1,
									x: 0
								},
								viewport: { once: true },
								transition: { duration: .8 },
								children: /* @__PURE__ */ jsxs("div", {
									className: "space-y-10",
									children: [
										/* @__PURE__ */ jsxs("div", {
											className: "border-b border-gray-300 pb-8",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-5xl font-serif text-[#4a1c13]",
												children: "350+"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-2 text-gray-600",
												children: "Completed Interior Projects"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "border-b border-gray-300 pb-8",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-5xl font-serif text-[#4a1c13]",
												children: "14+"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-2 text-gray-600",
												children: "Years of Experience"
											})]
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "border-b border-gray-300 pb-8",
											children: [/* @__PURE__ */ jsx("h3", {
												className: "text-5xl font-serif text-[#4a1c13]",
												children: "40+"
											}), /* @__PURE__ */ jsx("p", {
												className: "mt-2 text-gray-600",
												children: "Design Professionals"
											})]
										}),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
											className: "text-5xl font-serif text-[#4a1c13]",
											children: "98%"
										}), /* @__PURE__ */ jsx("p", {
											className: "mt-2 text-gray-600",
											children: "Client Satisfaction"
										})] })
									]
								})
							})
						]
					})
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "founders",
				"aria-labelledby": "founders-heading",
				className: "w-full bg-[#FFF8F2] px-6 md:px-12 lg:px-24 py-24 md:py-32",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-7xl mx-auto",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: "hidden",
						whileInView: "visible",
						viewport: {
							once: true,
							amount: .3
						},
						variants: stagger,
						className: "mb-16 md:mb-24",
						children: [
							/* @__PURE__ */ jsx(motion.p, {
								variants: fadeUp,
								className: "uppercase tracking-[0.35em] text-[#ff7043] text-xs font-semibold mb-4",
								children: "Our Leadership"
							}),
							/* @__PURE__ */ jsx(motion.h2, {
								id: "founders-heading",
								variants: fadeUp,
								className: "text-[#4a1c13] text-4xl md:text-5xl font-serif leading-tight mb-8",
								children: "Meet The Founders"
							}),
							/* @__PURE__ */ jsx(motion.div, {
								variants: fadeUp,
								className: "w-full h-[1px] bg-[#4a1c13]/10",
								"aria-hidden": "true"
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "space-y-16 lg:space-y-24",
						children: founders.map((founder, index) => /* @__PURE__ */ jsxs(motion.div, {
							initial: "hidden",
							whileInView: "visible",
							viewport: {
								once: true,
								amount: .3
							},
							variants: stagger,
							className: `flex flex-col ${index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"} items-stretch w-full max-w-6xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#4a1c13]/5 overflow-hidden`,
							children: [/* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								className: "relative w-full lg:w-2/5 min-h-[350px] lg:min-h-full shrink-0 overflow-hidden bg-gray-100",
								children: [/* @__PURE__ */ jsx("img", {
									src: index === 0 ? IMAGES.founderA : IMAGES.founderB,
									alt: `Portrait of ${founder.name}, ${founder.role} at Bright Arena`,
									loading: "lazy",
									decoding: "async",
									className: "absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
								}), /* @__PURE__ */ jsx("div", { className: `absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent ${index % 2 !== 0 ? "lg:to-white/10" : "lg:to-white/10"}` })]
							}), /* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								className: "flex flex-col justify-center w-full lg:w-3/5 p-8 md:p-12 lg:p-16",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "text-[#4a1c13] text-3xl md:text-5xl font-serif tracking-tight mb-2 md:mb-4",
										children: founder.name
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[#4a1c13]/60 uppercase tracking-[0.2em] text-sm mb-6 md:mb-8 font-medium",
										children: founder.role
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-[#4a1c13]/80 text-sm md:text-base leading-relaxed font-light max-w-2xl",
										children: founder.description
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex flex-wrap gap-3 mt-8 md:mt-10",
										"aria-label": `Key metrics for ${founder.name}`,
										children: founder.stats?.map((stat, i) => /* @__PURE__ */ jsx("span", {
											className: "px-5 py-2.5 border border-[#4a1c13]/10 rounded-full text-[10px] uppercase tracking-widest text-[#4a1c13]/80 hover:bg-[#4a1c13]/5 transition-colors cursor-default",
											children: stat
										}, i))
									})
								]
							})]
						}, founder.name))
					})]
				})
			}),
			/* @__PURE__ */ jsxs("section", {
				"aria-labelledby": "commitments-heading",
				className: "py-24 px-6 max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsxs(motion.div, {
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						amount: .2
					},
					variants: stagger,
					className: "text-center mb-14",
					children: [/* @__PURE__ */ jsx(motion.span, {
						variants: fadeUp,
						className: "text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs",
						children: "What We Stand For"
					}), /* @__PURE__ */ jsx(motion.h2, {
						id: "commitments-heading",
						variants: fadeUp,
						className: "text-[clamp(28px,5vw,52px)] font-serif mt-4",
						children: "Our Six Commitments"
					})]
				}), /* @__PURE__ */ jsx(motion.div, {
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						amount: .1
					},
					variants: stagger,
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
					children: [
						{
							title: "Expert Consultation",
							desc: "Guidance from India's finest minds, available throughout your project.",
							icon: "◇"
						},
						{
							title: "Reflects Your Style",
							desc: "We listen deeply before we draw. Every corner is a reflection of you.",
							icon: "◈"
						},
						{
							title: "Customised Designs",
							desc: "Tailored to your unique lifestyle and aesthetic not drawn from a catalogue.",
							icon: "✦"
						},
						{
							title: "Transparent Pricing",
							desc: "Detailed, itemised quotes with zero hidden charges ever.",
							icon: "◉"
						},
						{
							title: "Qualified Staff",
							desc: "200+ trained professionals, each vetted for craft, punctuality, and care.",
							icon: "⬡"
						},
						{
							title: "Timely Handover",
							desc: "We have never missed a handover date. We don't intend to start.",
							icon: "◎"
						}
					].map((item, i) => /* @__PURE__ */ jsxs(motion.div, {
						variants: fadeUp,
						whileHover: { y: -6 },
						className: "relative bg-white p-8 rounded-3xl border border-[#4a1c13]/8 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "absolute top-1/2 right-0 -translate-y-1/2 translate-x-[20%] -rotate-90 text-[140px] font-serif font-bold leading-none text-[#4a1c13]/[0.03] group-hover:text-[#ff7043]/[0.05] group-hover:scale-110 transition-all duration-500 pointer-events-none select-none z-0",
							"aria-hidden": "true",
							children: ["0", i + 1]
						}), /* @__PURE__ */ jsxs("div", {
							className: "relative z-10",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-11 h-11 bg-[#ff7043]/10 text-[#ff7043] rounded-2xl flex items-center justify-center mb-5 text-lg",
									"aria-hidden": "true",
									children: item.icon
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "text-lg font-bold mb-3 text-[#4a1c13]",
									children: item.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "text-[#4a1c13]/55 leading-relaxed text-sm",
									children: item.desc
								})
							]
						})]
					}, item.title))
				})]
			}),
			/* @__PURE__ */ jsxs("section", {
				id: "philosophy",
				"aria-labelledby": "philosophy-heading",
				className: "relative py-28 px-6 overflow-hidden",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "absolute inset-0",
					children: [/* @__PURE__ */ jsx("img", {
						src: IMAGES.philosophyBg,
						alt: "Abstract architectural elements representing Bright Arena's design philosophy",
						loading: "lazy",
						decoding: "async",
						className: "w-full h-full object-cover"
					}), /* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 bg-[#1F1F1F]/60",
						"aria-hidden": "true"
					})]
				}), /* @__PURE__ */ jsx("div", {
					className: "relative z-10 max-w-4xl mx-auto text-center",
					children: /* @__PURE__ */ jsxs(motion.div, {
						initial: "hidden",
						whileInView: "visible",
						viewport: {
							once: true,
							amount: .3
						},
						variants: stagger,
						children: [
							/* @__PURE__ */ jsx(motion.span, {
								variants: fadeUp,
								className: "text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs",
								children: "Our Philosophy"
							}),
							/* @__PURE__ */ jsxs(motion.h2, {
								id: "philosophy-heading",
								variants: fadeUp,
								className: "text-[clamp(28px,5vw,56px)] font-serif text-white mt-5 mb-8 leading-tight",
								children: [
									"Unique by Doing. ",
									/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
									"Not by Saying."
								]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								variants: stagger,
								className: "text-white/70 space-y-6 text-base md:text-lg leading-relaxed max-w-2xl mx-auto",
								children: [
									/* @__PURE__ */ jsx(motion.p, {
										variants: fadeUp,
										children: "We are the premier luxury interior designers in Hyderabad because we let our work speak. Every project is a complete turnkey journey from the first sketch on a napkin to the last cushion placed on a sofa."
									}),
									/* @__PURE__ */ jsx(motion.p, {
										variants: fadeUp,
										children: "A home is more than walls. It's where your children take their first steps, where you celebrate, grieve, dream. We carry that weight in every decision we make."
									}),
									/* @__PURE__ */ jsx(motion.p, {
										variants: fadeUp,
										children: "Innovation, craft, and a fierce attention to detail that's the Bright Arena guarantee. Come experience the finest luxury interiors in India."
									})
								]
							}),
							/* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								className: "mt-12 flex flex-col sm:flex-row gap-4 justify-center",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/contact",
									"aria-label": "Start your interior design project with Bright Arena",
									className: "bg-[#ff7043] text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white hover:text-[#4a1c13] transition-all duration-300",
									children: "Start Your Project"
								}), /* @__PURE__ */ jsx("a", {
									href: "/portfolio",
									"aria-label": "View our project portfolio",
									className: "group relative inline-flex items-center justify-center gap-3 bg-transparent border border-white/40 text-white px-8 py-3.5 rounded-full font-bold uppercase tracking-widest text-xs hover:border-white transition-all duration-300 overflow-hidden",
									children: "View Projects Portfolio"
								})]
							})
						]
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-labelledby": "process-heading",
				className: "py-24 px-6 bg-white overflow-hidden",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-6xl mx-auto",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: "hidden",
						whileInView: "visible",
						viewport: {
							once: true,
							amount: .3
						},
						variants: stagger,
						className: "text-center mb-16 lg:mb-20",
						children: [/* @__PURE__ */ jsx(motion.span, {
							variants: fadeUp,
							className: "text-[#ff7043] tracking-[0.3em] uppercase font-bold text-xs",
							children: "How We Work"
						}), /* @__PURE__ */ jsx(motion.h2, {
							id: "process-heading",
							variants: fadeUp,
							className: "text-[clamp(28px,5vw,52px)] font-serif mt-4 text-[#4a1c13]",
							children: "The Bright Arena Process"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "flex flex-col gap-6",
						children: [
							{
								step: "01",
								title: "Project Kick-off call",
								desc: "We listen. Tell us your dreams, your budget, your lifestyle."
							},
							{
								step: "02",
								title: "Concept & Moodboard",
								desc: "Within 7 days we present a full concept palette, material library, spatial flow, and reference imagery."
							},
							{
								step: "03",
								title: "Design Development",
								desc: "3D renders, elevation drawings, custom furniture selections. You see every detail before we build."
							},
							{
								step: "04",
								title: "Execution",
								desc: "Our in-house teams handle everything. You get a single point of contact. No juggling vendors."
							},
							{
								step: "05",
								title: "Final Chapter with New Beginning",
								desc: "We walk you through the finished space and remain on-call for 12 months post-handover."
							}
						].map((item) => /* @__PURE__ */ jsxs(motion.div, {
							initial: "hidden",
							whileInView: "visible",
							viewport: {
								once: true,
								amount: .4
							},
							variants: fadeUp,
							className: "group flex flex-col md:flex-row items-start md:items-center p-8 md:p-10 rounded-[2rem] bg-[#FFF8F2] border border-[#4a1c13]/5 hover:shadow-xl hover:border-[#ff7043]/20 transition-all duration-300",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "w-full md:w-1/5 text-6xl md:text-7xl font-serif text-[#ff7043]/20 leading-none mb-6 md:mb-0 group-hover:text-[#ff7043]/40 transition-colors shrink-0",
									"aria-hidden": "true",
									children: item.step
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-full md:w-2/5 pr-0 md:pr-8 mb-4 md:mb-0 shrink-0",
									children: /* @__PURE__ */ jsx("h3", {
										className: "text-2xl md:text-3xl font-bold font-primary text-[#4a1c13] leading-snug",
										children: item.title
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "w-full md:w-2/5 flex-grow",
									children: /* @__PURE__ */ jsx("p", {
										className: "text-[#4a1c13]/70 text-base leading-relaxed border-l-0 md:border-l border-[#4a1c13]/10 pl-0 md:pl-8",
										children: item.desc
									})
								})
							]
						}, item.step))
					})]
				})
			})
		]
	})] });
}
//#endregion
export { AboutPage as default };
