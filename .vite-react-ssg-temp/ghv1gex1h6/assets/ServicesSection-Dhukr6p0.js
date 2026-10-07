import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { jsx, jsxs } from "react/jsx-runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
//#region src/sections/ServicesSection.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/ServicesSection.tsx");
gsap.registerPlugin(ScrollTrigger);
var services = [
	{
		id: "01",
		title: "Home Interiors",
		slug: "home-interior-designs-hyderabad",
		description: "Curated, minimalist living spaces tailored to your daily rhythms. We bring your vision of home to life with precision.",
		image: "/home-interiors.webp"
	},
	{
		id: "02",
		title: "Commercial Spaces",
		slug: "commercial-interior-designers-in-hyderabad",
		description: "Photorealistic rendering and precise spatial planning designed to elevate customer experiences and brand identity.",
		image: "/projectsImg/banali/bf-img3.png"
	},
	{
		id: "03",
		title: "Office Environments",
		slug: "office-interior-designers-in-hyderabad",
		description: "High-end corporate environments that foster productivity, well-being, and modern collaboration.",
		image: "/office-spaces.webp"
	},
	{
		id: "04",
		title: "Virtual Design",
		slug: "2d-3d-interior-design-services-in-hyderabad",
		description: "Custom-crafted architectural layouts and 3D walkthroughs so you can experience your space before it's built.",
		image: "/projectsImg/varaprasad/vp-img15.png"
	}
];
var HorizontalServices = () => {
	const navigate = useNavigate();
	const sectionRef = useRef(null);
	const trackRef = useRef(null);
	useEffect(() => {
		const ctx = gsap.context(() => {
			const track = trackRef.current;
			const section = sectionRef.current;
			if (!track || !section) return;
			const percentToMove = -100 * ((services.length - 1) / services.length);
			const tween = gsap.to(track, {
				xPercent: percentToMove,
				ease: "none",
				scrollTrigger: {
					trigger: section,
					start: "top top",
					end: () => `+=${section.offsetWidth * (services.length - 1)}`,
					pin: true,
					scrub: 1,
					snap: {
						snapTo: 1 / (services.length - 1),
						duration: {
							min: .2,
							max: .5
						},
						delay: .1,
						ease: "power1.inOut"
					},
					invalidateOnRefresh: true
				}
			});
			return () => {
				tween.scrollTrigger?.kill();
				tween.kill();
			};
		}, sectionRef);
		return () => ctx.revert();
	}, []);
	return /* @__PURE__ */ jsx("section", {
		ref: sectionRef,
		className: "relative h-screen bg-[#f7f4ee] antialiased overflow-hidden",
		children: /* @__PURE__ */ jsxs("div", {
			className: "h-screen flex flex-col justify-center overflow-hidden py-6 md:py-12",
			children: [/* @__PURE__ */ jsx("div", {
				className: "shrink-0 w-full px-4 pb-4 md:pb-6 text-center z-20",
				children: /* @__PURE__ */ jsxs("h2", {
					className: "text-[#4a1c13] font-primary text-[clamp(32px,5vw,72px)] leading-[1.05] tracking-tight",
					children: [
						"We Do What",
						" ",
						/* @__PURE__ */ jsx("span", {
							className: "text-[#ff7043] font-primary",
							children: "We Know"
						})
					]
				})
			}), /* @__PURE__ */ jsx("div", {
				className: "relative w-full flex-1 min-h-0 max-h-[460px] md:max-h-[640px] overflow-hidden",
				children: /* @__PURE__ */ jsx("div", {
					ref: trackRef,
					className: "flex h-full items-start will-change-transform transform-gpu",
					style: { width: `${services.length * 100}%` },
					children: services.map((service) => /* @__PURE__ */ jsx("div", {
						className: "h-full flex justify-center px-4 md:px-8",
						style: { width: `${100 / services.length}%` },
						children: /* @__PURE__ */ jsxs("div", {
							className: "\r\n                    relative\r\n                    w-full\r\n                    max-w-[1400px]\r\n                    h-full\r\n                    bg-[#2a110b]\r\n                    rounded-[2rem]\r\n                    md:rounded-[3rem]\r\n                    overflow-hidden\r\n                    group\r\n                    shadow-2xl\r\n                  ",
							children: [
								/* @__PURE__ */ jsx("img", {
									src: service.image,
									alt: service.title,
									className: "absolute inset-0 w-full h-full object-cover opacity-70 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
								}),
								/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-700 group-hover:opacity-80" }),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute bottom-0 left-0 w-full p-8 md:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex-1 max-w-2xl",
										children: [/* @__PURE__ */ jsx("h3", {
											className: "text-white text-4xl md:text-5xl font-medium font-primary tracking-tight mt-2 mb-4 md:mb-6 drop-shadow-lg",
											children: service.title
										}), /* @__PURE__ */ jsx("p", {
											className: "text-white/80 text-sm md:text-lg leading-relaxed md:leading-loose font-secondary",
											children: service.description
										})]
									}), /* @__PURE__ */ jsx("button", {
										className: "shrink-0 w-fit h-fit bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 hover:bg-[#ff7043] hover:border-[#ff7043] hover:shadow-[0_0_30px_rgba(255,112,67,0.4)]",
										onClick: () => navigate(`/services/${service.slug}`),
										children: "Explore Service"
									})]
								})
							]
						})
					}, service.id))
				})
			})]
		})
	});
};
//#endregion
export { HorizontalServices as default };
