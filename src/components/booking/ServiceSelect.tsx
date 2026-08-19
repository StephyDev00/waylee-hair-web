"use client";

import { useTranslations } from "next-intl";
import type { Service } from "@/lib/pricing";
import { categoryLabels } from "@/data/services-seed";

export function ServiceSelect({
  services,
  onSelect,
}: {
  services: Service[];
  onSelect: (service: Service) => void;
}) {
  const t = useTranslations("book.serviceSelect");
  const grouped = services.reduce<Record<string, Service[]>>((acc, s) => {
    (acc[s.category] ??= []).push(s);
    return acc;
  }, {});

  return (
    <div className="space-y-10">
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat}>
          <h3 className="mb-3 text-xs uppercase tracking-[0.2em] text-ink/50">
            {categoryLabels[cat as keyof typeof categoryLabels] ?? cat}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {items.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelect(s)}
                className="flex items-center justify-between rounded-xl border border-ink/10 bg-ivory px-5 py-4 text-left transition-colors hover:border-wine hover:bg-wine/5"
              >
                <span>
                  <span className="block font-medium">{s.name}</span>
                  <span className="text-xs text-ink/45">{s.duration_minutes} min</span>
                </span>
                <span className="text-wine text-sm">
                  {s.flat_price != null ? `CHF ${s.flat_price}.-` : t("seePricing")}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
