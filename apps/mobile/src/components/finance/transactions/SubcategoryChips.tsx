import { useEffect, type ComponentProps } from 'react'
import { Pressable, ScrollView, StyleSheet, View } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { CATEGORIES, CHIP_ACCENT, type TransactionType } from './types'

const OUTLINE = '#908fa0'
const OUTLINE_VARIANT_50 = '#46455480'

const SPRING_SELECT = { damping: 18, stiffness: 280 } as const
const SPRING_PRESS = { damping: 22, stiffness: 420 } as const

type Sub = { id: string; label: string; icon: string }
type IconName = ComponentProps<typeof MaterialIcons>['name']

function ChipItem({ sub, active, onPress }: { sub: Sub; active: boolean; onPress: () => void }) {
  const progress = useSharedValue(active ? 1 : 0)
  const scale = useSharedValue(1)

  useEffect(() => {
    progress.value = withSpring(active ? 1 : 0, SPRING_SELECT)
  }, [active, progress])

  const chipStyle = useAnimatedStyle(() => ({
    borderColor: interpolateColor(progress.value, [0, 1], [OUTLINE_VARIANT_50, CHIP_ACCENT]),
    transform: [{ scale: scale.value }],
  }))

  const bgStyle = useAnimatedStyle(() => ({
    opacity: progress.value * 0.18,
  }))

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [OUTLINE, CHIP_ACCENT]),
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
        {/* green tinted background */}
        <Animated.View style={[StyleSheet.absoluteFill, styles.chipBg, bgStyle]} />

        {/* icon: inactive and active layers crossfade */}
        <View style={styles.iconWrap}>
          <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, inactiveIconStyle]}>
            <MaterialIcons name={sub.icon as IconName} size={14} color={OUTLINE} />
          </Animated.View>
          <Animated.View style={[StyleSheet.absoluteFill, styles.iconCenter, activeIconStyle]}>
            <MaterialIcons name={sub.icon as IconName} size={14} color={CHIP_ACCENT} />
          </Animated.View>
        </View>

        <Animated.Text style={[styles.chipLabel, textStyle]}>{sub.label}</Animated.Text>
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
  const category = CATEGORIES[type].find((c) => c.id === categoryId)
  const subcategories = category?.subcategories ?? []

  if (subcategories.length === 0) return null

  return (
    <View style={styles.wrapper}>
      <Animated.Text style={styles.label}>SUBCATEGORIA</Animated.Text>
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
    borderBottomColor: '#46455428',
    gap: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: OUTLINE,
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
    backgroundColor: CHIP_ACCENT,
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
