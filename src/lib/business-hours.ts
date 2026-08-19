// 0 = Sunday ... 6 = Saturday. Source: owner-confirmed hours in the project brief.
export const BUSINESS_HOURS: Record<number, { open: string; close: string } | null> = {
  0: { open: "11:00", close: "18:30" }, // Sunday
  1: null, // Monday — closed
  2: { open: "10:00", close: "18:30" },
  3: { open: "10:00", close: "18:30" },
  4: { open: "10:00", close: "18:30" },
  5: { open: "10:00", close: "18:30" },
  6: { open: "10:00", close: "18:30" },
};

export const SALON_TIMEZONE = "Europe/Zurich";
