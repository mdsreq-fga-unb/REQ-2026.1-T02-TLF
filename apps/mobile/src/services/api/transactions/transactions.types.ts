export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER'

export type TransactionStatus = 'PENDING' | 'CONFIRMED'

export type TransactionApiItem = {
  id: string
  amount: number
  description: string
  date: string | number
  type: TransactionType
  status?: TransactionStatus
  categoryId?: string
  category?: string
}

export type TransactionUpdatePayload = Partial<{
  amount: number
  description: string
  date: string | number
  type: TransactionType
  status: TransactionStatus
  categoryId: string
}>

export type TransactionFilters = {
  category?: string
  type?: TransactionType
}