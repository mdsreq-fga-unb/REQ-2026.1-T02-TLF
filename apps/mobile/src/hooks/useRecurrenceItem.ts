import { router } from 'expo-router'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import type { ComponentProps } from 'react'
import {
  categoryColors,
  categoryIcons,
  getAccount,
  getCategory,
  getSubcategory,
} from '@/components/finance/recurrences/recurrences-data'
import type { Recurrence } from '@/components/finance/recurrences/types'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

export function useRecurrenceItem(recurrence: Recurrence) {
  const icon = (categoryIcons[recurrence.categoryId] ?? 'category') as MaterialIconName
  const iconColor = categoryColors[recurrence.categoryId] ?? '#4A5060'
  const accountName = getAccount(recurrence.accountId)?.name ?? recurrence.accountId
  const subcategoryName = recurrence.subcategoryId
    ? getSubcategory(recurrence.subcategoryId)?.name
    : undefined
  const categoryName = getCategory(recurrence.categoryId)?.name ?? recurrence.categoryId
  const isExpense = recurrence.type === 'EXPENSE'
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

  return {
    icon,
    iconColor,
    accountName,
    subcategoryName,
    categoryName,
    isExpense,
    amountSign,
    handlePress,
  }
}
