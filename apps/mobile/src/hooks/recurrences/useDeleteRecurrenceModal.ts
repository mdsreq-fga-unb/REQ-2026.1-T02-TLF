import { useState } from 'react'
import { formatCurrency } from '@/utils/formatters'
import type { Recurrence } from '@/components/finance/recurrences/types'

export type DeleteScope = 'keep' | 'remove'

export function useDeleteRecurrenceModal(recurrence: Recurrence | null) {
  const [scope, setScope] = useState<DeleteScope>('keep')
  const amountLabel = recurrence ? formatCurrency(recurrence.amount) : ''

  return { scope, setScope, amountLabel }
}
