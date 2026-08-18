import { getCalendarConnection } from "@/lib/google/calendarConnection";
import { isGoogleConfigured } from "@/lib/google/oauthClient";
import { CalendarConnectionCard } from "@/components/admin/CalendarConnectionCard";

export const dynamic = "force-dynamic";

export default async function AdminCalendarPage({
  searchParams,
}: PageProps<"/admin/calendar">) {
  const params = await searchParams;
  const connection = await getCalendarConnection().catch((err) => {
    console.error("getCalendarConnection failed — is SUPABASE_SERVICE_ROLE_KEY set?", err);
    return null;
  });

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold">Google Calendar</h1>
      <p className="mt-2 text-sm text-ink/60">
        This is the calendar the booking page reads availability from and
        writes confirmed appointments to.
      </p>

      {params?.error && (
        <p className="mt-4 rounded-lg bg-wine/10 px-4 py-3 text-sm text-wine-dark">
          {params.error === "no_refresh_token"
            ? "Google didn't return a refresh token — try disconnecting in your Google Account permissions and reconnecting."
            : "Something went wrong connecting your calendar. Please try again."}
        </p>
      )}
      {params?.connected && (
        <p className="mt-4 rounded-lg bg-wine/10 px-4 py-3 text-sm text-wine">
          Calendar connected successfully.
        </p>
      )}

      <div className="mt-8">
        <CalendarConnectionCard
          connectedEmail={connection?.google_account_email ?? null}
          googleConfigured={isGoogleConfigured()}
        />
      </div>
    </div>
  );
}
