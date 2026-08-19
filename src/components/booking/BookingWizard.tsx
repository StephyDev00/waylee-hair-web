"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import type { Service } from "@/lib/pricing";
import { ServiceSelect } from "@/components/booking/ServiceSelect";
import { DateTimeStep } from "@/components/booking/DateTimeStep";
import { CustomerDetailsForm, type CustomerDetails } from "@/components/booking/CustomerDetailsForm";
import { BookingSummary } from "@/components/booking/BookingSummary";

type Step = "service" | "datetime" | "details" | "confirm";

interface Slot {
  start: string;
  end: string;
}

export function BookingWizard({ services }: { services: Service[] }) {
  const router = useRouter();
  const t = useTranslations("book");
  const [step, setStep] = useState<Step>("service");
  const [service, setService] = useState<Service | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);
  const [preferredTimeText, setPreferredTimeText] = useState("");
  const [details, setDetails] = useState<CustomerDetails | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const steps: Step[] = ["service", "datetime", "details", "confirm"];
  const currentIndex = steps.indexOf(step);

  async function handleConfirm() {
    if (!service || !details) return;
    setSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: service.id,
          startIso: slot?.start ?? "",
          customerName: details.customerName,
          customerEmail: details.customerEmail,
          customerPhone: details.customerPhone,
          notes: details.notes,
          preferredTimeText,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong");
      }
      router.push("/book/success");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <ol className="mb-10 flex gap-2 text-xs uppercase tracking-wide text-ink/40">
        {[t("steps.service"), t("steps.datetime"), t("steps.details"), t("steps.confirm")].map(
          (label, i) => (
            <li
              key={label}
              className={`flex-1 border-b-2 pb-2 ${
                i <= currentIndex ? "border-wine text-wine" : "border-ink/10"
              }`}
            >
              {label}
            </li>
          )
        )}
      </ol>

      {step === "service" && (
        <ServiceSelect
          services={services}
          onSelect={(s) => {
            setService(s);
            setStep("datetime");
          }}
        />
      )}

      {step === "datetime" && service && (
        <DateTimeStep
          durationMinutes={service.duration_minutes}
          onPick={(s) => {
            setSlot(s);
            setStep("details");
          }}
          onFallback={setPreferredTimeText}
        />
      )}

      {step === "datetime" && service && preferredTimeText && !slot && (
        <div className="mt-6">
          <button
            onClick={() => setStep("details")}
            className="text-sm text-wine hover:underline"
          >
            {t("dateTime.continueRequest")}
          </button>
        </div>
      )}

      {step === "details" && (
        <CustomerDetailsForm
          onSubmit={(d) => {
            setDetails(d);
            setStep("confirm");
          }}
        />
      )}

      {step === "confirm" && service && details && (
        <BookingSummary
          service={service}
          slotStart={slot?.start ?? null}
          preferredTimeText={preferredTimeText}
          details={details}
          onConfirm={handleConfirm}
          submitting={submitting}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
}
