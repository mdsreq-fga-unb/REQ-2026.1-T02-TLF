import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { getTransactionTypeColor, TRANSACTION_FORM_COPY, TYPE_TABS } from '@/utils/transactionForm'
import type { TransactionType } from './types'

type Props = {
  value: TransactionType
  onChange: (type: TransactionType) => void
  onRecorrencias?: () => void
}

export function TransactionTypeTabs({ value, onChange, onRecorrencias }: Props) {
  const theme = useThemeColor()

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.scroll, { borderBottomColor: theme.border }]}
      contentContainerStyle={styles.row}
    >
      {TYPE_TABS.map((tab) => {
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

      {onRecorrencias ? (
        <Pressable
          onPress={onRecorrencias}
          style={[styles.tab, { borderBottomColor: 'transparent' }]}
        >
          <ThemedText
            text={TRANSACTION_FORM_COPY.recorrenciasTab}
            variant="label"
            tone="muted"
            style={styles.label}
          />
        </Pressable>
      ) : null}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
    marginBottom: 8,
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 4,
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 2,
    marginBottom: -1,
    flexShrink: 0,
  },
  label: {
    fontSize: 13,
    fontWeight: '400',
  },
  labelActive: {
    fontWeight: '600',
  },
})
