import type {
  CategoryData,
  SummaryData,
  TransactionListItem,
} from '@/components/finance/records/types'
import { TransactionType } from '@/services/database/models/transaction'
import { resolveCategoryColor } from './categoryColors'

export function buildCategoryOptions(
  transactions: TransactionListItem[],
  fallbackOptions: string[],
): string[] {
  const fromTransactions = Array.from(
    new Set(transactions.map((transaction) => transaction.category).filter(Boolean)),
  )

  return fromTransactions.length > 0 ? fromTransactions : fallbackOptions
}

export function filterTransactions(
  transactions: TransactionListItem[],
  filters: {
    categoryFilter: string
    typeFilter: TransactionType | 'ALL'
    searchQuery: string
  },
): TransactionListItem[] {
  const normalizedQuery = filters.searchQuery.trim().toLowerCase()

  return transactions.filter((transaction) => {
    const matchesCategory =
      filters.categoryFilter === 'Todas' || transaction.category === filters.categoryFilter
    const matchesType = filters.typeFilter === 'ALL' || transaction.type === filters.typeFilter
    const matchesQuery =
      normalizedQuery.length === 0 ||
      transaction.description.toLowerCase().includes(normalizedQuery) ||
      transaction.category.toLowerCase().includes(normalizedQuery)

    return matchesCategory && matchesType && matchesQuery
  })
}

export function buildSummaryData(transactions: TransactionListItem[]): SummaryData {
  const totals = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'INCOME') acc.income += transaction.amount
      if (transaction.type === 'EXPENSE') acc.expense += transaction.amount

      return acc
    },
    { income: 0, expense: 0 },
  )

  return {
    balance: totals.income - totals.expense,
    income: totals.income,
    expense: totals.expense,
  }
}

export function buildCategoryData(transactions: TransactionListItem[]): CategoryData[] {
  const totals = new Map<string, number>()

  transactions.forEach((transaction) => {
    const name = transaction.category || 'Sem categoria'
    const amount = Math.abs(transaction.amount)

    totals.set(name, (totals.get(name) ?? 0) + amount)
  })

  return Array.from(totals.entries()).map(([name, amount], index) => ({
    name,
    amount,
    color: resolveCategoryColor(name, index),
  }))
}
