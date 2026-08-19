import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return { title: t("eyebrow"), description: t("paragraph1") };
}

export default async function AboutPage() {
  const t = await getTranslations("about");

  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
            <Image
              src="/images/interior/salon-2.jpg"
              alt="Inside the Waylee Hair & Beauty salon"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
            />
          </div>
          <div className="space-y-5 text-ink/75 leading-relaxed">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p className="text-ink/50 text-sm italic">{t("placeholder")}</p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href="/book">{t("bookCta")}</Button>
        </div>
      </Section>
    </>
  );
}
