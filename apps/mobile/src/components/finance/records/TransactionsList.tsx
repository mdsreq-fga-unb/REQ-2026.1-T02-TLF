import { StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatDateHeading } from '@/utils/formatters'
import { TransactionItem } from './TransactionItem'
import type { TransactionListItem } from './types'

type props = {
  transactions: TransactionListItem[]
  isLoading?: boolean
  error?: string | null
  onDeleteTransaction?: (id: string) => void
  onTransactionPress?: (transaction: TransactionListItem) => void
  onEditTransaction?: (transaction: TransactionListItem) => void
  showTitle?: boolean
}

type TransactionSection = {
  key: string
  title: string
  items: TransactionListItem[]
}

const toDate = (value: TransactionListItem['date']) => {
  return value instanceof Date ? value : new Date(value)
}

const getDateKey = (value: TransactionListItem['date']) => {
  const date = toDate(value)
  if (Number.isNaN(date.getTime())) return 'invalid'
  return date.toISOString().slice(0, 10)
}

const buildSections = (transactions: TransactionListItem[]): TransactionSection[] => {
  const sorted = [...transactions].sort(
    (left, right) => toDate(right.date).getTime() - toDate(left.date).getTime(),
  )

  const sections = new Map<string, TransactionSection>()

  sorted.forEach((transaction) => {
    const key = getDateKey(transaction.date)
    const title = key === 'invalid' ? 'Sem data' : formatDateHeading(transaction.date)
    const existing = sections.get(key)

    if (existing) {
      existing.items.push(transaction)
    } else {
      sections.set(key, { key, title, items: [transaction] })
    }
  })

  return Array.from(sections.values())
}

export function TransactionsList({
  transactions,
  isLoading = false,
  error,
  onDeleteTransaction,
  onTransactionPress,
  onEditTransaction,
  showTitle = false,
}: props) {
  const theme = useThemeColor()
  const sections = buildSections(transactions)

  return (
    <View style={styles.section}>
      {showTitle ? (
        <Text style={[styles.title, { color: theme.foreground }]}>Transacoes cadastradas</Text>
      ) : null}

      {isLoading ? (
        <Text style={[styles.stateText, { color: theme.mutedForeground }]}>Carregando...</Text>
      ) : error ? (
        <Text style={[styles.stateText, { color: theme.warning }]}>{error}</Text>
      ) : transactions.length === 0 ? (
        <Text style={[styles.stateText, { color: theme.mutedForeground }]}>
          Nenhuma transacao cadastrada.
        </Text>
      ) : (
        <View style={styles.list}>
          {sections.map((section, index) => (
            <View key={section.key} style={styles.group}>
              {index > 0 ? (
                <View style={[styles.groupDivider, { backgroundColor: theme.mutedForeground }]} />
              ) : null}
              <Text style={[styles.groupTitle, { color: theme.mutedForeground }]}>
                {section.title}
              </Text>
              <View style={styles.groupItems}>
                {section.items.map((transaction) => (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    onDelete={onDeleteTransaction}
                    onPress={onTransactionPress}
                    onEdit={onEditTransaction}
                  />
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  section: {
    width: '100%',
    gap: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  stateText: {
    fontSize: 13,
    textAlign: 'center',
  },
  list: {
    width: '100%',
    gap: 16,
  },
  group: {
    width: '100%',
    gap: 10,
  },
  groupDivider: {
    width: '100%',
    height: 1,
    borderRadius: 999,
    opacity: 0.25,
    marginTop: 6,
  },
  groupTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
  groupItems: {
    gap: 12,
  },
})
