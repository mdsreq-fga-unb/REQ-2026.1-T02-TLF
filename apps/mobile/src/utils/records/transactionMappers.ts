import type { TransactionListItem } from '@/components/finance/records/types'
import type { TransactionApiItem } from '@/services/api/transactions/transactions.types'
import type { Category } from '@/services/database/models/category'
import type { Transaction } from '@/services/database/models/transaction'

export type CategoryLookup = Map<string, Pick<Category, 'id' | 'name'>>

export function mapLocalTransactionToListItem(
  transaction: Transaction,
  categoryLookup?: CategoryLookup,
): TransactionListItem {
  const category = transaction.categoryId ? categoryLookup?.get(transaction.categoryId) : undefined

  return {
    id: transaction.id,
    description: transaction.description,
    category: category?.name ?? 'Sem categoria',
    categoryId: transaction.categoryId ?? '',
    subcategoryId: transaction.subcategoryId || undefined,
    institutionId: transaction.institutionId,
    destinationInstitutionId: transaction.destinationInstitutionId || undefined,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount / 100,
  }
}

export function mapApiTransactionToListItem(transaction: TransactionApiItem): TransactionListItem {
  return {
    id: transaction.id,
    description: transaction.description,
    category: transaction.category?.name ?? 'Sem categoria',
    categoryId: transaction.category?.id ?? '',
    subcategory: transaction.subCategory?.name ?? undefined,
    subcategoryId: transaction.subCategory?.id ?? undefined,
    institutionId: transaction.institution?.id ?? '',
    destinationInstitutionId: transaction.destinationInstitutionId ?? undefined,
    type: transaction.type,
    date: transaction.date,
    amount: transaction.amount / 100,
  }
}
