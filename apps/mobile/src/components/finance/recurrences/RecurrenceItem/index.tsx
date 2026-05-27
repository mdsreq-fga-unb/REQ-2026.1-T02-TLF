import { Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useRecurrenceItem } from '@/hooks/useRecurrenceItem'
import { formatCurrency } from '@/utils/formatters'
import { styles } from './style'
import type { Recurrence } from '../types'

type Props = {
  recurrence: Recurrence
  onToggleActive?: (id: string, isActive: boolean) => void
}

export function RecurrenceItem({ recurrence }: Props) {
  const theme = useThemeColor()
  const {
    icon,
    iconColor,
    accountName,
    subcategoryName,
    categoryName,
    isExpense,
    amountSign,
    handlePress,
  } = useRecurrenceItem(recurrence)

  const amountColor = isExpense ? theme.expense : theme.income

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: recurrence.isActive ? (pressed ? 0.85 : 1) : 0.5,
        },
      ]}
    >
      <View style={[styles.dayBadge, { backgroundColor: theme.surfaceMuted }]}>
        <ThemedText tone="primary" style={styles.dayText} text={String(recurrence.dueDay)} />
      </View>

      <View style={[styles.iconCircle, { backgroundColor: `${iconColor}2E` }]}>
        <MaterialIcons name={icon} size={18} color={iconColor} />
      </View>

      <View style={styles.content}>
        <ThemedText style={styles.description} text={recurrence.description} numberOfLines={1} />
        <View style={styles.metaRow}>
          <ThemedText
            tone="muted"
            style={styles.subtitle}
            text={`${accountName} · ${subcategoryName ?? categoryName}`}
            numberOfLines={1}
          />
          <Text style={[styles.amount, { color: amountColor }]} numberOfLines={1}>
            {amountSign} {formatCurrency(recurrence.amount)}
          </Text>
        </View>
      </View>
    </Pressable>
  )
}
