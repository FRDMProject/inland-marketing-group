import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion";
import { Tracking } from "@/components/tracking";
import { site } from "@/lib/site";
import "./globals.css";

const body = Manrope({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Inland Digital Group — Websites with a point of view",
    template: "%s | Inland Digital Group",
  },
  description:
    "Distinctive web design and digital growth for businesses in the Inland Empire and Southern California.",
  robots: { index: site.indexable, follow: true },
  openGraph: { images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${body.variable} ${display.variable}`}>
        <MotionProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <Navigation />
          {children}
          <Footer />
          <Tracking />
        </MotionProvider>
      </body>
    </html>
  );
}
