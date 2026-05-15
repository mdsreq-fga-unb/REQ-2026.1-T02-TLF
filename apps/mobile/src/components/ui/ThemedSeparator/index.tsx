import { styles } from './style'
import { useThemeColor } from '@/hooks/useThemeColor'
import { layout } from '@/utils/dimensions'
import { View } from 'react-native'

export function ThemedSeparator() {
  const colors = useThemeColor()

  return (
    <View
      style={[styles.separator, { backgroundColor: colors.border, height: layout.separatorHeight }]}
    />
  )
}
