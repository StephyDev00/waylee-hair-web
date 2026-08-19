import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { GalleryGrid, type PortfolioImage } from "@/components/portfolio/GalleryGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse Waylee Hair & Beauty's work by category — cuts, color, extensions, and braids.",
};

// Temporary gallery cropped from the salon's real Instagram grid
// (Screenshot_20260818_183030_Instagram.jpg) — low-res placeholders until
// the owner supplies proper portfolio photography. Categories without a
// tile here still show the "coming soon" empty state below.
const images: PortfolioImage[] = [
  { src: "/images/portfolio/cuts-1.jpg", alt: "Sleek straight styling result", category: "Cuts" },
  { src: "/images/portfolio/cuts-2.jpg", alt: "Precision cut and finish", category: "Cuts" },
  { src: "/images/portfolio/color-1.jpg", alt: "Balayage colour result", category: "Color" },
  { src: "/images/portfolio/color-2.jpg", alt: "Rich brunette colour result", category: "Color" },
  { src: "/images/portfolio/weaves-1.jpg", alt: "Tissage installation", category: "Braids & Weaves" },
  { src: "/images/portfolio/weaves-2.jpg", alt: "Weave styling result", category: "Braids & Weaves" },
];

export default function PortfolioPage() {
  return (
    <Section className="pt-16 md:pt-20">
      <Eyebrow>Portfolio</Eyebrow>
      <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">
        Browse by what you want done.
      </h1>
      <p className="mt-4 max-w-xl text-ink/65">
        Every category from cuts to extensions — filter to find your look.
      </p>
      <p className="mt-2 max-w-xl text-xs text-ink/40">
        Preview quality from our Instagram — full-resolution photos coming soon.
      </p>

      <div className="mt-12">
        <GalleryGrid images={images} />
      </div>
    </Section>
  );
}
