import type { Metadata, Viewport } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransitionLayout from "@/components/PageTransitionLayout";
import FloatingSocialBar from "@/components/SocialMediaBar";
import Breadcrumb from "@/components/BreadCrumb";
import MotionProvider from "@/components/MotionProvider";
import { inter, ttBakers, ttBakersBold } from "./fonts";
import "./globals.css";

// Site-wide head tags carried over from the Vite index.html. Page-specific tags come from each route's
// metadata (src/lib/seo.ts), which overrides these defaults, so no tag is ever emitted twice.
export const metadata: Metadata = {
  metadataBase: new URL("https://www.brightarenainteriors.com"),
  title: "Interior Designers in Hyderabad for Homes and Offices | Bright Arena",
  description:
    "Bright Arena Interiors designs personalised home, luxury, office and commercial interiors in Hyderabad. Explore our work and book a consultation.",
  icons: {
    icon: [{ url: "/bright-logo.webp", type: "image/webp" }],
    apple: "/apple-touch-icon.png",
  },
  verification: { google: "FSG5TsJwes9p6zQ39O9-0rfrsYNjatm_QO4mGGK6XPU" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f4ee",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${ttBakers.variable} ${ttBakersBold.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-[#4a1c13] focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>

        {/* Same shell as the Vite App.tsx */}
        <MotionProvider>
          <Navbar />
          <FloatingSocialBar />
          <Breadcrumb />

          <main>
            <PageTransitionLayout>{children}</PageTransitionLayout>
          </main>

          <Footer />
        </MotionProvider>

        <noscript>
          <div
            style={{
              padding: "2rem",
              textAlign: "center",
              fontFamily: "sans-serif",
              color: "#4a1c13",
              background: "#f7f4ee",
              minHeight: "100vh",
            }}
          >
            <h2>JavaScript is Required</h2>
            <p>
              Bright Arena&apos;s portfolio requires JavaScript to run smoothly. Please enable JavaScript in your
              browser settings to continue.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
