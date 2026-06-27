import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { Filter, FilterX } from 'lucide-react-native'
import { ThemedContainer } from '@/components/ui/ThemedContainer'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { FilterChip } from './FilterChip'
import { formatTransactionType } from '@/utils/formatters'
import { TransactionType } from '@/services/database/models/transaction'

type props = {
  categories: string[]
  selectedCategory: string
  onSelectCategory: (value: string) => void
  types: TransactionType[]
  selectedType: TransactionType | 'ALL'
  onSelectType: (value: TransactionType | 'ALL') => void
  initialOpen?: boolean
}

const ALL_CATEGORY = 'Todas'
const ALL_TYPE = 'ALL'

export function TransactionsFilters({
  categories,
  selectedCategory,
  onSelectCategory,
  types,
  selectedType,
  onSelectType,
  initialOpen = false,
}: props) {
  const theme = useThemeColor()
  const [isOpen, setIsOpen] = useState(initialOpen)

  return (
    <View style={styles.wrapper}>
      <View style={styles.iconRow}>
        <Pressable
          onPress={() => setIsOpen((prev) => !prev)}
          style={({ pressed }) => [
            styles.iconButton,
            {
              borderColor: theme.mutedForeground,
              backgroundColor: isOpen ? theme.primary : 'transparent',
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          {isOpen ? (
            <FilterX size={20} color={theme.foreground} />
          ) : (
            <Filter size={20} color={theme.foreground} />
          )}
        </Pressable>
      </View>

      {isOpen ? (
        <ThemedContainer style={styles.card}>
          <ThemedText text="Filtros" variant="title" style={styles.title} />

          <View style={styles.group}>
            <ThemedText text="Categoria" variant="caption" tone="muted" style={styles.subtitle} />
            <View style={styles.chips}>
              <FilterChip
                label={ALL_CATEGORY}
                isActive={selectedCategory === ALL_CATEGORY}
                onPress={() => onSelectCategory(ALL_CATEGORY)}
              />
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  isActive={selectedCategory === category}
                  onPress={() => onSelectCategory(category)}
                />
              ))}
            </View>
          </View>

          <View style={styles.group}>
            <ThemedText text="Tipo" variant="caption" tone="muted" style={styles.subtitle} />
            <View style={styles.chips}>
              <FilterChip
                label="Todos"
                isActive={selectedType === ALL_TYPE}
                onPress={() => onSelectType(ALL_TYPE)}
              />
              {types.map((type) => (
                <FilterChip
                  key={type}
                  label={formatTransactionType(type)}
                  isActive={selectedType === type}
                  onPress={() => onSelectType(type)}
                />
              ))}
            </View>
          </View>
        </ThemedContainer>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },
  iconRow: {
    width: '100%',
    alignItems: 'flex-end',
  },
  iconButton: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
  },
  card: {
    width: '100%',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  group: {
    width: '100%',
    gap: 8,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
})
