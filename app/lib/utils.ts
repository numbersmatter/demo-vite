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

export const dollarValueConverter = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const dollar = value * 0.01;

  return formatter.format(dollar);
};
