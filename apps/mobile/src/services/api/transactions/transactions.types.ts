export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER'

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

export type TransactionApiItem = {
  id: string

  amount: number
  description: string

  date: string

  type: TransactionType
  status: TransactionStatus

  accountId: string

  categoryId: string
  category?: {
    id: string
    name: string
  }
  subcategoryId?: string | null
  subCategory?: {
    id: string
    name: string
  }

  invoiceId?: string | null
  recurrenceId?: string | null

  destinationAccountId?: string | null

  installmentRef?: string | null
  installmentNumber?: number | null
  installmentTotal?: number | null

  receiptUrl?: string | null
  externalId?: string | null

  createdAt?: string
  updatedAt?: string
}

export type TransactionUpdatePayload = Partial<CreateTransactionPayload>

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