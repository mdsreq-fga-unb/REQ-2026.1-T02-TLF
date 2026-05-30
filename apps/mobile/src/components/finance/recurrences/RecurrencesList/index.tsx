import { View } from 'react-native'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { RecurrenceItem } from '../RecurrenceItem'
import { styles } from './style'
import type { Recurrence } from '../types'

type Props = {
  recurrences: Recurrence[]
  onToggleActive?: (id: string, isActive: boolean) => void
}

export function RecurrencesList({ recurrences, onToggleActive }: Props) {
  const theme = useThemeColor()

  if (recurrences.length === 0) {
    return (
      <View style={styles.empty}>
        <AppIcon name="refresh-cw-off" size={52} color={theme.border} />
        <ThemedText style={styles.emptyTitle} text="Nenhuma recorrência ainda" />
        <ThemedText
          tone="muted"
          style={styles.emptySubtitle}
          text="Organize seus pagamentos fixos e nunca mais esqueça de um vencimento."
        />
      </View>
    )
  }

  const active = recurrences.filter((r) => r.isActive).sort((a, b) => a.dueDay - b.dueDay)
  const inactive = recurrences.filter((r) => !r.isActive)

  return (
    <View style={styles.list}>
      <View style={{ display: active.length > 0 ? 'flex' : 'none' }}>
        <ThemedText tone="muted" style={styles.sectionTitle} text="ATIVAS POR VENCIMENTO" />
        <View style={styles.group}>
          {active.map((recurrence) => (
            <RecurrenceItem
              key={`active-${recurrence.id}`}
              recurrence={recurrence}
              onToggleActive={onToggleActive}
            />
          ))}
        </View>
      </View>

      <View style={{ display: inactive.length > 0 ? 'flex' : 'none' }}>
        <ThemedText
          tone="muted"
          style={[styles.sectionTitle, { marginTop: active.length > 0 ? 12 : 0 }]}
          text="INATIVAS"
        />
        <View style={styles.group}>
          {inactive.map((recurrence) => (
            <RecurrenceItem
              key={`inactive-${recurrence.id}`}
              recurrence={recurrence}
              onToggleActive={onToggleActive}
            />
          ))}
        </View>
      </View>
    </View>
  )
}
