import {
  transactionCategoryOptions,
  transactionTypeOptions,
} from '@/components/finance/records/records-data'
import type {
  CategoryData,
  SummaryData,
  TransactionListItem,
} from '@/components/finance/records/types'
import type { ThemedOverlayAlertAction } from '@/components/ui/ThemedOverlayAlert'
import {
  observeTransactions,
  markTransactionAsDeleted,
} from '@/services/database/queries/transaction'
import type { TransactionType } from '@/services/database/queries/transaction'
import { trySync } from '@/services/sync'
import {
  buildCategoryData,
  buildCategoryOptions,
  buildSummaryData,
  filterTransactions,
} from '@/utils/records/recordsCalculations'
import { mapLocalTransactionToListItem } from '@/utils/records/transactionMappers'
import { router } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'

export type RecordsScreenAlert = {
  title?: string
  message: string
  actions: ThemedOverlayAlertAction[]
}

export function useRecordsScreen() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [alert, setAlert] = useState<RecordsScreenAlert | null>(null)

  useEffect(() => {
    const subscription = observeTransactions().subscribe((rows) => {
      setTransactions(rows.map(mapLocalTransactionToListItem))
      setIsLoading(false)
    })

    void trySync()

    return () => subscription.unsubscribe()
  }, [])

  const dismissAlert = useCallback(() => setAlert(null), [])

  const handleEdit = useCallback((transaction: TransactionListItem) => {
    router.push({
      pathname: '/edit-record/[id]',
      params: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount.toString(),
        categoryId: transaction.category,
        description: transaction.description,
      },
    })
  }, [])

  const performDelete = useCallback(
    async (transactionId: string) => {
      setAlert(null)

      try {
        await markTransactionAsDeleted(transactionId)
        void trySync()
        setAlert({
          title: 'Transacao excluida',
          message: 'A transacao foi removida com sucesso.',
          actions: [{ label: 'Entendi', onPress: dismissAlert }],
        })
      } catch (deleteError) {
        console.error('Erro ao excluir transacao:', deleteError)
        setAlert({
          title: 'Erro',
          message: 'Nao foi possivel excluir a transacao.',
          actions: [{ label: 'Entendi', onPress: dismissAlert }],
        })
      }
    },
    [dismissAlert],
  )

  const handleDelete = useCallback(
    (transactionId: string) => {
      setAlert({
        title: 'Confirmar exclusao',
        message: 'Deseja excluir esta transacao?',
        actions: [
          {
            label: 'Cancelar',
            onPress: dismissAlert,
            fillTone: 'muted',
            textTone: 'default',
          },
          {
            label: 'Excluir',
            onPress: () => void performDelete(transactionId),
            fillTone: 'destructive',
            textTone: 'onPrimary',
          },
        ],
      })
    },
    [dismissAlert, performDelete],
  )

  const categoryOptions = useMemo(
    () => buildCategoryOptions(transactions, transactionCategoryOptions),
    [transactions],
  )

  const filteredTransactions = useMemo(
    () =>
      filterTransactions(transactions, {
        categoryFilter,
        typeFilter,
        searchQuery,
      }),
    [categoryFilter, searchQuery, transactions, typeFilter],
  )

  const summaryData: SummaryData = useMemo(
    () => buildSummaryData(filteredTransactions),
    [filteredTransactions],
  )

  const categoryData: CategoryData[] = useMemo(
    () => buildCategoryData(filteredTransactions),
    [filteredTransactions],
  )

  return {
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    categoryOptions,
    transactionTypeOptions,
    filteredTransactions,
    summaryData,
    categoryData,
    isLoading,
    error: null,
    handleEdit,
    handleDelete,
    alert,
    dismissAlert,
  }
}
