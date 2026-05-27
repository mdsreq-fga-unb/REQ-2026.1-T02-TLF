import { useMemo, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { formatCurrency } from '@/utils/formatters'
import {
  categoryColors,
  categoryIcons,
  getAccount,
  getSubcategory,
  getCategory,
} from '../recurrences-data'
import { styles } from './style'
import type { ComponentProps } from 'react'
import type { Recurrence } from '../types'

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name']

const GREEN = '#00E383'
const RED = '#FF4B4B'

const MONTHS_PT = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

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
  const [collapsed, setCollapsed] = useState(false)
  const rotation = useRef(new Animated.Value(0)).current

  const now = new Date()
  const currentDay = now.getDate()
  const currentMonth = MONTHS_PT[now.getMonth()]

  const due = recurrences.filter((r) => r.isActive && r.dueDay <= currentDay)

  const confirmedCount = due.filter((r) => confirmedIds.includes(r.id)).length
  const actedCount = confirmedCount + skippedIds.filter((id) => due.find((r) => r.id === id)).length
  const progress = due.length > 0 ? confirmedCount / due.length : 0
  const allDone = due.length > 0 && actedCount === due.length

  const toggleCollapse = () => {
    const toValue = collapsed ? 0 : 1
    Animated.timing(rotation, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start()
    setCollapsed((prev) => !prev)
  }

  const chevronRotate = useMemo(
    () =>
      rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '-180deg'],
      }),
    [rotation],
  )

  return (
    <View style={[styles.container, { display: due.length === 0 ? 'none' : 'flex' }]}>
      <Pressable
        onPress={toggleCollapse}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.75 : 1 }]}
      >
        <View style={styles.headerLeft}>
          <MaterialIcons name="event-available" size={15} color={GREEN} />
          <Text style={styles.sectionTitle}>CONFIRMAÇÕES DO MÊS</Text>
        </View>

        <View style={styles.headerRight}>
          <Text style={[styles.progressLabel, { color: theme.mutedForeground }]}>
            {confirmedCount}/{due.length} · {currentMonth}
          </Text>
          <Animated.View style={{ transform: [{ rotate: chevronRotate }] }}>
            <MaterialIcons name="keyboard-arrow-down" size={18} color={theme.mutedForeground} />
          </Animated.View>
        </View>
      </Pressable>

      <View style={[styles.progressTrack, { backgroundColor: theme.surfaceMuted }]}>
        <View style={[styles.progressFill, { flex: progress }]} />
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
            theme={theme}
          />
        ))}

        <View
          style={[
            styles.allDoneBanner,
            { backgroundColor: `${GREEN}18`, borderColor: `${GREEN}44` },
            { display: allDone ? 'flex' : 'none' },
          ]}
        >
          <MaterialIcons name="check-circle" size={16} color={GREEN} />
          <Text style={[styles.allDoneText, { color: GREEN }]}>
            Todas as cobranças de {currentMonth} foram tratadas.
          </Text>
        </View>
      </View>
    </View>
  )
}

type CardProps = {
  recurrence: Recurrence
  isConfirmed: boolean
  isSkipped: boolean
  onConfirm: (id: string) => void
  onSkip: (id: string) => void
  onUndo: (id: string) => void
  theme: ReturnType<typeof useThemeColor>
}

function ConfirmCard({
  recurrence: r,
  isConfirmed,
  isSkipped,
  onConfirm,
  onSkip,
  onUndo,
  theme,
}: CardProps) {
  const icon = (categoryIcons[r.categoryId] ?? 'sync') as MaterialIconName
  const iconBg = categoryColors[r.categoryId] ?? '#4A5060'
  const accountName = getAccount(r.accountId)?.name ?? r.accountId
  const subcategoryName = r.subcategoryId
    ? getSubcategory(r.subcategoryId)?.name
    : getCategory(r.categoryId)?.name
  const isExpense = r.type === 'EXPENSE'
  const amountColor = isExpense ? RED : GREEN
  const amountSign = isExpense ? '−' : '+'
  const acted = isConfirmed || isSkipped

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }, acted && styles.cardActed]}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>
        <MaterialIcons name={icon} size={20} color="#fff" />
      </View>

      <View style={styles.cardBody}>
        <View style={styles.cardTopRow}>
          <Text style={[styles.cardName, { color: theme.foreground }]} numberOfLines={1}>
            {r.description}
          </Text>
          <View style={[styles.badge, { display: isConfirmed ? 'flex' : 'none' }]}>
            <MaterialIcons name="check-circle" size={13} color={GREEN} />
            <Text style={[styles.badgeText, { color: GREEN }]}>Confirmado</Text>
          </View>
          <View style={[styles.badge, { display: isSkipped ? 'flex' : 'none' }]}>
            <MaterialIcons name="skip-next" size={13} color={theme.mutedForeground} />
            <Text style={[styles.badgeText, { color: theme.mutedForeground }]}>Pulado</Text>
          </View>
        </View>

        <Text style={[styles.cardMeta, { color: theme.mutedForeground }]}>
          {accountName} · {subcategoryName} · Dia {r.dueDay}
        </Text>

        <View style={styles.cardBottomRow}>
          <Text style={[styles.cardAmount, { color: amountColor }]}>
            {amountSign} {formatCurrency(r.amount)}
          </Text>

          <View style={[styles.btnGroup, { display: acted ? 'none' : 'flex' }]}>
            <Pressable
              onPress={() => onSkip(r.id)}
              style={({ pressed }) => [
                styles.btn,
                styles.btnSkip,
                { borderColor: theme.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <Text style={[styles.btnSkipText, { color: theme.mutedForeground }]}>Pular</Text>
            </Pressable>

            <Pressable
              onPress={() => onConfirm(r.id)}
              style={({ pressed }) => [
                styles.btn,
                styles.btnConfirm,
                { opacity: pressed ? 0.8 : 1 },
              ]}
            >
              <MaterialIcons name="check" size={13} color="#0F0F13" />
              <Text style={styles.btnConfirmText}>Confirmar</Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => onUndo(r.id)}
            style={({ pressed }) => [
              styles.btn,
              styles.btnUndo,
              {
                borderColor: theme.border,
                opacity: pressed ? 0.7 : 1,
                display: acted ? 'flex' : 'none',
              },
            ]}
          >
            <MaterialIcons name="undo" size={13} color={theme.mutedForeground} />
            <Text style={[styles.btnUndoText, { color: theme.mutedForeground }]}>Desfazer</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
