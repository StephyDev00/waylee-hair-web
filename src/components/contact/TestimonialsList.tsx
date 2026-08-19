import { useTranslations } from "next-intl";

interface Testimonial {
  id: string;
  author_name: string;
  quote: string;
}

export function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  const t = useTranslations("contact");

  if (testimonials.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink/50">
        {t("reviewsComingSoon")}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((item) => (
        <blockquote
          key={item.id}
          className="rounded-2xl border border-ink/10 bg-ivory-soft p-6 text-sm leading-relaxed text-ink/75"
        >
          &ldquo;{item.quote}&rdquo;
          <footer className="mt-3 text-xs font-medium uppercase tracking-wide text-wine">
            {item.author_name}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
