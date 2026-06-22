import { useCallback, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router'

import { transactionsService } from '@/services/api/transactions/transactions.service'
import { transactionQueries } from '@/services/database/repository/transaction'
import {
  mapApiTransactionToListItem,
  mapLocalTransactionToListItem,
} from '@/utils/records/transactionMappers'
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

      const data = await transactionsService.list()
      setTransactions(data.map(mapApiTransactionToListItem))
    } catch (loadError) {
      console.error('loadHomeTransactions failed', loadError)

      try {
        const localData = await transactionQueries.getAll()
        setTransactions(localData.map(mapLocalTransactionToListItem))
        setError('Sem conexão. Exibindo dados locais.')
      } catch (localError) {
        console.error('loadHomeTransactions local fallback failed', localError)
        setTransactions([])
        setError('Não foi possível carregar as transações.')
      }
    } finally {
      setIsLoading(false)
    }
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
