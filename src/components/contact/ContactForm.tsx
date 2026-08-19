"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { createContactSchema, type ContactInput } from "@/lib/validation/contactSchema";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(createContactSchema(t)) });

  async function onSubmit(data: ContactInput) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-wine/20 bg-wine/5 p-8 text-center">
        <p className="font-serif text-xl text-wine">{t("successTitle")}</p>
        <p className="mt-2 text-sm text-ink/60">{t("successBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Honeypot — hidden from real visitors */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
        {...register("company")}
      />

      <div>
        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink/80">
          {t("name")}
        </label>
        <input
          id="name"
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
          {...register("name")}
        />
        {errors.name && <p className="mt-1 text-xs text-wine-dark">{errors.name.message}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink/80">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
            {...register("email")}
          />
          {errors.email && <p className="mt-1 text-xs text-wine-dark">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink/80">
            {t("phone")}
          </label>
          <input
            id="phone"
            className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink/80">
          {t("message")}
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-lg border border-ink/15 bg-ivory px-4 py-2.5 text-sm focus:border-wine focus:outline-none focus:ring-1 focus:ring-wine"
          {...register("message")}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-wine-dark">{errors.message.message}</p>
        )}
      </div>

      {status === "error" && <p className="text-sm text-wine-dark">{t("error")}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
