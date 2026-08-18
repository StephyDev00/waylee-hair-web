import { NextResponse } from "next/server";
import { addMinutes } from "date-fns";
import { bookingSchema } from "@/lib/validation/bookingSchema";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getAvailableSlots } from "@/lib/google/freebusy";
import { createCalendarEvent } from "@/lib/google/events";
import { isGoogleConfigured } from "@/lib/google/oauthClient";
import { getResendClient, EMAIL_FROM } from "@/lib/email/resend";
import { BookingConfirmation } from "@/lib/email/templates/BookingConfirmation";
import { OwnerNewBookingNotice } from "@/lib/email/templates/OwnerNewBookingNotice";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const {
    serviceId,
    startIso,
    customerName,
    customerEmail,
    customerPhone,
    notes,
    preferredTimeText,
  } = parsed.data;

  const supabase = createServiceRoleClient();
  const { data: service, error: serviceError } = await supabase
    .from("services")
    .select("*")
    .eq("id", serviceId)
    .maybeSingle();

  if (serviceError || !service) {
    return NextResponse.json({ error: "Unknown service" }, { status: 400 });
  }

  const calendarConnected = isGoogleConfigured();
  let googleEventId: string | null = null;
  let status: "confirmed" | "pending_manual" = "pending_manual";
  const start = startIso ? new Date(startIso) : new Date();
  const end = addMinutes(start, service.duration_minutes);

  if (calendarConnected && startIso) {
    // Re-check the slot is still free immediately before booking to guard
    // against a race between two visitors picking the same time.
    const dateStr = startIso.slice(0, 10);
    const freshSlots = await getAvailableSlots(dateStr, service.duration_minutes);
    const stillFree = freshSlots?.some((s) => s.start === startIso);

    if (freshSlots !== null && !stillFree) {
      return NextResponse.json(
        { error: "That slot was just booked — please pick another." },
        { status: 409 }
      );
    }

    if (freshSlots !== null) {
      try {
        googleEventId = await createCalendarEvent({
          summary: `${service.name} — ${customerName}`,
          description: `Service: ${service.name}\nPhone: ${customerPhone}\nEmail: ${customerEmail}\nNotes: ${notes || "—"}`,
          startIso: start.toISOString(),
          endIso: end.toISOString(),
        });
        status = "confirmed";
      } catch (err) {
        console.error("createCalendarEvent failed", err);
      }
    }
  }

  const { data: booking, error: insertError } = await supabase
    .from("bookings")
    .insert({
      service_id: serviceId,
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: customerPhone,
      requested_start: start.toISOString(),
      requested_end: end.toISOString(),
      status,
      notes: notes || preferredTimeText || null,
      google_event_id: googleEventId,
    })
    .select()
    .single();

  if (insertError || !booking) {
    console.error("bookings insert failed", insertError);
    return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
  }

  const whenLabel =
    status === "confirmed"
      ? start.toLocaleString("en-CH", { dateStyle: "full", timeStyle: "short" })
      : preferredTimeText || "a time to be confirmed";

  const resend = getResendClient();
  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL;
  if (resend) {
    resend.emails
      .send({
        from: EMAIL_FROM,
        to: customerEmail,
        subject:
          status === "confirmed" ? "Your appointment is confirmed" : "We received your booking request",
        react: BookingConfirmation({
          customerName,
          serviceName: service.name,
          whenLabel,
          pending: status !== "confirmed",
        }),
      })
      .catch((err) => console.error("customer confirmation email failed", err));

    if (ownerEmail) {
      resend.emails
        .send({
          from: EMAIL_FROM,
          to: ownerEmail,
          subject: status === "confirmed" ? "New booking" : "New booking request",
          react: OwnerNewBookingNotice({
            customerName,
            customerEmail,
            customerPhone,
            serviceName: service.name,
            whenLabel,
            notes: notes || undefined,
            pending: status !== "confirmed",
          }),
        })
        .catch((err) => console.error("owner notification email failed", err));
    }
  } else {
    console.warn("Resend not configured — skipping booking emails");
  }

  await supabase
    .from("bookings")
    .update({ confirmation_email_sent_at: new Date().toISOString() })
    .eq("id", booking.id);

  return NextResponse.json({ bookingId: booking.id, status });
}
