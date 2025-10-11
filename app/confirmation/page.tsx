"use client";

import { Manrope } from "next/font/google";
import { useBooking } from "../context/BookingContext";
import PageContainer from "../components/PageContainer";
import { useRouter } from "next/navigation";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

// Display date in SAST
function formatDate(dateString: string) {
  return new Intl.DateTimeFormat("en-ZA", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Africa/Johannesburg",
  }).format(new Date(dateString));
}

// Display time range in SAST
function formatTime(start: string, end: string) {
  const fmt = new Intl.DateTimeFormat("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Africa/Johannesburg",
  });

  return `${fmt.format(new Date(start))} – ${fmt.format(new Date(end))}`;
}

export default function ConfirmationPage() {
  const { booking } = useBooking();
  const router = useRouter();

  console.log(booking);

  return (
    <PageContainer>
      {/* Header */}
      <header className="flex items-center p-4">
        <h1 className="flex-1 pr-8 text-center text-lg font-bold text-slate-900 dark:text-white">
          Confirmation
        </h1>
      </header>

      {/* Main */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 text-center">
        <div className="mb-6 rounded-full bg-primary/10 p-4 dark:bg-primary/20">
          <span className="text-4xl text-primary">✔</span>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-slate-900 dark:text-white">
          Your appointment is confirmed
        </h2>
        <p className="max-w-md text-slate-600 dark:text-slate-400">
          We&apos;ve sent a confirmation email to your email address. Please check your inbox for
          more details.
        </p>
      </main>

      {/* Appointment Details */}
      <div className="m-4 rounded-xl bg-white p-6 dark:bg-slate-800/50">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Appointment Details
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Branch</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {booking.branchName}
            </p>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {formatDate(booking.date!)}
            </p>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">Time</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {formatTime(booking.start!, booking.end!)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">Contact</p>
            <p className="text-sm font-medium text-slate-900 dark:text-white">
              {booking.customerName}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t border-slate-200 bg-background-light p-4 dark:border-slate-700 dark:bg-background-dark">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-white transition-colors hover:bg-primary/90 dark:bg-slate-700 dark:text-white"
        >
          Back to Home
        </button>
      </footer>
    </PageContainer>
  );
}
