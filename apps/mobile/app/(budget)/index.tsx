import { BudgetItem } from '@/components/finance/budget/BudgetItem'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ActivityIndicator, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useState } from 'react'

type BudgetData = {
  id: string
  category: string
  totalValue: number
  spentValue: number
  totalPercentage: number
}

const INITIAL_DATA: BudgetData[] = [
  { id: '1', category: 'Alimentação', totalValue: 1500, spentValue: 800, totalPercentage: 53 },
  { id: '2', category: 'Transporte', totalValue: 500, spentValue: 450, totalPercentage: 90 },
  { id: '3', category: 'Lazer', totalValue: 300, spentValue: 350, totalPercentage: 116 },
]

export default function BudgetsScreen() {
  const colors = useThemeColor()
  const [data, setData] = useState<BudgetData[]>(INITIAL_DATA)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const fetchMoreData = () => {
    if (isLoadingMore) return

    setIsLoadingMore(true)

    setTimeout(() => {
      const newItems: BudgetData[] = [
        {
          id: Math.random().toString(),
          category: 'Saúde',
          totalValue: 600,
          spentValue: 100,
          totalPercentage: 16,
        },
        {
          id: Math.random().toString(),
          category: 'Educação',
          totalValue: 800,
          spentValue: 800,
          totalPercentage: 100,
        },
      ]

      setData((prevData) => [...prevData, ...newItems])
      setIsLoadingMore(false)
    }, 2000)
  }

  const renderFooter = () => {
    if (!isLoadingMore) return null
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }
  return (
    <ThemedBackground>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BudgetItem
            category={item.category}
            totalValue={item.totalValue}
            spentValue={item.spentValue}
          ></BudgetItem>
        )}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={renderFooter}
        onEndReached={fetchMoreData}
        onEndReachedThreshold={0.1}
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
