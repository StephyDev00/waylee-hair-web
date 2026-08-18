"use client";

import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { BookingUnavailableNotice } from "@/components/booking/BookingUnavailableNotice";

interface Slot {
  start: string;
  end: string;
}

export function DateTimeStep({
  durationMinutes,
  onPick,
  onFallback,
}: {
  durationMinutes: number;
  onPick: (slot: Slot) => void;
  onFallback: (preferredTimeText: string) => void;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [slots, setSlots] = useState<Slot[] | null>(null);
  const [connected, setConnected] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [preferredTimeText, setPreferredTimeText] = useState("");

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    const dateStr = date.toISOString().slice(0, 10);

    // Defer the loading-state flip a tick so it's not a synchronous setState
    // call at the top of the effect (React discourages that pattern), while
    // still reading as "loading starts as soon as a date is picked."
    queueMicrotask(() => {
      if (!cancelled) setLoading(true);
    });

    fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date: dateStr, durationMinutes }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        setConnected(data.connected);
        setSlots(data.connected ? data.slots : null);
      })
      .catch(() => {
        if (!cancelled) setConnected(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [date, durationMinutes]);

  useEffect(() => {
    onFallback(preferredTimeText);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preferredTimeText]);

  return (
    <div>
      <div className="rounded-2xl border border-ink/10 bg-ivory p-4">
        <DayPicker
          mode="single"
          selected={date}
          onSelect={setDate}
          disabled={{ before: new Date() }}
        />
      </div>

      {date && loading && (
        <p className="mt-4 text-sm text-ink/50">Checking availability…</p>
      )}

      {date && !loading && connected === false && (
        <div className="mt-4">
          <BookingUnavailableNotice
            preferredTimeText={preferredTimeText}
            onChangePreferredTime={setPreferredTimeText}
          />
        </div>
      )}

      {date && !loading && connected && slots && (
        <div className="mt-4">
          {slots.length === 0 ? (
            <p className="text-sm text-ink/50">No open slots that day — try another date.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {slots.map((slot) => (
                <button
                  key={slot.start}
                  onClick={() => onPick(slot)}
                  className="rounded-lg border border-ink/15 py-2 text-sm hover:border-wine hover:bg-wine hover:text-ivory"
                >
                  {new Date(slot.start).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
