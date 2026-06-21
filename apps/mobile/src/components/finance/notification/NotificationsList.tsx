import { NotificationItem } from '@/components/finance/notification/notification'
import { NotificationsEmpty } from '@/components/finance/notification/NotificationsEmpty'
import { ThemedBackground } from '@/components/ui/ThemedBackground'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { Notification as NotificationModel } from '@/services/database/models/notification'
import {
  getNotificationQueryConditions,
  NotificationFilter,
} from '@/services/database/repository/notification'
import { database } from '@/services/database'
import { component, spacing } from '@/utils/dimensions'
import { Q } from '@nozbe/watermelondb'
import { withObservables } from '@nozbe/watermelondb/react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'

const FILTERS: { key: NotificationFilter; label: string }[] = [
  { key: 'unread', label: 'Não lidas' },
  { key: 'read', label: 'Lidas' },
  { key: 'all', label: 'Todas' },
]

type NotificationsListProps = {
  filter: NotificationFilter
  notifications: NotificationModel[]
  unreadCount: number
  onFilterChange: (filter: NotificationFilter) => void
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

function NotificationsListView({
  filter,
  onFilterChange,
  onMarkAsRead,
  onMarkAllAsRead,
  notifications,
  unreadCount,
}: NotificationsListProps) {
  const colors = useThemeColor()

  return (
    <ThemedBackground style={styles.screen}>
      {unreadCount > 0 && (
        <Pressable onPress={onMarkAllAsRead} style={styles.markAllButton}>
          <ThemedText text="Marcar todas como lidas" variant="caption" tone="link" />
        </Pressable>
      )}

      <View style={styles.filterRow}>
        {FILTERS.map((item) => {
          const isActive = filter === item.key

          return (
            <Pressable
              key={item.key}
              onPress={() => onFilterChange(item.key)}
              style={[
                styles.filterTab,
                {
                  backgroundColor: isActive ? colors.primary : colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <ThemedText
                text={item.label}
                variant="caption"
                tone={isActive ? 'onPrimary' : 'muted'}
              />
            </Pressable>
          )
        })}
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<NotificationsEmpty />}
        renderItem={({ item }) => <NotificationItem notification={item} onPress={onMarkAsRead} />}
      />
    </ThemedBackground>
  )
}

export const NotificationsList = withObservables(['filter'], ({ filter }) => {
  const collection = database.get<NotificationModel>('notifications')

  return {
    notifications: collection.query(...getNotificationQueryConditions(filter)),
    unreadCount: collection.query(Q.where('is_read', false)).observeCount(),
  }
})(NotificationsListView)

const styles = StyleSheet.create({
  screen: {
    alignItems: 'stretch',
    paddingHorizontal: component.screenGutter,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
  markAllButton: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.xxs,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    borderRadius: component.buttonRadius,
    borderWidth: 1,
  },
  listContent: {
    flexGrow: 1,
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
})
