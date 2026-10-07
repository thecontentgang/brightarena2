import { t as ProjectModal } from "../main.mjs";
import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import gsap from "gsap";
import ScrollTrigger$1, { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
//#region src/sections/HeroSection.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/HeroSection.tsx");
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
var MinimalHero = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const sectionRef = useRef(null);
	const videoWrapRef = useRef(null);
	const headingRef = useRef(null);
	const statsRef = useRef(null);
	const videoRef = useRef(null);
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});
		lenis.on("scroll", ScrollTrigger.update);
		const rafCallback = (time) => {
			lenis.raf(time * 1e3);
		};
		gsap.ticker.add(rafCallback);
		gsap.ticker.lagSmoothing(0);
		return () => {
			gsap.ticker.remove(rafCallback);
			lenis.destroy();
		};
	}, []);
	useEffect(() => {
		const ctx = gsap.context(() => {
			const gap = window.innerWidth < 768 ? 40 : 80;
			const tl = gsap.timeline({ scrollTrigger: {
				trigger: sectionRef.current,
				start: "top top",
				end: "+=150%",
				scrub: 1,
				pin: true,
				pinSpacing: true,
				anticipatePin: 1
			} });
			tl.fromTo(headingRef.current, {
				opacity: 0,
				y: 40
			}, {
				opacity: 1,
				y: 0,
				ease: "power2.out",
				duration: .35
			}, .15);
			tl.fromTo(videoWrapRef.current, {
				width: "100%",
				height: "100dvh",
				borderRadius: "0px",
				bottom: "0px"
			}, {
				width: `calc(100% - ${gap}px)`,
				height: "60dvh",
				borderRadius: "32px",
				bottom: "32px",
				ease: "power2.inOut",
				duration: .55
			}, .05);
			tl.fromTo(statsRef.current, {
				opacity: 0,
				y: 40
			}, {
				opacity: 1,
				y: 0,
				ease: "power2.out",
				duration: .3
			}, .5);
		}, sectionRef);
		return () => ctx.revert();
	}, []);
	useEffect(() => {
		const video = videoRef.current;
		const section = sectionRef.current;
		if (!video || !section) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) video.play().catch((err) => console.log("Video auto-play prevented:", err));
			else video.pause();
		}, { threshold: 0 });
		observer.observe(section);
		return () => {
			observer.unobserve(section);
		};
	}, []);
	const handleTimeUpdate = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.currentTime >= 60) {
			video.currentTime = 1;
			video.play().catch(console.error);
		}
	};
	const navigate = useNavigate();
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("section", {
		ref: sectionRef,
		"aria-label": "Hero Section",
		className: "relative w-full h-[100dvh] bg-[#f7f4ee] antialiased z-10 overflow-hidden",
		children: [/* @__PURE__ */ jsxs("div", {
			ref: headingRef,
			className: "absolute top-0 left-0 w-full h-[40dvh] flex items-center justify-center pt-18 px-4 md:px-8 z-0 opacity-0 transform-gpu",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "sr-only",
				children: "Dream Big. Experience Exceptional Design. Live in Comfort."
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-2 gap-y-6 w-full md:w-auto md:flex md:flex-nowrap items-start justify-center md:gap-16 text-center",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center order-1 md:order-none col-span-1",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none",
							children: "Dream"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-sm md:text-base uppercase tracking-[0.25em] text-[#8c6b63]",
							children: "BIG"
						})]
					}),
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "hidden md:flex items-center text-5xl font-light text-[#4a1c13]/30 order-none",
						children: "|"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center order-3 md:order-none col-span-2 md:col-span-1 mt-2 md:mt-0",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-primary text-[#ff7043] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none",
							children: "Experience"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]",
							children: "Exceptional Design"
						})]
					}),
					/* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: "hidden md:flex items-center text-5xl font-light text-[#4a1c13]/30 order-none",
						children: "|"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center order-2 md:order-none col-span-1",
						"aria-hidden": "true",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "font-primary text-[#4a1c13] text-[clamp(40px,9vw,56px)] md:text-[clamp(52px,6vw,80px)] lg:text-[clamp(64px,5vw,96px)] leading-none",
							children: "Live"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-sm md:text-base uppercase tracking-[0.2em] text-[#8c6b63]",
							children: "in Comfort"
						})]
					})
				]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			ref: videoWrapRef,
			className: "absolute left-1/2 -translate-x-1/2 bg-[#4a1c13] overflow-hidden flex justify-center z-10 shadow-2xl will-change-[width,height,border-radius,bottom] transform-gpu",
			style: {
				width: "100%",
				height: "100dvh",
				bottom: 0
			},
			children: [
				/* @__PURE__ */ jsx("video", {
					ref: videoRef,
					onTimeUpdate: handleTimeUpdate,
					autoPlay: true,
					muted: true,
					playsInline: true,
					preload: "auto",
					poster: "/video-fallback-poster.jpg",
					"aria-hidden": "true",
					className: "absolute inset-0 h-full w-full object-cover pointer-events-none",
					children: /* @__PURE__ */ jsx("source", {
						src: "/bright-hero-video.mp4",
						type: "video/mp4"
					})
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" }),
				/* @__PURE__ */ jsxs("div", {
					ref: statsRef,
					className: "absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col md:flex-row items-center justify-center gap-5 md:gap-12 bg-white/10 backdrop-blur-xl border border-white/20 py-5 px-5 md:py-5 md:px-10 rounded-[1.5rem] md:rounded-2xl z-20 w-[92%] md:w-auto shadow-2xl opacity-0 transform-gpu",
					style: { paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" },
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-8 md:gap-10 w-full md:w-auto",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-white text-2xl md:text-3xl font-bold",
									children: "350+"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1",
									children: "Projects"
								})]
							}),
							/* @__PURE__ */ jsx("div", { className: "w-px h-10 md:h-12 bg-white/20" }),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-white text-2xl md:text-3xl font-bold",
									children: "14+"
								}), /* @__PURE__ */ jsx("span", {
									className: "text-white/70 text-[10px] md:text-xs tracking-[0.2em] uppercase mt-0.5 md:mt-1",
									children: "Years Exp."
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-center gap-3 w-full md:w-auto mt-2 md:mt-0",
						children: [/* @__PURE__ */ jsx("button", {
							"aria-label": "View our portfolio of projects",
							onClick: () => navigate("/portfolio"),
							className: "flex-1 md:flex-none w-full md:w-auto bg-[#ff7043] text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase shadow-lg text-center whitespace-nowrap transition-colors hover:bg-[#ffc107] hover:text-[#4a1c13] active:scale-95 touch-manipulation",
							children: "View Projects"
						}), /* @__PURE__ */ jsx("button", {
							"aria-label": "Open contact modal to talk now",
							onClick: () => setIsModalOpen(true),
							className: "flex-1 md:flex-none w-full md:w-auto bg-white/5 border border-white/30 text-white px-3 py-3.5 md:px-7 md:py-4 rounded-xl md:rounded-2xl text-[11px] md:text-xs font-bold tracking-widest uppercase text-center whitespace-nowrap transition-colors hover:bg-white/20 active:scale-95 touch-manipulation",
							children: "Talk Now"
						})]
					})]
				})
			]
		})]
	}), /* @__PURE__ */ jsx(ProjectModal, {
		isOpen: isModalOpen,
		onClose: () => setIsModalOpen(false)
	})] });
};
//#endregion
//#region src/sections/AboutSection.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/AboutSection.tsx");
var smoothEase$1 = [
	.22,
	1,
	.36,
	1
];
var gridContainerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: .15,
			delayChildren: .3
		}
	}
};
var gridItemVariants = {
	hidden: {
		opacity: 0,
		y: 40
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 1.2,
			ease: smoothEase$1
		}
	}
};
var AboutSection = () => {
	const sectionRef = useRef(null);
	const isInView = useInView(sectionRef, {
		once: true,
		margin: "-100px"
	});
	const navigate = useNavigate();
	return /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "relative w-full bg-[#f7f4ee] py-16 md:py-24 overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 md:mb-20",
				children: [/* @__PURE__ */ jsxs("h2", {
					className: "text-[#4a1c13] text-[clamp(42px,6vw,68px)] leading-[1.05] tracking-tight font-primary",
					children: ["Your Partner in", /* @__PURE__ */ jsx("span", {
						className: "text-[#ff7043] italic",
						children: " Every Detail"
					})]
				}), /* @__PURE__ */ jsxs(motion.div, {
					initial: {
						opacity: 0,
						y: 40
					},
					animate: isInView ? {
						opacity: 1,
						y: 0
					} : {},
					transition: {
						duration: .9,
						ease: smoothEase$1,
						delay: .1
					},
					className: "flex flex-col gap-8 pt-2 md:pt-3",
					children: [/* @__PURE__ */ jsxs("p", {
						className: "text-[#4a1c13]/80 text-[16px] md:text-lg leading-relaxed max-w-lg",
						children: [
							"We don’t waste time with hierarchy. Our ",
							/* @__PURE__ */ jsx("strong", { children: "Close - Knit" }),
							" team gives you direct access to the designers who will create your space from the first conversation to the final details."
						]
					}), /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(motion.button, {
						whileHover: {
							scale: 1.05,
							backgroundColor: "#ffc107",
							color: "#4a1c13"
						},
						onClick: () => navigate("/about"),
						whileTap: { scale: .95 },
						className: "w-full md:w-auto bg-[#ff7043] text-white px-8 py-4 rounded-2xl text-[13px] font-bold tracking-widest uppercase shadow-lg shadow-[#ff7043]/20 transition-colors",
						children: "Know More"
					}) })]
				})]
			}), /* @__PURE__ */ jsxs(motion.div, {
				variants: gridContainerVariants,
				initial: "hidden",
				animate: isInView ? "visible" : "hidden",
				className: "flex flex-col lg:grid lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-6 lg:h-[550px]",
				children: [
					/* @__PURE__ */ jsxs(motion.div, {
						variants: gridItemVariants,
						className: "lg:col-span-2 lg:row-span-2 h-[350px] lg:h-full relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/projectsImg/rajapushpa/rp-img12.webp",
							alt: "Our design philosophy in action",
							className: "absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
						}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#4a1c13]/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" })]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						variants: gridItemVariants,
						className: "lg:col-span-1 lg:row-span-1 h-[220px] lg:h-full relative rounded-3xl overflow-hidden group cursor-pointer shadow-sm",
						children: [/* @__PURE__ */ jsx("img", {
							src: "/projectsImg/rajapushpa/rp-img11.webp",
							alt: "Material details",
							className: "absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
						}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" })]
					}),
					/* @__PURE__ */ jsxs(motion.div, {
						variants: gridItemVariants,
						className: "lg:col-span-1 lg:row-span-1 h-[220px] lg:h-full relative rounded-3xl overflow-hidden bg-[#4a1c13] flex flex-col justify-center p-8 group cursor-pointer shadow-sm",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110",
								children: /* @__PURE__ */ jsx("svg", {
									width: "80",
									height: "80",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "#f7f4ee",
									strokeWidth: "1",
									children: /* @__PURE__ */ jsx("path", { d: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" })
								})
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-[#ff7043] text-[clamp(40px,4vw,56px)] leading-none font-primary mb-2 transform transition-transform duration-500 group-hover:-translate-y-1",
								children: "100%"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[#f7f4ee] text-sm md:text-base font-medium tracking-wide",
								children: "Client Satisfaction Rate"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[#f7f4ee]/50 text-xs mt-2 max-w-[200px]",
								children: "We don't consider the job done until your vision is perfectly realized."
							})
						]
					})
				]
			})]
		})
	});
};
//#endregion
//#region src/sections/TrustBy.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/TrustBy.tsx");
var trustedLogos = [
	"/logos/aparna-zenon.png",
	"/logos/asbl-spire.png",
	"/logos/auro-regent.svg",
	"/logos/avani-tulasi-vanam.png",
	"/logos/candeur-40.png",
	"/logos/dsr-park-ridge.jpg",
	"/logos/elegance-emperia.png",
	"/logos/epil-carnerstone.png",
	"/logos/gem-nakshtra.png",
	"/logos/hallmark-skyrena.png",
	"/logos/indus-peblcity.png",
	"/logos/my-home-sayuk.jpg",
	"/logos/nyla-tema4.png",
	"/logos/tripura-lm-3.jpg",
	"/logos/vaishnavi-oasis.png"
];
var row1 = [...trustedLogos, ...trustedLogos];
var row2 = [...trustedLogos].reverse();
var duplicatedRow2 = [...row2, ...row2];
var smoothEase = [
	.22,
	1,
	.36,
	1
];
var stats = [
	{
		value: "350+",
		label: "Luxury Homes"
	},
	{
		value: "25+",
		label: "Premium Communities"
	},
	{
		value: "14+",
		label: "Years Experience"
	},
	{
		value: "100%",
		label: "Client Satisfaction"
	}
];
var TrustedBy = () => {
	return /* @__PURE__ */ jsxs("section", {
		className: "relative overflow-hidden bg-[#FAF7F2] py-24 md:py-32",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "absolute inset-0 pointer-events-none",
			children: [
				/* @__PURE__ */ jsx("div", {
					className: "absolute inset-0 opacity-[0.04]",
					style: {
						backgroundImage: `
            linear-gradient(#d8c7b6 1px, transparent 1px),
            linear-gradient(90deg, #d8c7b6 1px, transparent 1px)
            `,
						backgroundSize: "80px 80px"
					}
				}),
				/* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#FAF7F2] to-transparent" }),
				/* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#FAF7F2] to-transparent" })
			]
		}), /* @__PURE__ */ jsxs("div", {
			className: "relative z-10 max-w-7xl mx-auto px-6",
			children: [
				/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 15
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					transition: {
						duration: .6,
						ease: smoothEase
					},
					viewport: { once: true },
					className: "flex justify-center mb-6",
					children: /* @__PURE__ */ jsx("span", {
						className: "text-xs font-semibold tracking-[0.3em] text-[#FF7043] uppercase",
						children: "A Legacy of Trust"
					})
				}),
				/* @__PURE__ */ jsxs(motion.div, {
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
						delay: .1,
						ease: smoothEase
					},
					viewport: { once: true },
					className: "text-center",
					children: [/* @__PURE__ */ jsxs("h2", {
						className: "font-primary text-[42px] md:text-[68px] leading-[1.1] text-[#4A1C13]",
						children: [
							"Designed for",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "text-[#FF7043]",
								children: "Exceptional Living"
							})
						]
					}), /* @__PURE__ */ jsx("p", {
						className: "max-w-3xl mx-auto mt-8 text-[#6E5A52] leading-8 text-lg font-light",
						children: "Every home tells a story. We've had the privilege of crafting interiors for some of Hyderabad's most admired residential communities, delivering timeless spaces with meticulous attention to detail."
					})]
				}),
				/* @__PURE__ */ jsx(motion.div, {
					className: "grid grid-cols-2 md:grid-cols-4 gap-8 my-20 md:my-24",
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
						delay: .2,
						ease: smoothEase
					},
					viewport: { once: true },
					children: stats.map((stat, idx) => /* @__PURE__ */ jsxs("div", {
						className: "text-center flex flex-col items-center justify-center space-y-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-primary text-4xl md:text-5xl text-[#4A1C13] font-medium",
							children: stat.value
						}), /* @__PURE__ */ jsx("span", {
							className: "text-sm md:text-base text-[#6E5A52] tracking-wide uppercase",
							children: stat.label
						})]
					}, idx))
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative mt-12 md:mt-16",
					children: [
						/* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 z-20 h-full w-24 md:w-48 bg-gradient-to-r from-[#FAF7F2] to-transparent pointer-events-none" }),
						/* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 z-20 h-full w-24 md:w-48 bg-gradient-to-l from-[#FAF7F2] to-transparent pointer-events-none" }),
						/* @__PURE__ */ jsx("div", {
							className: "relative overflow-hidden py-4",
							children: /* @__PURE__ */ jsx(motion.div, {
								animate: { x: ["0%", "-50%"] },
								transition: {
									duration: 40,
									repeat: Infinity,
									ease: "linear"
								},
								className: "flex w-max",
								children: row1.map((logo, index) => /* @__PURE__ */ jsxs("div", {
									className: "group relative mx-4 w-[180px] h-[130px] rounded-2xl bg-[#F4EDDB] border border-[#E6D8C7] shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center hover:-translate-y-2 overflow-hidden flex-shrink-0 cursor-pointer",
									children: [/* @__PURE__ */ jsx("img", {
										src: logo,
										alt: "Premium Community Client",
										className: "w-[65%] h-[55%] object-contain  transition-all duration-500"
									}), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FF7043] transition-all duration-500" })]
								}, index))
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "relative overflow-hidden py-4",
							children: /* @__PURE__ */ jsx(motion.div, {
								animate: { x: ["-50%", "0%"] },
								transition: {
									duration: 40,
									repeat: Infinity,
									ease: "linear"
								},
								className: "flex w-max",
								children: duplicatedRow2.map((logo, index) => /* @__PURE__ */ jsxs("div", {
									className: "group relative mx-4 w-[180px] h-[130px] rounded-2xl bg-[#F4EDDB] border border-[#E6D8C7] shadow-sm hover:shadow-xl transition-all duration-500 flex items-center justify-center hover:-translate-y-2 overflow-hidden flex-shrink-0 cursor-pointer",
									children: [/* @__PURE__ */ jsx("img", {
										src: logo,
										alt: "Premium Community Client",
										className: "w-[65%] h-[55%] object-contain  transition-all duration-500"
									}), /* @__PURE__ */ jsx("div", { className: "absolute bottom-0 left-0 w-full h-1 bg-transparent group-hover:bg-[#FF7043] transition-all duration-500" })]
								}, index))
							})
						})
					]
				})
			]
		})]
	});
};
//#endregion
//#region src/sections/ProjectShowcase.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/ProjectShowcase.tsx");
gsap.registerPlugin(ScrollTrigger$1);
ScrollTrigger$1.config({ ignoreMobileResize: true });
var projects = [
	{
		id: 1,
		title: "ForestEdge",
		categories: "Luxury Residential, Interior Design",
		image: "/projectsImg/forest-edge/fe-img1.webp"
	},
	{
		id: 2,
		title: "Rajapushpa Project",
		categories: "Premium Apartment, Styling",
		image: "/projectsImg/rajapushpa/rp-img1.webp"
	},
	{
		id: 3,
		title: "Vara Prasad Bachupally",
		categories: "Residentail Interiors",
		image: "/projectsImg/varaprasad/vp-img1.png"
	},
	{
		id: 4,
		title: "Etna By Phoenix",
		categories: "Premium Apartment, Styling",
		image: "/projectsImg/etna/sr-img1.webp"
	}
];
var ProjectShowcase = () => {
	const containerRef = useRef(null);
	const cardsRef = useRef([]);
	useEffect(() => {
		const lenis = new Lenis({
			duration: 1.2,
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			smoothWheel: true
		});
		lenis.on("scroll", ScrollTrigger$1.update);
		const rafCallback = (time) => {
			lenis.raf(time * 1e3);
		};
		gsap.ticker.add(rafCallback);
		gsap.ticker.lagSmoothing(0);
		const ctx = gsap.context(() => {
			const cards = cardsRef.current.filter(Boolean);
			if (cards.length === 0) return;
			gsap.set(cards[0], {
				yPercent: 0,
				scale: 1,
				opacity: 1
			});
			gsap.set(cards.slice(1), {
				yPercent: 120,
				scale: .5,
				opacity: 0
			});
			const tl = gsap.timeline({ scrollTrigger: {
				trigger: containerRef.current,
				start: "top top",
				end: `+=${projects.length * 100}%`,
				scrub: 1,
				pin: true,
				pinSpacing: true,
				anticipatePin: 1
			} });
			cards.forEach((card, i) => {
				if (i < cards.length - 1) {
					const nextCard = cards[i + 1];
					const syncLabel = `transition-${i}`;
					tl.to({}, { duration: .3 });
					tl.to(card, {
						yPercent: -120,
						scale: .5,
						opacity: 0,
						duration: 1,
						ease: "power2.inOut"
					}, syncLabel);
					tl.to(nextCard, {
						yPercent: 0,
						scale: 1,
						opacity: 1,
						duration: 1,
						ease: "power2.inOut"
					}, syncLabel);
				}
			});
			tl.to({}, { duration: .3 });
		}, containerRef);
		return () => {
			ctx.revert();
			gsap.ticker.remove(rafCallback);
			lenis.destroy();
		};
	}, []);
	return /* @__PURE__ */ jsxs("section", {
		ref: containerRef,
		className: "relative w-full h-[100dvh] bg-[#f7f4ee] overflow-hidden flex items-center justify-center",
		children: [projects.map((project, index) => /* @__PURE__ */ jsxs("div", {
			ref: (el) => {
				cardsRef.current[index] = el;
			},
			className: "absolute inset-0 w-full h-full flex flex-col items-center justify-center will-change-transform pointer-events-none",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "text-center mb-8 z-10 px-4",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-[#4a1c13] text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight cooper-light mb-3",
					children: project.title
				}), /* @__PURE__ */ jsx("p", {
					className: "text-[#ff7043] font-medium tracking-[0.2em] uppercase text-xs md:text-sm",
					children: project.categories
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "relative w-[85vw] md:w-[60vw] max-w-[900px] h-[50vh] md:h-[60vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-[#e8e5de] pointer-events-auto",
				children: [/* @__PURE__ */ jsx("img", {
					src: project.image,
					alt: project.title,
					className: "absolute inset-0 w-full h-full object-cover object-center"
				}), /* @__PURE__ */ jsx("div", { className: "absolute inset-0 shadow-[inset_0_0_0_1px_rgba(74,28,19,0.05)] pointer-events-none rounded-[2rem] md:rounded-[3rem]" })]
			})]
		}, project.id)), /* @__PURE__ */ jsx("div", {
			className: "absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-50",
			children: /* @__PURE__ */ jsxs(Link, {
				to: "/portfolio",
				className: "bg-[#ff7043] text-white px-8 py-3.5 md:px-10 md:py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase shadow-lg shadow-[#ff7043]/30 transition-all hover:scale-105 hover:bg-[#e65a2d] active:scale-95 flex items-center gap-2",
				children: ["View Full Portfolio", /* @__PURE__ */ jsx("svg", {
					className: "w-4 h-4",
					fill: "none",
					stroke: "currentColor",
					viewBox: "0 0 24 24",
					children: /* @__PURE__ */ jsx("path", {
						strokeLinecap: "round",
						strokeLinejoin: "round",
						strokeWidth: "2",
						d: "M14 5l7 7m0 0l-7 7m7-7H3"
					})
				})]
			})
		})]
	});
};
//#endregion
//#region src/sections/HomePage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/HomePage.tsx");
var Services = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/ServicesSection.tsx"), import("./ServicesSection-Dhukr6p0.js")));
var Panoroma = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/PanoromaSection.tsx"), import("./PanoromaSection-DH7e-lWY.js")));
var Philosophy = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/PhilosophySection.tsx"), import("./PhilosophySection-D80lE2U_.js")));
var TestimonialsSection = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/TestimonialSection.tsx"), import("./TestimonialSection-BEqV4Pnu.js")));
var SectionLoader = () => /* @__PURE__ */ jsx("div", {
	className: "w-full h-32 flex items-center justify-center bg-[#f7f4ee]",
	"aria-hidden": "true",
	children: /* @__PURE__ */ jsx("div", { className: "w-6 h-6 border-2 border-[#4a1c13]/20 border-t-[#ff7043] rounded-full animate-spin" })
});
var HomePage = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Best Interior Designers in Hyderabad for Luxury Home Interiors",
		description: "Looking for Interior Designers in Hyderabad? Bright Arena Interiors delivers luxury home and office interiors with 14+ years of expertise and craftsmanship.",
		keywords: "Interior Designers Hyderabad, Luxury Interior Designers, Home Interior Design, Office Interiors, Commercial Interior Designers, Residential Interior Designers, Modular Kitchen Designers",
		url: "https://www.brightarenainteriors.com/"
	}), /* @__PURE__ */ jsxs("main", {
		id: "main-content",
		className: "bg-[#f7f4ee] overflow-x-hidden antialiased",
		children: [
			/* @__PURE__ */ jsx("h1", {
				className: "sr-only",
				children: "Best Interior Designers in Hyderabad"
			}),
			/* @__PURE__ */ jsx(MinimalHero, {}),
			/* @__PURE__ */ jsx(AboutSection, {}),
			/* @__PURE__ */ jsx(TrustedBy, {}),
			/* @__PURE__ */ jsxs(Suspense, {
				fallback: /* @__PURE__ */ jsx(SectionLoader, {}),
				children: [
					/* @__PURE__ */ jsx(Services, {}),
					/* @__PURE__ */ jsx(Philosophy, {}),
					/* @__PURE__ */ jsx(Panoroma, {
						src: "/Panorama.jpeg",
						title: "Walk Through the Home Theatre",
						description: "A full 360° look at the space every finish, every angle."
					}),
					/* @__PURE__ */ jsx(ProjectShowcase, {}),
					/* @__PURE__ */ jsx(TestimonialsSection, {})
				]
			})
		]
	})] });
};
//#endregion
export { HomePage as default };
