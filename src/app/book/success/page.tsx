import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Booking Received",
};

export default function BookingSuccessPage() {
  return (
    <Section className="flex min-h-[60vh] flex-col items-center justify-center text-center py-24">
      <CheckCircle2 className="text-wine" size={44} strokeWidth={1.25} />
      <h1 className="mt-6 font-serif text-4xl font-bold">Thank you!</h1>
      <p className="mt-4 max-w-md text-ink/65">
        We&apos;ve received your booking and sent a confirmation to your email.
        If we need to confirm anything further, we&apos;ll reach out directly.
      </p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </Section>
  );
}
