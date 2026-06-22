import { useCallback, useState } from 'react'
import {
  markAllNotificationsAsRead,
  markNotificationAsRead,
  NotificationFilter,
} from '@/services/database/repository/notification'

export function useNotificationsScreen(initialFilter: NotificationFilter = 'unread') {
  const [filter, setFilter] = useState<NotificationFilter>(initialFilter)

  const markAsRead = useCallback((id: string) => {
    void markNotificationAsRead(id)
  }, [])

  const markAllAsRead = useCallback(() => {
    void markAllNotificationsAsRead()
  }, [])

  return {
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
  }
}
