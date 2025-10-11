"use client";

import { useRouter } from "next/navigation";
import { Manrope } from "next/font/google";
import { ReactNode, useState } from "react";
import { useBooking } from "../context/BookingContext";
import { CreditCard, Banknote, Home, TrendingUp, FileText } from "lucide-react";
import SaveIcon from "../components/SaveIcon";
import TransactIcon from "../components/Transact";
import InsuranceIcon from "../components/InsureIcon";
import CreditIcon from "../components/CreditIcon";
import ConnectIcon from "../components/ConnectIcon";
import Header from "../components/Header";
import PageContainer from "../components/PageContainer";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

type Service = {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
};

const services = [
  {
    id: "transact",
    title: "Transact",
    description: "Go cashless and find a better way to bank.",
    icon: <TransactIcon className="h-6 w-6" />,
  },
  {
    id: "save",
    title: "Save",
    description: "Open up to 10 savings plans on our app and even invest in shares.",
    icon: <SaveIcon className="h-6 w-6" />,
  },
  {
    id: "credit",
    title: "Credit",
    description: "Choose from personalised credit solutions that suit your needs.",
    icon: <CreditIcon className="h-6 w-6" />,
  },
  {
    id: "insure",
    title: "Insure",
    description:
      "Get Funeral Cover up to R100 000, Life Cover for your family's needs after the funeral and affordable Credit Insurance.",
    icon: <InsuranceIcon className="h-6 w-6" />,
  },
  {
    id: "connect",
    title: "Connect",
    description:
      "Freedom to connect your way. No contracts or hidden fees, just affordable prepaid prices that don’t change from day to day.",
    icon: <ConnectIcon className="h-6 w-6" />,
  },
];

export default function ServiceSelectionPage() {
  const router = useRouter();
  const { setBooking } = useBooking();
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(service: Service) {
    setSelected(service.id);
    setBooking({
      serviceId: service.id,
      serviceType: service.title,
    });
  }

  function handleNext() {
    if (!selected) return;
    router.push("/branches");
  }

  return (
    <PageContainer>
      <Header title="Select a service" />
      {/* Main */}
      <main className="flex-grow p-6">
        <h2 className="text-md mb-6 font-bold text-gray-600 dark:text-white">
          Choose what you would like assistance with.
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleSelect(service)}
              className={`flex cursor-pointer items-start rounded-xl border p-5 shadow-sm transition-all duration-200 ${
                selected === service.id
                  ? "border-primary bg-primary/10 ring-2 ring-primary"
                  : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-background-dark/50 dark:hover:bg-gray-800"
              }`}
            >
              <div
                className={`mr-4 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full text-2xl ${
                  selected === service.id ? "bg-primary text-white" : "bg-primary/20 text-primary"
                }`}
              >
                <span className="material-symbols-outlined">{service.icon}</span>
              </div>
              <div>
                <h3
                  className={`text-lq mb-1 font-bold transition-colors ${
                    selected === service.id ? "text-primary" : "text-gray-900 dark:text-white"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-400 dark:text-gray-400">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 border-t border-gray-200 bg-background-light p-4 dark:border-gray-700 dark:bg-background-dark">
        <button
          onClick={handleNext}
          disabled={!selected}
          className={`flex h-12 w-full items-center justify-center rounded-lg px-5 py-3 text-base font-bold transition-colors duration-200 ${
            selected
              ? "bg-primary text-white shadow-md hover:scale-[1.01] hover:bg-primary/90"
              : "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
          }`}
        >
          Next
        </button>
      </footer>
    </PageContainer>
  );
}
