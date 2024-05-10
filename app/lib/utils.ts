import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export async function getAction(request: Request) {
  const clone = request.clone();
  const payload = await clone.formData();
  return payload.get("_action");
}

export function captialize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
