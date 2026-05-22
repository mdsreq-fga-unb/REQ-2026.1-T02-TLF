export type SummaryData = {
  balance: number
  income: number
  expense: number
}

export type CategoryData = {
  name: string
  amount: number
  color: string
}

export type TransactionListItem = {
  id: string
  description: string
  category: string
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER'
  date: Date | number | string
  amount: number
}

export type BudgetData = {
  id: string
  name: string
  category: string
  amountLimit: number
  month: number
  year: number
  createdAt: string
}
