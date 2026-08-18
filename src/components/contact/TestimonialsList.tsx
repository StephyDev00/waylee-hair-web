interface Testimonial {
  id: string;
  author_name: string;
  quote: string;
}

export function TestimonialsList({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-ink/15 p-8 text-center text-ink/50">
        Reviews coming soon.
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {testimonials.map((t) => (
        <blockquote
          key={t.id}
          className="rounded-2xl border border-ink/10 bg-ivory-soft p-6 text-sm leading-relaxed text-ink/75"
        >
          &ldquo;{t.quote}&rdquo;
          <footer className="mt-3 text-xs font-medium uppercase tracking-wide text-wine">
            {t.author_name}
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
