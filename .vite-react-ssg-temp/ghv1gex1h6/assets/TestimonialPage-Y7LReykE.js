import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/TestimonialPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/TestimonialPage.tsx");
var smoothEase = [
	.22,
	1,
	.36,
	1
];
var videoTestimonials = [
	{
		id: 1,
		client: "Somi Reddy",
		project: "Luxury Home Transformation",
		duration: "1:45",
		youtubeId: "aZq2QRwiYsE"
	},
	{
		id: 2,
		client: "Anjani & Praveen",
		project: "Creative & Cozy Residence",
		duration: "2:12",
		youtubeId: "ztyqShdYSEY"
	},
	{
		id: 3,
		client: "Haseeb Mohammed",
		project: "Modern 3 BHK Flat",
		duration: "1:30",
		youtubeId: "fc27D9buInM"
	},
	{
		id: 4,
		client: "Naga Sreenu",
		project: "Elegant Home Design",
		duration: "1:58",
		youtubeId: "K38FUJ3IPhQ"
	},
	{
		id: 5,
		client: "Hema & Ramu",
		project: "3 BHK Concept to Reality",
		duration: "2:05",
		youtubeId: "Dhx2CLR350Y"
	},
	{
		id: 6,
		client: "Gouthami & Naz",
		project: "Seamless 3bhk interiors",
		duration: "1:42",
		youtubeId: "_NQ_TWdarSk"
	}
];
var staticReviews = [
	{
		id: 1,
		author_name: "Kavya ketha",
		profile_photo_url: "/review1.png",
		rating: 5,
		relative_time_description: "11 months ago",
		text: "Mind-blowing! I've never seen this type of interior work before."
	},
	{
		id: 2,
		author_name: "rajesh shankar pandey",
		profile_photo_url: "https://i.pravatar.cc/150?img=11",
		rating: 5,
		relative_time_description: "1 month ago",
		text: "I'll admit I was a bit skeptical at first, but the 3D renders matched the final outcome perfectly! The quality of the materials they used is top-notch. I couldn't be happier."
	},
	{
		id: 3,
		author_name: "ASHRITA PATRO",
		profile_photo_url: "/review2.png",
		rating: 4,
		relative_time_description: "3 months ago",
		text: "I turned to Bright Arena Interiors for help with my home’s color scheme, and they delivered beautifully! They selected colors that flow seamlessly from room to room, creating a cohesive and calming atmosphere."
	}
];
var containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: .15,
			delayChildren: .1
		}
	}
};
var cardVariants = {
	hidden: {
		opacity: 0,
		y: 30
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
var GoogleIcon = () => /* @__PURE__ */ jsxs("svg", {
	viewBox: "0 0 24 24",
	width: "24",
	height: "24",
	xmlns: "http://www.w3.org/2000/svg",
	children: [
		/* @__PURE__ */ jsx("path", {
			d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z",
			fill: "#4285F4"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z",
			fill: "#34A853"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z",
			fill: "#FBBC05"
		}),
		/* @__PURE__ */ jsx("path", {
			d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z",
			fill: "#EA4335"
		})
	]
});
var Testimonials = () => {
	const [playingVideos, setPlayingVideos] = useState({});
	const handlePlayVideo = (id) => {
		setPlayingVideos((prev) => ({
			...prev,
			[id]: true
		}));
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Client Testimonials - Bright Arena Interiors",
		description: "Read client testimonials for Bright Arena Interiors and discover why homeowners and businesses across Hyderabad trust us for luxury interior design projects.",
		url: "https://www.brightarenainteriors.com/testimonials"
	}), /* @__PURE__ */ jsxs("main", {
		className: "min-h-screen bg-[#fcfcfc] pt-32 pb-24 px-6 sm:px-8 md:px-16 lg:px-24 antialiased overflow-hidden",
		children: [
			/* @__PURE__ */ jsxs(motion.div, {
				className: "w-full max-w-4xl mx-auto text-center mb-16",
				initial: {
					opacity: 0,
					y: 20
				},
				animate: {
					opacity: 1,
					y: 0
				},
				transition: {
					duration: .8,
					ease: smoothEase
				},
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "sr-only",
						children: "Client Testimonials"
					}),
					/* @__PURE__ */ jsxs("h2", {
						className: "text-[clamp(36px,5vw,64px)] leading-[1.1] mb-6 pt-6 text-[#4a1c13] font-primary font-light",
						children: [
							"Don't just take our ",
							/* @__PURE__ */ jsx("br", { className: "hidden sm:block" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-[#C4623A] italic",
								children: "word for it."
							})
						]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "max-w-2xl mx-auto text-[16px] leading-[1.8] text-[#6B5C57]",
						children: "Watch and read what our clients have to say about their experience working with us to bring their dream spaces to life."
					})
				]
			}),
			/* @__PURE__ */ jsx(motion.div, {
				variants: containerVariants,
				initial: "hidden",
				whileInView: "visible",
				viewport: {
					once: true,
					margin: "-50px"
				},
				className: "max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24",
				children: videoTestimonials.map((video) => {
					const isPlaying = playingVideos[video.id];
					return /* @__PURE__ */ jsx(motion.div, {
						variants: cardVariants,
						whileHover: !isPlaying ? { y: -5 } : {},
						className: "group relative aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-white shadow-md transition-shadow duration-300 hover:shadow-xl",
						children: /* @__PURE__ */ jsx(AnimatePresence, {
							mode: "wait",
							children: isPlaying ? /* @__PURE__ */ jsx(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								className: "w-full h-full bg-black",
								children: /* @__PURE__ */ jsx("iframe", {
									width: "100%",
									height: "100%",
									src: `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`,
									title: video.client,
									frameBorder: "0",
									allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
									allowFullScreen: true,
									className: "w-full h-full"
								})
							}, "video-player") : /* @__PURE__ */ jsxs(motion.div, {
								initial: { opacity: 0 },
								animate: { opacity: 1 },
								exit: { opacity: 0 },
								onClick: () => handlePlayVideo(video.id),
								className: "absolute inset-0 cursor-pointer",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
										alt: video.client,
										onError: (e) => {
											e.target.src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
										},
										className: "w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 opacity-80 group-hover:opacity-100 transition-opacity duration-500" }),
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 flex items-center justify-center",
										children: /* @__PURE__ */ jsx("div", {
											className: "w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 transition-transform duration-500 group-hover:scale-110 group-hover:bg-[#ff7043]/90 group-hover:border-transparent",
											children: /* @__PURE__ */ jsx("svg", {
												width: "20",
												height: "20",
												viewBox: "0 0 24 24",
												fill: "white",
												className: "ml-1",
												children: /* @__PURE__ */ jsx("path", { d: "M5 3l14 9-14 9V3z" })
											})
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-6 left-6 right-6 text-white",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "flex items-center justify-between mb-2",
												children: /* @__PURE__ */ jsx("span", {
													className: "text-[10px] uppercase tracking-widest bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20",
													children: video.duration
												})
											}),
											/* @__PURE__ */ jsx("h4", {
												className: "font-bold text-[18px] leading-tight mb-1",
												children: video.client
											}),
											/* @__PURE__ */ jsx("p", {
												className: "text-white/80 text-[13px]",
												children: video.project
											})
										]
									})
								]
							}, "video-placeholder")
						})
					}, video.id);
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "max-w-7xl mx-auto",
				children: [/* @__PURE__ */ jsx(motion.div, {
					initial: {
						opacity: 0,
						y: 20
					},
					whileInView: {
						opacity: 1,
						y: 0
					},
					viewport: { once: true },
					transition: {
						duration: .8,
						ease: smoothEase
					},
					className: "flex flex-col sm:flex-row items-center justify-between mb-10 border-b border-gray-200 pb-6",
					children: /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4 mb-4 sm:mb-0",
						children: [/* @__PURE__ */ jsx(GoogleIcon, {}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-[#4a1c13] font-bold text-[20px] leading-tight",
							children: "Excellent"
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1 text-[13px] text-gray-500",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-bold text-[#4a1c13]",
								children: "4.9/5"
							}), " based on Google Reviews"]
						})] })]
					})
				}), /* @__PURE__ */ jsx(motion.div, {
					variants: containerVariants,
					initial: "hidden",
					whileInView: "visible",
					viewport: {
						once: true,
						margin: "-100px"
					},
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8",
					children: staticReviews.map((review) => /* @__PURE__ */ jsx(motion.div, {
						variants: cardVariants,
						whileHover: { y: -5 },
						transition: {
							duration: .4,
							ease: smoothEase
						},
						className: "bg-white border border-gray-100 rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between",
						children: /* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex justify-between items-start mb-6",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex gap-3 items-center",
									children: [/* @__PURE__ */ jsx("img", {
										src: review.profile_photo_url || `https://ui-avatars.com/api/?name=${review.author_name}`,
										alt: review.author_name,
										className: "w-11 h-11 rounded-full object-cover border border-gray-100"
									}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h4", {
										className: "text-[#4a1c13] font-bold text-[15px] leading-tight mb-0.5",
										children: review.author_name
									}), /* @__PURE__ */ jsx("p", {
										className: "text-[12px] text-gray-400",
										children: review.relative_time_description
									})] })]
								}), /* @__PURE__ */ jsx("div", {
									className: "opacity-70 scale-90",
									children: /* @__PURE__ */ jsx(GoogleIcon, {})
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center space-x-1 mb-5",
								children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsx("svg", {
									className: `w-[18px] h-[18px] ${i < review.rating ? "text-[#FBBC05]" : "text-gray-200"}`,
									fill: "currentColor",
									viewBox: "0 0 20 20",
									children: /* @__PURE__ */ jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
								}, i))
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "text-[#6B5C57] text-[14.5px] leading-[1.7]",
								children: [
									"\"",
									review.text,
									"\""
								]
							})
						] })
					}, review.id))
				})]
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
				viewport: { once: true },
				transition: {
					duration: .8,
					ease: smoothEase,
					delay: .4
				},
				className: "mt-32 text-center",
				children: [/* @__PURE__ */ jsx("h2", {
					className: "text-[clamp(28px,4vw,40px)] text-[#4a1c13] font-primary mb-6",
					children: "Ready to create your own story?"
				}), /* @__PURE__ */ jsx(Link, {
					to: "/contact",
					children: /* @__PURE__ */ jsx(motion.button, {
						whileHover: {
							scale: 1.05,
							backgroundColor: "#e65a2d"
						},
						whileTap: { scale: .95 },
						transition: {
							duration: .3,
							ease: smoothEase
						},
						className: "bg-[#ff7043] text-white px-8 py-4 rounded-full text-[15px] font-bold tracking-wide shadow-lg shadow-[#ff7043]/30",
						children: "Start Your Project"
					})
				})]
			})
		]
	})] });
};
//#endregion
export { Testimonials as default };
