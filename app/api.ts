import { z } from "zod";
import { Slot } from "@/app/schedule/page";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:4000";
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, unknown> | FormData;
};

async function request<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body:
        options.body && !(options.body instanceof FormData)
          ? JSON.stringify(options.body)
          : options.body,
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      let errorBody = {};
      try {
        errorBody = await response.json();
      } catch {
        // fallback for plain text responses
        const text = await response.text().catch(() => "");
        errorBody = { message: text || "Unknown error" };
      }

      throw {
        name: "ApiError",
        status: response.status,
        ...errorBody,
      };
    }

    return response.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("Request timed out");
    }
    console.error("API request failed:", error);
    throw error;
  }
}

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

export const getBranchSchemaResponse = z.object({
  branchId: z.string(),
  name: z.string(),
  address: z.string(),
  timezone: z.string(),
});

type GetBranchSchemaResponse = z.infer<typeof getBranchSchemaResponse>;

export type CreateBookingInput = z.infer<typeof createBookingSchema>;

export const getBranchSlotsSchema = z.object({
  id: z.uuid(),
  branchId: z.uuid(),

  // UTC timestamps from DB
  startTimeUtc: z.coerce.date(),
  endTimeUtc: z.coerce.date(),

  // Local timezone formatted strings with offset (+02:00 for Africa/Johannesburg)
  startTimeLocal: z.string().datetime({ offset: true }),
  endTimeLocal: z.string().datetime({ offset: true }),

  // Availability flag
  isAvailable: z.boolean(),
});

export type GetBranchSlotsSchema = z.infer<typeof getBranchSlotsSchema>;

export async function getBranches(search?: string) {
  const path = search ? `/branches?search=${encodeURIComponent(search)}` : "/branches";
  return request<GetBranchSchemaResponse[]>(path);
}

export async function getSlots(branchId: string, date: string) {
  return request<Slot[]>(`/branches/${branchId}/slots?date=${date}`);
}

export async function createBooking(payload: CreateBookingInput) {
  return request<{ bookingId: string }>(`/bookings/slots/${payload.slotId}`, {
    method: "POST",
    body: payload,
  });
}
