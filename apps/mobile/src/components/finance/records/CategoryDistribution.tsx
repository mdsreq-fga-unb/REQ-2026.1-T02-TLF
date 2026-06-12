import { StyleSheet } from 'react-native'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { CategoryRow } from './CategoryRow'
import type { CategoryData } from '../../../../types/types'

type props = {
  categories: CategoryData[]
}

export function CategoryDistribution({ categories }: props) {
  const total = categories.reduce((acc, category) => acc + category.amount, 0)

  return (
    <ThemedContainer style={styles.card}>
      <ThemedText text="Distribuição por categoria" variant="title" style={styles.title} />
      {categories.map((category) => (
        <CategoryRow key={category.name} category={category} total={total} />
      ))}
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
})
