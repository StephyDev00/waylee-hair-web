import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Music2, MapPin, Phone } from "lucide-react";
import { LineArtMotif } from "@/components/brand/LineArtMotif";
import { InstagramIcon } from "@/components/brand/SocialIcons";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden bg-ink text-ivory">
      <LineArtMotif className="pointer-events-none absolute -right-10 -top-10 h-72 w-72 text-ivory/5 md:h-96 md:w-96" />
      <Container className="relative py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <span className="relative block h-14 w-14 overflow-hidden rounded-full bg-ivory/10">
              <Image
                src="/images/logo/waylee-icon.jpg"
                alt="Waylee Hair & Beauty"
                fill
                className="object-cover"
                sizes="56px"
              />
            </span>
            <span className="mt-3 block font-serif text-2xl font-bold tracking-wide">WAYLEE</span>
            <span className="mt-1 block text-[0.65rem] tracking-[0.35em] uppercase text-ivory/60">
              Hair &amp; Beauty
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/80">{t("tagline")}</p>
          </div>

          <div className="text-sm text-ivory/80">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ivory/50">{t("visit")}</p>
            <p className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              Rue Leschot 2, 1205 Genève
            </p>
            <p className="mt-2 flex items-center gap-2">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+41782495584" className="hover:text-wine-light">
                078 249 55 84
              </a>
            </p>
            <div className="mt-4 space-y-1 text-ivory/60">
              <p>{t("hoursLine1")}</p>
              <p>{t("hoursLine2")}</p>
            </div>
          </div>

          <div className="text-sm text-ivory/80">
            <p className="mb-3 text-xs uppercase tracking-[0.2em] text-ivory/50">{t("follow")}</p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/waylee.hair.beauty"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-ivory/20 p-2 hover:border-wine-light hover:text-wine-light"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@waylee.hair.beauty"
                target="_blank"
                rel="noreferrer"
                aria-label="TikTok"
                className="rounded-full border border-ivory/20 p-2 hover:border-wine-light hover:text-wine-light"
              >
                <Music2 size={18} />
              </a>
            </div>
            <Link
              href="/book"
              className="mt-6 inline-block text-sm text-wine-light hover:underline"
            >
              {t("bookLink")}
            </Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-ivory/10 pt-6 text-xs text-ivory/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Waylee Hair &amp; Beauty. {t("rights")}</p>
          <p>{t("location")}</p>
        </div>
      </Container>
    </footer>
  );
}
