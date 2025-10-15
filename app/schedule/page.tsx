"use client";

import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useBooking } from "@/app/context/BookingContext";
import { useRouter } from "next/navigation";
import { getSlots } from "@/app/api";
import Loading from "@/app/components/Loading";
import { PageLayout } from "@/app/components/PageLayout";

export type Slot = {
  id: string;
  branchId: string;
  startTimeUtc: string;
  endTimeUtc: string;
  isAvailable: boolean;
};

function formatSouthAfricaDate(date: Date): string {
  return date.toLocaleDateString("en-CA", { timeZone: "Africa/Johannesburg" });
}

export default function SchedulePage() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const { booking, setBooking } = useBooking();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const today = formatSouthAfricaDate(new Date());
  const [selectedDate, setSelectedDate] = useState(today); // mock date
  const router = useRouter();

  useEffect(() => {
    if (!booking.branchId) return;

    setLoading(true);
    setError(null);

    getSlots(booking.branchId, selectedDate)
      .then(setSlots)
      .catch(() => setError("Failed to load slots"))
      .finally(() => setLoading(false));
  }, [booking.branchId, selectedDate]);

  function handleContinue() {
    if (!selectedSlot) return;
    setBooking({
      branchId: booking.branchId,
      date: selectedDate,
      slotId: selectedSlot.id,
      start: selectedSlot.startTimeUtc,
      end: selectedSlot.endTimeUtc,
    });
    router.push("/contact");
  }

  function formatTime(dateString: string) {
    const d = new Date(dateString);
    const hh = d.getHours().toString().padStart(2, "0");
    const mm = d.getMinutes().toString().padStart(2, "0");
    return `${hh}:${mm}`;
  }

  return (
    <PageLayout
      title="Schedule appointment"
      withFooter
      footerLabel="Next"
      onFooterClick={handleContinue}
      footerDisabled={!selectedSlot}
    >
      {/* Date selector */}
      <section className="mb-8">
        <h2 className="text-md mb-6 font-bold tracking-tight text-gray-600 dark:text-gray-100 sm:text-xl">
          Choose a Date
        </h2>
        <DatePicker
          selected={new Date(selectedDate)}
          onChange={(date) => {
            if (date) setSelectedDate(formatSouthAfricaDate(date));
            setSelectedSlot(null);
          }}
          inline
          minDate={new Date()}
          dateFormat="yyyy-MM-dd"
          wrapperClassName="w-full"
          calendarClassName="dp w-full rounded-lg shadow-lg bg-white dark:bg-slate-800 p-4"
          dayClassName={(d) =>
            formatSouthAfricaDate(d) === selectedDate ? "dp-day-selected" : "dp-day"
          }
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="rounded p-2 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-700"
                aria-label="Previous month"
              >
                {/* Left arrow */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {date.toLocaleDateString("en-ZA", {
                  month: "long",
                  year: "numeric",
                  timeZone: "Africa/Johannesburg",
                })}
              </div>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="rounded p-2 hover:bg-slate-100 disabled:opacity-40 dark:hover:bg-slate-700"
                aria-label="Next month"
              >
                {/* Right arrow */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  className="text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          )}
        />
      </section>

      {/* Time slots */}
      <section>
        <h2 className="text-md mb-2 font-bold tracking-tight text-gray-600 dark:text-gray-100 sm:text-xl">
          Choose a Time
        </h2>
        <p className="mb-4 text-sm text-slate-500 dark:text-slate-400">For {selectedDate}</p>

        {loading && <Loading />}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && slots.length === 0 && (
          <p className="text-slate-500 dark:text-slate-400">No slots available on this date</p>
        )}

        {!loading && !error && slots.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot)}
                disabled={!slot.isAvailable}
                className={`w-full rounded-lg py-3 text-center font-semibold transition-colors ${
                  slot.isAvailable
                    ? selectedSlot?.id === slot.id
                      ? "border border-primary bg-primary text-white"
                      : "border border-primary text-primary hover:bg-primary/10 dark:hover:bg-primary/20"
                    : "cursor-not-allowed border border-slate-300 text-slate-400 line-through dark:border-slate-600 dark:text-slate-500"
                }`}
              >
                {formatTime(slot.startTimeUtc)} – {formatTime(slot.endTimeUtc)}
              </button>
            ))}
          </div>
        )}
      </section>
    </PageLayout>
  );
}
