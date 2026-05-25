import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useCallback } from 'react'
import { useBudgetScreen } from '@/hooks/budget/useBudgetScreen'
import { useFocusEffect } from 'expo-router'

export default function BudgetsScreen() {
  const useBudget = useBudgetScreen()

  useFocusEffect(
    useCallback(() => {
      useBudget.fetchBudgets()
    }, []),
  )

  return (
    <ThemedBackground>
      <FlatList
        data={useBudget.budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetItem
            id={item.id}
            categoryId={item.categoryId}
            amountLimit={item.amountLimit}
            name={item.name}
            month={item.month}
            year={item.year}
            onDelete={() => useBudget.fetchBudgets()}
          />
        )}
        contentContainerStyle={styles.listContainer}
        refreshing={useBudget.refreshing}
        onRefresh={useBudget.onRefresh}
      ></FlatList>
    </ThemedBackground>
  )
}

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
