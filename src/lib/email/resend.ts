import { Resend } from "resend";

let client: Resend | null = null;

// Lazily constructed and safe to call even when RESEND_API_KEY is unset —
// callers should treat a null return as "email sending is not configured yet"
// and log rather than throw, so a missing key never breaks a booking/contact submit.
export function getResendClient(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (!client) client = new Resend(process.env.RESEND_API_KEY);
  return client;
}

export const EMAIL_FROM = "Waylee Hair & Beauty <onboarding@resend.dev>";
