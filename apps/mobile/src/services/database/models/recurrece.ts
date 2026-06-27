import { Model, Q, Relation } from '@nozbe/watermelondb'
import {
  date,
  field,
  immutableRelation,
  lazy,
  readonly,
  relation,
} from '@nozbe/watermelondb/decorators'
import type { Category } from './category'
import type { Institution } from './institution'
import type { SubCategory } from './subCategory'
import type { Transaction } from './transaction'

export class Recurrence extends Model {
  static table = 'recurrences'

  static associations = {
    institutions: { type: 'belongs_to' as const, key: 'institution_id' },
    categories: { type: 'belongs_to' as const, key: 'category_id' },
    sub_categories: { type: 'belongs_to' as const, key: 'sub_category_id' },
    transactions: { type: 'has_many' as const, foreignKey: 'recurrence_id' },
  }

  @field('institution_id') institutionId!: string
  @field('category_id') categoryId!: string | null
  @field('sub_category_id') subCategoryId!: string | null
  @field('description') description!: string
  @field('amount') amount!: number
  @field('is_active') isActive!: boolean
  @field('charge_date') chargeDate!: number
  @date('start_date') startDate!: Date
  @date('end_date') endDate!: Date | null
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('institutions', 'institution_id') institution!: Relation<Institution>
  @relation('categories', 'category_id') category!: Relation<Category>
  @relation('sub_categories', 'sub_category_id') subCategory!: Relation<SubCategory>

  @lazy
  transactions = this.collections
    .get<Transaction>('transactions')
    .query(Q.where('recurrence_id', this.id))
}
