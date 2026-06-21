import { Pressable, StyleSheet } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { getTransactionAmountColor, TYPE_LABELS, TYPE_SIGN } from '@/utils/transactionForm'
import type { BudgetType } from '../../../../types/types'
import type { TransactionType } from './types'

type Props = {
  amountCents: number
  type: TransactionType | BudgetType
  onPress: () => void
}

const BUDGET_TYPE_LABELS: Record<BudgetType, string> = {
  BUDGET: 'Limite',
  GOAL: 'Meta',
}

const isBudgetType = (type: TransactionType | BudgetType): type is BudgetType =>
  type === 'BUDGET' || type === 'GOAL'

export function AmountDisplay({ amountCents, type, onPress }: Props) {
  const theme = useThemeColor()
  const amount = amountCents / 100
  const label = isBudgetType(type) ? BUDGET_TYPE_LABELS[type] : TYPE_LABELS[type]
  const sign = isBudgetType(type) ? '' : TYPE_SIGN[type]
  const color = isBudgetType(type) ? theme.primary : getTransactionAmountColor(type, theme)

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ThemedText text={label} variant="caption" tone="muted" style={styles.label} />
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
