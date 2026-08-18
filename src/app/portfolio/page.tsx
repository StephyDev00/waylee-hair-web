import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/ui/Section";
import { GalleryGrid, type PortfolioImage } from "@/components/portfolio/GalleryGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse Waylee Hair & Beauty's work by category — cuts, color, extensions, and braids.",
};

// No verified hairstyling result photography exists yet — ship an honest
// empty state per category rather than inventing images. Populate this array
// (or wire to a Supabase Storage bucket) once the owner supplies real photos.
const images: PortfolioImage[] = [];

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

      <div className="mt-12">
        <GalleryGrid images={images} />
      </div>
    </Section>
  );
}
