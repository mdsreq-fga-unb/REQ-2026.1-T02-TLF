import { Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
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
        <MaterialIcons name="sync-disabled" size={52} color={theme.border} />
        <Text style={[styles.emptyTitle, { color: theme.foreground }]}>
          Nenhuma recorrência ainda
        </Text>
        <Text style={[styles.emptySubtitle, { color: theme.mutedForeground }]}>
          Organize seus pagamentos fixos e nunca mais esqueça de um vencimento.
        </Text>
      </View>
    )
  }

  const active = recurrences.filter((r) => r.isActive).sort((a, b) => a.dueDay - b.dueDay)
  const inactive = recurrences.filter((r) => !r.isActive)

  return (
    <View style={styles.list}>
      <View style={{ display: active.length > 0 ? 'flex' : 'none' }}>
        <Text style={styles.sectionTitle}>ATIVAS POR VENCIMENTO</Text>
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
        <Text
          style={[
            styles.sectionTitle,
            { color: theme.mutedForeground, marginTop: active.length > 0 ? 12 : 0 },
          ]}
        >
          INATIVAS
        </Text>
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
