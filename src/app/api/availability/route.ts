import { NextResponse } from "next/server";
import { availabilitySchema } from "@/lib/validation/bookingSchema";
import { getAvailableSlots } from "@/lib/google/freebusy";
import { isGoogleConfigured } from "@/lib/google/oauthClient";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = availabilitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  if (!isGoogleConfigured()) {
    return NextResponse.json({ connected: false });
  }

  const slots = await getAvailableSlots(parsed.data.date, parsed.data.durationMinutes);
  if (slots === null) {
    return NextResponse.json({ connected: false });
  }

  return NextResponse.json({ connected: true, slots });
}
