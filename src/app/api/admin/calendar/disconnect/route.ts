import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { clearCalendarConnection } from "@/lib/google/calendarConnection";

export async function POST() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await clearCalendarConnection();
  return NextResponse.json({ ok: true });
}
