import { Scissors, Sparkles, Waves } from "lucide-react";
import { useTranslations } from "next-intl";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function ServicesPreview() {
  const t = useTranslations("home.servicesPreview");

  const preview = [
    { icon: Scissors, title: t("cutsTitle"), desc: t("cutsDesc") },
    { icon: Waves, title: t("lissageTitle"), desc: t("lissageDesc") },
    { icon: Sparkles, title: t("extensionsTitle"), desc: t("extensionsDesc") },
  ];

  return (
    <Section>
      <div className="mb-12 max-w-xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="font-serif text-3xl font-bold md:text-4xl">{t("title")}</h2>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {preview.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-ink/10 bg-ivory-soft p-8 transition-colors hover:border-wine/30"
          >
            <Icon className="text-wine" size={28} strokeWidth={1.5} />
            <h3 className="mt-5 font-serif text-xl font-semibold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">{desc}</p>
          </div>
        ))}
      </div>
      <div className="mt-10">
        <Button href="/services" variant="ghost">
          {t("seeAll")}
        </Button>
      </div>
    </Section>
  );
}
