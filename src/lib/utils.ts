import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function publicAsset(path: string): string {
  const basePath = process.env.NODE_ENV === "production" ? "/twoandhalfmeters" : ""
  return `${basePath}${path.startsWith("/") ? path : `/${path}`}`
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(price)
}
