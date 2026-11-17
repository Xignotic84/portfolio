import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hostname(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}
