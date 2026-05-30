import { useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import {
  categoryColors,
  categoryIcons,
  getAccount,
  getCategory,
  mockPaymentHistory,
} from '@/components/finance/recurrences/recurrences-data'
import { setPendingDeleteId } from '@/components/finance/recurrences/recurrences-store'
import type { Recurrence } from '@/components/finance/recurrences/types'
import type { IconKey } from '@/utils/icons'

const MONTHS_SHORT = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
]
export const MONTHS_FULL = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

export function useRecorrenciaDetails() {
  const params = useLocalSearchParams<{
    id: string
    description: string
    amount: string
    type: string
    frequency: string
    dueDay: string
    accountId: string
    categoryId: string
    subcategoryId?: string
    startDate: string
    isActive: string
  }>()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const id = params.id ?? ''
  const description = params.description ?? ''
  const amount = parseFloat(params.amount ?? '0')
  const type = params.type ?? 'EXPENSE'
  const frequency = params.frequency ?? 'MONTHLY'
  const dueDay = parseInt(params.dueDay ?? '1')
  const accountId = params.accountId ?? ''
  const categoryId = params.categoryId ?? ''
  const subcategoryId = params.subcategoryId ?? ''
  const startDate = params.startDate ?? ''
  const isActive = params.isActive === '1'

  const isExpense = type === 'EXPENSE'
  const accountName = getAccount(accountId)?.name ?? accountId
  const categoryName = getCategory(categoryId)?.name ?? categoryId
  const frequencyLabel =
    frequency === 'MONTHLY' ? 'Mensal' : frequency === 'WEEKLY' ? 'Semanal' : 'Anual'
  const typeLabel = `${categoryName} ${frequencyLabel}`

  const icon: IconKey = categoryIcons[categoryId] ?? 'tag'
  const iconColor = categoryColors[categoryId] ?? '#4A5060'

  const history = mockPaymentHistory[id] ?? []
  const annualProjection = amount * 12

  const now = new Date()
  let nextMonth = now.getMonth()
  if (now.getDate() > dueDay) {
    nextMonth = (nextMonth + 1) % 12
  }
  const nextBillingLabel = `${dueDay} ${MONTHS_SHORT[nextMonth]}`

  const [intPart, decPart] = amount.toFixed(2).split('.')
  const intFormatted = parseInt(intPart).toLocaleString('pt-BR')

  const recurrenceForModal: Recurrence = {
    id,
    description,
    amount,
    type: type as Recurrence['type'],
    frequency: frequency as Recurrence['frequency'],
    dueDay,
    accountId,
    categoryId,
    subcategoryId: subcategoryId || undefined,
    startDate,
    duration: 'INDEFINITE',
    isActive,
  }

  const handleEdit = () => {
    router.push({
      pathname: '/recorrencia/nova',
      params: {
        id,
        description,
        amount: params.amount,
        type,
        frequency,
        dueDay: params.dueDay,
        accountId,
        categoryId,
        subcategoryId: subcategoryId ?? '',
        startDate,
        isActive: params.isActive,
      },
    })
  }

  const handleDeleteConfirm = () => {
    setPendingDeleteId(id)
    setShowDeleteModal(false)
    router.back()
  }

  return {
    id,
    description,
    amount,
    dueDay,
    isActive,
    isExpense,
    accountName,
    frequencyLabel,
    typeLabel,
    icon,
    iconColor,
    history,
    annualProjection,
    nextBillingLabel,
    intFormatted,
    decPart,
    recurrenceForModal,
    showDeleteModal,
    setShowDeleteModal,
    handleEdit,
    handleDeleteConfirm,
  }
}
