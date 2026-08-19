import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "shop" });
  return { title: t("title"), description: t("description") };
}

export default async function ShopPage() {
  const t = await getTranslations("shop");

  return (
    <Section className="min-h-[60vh] flex flex-col items-center justify-center text-center py-24 md:py-32">
      <ShoppingBag className="text-wine" size={40} strokeWidth={1.25} />
      <h1 className="mt-6 font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-md text-ink/75">{t("description")}</p>
      <Button href="/book" className="mt-8">
        {t("bookNow")}
      </Button>
    </Section>
  );
}
