import type { Metadata } from "next";
import { getServices } from "@/lib/pricing";
import { Section, Eyebrow } from "@/components/ui/Section";
import { BookingWizard } from "@/components/booking/BookingWizard";

export const metadata: Metadata = {
  title: "Book Now",
  description: "Book your appointment at Waylee Hair & Beauty, Geneva.",
};

export default async function BookPage() {
  const services = await getServices();

  return (
    <Section className="pt-16 md:pt-20">
      <Eyebrow>Book Now</Eyebrow>
      <h1 className="max-w-2xl font-serif text-4xl font-bold md:text-5xl">
        Reserve your appointment.
      </h1>
      <div className="mt-12 max-w-2xl">
        <BookingWizard services={services} />
      </div>
    </Section>
  );
}
