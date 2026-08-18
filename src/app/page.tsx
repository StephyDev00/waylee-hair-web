import { Hero } from "@/components/home/Hero";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { PortfolioHighlights } from "@/components/home/PortfolioHighlights";
import { TestimonialTeaser } from "@/components/home/TestimonialTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <PortfolioHighlights />
      <TestimonialTeaser />
    </>
  );
}
