import type { TransactionListItem } from '@/components/finance/records/types'
import type { TransactionApiItem } from '@/services/api/transactions'
import type { Transaction } from '@/services/database/models/transaction'

export function mapLocalTransactionToListItem(transaction: Transaction): TransactionListItem {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.categoryId || 'Sem categoria',
    categoryId: transaction.categoryId,
    subcategoryId: transaction.subcategoryId || undefined,
    accountId: transaction.accountId,
    destinationAccountId: transaction.destinationAccountId || undefined,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount / 100,
  }
}

export function mapApiTransactionToListItem(transaction: TransactionApiItem): TransactionListItem {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.category?.name ?? transaction.categoryId ?? 'Sem categoria',
    categoryId: transaction.category?.id ?? transaction.categoryId,
    subcategory: transaction.subCategory?.name ?? transaction.subcategoryId ?? undefined,
    subcategoryId: transaction.subCategory?.id ?? transaction.subcategoryId ?? undefined,
    accountId: transaction.account?.id ?? transaction.accountId,
    destinationAccountId: transaction.destinationAccountId ?? undefined,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount / 100,
  }
}
