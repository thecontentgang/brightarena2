import { t as SEO } from "./SEO-CZ9lgy5Z.js";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
//#region src/pages/blogsData.ts
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/blogsData.ts");
var blogsData = [
	{
		"id": 2,
		"slug": "mastering-lighting-invisible-architecture",
		"title": "Mastering Lighting: The Invisible Architecture",
		"category": "Styling",
		"date": "March 15, 2026",
		"readTime": "6 Min Read",
		"author": "David Chen",
		"authorRole": "Lead Lighting Designer",
		"coverImage": "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2000&auto=format&fit=crop",
		"excerpt": "How the right mix of ambient, task, and accent lighting can entirely change the mood, depth, and perceived size of a room."
	},
	{
		"id": 3,
		"slug": "how-to-choose-the-best-interior-designer-in-hyderabad",
		"title": "How to Choose the Best Interior Designer in Hyderabad",
		"category": "Guide",
		"date": "August 17, 2026",
		"readTime": "12 Min Read",
		"author": "BrightArenaInterior Team",
		"authorRole": "Interior Design Experts",
		"coverImage": "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=2000&auto=format&fit=crop",
		"excerpt": "Discover how to choose the best Interior Designer in Hyderabad by comparing experience, design expertise, pricing, portfolios, reviews, and services."
	},
	{
		"id": 4,
		"slug": "modular-kitchen-cost-in-hyderabad-complete-guide-2026",
		"title": "Modular Kitchen Cost in Hyderabad: Complete 2026 Guide",
		"category": "Guide",
		"date": "August 17, 2026",
		"readTime": "10 Min Read",
		"author": "BrightArenaInterior Team",
		"authorRole": "Interior Design Experts",
		"coverImage": "/modular-kitchen.png",
		"excerpt": "Discover Modular Kitchen Cost in Hyderabad for 2026, including pricing factors, materials, layouts, installation costs, and tips to plan your budget."
	},
	{
		"id": 5,
		"slug": "small-home-interior-design-ideas",
		"title": "25+ Small Home Interior Design Ideas to Maximize Space",
		"category": "Space Planning",
		"date": "September 22, 2026",
		"readTime": "10 Min Read",
		"author": "Design Team",
		"authorRole": "Bright Arena Interiors",
		"coverImage": "/small-house-interior-designs.png",
		"excerpt": "Small homes get cramped for a simple reason: circulation, storage and furniture are planned separately. The sofa goes in one place, the wardrobe in another, and suddenly nobody can walk through the room without turning sideways."
	},
	{
		"id": 6,
		"slug": "bedroom-interior-design-ideas",
		"title": "25+ Bedroom Interior Design Ideas for a Comfortable & Stylish Home",
		"category": "Bedroom Design",
		"date": "September 22, 2026",
		"readTime": "12 Min Read",
		"author": "Design Team",
		"authorRole": "Bright Arena Interiors",
		"coverImage": "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000&auto=format&fit=crop",
		"excerpt": "A bedroom has one main job: helping you rest. But it also has to hold your clothes, suitcases and bedside clutter, and it should still look good when a guest peeks in. Balancing sleep, storage, light and personal style in a fairly small space is where most people get stuck."
	},
	{
		"id": 7,
		"slug": "living-room-interior-design-ideas",
		"title": "25+ Living Room Interior Design Ideas for a Modern & Elegant Home",
		"category": "Living Room Design",
		"date": "September 22, 2026",
		"readTime": "14 Min Read",
		"author": "Design Team",
		"authorRole": "Bright Arena Interiors",
		"coverImage": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?q=80&w=2000&auto=format&fit=crop",
		"excerpt": "A living room has to do a lot. It's where guests form their first impression of your home, where the family watches TV, where kids finish homework on the sofa and where the evening chai happens. Making it look refined while handling all of that is the real design challenge."
	}
];
//#endregion
//#region src/pages/BlogPage.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/pages/BlogPage.tsx");
var MotionLink = motion(Link);
var smoothEase = [
	.22,
	1,
	.36,
	1
];
function BlogPage() {
	const featuredPost = blogsData[0];
	const standardPosts = blogsData.slice(1);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(SEO, {
		title: "Interior Design Ideas and Tips - Bright Arena Interiors",
		description: "Explore expert interior design ideas, home decor tips, design trends, and practical guides from Bright Arena Interiors to create beautiful living spaces.",
		url: "https://www.brightarenainteriors.com/blogs"
	}), /* @__PURE__ */ jsxs("div", {
		className: "bg-[#f7f4ee] text-[#4a1c13] min-h-screen antialiased selection:bg-[#ff7043] selection:text-white pb-24",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "pt-32 pb-16 md:pt-48 md:pb-20 px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto text-center flex flex-col items-center",
				children: [
					/* @__PURE__ */ jsx("h1", {
						className: "sr-only",
						children: "Interior Design Ideas & Tips"
					}),
					/* @__PURE__ */ jsx(motion.span, {
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
						children: "Insights & Inspiration"
					}),
					/* @__PURE__ */ jsxs(motion.h2, {
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
							"The Design ",
							/* @__PURE__ */ jsx("br", {}),
							/* @__PURE__ */ jsx("span", {
								className: "italic font-serif text-[#ff7043]",
								children: "Journal."
							})
						]
					})
				]
			}),
			featuredPost && /* @__PURE__ */ jsx("section", {
				className: "px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto mb-16 md:mb-24",
				children: /* @__PURE__ */ jsxs(MotionLink, {
					to: `/blogs/${featuredPost.slug}`,
					"aria-label": `Read featured article: ${featuredPost.title}`,
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
						margin: "-100px"
					},
					transition: {
						duration: .8,
						ease: smoothEase
					},
					className: "group cursor-pointer grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-[3rem] p-6 shadow-sm border border-[#4a1c13]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff7043]",
					children: [/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-8 overflow-hidden rounded-[2rem] h-full min-h-[500px]",
						children: /* @__PURE__ */ jsx("img", {
							src: featuredPost.coverImage,
							alt: featuredPost.title,
							className: "w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-4 flex flex-col justify-center py-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-6",
								children: [/* @__PURE__ */ jsx("span", {
									className: "bg-[#ff7043]/10 text-[#ff7043] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase",
									children: featuredPost.category
								}), /* @__PURE__ */ jsx("span", {
									className: "text-[#4a1c13]/40 text-xs font-mono tracking-wider",
									children: featuredPost.date
								})]
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "text-[clamp(28px,3vw,40px)] font-primary leading-tight mb-6 group-hover:text-[#ff7043] transition-colors duration-500",
								children: featuredPost.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[#4a1c13]/70 text-base leading-relaxed mb-8",
								children: featuredPost.excerpt
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 text-[#4a1c13] font-bold text-xs tracking-widest uppercase group-hover:text-[#ff7043] transition-colors duration-300",
								children: ["Read Article", /* @__PURE__ */ jsx("svg", {
									width: "16",
									height: "16",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									className: "transform group-hover:translate-x-2 transition-transform duration-300",
									children: /* @__PURE__ */ jsx("path", {
										d: "M5 12h14M12 5l7 7-7 7",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "px-4 md:px-12 lg:px-24 max-w-[1600px] mx-auto",
				children: /* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12",
					children: standardPosts.map((post, index) => /* @__PURE__ */ jsxs(MotionLink, {
						to: `/blogs/${post.slug}`,
						"aria-label": `Read article: ${post.title}`,
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
							duration: .7,
							ease: smoothEase,
							delay: index % 3 * .15
						},
						className: "group cursor-pointer flex flex-col focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#ff7043] rounded-2xl",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "w-full aspect-[4/3] overflow-hidden rounded-2xl md:rounded-3xl mb-6 bg-[#e8e5de]",
								children: /* @__PURE__ */ jsx("img", {
									src: post.coverImage,
									alt: post.title,
									className: "w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105",
									loading: "lazy"
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 mb-4",
								children: [
									/* @__PURE__ */ jsx("span", {
										className: "text-[#ff7043] text-[10px] font-bold tracking-widest uppercase",
										children: post.category
									}),
									/* @__PURE__ */ jsx("span", { className: "w-1 h-1 rounded-full bg-[#4a1c13]/20" }),
									/* @__PURE__ */ jsx("span", {
										className: "text-[#4a1c13]/40 text-xs font-mono tracking-wider",
										children: post.date
									})
								]
							}),
							/* @__PURE__ */ jsx("h3", {
								className: "text-2xl font-primary leading-snug mb-3 group-hover:text-[#ff7043] transition-colors duration-300 line-clamp-2",
								children: post.title
							}),
							/* @__PURE__ */ jsx("p", {
								className: "text-[#4a1c13]/60 text-sm leading-relaxed mb-6 line-clamp-3",
								children: post.excerpt
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-auto flex items-center gap-2 text-[#4a1c13]/50 text-[10px] font-bold tracking-widest uppercase group-hover:text-[#ff7043] transition-colors duration-300",
								children: ["Read More", /* @__PURE__ */ jsx("svg", {
									width: "12",
									height: "12",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									className: "transform group-hover:translate-x-1 transition-transform duration-300",
									children: /* @__PURE__ */ jsx("path", {
										d: "M5 12h14M12 5l7 7-7 7",
										strokeWidth: "2",
										strokeLinecap: "round",
										strokeLinejoin: "round"
									})
								})]
							})
						]
					}, post.id))
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex justify-center items-center gap-4 mt-24",
				children: [
					/* @__PURE__ */ jsx("button", {
						className: "w-10 h-10 rounded-full border border-[#4a1c13]/20 flex items-center justify-center text-[#4a1c13]/40 hover:bg-[#ff7043] hover:text-white hover:border-[#ff7043] transition-colors duration-300 cursor-not-allowed",
						children: /* @__PURE__ */ jsx("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							children: /* @__PURE__ */ jsx("path", {
								d: "M15 19l-7-7 7-7",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-xs font-mono",
						children: "Page 1 of 1"
					}),
					/* @__PURE__ */ jsx("button", {
						className: "w-10 h-10 rounded-full border border-[#4a1c13]/20 flex items-center justify-center text-[#4a1c13] hover:bg-[#ff7043] hover:text-white hover:border-[#ff7043] transition-colors duration-300",
						children: /* @__PURE__ */ jsx("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							children: /* @__PURE__ */ jsx("path", {
								d: "M9 5l7 7-7 7",
								strokeWidth: "2",
								strokeLinecap: "round",
								strokeLinejoin: "round"
							})
						})
					})
				]
			})
		]
	})] });
}
//#endregion
export { BlogPage as default };
