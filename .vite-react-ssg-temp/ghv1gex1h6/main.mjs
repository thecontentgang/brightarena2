import React, { Suspense, useEffect, useRef, useState } from "react";
import { ViteReactSSG } from "vite-react-ssg";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useInView, useMotionValueEvent, useScroll } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import gsap from "gsap";
//#region src/components/ProjectModal.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/ProjectModal.tsx");
var smoothEase$2 = [
	.22,
	1,
	.36,
	1
];
var servicesList = [
	"Full Interior Design",
	"Renovation",
	"Consultation",
	"Custom Furniture"
];
var sqFtRanges = [
	"1000 - 2000",
	"2000 - 3000",
	"3000+"
];
var budgetRanges = [
	"₹15L - 25L",
	"₹25L - 40L",
	"₹40L - 50L",
	"₹50L+"
];
var EMAILJS_SERVICE_ID = "service_ke4znln";
var EMAILJS_TEMPLATE_ID = "template_ocflmwl";
var EMAILJS_PUBLIC_KEY = "aAv_ILGblFidSWOIQ";
var ProjectModal = ({ isOpen, onClose }) => {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [projectType, setProjectType] = useState("Residential");
	const [selectedService, setSelectedService] = useState("");
	const [selectedSqFt, setSelectedSqFt] = useState("");
	const [selectedBudget, setSelectedBudget] = useState("");
	const [submitStatus, setSubmitStatus] = useState("idle");
	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "unset";
		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);
	const resetForm = () => {
		setName("");
		setPhone("");
		setEmail("");
		setProjectType("Residential");
		setSelectedService("");
		setSelectedSqFt("");
		setSelectedBudget("");
		setSubmitStatus("idle");
	};
	const handleClose = () => {
		if (submitStatus === "sending") return;
		resetForm();
		onClose();
	};
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (submitStatus === "sending") return;
		const cleanPhone = phone.replace(/\D/g, "");
		if (!name.trim() || cleanPhone.length !== 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !selectedService || !selectedSqFt || !selectedBudget) {
			setSubmitStatus("error");
			return;
		}
		try {
			setSubmitStatus("sending");
			await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
				name: name.trim(),
				phone: cleanPhone,
				email: email.trim(),
				project_type: projectType,
				service: selectedService,
				area: selectedSqFt,
				budget: selectedBudget
			}, { publicKey: EMAILJS_PUBLIC_KEY });
			setSubmitStatus("success");
			setTimeout(() => {
				resetForm();
				onClose();
			}, 1800);
		} catch (error) {
			console.error("EmailJS project enquiry error:", error);
			setSubmitStatus("error");
		}
	};
	return /* @__PURE__ */ jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 antialiased",
		children: [/* @__PURE__ */ jsx(motion.div, {
			initial: { opacity: 0 },
			animate: { opacity: 1 },
			exit: { opacity: 0 },
			transition: {
				duration: .4,
				ease: smoothEase$2
			},
			className: "absolute inset-0 bg-black/50 backdrop-blur-md cursor-pointer",
			onClick: handleClose,
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsxs(motion.div, {
			initial: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .95,
				y: 15
			},
			transition: {
				duration: .4,
				ease: smoothEase$2
			},
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "modal-title",
			className: "relative w-full max-w-md max-h-[92vh] sm:max-h-[90vh] bg-white rounded-[1.25rem] shadow-2xl flex flex-col overflow-hidden",
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between px-5 sm:px-6 pt-5 pb-3 border-b border-gray-100 bg-white z-10",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "inline-flex items-center gap-1.5 mb-2 px-2.5 py-1 rounded-full bg-[#ff7043]/10 text-[#ff7043] text-[9px] font-bold uppercase tracking-[0.14em]",
						children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[#ff7043]" }), "Start Your Project"]
					}),
					/* @__PURE__ */ jsx("h3", {
						id: "modal-title",
						className: "text-[18px] sm:text-[19px] font-bold text-[#4a1c13] leading-tight font-primary",
						children: "Tell us about your project"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "text-[12px] text-[#6B5C57] mt-1",
						children: "Share a few details and we'll get back to you."
					})
				] }), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: handleClose,
					disabled: submitStatus === "sending",
					"aria-label": "Close modal",
					className: "w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-gray-100 hover:text-[#4a1c13] transition-colors shrink-0 disabled:opacity-40",
					children: /* @__PURE__ */ jsx("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 14 14",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						"aria-hidden": "true",
						children: /* @__PURE__ */ jsx("path", { d: "M13 1L1 13M1 1l12 12" })
					})
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "p-5 sm:p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
				children: /* @__PURE__ */ jsxs("form", {
					className: "space-y-4",
					onSubmit: handleSubmit,
					noValidate: true,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "client-name",
									className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
									children: "Name"
								}), /* @__PURE__ */ jsx("input", {
									id: "client-name",
									type: "text",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Your Name",
									autoComplete: "name",
									className: "w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all",
									required: true
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									htmlFor: "client-phone",
									className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
									children: "Phone"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center w-full bg-gray-50 border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#ff7043]/30 focus-within:border-[#ff7043] transition-all",
									children: [/* @__PURE__ */ jsx("span", {
										className: "pl-3 pr-2 text-[#4a1c13]/60 text-[13px] font-medium select-none border-r border-gray-200 py-2.5",
										children: "+91"
									}), /* @__PURE__ */ jsx("input", {
										id: "client-phone",
										type: "tel",
										value: phone,
										onChange: (e) => {
											const value = e.target.value.replace(/\D/g, "").slice(0, 10);
											setPhone(value);
										},
										placeholder: "Mobile number",
										autoComplete: "tel",
										inputMode: "numeric",
										className: "w-full bg-transparent text-[#4a1c13] text-[13px] px-2 py-2.5 placeholder:text-gray-400 focus:outline-none",
										required: true
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								htmlFor: "client-email",
								className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
								children: "Email Address"
							}), /* @__PURE__ */ jsx("input", {
								id: "client-email",
								type: "email",
								value: email,
								onChange: (e) => setEmail(e.target.value),
								placeholder: "you@example.com",
								autoComplete: "email",
								className: "w-full bg-gray-50 border border-gray-200 text-[#4a1c13] text-[13px] rounded-lg px-3 py-2.5 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ff7043]/30 focus:border-[#ff7043] transition-all",
								required: true
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								id: "project-type-label",
								className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
								children: "Project Type"
							}), /* @__PURE__ */ jsxs("div", {
								role: "radiogroup",
								"aria-labelledby": "project-type-label",
								className: "flex p-1 bg-gray-100 rounded-lg relative",
								children: [/* @__PURE__ */ jsx(motion.div, {
									className: "absolute inset-y-1 bg-white rounded-md shadow-sm",
									initial: false,
									animate: {
										left: projectType === "Residential" ? "4px" : "50%",
										width: "calc(50% - 4px)"
									},
									transition: {
										type: "spring",
										stiffness: 400,
										damping: 30
									}
								}), ["Residential", "Commercial"].map((type) => /* @__PURE__ */ jsx("button", {
									type: "button",
									role: "radio",
									"aria-checked": projectType === type,
									onClick: () => setProjectType(type),
									className: `relative w-1/2 py-2 text-[12px] font-bold tracking-wide rounded-md transition-colors z-10 ${projectType === type ? "text-[#4a1c13]" : "text-gray-500 hover:text-[#4a1c13]"}`,
									children: type
								}, type))]
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								id: "service-req-label",
								className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
								children: "Service Required"
							}), /* @__PURE__ */ jsx("div", {
								role: "radiogroup",
								"aria-labelledby": "service-req-label",
								className: "grid grid-cols-2 gap-1.5",
								children: servicesList.map((service) => /* @__PURE__ */ jsx("button", {
									type: "button",
									role: "radio",
									"aria-checked": selectedService === service,
									onClick: () => setSelectedService(service),
									className: `py-2 px-2 text-[11px] font-medium rounded-lg border transition-all duration-200 ${selectedService === service ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm" : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"}`,
									children: service
								}, service))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								id: "area-label",
								className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
								children: "Area (Sq Ft)"
							}), /* @__PURE__ */ jsx("div", {
								role: "radiogroup",
								"aria-labelledby": "area-label",
								className: "grid grid-cols-3 gap-1.5",
								children: sqFtRanges.map((range) => /* @__PURE__ */ jsx("button", {
									type: "button",
									role: "radio",
									"aria-checked": selectedSqFt === range,
									onClick: () => setSelectedSqFt(range),
									className: `py-2 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${selectedSqFt === range ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm" : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"}`,
									children: range
								}, range))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ jsx("label", {
								id: "budget-label",
								className: "text-[10px] font-bold text-[#4a1c13] uppercase tracking-wide",
								children: "Estimated Budget"
							}), /* @__PURE__ */ jsx("div", {
								role: "radiogroup",
								"aria-labelledby": "budget-label",
								className: "grid grid-cols-2 gap-1.5",
								children: budgetRanges.map((range) => /* @__PURE__ */ jsx("button", {
									type: "button",
									role: "radio",
									"aria-checked": selectedBudget === range,
									onClick: () => setSelectedBudget(range),
									className: `py-2 px-1 text-[11px] font-medium rounded-lg border transition-all duration-200 whitespace-nowrap ${selectedBudget === range ? "bg-[#ff7043]/10 border-[#ff7043] text-[#ff7043] font-bold shadow-sm" : "bg-gray-50 border-gray-200 text-[#6B5C57] hover:border-[#ff7043]/50 hover:bg-gray-100"}`,
									children: range
								}, range))
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "pt-1",
							children: [
								/* @__PURE__ */ jsx(motion.button, {
									whileHover: submitStatus !== "sending" ? {
										scale: 1.02,
										backgroundColor: "#e65a2d"
									} : void 0,
									whileTap: submitStatus !== "sending" ? { scale: .98 } : void 0,
									type: "submit",
									disabled: submitStatus === "sending",
									className: "w-full bg-[#ff7043] text-white py-3 rounded-lg text-[13px] font-bold tracking-wide shadow-md shadow-[#ff7043]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed",
									children: submitStatus === "sending" ? "Sending Request..." : "Submit Request"
								}),
								/* @__PURE__ */ jsx(AnimatePresence, { children: submitStatus === "success" && /* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									className: "mt-3 rounded-xl bg-green-50 border border-green-200 px-4 py-3 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[12px] font-semibold text-green-700",
										children: "✓ Request sent successfully"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-green-600 mt-1",
										children: "Our team will contact you shortly."
									})]
								}) }),
								/* @__PURE__ */ jsx(AnimatePresence, { children: submitStatus === "error" && /* @__PURE__ */ jsxs(motion.div, {
									initial: {
										opacity: 0,
										y: 8,
										height: 0
									},
									animate: {
										opacity: 1,
										y: 0,
										height: "auto"
									},
									exit: {
										opacity: 0,
										y: -8,
										height: 0
									},
									className: "mt-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-center",
									children: [/* @__PURE__ */ jsx("p", {
										className: "text-[12px] font-semibold text-red-700",
										children: "Unable to send your request"
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[11px] text-red-600 mt-1",
										children: "Please check your details and try again."
									})]
								}) }),
								/* @__PURE__ */ jsx("p", {
									className: "text-[9px] text-gray-400 text-center mt-2.5",
									children: "Your information is only used to contact you about your project."
								})
							]
						})
					]
				})
			})]
		})]
	}) });
};
//#endregion
//#region src/components/Navbar.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/Navbar.tsx");
var navItems = [
	{
		name: "Services",
		path: "/services"
	},
	{
		name: "Portfolio",
		path: "/portfolio"
	},
	{
		name: "Designs",
		path: "/designs"
	},
	{
		name: "About",
		path: "/about"
	},
	{
		name: "Testimonials",
		path: "/testimonials"
	},
	{
		name: "Blogs",
		path: "/blogs"
	},
	{
		name: "Contact",
		path: "/contact"
	}
];
var smoothEase$1 = [
	.22,
	1,
	.36,
	1
];
var Header = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDesktopExpanded, setIsDesktopExpanded] = useState(true);
	const [isMobileOpen, setIsMobileOpen] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isScrolled, setIsScrolled] = useState(false);
	const { scrollY } = useScroll();
	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() || 0;
		setIsScrolled(latest > 50);
		if (latest <= 50) setIsDesktopExpanded(true);
		else if (latest > previous && latest > 50) setIsDesktopExpanded(false);
		else if (latest < previous) setIsDesktopExpanded(true);
	});
	const desktopLinkVariants = {
		hidden: {
			opacity: 0,
			y: 10,
			filter: "blur(4px)"
		},
		visible: (i) => ({
			opacity: 1,
			y: 0,
			filter: "blur(0px)",
			transition: {
				duration: .6,
				ease: smoothEase$1,
				delay: .15 + i * .05
			}
		}),
		exit: {
			opacity: 0,
			y: -5,
			filter: "blur(2px)",
			transition: { duration: .2 }
		}
	};
	const mobileLinkVariants = {
		hidden: {
			opacity: 0,
			x: -10,
			filter: "blur(4px)"
		},
		visible: (i) => ({
			opacity: 1,
			x: 0,
			filter: "blur(0px)",
			transition: {
				duration: .5,
				ease: smoothEase$1,
				delay: .1 + i * .05
			}
		}),
		exit: {
			opacity: 0,
			x: -5,
			filter: "blur(2px)",
			transition: { duration: .2 }
		}
	};
	const glassClasses = isScrolled ? "bg-white/60 backdrop-blur-xl border border-white/50" : "bg-white/30 backdrop-blur-lg border border-white/30";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("header", {
		className: "fixed top-0 left-0 w-full z-50 flex items-start justify-between px-4 py-4 md:px-5 md:py-5 lg:px-10 pointer-events-none antialiased",
		children: [
			/* @__PURE__ */ jsx(motion.div, {
				className: `pointer-events-auto hidden lg:flex items-center justify-center h-[52px] cursor-pointer rounded-[1rem] px-4 transition-all duration-500 ${glassClasses}`,
				whileHover: { scale: 1.02 },
				transition: {
					duration: .4,
					ease: smoothEase$1
				},
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "inline-flex items-center justify-center h-full",
					children: /* @__PURE__ */ jsx("img", {
						src: "/bright-logo1.png",
						alt: "Bright Arena LOGO",
						className: "h-9 w-auto object-contain"
					})
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-auto hidden lg:flex justify-end font-secondary pt-1 p-4 -mr-4",
				onMouseEnter: () => setIsDesktopExpanded(true),
				onMouseLeave: () => setHoveredIndex(null),
				children: /* @__PURE__ */ jsxs(motion.nav, {
					layout: true,
					transition: {
						duration: .6,
						ease: smoothEase$1
					},
					className: `flex items-center h-[52px] p-[6px] rounded-[1rem] ${isDesktopExpanded ? "bg-white shadow-md border border-white" : glassClasses}`,
					children: [/* @__PURE__ */ jsx(AnimatePresence, {
						mode: "wait",
						children: isDesktopExpanded ? /* @__PURE__ */ jsx(motion.div, {
							initial: {
								width: 0,
								opacity: 0
							},
							animate: {
								width: "auto",
								opacity: 1
							},
							exit: {
								width: 0,
								opacity: 0
							},
							transition: {
								duration: .5,
								ease: smoothEase$1
							},
							className: "flex items-center overflow-hidden",
							children: /* @__PURE__ */ jsx("div", {
								className: "flex items-center space-x-1 px-4 py-1 whitespace-nowrap relative",
								children: navItems.map((item, i) => /* @__PURE__ */ jsxs(motion.div, {
									custom: i,
									variants: desktopLinkVariants,
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									onMouseEnter: () => setHoveredIndex(i),
									className: "relative",
									children: [hoveredIndex === i && /* @__PURE__ */ jsx(motion.div, {
										layoutId: "desktop-nav-pill",
										className: "absolute inset-0 bg-[#ff7043] rounded-[0.8rem] z-0",
										initial: { opacity: 0 },
										animate: { opacity: 1 },
										exit: { opacity: 0 },
										transition: {
											type: "spring",
											stiffness: 350,
											damping: 30
										}
									}), /* @__PURE__ */ jsx(Link, {
										to: item.path,
										className: "text-[#4a1c13] text-[15px] font-bold tracking-wide relative z-10 px-4 py-2 block transition-colors duration-300 hover:text-white",
										children: item.name
									})]
								}, item.name))
							})
						}, "expanded") : /* @__PURE__ */ jsx(motion.div, {
							initial: {
								opacity: 0,
								scale: .8
							},
							animate: {
								opacity: 1,
								scale: 1
							},
							exit: {
								opacity: 0,
								scale: .8
							},
							transition: {
								duration: .3,
								ease: smoothEase$1
							},
							className: "px-5 flex items-center justify-center text-[#4a1c13] hover:text-[#ff7043] transition-colors duration-300 group",
							children: /* @__PURE__ */ jsxs("svg", {
								width: "20",
								height: "14",
								viewBox: "0 0 20 14",
								fill: "none",
								xmlns: "http://www.w3.org/2000/svg",
								className: "overflow-visible",
								children: [
									/* @__PURE__ */ jsx(motion.line, {
										x1: "0",
										y1: "1",
										x2: "20",
										y2: "1",
										stroke: "currentColor",
										strokeWidth: "1.75",
										strokeLinecap: "round",
										className: "transition-all duration-300 group-hover:translate-x-[2px]"
									}),
									/* @__PURE__ */ jsx(motion.line, {
										x1: "0",
										y1: "7",
										x2: "14",
										y2: "7",
										stroke: "currentColor",
										strokeWidth: "1.75",
										strokeLinecap: "round",
										className: "transition-all duration-300 group-hover:w-full group-hover:translate-x-[-2px]"
									}),
									/* @__PURE__ */ jsx(motion.line, {
										x1: "0",
										y1: "13",
										x2: "18",
										y2: "13",
										stroke: "currentColor",
										strokeWidth: "1.75",
										strokeLinecap: "round",
										className: "transition-all duration-300 group-hover:translate-x-[1px]"
									})
								]
							})
						}, "collapsed")
					}), /* @__PURE__ */ jsx("div", {
						className: "h-full ml-2",
						children: /* @__PURE__ */ jsx(motion.button, {
							layout: true,
							whileHover: { backgroundColor: "#e65a2d" },
							onClick: () => setIsModalOpen(true),
							whileTap: { scale: .95 },
							transition: {
								duration: .3,
								ease: smoothEase$1
							},
							className: "bg-[#ff7043] text-white px-7 h-full rounded-[0.8rem] text-[14px] font-semibold tracking-wide relative z-10 flex items-center justify-center",
							children: "Talk Now"
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: "pointer-events-auto flex lg:hidden w-full",
				children: /* @__PURE__ */ jsxs(motion.nav, {
					layout: true,
					transition: {
						duration: .6,
						ease: smoothEase$1
					},
					className: `flex flex-col p-1.5 w-full mx-auto ${isMobileOpen ? "bg-white/95 backdrop-blur-3xl shadow-xl border border-white/60 rounded-[1.5rem]" : `${glassClasses} rounded-full`}`,
					children: [/* @__PURE__ */ jsxs(motion.div, {
						layout: true,
						className: "relative flex items-center justify-between w-full h-[48px] px-1.5",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "flex-1 flex justify-start",
								children: /* @__PURE__ */ jsx("button", {
									onClick: () => setIsMobileOpen(!isMobileOpen),
									"aria-expanded": isMobileOpen,
									"aria-label": isMobileOpen ? "Close mobile menu" : "Open mobile menu",
									className: "w-12 h-full flex items-center justify-center text-[#4a1c13]",
									children: /* @__PURE__ */ jsxs("div", {
										className: "w-5 h-[14px] flex flex-col justify-between relative",
										children: [
											/* @__PURE__ */ jsx(motion.span, {
												animate: isMobileOpen ? {
													rotate: 45,
													y: 6
												} : {
													rotate: 0,
													y: 0
												},
												transition: {
													duration: .4,
													ease: smoothEase$1
												},
												className: "w-full h-[1.75px] bg-current rounded-full origin-center"
											}),
											/* @__PURE__ */ jsx(motion.span, {
												animate: isMobileOpen ? {
													opacity: 0,
													x: -5
												} : {
													opacity: 1,
													x: 0
												},
												transition: {
													duration: .3,
													ease: smoothEase$1
												},
												className: "w-[70%] h-[1.75px] bg-current rounded-full ml-auto"
											}),
											/* @__PURE__ */ jsx(motion.span, {
												animate: isMobileOpen ? {
													rotate: -45,
													y: -6
												} : {
													rotate: 0,
													y: 0
												},
												transition: {
													duration: .4,
													ease: smoothEase$1
												},
												className: "w-full h-[1.75px] bg-current rounded-full origin-center"
											})
										]
									})
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute left-1/2 -translate-x-1/2 flex items-center justify-center",
								children: /* @__PURE__ */ jsx(Link, {
									to: "/",
									onClick: () => setIsMobileOpen(false),
									children: /* @__PURE__ */ jsx("img", {
										src: "/bright-logo1.png",
										alt: "Clickora Logo",
										className: "h-6 w-auto object-contain"
									})
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex-1 flex justify-end",
								children: /* @__PURE__ */ jsx(motion.button, {
									layout: true,
									whileTap: { scale: .95 },
									onClick: () => setIsModalOpen(true),
									className: "bg-[#ff7043] text-white px-4 py-2 rounded-full text-[12px] font-bold tracking-wide flex items-center justify-center whitespace-nowrap shadow-sm",
									children: "Talk Now"
								})
							})
						]
					}), /* @__PURE__ */ jsx(AnimatePresence, { children: isMobileOpen && /* @__PURE__ */ jsx(motion.div, {
						initial: {
							opacity: 0,
							height: 0
						},
						animate: {
							opacity: 1,
							height: "auto"
						},
						exit: {
							opacity: 0,
							height: 0
						},
						transition: {
							duration: .5,
							ease: smoothEase$1
						},
						className: "flex flex-col px-3 pt-6 pb-3 w-full",
						children: /* @__PURE__ */ jsx("div", {
							className: "flex flex-col space-y-1 mb-2",
							children: navItems.map((item, i) => /* @__PURE__ */ jsx(motion.div, {
								custom: i,
								variants: mobileLinkVariants,
								initial: "hidden",
								animate: "visible",
								exit: "exit",
								children: /* @__PURE__ */ jsx(Link, {
									to: item.path,
									onClick: () => setIsMobileOpen(false),
									className: "text-[#4a1c13] text-[16px] font-bold tracking-wide block hover:text-white hover:bg-[#ff7043] px-4 py-3.5 rounded-[1rem] transition-all duration-300",
									children: item.name
								})
							}, item.name))
						})
					}, "mobile-menu") })]
				})
			})
		]
	}), /* @__PURE__ */ jsx(ProjectModal, {
		isOpen: isModalOpen,
		onClose: () => setIsModalOpen(false)
	})] });
};
//#endregion
//#region src/components/Footer.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/Footer.tsx");
var smoothEase = [
	.22,
	1,
	.36,
	1
];
var quickLinks = [
	{
		name: "Home",
		href: "/"
	},
	{
		name: "About Us",
		href: "/about"
	},
	{
		name: "Services",
		href: "/services"
	},
	{
		name: "Portfolio",
		href: "/portfolio"
	},
	{
		name: "Blog",
		href: "/blogs"
	},
	{
		name: "Contact Us",
		href: "/contact"
	}
];
function CardFooter() {
	const containerRef = useRef(null);
	const isInView = useInView(containerRef, {
		once: true,
		margin: "-50px"
	});
	return /* @__PURE__ */ jsxs("footer", {
		ref: containerRef,
		className: "bg-[#f7f4ee] px-4 md:px-6 lg:px-8 pb-4 md:pb-6 lg:pb-8 pt-12 md:pt-24 flex flex-col gap-4 md:gap-6 max-w-[1600px] mx-auto antialiased",
		children: [/* @__PURE__ */ jsxs(motion.section, {
			initial: {
				opacity: 0,
				y: 50
			},
			animate: isInView ? {
				opacity: 1,
				y: 0
			} : {},
			transition: {
				duration: .9,
				ease: smoothEase
			},
			className: "relative overflow-hidden rounded-[32px] md:rounded-[40px] bg-[#4A1C13] px-6 py-10 md:px-16 lg:px-24",
			children: [/* @__PURE__ */ jsx("div", { className: "absolute -top-20 -right-10 h-64 w-64 rounded-full bg-[#ff7043]/10 blur-[80px]" }), /* @__PURE__ */ jsxs("div", {
				className: "relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "max-w-xl text-center lg:text-left",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "uppercase tracking-[0.2em] text-[#ff8c63] text-[10px] md:text-xs font-semibold",
							children: "Let's Build Something Beautiful"
						}),
						/* @__PURE__ */ jsxs("h2", {
							className: "mt-4 font-primary text-[clamp(32px,8vw,76px)] leading-[1] text-[#F8F5F1]",
							children: [
								"Spaces that tell",
								/* @__PURE__ */ jsx("br", {}),
								/* @__PURE__ */ jsx("span", {
									className: "italic text-[#ff8c63]",
									children: "your story."
								})
							]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 text-white/70 leading-7 text-sm md:text-base max-w-md mx-auto lg:mx-0",
							children: "Every exceptional interior starts with a conversation. Let's turn your vision into timeless architecture."
						})
					]
				}), /* @__PURE__ */ jsx("div", {
					className: "w-full max-w-xs md:max-w-sm",
					children: /* @__PURE__ */ jsxs("div", {
						className: "rounded-[24px] border border-white/10 bg-white/5 backdrop-blur-md p-6 md:p-8",
						children: [
							/* @__PURE__ */ jsx("h4", {
								className: "text-white text-lg md:text-xl font-primary",
								children: "Book a Free Consultation"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-2 text-white/60 text-xs md:text-sm leading-6",
								children: "Speak directly with our experts and receive personalized guidance."
							}),
							/* @__PURE__ */ jsxs("a", {
								href: "tel:+918978222980",
								className: "group mt-6 flex items-center justify-between rounded-full bg-[#ff7043] px-5 py-4 transition-all duration-500 hover:bg-[#ff8a63] text-sm",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-medium text-white truncate px-2",
									children: "+91 8978 222 980"
								}), /* @__PURE__ */ jsx("div", {
									className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#4A1C13] transition-transform duration-500 group-hover:translate-x-1",
									children: "→"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-6 flex items-center justify-center lg:justify-start gap-2 text-white/40 text-[10px] md:text-xs",
								children: [/* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-green-400" }), "Available Mon – Sat · 10:30 AM – 6 PM"]
							})
						]
					})
				})]
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
				duration: .8,
				ease: smoothEase,
				delay: .15
			},
			className: "bg-white rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-[#4a1c13]/5 shadow-sm flex flex-col justify-between gap-16 md:gap-24",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "md:col-span-5 flex flex-col justify-between",
						children: /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "mb-6 flex items-center",
							children: /* @__PURE__ */ jsx("img", {
								src: "/bright-logo.webp",
								alt: "Bright Arena Logo",
								className: "h-20 md:h-28 w-auto object-cover"
							})
						}), /* @__PURE__ */ jsx("p", {
							className: "text-[#4a1c13]/70 text-sm leading-relaxed max-w-sm",
							children: "Bright Arena offers the best interior design services in Hyderabad that reflect your unique style, beauty, and comfort in luxury. We specialize in crafting the best home interior design, commercial design, and office interior design."
						})] })
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-2 md:col-start-7",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-6",
							children: "Quick Links"
						}), /* @__PURE__ */ jsx("ul", {
							className: "space-y-4",
							children: quickLinks.map((link) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", {
								href: link.href,
								className: "text-sm text-[#4a1c13] font-medium hover:text-[#ff7043] transition-colors duration-300",
								children: link.name
							}) }, link.name))
						})]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-4",
						children: [/* @__PURE__ */ jsx("h4", {
							className: "text-[#4a1c13]/40 text-xs font-bold tracking-widest uppercase mb-6",
							children: "Our Address"
						}), /* @__PURE__ */ jsxs("address", {
							className: "not-italic text-sm text-[#4a1c13] space-y-2 font-medium max-w-[250px]",
							children: [/* @__PURE__ */ jsx("p", {
								className: "leading-relaxed",
								children: "4th Floor, 23 Nordwest, P Janardhan Reddy Nagar, Gachibowli, Hyderabad, Telangana 500032"
							}), /* @__PURE__ */ jsx("div", {
								className: "pt-4",
								children: /* @__PURE__ */ jsxs("a", {
									href: "tel:+918978222980",
									className: "flex items-center gap-2 hover:text-[#ff7043] transition-colors font-bold text-lg",
									children: [/* @__PURE__ */ jsx("svg", {
										width: "18",
										height: "18",
										viewBox: "0 0 24 24",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2",
										children: /* @__PURE__ */ jsx("path", {
											d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",
											strokeLinecap: "round",
											strokeLinejoin: "round"
										})
									}), "+91-8978 222 980"]
								})
							})]
						})]
					})
				]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col md:flex-row justify-center items-center gap-3 md:gap-4 pt-8 border-t border-[#4a1c13]/10 text-[#4a1c13]/50 text-[11px] md:text-xs tracking-wider font-medium text-center",
				children: [
					/* @__PURE__ */ jsxs("p", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" Bright Arena. All rights reserved."
					] }),
					/* @__PURE__ */ jsx("span", { className: "hidden md:block w-px h-3 bg-[#4a1c13]/20" }),
					/* @__PURE__ */ jsx("a", {
						href: "/privacy-policy",
						className: "hover:text-[#ff7043] transition-colors duration-300",
						children: "Privacy Policy"
					}),
					/* @__PURE__ */ jsx("span", { className: "hidden md:block w-px h-3 bg-[#4a1c13]/20" }),
					/* @__PURE__ */ jsxs("p", { children: [
						"Designed and built by",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "https://thecontentgang.com",
							target: "_blank",
							rel: "noopener noreferrer",
							className: "text-[#4a1c13]/80 hover:text-[#ff7043] hover:underline underline-offset-4 transition-colors duration-300",
							children: "thecontentgang.com"
						})
					] })
				]
			})]
		})]
	});
}
//#endregion
//#region src/components/PageTransitionLayout.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/PageTransitionLayout.tsx");
var PageTransitionLayout = ({ children }) => {
	const location = useLocation();
	const [displayLocation, setDisplayLocation] = useState(location);
	const containerRef = useRef(null);
	const tilesRef = useRef([]);
	const iconRef = useRef(null);
	useEffect(() => {
		if (location.pathname !== displayLocation.pathname) {
			const tl = gsap.timeline();
			gsap.set(containerRef.current, { pointerEvents: "auto" });
			tl.to(tilesRef.current, {
				scaleX: 1,
				transformOrigin: "left",
				duration: .6,
				stagger: .1,
				ease: "expo.inOut"
			}).to(iconRef.current, {
				opacity: 1,
				duration: .3,
				ease: "power2.out"
			}, "-=0.3").call(() => {
				setDisplayLocation(location);
				window.scrollTo(0, 0);
			}).to(iconRef.current, {
				opacity: 0,
				duration: .2,
				ease: "power2.in"
			}, "+=0.1").to(tilesRef.current, {
				scaleX: 0,
				transformOrigin: "right",
				duration: .6,
				stagger: .1,
				ease: "expo.inOut"
			}, "-=0.1").set(containerRef.current, { pointerEvents: "none" });
		}
	}, [location, displayLocation]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		ref: containerRef,
		className: "fixed inset-0 z-[9999] pointer-events-none flex flex-col",
		children: [[...Array(5)].map((_, i) => /* @__PURE__ */ jsx("div", {
			ref: (el) => {
				tilesRef.current[i] = el;
			},
			className: `w-full h-[20vh] scale-x-0 origin-left ${i === 2 ? "bg-[#f4f4f5]" : "bg-[#4a1c13]"}`
		}, i)), /* @__PURE__ */ jsx("div", {
			ref: iconRef,
			className: "absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none",
			children: /* @__PURE__ */ jsx(motion.div, {
				animate: { scale: [
					.95,
					1.02,
					.95
				] },
				transition: {
					repeat: Infinity,
					duration: 2,
					ease: "easeInOut"
				},
				children: /* @__PURE__ */ jsx("img", {
					src: "/bright-logo1.png",
					alt: "Bright Arena Logo",
					className: "w-32 md:w-48 h-auto object-contain"
				})
			})
		})]
	}), React.cloneElement(children, { location: displayLocation })] });
};
//#endregion
//#region src/components/SocialMediaBar.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/SocialMediaBar.tsx");
var FloatingSocialBar = () => {
	const [showScrollTop, setShowScrollTop] = useState(false);
	const [showSocialBar, setShowSocialBar] = useState(false);
	const lastScrollY = useRef(0);
	useEffect(() => {
		const heroHeight = typeof window !== "undefined" ? window.innerHeight * .9 : 0;
		const handleScroll = () => {
			const currentScroll = window.scrollY;
			setShowScrollTop(currentScroll > 300);
			if (currentScroll < heroHeight) setShowSocialBar(false);
			else if (currentScroll < lastScrollY.current) setShowSocialBar(true);
			else if (currentScroll > lastScrollY.current) setShowSocialBar(false);
			lastScrollY.current = currentScroll;
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const socials = [
		{
			name: "WhatsApp",
			href: "https://wa.me/8978222980",
			color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
			icon: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				className: "w-[18px] h-[18px]",
				children: /* @__PURE__ */ jsx("path", { d: "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.48 1.32 5l-1.4 5.12 5.24-1.37c1.46.8 3.1 1.22 4.76 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.11.81.83-3.03-.2-.31a8.18 8.18 0 0 1-1.26-4.4c0-4.54 3.7-8.22 8.24-8.22Zm-4.52 4.36c-.16 0-.42.06-.64.31s-.85.83-.85 2.02.87 2.35.99 2.51c.12.16 1.7 2.65 4.21 3.65 2.09.83 2.51.66 2.97.62.46-.04 1.48-.6 1.68-1.19.21-.58.21-1.08.15-1.18-.06-.11-.22-.17-.46-.29-.24-.12-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.12-.17.24-.65.81-.79.98-.15.16-.29.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.44-1.35-1.68-.14-.24-.02-.37.11-.49.11-.11.24-.29.36-.43.12-.15.16-.24.24-.4.08-.16.04-.31-.02-.43-.06-.12-.56-1.37-.78-1.87-.2-.5-.41-.43-.56-.44-.14-.01-.31-.01-.47-.01Z" })
			})
		},
		{
			name: "Call Us",
			href: "tel:+918978222980",
			color: "hover:bg-[#4a1c13] hover:text-white hover:border-[#4a1c13]",
			icon: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "w-[18px] h-[18px]",
				children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" })
			})
		},
		{
			name: "Instagram",
			href: "https://www.instagram.com/brightarenainteriors",
			color: "hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C]",
			icon: /* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "w-[18px] h-[18px]",
				children: [
					/* @__PURE__ */ jsx("rect", {
						x: "2",
						y: "2",
						width: "20",
						height: "20",
						rx: "5",
						ry: "5"
					}),
					/* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
					/* @__PURE__ */ jsx("line", {
						x1: "17.5",
						y1: "6.5",
						x2: "17.51",
						y2: "6.5"
					})
				]
			})
		},
		{
			name: "YouTube",
			href: "https://www.youtube.com/@brightarenainteriors",
			color: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
			icon: /* @__PURE__ */ jsx("svg", {
				viewBox: "0 0 24 24",
				fill: "currentColor",
				className: "w-[18px] h-[18px]",
				children: /* @__PURE__ */ jsx("path", { d: "M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" })
			})
		}
	];
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3",
		children: [/* @__PURE__ */ jsx(AnimatePresence, { children: showSocialBar && /* @__PURE__ */ jsx(motion.div, {
			initial: {
				opacity: 0,
				x: 60
			},
			animate: {
				opacity: 1,
				x: 0
			},
			exit: {
				opacity: 0,
				x: 60
			},
			transition: {
				duration: .35,
				ease: "easeInOut"
			},
			className: "flex flex-col items-center gap-2 bg-white/70 backdrop-blur-md p-2 rounded-full shadow-lg border border-white/50",
			children: socials.map((social) => /* @__PURE__ */ jsxs("a", {
				href: social.href,
				target: "_blank",
				rel: "noopener noreferrer",
				"aria-label": social.name,
				className: `relative group flex items-center justify-center w-11 h-11 shrink-0 rounded-full text-[#4a1c13] bg-white border border-[#4a1c13]/10 shadow-sm transition-colors duration-300 ${social.color}`,
				children: [social.icon, /* @__PURE__ */ jsxs("span", {
					className: "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-[#4a1c13] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
					children: [social.name, /* @__PURE__ */ jsx("span", { className: "absolute right-[-4px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[4px] border-y-transparent border-l-[#4a1c13]" })]
				})]
			}, social.name))
		}) }), /* @__PURE__ */ jsx(AnimatePresence, { children: showScrollTop && /* @__PURE__ */ jsxs(motion.button, {
			initial: {
				opacity: 0,
				scale: .5,
				y: 20
			},
			animate: {
				opacity: 1,
				scale: 1,
				y: 0
			},
			exit: {
				opacity: 0,
				scale: .5,
				y: 20
			},
			transition: {
				duration: .3,
				type: "spring",
				stiffness: 200,
				damping: 20
			},
			onClick: scrollToTop,
			"aria-label": "Scroll to top",
			className: "group relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#ff7043] text-white shadow-lg transition-colors duration-300 hover:bg-[#4a1c13] hover:shadow-xl",
			children: [/* @__PURE__ */ jsxs("svg", {
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2.5",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: "w-[18px] h-[18px] transition-transform duration-300 group-hover:-translate-y-1",
				children: [/* @__PURE__ */ jsx("line", {
					x1: "12",
					y1: "19",
					x2: "12",
					y2: "5"
				}), /* @__PURE__ */ jsx("polyline", { points: "5 12 12 5 19 12" })]
			}), /* @__PURE__ */ jsxs("span", {
				className: "pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-2 whitespace-nowrap rounded-md bg-[#4a1c13] px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100",
				children: ["Top", /* @__PURE__ */ jsx("span", { className: "absolute right-[-4px] top-1/2 h-0 w-0 -translate-y-1/2 border-y-[4px] border-l-[4px] border-y-transparent border-l-[#4a1c13]" })]
			})]
		}) })]
	});
};
//#endregion
//#region src/components/BreadCrumb.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/BreadCrumb.tsx");
var Breadcrumb = () => {
	const location = useLocation();
	const [isTop, setIsTop] = useState(true);
	useEffect(() => {
		const handleScroll = () => {
			setIsTop(window.scrollY < 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);
	const pathnames = location.pathname.split("/").filter((x) => x);
	if (pathnames.length === 0 || pathnames.length > 1) return null;
	return /* @__PURE__ */ jsx(motion.nav, {
		initial: {
			opacity: 1,
			y: 0
		},
		animate: {
			opacity: isTop ? 1 : 0,
			y: isTop ? 0 : -10
		},
		transition: {
			duration: .3,
			ease: "easeInOut"
		},
		"aria-label": "Breadcrumb",
		className: "fixed top-24 md:top-28 right-6 md:right-12 lg:right-16 z-40 pointer-events-none",
		children: /* @__PURE__ */ jsxs("ol", {
			className: `flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-[#4a1c13]/10 shadow-sm rounded-full text-[10px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#8A7570] ${isTop ? "pointer-events-auto" : "pointer-events-none"}`,
			children: [/* @__PURE__ */ jsx(motion.li, {
				whileHover: { x: -2 },
				children: /* @__PURE__ */ jsx(Link, {
					to: "/",
					className: "hover:text-[#ff7043] transition-colors",
					children: "Home"
				})
			}), pathnames.map((value, index) => {
				const last = index === pathnames.length - 1;
				const to = `/${pathnames.slice(0, index + 1).join("/")}`;
				const label = value.replace(/-/g, " ");
				return /* @__PURE__ */ jsxs(React.Fragment, { children: [/* @__PURE__ */ jsx("span", {
					className: "opacity-40",
					children: "/"
				}), /* @__PURE__ */ jsx(motion.li, {
					whileHover: !last ? { x: 2 } : {},
					className: last ? "text-[#4a1c13] cursor-default" : "hover:text-[#ff7043] transition-colors",
					children: last ? /* @__PURE__ */ jsx("span", {
						className: "capitalize",
						children: label
					}) : /* @__PURE__ */ jsx(Link, {
						to,
						className: "capitalize",
						children: label
					})
				})] }, to);
			})]
		})
	});
};
//#endregion
//#region src/App.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/App.tsx");
var HomePage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/sections/HomePage.tsx"), import("./assets/HomePage-Ci7qNekk.js")));
var AboutPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/AboutPage.tsx"), import("./assets/AboutPage-CvmKiMc3.js")));
var ServicesPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ServicesPage.tsx"), import("./assets/ServicesPage-Svrm0pKE.js")));
var ServiceDetailsPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ServiceDetails.tsx"), import("./assets/ServiceDetails-CB6W79td.js")));
var PortfolioPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ProjectsPage.tsx"), import("./assets/ProjectsPage-BIBrWweM.js")));
var ProjectDetailsPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ProjectDetails.tsx"), import("./assets/ProjectDetails-CwuPjYw6.js")));
var DesignPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/DesignsPage.tsx"), import("./assets/DesignsPage-ufz2rH_o.js")));
var DesignDetailsPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/DesignDetails.tsx"), import("./assets/DesignDetails-Dn-NsTBd.js")));
var BlogsPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/BlogPage.tsx"), import("./assets/BlogPage-DTUd9kkH.js")));
var MasteringLightingInvisibleArchitecture = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/MasteringLightingInvisibleArchitecture.tsx"), import("./assets/MasteringLightingInvisibleArchitecture-XJQrP-RG.js")));
var HowToChooseTheBestInteriorDesignerInHyderabad = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/HowToChooseTheBestInteriorDesignerInHyderabad.tsx"), import("./assets/HowToChooseTheBestInteriorDesignerInHyderabad-BD11CUWp.js")));
var ModularKitchenCostInHyderabadCompleteGuide2026 = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/ModularKitchenCostInHyderabadCompleteGuide2026.tsx"), import("./assets/ModularKitchenCostInHyderabadCompleteGuide2026-BuEFBSNf.js")));
var SmallHomeInteriorDesignIdeas = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/SmallHomeInteriorDesignIdeas.tsx"), import("./assets/SmallHomeInteriorDesignIdeas-DwArbURC.js")));
var BedroomInteriorDesignIdeas = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/BedroomInteriorDesignIdeas.tsx"), import("./assets/BedroomInteriorDesignIdeas-CyHDzVZG.js")));
var LivingRoomInteriorDesignIdeas = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogs/LivingRoomInteriorDesignIdeas.tsx"), import("./assets/LivingRoomInteriorDesignIdeas-CDx9yV7M.js")));
var ContactPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/ContactPage.tsx"), import("./assets/ContactPage-CxC666QU.js")));
var TestimonialPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/TestimonialPage.tsx"), import("./assets/TestimonialPage-Y7LReykE.js")));
var PrivacyPolicyPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/PrivacyPolicyPage.tsx"), import("./assets/PrivacyPolicyPage-4hPWxPM9.js")));
var NotFoundPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/NotFoundPage.tsx"), import("./assets/NotFoundPage-Drbycidu.js")));
var HitecCityPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/HitecCityInteriorDesignerPage.tsx"), import("./assets/HitecCityInteriorDesignerPage-XMyvZtQf.js")));
var GachibowliPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/GachibowliInteriorDesignerPage.tsx"), import("./assets/GachibowliInteriorDesignerPage-CkNTOQb2.js")));
var KondapurPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/KondapurInteriorDesignerPage.tsx"), import("./assets/KondapurInteriorDesignerPage-DeuuH6eJ.js")));
var MadhapurPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/MadhapurInteriorDesignerPage.tsx"), import("./assets/MadhapurInteriorDesignerPage-B22WGezL.js")));
var WhitefieldsPage = React.lazy(() => (globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/WhitefieldsInteriorDesignerPage.tsx"), import("./assets/WhitefieldsInteriorDesignerPage-CbJBmk0O.js")));
var Loader = () => /* @__PURE__ */ jsx("div", {
	className: "flex justify-center items-center h-screen bg-[#f7f4ee]",
	children: /* @__PURE__ */ jsx("div", { className: "w-12 h-12 border-4 border-[#4a1c13] border-t-transparent rounded-full animate-spin" })
});
var Layout = () => {
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Header, {}),
		/* @__PURE__ */ jsx(FloatingSocialBar, {}),
		/* @__PURE__ */ jsx(Breadcrumb, {}),
		/* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx(PageTransitionLayout, { children: /* @__PURE__ */ jsx(Suspense, {
			fallback: /* @__PURE__ */ jsx(Loader, {}),
			children: /* @__PURE__ */ jsx(Outlet, {})
		}) }) }),
		/* @__PURE__ */ jsx(CardFooter, {})
	] });
};
var routes = [{
	path: "/",
	element: /* @__PURE__ */ jsx(Layout, {}),
	children: [
		{
			index: true,
			element: /* @__PURE__ */ jsx(HomePage, {})
		},
		{
			path: "about",
			element: /* @__PURE__ */ jsx(AboutPage, {})
		},
		{
			path: "services",
			element: /* @__PURE__ */ jsx(ServicesPage, {})
		},
		{
			path: "services/:slug",
			element: /* @__PURE__ */ jsx(ServiceDetailsPage, {})
		},
		{
			path: "portfolio",
			element: /* @__PURE__ */ jsx(PortfolioPage, {})
		},
		{
			path: "portfolio/:slug",
			element: /* @__PURE__ */ jsx(ProjectDetailsPage, {})
		},
		{
			path: "designs",
			element: /* @__PURE__ */ jsx(DesignPage, {})
		},
		{
			path: "designs/:slug",
			element: /* @__PURE__ */ jsx(DesignDetailsPage, {})
		},
		{
			path: "testimonials",
			element: /* @__PURE__ */ jsx(TestimonialPage, {})
		},
		{
			path: "blogs",
			element: /* @__PURE__ */ jsx(BlogsPage, {})
		},
		{
			path: "blogs/mastering-lighting-invisible-architecture",
			element: /* @__PURE__ */ jsx(MasteringLightingInvisibleArchitecture, {})
		},
		{
			path: "blogs/how-to-choose-the-best-interior-designer-in-hyderabad",
			element: /* @__PURE__ */ jsx(HowToChooseTheBestInteriorDesignerInHyderabad, {})
		},
		{
			path: "blogs/modular-kitchen-cost-in-hyderabad-complete-guide-2026",
			element: /* @__PURE__ */ jsx(ModularKitchenCostInHyderabadCompleteGuide2026, {})
		},
		{
			path: "blogs/small-home-interior-design-ideas",
			element: /* @__PURE__ */ jsx(SmallHomeInteriorDesignIdeas, {})
		},
		{
			path: "blogs/bedroom-interior-design-ideas",
			element: /* @__PURE__ */ jsx(BedroomInteriorDesignIdeas, {})
		},
		{
			path: "blogs/living-room-interior-design-ideas",
			element: /* @__PURE__ */ jsx(LivingRoomInteriorDesignIdeas, {})
		},
		{
			path: "contact",
			element: /* @__PURE__ */ jsx(ContactPage, {})
		},
		{
			path: "privacy-policy",
			element: /* @__PURE__ */ jsx(PrivacyPolicyPage, {})
		},
		{
			path: "interior-designer-hitech-city",
			element: /* @__PURE__ */ jsx(HitecCityPage, {})
		},
		{
			path: "interior-designer-gachibowli",
			element: /* @__PURE__ */ jsx(GachibowliPage, {})
		},
		{
			path: "interior-designer-kondapur",
			element: /* @__PURE__ */ jsx(KondapurPage, {})
		},
		{
			path: "interior-designer-madhapur",
			element: /* @__PURE__ */ jsx(MadhapurPage, {})
		},
		{
			path: "interior-designer-whitefields",
			element: /* @__PURE__ */ jsx(WhitefieldsPage, {})
		},
		{
			path: "*",
			element: /* @__PURE__ */ jsx(NotFoundPage, {})
		}
	]
}];
//#endregion
//#region src/main.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/main.tsx");
var createRoot = ViteReactSSG({ routes }, () => {});
//#endregion
export { createRoot, ProjectModal as t };
