import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names conditionally and removes duplicates.
 * Useful for combining static and conditional styles cleanly.
 *
 * Example:
 * cn("p-4", isActive && "bg-blue-500")
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}
