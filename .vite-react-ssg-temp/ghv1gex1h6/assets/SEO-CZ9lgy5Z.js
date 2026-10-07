import { jsx, jsxs } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
//#region src/components/SEO.tsx
globalThis.__VITE_REACT_SSG_TRACK_SSR_MODULE__?.("src/components/SEO.tsx");
function SEO({ title = "Bright Arena | Luxury Interior Designers in Hyderabad", description = "Bright Arena Interiors is Hyderabad's premier luxury design studio. We transform residential and commercial spaces into timeless, functional, and breathtaking environments.", name = "Bright Arena Interiors", type = "website", url = "https://www.brightarenainteriors.com", image = "https://www.brightarenainteriors.com/og-image.jpg", keywords = "luxury interior design, interior designers Hyderabad, residential interiors, commercial interiors, Bright Arena", schema }) {
	const defaultSchema = {
		"@context": "https://schema.org",
		"@type": "InteriorDesign",
		name: "Bright Arena Interiors",
		image: `${url}/bright-logo.webp`,
		"@id": url,
		url,
		telephone: "+918978222980",
		address: {
			"@type": "PostalAddress",
			streetAddress: "Hyderabad",
			addressLocality: "Hyderabad",
			addressRegion: "TG",
			addressCountry: "IN"
		},
		geo: {
			"@type": "GeoCoordinates",
			latitude: 17.385044,
			longitude: 78.486671
		},
		openingHoursSpecification: {
			"@type": "OpeningHoursSpecification",
			dayOfWeek: [
				"Monday",
				"Tuesday",
				"Wednesday",
				"Thursday",
				"Friday",
				"Saturday"
			],
			opens: "09:00",
			closes: "21:00"
		}
	};
	const finalSchema = schema || defaultSchema;
	console.log("SEO Rendered", title, description);
	return /* @__PURE__ */ jsxs(Helmet, { children: [
		/* @__PURE__ */ jsx("title", { children: title }),
		/* @__PURE__ */ jsx("meta", {
			name: "description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "author",
			content: name
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "keywords",
			content: keywords
		}),
		/* @__PURE__ */ jsx("link", {
			rel: "canonical",
			href: url
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:type",
			content: type
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:image",
			content: image
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:url",
			content: url
		}),
		/* @__PURE__ */ jsx("meta", {
			property: "og:site_name",
			content: name
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:creator",
			content: name
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:card",
			content: "summary_large_image"
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:title",
			content: title
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:description",
			content: description
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:image",
			content: image
		}),
		/* @__PURE__ */ jsx("meta", {
			name: "twitter:url",
			content: url
		}),
		/* @__PURE__ */ jsx("script", {
			type: "application/ld+json",
			children: JSON.stringify(finalSchema)
		})
	] });
}
//#endregion
export { SEO as t };
