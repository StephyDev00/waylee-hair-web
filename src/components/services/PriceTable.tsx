import type { Service } from "@/lib/pricing";

function formatChf(value?: number | null) {
  if (value == null) return "—";
  return `CHF ${Number(value).toFixed(0)}.-`;
}

export function PriceTable({ title, services }: { title: string; services: Service[] }) {
  const hasTiers = services.some((s) => s.price_court != null);

  return (
    <div>
      <h3 className="font-serif text-2xl font-semibold text-ink">{title}</h3>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-sm">
          {hasTiers && (
            <thead>
              <tr className="border-b border-ink/15 text-left text-xs uppercase tracking-wide text-ink/50">
                <th className="py-3 pr-4 font-medium">Service</th>
                <th className="py-3 px-4 font-medium">Court</th>
                <th className="py-3 px-4 font-medium">Mi-long</th>
                <th className="py-3 px-4 font-medium">Long</th>
              </tr>
            </thead>
          )}
          <tbody>
            {services.map((s) => (
              <tr key={s.id} className="border-b border-ink/10">
                <td className="py-4 pr-4 font-medium text-ink">
                  {s.name}
                  <span className="block text-xs font-normal text-ink/45">
                    {s.duration_minutes} min
                  </span>
                </td>
                {hasTiers ? (
                  <>
                    <td className="py-4 px-4 text-wine">{formatChf(s.price_court)}</td>
                    <td className="py-4 px-4 text-wine">{formatChf(s.price_mi_long)}</td>
                    <td className="py-4 px-4 text-wine">{formatChf(s.price_long)}</td>
                  </>
                ) : (
                  <td className="py-4 px-4 text-wine" colSpan={3}>
                    {formatChf(s.flat_price)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
