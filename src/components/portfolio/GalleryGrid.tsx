"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ImageOff } from "lucide-react";

export interface PortfolioImage {
  src: string;
  alt: string;
  category: "cuts" | "color" | "extensions" | "braids";
}

const categoryKeys = ["all", "cuts", "color", "extensions", "braids"] as const;
type CategoryKey = (typeof categoryKeys)[number];

export function GalleryGrid({ images }: { images: PortfolioImage[] }) {
  const t = useTranslations("portfolio");
  const [active, setActive] = useState<CategoryKey>("all");

  const filtered = active === "all" ? images : images.filter((img) => img.category === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categoryKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
              active === key
                ? "border-wine bg-wine text-ivory"
                : "border-ink/15 text-ink/70 hover:border-wine hover:text-wine"
            }`}
          >
            {t(`categories.${key}`)}
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
            {active !== "all" ? `${t(`categories.${active}`)} ` : ""}
            {t("emptyState")}
          </p>
          <p className="mt-1 text-sm text-ink/40">
            {t("followPrefix")}{" "}
            <a
              href="https://www.instagram.com/waylee.hair.beauty"
              target="_blank"
              rel="noreferrer"
              className="text-wine hover:underline"
            >
              @waylee.hair.beauty
            </a>{" "}
            {t("followSuffix")}
          </p>
        </div>
      )}
    </div>
  );
}
