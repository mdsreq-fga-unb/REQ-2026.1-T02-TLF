import { Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'

const GREEN = '#00E383'
const RED = '#FF4B4B'
const LABEL_GRAY = '#9CA3AF'

type Props = {
  totalMonthly: number
  activeCount: number
}

export function RecurrenceSummaryCard({ totalMonthly, activeCount }: Props) {
  const theme = useThemeColor()

  const isExpense = totalMonthly > 0
  const amountColor = isExpense ? RED : GREEN
  const sign = isExpense ? '−' : '+'

  return (
    <View style={[styles.card, { backgroundColor: theme.surface, borderColor: theme.border }]}>
      <View style={styles.content}>
        <Text style={[styles.label, { color: LABEL_GRAY }]}>TOTAL MENSAL PREVISTO</Text>
        <Text
          style={[styles.amount, { color: amountColor }]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {sign} {formatCurrency(Math.abs(totalMonthly))}
        </Text>
        <Text style={[styles.sub, { color: LABEL_GRAY, opacity: activeCount > 0 ? 1 : 0 }]}>
          {activeCount} recorrências ativas
        </Text>
      </View>
    </View>
  )
}
