import { Model, Q } from '@nozbe/watermelondb'
import { date, field, lazy, readonly, text } from '@nozbe/watermelondb/decorators'
import type { Account } from './account'
import type { Recurrence } from './recurrece'
import type { Transaction } from './transaction'

export class Institution extends Model {
  static table = 'institutions'

  static associations = {
    accounts: { type: 'has_many' as const, foreignKey: 'institution_id' },
    recurrences: { type: 'has_many' as const, foreignKey: 'institution_id' },
    transactions: { type: 'has_many' as const, foreignKey: 'institution_id' },
    transfer_destinations: { type: 'has_many' as const, foreignKey: 'destination_institution_id' },
  }

  @text('name') name!: string
  @field('color') color!: string
  @field('icon') icon!: string | null
  @field('logo_url') logoUrl!: string | null
  @field('user_id') userId!: string | null
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @lazy
  accounts = this.collections.get<Account>('accounts').query(Q.where('institution_id', this.id))

  @lazy
  recurrences = this.collections
    .get<Recurrence>('recurrences')
    .query(Q.where('institution_id', this.id))

  @lazy
  transactions = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('institution_id', this.id))

  @lazy
  transferDestinations = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('destination_institution_id', this.id))
}
