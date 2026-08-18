import { Section } from "@/components/ui/Section";

export function TestimonialTeaser() {
  return (
    <Section className="bg-ink text-ivory text-center">
      <p className="font-script text-4xl text-wine-light md:text-5xl">
        &ldquo;Métamorphose.&rdquo;
      </p>
      <p className="mx-auto mt-6 max-w-lg text-ivory/70">
        Client reviews are on their way — in the meantime, see the real work
        and real reactions on our{" "}
        <a
          href="https://www.instagram.com/waylee.hair.beauty"
          target="_blank"
          rel="noreferrer"
          className="text-wine-light hover:underline"
        >
          Instagram
        </a>
        .
      </p>
    </Section>
  );
}
