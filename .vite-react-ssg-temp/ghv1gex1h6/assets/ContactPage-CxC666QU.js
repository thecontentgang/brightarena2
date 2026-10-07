import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/ContactPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ContactPage.tsx");
var smoothEase = [
	.22,
	1,
	.36,
	1
];
var fadeUp = {
	hidden: {
		opacity: 0,
		y: 40
	},
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: .8,
			ease: smoothEase
		}
	}
};
var staggerContainer = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: .15 }
	}
};
function ContactPage() {
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Contact - Bright Arena Interiors Interior Designers in Hyderabad",
		description: "Contact Bright Arena Interiors, trusted interior designers in Hyderabad, to discuss your home or office interior project and book a free consultation today.",
		url: "https://www.brightarenainteriors.com/contact"
	}), /* @__PURE__ */ jsxs("main", {
		className: "bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24",
		children: [
			/* @__PURE__ */ jsxs("header", {
				"aria-labelledby": "contact-heading",
				className: "pt-32 pb-12 md:pt-48 md:pb-16 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center",
				children: [/* @__PURE__ */ jsx(motion.span, {
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
					className: "text-[#ff7043] text-xs md:text-sm tracking-[0.3em] uppercase font-bold block mb-6",
					children: "Get In Touch"
				}), /* @__PURE__ */ jsxs(motion.h1, {
					id: "contact-heading",
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
					className: "text-[clamp(40px,7vw,96px)] font-primary font-light leading-[1.05] tracking-tight mb-8",
					children: [
						"Let's build something ",
						/* @__PURE__ */ jsx("br", {}),
						/* @__PURE__ */ jsx("span", {
							className: "italic font-serif text-[#ff7043]",
							children: "beautiful."
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-label": "Contact Information and Inquiry Form",
				className: "px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-24",
				children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start",
					children: [/* @__PURE__ */ jsxs(motion.div, {
						initial: "hidden",
						whileInView: "visible",
						viewport: {
							once: true,
							margin: "-50px"
						},
						variants: staggerContainer,
						className: "flex flex-col gap-12",
						children: [/* @__PURE__ */ jsx(motion.div, {
							variants: fadeUp,
							className: "w-full aspect-[4/3] rounded-3xl overflow-hidden bg-[#e8e5de]",
							children: /* @__PURE__ */ jsx("img", {
								src: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop",
								alt: "Luxury interior design materials and architectural swatches at Bright Arena studio",
								fetchPriority: "high",
								loading: "eager",
								decoding: "async",
								className: "w-full h-full object-cover"
							})
						}), /* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 md:grid-cols-2 gap-8",
							children: [/* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								children: [/* @__PURE__ */ jsx("h3", {
									className: "text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4",
									children: "Headquarters"
								}), /* @__PURE__ */ jsxs("address", {
									className: "not-italic text-[#4a1c13] text-base leading-relaxed font-medium",
									children: [
										"4th Floor, 23 Nordwest, ",
										/* @__PURE__ */ jsx("br", {}),
										"P Janardhan Reddy Nagar, ",
										/* @__PURE__ */ jsx("br", {}),
										"Gachibowli, Hyderabad, ",
										/* @__PURE__ */ jsx("br", {}),
										"Telangana 500032"
									]
								})]
							}), /* @__PURE__ */ jsxs(motion.div, {
								variants: fadeUp,
								className: "flex flex-col gap-8",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4",
									children: "Direct"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-col gap-2 font-medium",
									children: [/* @__PURE__ */ jsx("a", {
										href: "tel:+918978222980",
										"aria-label": "Call us at +91-8978222980",
										className: "hover:text-[#ff7043] transition-colors duration-300",
										children: "+91 8978 222 980"
									}), /* @__PURE__ */ jsx("a", {
										href: "mailto:info@brightarenainteriors.com",
										"aria-label": "Email us at info@brightarenainteriors.com",
										className: "hover:text-[#ff7043] transition-colors duration-300",
										children: "info@brightarenainteriors.com"
									})]
								})] }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-4",
									children: "Follow Us"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex items-center gap-4",
									children: [{
										name: "Instagram",
										url: "https://www.instagram.com/brightarenainteriors"
									}, {
										name: "YouTube",
										url: "https://www.youtube.com/@brightarenainteriors"
									}].map((social) => /* @__PURE__ */ jsx("a", {
										href: social.url,
										target: "_blank",
										rel: "noopener noreferrer",
										"aria-label": `Follow Bright Arena on ${social.name}`,
										className: "text-sm font-medium hover:text-[#ff7043] transition-colors duration-300",
										children: social.name
									}, social.name))
								})] })]
							})]
						})]
					}), /* @__PURE__ */ jsxs(motion.div, {
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
							duration: .8,
							ease: smoothEase,
							delay: .2
						},
						className: "bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 shadow-sm border border-[#4a1c13]/5",
						children: [
							/* @__PURE__ */ jsx("h2", {
								className: "text-3xl font-primary mb-2",
								children: "Project Inquiry"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[#4a1c13]/60 text-sm mb-10 leading-relaxed",
								children: "Please provide a few details about your project, and our design team will get back to you within 24-48 hours."
							}),
							/* @__PURE__ */ jsxs("form", {
								className: "flex flex-col gap-8",
								onSubmit: (e) => e.preventDefault(),
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-8",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "name",
												className: "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60",
												children: "Full Name *"
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												id: "name",
												required: true,
												className: "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none",
												placeholder: "John Doe"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "email",
												className: "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60",
												children: "Email Address *"
											}), /* @__PURE__ */ jsx("input", {
												type: "email",
												id: "email",
												required: true,
												className: "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none",
												placeholder: "john@example.com"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "grid grid-cols-1 md:grid-cols-2 gap-8",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "phone",
												className: "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60",
												children: "Phone Number"
											}), /* @__PURE__ */ jsx("input", {
												type: "tel",
												id: "phone",
												className: "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors rounded-none",
												placeholder: "+91 XXXXX XXXXX"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col gap-2",
											children: [/* @__PURE__ */ jsx("label", {
												htmlFor: "type",
												className: "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60",
												children: "Project Type"
											}), /* @__PURE__ */ jsxs("select", {
												id: "type",
												defaultValue: "",
												className: "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors appearance-none rounded-none cursor-pointer",
												children: [
													/* @__PURE__ */ jsx("option", {
														value: "",
														disabled: true,
														children: "Select a category..."
													}),
													/* @__PURE__ */ jsx("option", {
														value: "residential",
														children: "Residential Interior"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "commercial",
														children: "Commercial / Office"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "architecture",
														children: "Architecture"
													}),
													/* @__PURE__ */ jsx("option", {
														value: "furniture",
														children: "Bespoke Furniture"
													})
												]
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-2",
										children: [/* @__PURE__ */ jsx("label", {
											htmlFor: "message",
											className: "text-xs font-bold tracking-widest uppercase text-[#4a1c13]/60",
											children: "Project Details"
										}), /* @__PURE__ */ jsx("textarea", {
											id: "message",
											rows: 4,
											className: "w-full bg-transparent border-b border-[#4a1c13]/20 py-3 text-base text-[#4a1c13] focus:outline-none focus:border-[#ff7043] transition-colors resize-none rounded-none",
											placeholder: "Tell us about your vision, timeline, and space..."
										})]
									}),
									/* @__PURE__ */ jsx("button", {
										type: "submit",
										className: "mt-4 bg-[#4a1c13] text-white py-5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-[#ff7043] transition-colors duration-500 w-full md:w-auto md:px-12 self-start",
										children: "Send Inquiry"
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				"aria-label": "Studio Location Map",
				className: "px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto",
				children: /* @__PURE__ */ jsxs(motion.div, {
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
						duration: .8,
						ease: smoothEase
					},
					className: "flex flex-col gap-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center text-center mb-4",
						children: [/* @__PURE__ */ jsx("h2", {
							className: "text-2xl md:text-4xl font-primary leading-tight mb-3",
							children: "Visit Our Office"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[#4a1c13]/60 text-sm md:text-base max-w-md",
							children: "We'd love to host you for a coffee and a conversation about your upcoming project."
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "w-full h-[350px] md:h-[500px] rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-sm border border-[#4a1c13]/5 group bg-[#e8e5de]",
						children: /* @__PURE__ */ jsx("iframe", {
							title: "Bright Arena Interiors Studio Location Map in Gachibowli, Hyderabad",
							src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2691.5108603682183!2d78.36538624751807!3d17.441940515237768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb934fc43492d7%3A0xb4afd24eb829f868!2sBright%20Arena%20Interiors!5e0!3m2!1sen!2sin!4v1784722465708!5m2!1sen!2sin",
							width: "100%",
							height: "100%",
							style: { border: 0 },
							allowFullScreen: false,
							loading: "lazy",
							referrerPolicy: "no-referrer-when-downgrade",
							className: "grayscale-[80%] contrast-[1.1] opacity-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100 transition-all duration-700 ease-in-out"
						})
					})]
				})
			})
		]
	})] });
}
//#endregion
export { ContactPage as default };
