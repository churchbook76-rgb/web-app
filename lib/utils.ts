import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format price in KES currency
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
  }).format(price)
}

/**
 * Generate a unique order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `ORD-${timestamp}-${random}`
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

/**
 * Format date and time to readable string
 */
export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date))
}

/**
 * Calculate order total
 */
export function calculateOrderTotal(
  subtotal: number,
  shippingCost: number = 0,
  tax: number = 0,
  discount: number = 0
): number {
  return subtotal + shippingCost + tax - discount
}

/**
 * Validate Kenyan phone number (starts with 254 or 0)
 */
export function validateKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\s+/g, '')
  return /^(254|0)[17]\d{8}$/.test(cleaned)
}

/**
 * Format Kenyan phone number to M-Pesa format (254...)
 */
export function formatPhoneForMpesa(phone: string): string {
  const cleaned = phone.replace(/\s+/g, '')
  if (cleaned.startsWith('0')) {
    return '254' + cleaned.substring(1)
  }
  return cleaned
}
