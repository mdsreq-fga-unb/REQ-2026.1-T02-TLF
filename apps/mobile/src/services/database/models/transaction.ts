import { Model, Relation } from '@nozbe/watermelondb'
import {
  date,
  field,
  immutableRelation,
  readonly,
  relation,
  text,
} from '@nozbe/watermelondb/decorators'
import type { Account } from './account'
import type { Category } from './category'
import type { Invoice } from './invoice'
import type { Recurrence } from './recurrece'
import type { SubCategory } from './subCategory'

export const transactionTypes = {
  EXPENSE: 'EXPENSE',
  INCOME: 'INCOME',
  TRANSFER: 'TRANSFER',
} as const
export type TransactionType = keyof typeof transactionTypes

export const transactionStatuses = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
} as const
export type TransactionStatus = keyof typeof transactionStatuses

export class Transaction extends Model {
  static table = 'transactions'

  static associations = {
    accounts: { type: 'belongs_to' as const, key: 'account_id' },
    destination_accounts: { type: 'belongs_to' as const, key: 'destination_account_id' },
    categories: { type: 'belongs_to' as const, key: 'category_id' },
    sub_categories: { type: 'belongs_to' as const, key: 'subcategory_id' },
    invoices: { type: 'belongs_to' as const, key: 'invoice_id' },
    recurrences: { type: 'belongs_to' as const, key: 'recurrence_id' },
  }

  @field('amount') amount!: number
  @text('description') description!: string
  @date('date') date!: Date
  @field('type') type!: TransactionType
  @field('status') status!: TransactionStatus
  @field('account_id') accountId!: string
  @field('category_id') categoryId!: string | null
  @field('subcategory_id') subcategoryId!: string | null
  @field('invoice_id') invoiceId!: string | null
  @field('recurrence_id') recurrenceId!: string | null
  @field('destination_account_id') destinationAccountId!: string | null
  @field('installment_ref') installmentRef!: string | null
  @field('installment_number') installmentNumber!: number | null
  @field('installment_total') installmentTotal!: number | null
  @field('receipt_url') receiptUrl!: string | null
  @field('external_id') externalId!: string | null
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('accounts', 'account_id') account!: Relation<Account>
  @relation('accounts', 'destination_account_id') destinationAccount!: Relation<Account>
  @relation('categories', 'category_id') category!: Relation<Category>
  @relation('sub_categories', 'subcategory_id') subCategory!: Relation<SubCategory>
  @relation('invoices', 'invoice_id') invoice!: Relation<Invoice>
  @relation('recurrences', 'recurrence_id') recurrence!: Relation<Recurrence>
}
