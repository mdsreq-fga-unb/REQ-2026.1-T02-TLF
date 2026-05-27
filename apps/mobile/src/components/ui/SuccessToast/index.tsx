import { useEffect, useRef } from 'react'
import { Animated, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { styles } from './style'

const GREEN = '#00E383'

type Props = {
  visible: boolean
  message: string
  /** Duração em ms antes de desaparecer. Padrão: 2500 */
  duration?: number
  onHide?: () => void
}

export function SuccessToast({ visible, message, duration = 2500, onHide }: Props) {
  const opacity = useRef(new Animated.Value(0)).current

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

  // Sempre renderiza para evitar addViewAt na Nova Arquitetura do Android
  return (
    <Animated.View style={[styles.container, { opacity }]} pointerEvents="none">
      <View style={styles.toast}>
        <View style={styles.iconWrap}>
          <MaterialIcons name="check-circle" size={20} color={GREEN} />
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {message}
        </Text>
      </View>
    </Animated.View>
  )
}
