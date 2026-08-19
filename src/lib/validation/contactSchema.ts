import { z } from "zod";

// Server-side structural validation (route.ts) — messages here are never
// shown to a user, so they don't need translating.
export const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().max(40).optional().or(z.literal("")),
  message: z.string().min(10).max(2000),
  // Honeypot field — real users never fill this in.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

// Client-side schema with translated messages for inline field errors.
export function createContactSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t("nameError")).max(120),
    email: z.string().email(t("emailError")),
    phone: z.string().max(40).optional().or(z.literal("")),
    message: z.string().min(10, t("messageError")).max(2000),
    company: z.string().max(0).optional().or(z.literal("")),
  });
}
