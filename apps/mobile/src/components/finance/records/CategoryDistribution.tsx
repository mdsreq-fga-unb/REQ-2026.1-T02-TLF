import { StyleSheet, Text } from 'react-native'
import { Container } from '@/components/ui/Container'
import { useThemeColor } from '@/hooks/useThemeColor'
import { CategoryRow } from './CategoryRow'
import type { CategoryData } from './types'

type props = {
  categories: CategoryData[]
}

export function CategoryDistribution({ categories }: props) {
  const theme = useThemeColor()
  const total = categories.reduce((acc, category) => acc + category.amount, 0)

  return (
    <Container style={styles.card}>
      <Text style={[styles.title, { color: theme.text }]}>Distribuição por categoria</Text>
      {categories.map((category) => (
        <CategoryRow key={category.name} category={category} total={total} />
      ))}
    </Container>
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
