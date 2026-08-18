import Link from "next/link";
import { createServiceRoleClient } from "@/lib/supabase/server";
import { getCalendarConnection } from "@/lib/google/calendarConnection";

export const dynamic = "force-dynamic";

async function loadDashboardData() {
  try {
    const supabase = createServiceRoleClient();
    const [{ data: bookings }, { data: messages }, connection] = await Promise.all([
      supabase
        .from("bookings")
        .select("id, customer_name, requested_start, status")
        .order("requested_start", { ascending: true })
        .limit(10),
      supabase.from("contact_messages").select("id").eq("status", "new"),
      getCalendarConnection(),
    ]);
    return { bookings, messages, connection };
  } catch (err) {
    console.error("Admin dashboard data load failed — is SUPABASE_SERVICE_ROLE_KEY set?", err);
    return { bookings: [], messages: [], connection: null };
  }
}

export default async function AdminDashboard() {
  const { bookings, messages, connection } = await loadDashboardData();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-serif text-3xl font-bold">Dashboard</h1>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-ink/10 bg-ivory p-6">
          <p className="text-xs uppercase tracking-wide text-ink/50">Google Calendar</p>
          <p className="mt-2 font-medium">
            {connection?.google_account_email ? (
              <span className="text-wine">Connected · {connection.google_account_email}</span>
            ) : (
              <span className="text-ink/50">Not connected</span>
            )}
          </p>
          <Link href="/admin/calendar" className="mt-3 inline-block text-sm text-wine hover:underline">
            Manage →
          </Link>
        </div>
        <div className="rounded-xl border border-ink/10 bg-ivory p-6">
          <p className="text-xs uppercase tracking-wide text-ink/50">New contact messages</p>
          <p className="mt-2 text-2xl font-serif font-bold">{messages?.length ?? 0}</p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-xl font-semibold">Upcoming bookings</h2>
        <div className="mt-4 space-y-2">
          {bookings && bookings.length > 0 ? (
            bookings.map((b) => (
              <div
                key={b.id}
                className="flex items-center justify-between rounded-lg border border-ink/10 bg-ivory px-4 py-3 text-sm"
              >
                <span>{b.customer_name}</span>
                <span className="text-ink/50">
                  {new Date(b.requested_start).toLocaleString("en-CH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </span>
                <span
                  className={
                    b.status === "pending_manual" ? "text-wine" : "text-ink/50"
                  }
                >
                  {b.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-ink/50">No bookings yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
