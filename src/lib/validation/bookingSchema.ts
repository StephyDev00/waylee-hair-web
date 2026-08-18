import { z } from "zod";

export const bookingSchema = z
  .object({
    serviceId: z.string().min(1),
    // Empty when the visitor used the request-based fallback flow instead of
    // picking a live slot — in that case preferredTimeText carries the ask.
    startIso: z.string().optional().or(z.literal("")),
    customerName: z.string().min(2).max(120),
    customerEmail: z.string().email(),
    customerPhone: z.string().min(4).max(40),
    notes: z.string().max(1000).optional().or(z.literal("")),
    preferredTimeText: z.string().max(200).optional().or(z.literal("")),
  })
  .refine((data) => data.startIso || data.preferredTimeText, {
    message: "Either a selected time slot or a preferred time is required",
    path: ["startIso"],
  });

export type BookingInput = z.infer<typeof bookingSchema>;

export const availabilitySchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  durationMinutes: z.number().int().min(15).max(480),
});
