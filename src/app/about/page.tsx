import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Waylee Hair & Beauty, an independent salon in Geneva.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-8 pt-16 md:pt-20">
        <Eyebrow>About Waylee</Eyebrow>
        <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">
          A personal craft, not a franchise.
        </h1>
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
            <p>
              Waylee Hair &amp; Beauty is an independent hair studio in Geneva
              built around one philosophy: hair should be treated as
              craftsmanship, not a production line. Every appointment — from a
              precision cut to a full lissage or tape-in transformation — is
              approached with the same care and attention to detail.
            </p>
            <p>
              The studio specializes in extensions (tape-in and tissage),
              smoothing treatments (lissage tanin and indien), and the
              Métamorphose — Waylee Collection, a curated range of tape-in
              textures and lengths for a completely custom result.
            </p>
            <p className="text-ink/50 text-sm italic">
              Full biography, training &amp; certifications to be added by the
              salon owner.
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button href="/book">Book an appointment</Button>
        </div>
      </Section>
    </>
  );
}
