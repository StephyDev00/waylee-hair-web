import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Section, Eyebrow } from "@/components/ui/Section";
import { GalleryGrid, type PortfolioImage } from "@/components/portfolio/GalleryGrid";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio" });
  return { title: t("eyebrow"), description: t("subtitle") };
}

// Temporary gallery cropped from the salon's real Instagram grid
// (Screenshot_20260818_183030_Instagram.jpg) — low-res placeholders until
// the owner supplies proper portfolio photography. Category keys match the
// `portfolio.categories` translation keys, not display labels, so filtering
// works the same regardless of locale.
const images: PortfolioImage[] = [
  { src: "/images/portfolio/cuts-1.jpg", alt: "Sleek straight styling result", category: "cuts" },
  { src: "/images/portfolio/cuts-2.jpg", alt: "Precision cut and finish", category: "cuts" },
  { src: "/images/portfolio/color-1.jpg", alt: "Balayage colour result", category: "color" },
  { src: "/images/portfolio/color-2.jpg", alt: "Rich brunette colour result", category: "color" },
  { src: "/images/portfolio/weaves-1.jpg", alt: "Tissage installation", category: "braids" },
  { src: "/images/portfolio/weaves-2.jpg", alt: "Weave styling result", category: "braids" },
];

export default async function PortfolioPage() {
  const t = await getTranslations("portfolio");

  return (
    <Section className="pt-16 md:pt-20">
      <Eyebrow>{t("eyebrow")}</Eyebrow>
      <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
      <p className="mt-4 max-w-xl text-ink/65">{t("subtitle")}</p>
      <p className="mt-2 max-w-xl text-xs text-ink/40">{t("previewNote")}</p>

      <div className="mt-12">
        <GalleryGrid images={images} />
      </div>
    </Section>
  );
}
