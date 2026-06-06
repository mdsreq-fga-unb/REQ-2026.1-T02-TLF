import { api } from './axios-client'
import type { TransactionStatus, TransactionType } from '@/services/database/queries/transaction'

export type TransactionApiItem = {
  id: string
  amount: number
  description: string
  date: string | number
  type: TransactionType
  status?: TransactionStatus
  categoryId?: string
  category?: string
}

export type TransactionUpdatePayload = Partial<{
  amount: number
  description: string
  date: string | number
  type: TransactionType
  status: TransactionStatus
  categoryId: string
}>

export type TransactionFilters = {
  category?: string
  type?: TransactionType
}

const unwrapListResponse = (payload: unknown): TransactionApiItem[] => {
  if (
    payload &&
    typeof payload === 'object' &&
    'data' in payload &&
    Array.isArray((payload as any).data)
  ) {
    return (payload as { data: TransactionApiItem[] }).data
  }

  throw new Error('Invalid API response: expected { data: TransactionApiItem[] }')
}

export const listTransactions = async (filters?: TransactionFilters) => {
  const response = await api.get('/transactions', {
    params: filters,
  })

  return unwrapListResponse(response.data)
}

export const getTransactionById = async (id: string) => {
  const response = await api.get(`/transactions/${id}`)
  return response.data as TransactionApiItem
}

export const updateTransaction = async (id: string, payload: TransactionUpdatePayload) => {
  const response = await api.patch(`/transactions/${id}`, payload)
  return response.data as TransactionApiItem
}

export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`)
}
