"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";

const detailsSchema = z.object({
  customerName: z.string().min(2, "Please enter your name"),
  customerEmail: z.string().email("Please enter a valid email"),
  customerPhone: z.string().min(4, "Please enter a phone number"),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export type CustomerDetails = z.infer<typeof detailsSchema>;

export function CustomerDetailsForm({
  onSubmit,
}: {
  onSubmit: (data: CustomerDetails) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDetails>({ resolver: zodResolver(detailsSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink/80">Name</label>
        <input
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
          {...register("customerName")}
        />
        {errors.customerName && (
          <p className="mt-1 text-xs text-wine-dark">{errors.customerName.message}</p>
        )}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Email</label>
          <input
            type="email"
            className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
            {...register("customerEmail")}
          />
          {errors.customerEmail && (
            <p className="mt-1 text-xs text-wine-dark">{errors.customerEmail.message}</p>
          )}
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-ink/80">Phone</label>
          <input
            className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
            {...register("customerPhone")}
          />
          {errors.customerPhone && (
            <p className="mt-1 text-xs text-wine-dark">{errors.customerPhone.message}</p>
          )}
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink/80">
          Notes (optional)
        </label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
          {...register("notes")}
        />
      </div>
      <Button type="submit">Continue</Button>
    </form>
  );
}
