import { Q } from '@nozbe/watermelondb'
import { database } from '..'
import { Notification, NotificationType } from '../models/notification'

const NOTIFICATIONS_TABLE = 'notifications'

const notificationsCollection = () => database.get<Notification>(NOTIFICATIONS_TABLE)

export type NotificationInput = {
  type: NotificationType
  title: string
  description: string
  isRead?: boolean
  primaryActionLabel?: string | null
  primaryAction?: string | null
  secondaryActionLabel?: string | null
  secondaryAction?: string | null
  icon: string
  color: string
  referenceId: string
  referenceType: string
}

export type NotificationUpdateInput = Partial<NotificationInput>

export type NotificationFilters = {
  type?: NotificationType
  isRead?: boolean
}

export type NotificationFilter = 'all' | 'unread' | 'read'

const applyNotificationFields = (
  notification: Notification,
  input: NotificationInput | NotificationUpdateInput,
) => {
  if (input.type !== undefined) notification.type = input.type
  if (input.title !== undefined) notification.title = input.title
  if (input.description !== undefined) notification.description = input.description
  if (input.isRead !== undefined) notification.isRead = input.isRead
  if (input.primaryActionLabel !== undefined) {
    notification.primaryActionLabel = input.primaryActionLabel
  }
  if (input.primaryAction !== undefined) notification.primaryAction = input.primaryAction
  if (input.secondaryActionLabel !== undefined) {
    notification.secondaryActionLabel = input.secondaryActionLabel
  }
  if (input.secondaryAction !== undefined) notification.secondaryAction = input.secondaryAction
  if (input.icon !== undefined) notification.icon = input.icon
  if (input.color !== undefined) notification.color = input.color
  if (input.referenceId !== undefined) notification.referenceId = input.referenceId
  if (input.referenceType !== undefined) notification.referenceType = input.referenceType
}

export const createNotification = async (input: NotificationInput) => {
  return database.write(async () => {
    return notificationsCollection().create((notification) => {
      applyNotificationFields(notification, { isRead: false, ...input })
    })
  })
}

export const getNotificationById = async (id: string) => {
  return notificationsCollection().find(id)
}

export const getNotificationQueryConditions = (filter: NotificationFilter) => {
  if (filter === 'unread') {
    return [Q.where('is_read', false), Q.sortBy('created_at', 'desc')]
  }

  if (filter === 'read') {
    return [Q.where('is_read', true), Q.sortBy('created_at', 'desc')]
  }

  return [Q.sortBy('is_read', 'asc'), Q.sortBy('created_at', 'desc')]
}

export const getNotificationsByFilters = async (filters: NotificationFilters) => {
  const conditions = []

  if (filters.type) conditions.push(Q.where('type', filters.type))
  if (filters.isRead !== undefined) conditions.push(Q.where('is_read', filters.isRead))

  return notificationsCollection()
    .query(...conditions)
    .fetch()
}

export const updateNotification = async (id: string, input: NotificationUpdateInput) => {
  return database.write(async () => {
    const notification = await getNotificationById(id)
    return notification.update((record) => {
      applyNotificationFields(record, input)
    })
  })
}

export const markNotificationAsDeleted = async (id: string) => {
  return database.write(async () => {
    const notification = await getNotificationById(id)
    return notification.markAsDeleted()
  })
}

export const getAllNotifications = async () => {
  return notificationsCollection().query(Q.sortBy('created_at', 'desc')).fetch()
}

export const markNotificationAsRead = async (id: string) => {
  await updateNotification(id, { isRead: true })
}

export const markAllNotificationsAsRead = async () => {
  const unread = await getNotificationsByFilters({ isRead: false })

  if (unread.length === 0) return

  await database.write(async () => {
    await Promise.all(
      unread.map((notification) =>
        notification.update((record) => {
          record.isRead = true
        }),
      ),
    )
  })
}

export const notificationQueries = {
  table: NOTIFICATIONS_TABLE,
  create: createNotification,
  getById: getNotificationById,
  update: updateNotification,
  markAsDeleted: markNotificationAsDeleted,
  getAll: getAllNotifications,
  getByFilters: getNotificationsByFilters,
}
