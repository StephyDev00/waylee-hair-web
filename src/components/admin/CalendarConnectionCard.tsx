"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export function CalendarConnectionCard({
  connectedEmail,
  googleConfigured,
}: {
  connectedEmail: string | null;
  googleConfigured: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function disconnect() {
    setLoading(true);
    await fetch("/api/admin/calendar/disconnect", { method: "POST" });
    setLoading(false);
    router.refresh();
  }

  if (!googleConfigured) {
    return (
      <div className="rounded-xl border border-wine/20 bg-wine/5 p-6 text-sm text-ink/70">
        Google Calendar integration is not yet configured. Add{" "}
        <code className="text-xs">GOOGLE_CLIENT_ID</code>,{" "}
        <code className="text-xs">GOOGLE_CLIENT_SECRET</code>, and{" "}
        <code className="text-xs">GOOGLE_OAUTH_REDIRECT_URI</code> as environment
        variables once the Google Cloud OAuth app is set up.
      </div>
    );
  }

  if (connectedEmail) {
    return (
      <div className="rounded-xl border border-ink/10 bg-ivory p-6">
        <p className="text-sm text-ink/60">Connected calendar</p>
        <p className="mt-1 font-medium text-wine">{connectedEmail}</p>
        <Button variant="secondary" className="mt-4" onClick={disconnect} disabled={loading}>
          {loading ? "Disconnecting…" : "Disconnect"}
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-ink/10 bg-ivory p-6">
      <p className="text-sm text-ink/70">
        Connect your Google Calendar so the booking page can check live
        availability and create appointments automatically.
      </p>
      <Button href="/api/auth/google/connect" className="mt-4">
        Connect Google Calendar
      </Button>
    </div>
  );
}
