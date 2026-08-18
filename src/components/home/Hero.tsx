import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { LineArtMotif } from "@/components/brand/LineArtMotif";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink text-ivory">
      <LineArtMotif className="pointer-events-none absolute -right-16 top-0 h-[36rem] w-[36rem] text-ivory/[0.06] md:-right-10" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:px-10 md:py-32">
        <div className="relative z-10">
          <p className="mb-4 text-xs tracking-[0.3em] uppercase text-wine-light">
            Geneva &middot; Independent Salon
          </p>
          <h1 className="font-serif text-4xl font-bold leading-[1.1] md:text-6xl">
            Hair, crafted with
            <span className="block italic font-light text-ivory/90">
              precision &amp; care.
            </span>
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/70">
            Extensions, lissage, and cuts tailored to you — from a boutique
            salon in the heart of Geneva.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/book">Book Now</Button>
            <Button href="/portfolio" variant="secondary" className="!border-ivory/30 !text-ivory hover:!border-wine-light hover:!text-wine-light">
              View Portfolio
            </Button>
          </div>
        </div>

        <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl md:justify-self-end md:max-w-sm">
          <Image
            src="/images/interior/salon-2.jpg"
            alt="Waylee Hair & Beauty salon interior in Geneva"
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 24rem, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
