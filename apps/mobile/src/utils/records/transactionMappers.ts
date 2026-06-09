import type { TransactionListItem } from 'types/types'
import type { TransactionApiItem } from '@/services/api/transactions'
import type { Transaction } from '@/services/database/models/transaction'

export function mapLocalTransactionToListItem(transaction: Transaction): TransactionListItem {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.categoryId || 'Sem categoria',
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
  }
}

export function mapApiTransactionToListItem(transaction: TransactionApiItem): TransactionListItem {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.category ?? transaction.categoryId ?? 'Sem categoria',
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount,
  }
}
