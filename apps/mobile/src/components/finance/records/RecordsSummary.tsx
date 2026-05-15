import { StyleSheet, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { SummaryCard } from './SummaryCard'
import { formatCurrency } from '@/utils/formatters'
import type { SummaryData } from './types'
import { BalanceHighlight } from './BalanceHighlight'

type props = {
  summary: SummaryData
}

export function RecordsSummary({ summary }: props) {
  const theme = useThemeColor()

  return (
    <View style={styles.section}>
      <BalanceHighlight value={summary.balance} />

      <View style={styles.row}>
        <SummaryCard
          label="Receitas"
          value={formatCurrency(summary.income)}
          caption="Ultimos 30 dias"
          style={styles.cardHalf}
        />

        <SummaryCard
          label="Despesas"
          value={formatCurrency(summary.expense)}
          caption="Ultimos 30 dias"
          valueColor={theme.warning}
          style={styles.cardHalf}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    gap: 16,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    gap: 12,
  },
  cardHalf: {
    flex: 1,
  },
})
