import { Model, Q } from '@nozbe/watermelondb'
import { date, field, lazy, readonly } from '@nozbe/watermelondb/decorators'
import type { Account } from './account'

export class Institution extends Model {
  static table = 'institutions'

  static associations = {
    accounts: { type: 'has_many' as const, foreignKey: 'institution_id' },
  }

  @field('name') name!: string
  @field('color') color!: string
  @field('logo_url') logoUrl!: string | null
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @lazy
  accounts = this.collections.get<Account>('accounts').query(Q.where('institution_id', this.id))
}
