import { z } from "zod";

// app/api.ts
const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";

export const createBookingSchema = z.object({
  branchId: z.uuid(),
  slotId: z.uuid(),
  slotDate: z.string().refine((s) => !Number.isNaN(Date.parse(s)), { message: "Invalid date" }),
  slotTime: z.string(), // HH:MM:SS or HH:MM
  customerName: z.string().min(1),
  customerEmail: z.email(),
  serviceType: z.string(),
  meta: z.record(z.any(), z.any()).optional(),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export async function getBranches(search?: string) {
  const path = search ? `branches?search=${encodeURIComponent(search)}` : "branches";
  console.log(path);
  const response = await fetch(`${BASE}/${path}`);

  if (!response.ok) {
    throw new Error("Failed to fetch branches");
  }
  return response.json();
}
export async function getSlots(branchId: string, date: string) {
  const r = await fetch(`${BASE}/branches/${branchId}/slots?date=${date}`);
  return r.json();
}
export async function createBooking(payload: CreateBookingInput) {
  const r = await fetch(`${BASE}/bookings/slots/${payload.slotId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!r.ok) {
    // Try to parse error body
    let message = "Unknown error";
    try {
      const err = await r.json();
      message = err.error || JSON.stringify(err);
    } catch {
      message = r.statusText;
    }
    throw new Error(`${r.status} ${message}`);
  }

  return r.json();
}
