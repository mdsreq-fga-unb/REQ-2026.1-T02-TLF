import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Transaction, TransactionType, TransactionStatus } from '../models/transaction'

const TRANSACTIONS_TABLE = 'transactions'

const transactionsCollection = () => database.get<Transaction>(TRANSACTIONS_TABLE)

export type TransactionInput = {
  amount: number
  description: string
  date: Date
  type: TransactionType
  status: TransactionStatus
  accountId: string
  categoryId: string
  subcategoryId?: string | null
  invoiceId?: string | null
  recurrenceId?: string | null
  destinationAccountId?: string | null
  installmentRef?: string | null
  installmentNumber?: number | null
  installmentTotal?: number | null
  receiptUrl?: string | null
  externalId?: string | null
}

export type TransactionUpdateInput = Partial<TransactionInput>

export type TransactionFilters = {
  accountId?: string
  categoryId?: string
  status?: TransactionStatus
  type?: TransactionType
}

const applyTransactionFields = (
  transaction: Transaction,
  input: TransactionInput | TransactionUpdateInput,
) => {
  if (input.amount !== undefined) transaction.amount = input.amount
  if (input.description !== undefined) transaction.description = input.description
  if (input.date !== undefined) transaction.date = input.date
  if (input.type !== undefined) transaction.type = input.type
  if (input.status !== undefined) transaction.status = input.status
  if (input.accountId !== undefined) transaction.accountId = input.accountId
  if (input.categoryId !== undefined) transaction.categoryId = input.categoryId
  if (input.subcategoryId !== undefined) transaction.subcategoryId = input.subcategoryId
  if (input.invoiceId !== undefined) transaction.invoiceId = input.invoiceId
  if (input.recurrenceId !== undefined) transaction.recurrenceId = input.recurrenceId
  if (input.destinationAccountId !== undefined) {
    transaction.destinationAccountId = input.destinationAccountId
  }
  if (input.installmentRef !== undefined) transaction.installmentRef = input.installmentRef
  if (input.installmentNumber !== undefined) transaction.installmentNumber = input.installmentNumber
  if (input.installmentTotal !== undefined) transaction.installmentTotal = input.installmentTotal
  if (input.receiptUrl !== undefined) transaction.receiptUrl = input.receiptUrl
  if (input.externalId !== undefined) transaction.externalId = input.externalId
}

export const getAllTransactions = async () => {
  return transactionsCollection().query(Q.sortBy('created_at', 'desc')).fetch()
}

export const getTransactionById = async (id: string) => {
  return transactionsCollection().find(id)
}

export const getTransactionsCount = async () => {
  return transactionsCollection().query().fetchCount()
}

export const getTransactionsByFilters = async (filters: TransactionFilters) => {
  const conditions = []

  if (filters.accountId) conditions.push(Q.where('account_id', filters.accountId))
  if (filters.categoryId) conditions.push(Q.where('category_id', filters.categoryId))
  if (filters.status) conditions.push(Q.where('status', filters.status))
  if (filters.type) conditions.push(Q.where('type', filters.type))

  return transactionsCollection()
    .query(...conditions)
    .fetch()
}

export const createTransaction = async (input: TransactionInput) => {
  return database.write(async () => {
    return transactionsCollection().create((transaction) => {
      applyTransactionFields(transaction, input)
    })
  })
}

export const updateTransaction = async (id: string, input: TransactionUpdateInput) => {
  return database.write(async () => {
    const transaction = await getTransactionById(id)

    return transaction.update((record) => {
      applyTransactionFields(record, input)
    })
  })
}

export const markTransactionAsDeleted = async (id: string) => {
  return database.write(async () => {
    const transaction = await getTransactionById(id)

    await transaction.markAsDeleted()
  })
}

export const transactionQueries = {
  table: TRANSACTIONS_TABLE,
  getAll: getAllTransactions,
  getById: getTransactionById,
  getCount: getTransactionsCount,
  getByFilters: getTransactionsByFilters,
  create: createTransaction,
  update: updateTransaction,
  delete: markTransactionAsDeleted,
  markAsDeleted: markTransactionAsDeleted,
}
