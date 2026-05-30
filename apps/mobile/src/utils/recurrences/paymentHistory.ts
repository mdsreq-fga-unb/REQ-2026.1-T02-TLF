import type { PaymentHistoryEntry } from '@/components/finance/recurrences/recurrences-data'
import { MONTHS_FULL } from './dates'
import type { IconKey } from '@/utils/icons'
import type { SemanticColors } from '@/utils/colors'

export type PaymentHistoryEntryDisplay = {
  monthLabel: string
  metaText: string
  statusLabel: string
  statusIcon: IconKey
  dotColor: string
  statusBg: string
  displayAmount: number
  isPending: boolean
}

export function getPaymentHistoryEntryDisplay(
  entry: PaymentHistoryEntry,
  dueDay: number,
  amount: number,
  colors: SemanticColors,
): PaymentHistoryEntryDisplay {
  const isPending = entry.status === 'PENDING'
  const isConfirmed = entry.status === 'CONFIRMED'

  const dotColor = isPending ? colors.pending : isConfirmed ? colors.income : colors.mutedForeground
  const statusIcon: IconKey = isPending ? 'clock' : isConfirmed ? 'circle-check' : 'skip-forward'
  const statusLabel = isPending ? 'PENDENTE' : isConfirmed ? 'LIQUIDADO' : 'IGNORADO'
  const statusBg = isPending
    ? `${colors.pending}28`
    : isConfirmed
      ? `${colors.income}28`
      : colors.surfaceMuted
  const monthLabel = MONTHS_FULL[entry.month - 1]
  const metaText = isPending
    ? `Vence dia ${dueDay}`
    : isConfirmed
      ? `Confirmado em ${entry.date}`
      : `Pulado em ${entry.date}`
  const displayAmount = isConfirmed ? (entry.amount ?? amount) : amount

  return {
    monthLabel,
    metaText,
    statusLabel,
    statusIcon,
    dotColor,
    statusBg,
    displayAmount,
    isPending,
  }
}
