import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEUR(n: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n)
}

/**
 * Porcentaje en formato español: «0,06 %», con coma decimal y un espacio no separable antes
 * del signo para que no se parta de línea.
 *
 * Hasta el 29-sep-2026 devolvía «0.06%», con punto, en 64 sitios de una web en español:
 * fichas, comparativas, hubs, calculadoras y los FAQ que citan las IAs, mientras los textos
 * escritos a mano decían «0,06 %». La misma cifra salía de dos formas según quién la pintara.
 */
export function formatPct(n: number, decimals = 1): string {
  return `${(n * 100).toFixed(decimals).replace('.', ',')}\u00a0%`
}
