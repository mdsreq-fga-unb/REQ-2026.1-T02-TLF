import type { TransactionType } from '@/services/database/queries/transaction'
import { VALID_TRANSACTION_TYPES } from './constants'

export function parseTransactionType(raw: string | string[] | undefined): TransactionType {
  const value = Array.isArray(raw) ? raw[0] : raw
  return VALID_TRANSACTION_TYPES.has(value as TransactionType)
    ? (value as TransactionType)
    : 'EXPENSE'
}

export function parseAmountCents(raw: string | string[] | undefined): number {
  const value = Array.isArray(raw) ? raw[0] : raw
  const parsed = parseFloat(value ?? '0')
  return Number.isFinite(parsed) ? Math.round(Math.abs(parsed) * 100) : 0
}

export function parseRouteString(raw: string | string[] | undefined): string {
  return (Array.isArray(raw) ? raw[0] : raw) ?? ''
}
