import { Model } from '@nozbe/watermelondb'
import { field, date, readonly, text } from '@nozbe/watermelondb/decorators'

export class Institution extends Model {
  static table = 'institutions'

  @text('name') name!: string
  @field('color') color!: string
  @field('icon') icon!: string | null
  @field('logo_url') logoUrl!: string | null
  @field('user_id') userId!: string | null
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
