import type { Metadata } from "next";
import { Music2, MapPin, Phone, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { Section, Eyebrow } from "@/components/ui/Section";
import { MapEmbed } from "@/components/contact/MapEmbed";
import { ContactForm } from "@/components/contact/ContactForm";
import { TestimonialsList } from "@/components/contact/TestimonialsList";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });
  return { title: t("eyebrow"), description: t("title") };
}

async function getTestimonials() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("testimonials")
      .select("id, author_name, quote")
      .eq("is_featured", true)
      .order("display_order");
    return data ?? [];
  } catch {
    return [];
  }
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const testimonials = await getTestimonials();

  const hours = [
    { label: t("hoursTuesSat"), value: "10:00 – 18:30" },
    { label: t("hoursSun"), value: "11:00 – 18:30" },
    { label: t("hoursMon"), value: t("closed") },
  ];

  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">{t("title")}</h1>
      </Section>

      <Section className="pt-0">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <MapEmbed />
            <div className="mt-8 space-y-4 text-sm text-ink/75">
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-wine" />
                Rue Leschot 2, 1205 Genève
              </p>
              <p className="flex items-center gap-3">
                <Phone size={18} className="shrink-0 text-wine" />
                <a href="tel:+41782495584" className="hover:text-wine">
                  078 249 55 84
                </a>
              </p>
              <div className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0 text-wine" />
                <div>
                  {hours.map((h) => (
                    <p key={h.label}>
                      <span className="text-ink/50">{h.label}:</span> {h.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <a
                  href="https://www.instagram.com/waylee.hair.beauty"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="rounded-full border border-ink/15 p-2.5 hover:border-wine hover:text-wine"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href="https://www.tiktok.com/@waylee.hair.beauty"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                  className="rounded-full border border-ink/15 p-2.5 hover:border-wine hover:text-wine"
                >
                  <Music2 size={18} />
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-serif text-2xl font-semibold">{t("sendMessage")}</h2>
            <div className="mt-5">
              <ContactForm />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="font-serif text-2xl font-semibold">{t("whatClientsSay")}</h2>
          <div className="mt-6">
            <TestimonialsList testimonials={testimonials} />
          </div>
        </div>
      </Section>
    </>
  );
}
