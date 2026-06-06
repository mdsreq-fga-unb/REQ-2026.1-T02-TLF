import {
  listTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} from './transactions.api'

import type {
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
}