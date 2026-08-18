import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Shop",
  description: "Retail products from Waylee Hair & Beauty — coming soon.",
};

export default function ShopPage() {
  return (
    <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center py-24 md:py-32">
      <ShoppingBag className="text-wine" size={40} strokeWidth={1.25} />
      <h1 className="mt-6 font-serif text-4xl font-bold md:text-5xl">
        Shop — Coming Soon
      </h1>
      <p className="mt-4 max-w-md text-ink/65">
        Curated hair care and retail products are on the way. In the meantime,
        book an appointment to hear our recommendations in person.
      </p>
      <Button href="/book" className="mt-8">
        Book Now
      </Button>
    </Section>
  );
}
