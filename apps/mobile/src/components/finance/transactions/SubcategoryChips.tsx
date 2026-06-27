import { useEffect } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { AppIcon } from '@/components/ui/AppIcon'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { CATEGORIES } from '@/utils/transactionForm'
import type { TransactionType } from './types'

const SPRING_SELECT = { damping: 18, stiffness: 280 } as const
const SPRING_PRESS = { damping: 22, stiffness: 420 } as const

type Sub = { id: string; label: string; icon: string }

function ChipItem({
  sub,
  active,
  onPress,
  borderIdle,
  borderActive,
  iconIdle,
  iconActive,
  chipBg,
}: {
  sub: Sub
  active: boolean
  onPress: () => void
  borderIdle: string
  borderActive: string
  iconIdle: string
  iconActive: string
  chipBg: string
}) {
  const progress = useSharedValue(active ? 1 : 0)
  const scale = useSharedValue(1)

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, SPRING_SELECT)
  }, [active, progress])

  const chipStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(progress.value, [0, 1], [borderIdle, borderActive]),
    transform: [{ scale: scale.value }],
  }))

  const bgStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.18,
  }))

  const activeIconStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
  }))

  const inactiveIconStyle = useAnimatedStyle(() => ({
    opacity: 1 - progress.value,
  }))

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.92, SPRING_PRESS)
      }}
      onPressOut={() => {
        scale.value = withSpring(1, SPRING_PRESS)
      }}
    >
      <Animated.View style={[styles.chip, chipStyle]}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.chipBg, bgStyle, { backgroundColor: chipBg }]}
        />

        <View style={styles.iconWrap}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, inactiveIconStyle]}>
            <AppIcon name={sub.icon} size={14} color={iconIdle} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, activeIconStyle]}>
            <AppIcon name={sub.icon} size={14} color={iconActive} />
          </Animated.View>
        </View>

        <ThemedText
          text={sub.label}
          variant="label"
          tone={active ? 'primary' : 'muted'}
          style={styles.chipLabel}
        />
      </Animated.View>
    </Pressable>
  )
}

type Props = {
  type: TransactionType
  categoryId: string
  selectedId: string
  onSelect: (id: string) => void
}

export function SubcategoryChips({ type, categoryId, selectedId, onSelect }: Props) {
  const theme = useThemeColor()
  const category = CATEGORIES[type].find((c) => c.id === categoryId)
  const subcategories = category?.subcategories ?? []

  if (subcategories.length === 0) return null

  return (
    <View style={[styles.wrapper, { borderBottomColor: `${theme.border}28` }]}>
      <ThemedText text="SUBCATEGORIA" variant="caption" tone="muted" style={styles.label} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        decelerationRate="fast"
      >
        {subcategories.map((sub) => (
          <ChipItem
            key={sub.id}
            sub={sub}
            active={sub.id === selectedId}
            onPress={() => onSelect(sub.id === selectedId ? '' : sub.id)}
            borderIdle={`${theme.border}80`}
            borderActive={theme.success}
            iconIdle={theme.mutedForeground}
            iconActive={theme.success}
            chipBg={theme.success}
          />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  scroll: {
    gap: 8,
    paddingRight: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 13,
    paddingVertical: 7,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  chipBg: {
    borderRadius: 12,
  },
  iconWrap: {
    width: 14,
    height: 14,
  },
  iconCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipLabel: {
    fontSize: 13,
    fontWeight: '500',
  },
})
