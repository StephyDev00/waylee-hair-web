"use client";

import { Button } from "@/components/ui/Button";
import type { Service } from "@/lib/pricing";
import type { CustomerDetails } from "@/components/booking/CustomerDetailsForm";

export function BookingSummary({
  service,
  slotStart,
  preferredTimeText,
  details,
  onConfirm,
  submitting,
  errorMessage,
}: {
  service: Service;
  slotStart: string | null;
  preferredTimeText: string;
  details: CustomerDetails;
  onConfirm: () => void;
  submitting: boolean;
  errorMessage: string | null;
}) {
  const whenLabel = slotStart
    ? new Date(slotStart).toLocaleString("en-CH", { dateStyle: "full", timeStyle: "short" })
    : preferredTimeText || "Preferred time to be confirmed";

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-ivory-soft p-6">
        <p className="text-xs uppercase tracking-wide text-ink/50">Service</p>
        <p className="font-serif text-xl font-semibold">{service.name}</p>
        <p className="mt-4 text-xs uppercase tracking-wide text-ink/50">When</p>
        <p>{whenLabel}</p>
        <p className="mt-4 text-xs uppercase tracking-wide text-ink/50">Details</p>
        <p>{details.customerName}</p>
        <p className="text-sm text-ink/60">
          {details.customerEmail} · {details.customerPhone}
        </p>
        {details.notes && <p className="mt-2 text-sm text-ink/60">{details.notes}</p>}
      </div>

      {errorMessage && (
        <p className="mt-4 text-sm text-wine-dark">{errorMessage}</p>
      )}

      <Button onClick={onConfirm} disabled={submitting} className="mt-6">
        {submitting ? "Confirming…" : "Confirm booking"}
      </Button>
    </div>
  );
}
