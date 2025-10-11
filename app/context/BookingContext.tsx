"use client";

import { createContext, useContext, useState, ReactNode } from "react";

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

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setBookingState] = useState<BookingData>({});

  function setBooking(updates: Partial<BookingData>) {
    setBookingState((prev) => ({ ...prev, ...updates }));
  }

  function reset() {
    setBookingState({});
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
