import type { Metadata } from "next";
import { getServices, getExtensionPrices, groupByCategory } from "@/lib/pricing";
import { categoryLabels } from "@/data/services-seed";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PriceTable } from "@/components/services/PriceTable";
import { ExtensionPriceGrid } from "@/components/services/ExtensionPriceGrid";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services & Pricing",
  description: "Full pricing for cuts, lissage, extensions, and formulas at Waylee Hair & Beauty, Geneva.",
};

export default async function ServicesPage() {
  const [services, extensionPrices] = await Promise.all([
    getServices(),
    getExtensionPrices(),
  ]);
  const grouped = groupByCategory(services);
  const order = ["soins_shampooing", "lissages", "extensions", "formules"] as const;

  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <Eyebrow>Services &amp; Pricing</Eyebrow>
        <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">
          Transparent pricing, tailored to your hair.
        </h1>
        <p className="mt-4 max-w-xl text-ink/65">
          Pricing varies by hair length (Court / Mi-long / Long). All prices in
          Swiss Francs (CHF). Ask in salon about lash, brow, and lip services.
        </p>
      </Section>

      <Section className="pt-0">
        <div className="space-y-16">
          {order.map((cat) =>
            grouped[cat]?.length ? (
              <PriceTable key={cat} title={categoryLabels[cat]} services={grouped[cat]} />
            ) : null
          )}
        </div>

        <div className="mt-16">
          <ExtensionPriceGrid prices={extensionPrices} />
        </div>

        <div className="mt-14 text-center">
          <Button href="/book">Book your appointment</Button>
        </div>
      </Section>
    </>
  );
}
