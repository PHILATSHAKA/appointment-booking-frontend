import type { Metadata } from "next";
import Image from "next/image";
import localFont from "next/font/local";

import "@/app/globals.css";
import { BookingProvider } from "@/app/context/BookingContext";

const manrope = localFont({
  src: [
    { path: "../public/fonts/Manrope/Manrope-Regular.ttf", weight: "400" },
    { path: "../public/fonts/Manrope/Manrope-Medium.ttf", weight: "500" },
    { path: "../public/fonts/Manrope/Manrope-Bold.ttf", weight: "700" },
    { path: "../public/fonts/Manrope/Manrope-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-manrope",
  display: "swap", // optional, like before
});

export const metadata: Metadata = {
  title: "Appointment Booking",
  description: "Book appointments at your preferred branch",
  icons: {
    icon: "/favicon.ico",
  },
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
              className="size-auto"
            />
          </div>
        </header>
        <main className="flex min-h-screen items-start justify-center p-6">
          <div className="w-full max-w-md rounded-full sm:max-w-xl lg:max-w-2xl">
            {/* <PageContainer> */}
            <BookingProvider>{children}</BookingProvider>
            {/* </PageContainer> */}
          </div>
        </main>
      </body>
    </html>
  );
}
