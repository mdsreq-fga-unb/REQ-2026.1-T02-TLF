import { Pressable, StyleSheet, Text } from 'react-native'
import { formatCurrency } from '@/utils/formatters'
import { AMOUNT_COLORS, type TransactionType } from './types'
import { BudgetType } from 'types/types'

// Design system token
const OUTLINE = '#908fa0'

type Props = {
  amountCents: number
  type: TransactionType | BudgetType
  onPress: () => void
}

const TYPE_LABELS: Record<TransactionType | BudgetType, string> = {
  EXPENSE: 'Despesa',
  INCOME: 'Receita',
  TRANSFER: 'Transferência',
  BUDGET: 'orçamento',
  GOAL: 'meta',
}

const TYPE_SIGN: Record<TransactionType | BudgetType, string> = {
  EXPENSE: '−',
  INCOME: '+',
  TRANSFER: '',
  BUDGET: '',
  GOAL: '',
}

export function AmountDisplay({ amountCents, type, onPress }: Props) {
  const color = AMOUNT_COLORS[type]
  const amount = amountCents / 100
  const sign = TYPE_SIGN[type]

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.label}>{TYPE_LABELS[type]}</Text>
      <Text style={[styles.amount, { color }]}>
        {sign ? `${sign} ` : ''}
        {formatCurrency(amount)}
      </Text>
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
    color: OUTLINE,
  },
  amount: {
    fontSize: 36,
    fontWeight: '700',
    letterSpacing: -1.44,
  },
})
