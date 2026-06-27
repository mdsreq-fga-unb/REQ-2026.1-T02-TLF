import { notificationTypes, NotificationType } from '@/services/database/models/notification'

export type NotificationSeverity = 'info' | 'warning' | 'error' | 'success'

const SUCCESS_TYPES = new Set<NotificationType>([
  notificationTypes.INVOICE_PAID,
  notificationTypes.INVOICE_PARTIALLY_PAID,
])

const ERROR_TYPES = new Set<NotificationType>([
  notificationTypes.BUDGET_EXCEEDED,
  notificationTypes.INVOICE_OVERDUE,
  notificationTypes.INVOICE_DUE,
])

const WARNING_TYPES = new Set<NotificationType>([
  notificationTypes.BUDGET_WARNING,
  notificationTypes.INVOICE_DUE_WARNING,
  notificationTypes.INVOICE_CLOSING_WARNING,
  notificationTypes.INVOICE_CLOSING,
  notificationTypes.RECURRENCE_DUE_WARNING,
  notificationTypes.RECURRENCE_DUE,
])

export function getNotificationSeverity(type: NotificationType): NotificationSeverity {
  if (SUCCESS_TYPES.has(type)) return 'success'
  if (ERROR_TYPES.has(type)) return 'error'
  if (WARNING_TYPES.has(type)) return 'warning'
  return 'info'
}
