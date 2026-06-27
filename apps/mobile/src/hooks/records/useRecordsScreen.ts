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
import { categoryQueries } from '@/services/database/repository/category'
import { transactionQueries } from '@/services/database/repository/transaction'
import { syncDatabase } from '@/services/database/sync'
import { TransactionType } from '@/services/database/models/transaction'
import {
  buildCategoryData,
  buildCategoryOptions,
  buildSummaryData,
  filterTransactions,
} from '@/utils/records/recordsCalculations'
import { mapLocalTransactionToListItem } from '@/utils/records/transactionMappers'
import { router, useFocusEffect } from 'expo-router'
import { useCallback, useEffect, useMemo, useState } from 'react'

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
      setError(null)

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
    } catch (loadError) {
      console.error('loadTransactions failed', loadError)
      try {
        const localData = await transactionQueries.getAll()
        setTransactions(localData.map((transaction) => mapLocalTransactionToListItem(transaction)))
        setError('Sem conexao. Exibindo dados locais.')
      } catch {
        setError('Nao foi possivel carregar as transacoes.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

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
    }, [loadTransactions]),
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
        institutionId: transaction.institutionId,
        destinationInstitutionId: transaction.destinationInstitutionId || '',
        description: transaction.description,
        date:
          typeof transaction.date === 'string'
            ? transaction.date
            : new Date(transaction.date).toISOString(),
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
        await transactionQueries.delete(transactionId)
        void syncDatabase()
        setError(null)
        setAlert({
          title: 'Transação excluída',
          message: 'A exclusão foi salva localmente e será sincronizada quando houver conexão.',
          actions: [{ label: 'Entendi', onPress: dismissAlert }],
        })
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
