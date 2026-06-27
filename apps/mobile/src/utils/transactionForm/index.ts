import type { SemanticColors } from '@/utils/colors'
import { TransactionType } from '@/services/database/models/transaction'

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

export function getTransactionAmountColor(type: TransactionType, colors: SemanticColors): string {
  switch (type) {
    case 'EXPENSE':
      return colors.expense
    case 'INCOME':
      return colors.income
    case 'TRANSFER':
      return colors.foreground
  }
}
