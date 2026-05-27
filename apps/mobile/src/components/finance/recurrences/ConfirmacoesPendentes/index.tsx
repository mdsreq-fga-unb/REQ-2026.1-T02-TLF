import { Animated, Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { useConfirmacoesPendentes } from '@/hooks/useConfirmacoesPendentes'
import { ConfirmCard } from '../ConfirmCard'
import { styles } from './style'
import type { Recurrence } from '../types'

type Props = {
  recurrences: Recurrence[]
  confirmedIds: string[]
  skippedIds: string[]
  onConfirm: (id: string) => void
  onSkip: (id: string) => void
  onUndo: (id: string) => void
}

export function ConfirmacoesPendentes({
  recurrences,
  confirmedIds,
  skippedIds,
  onConfirm,
  onSkip,
  onUndo,
}: Props) {
  const theme = useThemeColor()
  const {
    collapsed,
    currentMonth,
    due,
    confirmedCount,
    progress,
    allDone,
    toggleCollapse,
    chevronRotate,
  } = useConfirmacoesPendentes(recurrences, confirmedIds, skippedIds)

  return (
    <View style={[styles.container, { display: due.length === 0 ? 'none' : 'flex' }]}>
      <Pressable
        onPress={toggleCollapse}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.75 : 1 }]}
      >
        <View style={styles.headerLeft}>
          <MaterialIcons name="event-available" size={15} color={theme.success} />
          <Text style={[styles.sectionTitle, { color: theme.success }]}>CONFIRMAÇÕES DO MÊS</Text>
        </View>

        <View style={styles.headerRight}>
          <ThemedText
            tone="muted"
            style={styles.progressLabel}
            text={`${confirmedCount}/${due.length} · ${currentMonth}`}
          />
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <MaterialIcons name="keyboard-arrow-down" size={18} color={theme.mutedForeground} />
          </Animated.View>
        </View>
      </Pressable>

      <View style={[styles.progressTrack, { backgroundColor: theme.surfaceMuted }]}>
        <View style={[styles.progressFill, { flex: progress, backgroundColor: theme.success }]} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <View style={{ display: collapsed ? 'none' : 'flex' }}>
        {due.map((r) => (
          <ConfirmCard
            key={r.id}
            recurrence={r}
            isConfirmed={confirmedIds.includes(r.id)}
            isSkipped={skippedIds.includes(r.id)}
            onConfirm={onConfirm}
            onSkip={onSkip}
            onUndo={onUndo}
          />
        ))}

        <View
          style={[
            styles.allDoneBanner,
            { backgroundColor: `${theme.success}18`, borderColor: `${theme.success}44` },
            { display: allDone ? 'flex' : 'none' },
          ]}
        >
          <MaterialIcons name="check-circle" size={16} color={theme.success} />
          <Text style={[styles.allDoneText, { color: theme.success }]}>
            Todas as cobranças de {currentMonth} foram tratadas.
          </Text>
        </View>
      </View>
    </View>
  )
}
