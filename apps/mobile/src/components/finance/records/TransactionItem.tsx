import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import type { TransactionListItem } from './types'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

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
  const amountColor = isExpense
    ? theme.warning
    : isIncome
      ? (theme.success ?? '#2CB67D')
      : theme.text
  const amountSign = isExpense ? '-' : isIncome ? '+' : ''
  const amountText = `${amountSign}${formatCurrency(Math.abs(transaction.amount))}`
  const visuals = getTransactionVisuals(transaction)
  const iconBackground = applyAlpha(visuals.color, 0.2)
  const cardLine = { borderBottomColor: applyAlpha(theme.graySecondary, 0.18) }

  return (
    <Pressable
      onPress={() => {
        setShowActions((prev) => !prev)
        onPress?.(transaction)
      }}
      style={({ pressed }) => [styles.card, cardLine, pressed ? styles.cardPressed : null]}
    >
      <View style={styles.row}>
        <View style={styles.iconBlock}>
          <View style={[styles.iconWrap, { backgroundColor: iconBackground }]}>
            <MaterialIcons name={visuals.icon} size={18} color={visuals.color} />
          </View>
        </View>

        <View style={styles.details}>
          <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
            {transaction.description}
          </Text>
          <Text style={[styles.subtitle, { color: theme.graySecondary }]} numberOfLines={1}>
            {transaction.category}
          </Text>
        </View>

        <View style={styles.rightColumn}>
          <Text style={[styles.amount, { color: amountColor }]}>{amountText}</Text>

          {showActions ? (
            <View style={styles.actions}>
              <Pressable
                onPress={() => onEdit?.(transaction)}
                style={({ pressed }) => [
                  styles.editButton,
                  {
                    backgroundColor: theme.bluePrimary,
                    opacity: pressed ? 0.85 : 1,
                  },
                ]}
              >
                <MaterialIcons name="edit" size={16} color="#ffffff" />
              </Pressable>
              <Pressable
                onPress={() => onDelete?.(transaction.id)}
                style={({ pressed }) => [
                  styles.deleteButton,
                  {
                    backgroundColor: theme.warning,
                    opacity: pressed ? 0.8 : 1,
                  },
                ]}
              >
                <MaterialIcons name="delete" size={18} color="#ffffff" />
              </Pressable>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  )
}

const getTransactionVisuals = (transaction: TransactionListItem) => {
  const normalized = `${transaction.category} ${transaction.description}`.toLowerCase()

  if (normalized.includes('shopping') || normalized.includes('compra')) {
    return {
      icon: 'shopping-bag' as MaterialIconName,
      color: '#F5C542',
    }
  }

  if (normalized.includes('salary') || normalized.includes('salario')) {
    return {
      icon: 'paid' as MaterialIconName,
      color: '#2CB67D',
    }
  }

  if (normalized.includes('vacation') || normalized.includes('viagem')) {
    return {
      icon: 'card-travel' as MaterialIconName,
      color: '#F2994A',
    }
  }

  return {
    icon: 'receipt-long' as MaterialIconName,
    color: '#6A66FF',
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
  },
  description: {
    fontSize: 15,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 12,
  },
  amountColumn: {
    alignItems: 'flex-end',
    gap: 0,
  },
  rightColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginLeft: 'auto',
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
