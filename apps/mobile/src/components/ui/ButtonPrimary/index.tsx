import { TouchableOpacity, TouchableOpacityProps, Text } from 'react-native'
import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'

type props = TouchableOpacityProps & {
  title: string
}

export function ButtonPrimary({ title, onPress }: props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.button, { backgroundColor: useThemeColor().bluePrimary }]}
    >
      <Text style={[styles.text, { color: useThemeColor().text }]}>{title}</Text>
    </TouchableOpacity>
  )
}
