import { Model, Relation } from '@nozbe/watermelondb'
import { date, field, immutableRelation, readonly } from '@nozbe/watermelondb/decorators'
import type { Category } from './category'

export class Budget extends Model {
  static table = 'budgets'

  static associations = {
    categories: { type: 'belongs_to' as const, key: 'category_id' },
  }

  @field('category_id') categoryId!: string
  @field('name') name!: string
  @field('amount_limit') amountLimit!: number
  @field('month') month!: number
  @field('year') year!: number
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date

  @immutableRelation('categories', 'category_id') category!: Relation<Category>
}
