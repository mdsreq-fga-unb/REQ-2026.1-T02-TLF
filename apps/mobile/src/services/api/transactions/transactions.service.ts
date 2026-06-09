import {
  listTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  createTransaction,
} from './transactions.api'

import type {
  CreateTransactionPayload,
  TransactionFilters,
  TransactionUpdatePayload,
} from './transactions.types'

export const transactionsService = {
  list: (filters?: TransactionFilters) =>
    listTransactions(filters),

  getById: (id: string) =>
    getTransactionById(id),

  update: (id: string, payload: TransactionUpdatePayload) =>
    updateTransaction(id, payload),

  delete: (id: string) =>
    deleteTransaction(id),

  create: (payload: CreateTransactionPayload) =>
    createTransaction(payload),
}