"use client";

type PageContainerProps = {
  children: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div
      className={`flex h-screen flex-col justify-between rounded-2xl bg-background-light shadow-elevation1 dark:bg-background-dark`}
    >
      {children}
    </div>
  );
}
