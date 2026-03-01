"use client";

import { useRouter } from "next/navigation";

type HeaderProps = {
  title: string;
  showBack?: boolean;
};

export default function Header({ title, showBack = true }: HeaderProps) {
  const router = useRouter();

  return (
    <header className="flex items-center border-b border-gray-200 p-4 dark:border-gray-700">
      {showBack && (
        <button
          type="button"
          onClick={() => router.back()}
          className="mr-2 flex size-10 items-center justify-center rounded-full text-2xl font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          ←
        </button>
      )}
      <h1 className="grow text-center text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
      {/* Keep spacing even when no back button */}
      {showBack && <div className="w-6" />}
    </header>
  );
}
