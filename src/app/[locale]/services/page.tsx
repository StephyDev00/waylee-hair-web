import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServices, getExtensionPrices, groupByCategory } from "@/lib/pricing";
import { categoryLabels } from "@/data/services-seed";
import { Section, Eyebrow } from "@/components/ui/Section";
import { PriceTable } from "@/components/services/PriceTable";
import { ExtensionPriceGrid } from "@/components/services/ExtensionPriceGrid";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  return { title: t("eyebrow"), description: t("subtitle") };
}

export default async function ServicesPage() {
  const t = await getTranslations("services");
  const [services, extensionPrices] = await Promise.all([
    getServices(),
    getExtensionPrices(),
  ]);
  const grouped = groupByCategory(services);
  const order = ["soins_shampooing", "lissages", "extensions", "formules"] as const;

  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
        <p className="mt-4 max-w-xl text-ink/75">{t("subtitle")}</p>
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
          <Button href="/book">{t("bookCta")}</Button>
        </div>
      </Section>
    </>
  );
}
