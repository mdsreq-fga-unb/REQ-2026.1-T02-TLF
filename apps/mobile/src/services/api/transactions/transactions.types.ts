export type TransactionType = 'EXPENSE' | 'INCOME' | 'TRANSFER'

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED'

export type TransactionApiItem = {
  id: string

  amount: number
  description: string

  date: string

  type: TransactionType
  status: TransactionStatus

  institution?: {
    id: string
    name: string
  }

  category?: {
    id: string
    name: string
  }
  subCategory?: {
    id: string
    name: string
  }

  destinationInstitutionId?: string | null

  installmentRef?: string | null
  installmentNumber?: number | null
  installmentTotal?: number | null

  receiptUrl?: string | null
  externalId?: string | null

  createdAt?: string
  updatedAt?: string
}

export type CreateTransactionPayload = {
  id?: string
  institutionId: string
  categoryId: string
  subCategoryId?: string

  type: TransactionType
  amount: number // centavos

  description?: string
  date?: string
  status?: TransactionStatus

  invoiceId?: string
  recurrenceId?: string
  destinationInstitutionId?: string
  installmentNumber?: number
  installmentTotal?: number
}

export type TransactionUpdatePayload = Partial<CreateTransactionPayload>

export type TransactionFilters = {
  category?: string
  type?: TransactionType
}
