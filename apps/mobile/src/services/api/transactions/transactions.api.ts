import { api } from '../axios-client'
import { unwrap } from './transactions.mapper'
import type {
  TransactionApiItem,
  TransactionUpdatePayload,
  TransactionFilters,
  CreateTransactionPayload,
} from './transactions.types'

export const listTransactions = async (filters?: TransactionFilters) => {
  const response = await api.get('/transactions', {
    params: filters,
  })

  return unwrap<TransactionApiItem[]>(response.data)
}

export const createTransaction = async (payload: CreateTransactionPayload) => {
  const response = await api.post('/transactions', payload)
  return unwrap<TransactionApiItem>(response.data)
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
