import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useCallback, useMemo } from 'react'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useFocusEffect } from 'expo-router'
import { database } from '@/services/database'
import { Category } from '@/services/database/models/category'
import { Transaction } from '@/services/database/models/transaction'
import { Q } from '@nozbe/watermelondb'
import { withObservables } from '@nozbe/watermelondb/react'

type BudgetsScreenProps = {
  categories: Category[]
  transactions: Transaction[]
}

function BudgetsScreenView({ categories, transactions }: BudgetsScreenProps) {
  const useBudget = useBudgetScreen()

  useFocusEffect(
    useCallback(() => {
      useBudget.fetchBudgets()
    }, [useBudget.fetchBudgets]),
  )

  const categoryById = useMemo(() => {
    return new Map(categories.map((category) => [category.id, category.color]))
  }, [categories])

  const budgetsWithUsage = useMemo(() => {
    return useBudget.budgets.map((budget) => {
      const spentValue = transactions.reduce((sum, transaction) => {
        if (transaction.type !== 'EXPENSE') return sum
        if (transaction.categoryId !== budget.categoryId) return sum
        const txDate = new Date(transaction.date)
        if (txDate.getMonth() + 1 !== budget.month || txDate.getFullYear() !== budget.year) {
          return sum
        }
        return sum + transaction.amount
      }, 0)

      return {
        ...budget,
        spentValue,
        remainingValue: budget.amountLimit - spentValue,
        spentPercentage:
          budget.amountLimit > 0 ? Math.round((spentValue / budget.amountLimit) * 100) : 0,
      }
    })
  }, [transactions, useBudget.budgets])

  return (
    <ThemedBackground>
      <FlatList
        data={budgetsWithUsage}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetItem
            id={item.id}
            categoryId={item.categoryId}
            categoryColor={categoryById.get(item.categoryId)}
            amountLimit={item.amountLimit}
            name={item.name}
            month={item.month}
            year={item.year}
            spentValue={item.spentValue}
            remainingValue={item.remainingValue}
            spentPercentage={item.spentPercentage}
            onDelete={() => useBudget.fetchBudgets()}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshing={useBudget.refreshing}
        onRefresh={useBudget.onRefresh}
      />
    </ThemedBackground>
  )
}

const BudgetsScreen = withObservables([], () => {
  const categoriesCollection = database.get<Category>('categories')
  const transactionsCollection = database.get<Transaction>('transactions')

  return {
    categories: categoriesCollection.query(Q.sortBy('name', 'asc')),
    transactions: transactionsCollection.query(Q.sortBy('created_at', 'desc')),
  }
})(BudgetsScreenView)

export default BudgetsScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    gap: 16,
  },
  loadingContainer: {
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
