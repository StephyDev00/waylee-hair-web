import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation/contactSchema";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getResendClient, EMAIL_FROM } from "@/lib/email/resend";
import { ContactFormNotice } from "@/lib/email/templates/ContactFormNotice";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  // Honeypot tripped — pretend success, drop silently.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, email, phone, message } = parsed.data;

  const supabase = createServiceRoleClient();
  const { error } = await supabase
    .from("contact_messages")
    .insert({ name, email, phone: phone || null, message });

  if (error) {
    console.error("contact_messages insert failed", error);
    return NextResponse.json({ error: "Could not save message" }, { status: 500 });
  }

  const resend = getResendClient();
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;
  if (resend && ownerEmail) {
    resend.emails
      .send({
        from: EMAIL_FROM,
        to: ownerEmail,
        subject: `New contact form message from ${name}`,
        react: ContactFormNotice({ name, email, phone, message }),
      })
      .catch((err) => console.error("contact notification email failed", err));
  } else {
    console.warn("Resend not configured — skipping contact notification email");
  }

  return NextResponse.json({ ok: true });
}
