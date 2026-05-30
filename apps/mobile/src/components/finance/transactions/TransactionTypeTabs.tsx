import { Pressable, StyleSheet, View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { getTransactionTypeColor } from '@/utils/transactionForm'
import type { TransactionType } from './types'

type Props = {
  value: TransactionType
  onChange: (type: TransactionType) => void
  onRecorrencias?: () => void
}

const TABS: { value: TransactionType; label: string }[] = [
  { value: 'EXPENSE', label: 'Despesa' },
  { value: 'INCOME', label: 'Receita' },
  { value: 'TRANSFER', label: 'Transferência' },
]

export function TransactionTypeTabs({ value, onChange, onRecorrencias }: Props) {
  const theme = useThemeColor()

  return (
    <View style={[styles.row, { borderBottomColor: theme.border }]}>
      {TABS.map((tab) => {
        const active = tab.value === value
        return (
          <Pressable
            key={tab.value}
            onPress={() => onChange(tab.value)}
            style={[
              styles.tab,
              {
                borderBottomColor: active
                  ? getTransactionTypeColor(tab.value, theme)
                  : 'transparent',
              },
            ]}
          >
            <ThemedText
              text={tab.label}
              variant="label"
              tone={active ? 'default' : 'muted'}
              style={[styles.label, active && styles.labelActive]}
            />
          </Pressable>
        )
      })}

      {onRecorrencias && (
        <Pressable
          onPress={onRecorrencias}
          style={[styles.tab, { borderBottomColor: 'transparent' }]}
        >
          <ThemedText text="Recorrências" variant="label" tone="muted" style={styles.label} />
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 2,
    marginBottom: -1,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
  },
  labelActive: {
    fontWeight: '600',
  },
})
