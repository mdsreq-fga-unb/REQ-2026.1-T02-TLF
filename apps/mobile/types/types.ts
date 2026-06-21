// alterar para interface depois

export type SummaryData = {
  balance: number
  income: number
  expense: number
}

export type CategoryData = {
  name: string
  icon?: string
  color: string
  amount: number
}

export type TransactionListItem = {
  id: string
  description: string
  category: string
  type: 'EXPENSE' | 'INCOME' | 'TRANSFER'
  date: Date | number | string
  amount: number
}

export type InstitutionListItem = {
  id: string
  name: string
  color: string
  icon?: string
  iconColor?: string
  logoUrl?: string | null
  /** Nº de contas vinculadas. Quando > 0, a exclusão é bloqueada. */
  accountsCount?: number
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
