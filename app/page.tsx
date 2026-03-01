"use client";

import Link from "next/link";

import { ClockIcon, BellAlertIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useBooking } from "@/app/context/BookingContext";

export default function LandingPage() {
  const { reset } = useBooking();

  useEffect(() => {
    reset();
  }, []);

  const appointmentFeatures = [
    {
      icon: ClockIcon,
      title: "24/7 Availability",
      desc: "Book appointments anytime, anywhere. We're always online for you.",
    },
    {
      icon: BellAlertIcon,
      title: "Smart Reminders",
      desc: "Get notified so you’ll never miss an appointment again.",
    },
    {
      icon: LockClosedIcon,
      title: "Secure & Private",
      desc: "We use encryption and industry best practices to keep your data safe.",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background-light font-display text-gray-800 dark:bg-background-dark dark:text-gray-200">
      {/* Hero */}
      <main className="grow">
        <section className="from-primary-50 dark:to-primary-950 relative overflow-hidden bg-gradient-to-r to-white dark:from-background-dark">
          <div className="mx-auto max-w-4xl px-6 py-20 text-center">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight text-[#0033a0] sm:text-4xl lg:text-5xl">
              <span className="block">Book Appointments</span>
              <span className="block">Effortlessly</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
              A fast, secure, and simple booking platform that helps you schedule your branch visits
              with ease.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/service-type"
                className="hover:bg-primary-700 focus:ring-primary-600 rounded-lg bg-primary px-8 py-3 text-center font-semibold text-white shadow-lg transition hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background-dark"
              >
                Book an Appointment
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="bg-white py-20 dark:bg-background-dark sm:py-28">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Everything you need for a seamless booking experience.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {appointmentFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm transition hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
                >
                  <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 mx-auto mb-6 flex size-16 items-center justify-center rounded-full shadow-[0_4px_10px_rgba(19,164,236,0.4)] transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="size-8" aria-hidden="true" />
                  </div>
                  <h3 className="text-md mb-2 font-bold text-gray-900 dark:text-white sm:text-lg">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400 sm:text-base">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50 py-6 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
        Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit
        provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06
      </footer>
    </div>
  );
}
