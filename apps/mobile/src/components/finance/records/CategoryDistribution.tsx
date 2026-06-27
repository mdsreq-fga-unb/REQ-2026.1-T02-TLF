import { StyleSheet } from 'react-native'
import { useMemo } from 'react'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { CategoryRow } from './CategoryRow'
import type { Category } from '@/services/database/models/category'
import type { Transaction } from '@/services/database/models/transaction'
import { resolveCategoryColor } from '@/utils/records/categoryColors'

type Props = {
  transactions: Transaction[]
  categories: Category[]
}

type CategoryData = {
  id: string
  name: string
  amount: number
  color: string
}

export function CategoryDistribution({ transactions, categories }: Props) {
  const categoryData = useMemo<CategoryData[]>(() => {
    const categoryById = new Map(
      categories.map((category) => [
        category.id,
        { name: category.name || 'Sem categoria', color: category.color },
      ]),
    )

    const totals = new Map<string, CategoryData>()

    transactions.forEach((transaction) => {
      if (transaction.type !== 'EXPENSE') return

      const amount = transaction.amount / 100
      const categoryId = transaction.categoryId || 'Sem categoria'
      const category = categoryById.get(categoryId)
      const name = category?.name ?? 'Sem categoria'
      const current = totals.get(categoryId)
      const color = category?.color ?? resolveCategoryColor(name, totals.size)

      totals.set(categoryId, {
        id: categoryId,
        name,
        amount: (current?.amount ?? 0) + amount,
        color,
      })
    })

    return Array.from(totals.values())
  }, [categories, transactions])

  const total = categoryData.reduce((acc, category) => acc + category.amount, 0)

  return (
    <ThemedContainer style={styles.card}>
      <ThemedText text="Distribuição por categoria" variant="title" style={styles.title} />
      {categoryData.length > 0 ? (
        categoryData.map((category) => (
          <CategoryRow key={category.id} category={category} total={total} />
        ))
      ) : (
        <ThemedText
          text="Nenhuma despesa registrada"
          variant="bodyLarge"
          tone="muted"
          style={styles.empty}
        />
      )}
    </ThemedContainer>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignItems: 'stretch',
    gap: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  empty: {
    textAlign: 'left',
    paddingVertical: 8,
  },
})
