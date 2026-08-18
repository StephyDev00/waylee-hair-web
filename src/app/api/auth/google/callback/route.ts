import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { getOAuthClient } from "@/lib/google/oauthClient";
import { saveCalendarConnection } from "@/lib/google/calendarConnection";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  const code = request.nextUrl.searchParams.get("code");
  const redirectTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  if (!code) {
    return redirectTo("/admin/calendar?error=missing_code");
  }

  try {
    const client = getOAuthClient();
    const { tokens } = await client.getToken(code);

    if (!tokens.refresh_token) {
      // Happens if the owner previously granted access without revoking —
      // Google only issues a refresh token on first consent (or with prompt=consent).
      return redirectTo("/admin/calendar?error=no_refresh_token");
    }

    client.setCredentials(tokens);
    const oauth2 = google.oauth2({ auth: client, version: "v2" });
    const { data: profile } = await oauth2.userinfo.get();

    await saveCalendarConnection({
      refreshToken: tokens.refresh_token,
      googleAccountEmail: profile.email ?? "unknown",
      scope: tokens.scope ?? "",
    });

    return redirectTo("/admin/calendar?connected=true");
  } catch (err) {
    console.error("Google OAuth callback failed", err);
    return redirectTo("/admin/calendar?error=exchange_failed");
  }
}
