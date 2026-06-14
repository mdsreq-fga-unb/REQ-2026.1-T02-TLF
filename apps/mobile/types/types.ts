// alterar para interface depois

export type SummaryData = {
  balance: number
  income: number
  expense: number
}

export type CategoryData = {
  name: string
  icon: string
  color: string
}

export type TransactionListItem = {
  id: string
  description: string
  category: string
  categoryId: string
  subcategory?: string
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER'
  date: Date | number | string
  amount: number
}

export type BudgetType = 'BUDGET' | 'GOAL'

export type BudgetData = {
  id?: string
  name: string
  categoryId?: string
  amountLimit: number
  month: number
  year: number
}

export type BudgetListItem = {
  id: string
  name: string
  categoryId: string
  amountLimit: number
  month: number
  year: number
  totalValue?: number
  spentValue?: number
}
