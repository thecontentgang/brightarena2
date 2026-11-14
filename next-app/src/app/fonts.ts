import localFont from "next/font/local";
import { Inter } from "next/font/google";

// Same files and family mapping as the Vite app's @font-face rules (index.css). The originals stay in
// public/font/ so their public URLs keep working; next/font self-hosts hashed copies with preloading.
export const ttBakers = localFont({
  src: "../../public/font/OrangeAvenueDEMO-Regular.otf",
  weight: "400",
  style: "normal",
  display: "swap",
  variable: "--font-tt-bakers",
  fallback: ["sans-serif"],
});

export const ttBakersBold = localFont({
  src: "../../public/font/TT_Bakers_Trial_Bold.ttf",
  weight: "700",
  style: "normal",
  display: "swap",
  variable: "--font-tt-bakers-bold",
  fallback: ["sans-serif"],
  // No component currently uses font-primary-bold. Without preloading, the browser downloads this 190 KB
  // file only if something renders with it - the same on-demand behaviour as the Vite @font-face rule.
  preload: false,
});

// Was: @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap')
export const inter = Inter({
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
  fallback: ["sans-serif"],
});
