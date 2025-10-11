"use client";

import { Manrope } from "next/font/google";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div
      className={`${manrope.className} shadow-elevation1 flex h-screen flex-col justify-between rounded-2xl bg-background-light dark:bg-background-dark`}
    >
      {children}
    </div>
  );
}
