import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { getTransactionAmountColor, TYPE_LABELS, TYPE_SIGN } from '@/utils/transactionForm'
import type { TransactionType } from './types'

type Props = {
  amountCents: number
  type: TransactionType | BudgetType
  onPress: () => void
}

export function AmountDisplay({ amountCents, type, onPress }: Props) {
  const theme = useThemeColor()
  const color = getTransactionAmountColor(type, theme)
  const amount = amountCents / 100
  const sign = TYPE_SIGN[type]

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ThemedText text={TYPE_LABELS[type]} variant="caption" tone="muted" style={styles.label} />
      <ThemedText
        text={`${sign ? `${sign} ` : ''}${formatCurrency(amount)}`}
        variant="display"
        style={[styles.amount, { color }]}
      />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1.44,
  },
})
