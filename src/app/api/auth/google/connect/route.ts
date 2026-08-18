import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient, isGoogleConfigured, GOOGLE_SCOPES } from "@/lib/google/oauthClient";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (!isGoogleConfigured()) {
    const url = new URL("/admin/calendar", request.url);
    url.searchParams.set("error", "not_configured");
    return NextResponse.redirect(url);
  }

  const client = getOAuthClient();
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GOOGLE_SCOPES,
  });

  return NextResponse.redirect(authUrl);
}
