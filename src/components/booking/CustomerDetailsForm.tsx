"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export interface CustomerDetails {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
}

export function CustomerDetailsForm({
  onSubmit,
}: {
  onSubmit: (data: CustomerDetails) => void;
}) {
  const t = useTranslations("book.details");
  const detailsSchema = z.object({
    customerName: z.string().min(2, t("nameError")),
    customerEmail: z.string().email(t("emailError")),
    customerPhone: z.string().min(4, t("phoneError")),
    notes: z.string().max(1000).optional().or(z.literal("")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDetails>({ resolver: zodResolver(detailsSchema) });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-ink/80">{t("name")}</label>
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
          <label className="mb-1.5 block text-sm font-medium text-ink/80">{t("email")}</label>
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
          <label className="mb-1.5 block text-sm font-medium text-ink/80">{t("phone")}</label>
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
        <label className="mb-1.5 block text-sm font-medium text-ink/80">{t("notes")}</label>
        <textarea
          rows={3}
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
          {...register("notes")}
        />
      </div>
      <Button type="submit">{t("continue")}</Button>
    </form>
  );
}
