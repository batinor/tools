import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeNumber(value: string) {
  return value.replace(',', '.');
}

export function isValidNumber(value: string) {
  return /^(\d+(\.\d*)?|\.\d+)$/.test(value);
}

export function isStrictDecimal(value: string) {
  return /^(\d+(\.\d+)?|\.\d+)$/.test(value);
}
