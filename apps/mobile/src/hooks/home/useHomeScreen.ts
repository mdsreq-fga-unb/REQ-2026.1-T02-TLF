import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'

import { categoryQueries } from '@/services/database/repository/category'
import { transactionQueries } from '@/services/database/repository/transaction'
import { syncDatabase } from '@/services/database/sync'
import { mapLocalTransactionToListItem } from '@/utils/records/transactionMappers'
import { buildCategoryData, buildSummaryData } from '@/utils/records/recordsCalculations'
import type {
  CategoryData,
  SummaryData,
  TransactionListItem,
} from '@/components/finance/records/types'

export function useHomeScreen() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadTransactions = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [localTransactions, categories] = await Promise.all([
        transactionQueries.getAll(),
        categoryQueries.getAll(),
      ])

      const categoryLookup = new Map(
        categories.map((category) => [category.id, { id: category.id, name: category.name }]),
      )

      setTransactions(
        localTransactions.map((transaction) =>
          mapLocalTransactionToListItem(transaction, categoryLookup),
        ),
      )
    } catch (loadError) {
      console.error('loadHomeTransactions failed', loadError)
      setTransactions([])
      setError('Não foi possível carregar as transações.')
    } finally {
      setIsLoading(false)
    }

    void (async () => {
      try {
        await syncDatabase()
        const [refreshedTransactions, refreshedCategories] = await Promise.all([
          transactionQueries.getAll(),
          categoryQueries.getAll(),
        ])
        const refreshedLookup = new Map(
          refreshedCategories.map((category) => [
            category.id,
            { id: category.id, name: category.name },
          ]),
        )
        setTransactions(
          refreshedTransactions.map((transaction) =>
            mapLocalTransactionToListItem(transaction, refreshedLookup),
          ),
        )
      } catch (syncError) {
        console.warn(
          '[OFFLINE-FIRST] Sincronização de transações indisponível no momento.',
          syncError,
        )
      }
    })()
  }, [])

  useFocusEffect(
    useCallback(() => {
      void loadTransactions()
    }, [loadTransactions]),
  )

  const summaryData: SummaryData = useMemo(() => buildSummaryData(transactions), [transactions])

  const expenseTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.type === 'EXPENSE'),
    [transactions],
  )

  const expenseCategories: CategoryData[] = useMemo(
    () => buildCategoryData(expenseTransactions),
    [expenseTransactions],
  )

  const expenseTotal = useMemo(
    () => expenseCategories.reduce((acc, category) => acc + category.amount, 0),
    [expenseCategories],
  )

  return {
    transactions,
    isLoading,
    error,
    summaryData,
    expenseCategories,
    expenseTotal,
    refresh: loadTransactions,
  }
}
