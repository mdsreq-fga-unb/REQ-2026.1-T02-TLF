import type { IconKey } from '@/utils/icons'

export type RecurrenceType = 'EXPENSE' | 'INCOME'
export type RecurrenceFrequency = 'MONTHLY' | 'WEEKLY' | 'YEARLY'
export type RecurrenceDuration = 'INDEFINITE' | number

export type Recurrence = {
  id: string
  description: string
  amount: number
  type: RecurrenceType
  frequency: RecurrenceFrequency
  dueDay: number
  institutionId: string
  categoryId: string
  subcategoryId?: string
  startDate: string
  endDate?: string
  duration: RecurrenceDuration
  isActive: boolean
  // Campos de exibição resolvidos a partir das relações da API.
  institutionName?: string
  categoryName?: string
  subcategoryName?: string
  categoryIcon?: IconKey
  categoryColor?: string
}
