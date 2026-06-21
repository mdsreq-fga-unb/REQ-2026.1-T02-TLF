import { Model } from '@nozbe/watermelondb'
import { date, field, readonly } from '@nozbe/watermelondb/decorators'

export const notificationTypes = {
  BUDGET_WARNING: 'BUDGET_WARNING',
  BUDGET_EXCEEDED: 'BUDGET_EXCEEDED',
  RECURRENCE_DUE_WARNING: 'RECURRENCE_DUE_WARNING',
  RECURRENCE_DUE: 'RECURRENCE_DUE',
  INVOICE_CLOSING_WARNING: 'INVOICE_CLOSING_WARNING',
  INVOICE_CLOSING: 'INVOICE_CLOSING',
  INVOICE_DUE_WARNING: 'INVOICE_DUE_WARNING',
  INVOICE_DUE: 'INVOICE_DUE',
  INVOICE_OVERDUE: 'INVOICE_OVERDUE',
  INVOICE_PAID: 'INVOICE_PAID',
  INVOICE_PARTIALLY_PAID: 'INVOICE_PARTIALLY_PAID',
} as const

export type NotificationType = keyof typeof notificationTypes

export class Notification extends Model {
  static table = 'notifications'

  @field('type') type!: NotificationType
  @field('title') title!: string
  @field('description') description!: string
  @field('is_read') isRead!: boolean
  @field('primary_action_label') primaryActionLabel!: string | null
  @field('primary_action') primaryAction!: string | null
  @field('secondary_action_label') secondaryActionLabel!: string | null
  @field('secondary_action') secondaryAction!: string | null
  @field('icon') icon!: string
  @field('color') color!: string
  @field('reference_id') referenceId!: string
  @field('reference_type') referenceType!: string
  @readonly @date('created_at') createdAt!: Date
  @readonly @date('updated_at') updatedAt!: Date
}
