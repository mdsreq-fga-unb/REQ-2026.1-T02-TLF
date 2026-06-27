import type { Recurrence } from '@/components/finance/recurrences/types'
import type { IconKey } from '@/utils/icons'

export function useConfirmCard(recurrence: Recurrence, isConfirmed: boolean, isSkipped: boolean) {
  const icon: IconKey = recurrence.categoryIcon ?? 'refresh-cw'
  const iconBg = recurrence.categoryColor ?? '#4A5060'
  const accountName = recurrence.institutionName ?? recurrence.institutionId
  const subcategoryName = recurrence.subcategoryName ?? recurrence.categoryName
  const isExpense = recurrence.type === 'EXPENSE'
  const amountSign = isExpense ? '−' : '+'
  const acted = isConfirmed || isSkipped

  return { icon, iconBg, accountName, subcategoryName, isExpense, amountSign, acted }
}
