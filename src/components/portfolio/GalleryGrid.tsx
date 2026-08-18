"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: string;
}

const categories = ["All", "Cuts", "Color", "Extensions", "Braids & Weaves"] as const;

export function GalleryGrid({ images }: { images: PortfolioImage[] }) {
  const [active, setActive] = useState<(typeof categories)[number]>("All");

  const filtered =
    active === "All" ? images : images.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === cat
                ? "border-wine bg-wine text-ivory"
                : "border-ink/15 text-ink/70 hover:border-wine hover:text-wine"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[3/4] overflow-hidden rounded-xl"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-ink/15 py-20 text-center">
          <ImageOff className="text-ink/25" size={32} strokeWidth={1.25} />
          <p className="mt-4 text-ink/60">
            {active === "All" ? "Portfolio" : active} photos coming soon.
          </p>
          <p className="mt-1 text-sm text-ink/40">
            Follow{" "}
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
        </div>
      )}
    </div>
  );
}
