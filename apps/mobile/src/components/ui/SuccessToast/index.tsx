import { useEffect, useRef } from 'react'
import { Animated, View } from 'react-native'
import { CircleCheck } from 'lucide-react-native'
import { ThemedText } from '@/components/ui/ThemedText'
import { useThemeColor } from '@/hooks/useThemeColor'
import { styles } from './style'

type Props = {
  visible: boolean
  message: string
  duration?: number
  onHide?: () => void
}

export function SuccessToast({ visible, message, duration = 2500, onHide }: Props) {
  const opacity = useRef(new Animated.Value(0)).current
  const { success } = useThemeColor()

  useEffect(() => {
    if (!visible) {
      opacity.setValue(0)
      return
    }

    Animated.sequence([
      Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
      Animated.delay(duration - 440),
      Animated.timing(opacity, { toValue: 0, duration: 220, useNativeDriver: true }),
    ]).start(({ finished }) => {
      if (finished) onHide?.()
    })
  }, [visible])

  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <View style={[styles.toast, { borderColor: `${success}55`, shadowColor: success }]}>
        <View style={styles.iconWrap}>
          <CircleCheck size={20} color={success} />
        </View>
        <ThemedText text={message} variant="body" style={styles.message} numberOfLines={2} />
      </View>
    </Animated.View>
  )
}
