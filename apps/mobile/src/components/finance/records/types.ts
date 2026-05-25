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
