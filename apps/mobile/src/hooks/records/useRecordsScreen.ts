import {
  mockTransactions,
  transactionCategoryOptions,
  transactionTypeOptions,
} from '@/components/finance/records/records-data'
import type {
  CategoryData,
  SummaryData,
  TransactionListItem,
} from '@/components/finance/records/types'
import type { ThemedOverlayAlertAction } from '@/components/ui/ThemedOverlayAlert'
import { transactionsService } from '@/services/api/transactions/transactions.service'
import { transactionQueries } from '@/services/database/queries/transaction'
import type { TransactionType } from '@/services/database/queries/transaction'
import {
  buildCategoryData,
  buildCategoryOptions,
  buildSummaryData,
  filterTransactions,
} from '@/utils/records/recordsCalculations'
import {
  mapApiTransactionToListItem,
  mapLocalTransactionToListItem,
} from '@/utils/records/transactionMappers'
import { router } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useFocusEffect } from 'expo-router';


const USE_MOCK_TRANSACTIONS = false

export type RecordsScreenAlert = {
  title?: string
  message: string
  actions: ThemedOverlayAlertAction[]
}

export function useRecordsScreen() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')
  const [alert, setAlert] = useState<RecordsScreenAlert | null>(null)

  const loadTransactions = useCallback(async () => {
    if (USE_MOCK_TRANSACTIONS) return

    try {
      setIsLoading(true)
      let data

      if (categoryFilter !== 'Todas') {
        data = await transactionsService.list({ category: categoryFilter })
      } else if (typeFilter !== 'ALL') {
        data = await transactionsService.list({ type: typeFilter })
      } else {
        data = await transactionsService.list()
      }

      setTransactions(data.map(mapApiTransactionToListItem))
      setError(null)
    } catch (loadError) {
      console.error('loadTransactions failed', loadError)
      try {
        const localFilters: Record<string, any> = {}
        if (categoryFilter !== 'Todas') localFilters.categoryId = categoryFilter
        if (typeFilter !== 'ALL') localFilters.type = typeFilter

        const localData = await transactionQueries.getByFilters(localFilters)
        setTransactions(localData.map(mapLocalTransactionToListItem))
        setError('Sem conexao. Exibindo dados locais.')
      } catch {
        setError('Nao foi possivel carregar as transacoes.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [categoryFilter, typeFilter])

  useEffect(() => {
    if (USE_MOCK_TRANSACTIONS) {
      setTransactions(mockTransactions)
      setIsLoading(false)
      setError(null)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      loadTransactions()
    }, [loadTransactions])
  )

  const dismissAlert = useCallback(() => setAlert(null), [])

  const handleEdit = useCallback((transaction: TransactionListItem) => {
    router.push({
      pathname: '/edit-record/[id]',
      params: {
        id: transaction.id,
        type: transaction.type,
        amount: transaction.amount.toString(),
        categoryId: transaction.categoryId,
        subcategoryId: transaction.subcategoryId || '',
        accountId: transaction.accountId,
        destinationAccountId: transaction.destinationAccountId || '',
        description: transaction.description,
        date: typeof transaction.date === 'string' ? transaction.date : new Date(transaction.date).toISOString(),
      },
    })
  }, [])

  const performDelete = useCallback(
    async (transactionId: string) => {
      setAlert(null)

      if (USE_MOCK_TRANSACTIONS) {
        setTransactions((prev) => prev.filter((item) => item.id !== transactionId))
        return
      }

      const previousTransactions = [...transactions]
      setTransactions((prev) => prev.filter((item) => item.id !== transactionId))

      try {
        try {
          await transactionQueries.delete(transactionId)
        } catch {
          console.warn(
            '[OFFLINE-FIRST] Registro não encontrado localmente. Tentando excluir apenas na API.',
          )
        }

        try {
          await transactionsService.delete(transactionId)
          setError(null)
          setAlert({
            title: 'Transação excluída',
            message: 'A transação foi removida com sucesso.',
            actions: [{ label: 'Entendi', onPress: dismissAlert }],
          })
        } catch (apiError) {
          console.warn('[OFFLINE-FIRST] Falha ao excluir na API, o registro será sincronizado depois.', apiError)
          setAlert({
            title: 'Excluído localmente',
            message: 'Sem conexão. A alteração será sincronizada em breve.',
            actions: [{ label: 'Entendi', onPress: dismissAlert }],
          })
        }
      } catch (error) {
        console.error('Erro crítico no delete:', error)
        setTransactions(previousTransactions)
        setError('Não foi possível excluir a transação.')
      }
    },
    [dismissAlert, transactions],
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
    error,
    handleEdit,
    handleDelete,
    alert,
    dismissAlert,
  }
}
