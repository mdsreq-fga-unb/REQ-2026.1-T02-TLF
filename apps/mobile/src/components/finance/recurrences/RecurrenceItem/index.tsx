import { Pressable, Text, View } from 'react-native'
import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import {
  categoryColors,
  categoryIcons,
  getAccount,
  getCategory,
  getSubcategory,
} from '../recurrences-data'
import { styles } from './style'
import type { ComponentProps } from 'react'
import type { Recurrence } from '../types'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

const INCOME_COLOR = '#2CB67D'
const EXPENSE_COLOR = '#FF4B4B'

type Props = {
  recurrence: Recurrence
  onToggleActive?: (id: string, isActive: boolean) => void
}

export function RecurrenceItem({ recurrence }: Props) {
  const theme = useThemeColor()

  const icon = (categoryIcons[recurrence.categoryId] ?? 'category') as MaterialIconName
  const iconColor = categoryColors[recurrence.categoryId] ?? '#4A5060'
  const accountName = getAccount(recurrence.accountId)?.name ?? recurrence.accountId
  const subcategoryName = recurrence.subcategoryId
    ? getSubcategory(recurrence.subcategoryId)?.name
    : undefined
  const categoryName = getCategory(recurrence.categoryId)?.name ?? recurrence.categoryId
  const isExpense = recurrence.type === 'EXPENSE'
  const amountColor = isExpense ? EXPENSE_COLOR : INCOME_COLOR
  const amountSign = isExpense ? '−' : '+'

  const handlePress = () => {
    router.push({
      pathname: '/recorrencia/[id]',
      params: {
        id: recurrence.id,
        description: recurrence.description,
        amount: recurrence.amount.toString(),
        type: recurrence.type,
        frequency: recurrence.frequency,
        dueDay: recurrence.dueDay.toString(),
        accountId: recurrence.accountId,
        categoryId: recurrence.categoryId,
        subcategoryId: recurrence.subcategoryId ?? '',
        startDate: recurrence.startDate,
        isActive: recurrence.isActive ? '1' : '0',
      },
    })
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: recurrence.isActive ? (pressed ? 0.85 : 1) : 0.5,
        },
      ]}
    >
      <View style={[styles.dayBadge, { backgroundColor: theme.surfaceMuted }]}>
        <Text style={[styles.dayText, { color: theme.primary }]}>{recurrence.dueDay}</Text>
      </View>

      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}2E` }]}>
        <MaterialIcons name={icon} size={18} color={iconColor} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.description, { color: theme.foreground }]} numberOfLines={1}>
          {recurrence.description}
        </Text>
        <View style={styles.metaRow}>
          <Text style={[styles.subtitle, { color: theme.mutedForeground }]} numberOfLines={1}>
            {accountName} · {subcategoryName ?? categoryName}
          </Text>
          <Text style={[styles.amount, { color: amountColor }]} numberOfLines={1}>
            {amountSign} {formatCurrency(recurrence.amount)}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
