"use client";

import { useState } from "react";
import { Manrope } from "next/font/google";
import { useBooking } from "../context/BookingContext";
import { useRouter } from "next/navigation";
import { createBooking } from "../api"; // ✅ use centralized API
import Loading from "../components/Loading";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export default function ContactPage() {
  const { booking, setBooking } = useBooking();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const data = await createBooking({
        branchId: booking.branchId!,
        slotId: booking.slotId!,
        slotDate: booking.date!,
        slotTime: booking.start!, // using start time from schedule
        customerName: fullName,
        customerEmail: email,
        serviceType: booking.serviceType!,
        meta: {
          customerPhone: phone,
        },
      });

      // update context with customer info + bookingId
      setBooking({
        ...booking,
        customerName: fullName,
        customerEmail: email,
        customerPhone: phone,
        bookingId: data.bookingId,
      });

      router.push("/confirmation");
    } catch (error: any) {
      console.error(error);
      if (error.message.includes("409")) {
        setMessage("⚠️ That slot has already been booked. Please pick another.");
      } else {
        setMessage("❌ Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageContainer>
      <Header title="Contact information" />
      <main className="flex-grow">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6 p-4">
          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="full-name"
              className="text-muted-light dark:text-muted-dark text-sm font-medium"
            >
              Full Name
            </label>
            <input
              id="full-name"
              type="text"
              required
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-muted-light dark:text-muted-dark text-sm font-medium"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-muted-light dark:text-muted-dark text-sm font-medium"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder-muted-light dark:placeholder-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-primary px-5 py-4 font-bold text-white transition-colors hover:bg-primary/90"
            >
              {loading ? <Loading /> : "Confirm Booking"}
            </button>
          </div>

          {/* Response */}
          {message && <p className="mt-2 text-center">{message}</p>}
        </form>
      </main>
    </PageContainer>
  );
}
