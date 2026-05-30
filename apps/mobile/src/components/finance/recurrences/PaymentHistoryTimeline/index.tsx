import { View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import type { PaymentHistoryEntry } from '@/components/finance/recurrences/recurrences-data'
import { formatCurrency } from '@/utils/formatters'
import { getPaymentHistoryEntryDisplay } from '@/utils/recurrences/paymentHistory'
import { styles } from './style'

type Props = {
  history: PaymentHistoryEntry[]
  dueDay: number
  amount: number
}

export function PaymentHistoryTimeline({ history, dueDay, amount }: Props) {
  const theme = useThemeColor()

  if (history.length === 0) return null

  return (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle} text="Histórico de Pagamentos" />
      <View style={styles.timeline}>
        {history.map((entry, index) => {
          const isLast = index === history.length - 1
          const display = getPaymentHistoryEntryDisplay(entry, dueDay, amount, theme)

          return (
            <View key={`${entry.year}-${entry.month}-${index}`} style={styles.timelineRow}>
              <View style={styles.timelineCol}>
                <View
                  style={[
                    styles.timelineLineTop,
                    { backgroundColor: theme.border, opacity: index > 0 ? 1 : 0 },
                  ]}
                />
                <View style={[styles.timelineDot, { backgroundColor: display.dotColor }]}>
                  <AppIcon name={display.statusIcon} size={14} color={theme.onPrimary} />
                </View>
                <View
                  style={[
                    styles.timelineLineBottom,
                    { backgroundColor: theme.border, opacity: !isLast ? 1 : 0 },
                  ]}
                />
              </View>

              <View style={[styles.paymentCard, { backgroundColor: theme.surface }]}>
                <View style={styles.paymentCardRow}>
                  <ThemedText style={styles.historyMonth} text={display.monthLabel} />
                  <ThemedText
                    text={formatCurrency(display.displayAmount)}
                    variant="label"
                    tone={display.isPending ? 'muted' : 'default'}
                    style={styles.historyAmount}
                    numberOfLines={1}
                  />
                </View>
                <View style={[styles.paymentCardRow, { alignItems: 'center' }]}>
                  <ThemedText
                    tone="muted"
                    style={styles.historyMeta}
                    text={display.metaText}
                    numberOfLines={1}
                  />
                  <View style={[styles.statusPill, { backgroundColor: display.statusBg }]}>
                    <ThemedText
                      text={display.statusLabel}
                      variant="caption"
                      style={[styles.statusPillText, { color: display.dotColor }]}
                    />
                  </View>
                </View>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}
