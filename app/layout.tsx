import type { Metadata } from "next";
import Image from "next/image";

import "./globals.css";

import { Manrope } from "next/font/google";
import { BookingProvider } from "./context/BookingContext";

const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "700", "800"] });

export const metadata: Metadata = {
  title: "Appointment Booking",
  description: "Book appointments at your preferred branch",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="bg-gray-50 text-gray-900">
        <header className="w-full bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center gap-3 p-4">
            <Image
              src="/capitec-logo.svg"
              alt="Capitec Logo"
              width={120}
              height={50}
              priority
              className="h-auto w-auto"
            />
          </div>
        </header>
        <main className="flex min-h-screen items-start justify-center p-6">
          <div className="w-full max-w-md rounded-full sm:max-w-xl lg:max-w-2xl">
            <BookingProvider>{children}</BookingProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
