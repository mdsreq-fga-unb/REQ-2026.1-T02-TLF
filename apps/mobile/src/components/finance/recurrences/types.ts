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
  accountId: string
  categoryId: string
  subcategoryId?: string
  startDate: string
  duration: RecurrenceDuration
  isActive: boolean
}
