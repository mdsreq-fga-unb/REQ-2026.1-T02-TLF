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

export type CreateTransactionPayload = {
  accountId: string
  categoryId: string
  subCategoryId?: string

  type: TransactionType
  amount: number // centavos

  description?: string
  date?: string
  status?: TransactionStatus

  invoiceId?: string
  recurrenceId?: string
  destinationAccountId?: string
  installmentNumber?: number
  installmentTotal?: number
}