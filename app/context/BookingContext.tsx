"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type BookingData = {
  branchId?: string;
  bookingId?: string;
  branchName?: string;
  branchAddress?: string;
  date?: string;
  slotId?: string;
  start?: string;
  end?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  serviceId?: string;
  serviceType?: string;
};

type BookingContextType = {
  booking: BookingData;
  setBooking: (updates: Partial<BookingData>) => void;
  reset: () => void;
};

const STORAGE_KEY = "booking_data";
const EXPIRY_MINUTES = 15;

const BookingContext = createContext<BookingContextType | undefined>(undefined);

type StoredBooking = {
  data: BookingData;
  timestamp: number;
};

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingData>({});

  // Load existing data from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed: StoredBooking = JSON.parse(saved);
        const now = Date.now();
        const ageMinutes = (now - parsed.timestamp) / (1000 * 60);

        if (ageMinutes <= EXPIRY_MINUTES) {
          setBookingState(parsed.data);
        } else {
          console.info("Booking data expired, clearing session");
          sessionStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        console.warn("Failed to parse saved booking data");
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Update state and persist to sessionStorage
  function setBooking(updates: Partial<BookingData>) {
    setBookingState((prev) => {
      const newBooking = { ...prev, ...updates };

      const payload: StoredBooking = {
        data: newBooking,
        timestamp: Date.now(),
      };

      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      return newBooking;
    });
  }

  // Reset both React state and sessionStorage
  function reset() {
    setBookingState({});
    sessionStorage.removeItem(STORAGE_KEY);
  }

  return (
    <BookingContext.Provider value={{ booking, setBooking, reset }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside BookingProvider");
  return ctx;
}
