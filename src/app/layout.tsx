import type { Metadata } from "next";
import { Playfair_Display, Work_Sans, Alex_Brush } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const script = Alex_Brush({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://waylee-hair-web.vercel.app"),
  title: {
    default: "Waylee Hair & Beauty — Salon in Geneva",
    template: "%s — Waylee Hair & Beauty",
  },
  description:
    "Independent hair salon in Geneva specializing in tape-in extensions, tissage, lissage tanin & indien, and precision cuts. Book your appointment online.",
  openGraph: {
    title: "Waylee Hair & Beauty",
    description:
      "Independent hair salon in Geneva — extensions, lissage, cuts, and colour.",
    images: ["/images/logo/waylee-badge.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${workSans.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory font-sans text-ink">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
