import { google } from "googleapis";
import { addMinutes, isBefore } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { getAuthorizedCalendarClient, markNeedsReconnect } from "@/lib/google/calendarConnection";
import { BUSINESS_HOURS, SALON_TIMEZONE } from "@/lib/business-hours";

export interface Slot {
  start: string; // ISO
  end: string; // ISO
}

interface BusyBlock {
  start: Date;
  end: Date;
}

/**
 * Returns available slots for the given local calendar date, sized by
 * durationMinutes, after subtracting the owner's real Google Calendar
 * free/busy blocks. Returns null if the calendar isn't connected/configured,
 * signalling the caller to fall back to request-based booking.
 */
export async function getAvailableSlots(
  dateStr: string, // 'YYYY-MM-DD' in salon-local time
  durationMinutes: number
): Promise<Slot[] | null> {
  const authorized = await getAuthorizedCalendarClient();
  if (!authorized) return null;

  const { client, calendarId } = authorized;

  const [year, month, day] = dateStr.split("-").map(Number);
  const dayOfWeek = new Date(Date.UTC(year, month - 1, day)).getUTCDay();
  const hours = BUSINESS_HOURS[dayOfWeek];
  if (!hours) return []; // salon closed that day

  const dayStartLocal = `${dateStr}T${hours.open}:00`;
  const dayEndLocal = `${dateStr}T${hours.close}:00`;
  const timeMin = fromZonedTime(dayStartLocal, SALON_TIMEZONE);
  const timeMax = fromZonedTime(dayEndLocal, SALON_TIMEZONE);

  let busy: BusyBlock[] = [];
  try {
    const calendar = google.calendar({ version: "v3", auth: client });
    const res = await calendar.freebusy.query({
      requestBody: {
        timeMin: timeMin.toISOString(),
        timeMax: timeMax.toISOString(),
        items: [{ id: calendarId }],
      },
    });
    const rawBusy = res.data.calendars?.[calendarId]?.busy ?? [];
    busy = rawBusy.map((b) => ({
      start: new Date(b.start ?? timeMin),
      end: new Date(b.end ?? timeMax),
    }));
  } catch (err) {
    console.error("freebusy.query failed", err);
    await markNeedsReconnect();
    return null;
  }

  const slots: Slot[] = [];
  let cursor = timeMin;
  const stepMinutes = 30;

  while (addMinutes(cursor, durationMinutes).getTime() <= timeMax.getTime()) {
    const slotEnd = addMinutes(cursor, durationMinutes);
    const overlapsBusy = busy.some(
      (b) => isBefore(cursor, b.end) && isBefore(b.start, slotEnd)
    );
    const now = new Date();
    if (!overlapsBusy && isBefore(now, cursor)) {
      slots.push({ start: cursor.toISOString(), end: slotEnd.toISOString() });
    }
    cursor = addMinutes(cursor, stepMinutes);
  }

  return slots;
}

export function toSalonLocalLabel(iso: string) {
  const zoned = toZonedTime(iso, SALON_TIMEZONE);
  return zoned.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}
