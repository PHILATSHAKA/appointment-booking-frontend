import Link from "next/link";
import { Manrope } from "next/font/google";
import { ClockIcon, BellAlertIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export default function LandingPage() {
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
    // <main
    //   className={`${manrope.className} flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background-light via-white to-background-light dark:from-background-dark dark:via-gray-900 dark:to-background-dark`}
    // >
    //   <div className="flex flex-grow items-center justify-center">
    //     <div className="mx-auto w-full max-w-md p-6">
    //       <section className="space-y-6 text-center">
    //         <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-4xl">
    //           Book Your Appointment
    //         </h1>
    //         <p className="mx-auto max-w-md text-lg text-gray-600 dark:text-gray-300">
    //           Schedule your visit to our branch at your convenience. Our team is ready to assist you
    //           with your financial needs.
    //         </p>
    //         <div className="flex justify-center">
    //           <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 shadow-md">
    //             <svg
    //               xmlns="http://www.w3.org/2000/svg"
    //               className="h-10 w-10 text-primary"
    //               fill="none"
    //               viewBox="0 0 24 24"
    //               stroke="currentColor"
    //               strokeWidth={2}
    //             >
    //               <path
    //                 strokeLinecap="round"
    //                 strokeLinejoin="round"
    //                 d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    //               />
    //             </svg>
    //           </div>
    //         </div>
    //         <Link
    //           href="/service-type"
    //           role="button"
    //           className="block w-full rounded-lg bg-primary px-6 py-3 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:bg-primary/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    //         >
    //           Book Now
    //         </Link>
    //       </section>
    //     </div>
    //   </div>
    // </main>
    <div className="flex min-h-screen flex-col bg-background-light font-display text-gray-800 dark:bg-background-dark dark:text-gray-200">
      {/* Hero */}
      <main className="flex-grow">
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
                  <div className="bg-primary-100 text-primary-600 dark:bg-primary-900/50 dark:text-primary-400 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-[0_4px_10px_rgba(19,164,236,0.4)] transition-transform duration-300 group-hover:scale-110">
                    <feature.icon className="h-8 w-8" aria-hidden="true" />
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
