import type { SemanticColors } from '@/utils/colors'
import type { TransactionType } from '@/services/database/queries/transaction'
import type { BudgetType } from 'types/types'

export * from './constants'
export * from './data'
export * from './parsers'

export function getTransactionTypeColor(type: TransactionType, colors: SemanticColors): string {
  switch (type) {
    case 'EXPENSE':
      return colors.expense
    case 'INCOME':
      return colors.income
    case 'TRANSFER':
      return colors.primary
  }
}

export function getTransactionAmountColor(
  type: TransactionType | BudgetType,
  colors: SemanticColors,
): string {
  switch (type) {
    case 'EXPENSE':
      return colors.expense
    case 'INCOME':
      return colors.income
    case 'TRANSFER':
      return colors.foreground
    default:
      // BUDGET | GOAL: cor neutra
      return colors.foreground
  }
}
