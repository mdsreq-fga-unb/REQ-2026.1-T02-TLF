import { View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'

type Props = {
  totalMonthly: number
  activeCount: number
}

export function RecurrenceSummaryCard({ totalMonthly, activeCount }: Props) {
  const theme = useThemeColor()

  const isExpense = totalMonthly > 0
  const amountColor = isExpense ? theme.expense : theme.success
  const sign = isExpense ? '−' : '+'

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.content}>
        <ThemedText tone="muted" style={styles.label} text="TOTAL MENSAL PREVISTO" />
        <ThemedText
          text={`${sign} ${formatCurrency(Math.abs(totalMonthly))}`}
          variant="display"
          style={[styles.amount, { color: amountColor }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        />
        <ThemedText
          tone="muted"
          style={[styles.sub, { opacity: activeCount > 0 ? 1 : 0 }]}
          text={`${activeCount} recorrências ativas`}
        />
      </View>
    </View>
  )
}
