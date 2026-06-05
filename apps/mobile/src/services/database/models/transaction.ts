import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators'

export class Transaction extends Model {
  static table = 'transactions'

  @field('amount') amount!: number
  @text('description') description!: string
  @date('date') date!: Date
  @field('type') type!: 'EXPENSE' | 'INCOME' | 'TRANSFER'
  @field('status') status!: 'PENDING' | 'CONFIRMED'
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
}
