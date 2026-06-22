import { Model, Q, Relation } from '@nozbe/watermelondb'
import { date, field, immutableRelation, lazy, readonly } from '@nozbe/watermelondb/decorators'
import type { Category } from './category'
import type { Recurrence } from './recurrece'
import type { Transaction } from './transaction'

export class SubCategory extends Model {
  static table = 'sub_categories'

  static associations = {
    categories: { type: 'belongs_to' as const, key: 'category_id' },
    recurrences: { type: 'has_many' as const, foreignKey: 'sub_category_id' },
    transactions: { type: 'has_many' as const, foreignKey: 'subcategory_id' },
  }

  @field('category_id') categoryId!: string
  @field('name') name!: string
  @field('icon') icon!: string
  @field('color') color!: string
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('categories', 'category_id') category!: Relation<Category>

  @lazy
  recurrences = this.collections
    .get<Recurrence>('recurrences')
    .query(Q.where('sub_category_id', this.id))

  @lazy
  transactions = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('subcategory_id', this.id))
}
