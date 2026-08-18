import { google } from "googleapis";
import { getAuthorizedCalendarClient } from "@/lib/google/calendarConnection";

export interface CreateEventParams {
  summary: string;
  description: string;
  startIso: string;
  endIso: string;
}

// Returns the created event's id, or null if the calendar isn't connected.
export async function createCalendarEvent(params: CreateEventParams): Promise<string | null> {
  const authorized = await getAuthorizedCalendarClient();
  if (!authorized) return null;

  const { client, calendarId } = authorized;
  const calendar = google.calendar({ version: "v3", auth: client });

  const res = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: params.summary,
      description: params.description,
      start: { dateTime: params.startIso },
      end: { dateTime: params.endIso },
    },
  });

  return res.data.id ?? null;
}
