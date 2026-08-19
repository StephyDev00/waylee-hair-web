import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "book.success" });
  return { title: t("title") };
}

export default async function BookingSuccessPage() {
  const t = await getTranslations("book.success");

  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center py-24">
      <CheckCircle2 className="text-wine" size={44} strokeWidth={1.25} />
      <h1 className="mt-6 font-serif text-4xl font-bold">{t("title")}</h1>
      <p className="mt-4 max-w-md text-ink/75">{t("body")}</p>
      <Button href="/" className="mt-8">
        {t("backHome")}
      </Button>
    </Section>
  );
}
