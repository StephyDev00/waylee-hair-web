import { PhoneCall } from "lucide-react";

export function BookingUnavailableNotice({
  preferredTimeText,
  onChangePreferredTime,
}: {
  preferredTimeText: string;
  onChangePreferredTime: (value: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-wine/20 bg-wine/5 p-6">
      <div className="flex items-start gap-3">
        <PhoneCall className="mt-0.5 shrink-0 text-wine" size={20} />
        <div>
          <p className="font-medium text-wine">Online availability isn&apos;t live yet</p>
          <p className="mt-1 text-sm text-ink/65">
            We&apos;re still setting up live calendar booking. Tell us your
            preferred day &amp; time below and we&apos;ll confirm by phone or
            email — or call us directly at{" "}
            <a href="tel:+41782495584" className="text-wine hover:underline">
              078 249 55 84
            </a>
            .
          </p>
        </div>
      </div>
      <div className="mt-4">
        <label className="mb-1.5 block text-sm font-medium text-ink/80">
          Preferred day &amp; time
        </label>
        <input
          value={preferredTimeText}
          onChange={(e) => onChangePreferredTime(e.target.value)}
          placeholder="e.g. Thursday afternoon, or Sat 10 Aug around 2pm"
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
        />
      </div>
    </div>
  );
}
