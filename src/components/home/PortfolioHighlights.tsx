import Image from "next/image";
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function PortfolioHighlights() {
  const t = useTranslations("home.portfolioHighlights");

  return (
    <Section className="bg-ivory-soft">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">{t("title")}</h2>
        </div>
        <Button href="/portfolio" variant="secondary">
          {t("viewFull")}
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/interior/salon-1.jpg"
            alt="Waylee Hair & Beauty styling station"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="/images/interior/salon-2.jpg"
            alt="Waylee Hair & Beauty salon interior"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>
      <p className="mt-6 text-sm text-ink/50">
        {t("comingSoon")}{" "}
        <a
          href="https://www.instagram.com/waylee.hair.beauty"
          target="_blank"
          rel="noreferrer"
          className="text-wine hover:underline"
        >
          @waylee.hair.beauty
        </a>{" "}
        {t("comingSoonSuffix")}
      </p>
    </Section>
  );
}
