import { NotificationsList } from '@/components/finance/notification/NotificationsList'
import { useNotificationsScreen } from '@/hooks/notifications/useNotificationsScreen'

export default function NotificationsScreen() {
  const { filter, setFilter, markAsRead, markAllAsRead } = useNotificationsScreen()

  return (
    <NotificationsList
      filter={filter}
      onFilterChange={setFilter}
      onMarkAsRead={markAsRead}
      onMarkAllAsRead={markAllAsRead}
    />
  )
}
