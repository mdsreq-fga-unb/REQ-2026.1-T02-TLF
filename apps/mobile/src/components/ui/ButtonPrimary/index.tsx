import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = TouchableOpacityProps & {
  title: string
}

export function ButtonPrimary({ title, disabled, onPress }: props) {
  const themeColor = useThemeColor()

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 0.7 : 1}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        { backgroundColor: themeColor.bluePrimary },
        disabled && { backgroundColor: themeColor.graySecondary },
      ]}
    >
      <Text style={[styles.text, { color: useThemeColor().text }]}>{title}</Text>
    </TouchableOpacity>
  )
}
