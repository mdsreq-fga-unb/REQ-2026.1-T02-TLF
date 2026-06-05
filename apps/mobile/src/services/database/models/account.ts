import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators'

export type AccountType = 'CHECKING' | 'SAVINGS' | 'CREDIT_CARD' | 'CASH'

export class Account extends Model {
  static table = 'accounts'

  @text('name') name!: string
  @field('type') type!: AccountType
  @field('balance') balance!: number
  @field('currency') currency!: string
  @field('institution_id') institutionId!: string
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
