import { useTranslations } from "next-intl";
import { Section } from "@/components/ui/Section";

export function TestimonialTeaser() {
  const t = useTranslations("home.testimonial");

  return (
    <Section className="bg-ink text-ivory text-center">
      <p className="font-script text-4xl text-wine-light md:text-5xl">
        &ldquo;{t("quote")}&rdquo;
      </p>
      <p className="mx-auto mt-6 max-w-lg text-ivory/70">
        {t("body")}{" "}
        <a
          href="https://www.instagram.com/waylee.hair.beauty"
          target="_blank"
          rel="noreferrer"
          className="text-wine-light hover:underline"
        >
          {t("instagram")}
        </a>
        .
      </p>
    </Section>
  );
}
