import Image from "next/image";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export function PortfolioHighlights() {
  return (
    <Section className="bg-ivory-soft">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-xl">
          <Eyebrow>The work</Eyebrow>
          <h2 className="font-serif text-3xl font-bold md:text-4xl">
            A glimpse of the studio.
          </h2>
        </div>
        <Button href="/portfolio" variant="secondary">
          View full portfolio
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
        Full styling &amp; result photography coming soon — follow{" "}
        <a
          href="https://www.instagram.com/waylee.hair.beauty"
          target="_blank"
          rel="noreferrer"
          className="text-wine hover:underline"
        >
          @waylee.hair.beauty
        </a>{" "}
        for the latest work.
      </p>
    </Section>
  );
}
