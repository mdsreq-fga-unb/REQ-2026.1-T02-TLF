import {
  categoryColors,
  categoryIcons,
  getAccount,
  getCategory,
  getSubcategory,
} from '@/components/finance/recurrences/recurrences-data'
import type { Recurrence } from '@/components/finance/recurrences/types'
import type { IconKey } from '@/utils/icons'

export function useConfirmCard(recurrence: Recurrence, isConfirmed: boolean, isSkipped: boolean) {
  const icon: IconKey = categoryIcons[recurrence.categoryId] ?? 'refresh-cw'
  const iconBg = categoryColors[recurrence.categoryId] ?? '#4A5060'
  const accountName = getAccount(recurrence.accountId)?.name ?? recurrence.accountId
  const subcategoryName = recurrence.subcategoryId
    ? getSubcategory(recurrence.subcategoryId)?.name
    : getCategory(recurrence.categoryId)?.name
  const isExpense = recurrence.type === 'EXPENSE'
  const amountSign = isExpense ? '−' : '+'
  const acted = isConfirmed || isSkipped

  return { icon, iconBg, accountName, subcategoryName, isExpense, amountSign, acted }
}
