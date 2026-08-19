import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getServices } from "@/lib/pricing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { BookingWizard } from "@/components/booking/BookingWizard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book" });
  return { title: t("eyebrow"), description: t("title") };
}

export default async function BookPage() {
  const t = await getTranslations("book");
  const services = await getServices();

  return (
    <Section className="pt-16 md:pt-20">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
      <div className="mt-12 max-w-2xl">
        <BookingWizard services={services} />
      </div>
    </Section>
  );
}
