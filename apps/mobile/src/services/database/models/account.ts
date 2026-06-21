import { Model, Q, Relation } from '@nozbe/watermelondb'
import { date, field, immutableRelation, lazy, readonly } from '@nozbe/watermelondb/decorators'
import type { Institution } from './institution'
import type { Invoice } from './invoice'
import type { Recurrence } from './recurrece'

export const accountTypes = {
  CHECKING: 'CHECKING',
  SAVINGS: 'SAVINGS',
  CREDIT_CARD: 'CREDIT_CARD',
  CASH: 'CASH',
} as const
export type AccountType = keyof typeof accountTypes

export const currencies = {
  BRL: 'BRL',
} as const
export type Currency = keyof typeof currencies

export class Account extends Model {
  static table = 'accounts'

  static associations = {
    institutions: { type: 'belongs_to' as const, key: 'institution_id' },
    invoices: { type: 'has_many' as const, foreignKey: 'account_id' },
    recurrences: { type: 'has_many' as const, foreignKey: 'account_id' },
  }

  @field('institution_id') institutionId!: string
  @field('name') name!: string
  @field('type') type!: AccountType
  @field('balance') balance!: number
  @field('closing_day') closingDay!: number | null
  @field('due_day') dueDay!: number | null
  @field('credit_limit') creditLimit!: number | null
  @field('currency') currency!: Currency
  @field('is_active') isActive!: boolean
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('institutions', 'institution_id') institution!: Relation<Institution>

  @lazy
  invoices = this.collections.get<Invoice>('invoices').query(Q.where('account_id', this.id))

  @lazy
  recurrences = this.collections
    .get<Recurrence>('recurrences')
    .query(Q.where('account_id', this.id))
}
