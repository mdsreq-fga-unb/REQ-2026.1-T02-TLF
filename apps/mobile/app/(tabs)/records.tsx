import { useEffect, useMemo, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { Background } from '@/components/ui/Background'
import { ScrollArea } from '@/components/ui/ScrollArea'
import { RecordsSummary } from '@/components/finance/records/RecordsSummary'
import { CategoryDistribution } from '@/components/finance/records/CategoryDistribution'
import { TransactionsList } from '@/components/finance/records/TransactionsList'
import { TransactionsFilters } from '@/components/finance/records/TransactionsFilters'
import { RecordsHeader } from '@/components/finance/records/RecordsHeader'
import { RecordsSearch } from '@/components/finance/records/RecordsSearch'
import { SectionDivider } from '@/components/ui/SectionDivider'
import {
  categoryDistribution,
  mockTransactions,
  transactionCategoryOptions,
  transactionTypeOptions,
} from '@/components/finance/records/records-data'
import {
  deleteTransaction,
  listTransactions,
  listTransactionsByCategory,
  listTransactionsByType,
  type TransactionApiItem,
} from '@/services/api/transactions'
import { transactionQueries } from '@/services/database/queries/transaction'
import type { Transaction } from '@/services/database/models/transaction'
import type { TransactionType } from '@/services/database/queries/transaction'
import type { TransactionListItem } from '@/components/finance/records/types'

const CATEGORY_COLOR_PALETTE = categoryDistribution.map((category) => category.color)
const CATEGORY_COLOR_MAP = new Map(
  categoryDistribution.map((category) => [category.name, category.color]),
)
const FALLBACK_CATEGORY_COLOR = CATEGORY_COLOR_PALETTE[0] ?? '#6A66FF'
const PALETTE_SIZE = CATEGORY_COLOR_PALETTE.length || 1
const USE_MOCK_TRANSACTIONS = true

const mapLocalTransactionToListItem = (transaction: Transaction): TransactionListItem => {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.categoryId || 'Sem categoria',
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
  }
}

const mapApiTransactionToListItem = (transaction: TransactionApiItem): TransactionListItem => {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.category ?? transaction.categoryId ?? 'Sem categoria',
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
  }
}

export default function RecordsScreen() {
  const [transactions, setTransactions] = useState<TransactionListItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = useState('Todas')
  const [typeFilter, setTypeFilter] = useState<TransactionType | 'ALL'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (!USE_MOCK_TRANSACTIONS) return
    setTransactions(mockTransactions)
    setIsLoading(false)
    setError(null)
  }, [])

  useEffect(() => {
    if (USE_MOCK_TRANSACTIONS) return
    let isActive = true

    const loadTransactions = async () => {
      try {
        setIsLoading(true)
        let data: TransactionApiItem[] = []

        if (categoryFilter !== 'Todas') {
          data = await listTransactionsByCategory(categoryFilter)
        } else if (typeFilter !== 'ALL') {
          data = await listTransactionsByType(typeFilter)
        } else {
          data = await listTransactions()
        }

        if (!isActive) return

        setTransactions(data.map(mapApiTransactionToListItem))
        setError(null)
      } catch (loadError) {
        if (!isActive) return

        try {
          const localData = await transactionQueries.getAll()

          if (!isActive) return

          setTransactions(localData.map(mapLocalTransactionToListItem))
          setError('Sem conexao. Exibindo dados locais.')
        } catch (localError) {
          console.error('Erro ao carregar transacoes:', loadError)
          console.error('Erro ao carregar transacoes locais:', localError)
          setError('Nao foi possivel carregar as transacoes.')
        }
      } finally {
        if (isActive) setIsLoading(false)
      }
    }

    loadTransactions()

    return () => {
      isActive = false
    }
  }, [categoryFilter, typeFilter])

  const handleDelete = (transactionId: string) => {
    Alert.alert('Confirmar exclusao', 'Deseja excluir esta transacao?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          if (USE_MOCK_TRANSACTIONS) {
            setTransactions((prev) => prev.filter((item) => item.id !== transactionId))
            setError(null)
            Alert.alert('Transacao excluida', 'A transacao foi removida com sucesso.')
            return
          }
          try {
            await deleteTransaction(transactionId)
            setTransactions((prev) => prev.filter((item) => item.id !== transactionId))
            try {
              await transactionQueries.delete(transactionId)
            } catch {
              // Local delete is best-effort to keep offline cache in sync.
            }
            setError(null)
            Alert.alert('Transacao excluida', 'A transacao foi removida com sucesso.')
          } catch (deleteError) {
            console.error('Erro ao excluir transacao:', deleteError)
            setError('Nao foi possivel excluir a transacao.')
          }
        },
      },
    ])
  }

  const categoryOptions = useMemo(() => {
    const fromTransactions = Array.from(
      new Set(transactions.map((transaction) => transaction.category).filter(Boolean)),
    )

    return fromTransactions.length > 0 ? fromTransactions : transactionCategoryOptions
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    return transactions.filter((transaction) => {
      const matchesCategory = categoryFilter === 'Todas' || transaction.category === categoryFilter
      const matchesType = typeFilter === 'ALL' || transaction.type === typeFilter
      const matchesQuery =
        normalizedQuery.length === 0 ||
        transaction.description.toLowerCase().includes(normalizedQuery) ||
        transaction.category.toLowerCase().includes(normalizedQuery)

      return matchesCategory && matchesType && matchesQuery
    })
  }, [categoryFilter, searchQuery, transactions, typeFilter])

  const summaryData = useMemo(() => {
    const totals = filteredTransactions.reduce(
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
  }, [filteredTransactions])

  const categoryData = useMemo(() => {
    const totals = new Map<string, number>()

    filteredTransactions.forEach((transaction) => {
      const name = transaction.category || 'Sem categoria'
      const amount = Math.abs(transaction.amount)

      totals.set(name, (totals.get(name) ?? 0) + amount)
    })

    return Array.from(totals.entries()).map(([name, amount], index) => {
      const color =
        CATEGORY_COLOR_MAP.get(name) ??
        CATEGORY_COLOR_PALETTE[index % PALETTE_SIZE] ??
        FALLBACK_CATEGORY_COLOR

      return {
        name,
        amount,
        color,
      }
    })
  }, [filteredTransactions])

  return (
    <Background>
      <ScrollArea contentContainerStyle={styles.content}>
        <RecordsHeader title="Histórico" showPeriod={false} />
        <RecordsSearch value={searchQuery} onChangeText={setSearchQuery} />
        <RecordsSummary summary={summaryData} />
        <SectionDivider />
        <TransactionsFilters
          categories={categoryOptions}
          selectedCategory={categoryFilter}
          onSelectCategory={setCategoryFilter}
          types={transactionTypeOptions}
          selectedType={typeFilter}
          onSelectType={setTypeFilter}
        />
        <SectionDivider />
        <TransactionsList
          transactions={filteredTransactions}
          isLoading={isLoading}
          error={error}
          onDeleteTransaction={handleDelete}
        />
        <SectionDivider />
        <CategoryDistribution categories={categoryData} />
      </ScrollArea>
    </Background>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 18,
    alignItems: 'stretch',
  },
})
