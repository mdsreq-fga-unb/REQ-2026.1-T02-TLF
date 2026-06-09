import { useState } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import type { SemanticColors } from '@/utils/colors'
import type { IconKey } from '@/utils/icons'
import type { TransactionListItem } from 'types/types'
import { Pencil, Trash2 } from 'lucide-react-native'

type props = {
  transaction: TransactionListItem
  onDelete?: (id: string) => void
  onPress?: (transaction: TransactionListItem) => void
  onEdit?: (transaction: TransactionListItem) => void
}

export function TransactionItem({ transaction, onDelete, onPress, onEdit }: props) {
  const theme = useThemeColor()
  const [showActions, setShowActions] = useState(false)
  const isExpense = transaction.type === 'EXPENSE'
  const isIncome = transaction.type === 'INCOME'
  const amountSign = isExpense ? '-' : isIncome ? '+' : ''
  const amountText = `${amountSign}${formatCurrency(Math.abs(transaction.amount))}`
  const visuals = getTransactionVisuals(transaction, theme)
  const iconBackground = applyAlpha(visuals.color, 0.2)
  const cardLine = { borderBottomColor: applyAlpha(theme.mutedForeground, 0.18) }

  return (
    <Pressable
      onPress={() => {
        setShowActions((prev) => !prev)
        onPress?.(transaction)
      }}
      style={({ pressed }) => [styles.card, cardLine, pressed ? styles.cardPressed : null]}
    >
      <View style={styles.row}>
        <View style={styles.leftContent}>
          <View style={styles.iconBlock}>
            <View style={[styles.iconWrap, { backgroundColor: iconBackground }]}>
              <AppIcon name={visuals.icon} size={18} color={visuals.color} />
            </View>
          </View>

          <View style={styles.details}>
            <ThemedText
              text={transaction.description}
              variant="label"
              style={styles.description}
              numberOfLines={1}
            />
            <ThemedText
              text={transaction.category}
              variant="caption"
              tone="muted"
              style={styles.subtitle}
              numberOfLines={1}
            />
          </View>
        </View>

        <View style={styles.rightColumn}>
          <ThemedText
            text={amountText}
            variant="label"
            tone={isExpense ? 'destructive' : 'default'}
            style={[styles.amount, !isExpense && isIncome ? { color: theme.income } : null]}
            numberOfLines={1}
          />

          {showActions ? (
            <View style={styles.actions}>
              <Pressable
                onPress={() => onEdit?.(transaction)}
                style={({ pressed }) => [
                  styles.editButton,
                  {
                    backgroundColor: theme.primary,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <Pencil size={16} color={theme.onPrimary} />
              </Pressable>
              <Pressable
                onPress={() => onDelete?.(transaction.id)}
                style={({ pressed }) => [
                  styles.deleteButton,
                  {
                    backgroundColor: theme.destructive,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <Trash2 size={18} color={theme.onPrimary} />
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  )
}

const getTransactionVisuals = (transaction: TransactionListItem, theme: SemanticColors) => {
  const normalized = `${transaction.category} ${transaction.description}`.toLowerCase()

  if (normalized.includes('shopping') || normalized.includes('compra')) {
    return {
      icon: 'shopping-bag' as IconKey,
      color: theme.pending,
    }
  }

  if (normalized.includes('salary') || normalized.includes('salario')) {
    return {
      icon: 'circle-dollar' as IconKey,
      color: theme.income,
    }
  }

  if (normalized.includes('vacation') || normalized.includes('viagem')) {
    return {
      icon: 'luggage' as IconKey,
      color: theme.destructive,
    }
  }

  return {
    icon: 'receipt' as IconKey,
    color: theme.primary,
  }
}

const applyAlpha = (hexColor: string, alpha: number) => {
  if (!hexColor.startsWith('#') || hexColor.length !== 7) return hexColor
  const value = Math.round(Math.min(Math.max(alpha, 0), 1) * 255)
  const suffix = value.toString(16).padStart(2, '0')
  return `${hexColor}${suffix}`
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    alignSelf: 'stretch',
    paddingVertical: 12,
    paddingHorizontal: 0,
    alignItems: 'stretch',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: '100%',
  },
  leftContent: {
    flex: 1,
    minWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  details: {
    flex: 1,
    gap: 4,
    minWidth: 0,
    alignItems: 'flex-start',
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    flexShrink: 0,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 14,
    fontWeight: '700',
    flexShrink: 0,
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardPressed: {
    opacity: 0.9,
  },
})
