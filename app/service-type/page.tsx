"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import { useBooking } from "@/app/context/BookingContext";
import SaveIcon from "@/app/components/SaveIcon";
import TransactIcon from "@/app/components/TransactIcon";
import InsuranceIcon from "@/app/components/InsureIcon";
import CreditIcon from "@/app/components/CreditIcon";
import ConnectIcon from "@/app/components/ConnectIcon";
import { PageLayout } from "@/app/components/PageLayout";

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
    icon: <TransactIcon className="size-8" />,
    color: "#2f70ef",
  },
  {
    id: "save",
    title: "Save",
    description: "Open up to 10 savings plans on our app and even invest in shares.",
    icon: <SaveIcon className="size-8" />,
    color: "#0033a0",
  },
  {
    id: "insure",
    title: "Insure",
    description:
      "Get Funeral Cover up to R100 000, Life Cover for your family's needs after the funeral and affordable Credit Insurance.",
    icon: <InsuranceIcon className="size-8" />,
    color: "#5d737e",
  },
  {
    id: "credit",
    title: "Credit",
    description: "Choose from personalised credit solutions that suit your needs.",
    icon: <CreditIcon className="size-8" />,
    color: "#e61414",
  },
  {
    id: "connect",
    title: "Connect",
    description:
      "Freedom to connect your way. No contracts or hidden fees, just affordable prepaid prices that don’t change from day to day.",
    icon: <ConnectIcon className="size-8" />,
    color: "#001847",
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
    <PageLayout
      title="Select a Service"
      withFooter
      footerLabel="Next"
      onFooterClick={handleNext}
      footerDisabled={!selected}
      subTitle="Choose what you would like assistance with"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        {services.map((service) => (
          <div
            key={service.id}
            onClick={() => handleSelect(service)}
            style={{
              backgroundColor: service.color,
              color: "#fff",
            }}
            className={`flex cursor-pointer items-start rounded-xl border border-transparent p-5 shadow-md transition-all duration-200 hover:scale-[1.02] ${
              selected === service.id
                ? "border-primary bg-primary/10 ring-2 ring-primary"
                : "border-gray-200 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-background-dark/50 dark:hover:bg-gray-800"
            }`}
          >
            <div
              className={`mr-4 flex h-14 w-7 shrink-0 items-center justify-center rounded-full text-2xl text-white${
                selected === service.id ? "bg-primary text-white" : "bg-primary/20 text-primary"
              }`}
            >
              <span className="text-white">{service.icon}</span>
            </div>
            <div>
              <h6
                className={`text-lq mb-1 font-semibold text-white transition-colors ${
                  selected === service.id ? "text-primary" : "text-gray-900 dark:text-white"
                }`}
              >
                {service.title}
              </h6>
              <p className="text-sm text-white">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}
