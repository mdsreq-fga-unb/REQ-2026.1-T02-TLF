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

type ApiResponse<T> = {
  data: T
}

const unwrap = <T>(payload: unknown): T => {
  return (payload as ApiResponse<T>).data
}

export const listTransactions = async (filters?: TransactionFilters) => {
  const response = await api.get('/transactions', {
    params: filters,
  })

  return unwrap<TransactionApiItem[]>(response.data)
}

export const getTransactionById = async (id: string) => {
  const response = await api.get(`/transactions/${id}`)
  return unwrap<TransactionApiItem>(response.data)
}

export const updateTransaction = async (id: string, payload: TransactionUpdatePayload) => {
  const response = await api.patch(`/transactions/${id}`, payload)
  return unwrap<TransactionApiItem>(response.data)
}

export const deleteTransaction = async (id: string) => {
  await api.delete(`/transactions/${id}`)
}
