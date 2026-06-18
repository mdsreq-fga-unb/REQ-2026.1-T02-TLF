import { Model, Q, Relation } from '@nozbe/watermelondb'
import { date, field, immutableRelation, lazy, readonly } from '@nozbe/watermelondb/decorators'
import type { Account } from './account'
import type { Transaction } from './transaction'

export const invoiceStatuses = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
} as const
export type InvoiceStatus = keyof typeof invoiceStatuses

export const invoicePaymentStatuses = {
  NOT_PAID: 'NOT_PAID',
  PARTIALLY_PAID: 'PARTIALLY_PAID',
  PAID: 'PAID',
} as const
export type InvoicePaymentStatus = keyof typeof invoicePaymentStatuses

export class Invoice extends Model {
  static table = 'invoices'

  static associations = {
    accounts: { type: 'belongs_to' as const, key: 'account_id' },
    transactions: { type: 'has_many' as const, foreignKey: 'invoice_id' },
  }

  @field('account_id') accountId!: string
  @field('status') status!: InvoiceStatus
  @field('payment_status') paymentStatus!: InvoicePaymentStatus
  @field('reference_month') referenceMonth!: number
  @field('reference_year') referenceYear!: number
  @field('total_amount') totalAmount!: number
  @field('paid_amount') paidAmount!: number
  @field('closing_day') closingDay!: number
  @field('due_day') dueDay!: number
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('accounts', 'account_id') account!: Relation<Account>

  @lazy
  transactions = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('invoice_id', this.id))
}
