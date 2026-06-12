import { useEffect } from 'react'
import { Modal, Pressable, StyleSheet, View } from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import { runOnJS } from 'react-native-worklets'
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import { Delete } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { formatCurrency } from '@/utils/formatters'
import { useThemeColor } from '@/hooks/useThemeColor'
import {
  getTransactionAmountColor,
  getTransactionTypeColor,
  TYPE_SIGN,
} from '@/utils/transactionForm'
import type { TransactionType } from './types'
const VELOCITY_THRESHOLD = 1000
const DISMISS_RATIO = 0.3

type Props = {
  visible: boolean
  amountCents: number
  type: TransactionType
  onKeyPress: (key: string) => void
  onSave: () => void
  asOverlay?: boolean
}

const KEYPAD_ROWS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['.', '0', 'del'],
] as const

export function NumericKeypad({
  visible,
  amountCents,
  type,
  onKeyPress,
  onSave,
  asOverlay = false,
}: Props) {
  const theme = useThemeColor()
  const amountColor = getTransactionAmountColor(type, theme)
  const buttonColor = getTransactionTypeColor(type, theme)
  const amount = amountCents / 100
  const sign = TYPE_SIGN[type]

  const translateY = useSharedValue(0)
  const dragProgress = useSharedValue(0)
  const sheetHeight = useSharedValue(0)

  // Reset position when modal opens so there's no flash from previous dismiss
  useEffect(() => {
    if (visible) {
      translateY.value = 0
      dragProgress.value = 0
    }
  }, [visible])

  const handlePan = Gesture.Pan()
    .activeOffsetY(4)
    .onBegin(() => {
      dragProgress.value = withSpring(1, { damping: 15, stiffness: 300 })
    })
    .onChange((e) => {
      if (e.translationY > 0) {
        translateY.value = e.translationY
      }
    })
    .onEnd((e) => {
      dragProgress.value = withSpring(0, { damping: 15, stiffness: 300 })
      const threshold = sheetHeight.value * DISMISS_RATIO
      if (e.translationY > threshold || e.velocityY > VELOCITY_THRESHOLD) {
        // Slide sheet out, then close — do NOT reset translateY here to avoid flash
        translateY.value = withTiming(sheetHeight.value + 100, { duration: 250 }, () => {
          runOnJS(onSave)()
        })
      } else {
        translateY.value = withSpring(0, { damping: 20, stiffness: 250 })
      }
    })

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [0, sheetHeight.value || 500],
      [1, 0.3],
      Extrapolation.CLAMP,
    ),
  }))

  const handleBarStyle = useAnimatedStyle(() => ({
    opacity: interpolate(dragProgress.value, [0, 1], [0.25, 0.85]),
    width: interpolate(dragProgress.value, [0, 1], [40, 52]),
  }))

  const sheet = (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, styles.backdropOverlay, backdropStyle]} />
      <Animated.View
        style={[styles.sheet, { backgroundColor: theme.background }, sheetStyle]}
        onLayout={(e) => {
          sheetHeight.value = e.nativeEvent.layout.height
        }}
      >
        <GestureDetector gesture={handlePan}>
          <View style={styles.handleArea}>
            <Animated.View style={[styles.handle, handleBarStyle]} />
          </View>
        </GestureDetector>

        <View style={styles.amountSection}>
          <ThemedText text="VALOR" variant="caption" tone="muted" style={styles.valueLabel} />
          <ThemedText
            text={`${sign ? `${sign} ` : ''}${formatCurrency(amount)}`}
            variant="display"
            style={[styles.amountText, { color: amountColor }]}
          />
        </View>

        <View style={styles.grid}>
          {KEYPAD_ROWS.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyRow}>
              {row.map((key) => (
                <Pressable
                  key={key}
                  onPress={() => onKeyPress(key)}
                  style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}
                >
                  {key === 'del' ? (
                    <Delete size={22} color={theme.foreground} />
                  ) : (
                    <ThemedText text={key} variant="title" style={styles.keyText} />
                  )}
                </Pressable>
              ))}
            </View>
          ))}
        </View>

        <Pressable
          onPress={onSave}
          style={({ pressed }) => [
            styles.saveButton,
            { backgroundColor: buttonColor, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <ThemedText text="Salvar" variant="button" tone="onPrimary" style={styles.saveText} />
        </Pressable>
      </Animated.View>
    </View>
  )

  if (asOverlay) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          { zIndex: 999, elevation: 24, display: visible ? 'flex' : 'none' },
        ]}
      >
        {sheet}
      </View>
    )
  }

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onSave}>
      <GestureHandlerRootView style={{ flex: 1 }}>{sheet}</GestureHandlerRootView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropOverlay: {
    backgroundColor: 'rgba(0,0,0,0.55)',
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 0,
  },
  handleArea: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  handle: {
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  amountSection: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  valueLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },
  amountText: {
    fontSize: 38,
    fontWeight: '700',
    letterSpacing: -1.5,
  },
  grid: {
    gap: 12,
    marginBottom: 24,
  },
  keyRow: {
    flexDirection: 'row',
    gap: 12,
  },
  key: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  keyPressed: {
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  keyText: {
    fontSize: 22,
    fontWeight: '500',
  },
  saveButton: {
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveText: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
})
