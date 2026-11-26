import type { Currency } from '../types/api'

export function formatCurrency(value: number, currency: Currency) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency.toUpperCase(),
  }).format(value)
}
