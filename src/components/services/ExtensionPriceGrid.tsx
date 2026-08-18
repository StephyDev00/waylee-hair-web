import type { ExtensionPrice } from "@/lib/pricing";
import { textureLabels } from "@/data/services-seed";

export function ExtensionPriceGrid({ prices }: { prices: ExtensionPrice[] }) {
  const lengths = Array.from(new Set(prices.map((p) => p.length_inches))).sort(
    (a, b) => a - b
  );
  const textures = ["lisses", "textures", "colores"] as const;

  const priceFor = (length: number, texture: string) =>
    prices.find((p) => p.length_inches === length && p.texture === texture)?.price;

  return (
    <div className="rounded-2xl border border-wine/20 bg-ink px-6 py-10 text-ivory md:px-12">
      <p className="font-script text-4xl text-wine-light md:text-5xl">Métamorphose</p>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-ivory/50">
        Waylee Collection — Tape In
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-ivory/15 text-left text-xs uppercase tracking-wide text-ivory/50">
              <th className="py-3 pr-4 font-medium">Length</th>
              {textures.map((t) => (
                <th key={t} className="py-3 px-4 font-medium">
                  {textureLabels[t]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lengths.map((length) => (
              <tr key={length} className="border-b border-ivory/10">
                <td className="py-3 pr-4 font-medium">{length}&Prime;</td>
                {textures.map((t) => (
                  <td key={t} className="py-3 px-4 text-wine-light">
                    CHF {priceFor(length, t)}.-
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-ivory/40">
        Textures available: Bodywaves, KinkyStraight, Deepwaves, and more. Price per package, in Swiss Francs.
      </p>
    </div>
  );
}
