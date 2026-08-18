import { createServiceRoleClient } from "@/lib/supabase/server";
import { encrypt, decrypt } from "@/lib/crypto";
import { getOAuthClient } from "@/lib/google/oauthClient";

export interface CalendarConnectionRow {
  id: number;
  google_account_email: string | null;
  calendar_id: string | null;
  encrypted_refresh_token: string | null;
  encryption_iv: string | null;
  encryption_auth_tag: string | null;
  scope: string | null;
  needs_reconnect: boolean;
  connected_at: string | null;
}

export async function getCalendarConnection(): Promise<CalendarConnectionRow | null> {
  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("calendar_connection")
    .select("*")
    .eq("id", 1)
    .maybeSingle();
  return data ?? null;
}

export async function saveCalendarConnection(params: {
  refreshToken: string;
  googleAccountEmail: string;
  scope: string;
}) {
  const { ciphertext, iv, authTag } = encrypt(params.refreshToken);
  const supabase = createServiceRoleClient();
  await supabase.from("calendar_connection").upsert({
    id: 1,
    google_account_email: params.googleAccountEmail,
    calendar_id: "primary",
    encrypted_refresh_token: ciphertext,
    encryption_iv: iv,
    encryption_auth_tag: authTag,
    scope: params.scope,
    needs_reconnect: false,
    connected_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });
}

export async function clearCalendarConnection() {
  const supabase = createServiceRoleClient();
  await supabase
    .from("calendar_connection")
    .update({
      google_account_email: null,
      encrypted_refresh_token: null,
      encryption_iv: null,
      encryption_auth_tag: null,
      scope: null,
      needs_reconnect: false,
      connected_at: null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", 1);
}

export async function markNeedsReconnect() {
  const supabase = createServiceRoleClient();
  await supabase
    .from("calendar_connection")
    .update({ needs_reconnect: true, updated_at: new Date().toISOString() })
    .eq("id", 1);
}

// Returns an authenticated OAuth2 client for the owner's calendar, or null if
// not connected / not configured — callers should treat null as "fall back to
// request-based booking."
export async function getAuthorizedCalendarClient() {
  const row = await getCalendarConnection();
  if (!row?.encrypted_refresh_token || !row.encryption_iv || !row.encryption_auth_tag) {
    return null;
  }

  const refreshToken = decrypt({
    ciphertext: row.encrypted_refresh_token,
    iv: row.encryption_iv,
    authTag: row.encryption_auth_tag,
  });

  const client = getOAuthClient();
  client.setCredentials({ refresh_token: refreshToken });
  return { client, calendarId: row.calendar_id ?? "primary" };
}
