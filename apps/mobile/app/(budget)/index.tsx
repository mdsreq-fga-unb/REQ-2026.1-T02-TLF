import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useCallback, useMemo } from 'react'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useFocusEffect } from 'expo-router'
import { database } from '@/services/database'
import { Category } from '@/services/database/models/category'
import { Q } from '@nozbe/watermelondb'
import { withObservables } from '@nozbe/watermelondb/react'

type BudgetsScreenProps = {
  categories: Category[]
}

function BudgetsScreenView({ categories }: BudgetsScreenProps) {
  const useBudget = useBudgetScreen()

  useFocusEffect(
    useCallback(() => {
      useBudget.fetchBudgets()
    }, [useBudget.fetchBudgets]),
  )

  const categoryById = useMemo(() => {
    return new Map(categories.map((category) => [category.id, category.color]))
  }, [categories])

  return (
    <ThemedBackground>
      <FlatList
        data={useBudget.budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetItem
            id={item.id}
            categoryId={item.categoryId}
            categoryColor={categoryById.get(item.categoryId) ?? item.category?.color}
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

  return {
    categories: categoriesCollection.query(Q.sortBy('name', 'asc')),
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
