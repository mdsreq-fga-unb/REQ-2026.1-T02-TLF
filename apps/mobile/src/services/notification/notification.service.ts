import { NotificationInput, notificationQueries } from '../database/repository/notification'
import { requestPermissions } from './permission'
import * as Notifications from 'expo-notifications'

export async function triggerNotification(input: NotificationInput) {
  const existingNotification = await notificationQueries.getByFilters({
    type: input.type,
    isRead: false,
    referenceId: input.referenceId,
  })

  if (existingNotification.length > 0) return

  const newNotification = await notificationQueries.create(input)

  const hasPermission = await requestPermissions()

  if (hasPermission) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: input.title,
        body: input.description,
        data: {
          primaryAction: input.primaryAction,
          secondaryAction: input.secondaryAction,
        },
      },
      trigger: null,
      identifier: newNotification.id,
    })
  }
}
