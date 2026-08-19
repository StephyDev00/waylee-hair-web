import { Playfair_Display, Work_Sans, Alex_Brush } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${playfair.variable} ${workSans.variable} ${script.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ivory font-sans text-ink">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
