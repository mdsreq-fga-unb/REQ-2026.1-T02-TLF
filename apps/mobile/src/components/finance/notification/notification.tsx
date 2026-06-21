import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { component, iconSize, spacing } from '@/utils/dimensions'
import { Pressable, StyleSheet, View } from 'react-native'
import { AlertCircle, CheckCircle2, Info, XCircle } from 'lucide-react-native'
import type { SemanticColors } from '@/utils/colors'
import { withObservables } from '@nozbe/watermelondb/react'
import { Notification as NotificationModel } from '@/services/database/models/notification'
import { getNotificationSeverity, NotificationSeverity } from '@/utils/notification'
import { formatNotificationDate } from '@/utils/date'

type NotificationItemProps = {
  notification: NotificationModel
  onPress?: (id: string) => void
}

function NotificationItemView({ notification, onPress }: NotificationItemProps) {
  const colors = useThemeColor()
  const severity = getNotificationSeverity(notification.type)

  return (
    <Pressable
      onPress={() => onPress?.(notification.id)}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: notification.isRead ? colors.background : colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.iconSlot}>{getSeverityIcon(severity, colors)}</View>
        {!notification.isRead && (
          <View style={[styles.unreadBadge, { backgroundColor: colors.primary }]} />
        )}
      </View>

      <View style={styles.content}>
        <ThemedText text={notification.title} variant="label" tone="default" style={styles.title} />
        <ThemedText
          text={notification.description}
          variant="caption"
          tone="muted"
          style={styles.description}
        />
        <ThemedText
          text={formatNotificationDate(notification.createdAt)}
          variant="caption"
          tone="muted"
          style={styles.date}
        />
      </View>
    </Pressable>
  )
}

export const NotificationItem = withObservables(['notification'], ({ notification }) => ({
  notification,
}))(NotificationItemView)

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: component.cardRadius,
    padding: component.cardPadding,
    gap: spacing.sm,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconSlot: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  unreadBadge: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  content: {
    alignItems: 'flex-start',
    gap: spacing.xxs,
  },
  title: {
    textAlign: 'right',
    fontWeight: '700',
  },
  description: {
    textAlign: 'left',
  },
  date: {
    textAlign: 'center',
  },
})

const getSeverityIcon = (severity: NotificationSeverity, colors: SemanticColors) => {
  const size = iconSize.md

  switch (severity) {
    case 'success':
      return <CheckCircle2 size={size} color={colors.success} />
    case 'warning':
      return <AlertCircle size={size} color={colors.warning} />
    case 'error':
      return <XCircle size={size} color={colors.destructive} />
    default:
      return <Info size={size} color={colors.primary} />
  }
}
