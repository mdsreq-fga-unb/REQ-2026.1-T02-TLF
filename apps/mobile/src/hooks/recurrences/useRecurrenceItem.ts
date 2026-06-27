import { router } from 'expo-router'
import type { Recurrence } from '@/components/finance/recurrences/types'
import type { IconKey } from '@/utils/icons'

export function useRecurrenceItem(recurrence: Recurrence) {
  const icon: IconKey = recurrence.categoryIcon ?? 'tag'
  const iconColor = recurrence.categoryColor ?? '#4A5060'
  const accountName = recurrence.institutionName ?? recurrence.institutionId
  const subcategoryName = recurrence.subcategoryName
  const categoryName = recurrence.categoryName ?? recurrence.categoryId
  const isExpense = recurrence.type === 'EXPENSE'
  const amountSign = isExpense ? '−' : '+'

  const handlePress = () => {
    router.push({
      pathname: '/recorrencia/[id]',
      params: { id: recurrence.id },
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
