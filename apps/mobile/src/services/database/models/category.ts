import { Model, Q } from '@nozbe/watermelondb'
import { date, field, lazy, readonly } from '@nozbe/watermelondb/decorators'
import type { SubCategory } from './subCategory'
import type { Budget } from './budget'
import type { Recurrence } from './recurrece'
import type { Transaction } from './transaction'

export class Category extends Model {
  static table = 'categories'

  static associations = {
    sub_categories: { type: 'has_many' as const, foreignKey: 'category_id' },
    budgets: { type: 'has_many' as const, foreignKey: 'category_id' },
    recurrences: { type: 'has_many' as const, foreignKey: 'category_id' },
    transactions: { type: 'has_many' as const, foreignKey: 'category_id' },
  }

  @field('name') name!: string
  @field('icon') icon!: string
  @field('color') color!: string
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @lazy
  subCategories = this.collections
    .get<SubCategory>('sub_categories')
    .query(Q.where('category_id', this.id))

  @lazy
  budgets = this.collections.get<Budget>('budgets').query(Q.where('category_id', this.id))

  @lazy
  recurrences = this.collections
    .get<Recurrence>('recurrences')
    .query(Q.where('category_id', this.id))

  @lazy
  transactions = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('category_id', this.id))
}
