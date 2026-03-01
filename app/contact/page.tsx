"use client";

import { useState } from "react";
import { useBooking } from "../context/BookingContext";
import { useRouter } from "next/navigation";
import { createBooking } from "@/app/api";
import Loading from "@/app/components/Loading";
import { PageLayout } from "@/app/components/PageLayout";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const contactInfoFormSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name must be at least 2 characters")
    .max(100, "Full name is too long")
    .regex(/^(?!.*\d)(?!^[^a-zA-Z]*$).*$/, {
      message: "The string must not contain any numbers and must contain at least one letter.",
    }),
  emailAddress: z.email("Please enter a valid email address"),

  // Validator for South African mobile numbers:
  // - Must start with '0' (local format) or '+27' (international format).
  // - Followed by exactly 9 digits.
  // - The 9 digits cannot all be zeros.
  cellphoneNumber: z.string().regex(/^(0|\+27)(?!000000000)[0-9]{9}$/, {
    message:
      "Invalid South African mobile number. It must start with '0' or '+27', followed by 9 digits. The digits cannot all be zeros.",
  }),
});

export type ContactInfoFormData = z.infer<typeof contactInfoFormSchema>;

export default function ContactInformationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoFormSchema),
    mode: "onChange",
  });

  const router = useRouter();

  // Booking context and component states
  const { booking, setBooking } = useBooking();
  const [message, setMessage] = useState("");

  async function onSubmit(data: ContactInfoFormData) {
    setMessage("");
    try {
      const response = await createBooking({
        branchId: booking.branchId!,
        slotId: booking.slotId!,
        slotDate: booking.date!,
        slotTime: booking.start!, // using start time from schedule
        customerName: data.fullName,
        customerEmail: data.emailAddress,
        serviceType: booking.serviceType!,
        meta: {
          customerPhone: data.cellphoneNumber,
        },
      });

      // update context with customer info + bookingId
      setBooking({
        ...booking,
        customerName: data.fullName,
        customerEmail: data.emailAddress,
        customerPhone: data.cellphoneNumber,
        bookingId: response.bookingId,
      });

      reset();

      router.push("/confirmation");
    } catch (error: any) {
      console.error(error.message);
      if (error.name === "ApiError") {
        if (error.reasonCode === 0) {
          setMessage("⚠️ You have an active booking already.");
        } else if (error.reasonCode === 1) {
          setMessage("⚠️ That slot has already been booked. Please pick another.");
        } else {
          setMessage("❌ An unexpected error occurred.");
        }
      } else {
        // Handle unexpected client-side errors
        setMessage("❌ Unexpected client error. Please try again.");
      }
    } finally {
    }
  }

  return (
    <PageLayout title="Contact information" withFooter={false}>
      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4">
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="fullName"
            className="text-muted-light dark:text-muted-dark text-sm font-medium"
          >
            Full Name
          </label>
          <input
            id="fullName"
            type="text"
            placeholder="Enter your full name"
            {...register("fullName")}
            className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder:text-muted-light dark:placeholder:text-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label
            htmlFor="emailAddress"
            className="text-muted-light dark:text-muted-dark text-sm font-medium"
          >
            Email Address
          </label>
          <input
            id="emailAddress"
            type="email"
            placeholder="Enter your email address"
            {...register("emailAddress")}
            className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder:text-muted-light dark:placeholder:text-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
          />
          {errors.emailAddress && (
            <p className="mt-1 text-sm text-red-600">{errors.emailAddress.message}</p>
          )}
        </div>

        {/* CellphoneNumber */}
        <div className="space-y-2">
          <label
            htmlFor="cellphoneNumber"
            className="text-muted-light dark:text-muted-dark text-sm font-medium"
          >
            Phone Number
          </label>
          <input
            id="cellphoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            {...register("cellphoneNumber")}
            className="bg-subtle-light dark:bg-subtle-dark text-foreground-light dark:text-foreground-dark placeholder:text-muted-light dark:placeholder:text-muted-dark w-full rounded-lg border-none p-4 focus:ring-2 focus:ring-primary"
          />
          {errors.cellphoneNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.cellphoneNumber.message}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-primary px-5 py-4 font-bold text-white transition-colors hover:bg-primary/90"
          >
            {isSubmitting ? <Loading /> : "Confirm Booking"}
          </button>
        </div>

        {/* Response */}
        {message && <p className="mt-2 text-center">{message}</p>}
      </form>
    </PageLayout>
  );
}
