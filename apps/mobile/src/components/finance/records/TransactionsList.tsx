import { StyleSheet, View } from 'react-native'
import { ThemedText } from '@/components/ui/ThemedText'
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
  const sections = buildSections(transactions)

  return (
    <View style={styles.section}>
      {showTitle ? (
        <ThemedText text="Transacoes cadastradas" variant="title" style={styles.title} />
      ) : null}

      {isLoading ? (
        <ThemedText text="Carregando..." variant="caption" tone="muted" style={styles.stateText} />
      ) : error ? (
        <ThemedText text={error} variant="caption" tone="destructive" style={styles.stateText} />
      ) : transactions.length === 0 ? (
        <ThemedText
          text="Nenhuma transacao cadastrada."
          variant="caption"
          tone="muted"
          style={styles.stateText}
        />
      ) : (
        <View style={styles.list}>
          {sections.map((section) => (
            <View key={section.key} style={styles.group}>
              <ThemedText
                text={section.title}
                variant="caption"
                tone="muted"
                style={styles.groupTitle}
              />
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
