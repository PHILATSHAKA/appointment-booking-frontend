"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

type ButtonVariant = "primary" | "disabled" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = "primary",
  loading = false,
  fullWidth = true,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "flex items-center justify-center h-12 rounded-lg px-5 py-3 text-base font-bold transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white shadow-md hover:scale-[1.01] hover:bg-primary/90 focus:ring-primary",
    disabled: "cursor-not-allowed bg-gray-300 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
    outline: "border border-gray-400 text-gray-800 hover:bg-gray-50 focus:ring-gray-300",
  };

  const appliedClass = cn(base, variants[variant], fullWidth && "w-full", className);

  return (
    <button
      className={appliedClass}
      disabled={disabled || loading || variant === "disabled"}
      {...props}
    >
      {loading ? "Loading…" : children}
    </button>
  );
}
